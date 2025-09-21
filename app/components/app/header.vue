<script setup lang="ts">
const config = useAppConfig();

const items = config.navigationMenuItems;
</script>

<template>
  <div>
    <UHeader>
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
