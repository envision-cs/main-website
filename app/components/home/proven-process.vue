<script setup lang="ts">
const { data: our_process, pending, error } = await useAsyncData('our-process', () => $fetch('/api/process'), {
  server: true,
  lazy: false,
  default: () => [],
});
</script>

<template>
  <div>
    <app-cta-a
      text="Building Without the Headaches"
      body="Our proven process brings structure and consistency to every project. We listen, plan, and execute to
        reduce risk, maintain alignment, and deliver on time, on budget, and with complete transparency."
      image="https://ik.imagekit.io/pnixsw7lg/main-website/usl-super-league-01.jpg"
      flip
      content-position="bottom-left"
    >
      Our <span>Proven</span> Process
    </app-cta-a>
    <app-accordion
      v-if="!pending && !error"
      :data="our_process"
      name="our-process"
    />
  </div>
</template>

<style scoped>
.content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-block: calc(var(--spacing) * 10);
  padding-inline: calc(var(--spacing) * 4);
  gap: calc(var(--spacing) * 20);
}
</style>
