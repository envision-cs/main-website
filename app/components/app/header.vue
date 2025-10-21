<script setup lang="ts">
import { useAnimate } from 'motion-v';

const route = useRoute();
const [animate] = useAnimate();

// const items = config.navigationMenuItems;

const menu = ref<HTMLDialogElement>();

function openMenu() {
  menu.value?.showModal();
  animate(menu.value, { opacity: [0, 1], scale: [0, 1] }, { duration: 0.4 });
}

function closeMenu() {
  animate(menu.value, { opacity: [1, 0], scale: [1, 0] }, { duration: 0.4 }).then(() => {
    menu.value?.close();
  });
}

watch(route, () => {
  closeMenu();
});
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

      <template #body>
        <UNavigationMenu
          :items="items"
          orientation="vertical"
          class="-mx-2.5"
        />
      </template>
    </UHeader>
  </div>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  justify-content: space-between;
  display: flex;
  padding: 0.5rem;
}

.logo {
  margin-inline: auto;
}

@keyframes growIn {
  from {
    transform: scale(0);
  }

  to {
    transform: scale(1);
  }
}

.menu {
  position: fixed;
  inset-block-start: 1rem;
  inset-inline-start: auto;
  inset-inline-end: 1rem;
  inset-block-end: auto;
  transform-origin: top right;
  transition-behavior: allow-discrete;

  height: calc(100vh - 2rem);
  width: calc(50vw - 2rem);
}

@keyframes open {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes close {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

.main-menu__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.main-menu__items {
  /* primary nav links */
}

.main-menu__close {
  /* close button */
}

.main-menu__body {
  display: flex;
  flex-direction: column;
}

.main-menu__secondary {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
}

.main-menu__secondary-items {
  /* links or subcategories */
}

.main-menu__social {
  /* icons */
}

.main-menu__contact {
  /* contact info or button */
}

.menu[popover] {
  position: fixed;
  top: 0.5rem;
  right: 0.5rem;
  left: auto;
  margin: 0;
  z-index: 1000;
  opacity: 0;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  transform: scale(0);
  transform-origin: top right;
  transition-behavior: allow-discrete;
  transition:
    transform 400ms allow-discrete,
    display 400ms allow-discrete;
  will-change: transform, opacity;
}

.menu:popover-open {
  height: calc(100vh - 2rem);
  width: calc(50vw - 1rem);
  opacity: 1;
  display: flex;
  transform: scale(1);
  transition-behavior: allow-discrete;

  @starting-style {
    transform: scale(0);
  }
}
</style>
