<script setup lang="ts">
const { data: locations } = await useFetch('/api/locations');
</script>

<template>
  <UPage class="mt-0 ">
    <div class="grid">
      <app-banner-b class="col-start-1 -col-end-1">
        Contact Us
        <template #image>
          <NuxtImg
            src=""
            class="h-full w-full object-cover -z-10"
            fit="cover"
            format="webp"
          />
        </template>
      </app-banner-b>

      <app-section-a>
        <template #header>
          <div class="content">
            <app-typography
              tag="h2"
              variant="heading-lg"
              class="font-semibold text-balance"
            >
              Let’s <span>Build</span> Something That <span>Lasts</span>.
            </app-typography>
            <app-typography>
              We’re ready to connect—whether you’re starting a project, asking a question, or just want to talk
              construction.
            </app-typography>
          </div>
        </template>
        <template #body>
          <contact-form />
        </template>
      </app-section-a>
      <app-section-a no-padding>
        <template #header>
          <app-typography
            tag="h2"
            variant="heading-lg"
            class="font-semibold text-balance"
          >
            Our <span>Locations</span>
          </app-typography>
          <div class="location-wrapper">
            <app-location-card
              v-for="location in locations"
              :key="location.id"
              :title="location.location"
              :address="location.address"
              :phone="location.phone"
              :email="location.email"
            />
          </div>
        </template>
        <template #body>
          <app-location-map class="h-screen min-h-[50vh]" />
        </template>
      </app-section-a>
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
    max-width: 600px;

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

.location-wrapper {
  display: flex;
  flex-wrap: wrap;
}

.location-map {
  grid-column: 1 / -1;
  min-height: 420px;
}
</style>
