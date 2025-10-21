// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/content',
    '@posthog/nuxt',
    'motion-v/nuxt',
  ],
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  sourcemap: { client: 'hidden' },
  nitro: {
    sourceMap: false,
    rollupConfig: {
      output: {
        sourcemapExcludeSources: false, // Make sure to set it (otherwise server sourcemaps will not be generated)
      },
    },
  },

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
  content: {
    build: {
      pathMeta: {},
    },
    preview: {
      api: 'https://api.nuxt.studio',
    },
  },
  runtimeConfig: {
    public: {
      posthogPublicKey: 'phc_bjvPp8gR5qQVaS316DJqXnJ9lwUQo3EGDnpwP1BEB78',
      posthogDefaults: '2025-05-24',
    },
  },
  posthogConfig: {
    publicKey: 'phc_U861r9C5hjKh8CRlC1uGW6NW6OG3yfhZstFtFEOjCxX', // Find it in project settings https://app.posthog.com/settings/project
    host: 'https://us.i.posthog.com', // Optional: defaults to https://us.i.posthog.com. Use https://eu.i.posthog.com for EU region
    clientConfig: {
      // Optional: PostHog client configuration options
    },
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
  vite: { build: { sourcemap: false } },
  font: {
    adobe: {
      id: ['iae6upw'],
    },
  },

});
