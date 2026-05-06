<script setup lang="ts">
withDefaults(
  defineProps<{
    body?: string;
    image?: string;
    flip?: boolean;
    href?: string;
    label?: string;
    title: string;
    eyebrow?: string;
    bgcolor?: "light" | "dark";
  }>(),
  {
    bgcolor: "light",
  },
);
</script>

<template>
  <section :class="{ dark: bgcolor === 'dark', light: bgcolor === 'light', flip: flip }">
    <div class="content">
      <section-header-a :eyebrow :title="title" :body :button-to="href" :button-label="label">
        <template #body>
          <div class="body">
            <slot name="body" />
          </div>
        </template>
      </section-header-a>
    </div>
    <NuxtImg
      :src="image"
      provider="imagekit"
      :modifiers="{ focus: 'bottom' }"
      format="webp"
      loading="lazy"
      class="image"
      fit="cover"
      placeholder
    />
  </section>
</template>

<style scoped>
.light {
  --section-bg: var(--color-white);
  --section-color: var(--color-envision-gray-900);
}

.dark {
  --section-bg: var(--color-envision-gray-900);
  --section-color: var(--color-white);
}

section {
  margin-inline: auto;
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: 1fr;
  gap: calc(var(--spacing) * 8);
  align-items: center;
  overflow: clip;
  background-color: var(--section-bg);
  color: var(--section-color);

  @media (width > 120ch) {
    grid-template-columns: 1fr 1fr;
  }
}

.flip {
  direction: rtl;
}

.content {
  z-index: 1;
  height: 100%;
  padding-block: calc(var(--spacing) * 12);
  display: grid;
  align-items: center;
  direction: ltr;
}

.body {
  container-type: inline-size;
  width: 100%;
}

.image {
  height: unset;
  overflow: hidden;
  width: 100%;
  height: 100%;
  min-height: 500px;
  object-fit: cover;

  @media (min-width: 1024px) {
    max-height: 800px;
  }

  img {
    height: 100%;
    width: 100%;
    max-inline-size: 100%;
  }
}
</style>
