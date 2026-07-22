# Project Evaluation Threshold Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Capture `project_evaluation_threshold_reached` once when a visitor reaches four unique project-detail views in one PostHog session, including across reloads.

**Architecture:** A Nuxt composable owns serializable `useState` and mirrors it to `localStorage`, keyed by PostHog's current session ID. A pure state transition handles session rotation, unique-project counting, and one-shot threshold detection so the behavior can be unit-tested without browser or SDK mocks.

**Tech Stack:** Nuxt 4, Vue 3 Composition API, `@posthog/nuxt`, TypeScript, Vite+ Test

---

### Task 1: Add the tested project-session state transition

**Files:**
- Create: `app/composables/useProjectEvaluationTracking.ts`
- Create: `app/composables/useProjectEvaluationTracking.spec.ts`

**Step 1: Write the failing state-transition tests**

Cover these cases in `useProjectEvaluationTracking.spec.ts`:

```ts
describe('recordProjectVisit', () => {
  it('counts unique project IDs only', () => {});
  it('reaches the threshold on the fourth unique project only', () => {});
  it('does not reach the threshold again for later projects', () => {});
  it('starts fresh when the PostHog session ID changes', () => {});
});

describe('parseProjectEvaluationState', () => {
  it('accepts valid persisted state', () => {});
  it('rejects malformed persisted state', () => {});
});
```

**Step 2: Run the test to verify it fails**

Run:

```bash
vp test app/composables/useProjectEvaluationTracking.spec.ts
```

Expected: FAIL because the composable and exported helpers do not exist.

**Step 3: Implement the pure state helpers**

In `useProjectEvaluationTracking.ts`, define serializable state and a pure transition:

```ts
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
  // Reset on session mismatch, ignore duplicates, and capture only at four.
}

export function parseProjectEvaluationState(value: string | null) {
  // Parse JSON and return only a structurally valid serializable record.
}
```

Use a threshold constant of `4`. Do not use `Set` in `useState`, because Nuxt state must remain JSON-serializable.

**Step 4: Run the test to verify it passes**

Run:

```bash
vp test app/composables/useProjectEvaluationTracking.spec.ts
```

Expected: all state-transition and parsing tests PASS.

### Task 2: Add PostHog-session persistence and event capture

**Files:**
- Modify: `app/composables/useProjectEvaluationTracking.ts`
- Modify: `app/composables/useProjectEvaluationTracking.spec.ts`

**Step 1: Add a failing source-contract test**

Verify that the composable:

- uses `useState` for global reactive state;
- calls `posthog.get_session_id()`;
- persists the state before calling `posthog.capture()`;
- captures `project_evaluation_threshold_reached` with the approved funnel properties.

**Step 2: Run the focused test to verify it fails**

Run:

```bash
vp test app/composables/useProjectEvaluationTracking.spec.ts
```

Expected: FAIL because runtime tracking has not been wired.

**Step 3: Implement the composable runtime**

Add `useProjectEvaluationTracking` with this flow:

```ts
export function useProjectEvaluationTracking(
  projectId: MaybeRefOrGetter<number | string | undefined>,
  projectTitle: MaybeRefOrGetter<string | undefined>,
) {
  const posthog = usePostHog();
  const state = useState<ProjectEvaluationSessionState>(/* serializable default */);

  // On the client, watch the current project after mount.
  // Read the latest persisted record and PostHog session ID.
  // Apply recordProjectVisit(), assign useState, and persist it.
  // If shouldCapture, capture the approved event after persistence.
}
```

Use a namespaced storage key. Wrap `localStorage` reads and writes in `try/catch`; if storage is unavailable, retain in-memory `useState` behavior. Do not manually set `$session_id`; PostHog attaches its current session to captured events.

The event properties must be:

```ts
{
  funnel_stage: 'middle',
  conversion_role: 'process_milestone',
  funnel_movement: 'down',
  intent: 'medium-high',
  projects_viewed: 4,
  project_ids: nextState.projectIds,
  project_title: title,
}
```

**Step 4: Run the focused test to verify it passes**

Run:

```bash
vp test app/composables/useProjectEvaluationTracking.spec.ts
```

Expected: all tests PASS.

### Task 3: Wire project detail visits into the tracker

**Files:**
- Modify: `app/pages/projects/[id]/[project].vue`
- Modify: `app/composables/useProjectEvaluationTracking.spec.ts`

**Step 1: Add a failing wiring test**

Read the project page source and assert that it calls:

```ts
useProjectEvaluationTracking(
  () => page.value?.id,
  () => page.value?.title,
);
```

**Step 2: Run the test to verify it fails**

Run:

```bash
vp test app/composables/useProjectEvaluationTracking.spec.ts
```

Expected: FAIL because the project page is not wired yet.

**Step 3: Add the composable call**

Place the call in the project page's analytics section after `usePageView`. Keeping it after the existing page-view capture ensures PostHog has applied any inactivity-driven session rotation before the tracker reads `get_session_id()`.

**Step 4: Run focused verification**

Run:

```bash
vp test app/composables/useProjectEvaluationTracking.spec.ts
vp check app/composables/useProjectEvaluationTracking.ts app/composables/useProjectEvaluationTracking.spec.ts 'app/pages/projects/[id]/[project].vue'
git diff --check
```

Expected: focused tests, formatting, linting, type checks, and whitespace checks PASS.

### Task 4: Run repository validation and review the final diff

**Files:**
- Review: `app/composables/useProjectEvaluationTracking.ts`
- Review: `app/composables/useProjectEvaluationTracking.spec.ts`
- Review: `app/pages/projects/[id]/[project].vue`

**Step 1: Run repository checks**

Run:

```bash
vp check
vp test
```

Expected: PASS, or report existing unrelated failures separately from the focused passing checks.

**Step 2: Review scope**

Run:

```bash
git diff -- app/composables/useProjectEvaluationTracking.ts app/composables/useProjectEvaluationTracking.spec.ts 'app/pages/projects/[id]/[project].vue'
git status --short
```

Confirm that only the approved event, persistence, tests, page wiring, and plan documents were added. Do not commit unless the user requests it.
