<script setup lang="ts">
definePageMeta({
  layout: "layout-a",
});

const stats = [
  { id: 1, label: "$180M+", description: "Largest project delivered" },
  { id: 2, label: "16 yrs", description: "Tampa Bay experience" },
  { id: 3, label: "90%", description: "Repeat client rate" },
];

const capabilities = [
  { id: 1, label: "Model-based and real-time estimating" },
  { id: 2, label: "3D quantity surveying and trending analysis" },
  { id: 3, label: "Target Value Design workshops" },
  { id: 4, label: "Revit, 3D coordination, and laser scanning" },
  { id: 5, label: "Pull planning and Lean scheduling (P6 Primavera)" },
  { id: 6, label: "Constructability review" },
  { id: 7, label: "Supply chain and long-lead item monitoring" },
  { id: 8, label: "Targeted trade partner bidding — 5 to 8 qualified firms per scope" },
  { id: 9, label: "Weekly bid participation reports for full client visibility" },
  { id: 10, label: "Feasibility analysis and early budget development" },
  { id: 11, label: "Risk identification and mitigation planning" },
  { id: 12, label: "Diverse and local trade partner engagement" },
];

const protections = [
  {
    id: 1,
    label: "Your budget",
    description:
      "We design to a budget — not the other way around. Target Value Design and real-time estimating surface cost pressure while options are still open, not after you're locked in.",
  },
  {
    id: 2,
    label: "Your schedule",
    description:
      "Pull planning, P6 Primavera scheduling, and long-lead item identification protect your milestones before they're at risk — with weekly look-ahead meetings to keep every trade aligned.",
  },
  {
    id: 3,
    label: "Your design",
    description:
      "3D coordination, Revit modeling, and laser scanning reduce the risk of trade clashes and costly redesign — especially on projects with complex or custom fabricated scopes.",
  },
  {
    id: 4,
    label: "Your trade partners",
    description:
      "We identify 5 to 8 qualified local firms per trade, track bid participation weekly, and engage diverse partners early — so you get the right teams at the right price before the market moves.",
  },
];
const projectHighlights = [
  { id: 1, label: "Final construction cost: $3,230,866 against an initial estimate of $3,440,228" },
  { id: 2, label: "$209,362 returned to the owner — without reducing a single line of scope" },
  { id: 3, label: "Early material flagging prevented delays during construction" },
  { id: 4, label: "Trade partners engaged at every design phase for real-time cost input" },
  { id: 5, label: "Delivered on schedule within an active school zone" },
];
</script>

<template>
  <main>
    <section-d
      bgcolor="blue"
      title="1 hr = 10 hrs"
      body="One hour of preconstruction planning saves ten hours of construction. Early investment in planning is the most efficient spend on any project — and the one most often skipped."
    >
      <list-e :items="stats" />
    </section-d>
    <cta-a
      eyebrow="The problem with waiting"
      title="Hard-bid selection feels safe. Until it isn't."
      body=""
      image="/florida-aquarium-restroom-renovation-03.jpg"
      bgcolor="light"
    >
      <template #body>
        <app-typography>
          Hard-bid or low-price selection can feel like the safest path. But commercial construction
          is a coordination-intensive process with real constraints — and uncertainty surfaces on
          every project.
        </app-typography>
        <app-typography>
          When decisions are driven primarily by price, important protections get deferred. Unknowns
          that could have been surfaced in preconstruction become change orders, schedule slippage,
          and forced trade-offs later — when options are limited and costs are high.
        </app-typography>
        <app-typography>
          Envision offers preconstruction as a standalone engagement. We come in early, establish
          cost and schedule realism, and build the alignment that protects your outcome before you
          commit to full construction.
        </app-typography>
      </template>
    </cta-a>

    <section-a
      bgcolor="dark"
      eyebrow="What owners actually need"
      title='"Owners do not just need a builder. They need certainty."'
    >
      <list-d :items="capabilities" />
    </section-a>

    <section-a
      bgcolor="light"
      eyebrow="What standalone preconstruction protects"
      title="Certainty before you commit."
      body="The decisions you make before groundbreaking determine whether your project succeeds."
    >
      <list-h :items="protections" />
    </section-a>

    <cta-a
      flip
      eyebrow="Featured project"
      title="Hillsborough County Public Schools — Liberty Middle School"
      body=""
      image="/florida-aquarium-restroom-renovation-03.jpg"
      bgcolor="dark"
    >
      <template #body>
        <app-typography>
          Target Value Design in action. From the start, Envision aligned with HCPS and the design
          team on a target budget — with trade partners providing real-time cost input at every
          design phase. When the proposed lighting package was flagged as a risk to both budget and
          availability, Envision worked with the design team to reduce fixtures from 98 to 48 —
          saving cost and eliminating a lead time problem before it became a construction issue.
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
      title="The best projects start with the best conversations."
      center
      body="Engage Envision before you commit to full construction. We'll tell you exactly where your project stands — and what it will take to protect it."
      label="Engage Us Early"
      href="/contact"
      bgcolor="dark"
    />
  </main>
</template>
