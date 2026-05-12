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

const scopes = [
  { id: 1, label: "Corporate office build-outs and interior renovations" },
  { id: 2, label: "Healthcare facility renovations" },
  { id: 3, label: "Educational facility upgrades" },
  { id: 4, label: "Faith-based interior renovations" },
  { id: 5, label: "Hospitality and retail fit-outs" },
  { id: 6, label: "Shell-to-finish build-outs" },
];

const projectHighlights = [
  { id: 1, label: "17,000 SF active office renovation — staff never stopped working" },
  { id: 2, label: "Hard barriers and air quality controls maintained throughout construction" },
  {
    id: 3,
    label: "Budget constraints navigated through product substitution and design collaboration",
  },
  { id: 4, label: "Delivered within the client's fixed budget — no scope reduction" },
  {
    id: 5,
    label:
      "Modernized layout and finishes that the client was excited to share with their team and clients",
  },
];
</script>

<template>
  <main>
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

    <section-a
      bgcolor="blue"
      eyebrow="Active operations protection"
      title="How we keep your world running while we build."
      body=""
    >
      <template #body> Every TI scope is planned around your schedule — not ours. </template>
      <list-a :items="operations" />
    </section-a>

    <section-a bgcolor="light" eyebrow="Where We Work" title="Environments we know well." body="">
      <template #body>
        Each one requires a different approach. We've built in all of them.
      </template>
      <ul class="icon-list">
        <li v-for="sector in tenantSectors" :key="sector.id">
          <icon-card :icon="sector.icon" :label="sector.label" />
        </li>
      </ul>
    </section-a>

    <cta-a
      eyebrow="Typical Scopes"
      title="What we deliver."
      body=""
      image="/florida-aquarium-restroom-renovation-03.jpg"
      bgcolor="dark"
    >
      <template #body>
        <list-b :items="scopes" />
      </template>
    </cta-a>

    <cta-a
      flip="true"
      eyebrow="Featured Project"
      title="Greater Tampa Realtors: 17,000 SF Interior Office Renovation"
      body=""
      image="/florida-aquarium-restroom-renovation-03.jpg"
      bgcolor="light"
    >
      <template #body>
        <app-typography>
          GTAR's office had not been renovated in approximately 15 years. The scope came with a
          fixed budget, scope uncertainties from the age of the building, and missing details in the
          design documents, all while staff remained fully operational throughout construction.
        </app-typography>
        <app-typography>
          Envision worked collaboratively with the design team to find solutions that fit the
          environment, budget, and schedule. We sourced comparable products, adjusted design where
          needed, and set up hard barriers to protect staff safety and maintain air quality
          throughout every phase.
        </app-typography>
        <ul class="list">
          <li v-for="item in projectHighlights" :key="item.id">
            <app-typography class="text-balance">
              {{ item.label }}
            </app-typography>
          </li>
        </ul>
      </template>
    </cta-a>
    <cta-c
      title="Ready to transform your space?"
      center
      body="Tell us about your environment, your timeline, and what you're trying to achieve. We'll tell you exactly how we'd approach it."
      label="Tell us about your space"
      href="/contact"
      bgcolor="dark"
    />
  </main>
</template>

<style scoped>
.icon-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: calc(var(--spacing) * 4);

  @media (min-width: 600px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1000px) {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
  }
}

.list {
  list-style: disc outside;
  padding-left: 1.25rem;
}
</style>
