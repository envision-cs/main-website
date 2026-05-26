<script setup lang="ts">
definePageMeta({
  layout: "layout-a",
});

const differentiators = [
  {
    id: 1,
    label: "Target Value Design",
    description:
      "We design to a budget — not the other way around. Trade partners provide cost input at every design phase so there are no surprises when construction documents are finalized.",
  },
  {
    id: 2,
    label: "Constructability input early",
    description:
      "Our team reviews design during schematic and design development — before decisions lock in and become expensive to reverse.",
  },
  {
    id: 3,
    label: "Real-cost feedback in real time",
    description:
      "No pricing surprises at construction documents. We flag cost implications as design evolves — when there are still options to act, not after you're locked in.",
  },
  {
    id: 4,
    label: "Single-source accountability",
    description:
      "One team. One contract. Full accountability from concept through closeout — no gaps, no finger-pointing, no redesign cycles.",
  },
];

const deliveryMethods = [
  { id: 1, label: "Ground-up design-build" },
  { id: 2, label: "Renovation design-build" },
  { id: 3, label: "Fast-track delivery" },
  { id: 4, label: "Design-assist engagements" },
  { id: 5, label: "CM at Risk (CMAR)" },
  { id: 6, label: "Design professional + builder" },
];

const projectOutcomes = [
  { id: 1, label: "Final construction cost: $3,230,866 against an initial estimate of $3,440,228" },
  { id: 2, label: "$209,362 returned to the owner — without reducing a single line of scope" },
  { id: 3, label: "Trade partners engaged at every design phase for real-time cost input" },
  { id: 4, label: "Delivered on an active school campus with zero disruption to operations" },
];
</script>

<template>
  <main>
    <cta-a
      eyebrow="The difference"
      title="Most contractors wait for plans. We help shape them."
      image="/IMG_1915.jpg"
    >
      <template #body>
        <app-typography>
          Envision's design-build capability means construction knowledge enters the process before
          decisions become expensive to change. We provide constructability input, flag real-world
          cost implications early, and help design teams move faster — reducing redesign cycles and
          protecting budget before the first shovel hits the ground.
        </app-typography>

        <blockquote>
          We budget known but undocumented cost items — what we call conversational knowledge —
          rather than simply sticking to plans and specs.
        </blockquote>

        <app-typography>
          When Envision serves as both design professional and builder, the owner gets one point of
          accountability — from concept through closeout. No gaps. No finger-pointing. No surprises
          at construction documents.
        </app-typography>

        <app-typography>
          We've delivered design-build scopes in active, occupied environments at every scale. We're
          built for bigger — and we bring the same standard regardless of project size.
        </app-typography>
      </template>
    </cta-a>

    <section-a
      bgcolor="dark"
      eyebrow="What this means for you"
      title="Design-build with Envision means:"
      body="Single-source accountability. Fewer handoffs. Better outcomes."
    >
      <list-a :items="differentiators" />
    </section-a>

    <cta-a eyebrow="Typical scopes" title="What we're built for." image="/IMG_1915.jpg">
      <template #body>
        <list-d :items="deliveryMethods" />
      </template>
    </cta-a>

    <cta-a
      flip
      eyebrow="Featured Project"
      title="Hillsborough County Public Schools — Liberty Middle School Play Court Cover"
      body=""
      image="https://ik.imagekit.io/pnixsw7lg/main-website/20230801_072634.webp"
      bgcolor="dark"
    >
      <template #body>
        <app-typography>
          Target Value Design in action. Envision aligned with HCPS and the design team from day one
          — budgeting to a target rather than estimating after design was complete. Every phase was
          reviewed in real time, with trade partners providing budgetary input throughout design
          development.
        </app-typography>
        <app-typography>
          When design and construction speak the same language from the start, the numbers reflect
          it. No scope cuts. No redesign cycles. Just a better outcome for the
          owner.</app-typography
        >
        <ul class="list">
          <li v-for="item in projectOutcomes" :key="item.id">
            <app-typography class="text-balance">
              {{ item.label }}
            </app-typography>
          </li>
        </ul>
      </template>
    </cta-a>
    <cta-c
      title=" "
      center
      body="The earlier we're in the conversation, the more value we can protect. Tell us about your project."
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
          Building something?
        </app-typography>
        <app-typography tag="p" variant="heading-lg" class="subtitle">
          Let's talk early.
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
