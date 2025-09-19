<script setup lang="ts">
const steps = [
  { k: 'Listen', text: 'Every project begins with thoughtful listening. We take time to understand your vision, goals, and constraints. Through discovery meetings, site reviews, and clear communication, we lay the foundation for a partnership built on trust and alignment.' },
  { k: 'Plan', text: 'Before any work begins, we bring certainty to the process. From budget-aligned designs and permitting to early trade coordination and risk mitigation, we focus on eliminating surprises and protecting your timeline from day one.' },
  { k: 'Execute', text: 'With the plan in place, we deliver with precision. Using tools like Procore, we provide full visibility, weekly updates, and proactive oversight. Our team owns the outcome, communicates clearly, and protects your project through to the final walkthrough.' },
  { k: 'Cultivate', text: 'Our work doesn’t end at closeout. We stay engaged with system training, 30-60-90 day check-ins, and a one-year walkthrough. The goal: ensure your space performs, your team is supported, and your trust in us grows long after the build is done.' },
];
</script>

<template>
  <div class="">
    <app-banner
      title="Our Proven Process"
      description="Our proven process brings structure and consistency to every project. We listen, plan, and execute to reduce risk, maintain alignment, and deliver on time, on budget, and with complete transparency"
      :images="[
        {
          img: '/airport.png',
          alt: 'Airport image',

        }]"
    />
  </div>

  <div class="mt-10 site-grid site-max">
    <div
      v-for="(s, i) in steps"
      :key="s.k"
      class="col-span-full  h-full flex gap-4 py-10 border-t border-accented w-full"
    >
      <span class="text-7xl font-black text-primary-500 leading-[.9] pl-4 lg:pl-10">{{ i + 1 }}</span>
      <div class="flex flex-col ">
        <h3 class="text-2xl font-semibold">
          {{ s.k }}
        </h3>
        <p class="text-gray-600 leading-relaxed max-w-[60ch]">
          {{ s.text }}
        </p>
      </div>
    </div>
  </div>
</template>
