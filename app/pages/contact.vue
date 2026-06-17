<script setup lang="ts">
const posthog = usePostHog();
const { data: contactData, error } = await useFetch('/api/contact');

function trackEmailClick() {
  posthog?.capture('contact_email_clicked');
}

function trackPhoneClick() {
  posthog?.capture('contact_phone_clicked');
}

useSeoMeta({
  title: 'Contact Envision | Tampa Bay & Central Florida Construction',
  description:
    'Connect with the Envision team to start a project, ask a question, or find the right construction partner across Greater Tampa Bay and Central Florida. Email pursuits@envision-cs.com.',
  ogTitle: 'Contact Envision | Tampa Bay & Central Florida Construction',
  ogDescription:
    'Speak with our team. Start a project, ask a question, or find the right construction partner across Tampa Bay and Central Florida.',
  ogImage: 'https://ik.imagekit.io/pnixsw7lg/main-website/contact-image',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Contact Envision | Tampa Bay & Central Florida Construction',
  twitterDescription:
    'Speak with our team. Start a project, ask a question, or find the right construction partner across Tampa Bay and Central Florida.',
  twitterImage: 'https://ik.imagekit.io/pnixsw7lg/main-website/contact-image',
});
</script>

<template>
  <UPage class="mt-0">
    <div class="grid">
      <banner-b
        image="https://ik.imagekit.io/pnixsw7lg/main-website/contact-image"
        class="col-start-1 -col-end-1"
      >
        Contact Us
      </banner-b>

      <!-- Team header -->
      <section-e v-if="contactData?.team.length && !error" bgcolor="dark" no-padding>
        <template #header>
          <div class="section-head">
            <div class="team-role">
              <app-typography
                tag="h2"
                variant="heading-md"
                class="font-semibold text-balance uppercase pb-8"
              >
                Speak with our <span>team</span>
              </app-typography>
              <app-typography tag="p" variant="text-md" class="section-copy">
                We're ready to connect, whether you're starting a project, asking a question, or
                looking for the right construction partner.
              </app-typography>
              <div class="contact-actions" aria-label="Primary contact options">
                <a
                  href="mailto:pursuits@envision-cs.com"
                  class="contact-action"
                  aria-label="Email Envision pursuits at pursuits@envision-cs.com"
                  @click="trackEmailClick"
                >
                  <span class="contact-action__copy">
                    <span class="contact-action__eyebrow">Start a Pursuit</span>
                    <span class="contact-action__label">Email the team</span>
                    <span class="contact-action__value">pursuits@envision-cs.com</span>
                  </span>
                </a>

                <a
                  href="tel:813-997-0330"
                  class="contact-action"
                  aria-label="Call Envision at 813-997-0330"
                  @click="trackPhoneClick"
                >
                  <span class="contact-action__copy">
                    <span class="contact-action__eyebrow">Speak Directly</span>
                    <span class="contact-action__label">Call the office</span>
                    <span class="contact-action__value">813-997-0330</span>
                  </span>
                </a>
              </div>
              <app-typography tag="p" variant="text-md" class="section-copy">
                For pursuits, select Option 4 or dial Ext. 103.
              </app-typography>
            </div>
          </div>
        </template>

        <template #body>
          <app-team-member-list class="light">
            <li v-for="member in contactData.team" :key="member.name">
              <project-card
                :to="`/team/${member.slug}`"
                :aria-label="member.name"
                :image="member.photo?.url ?? ''"
                :alt="member.name"
                link-mode="overlay"
                aspect-ratio="3/4"
                image-sizes="(max-width: 768px) 100vw, 300px"
                :image-hover-scale="1.1"
                :outlined="false"
                :meta-border="false"
                class="team-member-card"
              >
                <template #title>
                  <app-typography class="h3 team-member-title" variant="heading-md">
                    {{ member.name }}
                  </app-typography>
                  <app-typography
                    tag="p"
                    variant="text-md"
                    class="team-member-role text-primary-200 dark:text-primary-200"
                  >
                    {{ member.title }}
                  </app-typography>
                </template>
              </project-card>
            </li>
          </app-team-member-list>
        </template>
      </section-e>
      <section v-else>
        {{ error?.message }}
      </section>

      <!-- Locations    -->
      <section-e bgcolor="dark" no-padding-main no-padding>
        <template #header>
          <app-typography
            tag="h2"
            variant="heading-md"
            class="font-semibold text-balance uppercase p-8"
          >
            Our <span>Locations</span>
          </app-typography>

          <div class="location-wrapper">
            <app-location-card
              v-for="location in contactData?.locations"
              :key="location.id"
              :title="location.name"
              :address="location?.address"
              :city="location.city"
              :phone="location.phone"
              :email="location.email"
            />
          </div>
        </template>

        <template #body>
          <Client-only>
            <app-location-map class="min-h-125" />
          </Client-only>
        </template>
      </section-e>
    </div>
  </UPage>
</template>

<style scoped>
.contact {
  --_padding: calc(var(--spacing) * 4);
  gap: calc(var(--spacing) * 0);
  width: 100%;

  @media (min-width: 700px) {
    --_padding: calc(var(--spacing) * 6);
    gap: calc(var(--spacing) * 8);
  }

  @media (min-width: 1024px) {
    --_padding: calc(var(--spacing) * 8);
  }

  .content {
    padding: var(--_padding);
    grid-column: 1 / -1;
    max-width: 55ch;

    @media (min-width: 700px) {
      grid-column: 1 / span 5;
    }

    @media (min-width: 1024px) {
      grid-column: 1 / span 13;
    }
  }

  .contact-form {
    grid-column: 1 / -1;
    padding: var(--_padding);

    @media (min-width: 700px) {
      grid-column: 6 / -1;
    }

    @media (min-width: 1024px) {
      grid-column: 15 / -1;
    }
  }
}

.section-head {
  padding: calc(var(--spacing) * 8);
}

.team-role {
  display: grid;
  gap: calc(var(--spacing) * 4);
}

.section-copy {
  max-width: 42ch;
  color: var(--color-envision-gray-300);
}

.contact-actions {
  display: grid;
  grid-template-columns: 1fr;
  gap: calc(var(--spacing) * 5);
  width: min(100%, 36rem);
  padding-top: calc(var(--spacing) * 4);
}

.contact-action {
  display: grid;
  min-width: 0;
  color: var(--color-white);
  text-decoration: none;
  transition:
    background-color 180ms ease,
    color 180ms ease;
}

.contact-action__copy {
  display: grid;
  gap: calc(var(--spacing) * 1);
  min-width: 0;
}

.contact-action__eyebrow,
.contact-action__value {
  overflow-wrap: anywhere;
  font-size: var(--font-size-text-t4);
  line-height: 1.1;
}

.contact-action__eyebrow {
  color: var(--ui-secondary);
  font-weight: 700;
  text-transform: uppercase;
}

.contact-action__label {
  font-size: var(--font-size-text-t2);
  font-weight: 600;
  line-height: 1.1;
  text-wrap: balance;
}

.contact-action__value {
  color: color-mix(in oklab, var(--color-white) 72%, transparent);
  font-weight: 500;
}

.contact-action:hover {
  color: var(--ui-secondary);
}

.contact-action:focus-visible {
  outline: 2px solid var(--ui-secondary);
  outline-offset: 4px;
}

@media (min-width: 700px) {
  .contact-actions {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: calc(var(--spacing) * 8);
  }

  .contact-action {
    padding-inline: calc(var(--spacing) * 4);
  }

  .contact-action:first-child {
    padding-inline-start: 0;
  }

  .contact-action:last-child {
    padding-inline-end: 0;
  }
}
</style>
