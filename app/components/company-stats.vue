<script setup lang="ts">
defineProps<{
  items: Item[];
}>();
</script>

<template>
  <section class="section">
    <div class="stats-container">
      <stats-card
        stat="Regional Coverage"
        description="Greater Tampa Bay + Central Florida"
        class="feature"
      />
      <div class="stats-wrapper">
        <ul>
          <li v-for="(stat, idx) in slides" :key="idx">
            <stats-card :stat="stat.label" :color="stat.tone" :description="stat.description" />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  align-items: center;
  place-content: center;

  @media (min-width: 700px) {
    padding-block: calc(var(--spacing) * 8);
    padding-inline: calc(var(--spacing) * 8);
  }
}

.stats-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column: 1/-1;
  margin-inline: auto;
  align-items: center;
  width: 100%;

  @media (min-width: 870px) {
    width: auto;
  }
}

.feature {
  grid-column: 1/-1;

  @media (min-width: 870px) {
    grid-column: 1;
  }
}

.header-wrapper {
  grid-column: 1/-1;
}

.stats-wrapper {
  container-type: inline-size;
  grid-column: 1/-1;

  @media (min-width: 870px) {
    grid-column: 2;
  }
}

ul {
  display: flex;
  grid-auto-flow: column;
  gap: calc(var(--spacing) * 4);
  flex-wrap: wrap;
}
</style>
