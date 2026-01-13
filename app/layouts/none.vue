<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/nuxt';

const { width } = useWindowSize();
const isClient = ref(false);

onMounted(() => {
  isClient.value = true;
});

const mainStyle = computed(() => {
  if (!isClient.value)
    return {};

  const w = width.value ?? 400;
  return {
    '--vw': `${w * 0.15}px`,
  };
});
</script>

<template>
  <div>
    <app-header />
    <UMain :style="mainStyle">
      <slot />
    </UMain>
    <SpeedInsights />
    <app-footer />
  </div>
</template>
