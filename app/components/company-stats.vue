<script lang="ts" setup>
const stats = [
  { id: 1, value: "2009", label: "Established" },
  { id: 2, value: "$180M+", label: "Project Delivery" },
  { id: 3, value: "90%", label: "Repeat Clients" },
  { id: 4, value: "Central Florida", label: "Regional Coverage" },
];
</script>
<template>
  <section>
    <ul>
      <li v-for="stat in stats" :key="stat.id">
        <div class="stat">
          <app-typography tag="h4" variant="heading-xl">
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
  gap: calc(var(--spacing) * 8);
  padding-inline: calc(var(--spacing) * 4);
  padding-block: calc(var(--spacing) * 16);
}

ul {
  display: grid;
  grid-column: 1/-1;
  grid-template-columns: subgrid;

  gap: calc(var(--spacing) * 8);

  align-items: center;
}

li {
  padding: calc(var(--spacing) * 3);
  grid-column: span 2;

  &:nth-child(even) {
    border-left: 1px solid var(--ui-border);
  }

  &:last-child {
    h4 {
      font-size: 2.5rem;
    }
  }

  @media (min-width: 700px) {
    grid-column: span 6;

    &:nth-child(even) {
      border-left: 1px solid var(--ui-border);
    }
  }

  @media (min-width: 1024px) {
    grid-column: span 6;

    &:not(:first-child) {
      border-left: 1px solid var(--ui-border);
    }
  }
}

.stat {
  text-align: center;
}
</style>
