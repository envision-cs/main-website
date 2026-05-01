<script setup>
const { services } = await useServicesList();
</script>

<template>
  <section-a
    class="section"
    title="Our services"
    body="Construction services shaped for complex schedules, demanding coordination, and institution-grade execution."
  >
    <ul v-if="services">
      <li v-for="(service, idx) in services" :key="service.id">
        <chip-link :idx="idx" :title="service.title" :slug="service.link" />
      </li>
    </ul>
  </section-a>
</template>

<style scoped>
ul {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
