<script setup lang="ts">
const config = useAppConfig();

const items = config.navigationMenuItems;
</script>

<template>
  <UFooter>
    <template #left>
      <p class="text-muted text-sm">
        Copyright © {{ new Date().getFullYear() }}
      </p>
    </template>

    <UFooterColumns :columns="items" />
  </UFooter>
</template>
