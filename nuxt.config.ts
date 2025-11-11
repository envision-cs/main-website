// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxt/image', '@nuxt/content', '@posthog/nuxt', 'motion-v/nuxt', 'nuxt-maplibre', 'nuxt-studio'],
  nitro: {
    preset: 'vercel',
    minify: true,
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
    serverBundle: {
      collections: ['lucide', 'simple-icons'], // Only bundle what you need
    },
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
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  studio: {
    route: '/_studio',
    repository: {
      provider: 'github',
      owner: 'envision-cs',
      repo: 'main-website',
      branch: 'main',
    },
    development: {
      sync: true,
    },
  },
  vite: {
    optimizeDeps: {
      exclude: [
        '@libsql/client',
        'better-sqlite3',
        'sql.js',
      ],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              if (id.includes('motion')) {
                return 'motion';
              }
              if (id.includes('@vueuse') && !id.includes('vue')) {
                return 'vendor-vueuse';
              }
            }
          },
        },
      },
    },
  },
});
