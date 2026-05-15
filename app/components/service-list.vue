<script setup>
const { services } = await useServicesList();
</script>

<template>
  <section v-if="services">
    <ul>
      <li v-for="(service, idx) in services" :key="service.id">
        <chip-link :idx="idx" :order="service.order" :title="service.title" :slug="service.link" />
      </li>
    </ul>
  </section>
</template>

<style scoped>
section {
  display: grid;
  grid-column: 1/-1;
  grid-template-columns: subgrid;
  z-index: 4;

  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

.title {
  grid-column: 2;
}

ul {
  display: grid;
  grid-column: 1/-1;
  grid-template-columns: repeat(2, 1fr);

  :nth-child(even) a {
    border-left: 1px solid var(--border-color-default);
  }

  @media (min-width: 700px) {
    grid-template-columns: repeat(3, 1fr);

    :nth-child(even) a {
      border-left: unset;
    }

    :not(:nth-child(1)):not(:nth-child(4)) a {
      /**    border-left: 1px solid var(--border-color-default)**/
    }
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(5, 1fr);
    /**
    li:not(:first-of-type) a {
      border-left: 1px solid var(--border-color-default)
    }**/
  }
}
</style>
