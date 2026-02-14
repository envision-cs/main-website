<script setup lang="ts">
defineProps<{
  image: string;
  title: string;
  area: string;
  sector: string;
  location: string;
  completed: string;
  to: string;
}>();
</script>

<template>
  <app-reveal-card
    :to="to"
    :aria-label="title"
    class="project-wrapper"
    :image="image"
    :alt="title"
    aspect-ratio="3/4"
    image-densities="x1 x2"
    image-object-fit="cover"
    :container-type="true"
    :rounded="false"
    :outlined="false"
    :title-offset="8"
    details-delay="120ms"
    meta-delay="220ms"
  >
    <template #title>
      <app-typography class="h3 project-title" variant="heading-md">
        {{ title }}
      </app-typography>
    </template>
    <template #details>
      <ul class="stats">
        <li v-if="location">
          <app-typography tag="p" variant="eyebrow-md">
            Location
          </app-typography>
          <app-typography tag="p">
            {{ location }}
          </app-typography>
        </li>
        <li v-if="area">
          <app-typography tag="p" variant="eyebrow-md">
            Area
          </app-typography>
          <app-typography tag="p">
            {{ area }}
          </app-typography>
        </li>
        <li v-if="completed">
          <app-typography tag="p" variant="eyebrow-md">
            Completed
          </app-typography>
          <app-typography tag="p">
            {{ completed }}
          </app-typography>
        </li>
      </ul>
    </template>
    <template #meta>
      <div class="sector">
        {{ sector }}
        <UIcon name="i-lucide-arrow-right" />
      </div>
    </template>
  </app-reveal-card>
</template>

<style scoped>
.project-title {
  margin-bottom: 0.5rem;
  text-wrap: balance;
}

.stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem 1rem;
  margin-bottom: 1rem;
  li {
    grid-column: span 1;
  }
}

.sector {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
