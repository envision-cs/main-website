<script setup lang="ts">
const { data: locations } = await useFetch('/api/locations');
</script>

<template>
  <UPage class="mt-0 ">
    <div class="grid">
      <app-hero-banner title="Contact Us" />
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
      <app-section-a>
        <template #header>
          <app-typography
            tag="h2"
            variant="heading-lg"
            class="font-semibold text-balance"
          >
            Our <span>Locations</span>
          </app-typography>
          <div class="locations">
            <div
              v-for="location in locations"
              :key="location.id"
              class=""
            >
              <div class="">
                <app-typography
                  tag="h3"
                  variant="heading-sm"
                  class="text-semibold"
                >
                  {{ location.location }}
                </app-typography>
                <app-typography
                  tag="p"
                  variant="text-xl"
                  class="mt-4 text-muted"
                >
                  {{ location.address }}
                </app-typography>
                <ul class="contact-list">
                  <li>
                    <div class="contact-list_card">
                      <app-typography
                        tag="p"
                        variant="text-lg"
                        class="font-semibold"
                      >
                        Phone
                      </app-typography>
                      <app-typography
                        tag="p"
                        variant="text-xl"
                        class="text-muted"
                      >
                        {{ location.phone }}
                      </app-typography>
                    </div>
                  </li>
                  <li>
                    <div class="contact-list_card">
                      <app-typography
                        tag="p"
                        variant="text-lg"
                        class="font-semibold"
                      >
                        Email
                      </app-typography>
                      <app-typography
                        tag="p"
                        variant="text-lg"
                        class="text-muted"
                      >
                        {{ location.email }}
                      </app-typography>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </template>
        <template #body>
          <app-location-map class="h-[100vh] min-h-[50vh]" />
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

.contact-list {
  display: flex;
  flex-wrap: wrap;
  gap: calc(var(--spacing) * 4);
  margin-top: calc(var(--spacing) * 4);
}

.contact-list_card {
  padding: calc(var(--spacing) * 1);
}

.locations {
  grid-column: 1 / -1;
}

.location-map {
  grid-column: 1 / -1;
  min-height: 420px;
}
</style>
