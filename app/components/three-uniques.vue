<script setup lang="ts">
// const { data: threeUniques } = await useAsyncData('three-uniques', () => $fetch('/api/threeUniques'), {
//  server: true,
//  lazy: true,
//  default: () => [],
// });

const process = [
  {
    id: 1,
    title: 'Built on Faith, Driven by Purpose',
    description: 'Our foundation is God, our work is built on integrity, and our mission is to serve with excellence.',
  },
  {
    id: 2,
    title: 'Impact Beyond Construction',
    description: 'We don’t just build—we leave a mark. Every project is an opportunity to create something lasting, from the spaces we shape to the relationships we forge. With heart, craftsmanship, and purpose, we build legacies that elevate communities for generations to come.',
  },
  {
    id: 3,
    title: 'Versatile. Adaptive. Enhanced Approach',
    description: 'No two projects are the same, and neither is our approach. Whether it’s a small renovation or a large-scale build, we move with precision, flexibility, and care—delivering the personal attention of a local partner with the expertise of a national leader.',
  },
];
</script>

<template>
  <section>
    <div class="content">
      <div class="px-4 md:px-8">
        <app-typography
          tag="h2"
          variant="heading-lg"
          class="font-semibold"
        >
          Our <span>Three</span> Uniques
        </app-typography>

        <app-typography tag="h2">
          At Envision, every decision we make is guided by a clear philosophy—three core principles that define how we
          work, why we work, and the impact we strive to create. These “Three Uniques” are more than values; they are
          the
          driving force behind our approach, shaping every project, partnership, and interaction.
        </app-typography>
      </div>

      <div class="mt-auto">
        <details
          v-for="item in process"
          :key="item.id"
          open
          name="process"
        >
          <summary>
            <app-typography tag="h3" variant="heading-md">
              {{ item.title }}
            </app-typography>
          </summary>
          <app-typography tag="p">
            {{ item.description }}
          </app-typography>
        </details>
      </div>
    </div>
    <div class="">
      <NuxtImg
        provider="imagekit"
        src="https://ik.imagekit.io/pnixsw7lg/main-website/HomePageAllens.webp"
        class="h-full w-full object-cover"
        fit="exact"
      />
    </div>
  </section>
  <!-- <div>
    <app-typography tag="h2" variant="heading-md" />
    <app-typography
      variant="text-md"
      tag="p"
      class="max-w-[60ch]"
    />

    <app-cta-a
      text="Building Without the Headaches"
      body="At Envision, every decision we make is guided by a clear philosophy—three core principles that define how we
      work, why we work, and the impact we strive to create. These “Three Uniques” are more than values; they are the
      driving force behind our approach, shaping every project, partnership, and interaction."
      image="https://ik.imagekit.io/pnixsw7lg/main-website/HomePageAllens.webp"
      flip
      content-position="bottom-left"
    >
      Our <span>Three</span> Uniques
    </app-cta-a>
    <app-accordion :data="threeUniques" name="threeUniques" />
  </div> -->
</template>

<!-- <style scoped>
.cta {
  display: grid;
  border-block: 1px solid var(--ui-border);

  @media (min-width: 800px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

.cta-content {
  padding: calc(var(--spacing) * 4);

  @media (min-width: 800px) {
    padding: calc(var(--spacing) * 8);
  }
}
</style> -->

<style scoped>
section {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 1fr 2fr;
    grid-template-rows: auto;
  }
}

.content {
  display: grid;
  justify-content: stretch;
  gap: calc(var(--spacing) * 8);
  padding-block: calc(var(--spacing) * 4);

  @media (min-width: 768px) {
    justify-content: space-between;
    padding-block: calc(var(--spacing) * 8);
  }
}

li {
  &:not(:first-child) {
    margin-top: calc(var(--spacing) * 8);
  }
}

details {
  flex: 0 0 auto;
  overflow: hidden;
  will-change: true;
  transition:
    background-color 0.4s ease-in-out,
    color 0.4s ease-in-out;

  &:last-of-type {
    border-bottom: none;
  }

  h3 {
    width: 100%;
    font-weight: 600;
    padding-inline: calc(var(--spacing) * 4);

    &:hover {
      color: var(--color-envision-green-500);
    }

    @media (min-width: 768px) {
      padding-inline: calc(var(--spacing) * 8);
    }
  }

  p {
    max-width: 600px;
    margin: 0 auto;
    padding-inline: calc(var(--spacing) * 4);

    &:not(:last-child) {
      padding-bottom: calc(var(--spacing) * 4);
    }
  }
}

details[open] {
  flex: 0 0 auto;
  overflow: hidden;

  h3 {
    color: var(--color-envision-blue-500);
  }
}

details summary {
  list-style: none;
  display: flex;
  padding-block: calc(var(--spacing) * 4);
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-envision-gray-300);
  transition: all 0.3s var(--ease-base);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 8px;
    background-color: var(--color-envision-green-500);
    opacity: 0;
    transition: opacity 0.3s var(--ease-base);
  }

  &:hover::after {
    opacity: 1;
  }

  &:focus-visible::after {
    opacity: 1;
  }
}

details[open] summary {
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 8px;
    background-color: var(--color-envision-blue-500);
    opacity: 1;
    transition: opacity 0.3s var(--ease-base);
  }
}

details::details-content {
  overflow: hidden;
  height: 0;
}

details::details-content {
  transition:
    height 0.4s ease,
    content-visibility 0.3s;
  transition-behavior: allow-discrete;
}

details[open]::details-content {
  height: auto;
  padding-block: calc(var(--spacing) * 4);
}
</style>
