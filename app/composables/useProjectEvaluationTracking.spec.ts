import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vite-plus/test';

import {
  parseProjectEvaluationState,
  recordProjectVisit,
  type ProjectEvaluationSessionState,
} from './useProjectEvaluationTracking';

const createState = (
  overrides: Partial<ProjectEvaluationSessionState> = {},
): ProjectEvaluationSessionState => ({
  sessionId: 'session-a',
  projectIds: [],
  thresholdReached: false,
  ...overrides,
});

const composableSource = readFileSync(
  resolve(process.cwd(), 'app/composables/useProjectEvaluationTracking.ts'),
  'utf8',
);
const projectPageSource = readFileSync(
  resolve(process.cwd(), 'app/pages/projects/[id]/[project].vue'),
  'utf8',
);

describe('recordProjectVisit', () => {
  it('counts unique project IDs only', () => {
    const firstVisit = recordProjectVisit(createState(), 'session-a', '101');
    const repeatedVisit = recordProjectVisit(firstVisit.state, 'session-a', '101');

    expect(repeatedVisit.state.projectIds).toEqual(['101']);
    expect(repeatedVisit.shouldCapture).toBe(false);
  });

  it('reaches the threshold on the fourth unique project only', () => {
    let state = createState();

    for (const projectId of ['101', '102', '103']) {
      const result = recordProjectVisit(state, 'session-a', projectId);
      expect(result.shouldCapture).toBe(false);
      state = result.state;
    }

    const thresholdVisit = recordProjectVisit(state, 'session-a', '104');

    expect(thresholdVisit.shouldCapture).toBe(true);
    expect(thresholdVisit.state).toEqual({
      sessionId: 'session-a',
      projectIds: ['101', '102', '103', '104'],
      thresholdReached: true,
    });
  });

  it('does not reach the threshold again for later projects', () => {
    const state = createState({
      projectIds: ['101', '102', '103', '104'],
      thresholdReached: true,
    });

    const result = recordProjectVisit(state, 'session-a', '105');

    expect(result.shouldCapture).toBe(false);
    expect(result.state.projectIds).toEqual(['101', '102', '103', '104', '105']);
  });

  it('starts fresh when the PostHog session ID changes', () => {
    const priorSession = createState({
      projectIds: ['101', '102', '103'],
    });

    const result = recordProjectVisit(priorSession, 'session-b', '104');

    expect(result).toEqual({
      state: {
        sessionId: 'session-b',
        projectIds: ['104'],
        thresholdReached: false,
      },
      shouldCapture: false,
    });
  });
});

describe('parseProjectEvaluationState', () => {
  it('accepts valid persisted state', () => {
    const state = createState({ projectIds: ['101', '102'] });

    expect(parseProjectEvaluationState(JSON.stringify(state))).toEqual(state);
  });

  it.each([
    null,
    '',
    'not-json',
    '{}',
    JSON.stringify({ sessionId: 1, projectIds: [], thresholdReached: false }),
    JSON.stringify({ sessionId: 'session-a', projectIds: [101], thresholdReached: false }),
    JSON.stringify({ sessionId: 'session-a', projectIds: [], thresholdReached: 'no' }),
  ])('rejects malformed persisted state: %s', (value) => {
    expect(parseProjectEvaluationState(value)).toBeNull();
  });
});

describe('useProjectEvaluationTracking runtime contract', () => {
  it('persists PostHog-session state before capturing the approved event', () => {
    const persistCall = composableSource.indexOf('persistState(nextState)');
    const captureCall = composableSource.indexOf(
      "posthog.capture('project_evaluation_threshold_reached'",
    );

    expect(composableSource).toContain('useState<ProjectEvaluationSessionState>');
    expect(composableSource).toContain('posthog.get_session_id()');
    expect(persistCall).toBeGreaterThan(-1);
    expect(captureCall).toBeGreaterThan(persistCall);
    expect(composableSource).toContain("funnel_stage: 'middle'");
    expect(composableSource).toContain("conversion_role: 'process_milestone'");
    expect(composableSource).toContain("funnel_movement: 'down'");
    expect(composableSource).toContain("intent: 'medium-high'");
    expect(composableSource).toContain('projects_viewed: PROJECT_EVALUATION_THRESHOLD');
    expect(composableSource).toContain('project_ids: nextState.projectIds');
    expect(composableSource).toContain('project_title: title');
  });

  it('tracks the current project from the project detail page', () => {
    expect(projectPageSource).toContain(
      `useProjectEvaluationTracking(
  () => page.value?.id,
  () => page.value?.title,
);`,
    );
  });
});
