<template>
  <section class="site-grid section">
    <div class="content">
      <app-typography tag="h1" variant="heading-huge">
        MEET THE TEAM
      </app-typography>

      <app-typography
        tag="p"
        variant="text-xl"
        class="text-muted"
      >
        How we chose to empower our team members is by recognizing their strengths, discovering where they best fit into
        the daily operations and developing a title that best illustrates the value that the team member adds to the
        company. Meet the Envision team.
      </app-typography>
    </div>
    <div class="image">
      <NuxtImg src="/greater-tampa-realtors-02.jpg" />
    </div>
  </section>
</template>

<style scoped>
.section {
  margin-top: calc(var(--spacing) * 16);
}

.content {
  display: flex;
  flex-direction: column;
  align-self: center;
  grid-column: 1 / -1;

  @media (min-width: 700px) {
    grid-column: 1/7;
  }

  @media (min-width: 1024px) {
    grid-column: span 12;
  }
}

.image {
  grid-column: 1 / -1;

  @media (min-width: 700px) {
    grid-column: 7/-1;
  }

  @media (min-width: 1024px) {
    grid-column: 13/-1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
