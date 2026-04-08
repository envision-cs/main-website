<script setup lang="ts">
interface CoreValueItem {
  id: number;
  eyebrow: string;
  title: string;
  description: string;
  quote?: string;
  points?: string[];
  tone: string;
}

const items: CoreValueItem[] = [
  {
    id: 1,
    eyebrow: "01",
    title: "Be Humbly Confident",
    description:
      "Your gifts, talents, and resources are not only for you or about you. Without believing in something bigger than yourself, you will only seek to serve yourself.",
    quote: "Lead with conviction, then back it with service.",
    points: [
      "Always seek to give the advantage",
      "Do it as if it were your own",
      "Great leaders have a servant’s heart",
    ],
    tone: "--color-envision-blue-600",
  },
  {
    id: 2,
    eyebrow: "02",
    title: "It's Bigger Than You",
    description:
      "We build the company, the project, and the people around us with a bigger purpose in view.",
    quote: "Purpose gets clearer when ego gets smaller.",
    points: [
      "Always seek to give the advantage",
      "Do it as if it were your own",
      "Great leaders have a servant’s heart",
    ],
    tone: "--color-envision-green-500",
  },
  {
    id: 3,
    eyebrow: "03",
    title: "Be the Light",
    description:
      "Being positive should never be based on circumstances, but on an internal belief we choose to carry into every room.",
    quote: "Optimism is a discipline, not a mood.",
    points: ["Optimism", "Always assume positive intent"],
    tone: "--color-envision-gray-700",
  },
  {
    id: 4,
    eyebrow: "04",
    title: "Be the Solution",
    description:
      "Our success and fulfillment depend on our willingness to seek and help provide solutions with clarity and urgency.",
    points: [
      "Help first",
      "We are the easy button",
      "We pride ourselves on being the solution",
      "Clarity breeds confidence",
    ],
    tone: "--color-envision-blue-800",
  },
  {
    id: 5,
    eyebrow: "05",
    title: "Find a Better Way",
    description:
      "We keep improving the way we work, communicate, and solve problems because good enough is rarely the right stopping point.",
    quote: "Improvement is part of the job, not extra credit.",
    points: [
      "Adapt to change",
      "Impossible is never a fact, it is a belief",
      "I get to vs. I have to attitude",
      "Do not make excuses, make adjustments",
    ],
    tone: "--color-envision-blue-900",
  },
];
</script>

<template>
  <content-scroller
    title="Our Core Values"
    body="The way we lead projects is the way we lead people: with clarity, discipline, humility, and a commitment to leave every partnership stronger than we found it."
    :items="items"
  >
    <template #item="{ item }">
      <article class="core-value-card" :style="{ '--core-value-tone': `var(${item.tone})` }">
        <div class="core-value-card__body">
          <app-typography
            v-if="item.eyebrow"
            tag="p"
            variant="eyebrow-md"
            class="core-value-card__eyebrow"
          >
            {{ item.eyebrow }}
          </app-typography>
          <app-typography tag="h3" variant="heading-md" class="core-value-card__title">
            {{ item.title }}
          </app-typography>
          <app-typography tag="p" variant="text-md" class="core-value-card__description">
            {{ item.description }}
          </app-typography>
          <app-typography
            v-if="item.quote"
            tag="p"
            variant="text-md"
            class="core-value-card__quote"
          >
            {{ item.quote }}
          </app-typography>
          <ul v-if="item.points?.length" class="core-value-card__points">
            <li v-for="point in item.points" :key="point" class="core-value-card__point">
              {{ point }}
            </li>
          </ul>
        </div>
      </article>
    </template>
  </content-scroller>
</template>

<style scoped>
.core-value-card {
  min-height: 30rem;
  background: var(--core-value-tone);
  box-shadow: 0 0 0 1px rgb(15 23 42 / 8%);
}

.core-value-card__body {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: calc(var(--spacing) * 2);
  min-height: 100%;
  padding: calc(var(--spacing) * 4);
  color: white;
}

.core-value-card__eyebrow {
  opacity: 0.82;
}

.core-value-card__title {
  max-width: 14ch;
  text-wrap: balance;
}

.core-value-card__description,
.core-value-card__quote {
  max-width: 30ch;
  color: rgb(255 255 255 / 88%);
}

.core-value-card__quote {
  font-style: italic;
}

.core-value-card__points {
  display: grid;
  gap: calc(var(--spacing) * 1.5);
  margin: 0;
  padding: 0;
  list-style: none;
}

.core-value-card__point {
  position: relative;
  padding-left: calc(var(--spacing) * 4);
  font-size: var(--font-size-text-t3);
  line-height: 1.45;
}

.core-value-card__point::before {
  content: "";
  position: absolute;
  top: 0.72em;
  left: 0;
  width: calc(var(--spacing) * 2);
  height: 1px;
  background: currentColor;
}
</style>
