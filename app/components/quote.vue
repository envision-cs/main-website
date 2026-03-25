<script setup lang="ts">
interface TestimonialItem {
  quote: string;
  name: string;
  title: string;
  detail?: string;
}

const props = withDefaults(
  defineProps<{
    quote?: string;
    name?: string;
    title?: string;
    testimonials?: TestimonialItem[];
    eyebrow?: string;
    sectionTitle?: string;
    sectionBody?: string;
  }>(),
  {
    eyebrow: "Client Trust",
    sectionTitle: "What clients say when the work is on the line.",
    sectionBody:
      "The strongest proof is consistent execution. These are the clients who trusted Envision to deliver with clarity, professionalism, and follow-through.",
  },
);

const hasTestimonials = computed(() => Boolean(props.testimonials?.length));
</script>

<template>
  <section v-if="hasTestimonials" class="testimonials-section">
    <div class="site-grid section-shell">
      <div class="intro">
        <app-typography tag="p" variant="eyebrow-md" class="eyebrow">
          {{ eyebrow }}
        </app-typography>
        <app-typography tag="h2" variant="heading-lg" class="intro-title">
          {{ sectionTitle }}
        </app-typography>
        <app-typography tag="p" variant="text-lg" class="intro-body">
          {{ sectionBody }}
        </app-typography>
      </div>

      <div class="rail-shell">
        <div class="rail-head">
          <span>Selected testimonials</span>
          <span>Scroll to explore</span>
        </div>

        <ul class="rail" role="list" aria-label="Client testimonials">
          <li
            v-for="(testimonial, index) in testimonials"
            :key="`${testimonial.name}-${index}`"
            class="card"
            :class="{ featured: index === 0 }"
          >
            <app-typography tag="p" variant="heading-sm" class="card-quote">
              "{{ testimonial.quote }}"
            </app-typography>

            <div class="card-footer">
              <div class="identity">
                <app-typography tag="p" variant="text-md" class="name">
                  {{ testimonial.name }}
                </app-typography>
                <app-typography tag="p" variant="text-sm" class="title">
                  {{ testimonial.title }}
                </app-typography>
              </div>

              <app-typography v-if="testimonial.detail" tag="p" variant="eyebrow-md" class="detail">
                {{ testimonial.detail }}
              </app-typography>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>

  <section v-else class="site-grid bg-white z-10">
    <div class="divider" />
    <div class="quote">
      <app-typography variant="heading-md" tag="p" class="text-balance">
        {{ quote }}
      </app-typography>
      <app-typography variant="heading-sm" tag="p" class="text-balance mt-4">
        {{ name }}
      </app-typography>
      <app-typography variant="text-md" tag="p" class="text-balance">
        {{ title }}
      </app-typography>
    </div>
  </section>
</template>

<style scoped>
.testimonials-section {
  border-block: 1px solid var(--ui-border);
  background:
    linear-gradient(180deg, rgba(3, 95, 209, 0.04) 0%, rgba(3, 95, 209, 0) 100%), var(--color-white);
}

.section-shell {
  row-gap: calc(var(--spacing) * 8);
  padding-block: calc(var(--spacing) * 8);
}

.intro,
.rail-shell {
  grid-column: 1 / -1;
}

.intro {
  display: grid;
  gap: calc(var(--spacing) * 3);
  padding-inline: 1rem;
}

.eyebrow {
  color: var(--color-envision-blue-500);
  letter-spacing: 0.08em;
}

.intro-title {
  max-width: 10ch;
}

.intro-body {
  max-width: 48ch;
  color: var(--color-envision-gray-700);
}

.rail-shell {
  min-width: 0;
}

.rail-head {
  display: flex;
  justify-content: space-between;
  gap: calc(var(--spacing) * 3);
  padding-inline: 1rem;
  margin-bottom: calc(var(--spacing) * 3);
  color: var(--color-envision-gray-700);
  font-size: var(--font-size-text-t4);
  font-weight: var(--font-weight-bold);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.rail {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(18rem, 85vw);
  gap: calc(var(--spacing) * 4);
  overflow-x: auto;
  padding-inline: 1rem;
  padding-bottom: 1rem;
  margin: 0;
  list-style: none;
  scroll-snap-type: x proximity;
  scrollbar-width: thin;
  scrollbar-color: var(--color-envision-blue-500) transparent;
}

.card {
  scroll-snap-align: start;
  display: grid;
  align-content: space-between;
  gap: calc(var(--spacing) * 8);
  min-height: 24rem;
  padding: calc(var(--spacing) * 4);
  border: 1px solid var(--ui-border);
  background-color: var(--color-white);
  border-top: 4px solid var(--color-envision-gray-700);
}

.featured {
  border-top-color: var(--color-envision-blue-500);
}

.card-quote {
  max-width: 18ch;
  color: var(--color-envision-gray-800);
  text-wrap: balance;
}

.card-footer {
  display: grid;
  gap: calc(var(--spacing) * 3);
  padding-top: calc(var(--spacing) * 3);
  border-top: 1px solid var(--ui-border);
}

.identity {
  display: grid;
  gap: calc(var(--spacing) * 1);
}

.name {
  font-weight: var(--font-weight-bold);
}

.title {
  max-width: 28ch;
  color: var(--color-envision-gray-700);
}

.detail {
  color: var(--color-envision-green-500);
}

section {
  border-bottom: 1px solid var(--ui-border);
}

.divider {
  height: 100%;
  width: 1px;
  background-color: var(--ui-border);
  grid-column: 5;
}

.quote {
  grid-column: 6/-1;
  padding-block: 4rem;
  padding-inline: 1rem;
  position: relative;

  &:before {
    content: '"';
    position: absolute;
    top: 0;
    left: 0;
    line-height: 1;
    font-size: 15em;
    opacity: 0.2;
    transform: translate(-25%, 0%);
  }

  @media (max-width: 768px) {
    grid-column: 1/-1;
    padding-block: 4rem;
  }
}

@media (min-width: 700px) {
  .intro {
    grid-column: 2 / 9;
    padding-inline: 0;
  }

  .rail-shell {
    grid-column: 2 / -1;
  }

  .rail-head {
    padding-inline: 0;
  }

  .rail {
    grid-auto-columns: minmax(20rem, 28rem);
    padding-inline: 0;
  }
}

@media (min-width: 1024px) {
  .section-shell {
    align-items: start;
    padding-block: calc(var(--spacing) * 12);
  }

  .intro {
    grid-column: 2 / 8;
  }

  .rail-shell {
    grid-column: 9 / -1;
  }

  .rail {
    grid-auto-columns: minmax(22rem, 24rem);
  }
}
</style>
