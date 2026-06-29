// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

const posthogReleaseName = process.env.POSTHOG_RELEASE_NAME || 'envision-website';
const posthogReleaseVersion =
  process.env.POSTHOG_RELEASE_VERSION ||
  process.env.VERCEL_GIT_COMMIT_SHA ||
  process.env.GITHUB_SHA ||
  'local';
const posthogSourcemapProjectId = process.env.POSTHOG_PROJECT_ID;
const posthogSourcemapApiKey = process.env.POSTHOG_PERSONAL_API_KEY;
const posthogSourcemaps =
  posthogSourcemapProjectId && posthogSourcemapApiKey
    ? {
        enabled: true,
        projectId: posthogSourcemapProjectId,
        personalApiKey: posthogSourcemapApiKey,
        releaseName: posthogReleaseName,
        releaseVersion: posthogReleaseVersion,
        deleteAfterUpload: true,
      }
    : undefined;

export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },
  runtimeConfig: {
    public: {
      posthog: {
        publicKey: process.env.NUXT_PUBLIC_POSTHOG_PROJECT_TOKEN || '',
        host: process.env.NUXT_PUBLIC_POSTHOG_HOST || 'https://p.envision-cs.com',
      },
      posthogDefaults: '2025-05-24',
      strapi: {
        url: '',
      },
    },
  },

  modules: [
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxtjs/mdc',
    '@posthog/nuxt',
    '@nuxtjs/strapi',
    'reka-ui/nuxt',
    '@nuxt/eslint',
    'nuxt-maplibre',
    // nuxt-maplibre force-pushes its css globally; strip it so the map
    // component loads it only on pages that render a map.
    (_options: unknown, nuxt: { options: { css: string[] } }) => {
      nuxt.options.css = nuxt.options.css.filter((entry) => !entry.includes('maplibre-gl.css'));
    },
    '@nuxt/scripts',
    '@nuxt/fonts',
  ],

  vite: {
    optimizeDeps: {
      include: ['@vue/devtools-core', '@vue/devtools-kit', 'embla-carousel-vue'],
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
  fonts: {
    provider: 'local',
  },
  posthogConfig: {
    publicKey: process.env.NUXT_PUBLIC_POSTHOG_PROJECT_TOKEN || '',
    host: process.env.NUXT_PUBLIC_POSTHOG_HOST || 'https://p.envision-cs.com',
    clientConfig: {
      capture_exceptions: true,
      capture_heatmaps: true,
      autocapture: true,
      capture_pageview: 'history_change',
      capture_pageleave: 'if_capture_pageview',
      __add_tracing_headers: ['localhost', 'envision-cs.com'],
      ui_host: 'https://us.posthog.com',
      person_profiles: 'identified_only',
    },
    serverConfig: {
      enableExceptionAutocapture: true,
    },
    sourcemaps: posthogSourcemaps,
  },
  ui: {
    colorMode: false,
    theme: {
      colors: ['primary', 'secondary', 'info', 'success', 'warning', 'error'],
    },
  },
  nitro: {
    preset: 'vercel',
  },
  compatibilityDate: '2025-05-15',
  experimental: {
    sharedPrerenderData: true,
    inlineStyles: true,
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
  routeRules: {
    '/api/home-hero': { cache: { maxAge: 60 * 10 } }, // 10 min
  },
  image: {
    imagekit: {
      baseURL: '',
    },
  },
  scripts: {
    registry: {
      posthog: {
        apiKey: 'phc_bjvPp8gR5qQVaS316DJqXnJ9lwUQo3EGDnpwP1BEB78',
        apiHost: 'https://p.envision-cs.com', // your Cloudflare managed reverse proxy
        trigger: 'onNuxtReady',
        config: {
          ui_host: 'https://us.posthog.com',
          defaults: '2026-05-30',
          person_profiles: 'identified_only',
        },
      },
    },
  },
});
