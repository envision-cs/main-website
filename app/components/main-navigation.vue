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

const servicesPanel = {
  eyebrow: 'What we do',
  title: 'One accountable team, start to finish.',
  copy: 'Preconstruction through closeout — delivered on time and on budget.',
  to: '/services',
  cta: 'All services',
};

const sectorsPanel = {
  eyebrow: 'Where we work',
  title: 'Proof across every sector.',
  copy: 'Browse completed work by the kind of space you’re building.',
  to: '/projects',
  cta: 'All projects',
};
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
      <div class="nav-panel">
        <aside class="nav-panel__rail">
          <p class="nav-panel__eyebrow">{{ servicesPanel.eyebrow }}</p>
          <p class="nav-panel__title">{{ servicesPanel.title }}</p>
          <p class="nav-panel__copy">{{ servicesPanel.copy }}</p>
          <NuxtLink :to="servicesPanel.to" class="nav-panel__cta">
            {{ servicesPanel.cta }}
            <UIcon name="i-lucide-arrow-right" aria-hidden="true" />
          </NuxtLink>
        </aside>
        <ul class="nav-panel__list">
          <li v-for="item in services" :key="item.id">
            <NuxtLink :to="item.to" class="nav-row">
              <span class="nav-row__body">
                <span class="nav-row__title">{{ item.title }}</span>
                <app-typography v-if="item.nav_content" variant="text-sm" class="nav-row__desc">
                  {{ item.nav_content }}
                </app-typography>
              </span>
              <UIcon name="i-lucide-arrow-up-right" class="nav-row__arrow" aria-hidden="true" />
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <div
      id="projects"
      ref="sectorsRef"
      popover
      @mouseenter="sectorsPopover.cancelClose"
      @mouseleave="sectorsPopover.close"
      @focusout="sectorsPopover.handleFocusOut"
    >
      <div class="nav-panel">
        <aside class="nav-panel__rail">
          <p class="nav-panel__eyebrow">{{ sectorsPanel.eyebrow }}</p>
          <p class="nav-panel__title">{{ sectorsPanel.title }}</p>
          <p class="nav-panel__copy">{{ sectorsPanel.copy }}</p>
          <NuxtLink :to="sectorsPanel.to" class="nav-panel__cta">
            {{ sectorsPanel.cta }}
            <UIcon name="i-lucide-arrow-right" aria-hidden="true" />
          </NuxtLink>
        </aside>
        <ul class="nav-panel__list">
          <li v-for="item in sectors" :key="item.name">
            <NuxtLink :to="item.to" class="nav-row">
              <span class="nav-row__body">
                <span class="nav-row__title">{{ item.name }}</span>
                <app-typography v-if="item.description" variant="text-sm" class="nav-row__desc">
                  {{ item.description }}
                </app-typography>
              </span>
              <UIcon name="i-lucide-arrow-up-right" class="nav-row__arrow" aria-hidden="true" />
            </NuxtLink>
          </li>
        </ul>
      </div>
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
  padding: 0;
  overflow: clip;
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

/* Split panel: contextual rail + hairline row list */
.nav-panel {
  display: grid;
  grid-template-columns: minmax(200px, 0.85fr) 1.5fr;
}

.nav-panel__rail {
  display: flex;
  flex-direction: column;
  padding: calc(var(--spacing) * 6);
  border-right: 1px solid color-mix(in oklch, var(--color-white) 12%, transparent);
}

.nav-panel__eyebrow {
  margin: 0;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-envision-blue-400);
}

.nav-panel__title {
  margin: calc(var(--spacing) * 4) 0 0;
  font-size: 1.55rem;
  font-weight: 300;
  line-height: 1.12;
  color: var(--color-white);
  text-wrap: balance;
}

.nav-panel__copy {
  margin: calc(var(--spacing) * 3) 0 0;
  font-size: 0.82rem;
  line-height: 1.4;
  color: color-mix(in oklch, var(--color-white) 56%, transparent);
}

.nav-panel__cta {
  margin-top: auto;
  padding-top: calc(var(--spacing) * 6);
  display: inline-flex;
  align-items: center;
  gap: calc(var(--spacing) * 2);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--color-white);
  transition: color 160ms ease;

  &:hover,
  &:focus-visible {
    color: var(--color-envision-blue-300);
  }
}

.nav-panel__list {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  list-style: none;
  max-height: 60vh;
  overflow-y: auto;
}

.nav-panel__list li {
  display: block;
  position: static;
}

.nav-panel__list li:not(:first-child) .nav-row {
  border-top: 1px solid color-mix(in oklch, var(--color-white) 10%, transparent);
}

.nav-row {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: calc(var(--spacing) * 4);
  width: 100%;
  padding: calc(var(--spacing) * 4) calc(var(--spacing) * 5);
  border-radius: 0;
  text-transform: none;
  letter-spacing: normal;
  font-size: 1rem;
  font-weight: 400;
  color: var(--color-white);
  transition: background-color 160ms ease;

  &:hover,
  &:focus-visible {
    background: color-mix(in oklch, var(--color-white) 6%, transparent);
    color: var(--color-white);
  }
}

/* Signature: blue marker grows on the hovered row's leading edge */
.nav-row::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 2px;
  height: 0;
  background: var(--color-envision-blue-400);
  transform: translateY(-50%);
  transition: height 220ms cubic-bezier(0.22, 1, 0.36, 1);
}

.nav-row:hover::before,
.nav-row:focus-visible::before {
  height: 100%;
}

.nav-row__body {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 1);
  min-width: 0;
}

.nav-row__title {
  font-size: 0.98rem;
  font-weight: 700;
  line-height: 1.15;
  color: inherit;
}

.nav-row__desc {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: color-mix(in oklch, var(--color-white) 52%, transparent);
  font-size: 0.78rem;
  font-weight: 500;
  line-height: 1.3;
}

.nav-row__arrow {
  flex-shrink: 0;
  font-size: 1rem;
  color: color-mix(in oklch, var(--color-white) 35%, transparent);
  opacity: 0;
  transform: translate(-0.25rem, 0.25rem);
  transition:
    opacity 180ms ease,
    transform 220ms cubic-bezier(0.22, 1, 0.36, 1),
    color 180ms ease;
}

.nav-row:hover .nav-row__arrow,
.nav-row:focus-visible .nav-row__arrow {
  opacity: 1;
  transform: translate(0, 0);
  color: var(--color-envision-blue-300);
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

  .nav-row::before,
  .nav-row__arrow {
    transition: none;
  }
}
</style>
