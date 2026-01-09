<script setup lang="ts">
const props = defineProps<{
  image?: string;
  body?: string;
}>();

const img = useImage();

const bgStyles = computed(() => {
  if (!props.image)
    return {};
  const url = props.image.startsWith('/') ? props.image : `/${props.image}`;

  const mobile = img(url, { width: 700, format: 'webp' });
  const tablet = img(url, { width: 1200, format: 'webp' });
  const desktop = img(url, { width: 1920, format: 'webp' });

  return {
    '--banner-image-mobile': `url("${mobile}")`,
    '--banner-image-tablet': `url("${tablet}")`,
    '--banner-image-desktop': `url("${desktop}")`,
  };
});
</script>

<template>
  <section class="banner" :style="bgStyles">
    <div class="header my-auto">
      <app-typography tag="h1" variant="heading-huge">
        <slot />
      </app-typography>

      <app-typography tag="p" variant="heading-md">
        <slot name="title" />
      </app-typography>
    </div>

    <div class="content site-grid">
      <app-typography
        tag="p"
        variant="text-lg"
        class="text"
      >
        {{ body }}
      </app-typography>

      <!-- wrap the slot so you can style it -->
      <div class="image-container">
        <slot name="image" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.banner {
  display: flex;
  isolation: isolate;
  position: relative;
  flex-direction: column;
  gap: calc(var(--spacing) * 4);
  min-height: 350px;
  grid-column: 1 / -1;
  padding-top: calc(var(--spacing) * 24);
  padding-inline: calc(var(--spacing) * 4);
  padding-bottom: calc(var(--spacing) * 4);
  color: var(--ui-text-inverted);

  @media (min-width: 700px) {
    padding-inline: calc(var(--spacing) * 8);
    min-height: calc(var(--spacing) * 150);
  }
}

.header {
  margin-top: auto;
}

.content {
  display: grid;
  padding: 0;
  gap: calc(var(--spacing) * 4);
}

.text {
  margin-top: auto;
  grid-column: 1 / -1;
}

@media (min-width: 483px) {
  .text {
    grid-column: span 3;
  }
}

@media (min-width: 700px) {
  .text {
    grid-column: 8 / -1;
  }
}

@media (min-width: 1024px) {
  .text {
    grid-column: 18 / -1;
  }
}

.image-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: -10;

  --bg-image: var(--banner-image-mobile);

  @media (min-width: 700px) {
    --bg-image: var(--banner-image-tablet);
  }

  @media (min-width: 1024px) {
    --bg-image: var(--banner-image-desktop);
  }

  background:
    linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%),
    linear-gradient(180deg, rgba(0, 0, 0, 0) 43.16%, rgba(0, 0, 0, 0.55) 64.7%, rgba(0, 0, 0, 0.6) 81.1%),
    var(--bg-image) 50% / cover no-repeat;
}
</style>
