// composables/useEngagementTracking.ts
import { useTimeoutFn, useWindowScroll } from '@vueuse/core';
import { readonly, ref, watch } from 'vue';

interface EngagementTrackingOptions {
  /** PostHog event name, e.g. 'homepage_session_engaged' */
  eventName: string;
  /** Funnel classification properties attached to the event */
  funnelEvent: FunnelEvent;
  /** Ms on page before firing `time_Xs` trigger. Default: 30_000 */
  timeThreshold?: number;
  /** Scroll depth percentage before firing `scroll_X` trigger. Default: 60 */
  scrollThreshold?: number;
}

export function useEngagementTracking(options: EngagementTrackingOptions) {
  const { eventName, funnelEvent, timeThreshold = 30_000, scrollThreshold = 60 } = options;

  const isEngaged = ref(false);

  const { y } = useWindowScroll();

  const { stop: stopTimer } = useTimeoutFn(
    () => fireEngagedEvent(`time_${timeThreshold / 1000}s`),
    timeThreshold,
  );

  const stopScrollWatch = watch(y, (scrollTop) => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;

    if ((scrollTop / docHeight) * 100 >= scrollThreshold)
      fireEngagedEvent(`scroll_${scrollThreshold}`);
  });

  function fireEngagedEvent(trigger: string) {
    if (isEngaged.value) return;
    isEngaged.value = true;

    stopTimer();
    stopScrollWatch();

    posthog?.capture(eventName, {
      ...funnelEvent,
      engagement_trigger: trigger,
    });
  }

  return { isEngaged: readonly(isEngaged) };
}
