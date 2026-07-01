<script setup lang="ts">
definePageMeta({
  layout: 'layout-a',
});

useSeoMeta({
  title: 'Enhanced Preconstruction | Envision Tampa Bay & Central Florida',
  description:
    'Standalone preconstruction from Envision: open-book estimating, Target Value Design, 500+ qualified trade partners, and early risk identification. One hour of planning saves ten hours during construction.',
  ogTitle: 'Enhanced Preconstruction | Envision Tampa Bay & Central Florida',
  ogDescription:
    'A lower price does not always cost less. Validate budget, align scope, and identify risks before you commit to construction.',
  ogImage:
    'https://ik.imagekit.io/pnixsw7lg/main-website/precon_The_Problem_wit_Waiting_a5bd32fe54.jpg?updatedAt=1780449647043',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Enhanced Preconstruction | Envision Tampa Bay & Central Florida',
  twitterDescription:
    'A lower price does not always cost less. Validate budget, align scope, and identify risks before you commit to construction.',
  twitterImage:
    'https://ik.imagekit.io/pnixsw7lg/main-website/precon_The_Problem_wit_Waiting_a5bd32fe54.jpg?updatedAt=1780449647043',
});

const stats = [
  { id: 1, label: '500+', description: 'Qualified Trade Partners' },
  {
    id: 2,
    label: '100% Transparency',
    description: 'Open-book estimating that keeps owners informed and in control.',
  },
];

const capabilities = [
  { id: 1, label: 'Model-based and real-time estimating' },
  { id: 2, label: '3D quantity surveying and trending analysis' },
  { id: 3, label: 'Target Value Design workshops' },
  { id: 4, label: 'Revit, 3D coordination, and laser scanning' },
  { id: 5, label: 'Pull planning and Lean scheduling (P6 Primavera)' },
  { id: 6, label: 'Constructability review' },
  { id: 7, label: 'Supply chain and long-lead item monitoring' },
  { id: 8, label: 'Targeted trade partner bidding — 5 to 8 qualified firms per scope' },
  { id: 9, label: 'Weekly bid participation reports for full client visibility' },
  { id: 10, label: 'Feasibility analysis and early budget development' },
  { id: 11, label: 'Risk identification and mitigation planning' },
  { id: 12, label: 'Diverse and local trade partner engagement' },
];

const protections = [
  {
    id: 1,
    label: 'Your budget',
    description:
      'We design to a budget - not the other way around. Real-time estimating and Target Value Design identify cost pressures early so adjustments can be made before they become expensive surprises.',
  },
  {
    id: 2,
    label: 'Your schedule',
    description:
      'Pull planning, procurement strategy, and long-lead item identification help protect milestones before they are at risk.',
  },
  {
    id: 3,
    label: 'Your design',
    description:
      'Constructability reviews, coordination, and risk analysis reduce redesign, field conflicts, and costly scope gaps before construction begins.',
  },
  {
    id: 4,
    label: 'Your Outcome',
    description:
      'Strategic trade engagement, procurement planning, and proactive decision-making create alignment across the project team before execution starts.',
  },
];
const projectHighlights = [
  { id: 1, label: 'Final construction cost: $3,230,866 against an initial estimate of $3,440,228' },
  { id: 2, label: '$209,362 returned to the owner—without reducing a single line of scope' },
  { id: 3, label: 'Early material flagging prevented delays during construction' },
  { id: 4, label: 'Trade partners engaged at every design phase for real-time cost input' },
  { id: 5, label: 'Delivered on schedule within an active school zone' },
];
</script>

<template>
  <main>
    <section-d
      bgcolor="blue"
      title="1 hr = 10 hrs"
      body="One hour of preconstruction planning saves ten hours during construction."
    >
      <list-e :items="stats" />
    </section-d>
    <cta-a
      eyebrow="THE PROBLEM WITH PRICE-FIRST DECISIONS"
      title="A lower price does not always cost less."
      body=""
      image="https://ik.imagekit.io/pnixsw7lg/main-website/precon_The_Problem_wit_Waiting_a5bd32fe54.jpg?updatedAt=1780449647043"
      bgcolor="light"
    >
      <template #body>
        <app-typography>
          If you've delivered a commercial construction project, you've likely seen the consequences
          of decisions made too late: scope gaps, schedule delays, change orders, and mounting
          frustration.
        </app-typography>
        <app-typography class="mt-6">
          Preconstruction helps owners gain clarity before construction begins by validating budget,
          aligning scope, planning procurement, and identifying risks early. The result is greater
          predictability, fewer surprises, and more control over the project.
        </app-typography>
        <app-typography class="mt-6">
          Envision offers preconstruction as a standalone engagement—helping owners establish budget
          confidence, schedule realism, and risk visibility before committing to construction.
        </app-typography>
      </template>
    </cta-a>

    <section-a
      bgcolor="dark"
      eyebrow="What owners actually need"
      title="Owners do not just need a builder. They need certainty."
    >
      <list-d :items="capabilities" />
    </section-a>

    <section-a
      bgcolor="light"
      eyebrow="What standalone preconstruction protects"
      title="Certainty before you commit."
      body="Envision helps owners identify risks and make informed decisions while options remain available."
    >
      <list-h :items="protections" />
    </section-a>

    <cta-a
      flip
      eyebrow="Featured project"
      title="Hillsborough County Public Schools — Liberty Middle School"
      body=""
      image="https://ik.imagekit.io/pnixsw7lg/main-website/precon_image_b3b96f9189.webp?updatedAt=1780912282476"
      bgcolor="dark"
    >
      <template #body>
        <app-typography>
          Target Value Design in action. From the start, Envision aligned with HCPS and the design
          team on a target budget—with trade partners providing real-time cost input at every design
          phase. When the proposed lighting package was flagged as a risk to both budget and
          availability, Envision worked with the design team to reduce fixtures from 98 to 48—saving
          cost and eliminating a lead time problem before it became a construction issue.
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
      title="The best time to protect your project is before construction begins."
      center
      body="Before you commit to construction, engage Envision to validate your budget, identify risks, and build a plan you can move forward with confidently."
      label="Engage Us Early"
      href="/contact"
      bgcolor="dark"
    />
  </main>
</template>
