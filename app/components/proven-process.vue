<script setup lang="ts">
const steps = [
  {
    id: 1,
    eyebrow: '01',
    label: 'Listen',
    description:
      'Every project begins with thoughtful listening. We take time to understand your vision, goals, and constraints. Through discovery meetings, site reviews, and clear communication, we lay the foundation for a partnership built on trust and alignment.',
  },
  {
    id: 2,
    eyebrow: '02',
    label: 'Plan',
    description:
      'Before any work begins, we bring certainty to the process. From budget-aligned designs and permitting to early trade coordination and risk mitigation, we focus on eliminating surprises and protecting your timeline from day one.',
  },
  {
    id: 3,
    eyebrow: '03',
    label: 'Execute',
    description:
      'With the plan in place, we deliver with precision. Using tools like Procore, we provide full visibility, weekly updates, and proactive oversight. Our team owns the outcome, communicates clearly, and protects your project through to the final walkthrough.',
  },
  {
    id: 4,
    eyebrow: '04',
    label: 'Cultivate',
    description:
      "Our work doesn't end at closeout. We stay engaged with system training, 30-60-90 day check-ins, and a one-year walkthrough. The goal: ensure your space performs, your team is supported, and your trust in us grows long after the build is done.",
  },
];
</script>

<template>
  <SectionF
    eyebrow="Envision"
    title="Our Proven Process"
    body="Our proven process brings structure and consistency to every project. We listen, plan, and execute to reduce risk, maintain alignment, and deliver on time, on budget, and with complete transparency."
    :items="steps"
  />
</template>
