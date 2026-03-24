<script setup lang="ts">
// const spd = [
//  {
//    title: 'New Project Request',
//    meta: {
//      body: 'The New Project Request Form (NPRF) helps align scope, schedule, and next steps from day one. It is not required, but completing it early improves speed and clarity.\n\n- Clarifies project scope and goals.\n- Improves schedule planning and sequencing.\n- Speeds up handoff and mobilization.',
//    },
//  },
//  {
//    title: 'Site Visit and Scope Development',
//    meta: {
//      body: 'We verify field conditions, measurements, and constraints. Key trade partners may join to support accurate pricing and execution planning.',
//    },
//  },
//  {
//    title: 'Preconstruction and Estimation',
//    meta: {
//      body: 'We prepare a clear estimate and provide weekly updates. Typical turnaround is 7 business days from the site visit, or 14 to 16 days for more complex scopes.',
//    },
//  },
//  {
//    title: 'Proposal Submission and Client Approval',
//    meta: {
//      body: 'We do not proceed until scope, budget, and expectations are reviewed and approved.',
//    },
//  },
//  {
//    title: 'Contract Execution and Project Kickoff',
//    meta: {
//      body: 'Once approved, we finalize agreements, align resources, and confirm the project start plan.',
//    },
//  },
//  {
//    title: 'Project Execution',
//    meta: {
//      body: 'Construction proceeds with transparent communication and consistent progress tracking.',
//    },
//  },
//  {
//    title: 'Project Completion and Closeout',
//    meta: {
//      body: 'We complete final walkthrough and closeout documentation, including project photos, operations and maintenance notes, warranty details, and key project records.',
//    },
//  },
// ];

definePageMeta({
  layout: "layout-a",
});
</script>

<template>
  <div class="container">
    <app-cta-a
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
    </app-cta-a>

    <app-cta-a
      body="Our approach is structured and flexible, designed to keep projects moving efficiently without unnecessary delays."
      image="https://ik.imagekit.io/pnixsw7lg/main-website/IMG_0400.jpg"
    >
      How It <span>Works</span>
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
    </app-cta-a>

    <app-cta-a
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
    </app-cta-a>

    <app-cta-a
      body="Our SPD process is designed to reduce friction, create clarity, and keep your project moving."
      image="https://ik.imagekit.io/pnixsw7lg/main-website/2K6A3328.jpg"
    >
      SPD <span>Process</span>
    </app-cta-a>

    <ul class="process-list">
      <li>
        <h4>1. New Project Request</h4>
        <div>
          <p>
            The New Project Request Form (NPRF) helps align scope, schedule, and next steps from day
            one. It is not required, but completing it early improves speed and clarity.
          </p>
          <ul class="service-list service-list--subtle">
            <li>
              <UIcon name="i-lucide-scan-search" />
              Clarifies project scope and goals.
            </li>
            <li>
              <UIcon name="i-lucide-calendar-range" />
              Improves schedule planning and sequencing.
            </li>
            <li>
              <UIcon name="i-lucide-arrow-up-right" />
              Speeds up handoff and mobilization.
            </li>
          </ul>
        </div>
      </li>
      <li>
        <h4>2. Site Visit and Scope Development</h4>
        <div>
          <p>
            We verify field conditions, measurements, and constraints. Key trade partners may join
            to support accurate pricing and execution planning.
          </p>
        </div>
      </li>
      <li>
        <h4>3. Preconstruction and Estimation</h4>
        <div>
          <p>
            We prepare a clear estimate and provide weekly updates. Typical turnaround is 7 business
            days from the site visit, or 14 to 16 days for more complex scopes.
          </p>
        </div>
      </li>
      <li>
        <h4>4. Proposal Submission and Client Approval</h4>
        <div>
          <p>We do not proceed until scope, budget, and expectations are reviewed and approved.</p>
        </div>
      </li>
      <li>
        <h4>5. Contract Execution and Project Kickoff</h4>
        <div>
          <p>
            Once approved, we finalize agreements, align resources, and confirm the project start
            plan.
          </p>
        </div>
      </li>
      <li>
        <h4>6. Project Execution</h4>
        <div>
          <p>
            Construction proceeds with transparent communication and consistent progress tracking.
          </p>
        </div>
      </li>
      <li>
        <h4>7. Project Completion and Closeout</h4>
        <p>
          We complete final walkthrough and closeout documentation, including project photos,
          operations and maintenance notes, warranty details, and key project records.
        </p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.container {
  container-type: inline-size;
  container-name: service;
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

.process-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @container service (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.process-list > li {
  border: 1px solid var(--ui-border);

  div {
    padding: calc(var(--spacing) * 3);
  }
}

.process-list h4 {
  padding: calc(var(--spacing) * 3);
  font-size: var(--font-size-h4);
  line-height: 1.2;
}

.process-list p {
  margin: 0;
}
</style>
