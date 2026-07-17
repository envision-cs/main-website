interface ClickTrackingOptions {
  /** PostHog event name. */
  eventName: string;
  /** Funnel classification properties attached to the event. */
  funnelEvent: FunnelEvent;
  /** Additional properties shared by every click event. */
  properties?: Record<string, unknown>;
}

/**
 * Returns a click handler that captures a PostHog event for the current route.
 */
export function useClickTracking(options: ClickTrackingOptions) {
  const posthog = usePostHog();
  const route = useRoute();

  function trackClick() {
    posthog?.capture(options.eventName, {
      ...options.funnelEvent,
      ...options.properties,
      source_page: route.path,
    });
  }

  return { trackClick };
}
