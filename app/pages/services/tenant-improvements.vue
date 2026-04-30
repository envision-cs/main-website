<!-- eslint-disable @stylistic/quotes, @stylistic/no-multiple-empty-lines -->
<script setup lang="ts">
definePageMeta({ layout: "layout-a" });
useSeoMeta({
  title: "Tenant Improvements | Envision",
  description:
    "Tenant improvement construction for active offices, healthcare facilities, faith-based spaces, education facilities, hospitality, and retail environments.",
});

const operations = [
  {
    id: 1,
    title: "Phased construction sequencing",
    description:
      "Work is planned around your schedule — not ours. We sequence around your peak hours, events, and operational needs from day one.",
  },
  {
    id: 2,
    title: "Negative air and dust containment",
    description:
      "In sensitive environments — healthcare, hospitality, occupied offices — we implement full dust barriers and negative air pressure where required.",
  },
  {
    id: 3,
    title: "After-hours and weekend work",
    description:
      "When operations can't pause, we work around them. After-hours and weekend scheduling is standard practice, not an exception.",
  },
  {
    id: 4,
    title: "Daily communication",
    description:
      "Every day you know exactly what's happening — access points, noise windows, site conditions, and what to expect the next day. No surprises.",
  },
];

const tenantSectors = [
  {
    id: 1,
    label: "Corporate offices",
    icon: "i-lucide-briefcase-business",
  },
  {
    id: 2,
    label: "Healthcare facilities",
    icon: "i-lucide-activity",
  },
  {
    id: 3,
    label: "Faith-based spaces",
    icon: "i-lucide-church",
  },
  {
    id: 4,
    label: "Educational facilities",
    icon: "i-lucide-shield-check",
  },
  {
    id: 5,
    label: "Hospitality and retail",
    icon: "i-lucide-heart",
  },
];
</script>

<template>
  <main class="tenant-improvement">
    <cta-a
      eyebrow="Built Around You"
      title="Not every contractor can work in a live environment. We've been doing it for over a decade."
      body=""
      image="/florida-aquarium-restroom-renovation-03.jpg"
    >
      <template #body>
        <app-typography>
          Envision has delivered tenant improvements across active campuses, occupied offices,
          operating healthcare facilities, and live hospitality environments. We understand the
          nuances of working in your space while you are still using it.
        </app-typography>
        <app-typography>
          The standard is not just completing the scope. It is protecting your people, your guests,
          and your operations throughout every phase of construction while delivering the space you
          envisioned.
        </app-typography>
      </template>
    </cta-a>

    <section-b
      eyebrow="Active operations protection"
      title="How we keep your world running while we build."
      body=""
    >
      <template #body> Every TI scope is planned around your schedule — not ours. </template>
      <list-a :items="operations" />
    </section-b>

    <section-a eyebrow="Where We Work" title="Environments we know well." body="">
      <template #body>
        Each one requires a different approach. We've built in all of them.
      </template>
      <ul>
        <li v-for="sector in tenantSectors" :key="sector.id">
          <icon-card :icon="sector.icon" :label="sector.label" />
        </li>
      </ul>
    </section-a>
  </main>
</template>

<style scoped>
.tenant-improvement {
}

.tenant-section-tag {
  color: var(--ui-secondary);
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.tenant-hero {
  position: relative;
  min-height: min(760px, 92vh);
  display: grid;
  align-items: end;
  overflow: clip;
  isolation: isolate;
}

.tenant-hero__image,
.tenant-hero__overlay {
  position: absolute;
  inset: 0;
}

.tenant-hero__image {
  z-index: -2;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tenant-hero__overlay {
  z-index: -1;
  background:
    linear-gradient(
      90deg,
      color-mix(in srgb, var(--color-envision-gray-900) 96%, transparent) 0%,
      color-mix(in srgb, var(--color-envision-blue-900) 70%, transparent) 46%,
      transparent 100%
    ),
    linear-gradient(to top, var(--color-envision-gray-900) 0%, transparent 58%);
}

.tenant-hero__content {
  display: grid;
  gap: calc(var(--spacing) * 5);
  width: min(100%, 78rem);
  margin-inline: auto;
  padding: calc(var(--spacing) * 10) calc(var(--spacing) * 6);
}

.tenant-hero__title {
  max-width: 12ch;
  color: var(--color-white);
}

.tenant-hero__body {
  max-width: 36rem;
  color: color-mix(in srgb, var(--color-white) 74%, var(--color-envision-blue-100));
}

.tenant-split,
.tenant-proof,
.tenant-operations,
.tenant-sectors,
.tenant-cta,
.tenant-promise {
  padding: clamp(3rem, 7vw, 6rem) calc(var(--spacing) * 6);
}

.tenant-split,
.tenant-proof {
  display: grid;
  gap: clamp(2rem, 5vw, 5rem);
  align-items: center;
}

.tenant-split--light,
.tenant-proof {
  background-color: var(--color-white);
  color: var(--color-envision-gray-900);
}

.tenant-split--dark,
.tenant-operations {
  background-color: var(--color-envision-gray-900);
  color: var(--color-white);
}

.tenant-split__copy,
.tenant-proof__copy,
.tenant-section-heading {
  display: grid;
  gap: calc(var(--spacing) * 4);
}

.tenant-copy-stack {
  display: grid;
  gap: calc(var(--spacing) * 4);
  color: var(--text-color-muted);
}

.tenant-split--dark .tenant-copy-stack,
.tenant-operations__body {
  color: color-mix(in srgb, var(--color-white) 64%, var(--color-envision-gray-300));
}

.tenant-split__media,
.tenant-proof__media {
  min-height: clamp(18rem, 38vw, 30rem);
  margin: 0;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--ui-border) 62%, transparent);
}

.tenant-split__media img,
.tenant-proof__media img {
  display: block;
  width: 100%;
  height: 100%;
  min-height: inherit;
  object-fit: cover;
}

.tenant-section-heading {
  width: min(100%, 78rem);
  margin-inline: auto;
  margin-bottom: calc(var(--spacing) * 9);
}

.tenant-section-heading__body,
.tenant-sectors__sub,
.tenant-cta__body {
  color: color-mix(in srgb, var(--color-white) 60%, var(--color-envision-gray-300));
}

.tenant-sectors__grid,
.tenant-scopes,
.tenant-proof__highlights {
  list-style: none;
  margin: 0;
  padding: 0;
}

.tenant-operations__grid {
  display: grid;
  gap: 1px;
  width: min(100%, 78rem);
  margin-inline: auto;
}

.tenant-operations__item {
  display: grid;
  gap: calc(var(--spacing) * 3);
  padding: calc(var(--spacing) * 6);
  border-left: 3px solid var(--ui-secondary);
  background-color: color-mix(in srgb, var(--color-white) 5%, transparent);
}

.tenant-operations__title {
  color: var(--color-white);
}

.tenant-sectors {
  background-color: color-mix(in srgb, var(--color-envision-blue-50) 35%, var(--color-white));
  color: var(--color-envision-gray-900);
}

.tenant-sectors .tenant-section-heading__body,
.tenant-sectors__sub {
  color: var(--text-color-muted);
}

.tenant-sectors__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1px;
  width: min(100%, 78rem);
  margin-inline: auto;
}

.tenant-sectors__item {
  display: grid;
  gap: calc(var(--spacing) * 4);
  place-items: center;
  min-height: 11rem;
  padding: calc(var(--spacing) * 5);
  border: 1px solid color-mix(in srgb, var(--ui-border) 42%, transparent);
  background-color: var(--color-white);
  text-align: center;
}

.tenant-sectors__icon {
  display: grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  color: var(--color-envision-green-700);
  background-color: color-mix(in srgb, var(--ui-secondary) 18%, var(--color-white));
}

.tenant-sectors__icon :deep(svg) {
  width: 1.35rem;
  height: 1.35rem;
}

.tenant-sectors__label {
  color: var(--color-envision-gray-900);
  font-weight: 600;
}

.tenant-scopes {
  display: grid;
  gap: calc(var(--spacing) * 2);
  margin-top: calc(var(--spacing) * 3);
}

.tenant-scopes li,
.tenant-proof__highlights li {
  position: relative;
  padding-left: calc(var(--spacing) * 5);
}

.tenant-scopes li {
  padding-block: calc(var(--spacing) * 3);
  color: color-mix(in srgb, var(--color-white) 74%, var(--color-envision-gray-300));
  border-bottom: 1px solid color-mix(in srgb, var(--ui-border) 36%, transparent);
}

.tenant-scopes li::before,
.tenant-proof__highlights li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 1.15em;
  width: 0.45rem;
  height: 0.45rem;
  background-color: var(--ui-secondary);
}

.tenant-proof__highlights {
  display: grid;
  gap: calc(var(--spacing) * 3);
  color: var(--text-color-muted);
}

.tenant-cta {
  display: grid;
  justify-items: start;
  gap: calc(var(--spacing) * 5);
  background-color: var(--ui-secondary);
  color: var(--color-envision-gray-900);
}

.tenant-cta :deep(.base) {
  color: inherit;
}

.tenant-cta__body {
  max-width: 38rem;
  color: color-mix(in srgb, var(--color-envision-gray-900) 78%, var(--ui-secondary));
}

.tenant-promise {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: calc(var(--spacing) * 3);
  padding-block: calc(var(--spacing) * 6);
  color: color-mix(in srgb, var(--color-white) 54%, var(--color-envision-gray-300));
  border-top: 1px solid color-mix(in srgb, var(--ui-border) 34%, transparent);
}

.tenant-promise strong {
  color: var(--ui-secondary);
  font-weight: 600;
}

@media (min-width: 700px) {
  .tenant-hero__content {
    padding-inline: calc(var(--spacing) * 10);
  }

  .tenant-split,
  .tenant-proof {
    grid-template-columns: minmax(0, 1.08fr) minmax(18rem, 0.78fr);
  }

  .tenant-split--dark {
    grid-template-columns: minmax(0, 0.92fr) minmax(18rem, 0.82fr);
  }

  .tenant-operations__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .tenant-sectors__grid {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .tenant-split,
  .tenant-proof,
  .tenant-operations,
  .tenant-sectors,
  .tenant-cta {
    padding-inline: max(calc(var(--spacing) * 12), calc((100vw - 90rem) / 2 + 3rem));
  }

  .tenant-hero__content {
    padding-inline: max(calc(var(--spacing) * 12), calc((100vw - 90rem) / 2 + 3rem));
  }

  .tenant-cta {
    justify-items: center;
    text-align: center;
  }
}
</style>
