<script setup lang="ts">
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuRoot,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from 'reka-ui';

const props = withDefaults(defineProps<{
  variant?: 'a' | 'b';
  contactImage?: string;
}>(), {
  variant: 'a',
  contactImage: 'https://ik.imagekit.io/pnixsw7lg/main-website/small_5000_acline_drive_office_01_20b859f5db.jpg?updatedAt=1770956670122',

});

const servicesFeatureImage = 'https://www.figma.com/api/mcp/asset/056d63cb-3124-4599-8f32-c1a275374d00';
const projectsFeatureImage = 'https://ik.imagekit.io/pnixsw7lg/main-website/small_5000_acline_drive_office_01_20b859f5db.jpg?updatedAt=1770956670122';

const serviceDropdownItems = [
  {
    title: 'Tenant Improvements',
    to: '/services/tenant-improvements',
    description: 'Not every project is large-scale, but every project deserves the same precision, coordination, and care.',
  },
  {
    title: 'Design Build',
    to: '/services/design-build',
    description: 'Not every project is large-scale, but every project deserves the same precision, coordination, and care.',
  },
  {
    title: 'Enhanced Preconstruction',
    to: '/services/enhanced-preconstruction',
    description: 'Not every project is large-scale, but every project deserves the same precision, coordination, and care.',
  },
  {
    title: 'Construction Management',
    to: '/services/construction-management',
    description: 'Not every project is large-scale, but every project deserves the same precision, coordination, and care.',
  },
  {
    title: 'Specialty Projects Division',
    to: '/services/specialty-projects-division',
    description: 'Not every project is large-scale, but every project deserves the same precision, coordination, and care.',
  },
] as const;

const projectDropdownItems = [
  {
    title: 'Arts and Entertainment',
    to: '/projects/arts_and_entertainment',
    description: 'Public-facing venues and cultural spaces delivered with experience-driven execution.',
  },
  {
    title: 'Athletics',
    to: '/projects/athletics',
    description: 'Training, competition, and fan environments built around complex event logistics.',
  },
  {
    title: 'Aviation',
    to: '/projects/aviation',
    description: 'Airport and airside work coordinated for safety, phasing, and uninterrupted operations.',
  },
  {
    title: 'Business/Corporate',
    to: '/projects/business_corporate',
    description: 'Corporate interiors and workplace environments shaped around active business needs.',
  },
  {
    title: 'Healthcare',
    to: '/projects/healthcare',
    description: 'Clinical and support environments executed with control, sequencing, and care.',
  },
  {
    title: 'Industrial',
    to: '/projects/industrial',
    description: 'Utility and industrial projects delivered with rigorous site coordination.',
  },
  {
    title: 'Religious',
    to: '/projects/religious',
    description: 'Worship and community spaces completed with respect for mission and schedule.',
  },
  {
    title: 'Beck/Envision',
    to: '/projects/beck-envision',
    description: 'Integrated delivery work completed in partnership with The Beck Group.',
  },
] as const;

const desktopMenuValue = ref('');
const isDesktopMenuOpen = computed(() => desktopMenuValue.value !== '');
const isServicesDesktopMenuOpen = computed(() => desktopMenuValue.value === 'services');
const isProjectsDesktopMenuOpen = computed(() => desktopMenuValue.value === 'projects');
const route = useRoute();

watch(() => route.fullPath, () => {
  desktopMenuValue.value = '';
});

function closeDesktopMenu() {
  desktopMenuValue.value = '';
}

function openDesktopMenu(menu: 'services' | 'projects') {
  desktopMenuValue.value = menu;
}

function toggleDesktopMenu(menu: 'services' | 'projects') {
  desktopMenuValue.value = desktopMenuValue.value === menu ? '' : menu;
}
</script>

<template>
  <div class="main-header" :class="{ 'main-header--desktop-open': isDesktopMenuOpen }">
    <button
      v-if="isDesktopMenuOpen"
      type="button"
      class="desktop-mega-menu-backdrop"
      data-test="desktop-mega-menu-backdrop"
      aria-label="Close navigation menu"
      @click="closeDesktopMenu"
    />

    <header class="header-root">
      <NuxtLink
        class="brand-link"
        to="/"
        aria-label="Envision home"
      >
        <Icon
          :name="props.variant === 'b' ? 'logos:envision' : 'logos:envision'"
          size="30"
          alt="envision construction logo"
        />
      </NuxtLink>

      <NavigationMenuRoot
        v-model="desktopMenuValue"
        class="desktop-nav NavigationMenuRoot"
        :delay-duration="0"
        :skip-delay-duration="0"
        disable-click-trigger
        aria-label="Primary"
      >
        <NavigationMenuList class="desktop-nav-list NavigationMenuList">
          <NavigationMenuItem value="services">
            <NavigationMenuTrigger as-child>
              <button
                type="button"
                class="NavigationMenuTrigger desktop-inline-nav-link"
                data-test="desktop-services-trigger"
                :aria-expanded="String(isServicesDesktopMenuOpen)"
                @pointerenter="openDesktopMenu('services')"
                @click="toggleDesktopMenu('services')"
              >
                Services
              </button>
            </NavigationMenuTrigger>
            <NavigationMenuContent class="NavigationMenuContent" data-test="desktop-mega-menu-panel">
              <div class="mega-menu-shell">
                <div class="mega-menu-grid">
                  <NuxtLink
                    class="services-feature-panel"
                    data-test="services-feature-panel"
                    to="/services"
                  >
                    <img
                      :src="servicesFeatureImage"
                      alt=""
                      class="services-feature-panel__image"
                    >
                    <div class="services-feature-panel__overlay" />
                    <div class="services-feature-panel__content">
                      <h2 class="services-feature-panel__title">
                        Services
                      </h2>
                      <p class="services-feature-panel__copy">
                        Construction Services shaped for compex projects tighter scheduales and sharper coordination
                      </p>
                      <div class="services-feature-panel__rule" />
                      <span class="services-feature-panel__link">view all services</span>
                    </div>
                  </NuxtLink>

                  <div class="services-grid" data-test="services-grid">
                    <NuxtLink
                      v-for="item in serviceDropdownItems"
                      :key="item.title"
                      :to="item.to"
                      class="services-grid-item"
                      data-test="services-grid-item"
                    >
                      <h3 class="services-grid-item__title">
                        {{ item.title }}
                      </h3>
                      <p class="services-grid-item__description">
                        {{ item.description }}
                      </p>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem value="projects">
            <NavigationMenuTrigger as-child>
              <button
                type="button"
                class="NavigationMenuTrigger desktop-inline-nav-link"
                data-test="desktop-projects-trigger"
                :aria-expanded="String(isProjectsDesktopMenuOpen)"
                @pointerenter="openDesktopMenu('projects')"
                @click="toggleDesktopMenu('projects')"
              >
                Projects
              </button>
            </NavigationMenuTrigger>
            <NavigationMenuContent class="NavigationMenuContent" data-test="desktop-projects-menu-panel">
              <div class="mega-menu-shell">
                <div class="mega-menu-grid">
                  <NuxtLink
                    class="services-feature-panel"
                    data-test="projects-feature-panel"
                    to="/projects"
                  >
                    <img
                      :src="projectsFeatureImage"
                      alt=""
                      class="services-feature-panel__image"
                    >
                    <div class="services-feature-panel__overlay" />
                    <div class="services-feature-panel__content">
                      <h2 class="services-feature-panel__title">
                        Projects
                      </h2>
                      <p class="services-feature-panel__copy">
                        Selected work across commercial interiors, healthcare, sports, and complex active sites.
                      </p>
                      <div class="services-feature-panel__rule" />
                      <span class="services-feature-panel__link">view all projects</span>
                    </div>
                  </NuxtLink>

                  <div class="services-grid" data-test="projects-grid">
                    <NuxtLink
                      v-for="item in projectDropdownItems"
                      :key="item.title"
                      :to="item.to"
                      class="services-grid-item"
                      data-test="projects-grid-item"
                    >
                      <h3 class="services-grid-item__title">
                        {{ item.title }}
                      </h3>
                      <p class="services-grid-item__description">
                        {{ item.description }}
                      </p>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink as-child>
              <NuxtLink class="NavigationMenuLink desktop-inline-nav-link" to="/team">
                Meet the Team
              </NuxtLink>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink as-child>
              <NuxtLink class="NavigationMenuLink desktop-inline-nav-link" to="/about">
                About Us
              </NuxtLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
        <div class="ViewportPosition">
          <NavigationMenuViewport class="NavigationMenuViewport" />
        </div>
      </NavigationMenuRoot>
      <link-button
        to="/contact"
        size="sm"
        class="header-cta header-cta--mobile-hidden"
      >
        Contact
      </link-button>

      <app-mobile-nav-drawer />
    </header>
  </div>
</template>

<style>
.main-header {
  --header-height: 4.5rem;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  background-color: #fff;
  backdrop-filter: blur(25px) saturate(1.1) brightness(1.1);

  animation: stickyNav linear forwards;
  animation-timeline: view();
  animation-range-start: 100vh;
  animation-range-end: 120vh;
}

@keyframes stickyNav {
  100% {
    background-color: rgba(255, 255, 255, 0.4);

    border-bottom: 1px solid #fff;
  }
}

.main-header.main-header--desktop-open {
  background-color: #fff;
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
  animation: none;
}

.header-root {
  inset-inline: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-inline: auto;
  padding: 0.75rem 1rem;
  min-height: var(--header-height);
  max-width: 1536px;
  position: relative;
  z-index: 2;
}

.brand-link {
  display: inline-flex;
  align-items: center;
}

.desktop-mega-menu-backdrop {
  display: none;
}

.desktop-nav {
  display: none;
  min-width: 0;
}

.header-cta {
  flex-shrink: 0;
}

.header-cta.header-cta--mobile-hidden {
  display: none !important;
}

@media (min-width: 768px) {
  .header-cta.header-cta--mobile-hidden {
    display: inline-flex !important;
  }

  .desktop-nav {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .NavigationMenuRoot {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    z-index: 1;
  }

  .NavigationMenuList {
    display: flex;
    align-items: center;
    justify-content: center;
    color: inherit;
    gap: calc(var(--spacing) * 4);
    padding: 4px;
    border-radius: 6px;
    list-style: none;
    margin: 0;
    width: 100%;
  }

  /* push last item to far right */
  .NavigationMenuList > :last-child {
    margin-left: auto;
  }

  .NavigationMenuTrigger {
    background: transparent;
    cursor: pointer;
    position: relative;
    z-index: 3;
  }

  .desktop-inline-nav-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    min-height: 2rem;
    padding: 0.35rem 0;
    border: 0;
    border-radius: 0;
    background: transparent;
    color: inherit;
    text-decoration: none;
    white-space: nowrap;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-size: 0.76rem;
    font-weight: 600;
    transition:
      color 180ms ease,
      opacity 180ms ease;
  }

  .desktop-inline-nav-link::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 180ms ease;
  }

  .desktop-inline-nav-link:hover,
  .desktop-inline-nav-link:focus-visible {
    opacity: 0.72;
    outline: none;
  }

  .desktop-inline-nav-link:hover::after,
  .desktop-inline-nav-link:focus-visible::after,
  .desktop-inline-nav-link[aria-expanded='true']::after {
    transform: scaleX(1);
  }

  .desktop-inline-nav-link[aria-expanded='true'] {
    opacity: 1;
    outline: none;
  }

  .desktop-mega-menu-backdrop {
    display: block;
    position: fixed;
    inset: var(--header-height) 0 0;
    border: 0;
    background: rgba(11, 18, 30, 0.18);
    backdrop-filter: blur(2px);
    z-index: 1;
  }

  .NavigationMenuContent {
    width: 100%;
    animation-duration: 250ms;
    animation-timing-function: ease;
  }

  .NavigationMenuContent[data-motion='from-start'] {
    animation-name: enterFromLeft;
  }

  .NavigationMenuContent[data-motion='from-end'] {
    animation-name: enterFromRight;
  }

  .NavigationMenuContent[data-motion='to-start'] {
    animation-name: exitToLeft;
  }

  .NavigationMenuContent[data-motion='to-end'] {
    animation-name: exitToRight;
  }

  .ViewportPosition {
    position: fixed;
    display: flex;
    justify-content: stretch;
    width: 100vw;
    top: var(--header-height);
    left: 0;
    perspective: 2000px;
    z-index: 2;
    pointer-events: none;
  }

  .NavigationMenuIndicator {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    height: 10px;
    top: 100%;
    overflow: hidden;
    z-index: 1;
    transition:
      width,
      transform 250ms ease;
  }

  .NavigationMenuViewport {
    position: relative;
    transform-origin: top center;
    margin-top: 0;
    width: 100vw;
    background-color: white;
    border-radius: 0;
    overflow: auto;
    height: var(--reka-navigation-menu-viewport-height);
    transition:
      width,
      height,
      300ms ease;
    pointer-events: auto;
    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);
  }

  .mega-menu-shell {
    padding: 0;
  }

  .mega-menu-grid {
    display: grid;
    grid-template-columns: auto repeat(auto-fit, minmax(200px, 1fr));
    min-height: 284px;
    margin: 0 auto;
  }

  .services-feature-panel {
    position: relative;
    display: flex;
    align-items: flex-end;
    overflow: hidden;
    padding: 16px;
    color: white;
    text-decoration: none;
    isolation: isolate;
  }

  .services-feature-panel__image,
  .services-feature-panel__overlay {
    position: absolute;
    inset: 0;
  }

  .services-feature-panel__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.53;
    z-index: -2;
  }

  .services-feature-panel__overlay {
    background: #1d93d1;
    mix-blend-mode: multiply;
    z-index: -1;
  }

  .services-feature-panel__content {
    display: grid;
    gap: 10px;
    width: min(264px, 100%);
    align-content: end;
  }

  .services-feature-panel__title {
    margin: 0;
    font-size: 64px;
    font-weight: 400;
    line-height: 0.95;
  }

  .services-feature-panel__copy {
    margin: 0;
    font-size: 16px;
    line-height: 1.2;
    color: rgba(255, 255, 255, 0.8);
  }

  .services-feature-panel__rule {
    width: 100%;
    height: 1px;
    background: rgba(255, 255, 255, 0.8);
  }

  .services-feature-panel__link {
    font-size: 16px;
    font-weight: 600;
    line-height: 1.2;
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: repeat(2, minmax(0, 1fr));
    min-height: 284px;
    color: #18181b;
  }

  .services-grid-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 15px;
    padding: 8px 16px;
    color: inherit;
    text-decoration: none;
  }

  .services-grid-item__title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.1;
  }

  .services-grid-item__description {
    margin: 0;
    font-size: 1rem;
    color: var(--text-color-muted);
    line-height: 1.2;
  }

  .services-grid-item:hover .services-grid-item__title,
  .services-grid-item:focus-visible .services-grid-item__title {
    text-decoration: underline;
    text-underline-offset: 0.18em;
  }

  .services-grid-item:nth-child(1) {
    grid-column: 1;
    grid-row: 1;
  }

  .services-grid-item:nth-child(2) {
    grid-column: 2;
    grid-row: 1;
  }

  .services-grid-item:nth-child(3) {
    grid-column: 3;
    grid-row: 1;
  }

  .services-grid-item:nth-child(4) {
    grid-column: 1;
    grid-row: 2;
  }

  .services-grid-item:nth-child(5) {
    grid-column: 2;
    grid-row: 2;
  }
}

@keyframes enterFromRight {
  from {
    opacity: 0;
    transform: translateX(120px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes enterFromLeft {
  from {
    opacity: 0;
    transform: translateX(-120px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes exitToRight {
  from {
    opacity: 1;
    transform: translateX(0);
  }

  to {
    opacity: 0;
    transform: translateX(120px);
  }
}

@keyframes exitToLeft {
  from {
    opacity: 1;
    transform: translateX(0);
  }

  to {
    opacity: 0;
    transform: translateX(-120px);
  }
}

.submenu-label {
  display: inline-block;
  margin-top: 0.5rem;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (prefers-reduced-motion: reduce) {
  header,
  .menu,
  .sub-menu,
  .menu-toggle,
  .close-btn,
  .mobileClose {
    transition: none !important;
    animation: none !important;
  }
}
</style>
