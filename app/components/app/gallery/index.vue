<script setup>
const galleryItems = ref([
  {
    id: 1,
    label: 'Apple Trade In',
    headline: 'Save on a new iPhone with a trade‑in.',
    body: 'Get up to $180–$670 in credit toward iPhone 17 Pro when you trade in iPhone 13 or higher.',
    theme: 'light',
    backgroundAlt: true,
    modalId: 'trade-in-modal',
    ctaLabel: 'Learn more about trade in',
    icon: 'plus',
    href: null,
    imageSources: [
      {
        srcset: '/images/trade_in_small.jpg, /images/trade_in_small_2x.jpg 2x',
        media: '(max-width:734px)',
      },
      {
        srcset: '/images/trade_in_medium.jpg, /images/trade_in_medium_2x.jpg 2x',
        media: '(max-width:1068px)',
      },
      {
        srcset: '/images/trade_in_large.jpg, /images/trade_in_large_2x.jpg 2x',
        media: '(min-width:0px)',
      },
    ],
    imageFallback: '/images/trade_in_large.jpg',
    imageAlt: 'Hands exchanging trade-in iPhone',
  },
  {
    id: 1,
    label: 'Apple Trade In',
    headline: 'Save on a new iPhone with a trade‑in.',
    body: 'Get up to $180–$670 in credit toward iPhone 17 Pro when you trade in iPhone 13 or higher.',
    theme: 'light',
    backgroundAlt: true,
    modalId: 'trade-in-modal',
    ctaLabel: 'Learn more about trade in',
    icon: 'plus',
    href: null,
    imageSources: [
      {
        srcset: '/images/trade_in_small.jpg, /images/trade_in_small_2x.jpg 2x',
        media: '(max-width:734px)',
      },
      {
        srcset: '/images/trade_in_medium.jpg, /images/trade_in_medium_2x.jpg 2x',
        media: '(max-width:1068px)',
      },
      {
        srcset: '/images/trade_in_large.jpg, /images/trade_in_large_2x.jpg 2x',
        media: '(min-width:0px)',
      },
    ],
    imageFallback: '/images/trade_in_large.jpg',
    imageAlt: 'Hands exchanging trade-in iPhone',
  },
  {
    id: 1,
    label: 'Apple Trade In',
    headline: 'Save on a new iPhone with a trade‑in.',
    body: 'Get up to $180–$670 in credit toward iPhone 17 Pro when you trade in iPhone 13 or higher.',
    theme: 'light',
    backgroundAlt: true,
    modalId: 'trade-in-modal',
    ctaLabel: 'Learn more about trade in',
    icon: 'plus',
    href: null,
    imageSources: [
      {
        srcset: '/images/trade_in_small.jpg, /images/trade_in_small_2x.jpg 2x',
        media: '(max-width:734px)',
      },
      {
        srcset: '/images/trade_in_medium.jpg, /images/trade_in_medium_2x.jpg 2x',
        media: '(max-width:1068px)',
      },
      {
        srcset: '/images/trade_in_large.jpg, /images/trade_in_large_2x.jpg 2x',
        media: '(min-width:0px)',
      },
    ],
    imageFallback: '/images/trade_in_large.jpg',
    imageAlt: 'Hands exchanging trade-in iPhone',
  },
  {
    id: 1,
    label: 'Apple Trade In',
    headline: 'Save on a new iPhone with a trade‑in.',
    body: 'Get up to $180–$670 in credit toward iPhone 17 Pro when you trade in iPhone 13 or higher.',
    theme: 'light',
    backgroundAlt: true,
    modalId: 'trade-in-modal',
    ctaLabel: 'Learn more about trade in',
    icon: 'plus',
    href: null,
    imageSources: [
      {
        srcset: '/images/trade_in_small.jpg, /images/trade_in_small_2x.jpg 2x',
        media: '(max-width:734px)',
      },
      {
        srcset: '/images/trade_in_medium.jpg, /images/trade_in_medium_2x.jpg 2x',
        media: '(max-width:1068px)',
      },
      {
        srcset: '/images/trade_in_large.jpg, /images/trade_in_large_2x.jpg 2x',
        media: '(min-width:0px)',
      },
    ],
    imageFallback: '/images/trade_in_large.jpg',
    imageAlt: 'Hands exchanging trade-in iPhone',
  },
  // Add more items as needed
]);
</script>

<template>
  <app-gallery-scroll>
    <app-gallery-item
      v-for="(item, index) in galleryItems"
      :key="item.id"
      :index="index"
    >
      <app-display-card
        title="Greater Tampa Realtors"
        link="/projects/business_corporate/greater-tampa-realtors"
        image="/greater-tampa-realtors-01.jpg"
        sector="Business/Corporate"
        completed="2024"
      />
    </app-gallery-item>
  </app-gallery-scroll>
</template>
