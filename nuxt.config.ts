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
  vite: {
    build: {
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules'))
              return;

            // Only chunk specific large libraries
            if (id.includes('posthog-js') || id.includes('@posthog/nuxt'))
              return 'vendor-analytics';
            if (id.includes('@vueuse/motion') || id.includes('motion'))
              return 'vendor-motion';
            if (id.includes('@nuxt/ui'))
              return 'vendor-ui';
            if (id.includes('@nuxt/content'))
              return 'vendor-content';
            if (id.includes('@nuxt/image'))
              return 'vendor-image';
            if (id.includes('zod'))
              return 'vendor-zod';

            return 'vendor';
          },
        },
      },
    },
  },
  font: {
    adobe: {
      id: ['iae6upw'],
    },
  },
});
