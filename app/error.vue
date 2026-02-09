<script setup lang="ts">
import type { NuxtError } from '#app';

import { clearError } from '#app';
import { computed } from 'vue';

const props = defineProps<{ error: NuxtError }>();

const isNotFound = computed(() => props.error?.statusCode === 404 || props.error?.statusCode === 400);

const title = computed(() => isNotFound.value ? 'This page is still under construction.' : 'Something went wrong.');

const description = computed(() => isNotFound.value
  ? 'We couldn\'t find the address you entered. Let\'s get you to a page that\'s ready for visitors.'
  : 'An unexpected error occurred. Please try again or head back to a safe spot.');

const goHome = () => clearError({ redirect: '/' });
</script>

<template>
  <UApp>
    <NuxtLayout name="default">
      <section class="flex flex-col gap-12 md:gap-16 pb-12 md:pb-16">
        <div class="relative min-h-[85vh] lg:min-h-[90vh] border-b border-muted overflow-clip">
          <NuxtImg
            src="/USFSPResidenceHall-Exteriors-DuskLandscapefromRamp.jpg"
            alt="Envision project exterior"
            class="w-full h-full object-cover saturate-105"
            sizes="sm:100vw md:100vw lg:100vw"
            densities="x1 x2"
            preload
          />
          <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          <div class="absolute inset-0 site-grid grid items-end px-6 py-12 md:px-16 md:py-20 lg:py-24 gap-6">
            <div class="col-span-full flex flex-wrap gap-2 md:gap-3 md:col-span-6 lg:col-span-10">
              <span
                class="inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-white/10 text-white uppercase tracking-[0.08em] text-sm"
              >
                {{ isNotFound ? '404' : props.error?.statusCode }}
              </span>
              <span
                class="inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-white/10 border border-white/40 text-white uppercase tracking-[0.08em] text-sm"
              >
                {{ isNotFound ? 'Page not found' : 'Unexpected error' }}
              </span>
            </div>
            <div class="col-span-full flex flex-col gap-4 text-white md:col-span-10 lg:col-span-12">
              <app-typography
                tag="h1"
                variant="heading-lg"
                class="text-white"
              >
                {{ title }}
              </app-typography>
              <app-typography
                tag="p"
                variant="text-lg"
                class="text-white/85 max-w-[36ch]"
              >
                {{ description }}
              </app-typography>
              <div class="flex flex-wrap items-center gap-3">
                <app-button color="primary" href="/">
                  Back to home
                </app-button>
                <app-button color="white" href="/contact">
                  Talk with our team
                </app-button>
                <UButton
                  variant="ghost"
                  color="neutral"
                  class="text-white border-white/40"
                  @click="goHome"
                >
                  Clear error & reload
                </UButton>
              </div>
            </div>
          </div>
        </div>

        <div class="site-grid gap-4 px-4 md:px-8">
          <div
            class="col-span-full md:col-span-12 lg:col-span-11 border border-muted rounded-lg p-6 md:p-10 bg-white shadow-xl"
          >
            <app-typography tag="h2" variant="heading-sm">
              Quick paths
            </app-typography>
            <ul class="mt-4 grid gap-2">
              <li>
                <NuxtLink
                  class="font-medium border-b border-transparent pb-1 hover:text-primary hover:border-primary"
                  to="/services/construction-management"
                >
                  Construction Management
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  class="font-medium border-b border-transparent pb-1 hover:text-primary hover:border-primary"
                  to="/projects"
                >
                  Projects
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  class="font-medium border-b border-transparent pb-1 hover:text-primary hover:border-primary"
                  to="/team"
                >
                  Meet the Team
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  class="font-medium border-b border-transparent pb-1 hover:text-primary hover:border-primary"
                  to="/about"
                >
                  About Us
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  class="font-medium border-b border-transparent pb-1 hover:text-primary hover:border-primary"
                  to="/contact"
                >
                  Contact
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div
            class="col-span-full md:col-span-12 lg:col-span-11 border border-muted rounded-lg p-6 md:p-10 bg-gradient-to-br from-primary/5 to-secondary/5 shadow-xl"
          >
            <app-typography
              tag="h3"
              variant="heading-sm"
              class="uppercase"
            >
              Need a hand?
            </app-typography>
            <app-typography
              tag="p"
              variant="text-md"
              class="text-neutral-600"
            >
              If you typed the address manually, double-check the spelling. Otherwise, use the links here or return home
              and we\'ll guide you.
            </app-typography>
            <div class="flex flex-wrap gap-3 mt-4">
              <UButton
                size="lg"
                variant="soft"
                color="primary"
                icon="i-lucide-mail"
                href="mailto:info@envisioncs.com"
              >
                Email our team
              </UButton>
              <UButton
                size="lg"
                variant="ghost"
                color="neutral"
                icon="i-lucide-phone"
                href="tel:8137123070"
              >
                813-712-3070
              </UButton>
            </div>
          </div>
        </div>
      </section>
    </NuxtLayout>
  </UApp>
</template>
