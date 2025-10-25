<script setup lang="ts">
import { useBreakpoints } from '@vueuse/core';
import { animate, motionValue } from 'motion';

// const config = useAppConfig();
// const items = config.navigationMenuItems;

const { base } = useEasings();

const route = useRoute();

const breakpoints = useBreakpoints({
  laptop: 1024,
});

const menu = ref<HTMLDialogElement | null>(null);

const islaptop = breakpoints.greater('laptop');
const y = motionValue('-100%');
const scale = motionValue(0);
const opacity = motionValue(0);
function openMenu() {
  const el = menu.value;
  if (!el)
    return;

  el.showModal();
  opacity.set(0);
  animate(opacity, 1, {
    duration: 0.15,
    onUpdate: latest => (el.style.opacity = `${latest}`),
    ease: base,
  });

  if (islaptop.value) {
    // Reset the motion value before animating
    scale.set(0);
    animate(scale, 1, {
      duration: 0.4,
      onUpdate: latest => (el.style.transform = `scale(${latest})`),
      ease: base,
    });
  }
  else {
    y.set('-100%');
    animate(y, '0%', {
      duration: 0.4,
      onUpdate: latest => (el.style.transform = `translateY(${latest})`),
      ease: base,
    });
  }
}

function closeMenu() {
  const el = menu.value;
  if (!el)
    return;

  if (islaptop.value) {
    animate(scale, 0, {
      duration: 0.4,
      onUpdate: latest => (el.style.transform = `scale(${latest})`),
      ease: base,
    }).finished.then(() => el.close());
  }
  else {
    animate(y, '-100%', {
      duration: 0.4,
      onUpdate: latest => (el.style.transform = `translateY(${latest})`),
      ease: base,
    }).finished.then(() => el.close());
  }
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
  <dialog
    id="main-menu"
    ref="menu"
    role="dialog"
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
  display: flex;
  flex-direction: column;
  position: fixed;
  inset-block-start: 0.5rem;
  inset-inline-start: 0.5rem;
  inset-inline-end: 0.5rem;
  inset-block-end: 0.5rem;
  transform-origin: top right;
  transition-behavior: allow-discrete;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;

  height: max(70svh, 500px);
  width: calc(100svw - 2rem);

  @media (min-width: 1024px) {
    inset-block-start: 0.5rem;
    inset-inline-start: auto;
    inset-inline-end: 0.5rem;
    padding: 1.5rem 2rem;
    height: calc(100vh - 2rem);
    width: calc(50vw - 2rem);
  }
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
  margin-top: auto;
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
</style>
