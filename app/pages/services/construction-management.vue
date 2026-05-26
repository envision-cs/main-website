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

const commitments = [
  {
    id: 1,
    label: "Your budget",
    description:
      "Target Value Design and real-time cost control keep your financials visible and decisions informed from day one.",
  },
  {
    id: 2,
    label: "Your schedule",
    description:
      "Proactive sequencing, long-lead identification, and early trade coordination protect your move-in date before it's at risk.",
  },
  {
    id: 3,
    label: "Your stakeholders",
    description:
      "Weekly updates and full Procore access mean everyone stays aligned — without you playing middleman.",
  },
  {
    id: 4,
    label: "Your outcome",
    description:
      "Every project is backed by our Total Transparency guarantee — clear communication and consistent follow-through, kickoff to closeout.",
  },
];

const stats = [
  { id: 1, label: "90%", description: "Repeat client rate — earned one project at a time" },
  { id: 2, label: "$180M+", description: "Largest project delivered in Tampa Bay" },
  { id: 3, label: "16 yrs", description: "Building Greater Tampa Bay" },
];
</script>

<template>
  <main>
    <section-d
      bgcolor="blue"
      eyebrow="Our track record"
      title="A reputation built one project at a time"
    >
      <list-e :items="stats" />
    </section-d>
    <section-a
      bgcolor="dark"
      eyebrow="What owners actually need"
      title='"Owners do not just need a builder. They need certainty."'
    >
      <list-f :items="benefits" />
    </section-a>
    <section-a
      bgcolor="light"
      eyebrow="Our Proven Process"
      title="One process. Every project. No exceptions.
"
      body="Applied consistently regardless of size, sector, or complexity."
    >
      <list-g :items="phases" />
    </section-a>

    <cta-a
      title="Four things every owner deserves."
      image="/florida-aquarium-restroom-renovation-03.jpg"
      bgcolor="dark"
      flip
    >
      <template #body>
        On every project. No exceptions.
        <list-a :items="commitments" />
      </template>
    </cta-a>

    <cta-a
      eyebrow="Featured Project"
      title="Tampa Bay USL Super League — Stadium Improvements at Blake High School"
      body=""
      image="https://ik.imagekit.io/pnixsw7lg/main-website/usl_super_league_01_f11cef9b44.jpg?updatedAt=1776161739685"
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
        <my-button
          label="View Project"
          to="/projects/athletics/usl-super-league-stadium"
          bgcolor="blue"
        >
          View Project
        </my-button>
      </template>
    </cta-a>
    <cta-c
      eyebrow="Our Guarantee"
      title="Total Transparency.
Or We Make It Right."
      center
      body="Transparency is not a courtesy — it is a covenant. We do not believe in half-answers, delayed updates, or vague timelines. You deserve to know what is happening, what it means, and what comes next — at every stage. Because while not everything in construction is in our control — communication always is."
      label="Start the conversation"
      href="/contact"
      bgcolor="dark"
    >
      <template #title>
        <app-typography
          tag="h2"
          variant="heading-lg"
          class="title text-envision-blue-500 font-semibold"
        >
          Total Transparency.
        </app-typography>
        <app-typography tag="p" variant="heading-lg" class="subtitle">
          Or We Make It Right.
        </app-typography>
      </template>
    </cta-c>
  </main>
</template>

<style scoped>
.list {
  list-style: disc outside;
  padding-left: 1.25rem;
}
</style>
