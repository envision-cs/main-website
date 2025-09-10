<script setup lang="ts"></script>

<template>
  <section id="hero" class="relative overflow-hidden flex items-center rounded-3xl">
    <NuxtImg
      src="/hero-small.png"
      alt="Construction site hero image"
      sizes="sm:100vw md:100vw lg:100vw"
      densities="x1 x2"
      class="h-[80vh] sm:h-[96vh] w-full object-cover"
      preload
    />
    <div class="absolute inset-0 bg-linear-to-t from-black/60 to-black/0" />
    <div class="absolute inset-0">
      <UContainer class="h-full flex items-end pb-10 md:pb-20 px-4">
        <div class="max-w-6xl mx-auto text-white">
          <h2 class="mt-2 uppercase text-3xl/9 sm:text-4xl/12 lg:text-6xl/18 font-medium">
            You need a builder who sees the bigger picture.
          </h2>
          <p class="mt-2 md:mt-3 text-base/5 sm:text-2xl/8 text-white/80 text-balance">
            We manage construction projects with excellence, purpose, and
            people-first precision.
          </p>
          <div class="mt-6 flex flex-wrap gap-3">
            <UButton size="xl" color="primary">
              Start Your Project
            </UButton>
            <UButton
              to="#cta"
              size="xl"
              variant="outline"
              color="neutral"
            >
              See Our Work
            </UButton>
          </div>
        </div>
      </UContainer>
    </div>
  </section>
</template>
