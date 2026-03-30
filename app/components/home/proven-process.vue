<script setup lang="ts">
// const { data: our_process, pending, error } = await useAsyncData('our-process', () => $fetch('/api/process'), {
//  server: true,
//  lazy: true,
//  default: () => [],
// });

const process = [
  {
    id: 1,
    order: "01",
    title: "Listen",
    description:
      "Every project begins with thoughtful listening. We take time to understand your vision, goals, and constraints. Through discovery meetings, site reviews, and clear communication, we lay the foundation for a partnership built on trust and alignment.",
  },
  {
    id: 2,
    order: "02",
    title: "Plan",
    description:
      "Before any work begins, we bring certainty to the process. From budget-aligned designs and permitting to early trade coordination and risk mitigation, we focus on eliminating surprises and protecting your timeline from day one.",
  },
  {
    id: 3,
    order: "03",
    title: "Execute",
    description:
      "With the plan in place, we deliver with precision. Using tools like Procore, we provide full visibility, weekly updates, and proactive oversight. Our team owns the outcome, communicates clearly, and protects your project through to the final walkthrough.",
  },
  {
    id: 4,
    order: "04",
    title: "Cultivate",
    description:
      "Our work doesn’t end at closeout. We stay engaged with system training, 30-60-90 day check-ins, and a one-year walkthrough. The goal: ensure your space performs, your team is supported, and your trust in us grows long after the build is done.",
  },
];
</script>

<template>
  <section>
    <div class="content">
      <div class="grid gap-4">
        <app-typography tag="h2" variant="heading-md" class="font-semibold">
          Our Proven Process
        </app-typography>

        <app-typography tag="h2">
          Our proven process brings structure and consistency to every project. We listen, plan, and
          execute to reduce risk, maintain alignment, and deliver on time, on budget, and with
          complete transparency.
        </app-typography>
      </div>

      <ul class="mt-auto">
        <li v-for="item in process" :key="item.id" class="flex flex-col gap-4">
          <div class="grid gap-2">
            <app-typography tag="h3" variant="heading-lg" class="number font-semibold">
              {{ item.order }}
            </app-typography>
            <app-typography tag="h3" variant="heading-lg" class="font-semibold">
              {{ item.title }}
            </app-typography>
          </div>
          <app-typography tag="p">
            {{ item.description }}
          </app-typography>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
section {
  padding: calc(var(--spacing) * 4);
  container-type: inline-size;
  container-name: section;

  @media (min-width: 768px) {
    padding-inline: calc(var(--spacing) * 8);
    padding-block: calc(var(--spacing) * 20);
  }
}

.content {
  display: grid;
  justify-content: stretch;
  gap: calc(var(--spacing) * 16);
  margin-inline: auto;

  @media (min-width: 768px) {
    justify-content: space-between;
  }
}

ul {
  display: grid;
  grid-template-columns: 1fr;
  gap: calc(var(--spacing) * 8);
  counter-reset: step;

  @container section (width > 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @container section (width > 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
}

li {
  position: relative;
}
</style>
