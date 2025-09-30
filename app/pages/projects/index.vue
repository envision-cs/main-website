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
                <Placeholder class="size-48 m-4 inline-flex" />
              </template>
            </UPopover>
          </div>
        </template>
      </home-hero-banner>

      <app-banner title="Aviation" />
    </div>
  </UPage>
</template>
