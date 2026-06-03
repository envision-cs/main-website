import {
  resolveAnalyticsLinkEvent,
  resolveAnalyticsRouteEvent,
  useAnalytics,
} from "~/composables/use-analytics";

export default defineNuxtPlugin((nuxtApp) => {
  const route = useRoute();
  const analytics = useAnalytics();

  const stopRouteTracking = watch(
    () => route.path,
    () => {
      analytics.captureResolved(
        resolveAnalyticsRouteEvent({
          path: route.path,
          fullPath: route.fullPath,
          name: typeof route.name === "string" ? route.name : null,
        }),
      );
    },
    { immediate: true },
  );

  function onDocumentClick(event: MouseEvent) {
    const target = event.target instanceof Element ? event.target : null;
    const link = target?.closest<HTMLAnchorElement>("a[href]");

    if (!link) return;

    analytics.captureResolved(
      resolveAnalyticsLinkEvent({
        href: link.getAttribute("href") || "",
        label: getLinkLabel(link),
        path: route.path,
        cta: link.dataset.analyticsCta === "true",
      }),
    );
  }

  document.addEventListener("click", onDocumentClick, true);

  nuxtApp.vueApp.onUnmount(() => {
    stopRouteTracking();
    document.removeEventListener("click", onDocumentClick, true);
  });
});

function getLinkLabel(link: HTMLAnchorElement) {
  return link.getAttribute("aria-label") || link.textContent?.replace(/\s+/g, " ").trim() || "";
}
