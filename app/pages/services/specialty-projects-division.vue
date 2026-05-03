<script setup lang="ts">
const targetAudience = [
  { id: 1, label: "Facilities directors" },
  { id: 2, label: "Maintenance teams" },
  { id: 3, label: "Operations managers" },
  { id: 4, label: "Multi-site programs" },
  { id: 5, label: "Annual contract holders" },
  { id: 6, label: "Healthcare operators" },
];

const process = [
  {
    id: 1,
    title: "Scope it",
    description:
      "Fast response. We assess the scope, ask the right questions, and get you a clear picture of what the work involves before anything starts.",
  },
  {
    id: 2,
    step: "02",
    title: "Price it",
    description:
      "Transparent pricing with no surprises. You know the cost before we mobilize — and we stick to it.",
  },
  {
    id: 3,
    title: "Execute it",
    description:
      "Work begins on your schedule — including weekends, overnight, and 72-hour turnarounds. Our team shows up, works around the clock when needed, and delivers clean work ready for operations on Monday morning.",
  },
  {
    id: 4,
    title: "Document it",
    description:
      "Every scope is fully documented in CompanyCam — photos before, during, and after. You always know exactly what was done.",
  },
];

const serviceOfferings = [
  {
    id: 1,
    title: "Annual small-project and permit-holder contracts",
    description:
      "One reliable partner for all your ongoing small-scope work — no re-bidding every job.",
  },
  {
    id: 2,
    title: "High-volume maintenance and facilities work",
    description:
      "Built to handle volume without sacrificing responsiveness or quality on any single scope.",
  },
  {
    id: 3,
    title: "Fast-turnaround renovations and repairs",
    description:
      "When something needs to move fast, SPD is structured to mobilize quickly without cutting corners.",
  },
  {
    id: 4,
    title: "Multi-site program delivery",
    description:
      "Consistent execution across multiple locations — same standard, same documentation, every time.",
  },
];

const projectHighlights = [
  { id: 1, label: "Active cancer center — patient safety and care never compromised" },
  { id: 2, label: "72-hour weekend turnarounds — clinics cleaned and operational every Monday" },
  { id: 3, label: "Negative air scrubbers used to control bacteria and dust levels throughout" },
  { id: 4, label: "Daily owner reports maintained full transparency at every phase" },
  { id: 5, label: "Multiple repeat scopes — Moffitt keeps calling us back" },
];

const stats = [
  { id: 1, title: "13+", description: "USF projects completed" },
  { id: 2, title: "$7.5M", description: "Contract ceiling" },
];

definePageMeta({
  layout: "layout-a",
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
      image="/florida-aquarium-restroom-renovation-03.jpg"
    >
      <template #body>
        <app-typography>
          SPD is not a side function of our larger business. It is a dedicated team with its own
          process, its own tools, and its own performance standard — built specifically for
          facilities directors and operations managers who need a contractor that responds fast,
          communicates clearly, documents everything, and gets it done right the first time.
        </app-typography>
        <app-typography>
          Most contractors treat small projects like an afterthought. SPD was built because they
          shouldn't be.
        </app-typography>
      </template>
    </cta-a>

    <section-a bgcolor="dark" eyebrow="How SPD works" title="Fast. Documented. Done right." body="">
      <template #body>
        <app-typography>
          Every SPD scope follows the same simple process — no matter the size.
        </app-typography>
      </template>
      <list-a :items="process" />
    </section-a>

    <section-a
      bgcolor="blue"
      title="SPD. Documented on every scope."
      body="Every SPD project is captured in CompanyCam — organized by project and date, visible to you instantly. Before, during, and after. No ambiguity on what was done, how it looked, and when it was completed"
    />

    <section-a
      bgcolor="light"
      eyebrow="What SPD is built for"
      title="The work your facilities team needs done — now."
      body="High volume, fast turnaround, zero compromises on quality."
    >
      <list-a :items="serviceOfferings" />
    </section-a>
    <cta-a
      flip="true"
      eyebrow="Featured Project"
      title="Moffitt Cancer Center — Multiple Scopes"
      body=""
      image="/florida-aquarium-restroom-renovation-03.jpg"
      bgcolor="light"
    >
      <template #body>
        <app-typography>
          When the environment is a cancer center, the standard for how you work changes entirely.
          Envision has completed multiple scopes at Moffitt — including domestic hot water upgrades
          and clinic build-outs — working nights, weekends, and 72-hour turnarounds so patient care
          was never interrupted.
        </app-typography>
        <app-typography>
          For the clinic build-outs, smaller clinics were completed over a single weekend. Larger
          clinics were delivered in 72-hour intervals across three weekends — with a multi-phased
          schedule ensuring every clinic was fully operational when patients returned Monday
          morning. Negative air scrubber machines controlled bacteria and dust levels throughout.
          Daily reports to the owner kept all parties informed at every step.
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

    <section-d
      bgcolor="blue"
      eyebrow="Also worth noting"
      title="University of South Florida — Continuing Services"
      body="Envision has served USF under a General Contracting Continuing Services contract since 2024 — approximately 13 projects and counting across active campus environments. Lab improvements, interior renovations, building upgrades, permit-driven scopes. Multiple projects running concurrently. This is what a reliable SPD partner looks like at volume."
    >
      <list-e :items="stats" />
    </section-d>

    <cta-c
      title="Have a scope? Let's get it done."
      center
      body="Tell us what you need. We'll respond fast, price it clearly, and get to work on your schedule."
      label="Get a scope started"
      href="/contact"
      bgcolor="dark"
    />
  </main>
</template>

<style scoped>
.list {
  list-style: disc outside;
  padding-left: 1.25rem;
}
</style>
