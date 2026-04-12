<script setup lang="ts">
const { services } = await useServicesList();
definePageMeta({
  layout: "layout-a",
});
</script>

<template>
  <app-team-member-list dense>
    <li v-for="service in services" :key="service.slug">
      <app-reveal-card
        :to="service.to"
        :aria-label="service.title"
        :image="service.image"
        :alt="service.title"
        aspect-ratio="3/4"
      >
        <template #title>
          <app-typography class="h3 project-card-title" variant="heading-md">
            {{ service.title }}
          </app-typography>
        </template>
        <template #meta>
          <span class="submenu-reveal-card__meta">
            View service
            <UIcon name="i-lucide-arrow-right" aria-hidden="true" />
          </span>
        </template>
      </app-reveal-card>
    </li>
  </app-team-member-list>
</template>

<style scoped>
.submenu-reveal-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
