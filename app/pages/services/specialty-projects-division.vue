<script setup lang="ts">
const spdSlides = [
  {
    id: 1,
    eyebrow: "01",
    title: "New Project Request",
    description:
      "The New Project Request Form (NPRF) helps align scope, schedule, and next steps from day one. It is not required, but completing it early improves speed and clarity.",
    tone: "--color-envision-blue-600",
    points: [
      {
        icon: "i-lucide-scan-search",
        text: "Clarifies project scope and goals.",
      },
      {
        icon: "i-lucide-calendar-range",
        text: "Improves schedule planning and sequencing.",
      },
      {
        icon: "i-lucide-arrow-up-right",
        text: "Speeds up handoff and mobilization.",
      },
    ],
  },
  {
    id: 2,
    eyebrow: "02",
    title: "Site Visit and Scope Development",
    description:
      "We verify field conditions, measurements, and constraints. Key trade partners may join to support accurate pricing and execution planning.",
    tone: "--color-envision-green-500",
  },
  {
    id: 3,
    eyebrow: "03",
    title: "Preconstruction and Estimation",
    description:
      "We prepare a clear estimate and provide weekly updates. Typical turnaround is 7 business days from the site visit, or 14 to 16 days for more complex scopes.",
    tone: "--color-envision-gray-700",
  },
  {
    id: 4,
    eyebrow: "04",
    title: "Proposal Submission and Client Approval",
    description:
      "We do not proceed until scope, budget, and expectations are reviewed and approved.",
    tone: "--color-envision-blue-800",
  },
  {
    id: 5,
    eyebrow: "05",
    title: "Contract Execution and Project Kickoff",
    description:
      "Once approved, we finalize agreements, align resources, and confirm the project start plan.",
    tone: "--color-envision-blue-600",
  },
  {
    id: 6,
    eyebrow: "06",
    title: "Project Execution",
    description:
      "Construction proceeds with transparent communication and consistent progress tracking.",
    tone: "--color-envision-green-500",
  },
  {
    id: 7,
    eyebrow: "07",
    title: "Project Completion and Closeout",
    description:
      "We complete final walkthrough and closeout documentation, including project photos, operations and maintenance notes, warranty details, and key project records.",
    tone: "--color-envision-gray-700",
  },
];

definePageMeta({
  layout: "layout-a",
});
</script>

<template>
  <main class="site-grid">
    <cta-a
      body="Not every project is large-scale, but every project deserves the same precision, coordination, and care."
      image="https://ik.imagekit.io/pnixsw7lg/main-website/IMG_0570.jpg"
      flip
    >
      Specialty Projects <span>Division</span>
      <template #body>
        <p>
          Our <b>Specialty Projects Division (SPD)</b> is built for efficiency, delivering
          high-quality results with a streamlined process that keeps work simple, predictable, and
          accountable.
        </p>
      </template>
    </cta-a>

    <cta-a
      body="Our approach is structured and flexible, designed to keep projects moving efficiently without unnecessary delays."
      image="https://ik.imagekit.io/pnixsw7lg/main-website/IMG_0400.jpg"
      title="How It Works"
    >
      <template #body>
        <ul class="service-list">
          <li>
            <UIcon name="i-lucide-messages-square" />
            Clear communication so you always know what is next.
          </li>
          <li>
            <UIcon name="i-lucide-timer-reset" />
            Efficient execution from preconstruction through closeout.
          </li>
          <li>
            <UIcon name="i-lucide-route" />
            Proactive coordination to reduce delays and disruption.
          </li>
        </ul>
        <p class="mt-4">We move with urgency while protecting quality and attention to detail.</p>
      </template>
    </cta-a>

    <cta-a
      body="You can expect consistent communication, clear ownership, and practical updates from kickoff through completion."
      image="https://ik.imagekit.io/pnixsw7lg/main-website/2K6A2696.jpg"
      flip
    >
      Communication <span>Expectations</span>
      <template #body>
        <ul class="service-list">
          <li>
            <UIcon name="i-lucide-user-round" />
            A single point of contact for streamlined decisions.
          </li>
          <li>
            <UIcon name="i-lucide-calendar-clock" />
            Weekly updates during preconstruction.
          </li>
          <li>
            <UIcon name="i-lucide-phone-call" />
            Project updates by email, phone, or scheduled check-ins.
          </li>
        </ul>
      </template>
    </cta-a>

    <process-slider
      title="SPD Process"
      body="Our SPD process is designed to reduce friction, create clarity, and keep your project moving."
      background-image="https://ik.imagekit.io/pnixsw7lg/main-website/2K6A3328.jpg"
      :slides="spdSlides"
    />
  </main>
</template>

<style scoped>
.container {
  grid-column: 1/-1;
  grid-template-columns: subgrid;
}

.service-list {
  margin-top: calc(var(--spacing) * 3);
  list-style: none;
  padding: 0;
  display: grid;
  gap: calc(var(--spacing) * 2);
}

.service-list li {
  display: flex;
  gap: 0.65rem;
  align-items: flex-start;
}

.service-list li :deep(svg) {
  color: var(--ui-primary);
  margin-top: 0.15rem;
  flex-shrink: 0;
}

.service-list--subtle li :deep(svg) {
  color: var(--ui-secondary);
}
</style>
