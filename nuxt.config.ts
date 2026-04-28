// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";
export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  app: {
    head: {
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
    },
  },
  modules: [
    "@nuxt/ui",
    "@vueuse/nuxt",
    "@nuxt/image",
    "@nuxtjs/mdc",
    "@posthog/nuxt",
    "motion-v/nuxt",
    "@nuxtjs/strapi",
    "reka-ui/nuxt",
    "@nuxt/hints",
    "@nuxt/eslint",
    "v-gsap-nuxt",
  ],
  vite: {
    optimizeDeps: {
      include: [
        "gsap/ScrollTrigger",
        "@vue/devtools-core",
        "@vue/devtools-kit",
        "embla-carousel-vue",
      ],
    },
  },
  css: ["~/assets/css/main.css", "~/assets/css/maplibre-gl.css"],
  ui: {
    colorMode: false,
    theme: {
      colors: ["primary", "secondary", "info", "success", "warning", "error"],
    },
  },
  nitro: {
    preset: "vercel",
  },
  routeRules: {
    "/api/home-hero": { cache: { maxAge: 60 * 10 } }, // 10 min
  },

  runtimeConfig: {
    public: {
      posthogPublicKey: "phc_bjvPp8gR5qQVaS316DJqXnJ9lwUQo3EGDnpwP1BEB78",
      posthogDefaults: "2025-05-24",
      strapi: {
        url: "",
      },
    },
  },
  image: {
    imagekit: {
      baseURL: "",
    },
  },
  posthogConfig: {
    publicKey: "phc_U861r9C5hjKh8CRlC1uGW6NW6OG3yfhZstFtFEOjCxX", // Find it in project settings https://app.posthog.com/settings/project
    host: "https://us.i.posthog.com", // Optional: defaults to https://us.i.posthog.com. Use https://eu.i.posthog.com for EU region
    clientConfig: {
      // Optional: PostHog client configuration options
    },
  },
  icon: {
    serverBundle: {
      collections: ["lucide", "simple-icons"], // Only bundle what you need
    },
    customCollections: [
      {
        prefix: "logos",
        dir: "./app/assets/logos",
      },
    ],
  },
  compatibilityDate: "2025-05-15",
  experimental: {
    sharedPrerenderData: true,
  },
  strapi: {
    url: process.env.STRAPI_URL,
    token: process.env.STRAPI_TOKEN || undefined,
    prefix: "/api",
    admin: "/admin",
    version: "v5",
    cookie: {},
    cookieName: "strapi_jwt",
  },
});
