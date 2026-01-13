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
    <app-header-b />
    <div class="divider">
      <UMain :style="mainStyle">
        <slot />
      </UMain>
    </div>
    <SpeedInsights />
    <app-footer />
  </div>
</template>

<style scoped>
.divider {
  position: relative;
}

.divider::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 0px;
  height: 100%;
  background-color: var(--ui-border);

  @media (min-width: 800px) {
    width: 1px;
  }
}
</style>
