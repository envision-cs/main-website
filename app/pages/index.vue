<template>
  <div>
    <home-hero-banner />
    <app-cta-band
      eyebrow="Clarity From Day One"
      title="Building Without the Headaches"
      description="We know how stressful construction can feel when deadlines are missed, communication is poor, and leadership is unclear. That’s why we’ve built a process that keeps your project on track and you in the loop—every step of the way."
      :links="[
        {
          label: 'Start Your Project',
          to: '#',
          color: 'primary',
        },
        {
          label: 'See Our Work',
          to: '#',
          variant: 'outline',
          color: 'neutral',
        },
      ]"
    />
  </div>
</template>
