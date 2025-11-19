<template>
  <section>
    <app-display-card
      title="Greater Tampa Realtors"
      link="/projects/business_corporate/greater-tampa-realtors"
      image="/greater-tampa-realtors-01.jpg"
      sector="Business/Corporate"
      completed="2024"
    />
    <app-display-card />
  </section>
</template>

<style scoped>
section {
  display: grid;
  gap: calc(var(--spacing) * 8);

  @media (min-width: 750px) {
    grid-template-columns: 1fr 2fr;
  }
}
</style>
