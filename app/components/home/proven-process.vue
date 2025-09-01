<script setup lang="ts">
const { onError } = useImgOnError();

const steps = [
  { k: 'Listen', text: 'Every project begins with thoughtful listening. We take time to understand your vision, goals, and constraints. Through discovery meetings, site reviews, and clear communication, we lay the foundation for a partnership built on trust and alignment.' },
  { k: 'Plan', text: 'Before any work begins, we bring certainty to the process. From budget-aligned designs and permitting to early trade coordination and risk mitigation, we focus on eliminating surprises and protecting your timeline from day one.' },
  { k: 'Execute', text: 'With the plan in place, we deliver with precision. Using tools like Procore, we provide full visibility, weekly updates, and proactive oversight. Our team owns the outcome, communicates clearly, and protects your project through to the final walkthrough.' },
  { k: 'Cultivate', text: 'Our work doesn’t end at closeout. We stay engaged with system training, 30-60-90 day check-ins, and a one-year walkthrough. The goal: ensure your space performs, your team is supported, and your trust in us grows long after the build is done.' },
];
</script>

<template>
  <section id="process" class="py-12 sm:py-16">
    <UContainer>
      <div class="flex items-left md:items-center flex-col md:flex-row justify-between">
        <div>
          <p class="text-base font-semibold text-primary">
            Success on purpose
          </p>
          <h2 class="mt-2 text-2xl sm:text-3xl font-semibold">
            Our Proven Process
          </h2>
          <p class="text-base md:text-lg text-muted max-w-3xl mx-auto">
            Our proven process brings structure and consistency to every project. We listen, plan, and execute to reduce risk, maintain alignment, and deliver on time, on budget, and with complete transparency.
          </p>
        </div>
        <UButton
          to="#contact"
          size="xl"
          class="mt-auto"
        >
          Get in Touch
        </UButton>
      </div>

      <div class="mt-6">
        <NuxtImg
          src="https://picsum.photos/1200/450"
          alt="Team collaboration"
          sizes="sm:100vw md:100vw lg:1024px"
          densities="x1 x2"
          class="w-full rounded-xl aspect-square md:aspect-[calc(2*3+1)/3] object-cover"
          loading="lazy"
          format="webp"
          fit="cover"
          @error="onError"
        />
      </div>

      <div class="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-2 border-t border-accented pt-6">
        <div
          v-for="(s, i) in steps"
          :key="s.k"
          class="h-full flex gap-4 p-4 md:odd:border-r border-accented"
        >
          <span class="text-7xl font-black text-primary-500 leading-none">{{ i + 1 }}</span>
          <div class="flex flex-col ">
            <h3 class="text-xl font-semibold">
              {{ s.k }}
            </h3>
            <p class="text-gray-600 leading-relaxed">
              {{ s.text }}
            </p>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>
