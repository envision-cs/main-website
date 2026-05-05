<script setup lang="ts">
defineProps<{
  idx: number;
  title: string;
  slug: string;
  order: number;
}>();
</script>
<template>
  <NuxtLink :to="`services${slug}`" class="link">
    <div class="order">0{{ order }}</div>
    <div class="title">
      {{ title }}
    </div>
    <div class="learn">Learn More</div>
  </NuxtLink>
</template>

<style scoped>
.link {
  display: flex;
  justify-content: end;
  flex-direction: column;
  color: #fff;
  gap: 0.4px;
  height: 100%;
  font-size: 1rem;
  position: relative;

  padding: calc(var(--spacing) * 4);

  @media (min-width: 1200px) {
    font-size: 1rem;
  }
}

.link::after {
  content: "";
  position: absolute;
  height: 8px;
  border: 1px solid var(--color-envision-blue-500);
  background-color: var(--color-envision-blue-500);
  transform: scaleX(0);
  transform-origin: center left;
  width: 100%;
  bottom: 0;
  left: 0;

  transition: all 400ms ease;
}

.link:hover::after {
  content: "";
  position: absolute;
  transform: scaleX(1);
  height: 8px;
  border: 1px solid var(--color-envision-blue-500);
  background-color: var(--color-envision-blue-500);
  width: 100%;
  bottom: 0;
  left: 0;
}

.order {
  color: var(--color-envision-blue-500);
  font-weight: 600;
  font-size: 1.2em;
}

.learn {
  font-size: 0.8em;
  text-transform: uppercase;
}
</style>
