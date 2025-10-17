<script setup lang="ts">
const items = [
  {
    image: '/onbudjet.png',
    link:
    {
      label: 'See More',
      to: '#',
      color: 'neutral',
    },
  },
  {
    image: '/community.png',
    link:
    {
      label: 'See More',
      to: '#',
      color: 'neutral',
    },
  },
  {
    image: '/happyClients.png',
    link:
    {
      label: 'See More',
      to: '#',
      color: 'neutral',
    },
  },
];
</script>

<template>
  <app-banner
    title="Delivering Projects that Inspire and Engage"
    description="Our proven process brings structure and consistency to every project. We listen, plan, and execute to reduce risk, maintain alignment, and deliver on time, on budget, and with complete transparency. "
  />

  <UCarousel
    v-slot="{ item }"
    class="border-t border-accented pt-6 mt-6"
    :items="items"
    :ui="{ item: 'basis-[70%] md:basis-[60%] lg:basis-1/3' }"
  >
    <app-link-card
      :image="item.image"
      :icon="item.icon"
      :eyebrow="item.eyebrow"
      :title="item.title"
      :description="item.description"
      :link="item.link"
    />
  </UCarousel>
</template>
