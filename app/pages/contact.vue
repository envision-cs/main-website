<script setup lang="ts">
const steps = [
  { k: 'Tampa Office', address: '5000 Acline Drive East Tampa, FL 33619', phone: '813) 997-0330' },
  { k: 'St Petersburg Office', address: '5136 4th St N Ste 201, St. Petersburg, FL 33701', phone: '813) 997-0330' },
  { k: 'Pasco Office', address: '5000 Acline Drive East Tampa, FL 33619', phone: '813) 997-0330' },
];
</script>

<template>
  <UPage class="mt-0 ">
    <div class="grid gap-32">
      <app-hero-banner title="Contact Us" />

      <app-banner title="Let’s Build Something That Lasts.">
        <contact-form />
      </app-banner>
      <div>
        <app-banner
          title="Our Locations"
          :images="[
            {
              img: '/airport.png',
              alt: 'Airport image',

            }]"
        />
        <div class="mt-10 site-max">
          <div
            v-for="(s) in steps"
            :key="s.k"
            class="group site-grid relative col-span-full   gap-4 py-10 border-t border-accented w-full"
          >
            <div
              class="flex flex-col col-start-1 col-span-full min-[650px]:-col-end-1  lg:col-end-14 start-5 lg:col-end-13"
            >
              <h3 class="text-2xl ">
                {{ s.k }}
              </h3>
              <p class="text-muted leading-relaxed max-w-[60ch]">
                {{ s.address }}<br>
                {{ s.phone }}
              </p>
            </div>
            <NuxtImg
              src="/community.png"
              name="i-heroicons-arrow-right-20-solid"
              class="col-span-full w-full aspect-video lg:col-start-15"
            />
          </div>
        </div>
      </div>
    </div>
  </UPage>
</template>
