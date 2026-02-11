export default defineNuxtPlugin((nuxtApp) => {
  const i18n = (nuxtApp as any).$i18n;

  if (!i18n?.global?.te || !i18n.global.mergeLocaleMessage) {
    return;
  }

  const locale = i18n.global.locale?.value || 'en';
  const fallbackKey = 'studio.tooltips.toggleStudio';

  if (!i18n.global.te(fallbackKey, locale)) {
    i18n.global.mergeLocaleMessage(locale, {
      studio: {
        tooltips: {
          toggleStudio: 'Toggle Studio',
        },
      },
    });
  }
});
