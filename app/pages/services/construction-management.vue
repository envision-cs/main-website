<script setup lang="ts">
definePageMeta({
  layout: "layout-a",
});

const benefits = [
  {
    id: 1,
    label: "Certainty early",
    description:
      "Decisions, budget confidence, and schedule realism before a single shovel breaks ground.",
  },
  {
    id: 2,
    label: "Risk reduction",
    description:
      "Unknowns surfaced in preconstruction while options are still open. Fewer surprises, fewer forced trade-offs.",
  },
  {
    id: 3,
    label: "Predictable experience",
    description:
      "Clear communication. Consistent follow-through. A team that owns the outcome and never leaves you guessing.",
  },
  {
    id: 4,
    label: "Value before construction",
    description:
      "Preconstruction as stewardship, not overhead — protecting every dollar that follows.",
  },
];

const phases = [
  {
    id: 1,
    label: "Listen",
    items: [
      "Project discovery and kickoff",
      "Budget and timeline goals",
      "Site and feasibility review",
      "Honoring your vision from day one",
    ],
  },
  {
    id: 2,
    label: "Plan",
    items: [
      "Budget-aligned design and estimating",
      "Early trade input and constructability",
      "Real-time scheduling and risk prevention",
      "Decision-making support",
    ],
  },
  {
    id: 3,
    label: "Execute",
    items: [
      "Weekly updates — clear and documented",
      "Full jobsite visibility via Procore",
      "Community engagement every project",
      "Clean, documented closeout",
    ],
  },
  {
    id: 4,
    label: "Cultivate",
    items: [
      "12-month legacy lap post-closeout",
      "30-60-90 day check-ins",
      "One-year walkthrough",
      "Planning what's next — together",
    ],
  },
];

const projectHighlights = [
  { id: 1, label: "5,000-seat professional stadium delivered within an active school zone" },
  {
    id: 2,
    label: "Construction sequenced around student schedules, safety protocols, and city operations",
  },
  { id: 3, label: "Weekend shifts and extended hours implemented strategically — not reactively" },
  {
    id: 4,
    label: "Scopes resequenced in real time to maintain progress without compromising quality",
  },
  { id: 5, label: "Delivered on schedule — Tampa Bay Sun FC's inaugural season started on time" },
];
</script>

<template>
  <main>
    <section-a
      bgcolor="dark"
      eyebrow="What owners actually need"
      title='"Owners do not just need a builder. They need certainty."'
    >
      <list-f :items="benefits" />
    </section-a>
    <section-a
      bgcolor="light"
      eyebrow="The Envision way"
      title="One process. Every project. No exceptions.
"
      body="Applied consistently regardless of size, sector, or complexity."
    >
      <list-g :items="phases" />
    </section-a>
    <cta-a
      eyebrow="Featured Project"
      title="Tampa Bay USL Super League — Stadium Improvements at Blake High School"
      body=""
      image="/florida-aquarium-restroom-renovation-03.jpg"
      bgcolor="light"
    >
      <template #body>
        <app-typography>
          With Tampa Bay Sun FC's inaugural season on the line, there was no room for delay. A
          compressed preconstruction period, evolving project decisions, and unforeseen site
          conditions made this one of the most demanding CM engagements Envision has delivered — and
          we hit the August deadline without cutting a single corner.
        </app-typography>
        <app-typography>
          We built a 5,000-seat professional sports stadium within an active school zone —
          coordinating every phase around student schedules, safety protocols, and city operations.
          This is what construction management actually looks like.
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
  </main>
</template>

<style scoped>
.list {
  list-style: disc outside;
  padding-left: 1.25rem;
}
</style>
