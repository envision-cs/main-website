<script lang="ts" setup>
const stats = [
  { id: 1, value: "2009", label: "Established" },
  { id: 2, value: "$180M+", label: "Project Delivery" },
  { id: 3, value: "90%", label: "Repeat Clients" },
  { id: 4, value: "Greater Tampa bay + Central Florida", label: "Regional Coverage" },
];
</script>
<template>
  <section>
    <ul>
      <li v-for="stat in stats" :key="stat.id">
        <div class="stat">
          <app-typography tag="h4" variant="heading-lg" bold>
            {{ stat.value }}
          </app-typography>
          <app-typography tag="p" variant="text-lg">
            {{ stat.label }}
          </app-typography>
        </div>
      </li>
    </ul>
  </section>
</template>
<style scoped>
section {
  display: grid;
  grid-column: 1/-1;
  grid-template-columns: subgrid;
}

ul {
  display: grid;
  grid-column: 1/-1;
  grid-template-columns: subgrid;
  align-items: center;
}

li {
  grid-column: 1/-1;

  &:nth-child(4) {
    grid-column: 1/-1;
  }

  @media (min-width: 700px) {
    grid-column: span 4;
  }

  @media (min-width: 1024px) {
    grid-column: span 8;
  }
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: calc(var(--spacing) * 4);
}

li:nth-child(1) {
  background-color: var(--color-envision-blue-600);
}

li:nth-child(2) {
  background-color: var(--color-envision-green-500);
}

li:nth-child(3) {
  background-color: var(--color-envision-gray-700);
}

li:nth-child(4) {
  background-color: #435a66;
}
</style>
