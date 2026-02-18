<script setup lang="ts">
definePageMeta({
  layout: 'layout-a',
});
</script>

<template>
  <div>
    <app-cta-a
      body=""
      image="https://ik.imagekit.io/pnixsw7lg/main-website/IMG_0570.jpg"
      flip
    >
      A Practical Approach to<span> Small Projects</span>

      <template #body>
        <app-typography tap="p">
          Not every project is large-scale. However, no
          matter the size, every project deserves the
          highest level of precision, coordination, and care
        </app-typography>
        <br>
        <app-typography tap="p">
          Our <b>Specialty Projects Division (SPD)</b>
          is builtfor efficiency, ensuring high-quality results with a
          streamlined process that keeps things simple and
          predictable.
        </app-typography>
      </template>
    </app-cta-a>

    <app-cta-a
      body="Our approach is both structured and flexible, designed to keep projects moving efficently without unnecessary delays."
      image="https://ik.imagekit.io/pnixsw7lg/main-website/IMG_0570.jpg"
    >
      How It Works<span> Small Projects</span>
      <template #body>
        <ul>
          <li>
            <UIcon name="i-lucide-hammer" />
            <app-typography tap="p">
              Clear communication from our team means
              you’ll always know what’s next.
            </app-typography>
          </li>
          <li>
            <UIcon name="i-lucide-hammer" />
            <app-typography tap="p">
              Efficient execution keeps projects on track
              from preconstruction to completion.
            </app-typography>
          </li>
          <li>
            <UIcon name="i-lucide-hammer" />
            <app-typography tap="p">
              Proactive coordination minimizes delays
              and disruption in the process.
            </app-typography>
          </li>
        </ul>
        <br>
        <app-typography tap="p">
          We move with urgency while maintaining the attention to detail that ensures a successful outcome.
        </app-typography>
      </template>
    </app-cta-a>

    <app-cta-a
      body=""
      image="https://ik.imagekit.io/pnixsw7lg/main-website/IMG_0570.jpg"
      flip
    >
      Communication:<span> What to Expect</span>
      <template #body>
        <ul>
          <li>
            <UIcon name="i-lucide-hammer" />
            <app-typography tag="p">
              You’ll be in touch with a single point of
              contact for streamlined communication.
            </app-typography>
          </li>
          <li>
            <UIcon name="i-lucide-hammer" />
            <app-typography tag="p">
              During Preconstruction, you’ll receive
              weekly updates.
            </app-typography>
          </li>
          <li>
            <UIcon name="i-lucide-hammer" />
            <app-typography tag="p">
              We’ll provide project updates via email,
              phone, or scheduled check-ins.
            </app-typography>
          </li>
        </ul>
      </template>
    </app-cta-a>
    <app-cta-a>
      OUR SPD<span> PROCESS</span>
      <template #body>
        <ul>
          <li>
            <app-typography tag="h4">
              New Project Request
            </app-typography>
            <app-typography tag="p">
              For every new project, The New Project Request
              Form (NPRF) helps us align on scope, schedule,
              and next steps from the start. While not required,
              completing the NPRF upfront allows our team to:
            </app-typography>
            <ul>
              <li>
                <UIcon name="i-lucide-hammer" />
                <app-typography tag="p">
                  You’ll be in touch with a single point of
                  contact for streamlined communication.
                </app-typography>
              </li>
              <li>
                <UIcon name="i-lucide-hammer" />
                <app-typography tag="p">
                  During Preconstruction, you’ll receive
                  weekly updates.
                </app-typography>
              </li>
              <li>
                <UIcon name="i-lucide-hammer" />
                <app-typography tag="p">
                  We’ll provide project updates via email,
                  phone, or scheduled check-ins.
                </app-typography>
              </li>
            </ul>
            <app-typography tag="p">
              Skipping the form won’t slow us down, but
              completing it helps us deliver the most efficient
              process possible.
            </app-typography>
          </li>
          <li>
            <app-typography tag="h4">
              Site Visit & Scope Development
            </app-typography>
            <app-typography tag="p">
              We visit the site, verify measurements, and refine details. Key trade partners may join to ensure accurate
              pricing and execution.
            </app-typography>
          </li>

          <li>
            <app-typography tag="h4">
              Preconstruction & Estimation
            </app-typography>
            <app-typography tag="p">
              A clear, detailed estimate is prepared and weekly updates on the proposal are provided. Standard
              turnaround is 7 business days from the site visit; for more complex projects, turnaround is 14-16 days.
            </app-typography>
          </li>
          <li>
            <app-typography tag="h4">
              Proposal Submission & Client Approval
            </app-typography>
            <app-typography tag="p">
              We won’t move forwad until you review and approve the scope and cost.
            </app-typography>
          </li>
          <li>
            <app-typography tag="h4">
              Contract Execution & Project Kickoff
            </app-typography>
            <app-typography tag="p">
              Once approved, we’ll finaliz agreements, coordinate resources, and schedule work.
            </app-typography>
          </li>
          <li>
            <app-typography tag="h4">
              Project Execution
            </app-typography>
            <app-typography tag="p">
              Construction begins with clear communication and regular progress updates.
            </app-typography>
          </li>
          <li>
            <app-typography tag="h4">
              Project Completion & Closeout
            </app-typography>
            <app-typography tag="p">
              Final walkthrough, punch list completion, and delivery of closeout documentation. You will receive a
              closeout package including:
            </app-typography>
            <ul>
              <li>
                <app-typography tag="p">
                  Project photos
                </app-typography>
              </li>
              <li>
                <app-typography tag="p">
                  Maintenance and operational details
                </app-typography>
              </li>
              <li>
                <app-typography tag="p">
                  Warranty information and key project documents
                </app-typography>
              </li>
            </ul>
          </li>
        </ul>
      </template>
    </app-cta-a>
  </div>
</template>
