<script setup lang="ts">
const config = useAppConfig();

const items = config.navigationMenuItems;
</script>

<template>
  <div class="fixed top-4 sm:top-8 mx-auto left-1/2 transform -translate-x-1/2 z-10 px-8 w-full max-w-[78rem]">
    <UHeader
      class="rounded-full"
      :ui="{
        root: 'bg-default',
      }"
    >
      <template #title>
        <Icon
          name="logos:envision"
          size="40"
          alt="envision construction logo"
        />
      </template>
      <template #right>
        <UNavigationMenu
          class="hidden lg:block"
          :items="items"
          :ui="{
            link: 'px-4 py-2 text-base text-highlighted tracking-wide hover:bg-accented rounded-full',
            linkLeadingIcon: 'hidden',
            viewport: 'mt-6 bg-default',
            childLinkLabel: 'text-base text-highlighted',
          }"
        />
      </template>
    </UHeader>
  </div>
</template>
