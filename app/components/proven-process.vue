<script setup lang="ts">
import useEmblaCarousel from "embla-carousel-vue";

interface ProvenProcessSlide {
  id: number;
  eyebrow: string;
  title: string;
  description: string;
  tone: string;
}

const slides: ProvenProcessSlide[] = [
  {
    id: 1,
    eyebrow: "01",
    title: "Listen",
    description:
      "Every project begins with thoughtful listening. We take time to understand your vision, goals, and constraints. Through discovery meetings, site reviews, and clear communication, we lay the foundation for a partnership built on trust and alignment.",
    tone: "--color-envision-blue-600",
  },
  {
    id: 2,
    eyebrow: "02",
    title: "Plan",
    description:
      "Before any work begins, we bring certainty to the process. From budget-aligned designs and permitting to early trade coordination and risk mitigation, we focus on eliminating surprises and protecting your timeline from day one.",
    tone: "--color-envision-green-500",
  },
  {
    id: 3,
    eyebrow: "03",
    title: "Execute",
    description:
      "With the plan in place, we deliver with precision. Using tools like Procore, we provide full visibility, weekly updates, and proactive oversight. Our team owns the outcome, communicates clearly, and protects your project through to the final walkthrough.",
    tone: "--color-envision-gray-700",
  },
  {
    id: 4,
    eyebrow: "04",
    title: "Cultivate",
    description:
      "Our work doesn’t end at closeout. We stay engaged with system training, 30-60-90 day check-ins, and a one-year walkthrough. The goal: ensure your space performs, your team is supported, and your trust in us grows long after the build is done.",
    tone: "--color-envision-blue-800",
  },
];

const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
const goToPrev = () => emblaApi.value?.scrollPrev();
const goToNext = () => emblaApi.value?.scrollNext();

function resolveTone(tone?: string) {
  return tone ? `var(${tone})` : "var(--color-envision-blue-600)";
}
</script>

<template>
  <section>
    <header class="content">
      <app-typography tag="h2" variant="heading-huge"> Our Proven Process </app-typography>
      <app-typography tag="p" variant="text-lg">
        Our proven process brings structure and consistency to every project. We listen, plan, and
        execute to reduce risk, maintain alignment, and deliver on time, on budget, and with
        complete transparency.
      </app-typography>
    </header>

    <div class="embla">
      <div ref="emblaRef" class="embla__viewport">
        <ul class="embla__container">
          <li
            v-for="slide in slides"
            :key="slide.id"
            class="embla__slide"
            :style="{ '--content-slider-tone': resolveTone(slide.tone) }"
          >
            <div>
              <app-typography
                v-if="slide.eyebrow"
                tag="p"
                variant="eyebrow-md"
                class="content-slider__eyebrow"
              >
                {{ slide.eyebrow }}
              </app-typography>
              <app-typography
                tag="h3"
                variant="heading-lg"
                class="content-slider__slide-title text-semibold"
              >
                {{ slide.title }}
              </app-typography>
              <app-typography tag="p" variant="text-lg" class="content-slider__slide-body">
                {{ slide.description }}
              </app-typography>
            </div>
          </li>
        </ul>
      </div>
      <div class="controls">
        <Button variant="outline" size="sm" @click="goToPrev">
          <Icon name="lucide:chevron-left" />
        </Button>
        <Button variant="outline" size="sm" @click="goToNext">
          <Icon name="lucide:chevron-right" />
        </Button>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  display: grid;
  grid-column: 1/-1;
  grid-template-columns: subgrid;
  gap: 0;
  height: 70vh;
  align-items: center;
}

ul {
  list-style-type: none;
}

.content {
  z-index: 1;
  grid-column: 1/-1;
  gap: calc(var(--spacing) * 8);

  @media (min-width: 700px) {
    grid-column: 1/7;
  }
}

.embla {
  --slide-height: 20rem;
  --slide-spacing: 2rem;
  --slide-size: 300px;

  grid-column: 1/-1;

  @media (min-width: 700px) {
    --slide-height: 25rem;
    --slide-size: 350px;
    grid-column: 7/-1;
  }

  @media (min-width: 1024px) {
    --slide-height: 30rem;
    --slide-size: 500px;
    grid-column: -17/-1;
  }
}

.embla__viewport {
  overflow: hidden;
}

.embla__container {
  display: flex;
  gap: 1rem;
  touch-action: pan-y pinch-zoom;
  margin-left: calc(var(--spacing) * 4);
}

.embla__slide {
  display: flex;
  flex: 0 0 var(--slide-size);
  min-width: 0;
  height: var(--slide-height);
  background-color: var(--content-slider-tone);
  padding: calc(var(--spacing) * 4);

  align-items: end;
}

.controls {
  padding: calc(var(--spacing) * 4);
  display: flex;
  gap: calc(var(--spacing) * 4);
}
</style>
