<script setup lang="ts">
definePageMeta({
  layout: 'layout-a',
});
</script>

<template>
  <div>
    <app-cta-a
      body="Not every project is large-scale, but every project deserves the same precision, coordination, and care."
      image="https://ik.imagekit.io/pnixsw7lg/main-website/IMG_0570.jpg"
      flip
    >
      <UIcon name="i-lucide-briefcase-business" />
      Specialty Projects <span>Division</span>
      <template #body>
        <p>
          Our <b>Specialty Projects Division (SPD)</b> is built for efficiency, delivering high-quality results with a
          streamlined process that keeps work simple, predictable, and accountable.
        </p>
      </template>
    </app-cta-a>

    <app-cta-a
      body="Our approach is structured and flexible, designed to keep projects moving efficiently without unnecessary delays."
      image="https://ik.imagekit.io/pnixsw7lg/main-website/IMG_0400.jpg"
    >
      <UIcon name="i-lucide-workflow" />
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
        <p class="mt-4">
          We move with urgency while protecting quality and attention to detail.
        </p>
      </template>
    </app-cta-a>

    <app-cta-a
      body="You can expect consistent communication, clear ownership, and practical updates from kickoff through completion."
      image="https://ik.imagekit.io/pnixsw7lg/main-website/2K6A2696.jpg"
      flip
    >
      <UIcon name="i-lucide-message-circle-more" />
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
      <UIcon name="i-lucide-list-checks" />
      SPD <span>Process</span>
      <template #body>
        <ol class="process-list">
          <li>
            <h4>New Project Request</h4>
            <p>
              The New Project Request Form (NPRF) helps align scope, schedule, and next steps from day one. It is not
              required, but completing it early improves speed and clarity.
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
          </li>
          <li>
            <h4>Site Visit and Scope Development</h4>
            <p>
              We verify field conditions, measurements, and constraints. Key trade partners may join to support
              accurate pricing and execution planning.
            </p>
          </li>
          <li>
            <h4>Preconstruction and Estimation</h4>
            <p>
              We prepare a clear estimate and provide weekly updates. Typical turnaround is 7 business days from the
              site visit, or 14 to 16 days for more complex scopes.
            </p>
          </li>
          <li>
            <h4>Proposal Submission and Client Approval</h4>
            <p>
              We do not proceed until scope, budget, and expectations are reviewed and approved.
            </p>
          </li>
          <li>
            <h4>Contract Execution and Project Kickoff</h4>
            <p>
              Once approved, we finalize agreements, align resources, and confirm the project start plan.
            </p>
          </li>
          <li>
            <h4>Project Execution</h4>
            <p>
              Construction proceeds with transparent communication and consistent progress tracking.
            </p>
          </li>
          <li>
            <h4>Project Completion and Closeout</h4>
            <p>
              We complete final walkthrough and closeout documentation, including project photos, operations and
              maintenance notes, warranty details, and key project records.
            </p>
          </li>
        </ol>
      </template>
    </app-cta-a>
  </div>
</template>

<style scoped>
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
  margin-top: calc(var(--spacing) * 3);
  padding: 0;
  list-style: none;
  counter-reset: step;
  display: grid;
  gap: calc(var(--spacing) * 4);
}

.process-list > li {
  counter-increment: step;
}

.process-list > li::before {
  content: counter(step);
  display: inline-grid;
  place-items: center;
  width: 1.7rem;
  height: 1.7rem;
  margin-bottom: 0.6rem;
  border-radius: 999px;
  background: var(--ui-primary);
  color: white;
  font-size: 0.8rem;
  font-weight: 700;
}

.process-list h4 {
  margin: 0 0 0.35rem;
  font-size: 1.15rem;
  line-height: 1.2;
}

.process-list p {
  margin: 0;
}
</style>
