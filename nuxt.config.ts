// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui-pro', '@nuxt/image'],
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  ui: {
    colorMode: false,
    theme: {
      colors: [
        'primary',
        'secondary',
        'info',
        'success',
        'warning',
        'error',
      ],
    },
  },
  uiPro: {
    // eslint-disable-next-line node/no-process-env
    license: process.env.NUXT_UI_PRO_LICENSE,
  },
  icon: {
    customCollections: [
      {
        prefix: 'logos',
        dir: './app/assets/logos',
      },
    ],
  },
  compatibilityDate: '2025-05-15',
  eslint: {
    config: {
      standalone: false,
    },
  },
  font: {
    adobe: {
      id: ['iae6upw'],
    },
  },
});
