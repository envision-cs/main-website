<script setup>
const { services } = await useServicesList();
</script>

<template>
  <section-a class="section" title="Our services">
    <ul>
      <li v-for="service in services" :key="service.id">
        {{ service.order }}
        {{ service.title }}
      </li>
    </ul>
  </section-a>
</template>

<style></style>
