<script setup lang="ts">
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
      <div>
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
            variant="heading-sm"
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
  height: 100vh;
  position: relative;

  @media (min-width: 850px) {
    height: 300vh;
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
}

.core-values-lead {
  overflow: hidden;
  isolation: isolate;
  display: grid;
  place-content: center;
}

.core-values-lead__inner {
  position: relative;
  z-index: 1;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
}

.core-values-lead__eyebrow,
.core-values-card__index {
  margin: 0;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.core-values-lead__eyebrow {
  color: var(--color-envision-blue-500);
}

.core-values-lead__title {
  margin: 0;
  text-transform: uppercase;
  line-height: 0.9;
  text-wrap: balance;
  max-width: 7ch;
}

.core-values-lead__title :deep(span:first-of-type) {
  color: var(--color-envision-blue-500);
}

.core-values-lead__title-accent {
  color: var(--color-envision-green-500);
}

.core-values-lead__copy {
  max-width: 16ch;
  margin: 0;
  font-size: clamp(1.45rem, 2.6vw, 2.1rem);
  color: color-mix(in oklch, var(--color-envision-blue-900) 74%, white);
  line-height: 1.08;
  text-wrap: pretty;
}

.core-values-lead__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid color-mix(in oklch, var(--color-envision-blue-900) 12%, white);
  color: color-mix(in oklch, var(--color-envision-blue-900) 54%, white);
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.core-values-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: flex-start;
  padding-top: clamp(2.4rem, 3.2vw, 3rem);
  box-shadow: 0 0 0 1px color-mix(in oklch, var(--color-envision-blue-900) 7%, white);
}

.core-values-card__title {
  margin: 0;
  color: color-mix(in oklch, var(--color-envision-blue-950) 88%, var(--color-envision-green-900) 12%);
  line-height: 1;
  text-wrap: balance;
  max-width: 10ch;
}

.core-values-card__body {
  margin: 0;
  color: color-mix(in oklch, var(--color-envision-blue-900) 68%, white);
}

.core-values-card__body:deep(p) {
  margin: 0;
  max-width: 24ch;
  font-size: 1.05rem;
  line-height: 1.5;
  text-wrap: pretty;
}

.core-values-card__body:deep(p:first-of-type) {
  color: color-mix(in oklch, var(--color-envision-blue-950) 76%, white);
}

.core-values-card__body:deep(ul) {
  margin: 1.3rem 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.75rem;
  max-width: 26ch;
}

.core-values-card__body:deep(li) {
  position: relative;
  padding-left: 1rem;
  font-size: 0.92rem;
  line-height: 1.45;
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

  .core-values-lead {
    grid-row: span 2;
    min-height: calc(44rem + clamp(0.85rem, 1.8vw, 1.25rem));
  }

  .core-values-card:nth-child(4) {
    min-height: 25rem;
  }

  .core-values-card:nth-child(5) {
    margin-top: -2.5rem;
    min-height: 23rem;
    z-index: 1;
  }

  .core-values-card:nth-child(6) {
    min-height: 19rem;
  }
}

@media (min-width: 1100px) {
  .core-values-lead,
  .core-values-card {
    min-height: 21rem;
  }

  .core-values-lead {
    grid-row: span 2;
    min-height: calc(42rem + clamp(0.85rem, 1.8vw, 1.25rem));
  }

  .core-values-card:nth-child(2) {
    min-height: 18rem;
  }

  .core-values-card:nth-child(3) {
    min-height: 23rem;
    margin-top: 2.5rem;
  }

  .core-values-card:nth-child(4) {
    min-height: 18rem;
    margin-top: -3.25rem;
  }

  .core-values-card:nth-child(5) {
    min-height: 24rem;
    margin-top: 0;
  }

  .core-values-card:nth-child(6) {
    min-height: 19rem;
    margin-top: -1.5rem;
  }

  .core-values-lead__copy {
    max-width: 15ch;
  }
}
</style>
