<script setup lang="ts">// fake comment
// oxlint-disable-next-line no-unused-vars
const { data: coreValues } = await useAsyncData('core-values', () => $fetch('/api/coreValues'), {
  server: true,
  lazy: false,
  default: () => [],
});
</script>

<template>
  <section class="core-values site-max" aria-labelledby="core-values-title">
    <div class="core-values-grid">
      <div class="desktopContent">
        <div class="title-wrapper">
          <div class="title">
            <app-typography
              tag="h2"
              variant="heading-huge"
              bold="true"
            >
              Our<br><span>Core</span><br><span>Values</span>
            </app-typography>
            <app-typography
              v-gsap.splitText.words.mask.whenVisible.reversable.from="{ opacity: 0, stagger: 0.5 }"
              tag="p"
              variant="text-md"
            >
              The way we lead projects is the way we lead people: with clarity, discipline, humility, and a commitment
              to leave every partnership stronger than we found it.
            </app-typography>
          </div>
          <NuxtImg
            src="https://ik.imagekit.io/pnixsw7lg/main-website/EH_USFSPDavisHall_Int_21.webp?updatedAt=1771413849873"
            alt=""
            class="overlay-img"
          />
        </div>
      </div>
      <!-- Values -->
      <div class="grid grid-cols-2">
        <article
          v-for="(item, index) in coreValues"
          :key="item.id || item.path || item.title"
          class="core-values-card"
        >
          <span class="core-values-card__index">
            {{ String(index + 1).padStart(2, '0') }}
          </span>
          <app-typography
            tag="h3"
            variant="heading-md"
            class="core-values-card__title"
          >
            {{ item.title }}
          </app-typography>
          <ContentRenderer :value="item?.meta?.body || ''" class="core-values-card__body prose" />
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.core-values {
}

.core-values-grid {
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 700px) {
    .core-values-grid {
      grid-template-columns: repeat(1, 1fr);
      align-items: start;
    }
  }
}

.desktopContent {
  position: relative;

  @media (min-width: 850px) {
    height: 100%;
  }
}

.title-wrapper {
  position: sticky;
  top: 0;
  overflow: hidden;
  isolation: isolate;

  .title {
    display: grid;
    place-content: center;
    height: 100vh;
    max-width: 600px;
    margin-inline: auto;
    padding-inline: calc(var(--spacing) * 4);
    z-index: 5;

    h2 {
      font-weight: 600;
      text-transform: uppercase;
      margin-bottom: calc(var(--spacing) * 4);

      span:first-of-type {
        color: var(--color-envision-blue-500);
      }
    }

    p {
      font-size: 2rem;
      line-height: 1.1;
      text-wrap: wrap;
    }
  }
}

.overlay-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  object-fit: cover;
  mix-blend-mode: color;
  opacity: 0.1;
  filter: grayscale();
  z-index: 2;
}

.core-values-card {
  position: relative;
  padding: calc(var(--spacing) * 4);
}

.core-values-lead {
  overflow: hidden;
  isolation: isolate;
  display: grid;
  place-content: center;
}

.core-values-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: flex-start;
  padding-top: clamp(2.4rem, 3.2vw, 3rem);
  box-shadow: 0 0 0 1px color-mix(in oklch, var(--color-envision-blue-900) 7%, white);
}

.core-values-card__index {
  color: var(--ui-primary);
  font-weight: 600;
}

.core-values-card__title {
  margin: 0;
  text-wrap: balance;
  font-weight: 600;
}

.core-values-card__body {
  margin: 0;
  color: color-mix(in oklch, var(--color-envision-blue-900) 68%, white);
}

.core-values-card__body:deep(p) {
  margin: 0;
  max-width: 60ch;
  font-size: 1.05rem;
  line-height: 1.5;
  font-style: italic;
  text-wrap: balance;
}

.core-values-card__body:deep(p:first-of-type) {
  color: color-mix(in oklch, var(--color-envision-blue-950) 76%, white);
}

.core-values-card__body:deep(ul) {
  padding: 0;
  list-style: none;
  display: grid;
}

.core-values-card__body:deep(li) {
  position: relative;
  padding-left: 1rem;
  font-size: 0.92rem;
  line-height: 1;
}

.core-values-card__body:deep(li)::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55rem;
  width: 0.45rem;
  height: 1px;
  background: var(--color-envision-green-500);
}

.core-values-card--fallback {
  justify-content: center;
}

.core-values-card__fallback-copy {
  margin: 0;
  max-width: 30ch;
  color: color-mix(in oklch, var(--color-envision-blue-900) 68%, white);
}

@media (min-width: 700px) {
  .core-values-grid {
    grid-template-columns: minmax(0, 1.06fr) minmax(0, 0.94fr);
    align-items: start;
  }

  .core-values-lead,
  .core-values-card {
    min-height: 22rem;
  }
}

@media (min-width: 1100px) {
  .core-values-lead,
  .core-values-card {
    min-height: 21rem;
  }

  .core-values-lead__copy {
    max-width: 15ch;
  }
}
</style>
