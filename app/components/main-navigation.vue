<script setup lang="ts">
const { sectors } = await useSectors();
const { services } = await useServicesList();

function createPopoverHandlers(popoverRef: Ref<HTMLElement | null>) {
  let closeTimer: ReturnType<typeof setTimeout> | null = null;

  const cancelClose = () => {
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
  };

  const open = () => {
    cancelClose();
    popoverRef.value?.showPopover();
  };

  const close = () => {
    cancelClose();
    popoverRef.value?.hidePopover();
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer = setTimeout(() => popoverRef.value?.hidePopover(), 120);
  };

  const handleFocusOut = (event: FocusEvent) => {
    const next = event.relatedTarget as Node | null;
    if (!next || !popoverRef.value?.contains(next)) {
      popoverRef.value?.hidePopover();
    }
  };

  return { cancelClose, open, close, scheduleClose, handleFocusOut };
}

const sectorsRef = ref<HTMLElement | null>(null);
const servicesRef = ref<HTMLElement | null>(null);

const sectorsPopover = createPopoverHandlers(sectorsRef);
const servicesPopover = createPopoverHandlers(servicesRef);
</script>
<template>
  <header>
    <NuxtLink to="/" aria-label="Envision home">
      <NuxtImg
        provider="imagekit"
        src="https://ik.imagekit.io/pnixsw7lg/main-website/thumbnail_White_Envision_Logo_c1724c69d3.png?updatedAt=1780533539340"
        alt="Envision Construction logo"
        width="160"
        height="32"
        format="avif"
        data-test="envision-logo"
      />
    </NuxtLink>
    <nav aria-label="Envision Construction Services">
      <ul role="menubar" aria-label="Envision Construction Services">
        <li role="none">
          <NuxtLink role="menuitem" to="/">Home</NuxtLink>
        </li>
        <li
          role="none"
          @mouseenter="servicesPopover.open"
          @mouseleave="servicesPopover.scheduleClose"
        >
          <NuxtLink role="menuitem" aria-haspopup="true" to="/services">Services</NuxtLink>
          <button class="services-menu" popovertarget="services" aria-label="Toggle services menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="9" viewBox="0 0 12 9">
              <polygon points="1 0, 11 0, 6 8" />
            </svg>
          </button>
        </li>

        <li
          role="none"
          @mouseenter="sectorsPopover.open"
          @mouseleave="sectorsPopover.scheduleClose"
        >
          <NuxtLink role="menuitem" aria-haspopup="true" to="/projects">Projects</NuxtLink>
          <button class="project-menu" popovertarget="projects" aria-label="Toggle projects menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="9" viewBox="0 0 12 9">
              <polygon points="1 0, 11 0, 6 8" />
            </svg>
          </button>
        </li>

        <li role="none">
          <NuxtLink role="menuitem" to="/team">Meet the Team</NuxtLink>
        </li>
        <li role="none">
          <NuxtLink role="menuitem" to="/about">About Us</NuxtLink>
        </li>
        <li role="none">
          <NuxtLink role="menuitem" to="/contact">Contact</NuxtLink>
        </li>
      </ul>
      <m-button size="sm" to="/trade-partners">
        Trade Partners
        <UIcon name="i-lucide-arrow-up-right" aria-hidden="true" />
      </m-button>
    </nav>

    <app-mobile-nav-drawer />
    <div
      id="services"
      ref="servicesRef"
      popover
      @mouseenter="servicesPopover.cancelClose"
      @mouseleave="servicesPopover.close"
      @focusout="servicesPopover.handleFocusOut"
    >
      <ul>
        <li v-for="item in services" :key="item.id">
          <NuxtLink :to="item.to" class="submenu-item">
            <span class="submenu-item__title">{{ item.title }}</span>
            <app-typography
              v-if="item.nav_content"
              variant="text-sm"
              class="submenu-item__description"
            >
              {{ item.nav_content }}
            </app-typography>
          </NuxtLink>
        </li>
      </ul>
    </div>

    <div
      id="projects"
      ref="sectorsRef"
      popover
      @mouseenter="sectorsPopover.cancelClose"
      @mouseleave="sectorsPopover.close"
      @focusout="sectorsPopover.handleFocusOut"
    >
      <ul>
        <li v-for="item in sectors" :key="item.name">
          <NuxtLink :to="item.to" class="submenu-item">
            <span class="submenu-item__title">{{ item.name }}</span>
            <app-typography
              v-if="item.description"
              variant="text-sm"
              class="submenu-item__description"
            >
              {{ item.description }}
            </app-typography>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  z-index: 1000;
  position: absolute;
  inset: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: calc(var(--spacing) * 9) clamp(2rem, 3vw, 3rem) 0;
  pointer-events: auto;
}

nav {
  display: none;
  align-items: center;
  gap: 1rem;

  @media (min-width: 1100px) {
    display: flex;
  }

  ul {
    min-height: 2.5rem;
    display: flex;
    align-items: center;
    gap: calc(var(--spacing) * 2);
    list-style: none;
    margin: 0;
    padding-inline: calc(var(--spacing) * 2);
    border: 1px solid color-mix(in oklch, var(--color-white) 12%, transparent);
    background: color-mix(in oklch, var(--color-envision-gray-900) 75%, transparent);
    backdrop-filter: blur(10px);
    border-radius: calc(var(--spacing) * 2);
  }
}

li {
  display: flex;
  position: relative;

  a {
    display: inline-flex;
    align-items: center;
    padding: calc(var(--spacing) * 2) calc(var(--spacing) * 3);
    color: var(--color-white);
    font-size: 0.8rem;
    font-weight: 600;
    line-height: 1;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
    border-radius: calc(var(--spacing) * 1);

    &:hover,
    &:focus-visible {
      color: color-mix(in oklch, var(--color-white) 82%, var(--color-envision-blue-200));
      background: color-mix(in oklch, var(--color-white) 12%, transparent);
    }
  }

  button {
    position: absolute;
    right: 0;
    display: flex;
    align-items: center;
    height: 100%;
    opacity: 0;

    &:focus-visible {
      display: flex;
      opacity: 1;
    }
  }
}

.project-menu {
  anchor-name: --project-menu;
}

.services-menu {
  anchor-name: --services-menu;
}

#projects,
#services {
  border: 1px solid color-mix(in oklch, var(--color-white) 12%, transparent);
  background: color-mix(in oklch, var(--color-envision-gray-900) 75%, transparent);
  backdrop-filter: blur(10px);
  border-radius: calc(var(--spacing) * 2);
  opacity: 0;
  transform: translateY(-0.75rem) scale(0.98);
  transform-origin: top center;
  transition:
    opacity 160ms ease,
    transform 220ms cubic-bezier(0.22, 1, 0.36, 1),
    display 220ms allow-discrete,
    overlay 220ms allow-discrete;
  will-change: opacity, transform;

  position: absolute;
  top: calc(var(--spacing) * 4);
  position-area: end center;
  width: 800px;
  padding: calc(var(--spacing) * 3);

  ul {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: calc(var(--spacing) * 3);
  }
}

#projects:popover-open,
#services:popover-open {
  opacity: 1;
  transform: translateY(0) scale(1);
}

@starting-style {
  #projects:popover-open,
  #services:popover-open {
    opacity: 0;
    transform: translateY(-0.75rem) scale(0.98);
  }
}

#projects {
  position-anchor: --project-menu;
}

#services {
  position-anchor: --services-menu;
}

.submenu-item {
  display: flex;
  flex-direction: column;
  text-align: left;
  text-transform: none;
  align-items: start;
  padding: calc(var(--spacing) * 3);
  border-radius: calc(var(--spacing) * 2);
}

.submenu-item__title {
  max-width: 100%;
  overflow: visible;
  color: inherit;
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.15;
  text-wrap: pretty;
  margin-bottom: calc(var(--spacing) * 1);
}

.submenu-item__description {
  color: color-mix(in oklch, var(--color-white) 56%, transparent);
  font-size: 0.78rem;
  font-weight: 500;
  line-height: 1.25;
  text-wrap: pretty;
}

@media (prefers-reduced-motion: reduce) {
  #projects,
  #services {
    transform: none;
    transition: none;
  }

  #projects:popover-open,
  #services:popover-open {
    transform: none;
  }
}
</style>
