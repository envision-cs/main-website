// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxt/content',
    '@posthog/nuxt',
    'motion-v/nuxt',
    'nuxt-maplibre',
    '@nuxtjs/strapi',
    '@nuxt/hints',

    process.env.NODE_ENV !== 'test' ? 'nuxt-studio' : undefined,
  ].filter(Boolean) as any,
  css: ['./app/assets/css/main.css'],
  ui: {
    colorMode: false,
    theme: {
      colors: ['primary', 'secondary', 'info', 'success', 'warning', 'error'],
    },
  },
  nitro: {
    preset: 'vercel',
  },
  content: {
    build: {
      pathMeta: {},
    },

    preview: {
      api: 'https://api.nuxt.studio',
    },
  },
  tailwindcss: {
    safelist: [{ pattern: /bg-\[.*\]/ }],
  },
  runtimeConfig: {
    public: {
      posthogPublicKey: 'phc_bjvPp8gR5qQVaS316DJqXnJ9lwUQo3EGDnpwP1BEB78',
      posthogDefaults: '2025-05-24',
      strapi: {
        url: '',
      },
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
  experimental: {
    sharedPrerenderData: true,
  },
  studio: {
    route: '/_studio',
    repository: {
      provider: 'github',
      owner: 'envision-cs',
      repo: 'main-website',
      branch: 'main',
    },
  },
  strapi: {
    url: process.env.STRAPI_URL,
    token: process.env.STRAPI_TOKEN || undefined,
    prefix: '/api',
    admin: '/admin',
    version: 'v5',
    cookie: {},
    cookieName: 'strapi_jwt',
  },
});
