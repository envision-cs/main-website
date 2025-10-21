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
  <header>
    <NuxtLink class="logo" to="/">
      <Icon
        name="logos:envision-white"
        size="32"
        alt="envision construction logo"
      />
    </NuxtLink>
    <UButton
      variant="outline"
      color="neutral"
      class="menu-btn"
      @click="openMenu"
    >
      <Icon
        name="i-lucide-menu"
        size="24"
        class="fill-current"
      />
    </UButton>
  </header>
  <AnimatePresence>
    <dialog
      id="main-menu"
      ref="menu"
      class="menu"
      closedby="any"
    >
      <div class="main-menu__header">
        <div class="main-menu__items">
          <nav>
            <ul>
              <li>
                <NuxtLink to="/projects">
                  Projects
                </NuxtLink>
              </li>

              <li>
                <NuxtLink to="/about">
                  About
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
        <div class="main-menu__close">
          <UButton
            variant="outline"
            color="neutral"
            class="menu-btn"
            @click="closeMenu"
          >
            close
            <Icon
              name="i-lucide-x"
              size="24"
              class="fill-current"
            />
          </UButton>
        </div>
      </div>

      <div class="main-menu__body">
        <div class="main-menu__secondary">
          <div class="main-menu__secondary-items">
            secondary Items
          </div>
          <div class="main-menu__social">
            Social Icons
          </div>
        </div>
        <NuxtLink to="/contact" class="main-menu__contact">
          Contact
        </NuxtLink>
      </div>
    </dialog>
  </AnimatePresence>
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
