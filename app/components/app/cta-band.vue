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
}>();
</script>

<template>
  <section id="cta" class="py-12 md:py-24">
    <UContainer class="text-left md:text-center grid gap-2">
      <p class="text-base font-semibold text-primary">
        {{ eyebrow }}
      </p>
      <h2 class="text-2xl sm:text-3xl font-semibold">
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
    </UContainer>
  </section>
</template>
