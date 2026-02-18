<script setup lang="ts">
definePageMeta({
  layout: 'layout-a',
});
</script>

<template>
  <div>
    <app-cta-a
      body="We begin by listening: with care, patience, and purpose. We’re not just building a project; we’re honoring your vision from the very start."
      image="https://ik.imagekit.io/pnixsw7lg/main-website/IMG_9820.jpg"
      flip
    >
      <UIcon name="i-lucide-ear" />Listen
      <template #body>
        <ul>
          <li>Project Kickoff and Discovery</li>
          <li>Budget & timeline goals</li>
          <li>
            Site and feasibility review to shape the strategy
          </li>
        </ul>
      </template>
    </app-cta-a>
    <app-cta-a
      body="Where most projects break down, we build certainty. Our planning process locks in budget, coordination, and clarity before the first shovel hits the ground."
      image="https://ik.imagekit.io/pnixsw7lg/main-website/2K6A2696.jpg"
    >
      <UIcon name="i-lucide-clipboard-list" />
      Plan
      <template #body>
        <ul>
          <li>Budget-aligned design and enhanced estimating</li>
          <li>Early trade input, constructability review, and permitting</li>
          <li>
            Real-time scheduling, timeline protection, and risk prevention
          </li>
          <li>
            Decision-making support with a focus on eliminating surprises
          </li>
        </ul>
      </template>
    </app-cta-a>
    <app-cta-a
      body="We deliver with precision, safety, and full transparency—communicating consistently, owning the outcome, and protecting your schedule from start to finish."
      image="https://ik.imagekit.io/pnixsw7lg/main-website/IMG_0400.jpg"
      flip
    >
      <UIcon name="i-lucide-hammer" />
      Execute
      <template #body>
        <ul>
          <li>Clear communication with weekly updates</li>
          <li>Project execution with enhanced jobsite visibility through Procore</li>
          <li>
            Community engagement so there’s impact beyond the job site
          </li>
          <li>
            Clear financial oversight with minimized surprises
          </li>
          <li>
            Seamless finish with zero-punch and wrap-up
          </li>
        </ul>
      </template>
    </app-cta-a>
    <app-cta-a
      body="12-Month Legacy Lap: We don’t disappear at closeout. We stay engaged so your space performs, your team is supported, and your trust grows."
      image="https://ik.imagekit.io/pnixsw7lg/main-website/IMG_0570.jpg"
    >
      <UIcon name="i-lucide-refresh-ccw" />
      Cultivate
      <template #body>
        <ul>
          <li>System training and facility onboarding</li>
          <li>30-60-90 day check-ins, warranty reminders, and one-year walkthrough</li>
          <li>
            Project legacy report, testimonials, referrals, and planning what’s next
          </li>
        </ul>
      </template>
    </app-cta-a>
    <quote
      quote="It was a pleasure working with the Envision team."
      name="John Luksas"
      title="Assistant Director, Operations USF College of Nursing"
    />
  </div>
</template>

<style scoped>
ul {
  margin-top: calc(var(--spacing) * 3);
  list-style: none;
  padding: 0;
}

li {
  counter-increment: steps;
  padding-top: calc(var(--spacing) * 2);
  display: flex;
  align-items: flex-start;
  /* or center */

  &::before {
    content: counter(steps);
    margin-right: 0.75em;
    background: var(--color-primary);
    color: var(--color-white);
    width: 1.6em;
    height: 1.6em;
    border-radius: 50%;
    display: grid;
    place-items: center;
    flex-shrink: 0;
  }
}
</style>
