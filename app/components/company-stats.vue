<script setup lang="ts">
// {
//   id: 1,
//   title: "Greater Tampa Bay + Central Florida",
//   description: "Regional Coverage",
//   tone: "--color-envision-blue-800",
// },
const slides = [
  {
    id: 2,
    title: "2009",
    description: "Established",
    tone: "--color-envision-blue-600",
  },
  {
    id: 3,
    title: "$180M+",
    description: "Project Delivery",
    tone: "--color-envision-green-500",
  },
  {
    id: 4,
    title: "90%",
    description: "Repeat Clients",
    tone: "--color-envision-gray-700",
  },
  {
    id: 5,
    title: "16yrs",
    description: "Tampa Bay Exerience",
    tone: "--color-envision-blue-800",
  },
];
</script>

<template>
  <section>
    <div class="header-wrapper">
      <section-header-a title="Regional coverage" body="Greater Tampa Bay + Central Florida" />
    </div>
    <div class="stats-wrapper">
      <ul>
        <li v-for="(stat, idx) in slides" :key="idx">
          <stats-card :stat="stat.title" :color="stat.tone" :description="stat.description" />
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
section {
  padding-block: calc(var(--spacing) * 8);
  padding-inline: calc(var(--spacing) * 0);
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: subgrid;
  gap: 0;
  align-items: center;

  @media (min-width: 700px) {
    padding-block: calc(var(--spacing) * 8);
    padding-inline: calc(var(--spacing) * 8);
  }
}

.header-wrapper {
  grid-column: 1/-1;
}

.stats-wrapper {
  grid-column: 1/-1;
  container-type: inline-size;

  padding-inline: calc(var(--spacing) * 4);
}

ul {
  display: grid;
  grid-template-columns: 1fr 1fr;

  @container (width > 700px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
</style>
