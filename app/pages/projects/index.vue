<script setup lang="ts">
await useAsyncData('projects', () => {
  return queryCollection('projects').all();
});
</script>

<template>
  <UPage class="mt-0 ">
    <div class="grid gap-32">
      <home-hero-banner title="Projects">
        <template #actions>
          <div class="mt-6">
            <UPopover arrow>
              <UButton
                label="All"
                color="neutral"
                variant="subtle"
              />

              <template #content>
                Hello
              </template>
            </UPopover>
          </div>
        </template>
      </home-hero-banner>

      <app-banner title="Aviation" />

      <app-grid>
        <projects-card
          title="PD: HCAA Tampa International Airport Airside A, C and F Restroom Renovations"
          image="/TPA_ASC_Restrooms_Hero.jpg"
          :link="{
            title: '#',
            to: '#',
          }"
        />
        <projects-card
          title="PD: HCAA Tampa International Airport Airside A, C and F Restroom Renovations"
          image="/TPA_ASC_Restrooms_Hero.jpg"
          :link="{
            title: '#',
            to: '#',
          }"
        />
        <projects-card
          title="PD: HCAA Tampa International Airport Airside A, C and F Restroom Renovations"
          image="/TPA_ASC_Restrooms_Hero.jpg"
          :link="{
            title: '#',
            to: '#',
          }"
        />
      </app-grid>
    </div>
  </UPage>
</template>
