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

const contentRef = useTemplateRef<HTMLDivElement | null>('contentRef');
const contentHeight = ref(0);

onMounted(() => {
  if (contentRef.value) {
    contentHeight.value = contentRef.value.clientHeight;
  }
});
</script>

<template>
  <NuxtLink
    :to="to"
    :aria-label="title"
    class="project-wrapper"
  >
    <article class="project-card ">
      <NuxtImg
        :src="image"
        :alt="title"
        class="image w-full h-full object-fill"
        format="webp"
        densities="x1 x2"
      />
      <div class="content" :style="{ '--titleHeight': `${contentHeight - 8}px` }">
        <header ref="contentRef" class="title">
          <app-typography class="h3" variant="heading-md">
            {{ title }}
          </app-typography>
        </header>
        <ul class="stats">
          <li v-if="location">
            <app-typography tag="p" variant="eyebrow-md">
              Location
            </app-typography>
            <app-typography tag="p">
              {{ location }}
            </app-typography>
          </li>
          <li v-if="area">
            <app-typography tag="p" variant="eyebrow-md">
              Area
            </app-typography>
            <app-typography tag="p">
              {{ area }}
            </app-typography>
          </li>
          <li v-if="completed">
            <app-typography class="p" variant="eyebrow-md">
              Completed
            </app-typography>
            <app-typography tag="p">
              {{ completed }}
            </app-typography>
          </li>
        </ul>
        <footer class="sector">
          {{ sector }}
          <UIcon name="i-lucide-arrow-right" />
        </footer>
      </div>
    </article>
  </NuxtLink>
</template>

<style scoped>
:global(:root) {
  --ease: var(--ease-base);
}

.project-wrapper {
  container-type: inline-size;
  display: block;
  overflow: hidden;

  &:hover {
    .image {
      filter: blur(5px);
      transform: scale(1.1);
    }

    .content,
    .stats,
    .sector {
      transform: translateY(0);
    }
  }
}

.project-card {
  position: relative;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.5rem;
  color: white;
  isolation: isolate;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0) 100%);
    z-index: 1;
    pointer-events: none;
  }
}

.image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(0);
  z-index: 0;
  transition:
    transform 0.5s var(--ease),
    filter 0.5s var(--ease);
}

.content {
  z-index: 2;
  transform: translateY(calc(100% - var(--titleHeight)));
  transition: transform 0.5s var(--ease);
}

.title,
.stats,
.sector {
  position: relative;
  z-index: 2;
}

.title {
  margin-bottom: 0.5rem;
  text-wrap: balance;
}

.stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem 1rem;
  margin-bottom: 1rem;
  transform: translateY(100%);
  transition: transform 0.5s var(--ease);
  transition-delay: 120ms;

  li {
    grid-column: span 1;
  }
}

.sector {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgb(255 255 255 / 0.3);
  padding-top: 1rem;
  transform: translateY(100%);
  transition: transform 0.5s var(--ease);
  transition-delay: 220ms;
}
</style>
