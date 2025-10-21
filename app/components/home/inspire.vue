<script setup lang="ts">
// const items = [
//   {
//     image: '/onbudjet.png',
//     link:
//     {
//       label: 'See More',
//       to: '#',
//       color: 'neutral',
//     },
//   },
//   {
//     image: '/community.png',
//     link:
//     {
//       label: 'See More',
//       to: '#',
//       color: 'neutral',
//     },
//   },
//   {
//     image: '/happyClients.png',
//     link:
//     {
//       label: 'See More',
//       to: '#',
//       color: 'neutral',
//     },
//   },
// ];
</script>

<template>
  <app-banner
    title="Delivering Projects that Inspire and Engage"
    description="Our proven process brings structure and consistency to every project. We listen, plan, and execute to reduce risk, maintain alignment, and deliver on time, on budget, and with complete transparency. "
  />

  <app-banner-images
    :images="[
      {
        img: '/happyClients.png',
        alt: 'Airport image',

      },
      {
        img: '/onbudjet.png',
        alt: 'Airport image',

      },
    ]"
  />
</template>
