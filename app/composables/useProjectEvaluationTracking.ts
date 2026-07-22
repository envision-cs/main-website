export const PROJECT_EVALUATION_THRESHOLD = 4;

const PROJECT_EVALUATION_STATE_KEY = 'project-evaluation-session';
const PROJECT_EVALUATION_STORAGE_KEY = 'envision:project-evaluation-session';

export interface ProjectEvaluationSessionState {
  sessionId: string;
  projectIds: string[];
  thresholdReached: boolean;
}

export interface ProjectVisitResult {
  state: ProjectEvaluationSessionState;
  shouldCapture: boolean;
}

export function recordProjectVisit(
  current: ProjectEvaluationSessionState,
  sessionId: string,
  projectId: string,
): ProjectVisitResult {
  const isCurrentSession = current.sessionId === sessionId;
  const projectIds = isCurrentSession ? current.projectIds : [];
  const thresholdReached = isCurrentSession ? current.thresholdReached : false;

  if (projectIds.includes(projectId)) {
    return {
      state: isCurrentSession ? current : { sessionId, projectIds: [], thresholdReached: false },
      shouldCapture: false,
    };
  }

  const nextProjectIds = [...projectIds, projectId];
  const shouldCapture = !thresholdReached && nextProjectIds.length >= PROJECT_EVALUATION_THRESHOLD;

  return {
    state: {
      sessionId,
      projectIds: nextProjectIds,
      thresholdReached: thresholdReached || shouldCapture,
    },
    shouldCapture,
  };
}

export function parseProjectEvaluationState(
  value: string | null,
): ProjectEvaluationSessionState | null {
  if (!value) return null;

  try {
    const parsed: unknown = JSON.parse(value);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return null;

    const state = parsed as Record<string, unknown>;
    if (typeof state.sessionId !== 'string' || !state.sessionId) return null;
    if (
      !Array.isArray(state.projectIds) ||
      !state.projectIds.every((id) => typeof id === 'string')
    ) {
      return null;
    }
    if (typeof state.thresholdReached !== 'boolean') return null;

    return {
      sessionId: state.sessionId,
      projectIds: state.projectIds,
      thresholdReached: state.thresholdReached,
    };
  } catch {
    return null;
  }
}

function createEmptyState(): ProjectEvaluationSessionState {
  return {
    sessionId: '',
    projectIds: [],
    thresholdReached: false,
  };
}

function readPersistedState(): ProjectEvaluationSessionState | null {
  try {
    return parseProjectEvaluationState(localStorage.getItem(PROJECT_EVALUATION_STORAGE_KEY));
  } catch {
    return null;
  }
}

function persistState(state: ProjectEvaluationSessionState) {
  try {
    localStorage.setItem(PROJECT_EVALUATION_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Keep tracking in Nuxt state when browser storage is unavailable.
  }
}

export function useProjectEvaluationTracking(
  projectId: MaybeRefOrGetter<number | string | undefined>,
  projectTitle: MaybeRefOrGetter<string | undefined>,
) {
  const posthog = usePostHog();
  const state = useState<ProjectEvaluationSessionState>(
    PROJECT_EVALUATION_STATE_KEY,
    createEmptyState,
  );
  let stopWatching: (() => void) | undefined;

  function trackProjectVisit() {
    const id = toValue(projectId);
    const title = toValue(projectTitle);
    if (id === undefined || !title || !posthog) return;

    const sessionId = posthog.get_session_id();
    if (!sessionId) return;

    const persistedState = readPersistedState();
    const currentState = persistedState?.sessionId === sessionId ? persistedState : state.value;
    const { state: nextState, shouldCapture } = recordProjectVisit(
      currentState,
      sessionId,
      String(id),
    );

    state.value = nextState;
    persistState(nextState);

    if (!shouldCapture) return;

    posthog.capture('project_evaluation_threshold_reached', {
      funnel_stage: 'middle',
      conversion_role: 'process_milestone',
      funnel_movement: 'down',
      intent: 'medium-high',
      projects_viewed: PROJECT_EVALUATION_THRESHOLD,
      project_ids: nextState.projectIds,
      project_title: title,
    });
  }

  onMounted(() => {
    stopWatching = watch(
      [() => toValue(projectId), () => toValue(projectTitle)],
      trackProjectVisit,
      { immediate: true },
    );
  });

  onBeforeUnmount(() => stopWatching?.());

  return readonly(state);
}
