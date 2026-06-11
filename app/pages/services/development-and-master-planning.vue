<script setup lang="ts">definePageMeta({
  layout: 'layout-a',
});

const posthog = usePostHog();
onMounted(() => {
  posthog?.capture('service_page_viewed', { service_name: 'Development & Master Planning' });
});
</script>

<template>
  <services-page-content service="development-and-master-planning" />
</template>
