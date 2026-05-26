<script setup lang="ts">
withDefaults(
  defineProps<{
    body?: string;
    image?: string;
    flip?: boolean;
    center?: boolean;
    href?: string;
    label?: string;
    title: string;
    eyebrow?: string;
    bgcolor?: "light" | "dark" | "blue";
  }>(),
  {
    bgcolor: "light",
  },
);
</script>

<template>
  <section
    :class="{
      blue: bgcolor === 'blue',
      dark: bgcolor === 'dark',
      light: bgcolor === 'light',
      flip: flip,
      center: center,
    }"
  >
    <div class="content">
      <section-header-a :eyebrow :title="title" :body :button-to="href" :button-label="label">
        <template #title>
          <slot name="title" />
        </template>

        <template #body>
          <slot name="body" />
        </template>
      </section-header-a>
    </div>
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

.blue {
  --section-bg: var(--color-envision-blue-900);
  --section-color: var(--color-white);
}

.center {
  text-align: center;

  :deep(.l-stack) {
    align-items: center;
  }

  :deep(.action) {
    margin-inline: auto;
  }
}

section {
  margin-inline: auto;
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: 1fr;
  gap: 0;
  align-items: center;
  overflow: clip;
  background-color: var(--section-bg);
  color: var(--section-color);
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
  justify-content: center;
  text-align: center;
  direction: ltr;

  @media (min-width: 700px) {
  }

  @media (min-width: 1024px) {
  }
}

.image {
  height: unset;
  overflow: hidden;
  width: 100%;
  min-height: 500px;
  max-height: 300px;
  object-fit: cover;

  @media (min-width: 700px) {
    max-height: 600px;
  }

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
