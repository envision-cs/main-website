<script setup lang="ts">
import type { Link } from '#shared/types/global';

defineProps<{
  eyebrow: string;
  title: string;
  description: string;
  links?: Link[];
  img?: string;
  alt?: string;
}>();
</script>

<template>
  <section id="cta" class="">
    <UContainer>
      <div class="grid gap-6 md:gap-12">
        <div v-if="img" class="overflow-hidden rounded-xl">
          <NuxtImg
            :src="img"
            :alt="alt"
            class="w-full h-full"
            fit="cover"
          />
        </div>
        <div class="text-left md:text-center grid gap-2">
          <p class="text-base font-semibold text-primary">
            {{ eyebrow }}
          </p>
          <h2 class="text-3xl sm:text-5xl font-semibold text-balance">
            {{ title }}
          </h2>
          <p class="text-base text-muted max-w-3xl mx-auto">
            {{ description }}
          </p>
          <div v-if="links && links?.length > 0" class=" flex flex-col sm:flex-row mt-2 gap-2 justify-start md:justify-center">
            <UButton
              v-for="link in links"
              :key="link.label"
              size="xl"
              :variant="link.variant"
              :to="link.to"
              :color="link.color"
              class=""
            >
              {{ link.label }}
            </UButton>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>
