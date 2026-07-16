// composables/usePageView.ts

interface PageViewOptions {
  /** PostHog event name. Default: 'page_view' */
  eventName?: string;
  /** Funnel classification props merged over the page-view defaults. */
  funnelEvent?: Partial<FunnelEvent>;
}

const DEFAULT_PAGE_VIEW_EVENT: FunnelEvent = {
  funnel_stage: 'top',
  conversion_role: 'process_milestone',
  funnel_movement: 'entry',
  intent: 'low',
};

/**
 * Fires a single PostHog page-view event for the current route.
 * Call once at setup; on the server `posthog` is undefined so it no-ops.
 */
export function usePageView(options: PageViewOptions = {}) {
  const posthog = usePostHog();
  const { eventName = 'page_view', funnelEvent } = options;
  const route = useRoute();

  posthog?.capture(eventName, {
    ...DEFAULT_PAGE_VIEW_EVENT,
    ...funnelEvent,
    source_page: route.path,
  });
}
