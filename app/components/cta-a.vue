<script setup lang="ts">
defineProps<{
  body?: string;
  image?: string;
  flip?: boolean;
  href?: string;
  label?: string;
  title: string;
  eyebrow?: string;
}>();
</script>

<template>
  <section>
    <div class="content">
      <section-header-a :eyebrow :title="title" :body :button-to="href" :button-label="label">
        <template #body>
          <slot name="body" />
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
section {
  margin-inline: auto;
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: 1fr;
  gap: 0;
  align-items: center;
  overflow: clip;

  @media (width > 120ch) {
    grid-template-columns: 1fr 1fr;
  }
}

.content {
  z-index: 1;
  height: 100%;
  padding-block: calc(var(--spacing) * 12);
  display: flex;
  align-items: center;

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
