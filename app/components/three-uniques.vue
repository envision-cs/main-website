<script setup lang="ts">
const { data: threeUniques } = await useAsyncData('three-uniques', () => $fetch('/api/threeUniques'), {
  server: true,
  lazy: true,
  default: () => [],
});
</script>

<template>
  <div>
    <app-typography tag="h2" variant="heading-md" />
    <app-typography
      variant="text-md"
      tag="p"
      class="max-w-[60ch]"
    />

    <app-cta-a
      text="Building Without the Headaches"
      body="At Envision, every decision we make is guided by a clear philosophy—three core principles that define how we
      work, why we work, and the impact we strive to create. These “Three Uniques” are more than values; they are the
      driving force behind our approach, shaping every project, partnership, and interaction."
      image="https://ik.imagekit.io/pnixsw7lg/main-website/HomePageAllens.webp"
      flip
      content-position="bottom-left"
    >
      Our <span>Three</span> Uniques
    </app-cta-a>
    <app-accordion :data="threeUniques" name="threeUniques" />
  </div>
</template>

<style scoped>
.cta {
  display: grid;
  border-block: 1px solid var(--ui-border);

  @media (min-width: 800px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

.cta-content {
  padding: calc(var(--spacing) * 4);

  @media (min-width: 800px) {
    padding: calc(var(--spacing) * 8);
  }
}
</style>
