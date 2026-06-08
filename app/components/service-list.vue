<script setup>const { services } = await useServicesList();
</script>

<template>
  <section v-if="services">
    <ul>
      <li v-for="service in services" :key="service.id">
        <chip-link :title="service.title" :to="service.to" />
      </li>
    </ul>
  </section>
</template>

<style scoped>
section {
  width: 100%;
}

ul {
  display: flex;
  flex-wrap: wrap;
  gap: calc(var(--spacing) * 2);
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
