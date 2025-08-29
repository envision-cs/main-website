// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxt/image'],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  ui: {
    colorMode: false,
  },
  srcDir: 'app/',
  future: {
    compatibilityVersion: 4,
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
