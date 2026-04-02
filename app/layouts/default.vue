<script setup lang="ts">
const { width } = useWindowSize();
const isClient = ref(false);

onMounted(() => {
  isClient.value = true;
});

const mainStyle = computed(() => {
  if (!isClient.value) return {};

  const w = width.value ?? 400;
  return {
    "--vw": `${w * 0.15}px`,
  };
});
</script>

<template>
  <div class="win-desktop-bg">
    <app-header />
    <div class="">
      <UMain :style="mainStyle" class="win-main">
        <slot />
      </UMain>
    </div>
    <app-footer />
  </div>
</template>

<style scoped>
.win-desktop-bg {
  background-color: var(--color-win-teal);
  min-height: 100dvh;
}

.win-main {
  background: var(--color-win-gray-light);
}
</style>
