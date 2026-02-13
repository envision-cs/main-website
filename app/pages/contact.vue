<script setup lang="ts">
const { data: contactData, error } = await useFetch<ContactResponse>('/api/contact');
</script>

<template>
  <UPage class="mt-0">
    <div class="grid">
      <app-banner-b image="contact.jpg" class="col-start-1 -col-end-1">
        Contact Us
      </app-banner-b>

      <!-- Intro + Form   -->
      <app-section-a>
        <template #header>
          <div class="content">
            <app-typography
              tag="h2"
              variant="heading-md"
              class="font-semibold text-balance uppercase"
            >
              Let’s <span>Build</span> Something That <span>Lasts</span>.
            </app-typography>

            <app-typography
              tag="p"
              variant="text-md"
              class="text-balance max-w-sm"
            >
              We’re ready to connect—whether you’re starting a project,
              asking a question, or just want to talk construction.
            </app-typography>
          </div>
        </template>

        <template #body>
          <contact-form />
        </template>
      </app-section-a>

      <!-- Locations    -->
      <app-section-a no-padding-main no-padding>
        <template #header>
          <app-typography
            tag="h2"
            variant="heading-md"
            class="font-semibold text-balance uppercase p-8 "
          >
            Our <span>Locations</span>
          </app-typography>

          <div class="location-wrapper">
            <app-location-card
              v-for="location in contactData.locations"
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
            <app-location-map class="min-h-[500px]" />
          </Client-only>
        </template>
      </app-section-a>

      <!-- Team header -->
      <app-section-a v-if="contactData.team.length && !error" no-padding>
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
            </div>
          </div>
        </template>

        <template #body>
          <app-team-member-list>
            <app-team-member-card
              v-for="member in contactData.team"
              :key="member.id"
              :path="`/team/${member.slug}`"
              :name="member.name"
              :title="member.title"
              :image="member.photo?.url"
              :linkedin="member.linkedin"
              :email="member.email"
              title-size="heading-md"
            />
          </app-team-member-list>
        </template>
      </app-section-a>
      <section v-else>
        {{ error?.message }}
      </section>
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
</style>
