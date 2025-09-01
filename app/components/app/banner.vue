<script setup lang="ts">
type Link = {
  to: string;
  label: string;
  variant?: string;
  color?: 'primary' | 'neutral';
};

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
  <section id="cta" class="py-12 md:py-24">
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
          <h2 class="text-2xl sm:text-3xl font-semibold text-balance">
            {{ title }}
          </h2>
          <p class="text-base md:text-lg text-muted max-w-3xl mx-auto">
            {{ description }}
          </p>
          <div v-if="links?.length > 0" class=" flex flex-col sm:flex-row mt-2 gap-2 justify-start md:justify-center">
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
