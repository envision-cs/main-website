<script setup lang="ts">
useSeoMeta({
  title: 'Specialty Projects Division | Envision Tampa Bay & Central Florida',
  description:
    "Envision's Specialty Projects Division (SPD) handles high-volume maintenance, fast-turnaround renovations, multi-site programs, and annual small-project contracts, with 72-hour turnarounds and full CompanyCam documentation.",
  ogTitle: 'Specialty Projects Division | Envision Tampa Bay & Central Florida',
  ogDescription:
    'One reliable partner for ongoing small-scope work. Scope it, price it, execute it, document it, on your schedule, including weekends and overnight.',
  ogImage:
    'https://ik.imagekit.io/pnixsw7lg/main-website/Moffitt_SPD_77a989a8a3.png?updatedAt=1780449600305',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Specialty Projects Division | Envision Tampa Bay & Central Florida',
  twitterDescription:
    'One reliable partner for ongoing small-scope work. Scope it, price it, execute it, document it, on your schedule, including weekends and overnight.',
  twitterImage:
    'https://ik.imagekit.io/pnixsw7lg/main-website/Moffitt_SPD_77a989a8a3.png?updatedAt=1780449600305',
});

const targetAudience = [
  { id: 1, label: 'Facilities directors' },
  { id: 2, label: 'Maintenance teams' },
  { id: 3, label: 'Operations managers' },
  { id: 4, label: 'Multi-site programs' },
  { id: 5, label: 'Annual contract holders' },
  { id: 6, label: 'Healthcare operators' },
];

const process = [
  {
    id: 1,
    label: 'Scope it',
    description:
      'We assess the scope, ask the right questions, and get you a clear picture of what the work involves before anything starts.',
  },
  {
    id: 2,
    step: '02',
    label: 'Price it',
    description:
      'Transparent pricing with no surprises. You know the cost before we mobilize, and we stick to it.',
  },
  {
    id: 3,
    label: 'Execute it',
    description:
      'Work begins on your schedule—including weekends, overnight, and 72-hour turnarounds.Our team shows up, works around the clock when needed, and delivers clean work ready for operations on Monday morning.',
  },
  {
    id: 4,
    label: 'Document it',
    description:
      'Every scope is fully documented in CompanyCam with before, during, and after photos. You’ll always know exactly what was completed.',
  },
];

const serviceOfferings = [
  {
    id: 1,
    label: 'Annual small-project and permit-holder contracts',
    description:
      'One reliable partner for all your ongoing small-scope work means no re-bidding every job.',
  },
  {
    id: 2,
    label: 'High-volume maintenance and facilities work',
    description:
      'Built to handle volume without sacrificing responsiveness or quality on any single scope.',
  },
  {
    id: 3,
    label: 'Fast-turnaround renovations and repairs',
    description:
      'When something needs to move fast, SPD is structured to mobilize quickly without cutting corners.',
  },
  {
    id: 4,
    label: 'Multi-site program delivery',
    description:
      'Consistent execution across multiple locations—same standard, same documentation, every time.',
  },
];

const activeProjects = [
  { id: 1, label: 'Active Operations: Patient safety and care never compromised' },
  {
    id: 2,
    label: 'Cleanliness Maintained: Negative air scrubbers controlled bacteria and dust levels',
  },
  { id: 3, label: 'Full Transparency: Daily owner reports at every phase' },
  { id: 4, label: 'Multiple Repeat Scopes: Moffitt keeps calling us back' },
];

const projectHighlights = [
  { id: 1, label: 'Active cancer center — patient safety and care never compromised' },
  { id: 2, label: '72-hour weekend turnarounds — clinics cleaned and operational every Monday' },
  { id: 3, label: 'Negative air scrubbers used to control bacteria and dust levels throughout' },
  { id: 4, label: 'Daily owner reports maintained full transparency at every phase' },
  { id: 5, label: 'Multiple repeat scopes — Moffitt keeps calling us back' },
];

const stats = [
  { id: 1, label: '13+', description: 'USF projects completed' },
  { id: 2, label: '$7.5M', description: 'Contract ceiling' },
];

definePageMeta({
  layout: 'layout-a',
});
</script>

<template>
  <main>
    <section-c bgcolor="blue" title="Built For">
      <list-c :items="targetAudience" />
    </section-c>

    <cta-a
      eyebrow="What SPD is"
      title="A dedicated division built for speed, volume, and your facilities team.
"
      body=""
      image="https://ik.imagekit.io/pnixsw7lg/main-website/SPD_What_SPD_Is_870e9e7493.jpg?"
    >
      <template #body>
        <app-typography>
          SPD is not a side function of our larger business. It is a dedicated team with its own
          process, its own tools, and its own performance standard—built specifically for facilities
          directors and operations managers who need a contractor that responds fast, communicates
          clearly, documents everything, and gets it done right the first time.
        </app-typography>
        <app-typography class="mt-6">
          Most contractors treat small projects like an afterthought. SPD was built because they
          shouldn't be.
        </app-typography>
      </template>
    </cta-a>

    <section-a bgcolor="dark" eyebrow="How SPD works" title="Fast. Documented. Done right." body="">
      <list-f :items="process" />
    </section-a>

    <section-a
      bgcolor="light"
      eyebrow="The work your facilities team needs done right now."
      title="The work your facilities team needs done — now."
      body="High volume, fast turnaround, zero compromises on quality."
    >
      <list-a :items="serviceOfferings" />
    </section-a>

    <cta-a
      eyebrow="Featured Project"
      bgcolor="blue"
      title="University of South Florida: GC Continuing Services Partner Since 2024"
      body=""
      image="https://ik.imagekit.io/pnixsw7lg/main-website/USF_SPD_88c22fb1fc.png?updatedAt=1780449780853"
    >
      <template #body>
        <app-typography class="mb-8">
          Envision has served the University of South Florida under a General Contracting Continuing
          Services contract since 2024, supporting small projects and general construction work up
          to $7.5 million. Since that time, our team has been engaged on approximately 15 projects
          and counting across campus, including lab improvements, interior renovations, building
          upgrades, and other focused scopes of work. This is what a reliable construction partner
          looks like at volume: responsive service, strong coordination, and reliable execution
          across a wide range of active campus projects.
        </app-typography>

        <list-e :items="stats" />
      </template>
    </cta-a>
    <cta-a
      flip="true"
      eyebrow="Featured Project"
      title="Moffitt Cancer Center: Multiple Facility Maintenance Projects"
      body=""
      image="https://ik.imagekit.io/pnixsw7lg/main-website/Moffitt_SPD_77a989a8a3.png?updatedAt=1780449600305"
      bgcolor="light"
    >
      <template #body>
        <app-typography>
          In highly sensitive healthcare environments, safety and swift coordination are
          nonnegotiable. As a trusted extension to the facilities maintenance team at Moffitt Cancer
          Center, our team understands the level of care that hospitals and clinics require—working
          nights, weekends, and 72-hour turnarounds to ensure patient care is never interrupted.
        </app-typography>
        <app-typography>
          Envision has performed a range of facilities maintenance projects for Moffitt Cancer
          Center across active healthcare and campus environments. These scopes have included
          interior and exterior renovation, repair, and improvement work such as flooring
          replacements, painting, drywall repairs, doors and hardware, stair and railing repairs,
          lighting upgrades, drainage-related work, parking lot improvements, and other critical
          maintenance needs. Through SPD, this work is supported with the responsiveness,
          coordination, and clean execution required to keep fast-moving projects on track while
          minimizing disruption to ongoing operations.
        </app-typography>
        <ul class="list">
          <li v-for="item in activeProjects" :key="item.id">
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
      body="Tell us what you need. We'll respond fast, price it clearly, and get to work on your schedule."
      label="Get a scope started"
      href="/contact"
      bgcolor="dark"
    >
      <template #title>
        <app-typography
          tag="h2"
          variant="heading-lg"
          class="title text-envision-blue-500 font-semibold"
        >
          Have a scope?
        </app-typography>
        <app-typography tag="p" variant="heading-lg" class="subtitle">
          Let's get it done.
        </app-typography>
      </template>
    </cta-c>
  </main>
</template>

<style scoped>
.list {
  list-style: disc outside;
  padding-left: 1.25rem;
  background-color: var;
}
</style>
