export function useImgOnError(fallback = '/fallback.jpg') {
  /**
   * Swap the image to a fallback when the underlying <img> fails.
   * Works for <NuxtImg> because it renders an <img> element in the DOM.
   */
  function onError(e: Event) {
    const el = e.target as HTMLImageElement | null;
    if (el && el.src !== location.origin + fallback && !el.dataset._fellback) {
      el.dataset._fellback = '1';
      el.src = fallback;
    }
  }
  return { onError };
}
