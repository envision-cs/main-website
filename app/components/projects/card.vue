<script setup lang="ts">
defineProps<{
  image: string;
  title: string;
  area: string;
  sector: string;
  location: string;
  completed: string;
  to: string;
}>();
</script>

<template>
  <NuxtLink
    :to="to"
    :aria-label="title"
    class="project-wrapper"
  >
    <article class="project-card ">
      <div class="project-card__media">
        <NuxtImg
          :src="image"
          :alt="title"
          class="image aspect-square object-fill"
          format="webp"
          densities="x1 x2"
        />
      </div>
      <header class="title">
        <app-typography class="h3" variant="heading-md">
          {{ title }}
        </app-typography>
      </header>
      <ul class="stats">
        <li>
          <app-typography class="p" variant="heading-sm">
            Location
          </app-typography>
          {{ location }}
        </li>
        <li>
          <app-typography class="p" variant="heading-sm">
            Area
          </app-typography>
          {{ area }}
        </li>
        <li>
          <app-typography class="p" variant="heading-sm">
            Completed
          </app-typography>
          {{ completed }}
        </li>
      </ul>
      <footer class="sector">
        {{ sector }}
        <UIcon name="i-lucide-arrow-right" />
      </footer>
    </article>
  </NuxtLink>
</template>

<style scoped>
.project-wrapper {
  container-type: inline-size;
  border-bottom: 1px solid var(--ui-border);
  background: transparent;
  transition:
    background 0.4s ease,
    color 0.4s ease;
}

.project-wrapper:hover {
  background: var(--color-envision-blue-700);
  color: #fff;
}

.project-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: calc(var(--spacing) * 0);

  @media (width > 700px) {
    padding: calc(var(--spacing) * 4);
  }

  @container (width > 450px) {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas:
      'img img . title title title title title title title title title'
      'stats stats stats stats stats stats stats stats stats stats stats stats'
      'sector sector sector sector sector sector sector sector sector sector sector sector';
  }

  @container (width > 800px) {
    grid-template-areas:
      'img img . title title title title title . sector sector sector'
      'stats stats stats stats stats stats stats stats stats stats stats stats';
  }
}

.project-card__media {
  grid-area: img;
}

.title {
  grid-area: title;
}

.stats {
  display: grid;
  grid-area: stats;
  grid-template-columns: 1fr 1fr;
  flex-wrap: wrap;

  li {
    grid-column: span 1;
  }

  @container (width > 450px) {
    display: grid;
    grid-template-columns: subgrid;

    li {
      grid-column: span 4;
    }
  }
}

.sector {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  grid-area: sector;
}
</style>
