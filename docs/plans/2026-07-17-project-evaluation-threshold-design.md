# Project evaluation threshold tracking design

## Goal

Capture `project_evaluation_threshold_reached` once when a visitor views four unique projects during the same PostHog inactivity-based session. The count must survive reloads and reset when PostHog rotates the session ID.

## Architecture

Add a `useProjectEvaluationTracking` composable and call it from the project detail page with the current project ID and title.

The composable will maintain serializable global state with Nuxt `useState`:

```ts
interface ProjectEvaluationSessionState {
  sessionId: string;
  projectIds: string[];
  thresholdReached: boolean;
}
```

The same record will be persisted to `localStorage` so it survives a reload. On each project visit, the composable will read `posthog.get_session_id()` and compare it with the persisted session ID. A mismatch replaces the prior record with fresh state for the new PostHog session.

## Data flow

1. Wait until the project page is mounted in the browser and has a project ID.
2. Read PostHog's current session ID.
3. Hydrate the Nuxt state from valid persisted data.
4. Reset state if the persisted and current PostHog session IDs differ.
5. Add the current project ID only if it is not already present.
6. Persist the updated state.
7. When the unique count first reaches four, mark the threshold reached, persist that flag, and capture the event.

Persisting the flag before capture prevents duplicate threshold events during route re-entry or reload.

## Event

```ts
posthog.capture('project_evaluation_threshold_reached', {
  funnel_stage: 'middle',
  conversion_role: 'process_milestone',
  funnel_movement: 'down',
  intent: 'medium-high',
  projects_viewed: 4,
  project_ids: projectIds,
  project_title: currentProjectTitle,
});
```

PostHog will attach its current `$session_id` to the captured event.

## Resilience

Tracking is client-only. If PostHog is unavailable, its session ID is empty, or browser storage cannot be read or written, the composable will avoid breaking page rendering. Storage failures will fall back to in-memory Nuxt state for the current SPA lifetime.

## Testing

Unit tests will cover:

- duplicate project visits do not increase the count;
- the fourth unique project triggers the threshold once;
- later projects do not trigger it again in the same session;
- a new PostHog session ID resets the count;
- persisted state restores counting after a reload;
- malformed persisted state is ignored safely.
