<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variant?: "a" | "b";
    contactImage?: string;
  }>(),
  {
    variant: "a",
    contactImage:
      "https://ik.imagekit.io/pnixsw7lg/main-website/small_5000_acline_drive_office_01_20b859f5db.jpg?updatedAt=1770956670122",
  },
);

const servicesFeatureImage = "/design-build.jpg";
const projectsFeatureImage =
  "https://ik.imagekit.io/pnixsw7lg/main-website/small_5000_acline_drive_office_01_20b859f5db.jpg?updatedAt=1770956670122";

const serviceDropdownItems = [
  {
    title: "Tenant Improvements",
    to: "/services/tenant-improvements",
    description:
      "Not every project is large-scale, but every project deserves the same precision, coordination, and care.",
  },
  {
    title: "Design Build",
    to: "/services/design-build",
    description:
      "Not every project is large-scale, but every project deserves the same precision, coordination, and care.",
  },
  {
    title: "Enhanced Preconstruction",
    to: "/services/enhanced-preconstruction",
    description:
      "Not every project is large-scale, but every project deserves the same precision, coordination, and care.",
  },
  {
    title: "Construction Management",
    to: "/services/construction-management",
    description:
      "Not every project is large-scale, but every project deserves the same precision, coordination, and care.",
  },
  {
    title: "Specialty Projects Division",
    to: "/services/specialty-projects-division",
    description:
      "Not every project is large-scale, but every project deserves the same precision, coordination, and care.",
  },
] as const;

const projectDropdownItems = [
  {
    title: "Arts and Entertainment",
    to: "/projects/arts_and_entertainment",
    description:
      "Public-facing venues and cultural spaces delivered with experience-driven execution.",
  },
  {
    title: "Athletics",
    to: "/projects/athletics",
    description:
      "Training, competition, and fan environments built around complex event logistics.",
  },
  {
    title: "Aviation",
    to: "/projects/aviation",
    description:
      "Airport and airside work coordinated for safety, phasing, and uninterrupted operations.",
  },
  {
    title: "Business/Corporate",
    to: "/projects/business_corporate",
    description:
      "Corporate interiors and workplace environments shaped around active business needs.",
  },
  {
    title: "Religious",
    to: "/projects/religious",
    description: "Worship and community spaces completed with respect for mission and schedule.",
  },
  {
    title: "Beck/Envision",
    to: "/projects/beck-envision",
    description: "Integrated delivery work completed in partnership with The Beck Group.",
  },
] as const;

const desktopMenuValue = ref("");
const isDesktopMenuOpen = computed(() => desktopMenuValue.value !== "");
const isServicesDesktopMenuOpen = computed(() => desktopMenuValue.value === "services");
const isProjectsDesktopMenuOpen = computed(() => desktopMenuValue.value === "projects");
const route = useRoute();

watch(
  () => route.fullPath,
  () => {
    desktopMenuValue.value = "";
  },
);

function closeDesktopMenu() {
  desktopMenuValue.value = "";
}

function openDesktopMenu(menu: "services" | "projects") {
  desktopMenuValue.value = menu;
}

function toggleDesktopMenu(menu: "services" | "projects") {
  desktopMenuValue.value = desktopMenuValue.value === menu ? "" : menu;
}
</script>

<template>
  <div class="main-header">
    <button
      v-if="isDesktopMenuOpen"
      type="button"
      class="desktop-mega-menu-backdrop"
      data-test="desktop-mega-menu-backdrop"
      aria-label="Close navigation menu"
      @click="closeDesktopMenu"
    />

    <header class="header-root site-max">
      <NuxtLink class="brand-link" to="/" aria-label="Envision home">
        <Icon name="logos:envision-white" size="30" alt="envision construction logo" />
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
            <NavigationMenuContent
              class="NavigationMenuContent"
              data-test="desktop-mega-menu-panel"
            >
              <div class="mega-menu-shell">
                <div class="mega-menu-grid">
                  <NuxtLink
                    class="services-feature-panel services-feature-panel--services"
                    data-test="services-feature-panel"
                    to="/services"
                  >
                    <img :src="servicesFeatureImage" alt="" class="services-feature-panel__image" />
                    <div class="services-feature-panel__overlay" />
                    <div class="services-feature-panel__grid" />
                    <div class="services-feature-panel__content">
                      <span class="services-feature-panel__eyebrow">Capabilities</span>
                      <h2 class="services-feature-panel__title">Services</h2>
                      <p class="services-feature-panel__copy">
                        Construction services shaped for complex schedules, demanding coordination,
                        and institution-grade execution.
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
                      <span class="services-grid-item__index">
                        {{ String(serviceDropdownItems.indexOf(item) + 1).padStart(2, "0") }}
                      </span>
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
            <NavigationMenuContent
              class="NavigationMenuContent"
              data-test="desktop-projects-menu-panel"
            >
              <div class="mega-menu-shell">
                <div class="mega-menu-grid">
                  <NuxtLink
                    class="services-feature-panel services-feature-panel--projects"
                    data-test="projects-feature-panel"
                    to="/projects"
                  >
                    <img :src="projectsFeatureImage" alt="" class="services-feature-panel__image" />
                    <div class="services-feature-panel__overlay" />
                    <div class="services-feature-panel__grid" />
                    <div class="services-feature-panel__content">
                      <span class="services-feature-panel__eyebrow">Selected Work</span>
                      <h2 class="services-feature-panel__title">Projects</h2>
                      <p class="services-feature-panel__copy">
                        Selected work across commercial interiors, healthcare, sports, and complex
                        active sites.
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
                      <span class="services-grid-item__index">
                        {{ String(projectDropdownItems.indexOf(item) + 1).padStart(2, "0") }}
                      </span>
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
      <Button to="/contact" size="sm" variant="primary" class="header-cta--mobile-hidden">
        Contact
      </Button>

      <app-mobile-nav-drawer />
    </header>
  </div>
</template>

<style>
.main-header {
  --header-height: 3.5rem;
  --header-shell-bg: color-mix(in oklch, black 20%, var(--color-envision-blue-50) 3%);
  --header-shell-border: color-mix(in oklch, var(--color-envision-blue-900) 18%, white);
  --header-shell-text: color-mix(
    in oklch,
    var(--color-envision-blue-950) 88%,
    var(--color-envision-green-900) 12%
  );
  --header-shell-muted: color-mix(in oklch, var(--color-envision-blue-900) 58%, white);
  --header-panel-bg: color-mix(in oklch, white 98%, var(--color-envision-blue-50) 2%);
  --header-panel-border: color-mix(in oklch, var(--color-envision-blue-900) 10%, white);

  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  color: var(--header-shell-text);
  background: var(--header-shell-bg);
  backdrop-filter: blur(25px);

  animation: stickyNav linear forwards;
  animation-timeline: view();
  animation-range-start: 100vh;
  animation-range-end: 120vh;
}

@keyframes stickyNav {
  100% {
    border-bottom: 1px solid color-mix(in oklch, var(--color-envision-blue-900) 16%, white);
  }
}

.main-header.main-header--desktop-open {
  background: white;
  border-bottom-color: var(--header-shell-border);
  animation: none;
}

.header-root {
  inset-inline: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-inline: auto;
  gap: 1rem;
  padding: 0.875rem clamp(2rem, 4vw, 4.5rem);
  min-height: var(--header-height);
  position: relative;
  z-index: 2;
}

.brand-link {
  display: inline-flex;
  align-items: center;
  position: relative;
  z-index: 1;
  flex: 0 0 auto;
  padding-right: clamp(0.6rem, 1vw, 1rem);
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
    gap: clamp(1.1rem, 1.8vw, 2rem);
    padding: 0 1.25rem 0 1.6rem;
    min-height: 3rem;
    border-radius: 0;
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
    min-height: 3rem;
    padding: 0.4rem 0;
    border: 0;
    border-radius: 0;
    background: transparent;
    color: #fff;
    text-decoration: none;
    white-space: nowrap;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    font-size: 0.7rem;
    font-weight: 600;
    transition:
      color 220ms ease,
      transform 220ms ease;
  }

  .desktop-inline-nav-link::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 1px;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 220ms ease;
  }

  .desktop-inline-nav-link:hover,
  .desktop-inline-nav-link:focus-visible {
    outline: none;
  }

  .desktop-inline-nav-link:hover::after,
  .desktop-inline-nav-link:focus-visible::after,
  .desktop-inline-nav-link[aria-expanded="true"]::after {
    transform: scaleX(1);
  }

  .desktop-inline-nav-link[aria-expanded="true"] {
    outline: none;
  }

  .header-cta.header-cta--mobile-hidden {
    position: relative;
    padding-inline: 0 !important;
    border-radius: 0;
  }

  .header-cta.header-cta--mobile-hidden .btn-main {
    border: 1px solid var(--color-envision-blue-900);
    border-radius: 0;
    background: var(--color-envision-blue-900);
  }

  .header-cta.header-cta--mobile-hidden .btn-main--sm {
    padding: 0.58rem 1.05rem;
    font-size: 0.78rem;
    letter-spacing: 0.14em;
  }

  .header-cta.header-cta--mobile-hidden .btn-text {
    color: white;
  }

  .header-cta.header-cta--mobile-hidden:hover .btn-main,
  .header-cta.header-cta--mobile-hidden:focus-visible .btn-main {
    background: white;
    border-color: var(--color-envision-blue-900);
  }

  .header-cta.header-cta--mobile-hidden:hover .btn-text,
  .header-cta.header-cta--mobile-hidden:focus-visible .btn-text {
    color: var(--color-envision-blue-900);
    transform: none;
  }

  .header-cta.header-cta--mobile-hidden .btn-overlay {
    display: none;
  }

  .desktop-mega-menu-backdrop {
    display: block;
    position: fixed;
    inset: var(--header-height) 0 0;
    border: 0;
    background: rgb(15 31 52 / 0.1);
    z-index: 1;
  }

  .NavigationMenuContent {
    width: 100%;
    animation-duration: 250ms;
    animation-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
  }

  .NavigationMenuContent[data-motion="from-start"] {
    animation-name: enterFromLeft;
  }

  .NavigationMenuContent[data-motion="from-end"] {
    animation-name: enterFromRight;
  }

  .NavigationMenuContent[data-motion="to-start"] {
    animation-name: exitToLeft;
  }

  .NavigationMenuContent[data-motion="to-end"] {
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
    margin-top: 1.25rem;
    width: 100vw;
    background: var(--header-panel-bg);
    border-radius: 0;
    overflow: auto;
    height: var(--reka-navigation-menu-viewport-height);
    transition:
      width,
      height,
      340ms cubic-bezier(0.19, 1, 0.22, 1);
    pointer-events: auto;
    border-top: 0;
  }

  .mega-menu-grid {
    display: grid;
    grid-template-columns: minmax(320px, 0.85fr) minmax(0, 1.85fr);
    min-height: 350px;
    margin: 0 auto;
  }

  .services-feature-panel {
    position: relative;
    display: flex;
    align-items: flex-end;
    overflow: hidden;
    min-height: 350px;
    padding: clamp(1.5rem, 2vw, 2rem);
    color: white;
    text-decoration: none;
    isolation: isolate;
    background: var(--color-envision-blue-700);
  }

  .services-feature-panel--projects {
    background: var(--color-envision-green-600);
  }

  .services-feature-panel__image,
  .services-feature-panel__overlay,
  .services-feature-panel__grid {
    position: absolute;
    inset: 0;
  }

  .services-feature-panel__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.72;
    filter: grayscale(1) contrast(0.55);
    z-index: -2;
  }

  .services-feature-panel__overlay {
    background: var(--color-envision-blue-700);
    mix-blend-mode: multiply;
    z-index: -1;
  }

  .services-feature-panel--projects .services-feature-panel__overlay {
    background: var(--color-envision-green-600);
  }

  .services-feature-panel__grid {
    background:
      linear-gradient(rgb(255 255 255 / 0.12) 1px, transparent 1px),
      linear-gradient(90deg, rgb(255 255 255 / 0.12) 1px, transparent 1px);
    background-size: 3rem 3rem;
    mask-image: linear-gradient(180deg, rgb(0 0 0 / 0.2), transparent 85%);
    z-index: -1;
  }

  .services-feature-panel__content {
    display: grid;
    gap: 0.9rem;
    width: min(19rem, 100%);
    align-content: end;
  }

  .services-feature-panel__eyebrow {
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgb(255 255 255 / 0.74);
  }

  .services-feature-panel__title {
    margin: 0;
    font-size: clamp(3rem, 5vw, 4.2rem);
    font-weight: 600;
    line-height: 0.9;
    letter-spacing: -0.045em;
    text-transform: uppercase;
  }

  .services-feature-panel__copy {
    margin: 0;
    max-width: 16rem;
    font-size: 0.98rem;
    line-height: 1.45;
    color: rgb(255 255 255 / 0.82);
  }

  .services-feature-panel__rule {
    width: min(10rem, 100%);
    height: 1px;
    background: rgb(255 255 255 / 0.62);
  }

  .services-feature-panel__link {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.88rem;
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .services-feature-panel__link::after {
    content: "";
    width: 2rem;
    height: 1px;
    background: currentColor;
    transition: transform 240ms ease;
  }

  .services-feature-panel:hover .services-feature-panel__link::after,
  .services-feature-panel:focus-visible .services-feature-panel__link::after {
    transform: translateX(0.35rem);
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: repeat(2, minmax(0, 1fr));
    min-height: 350px;
    color: var(--header-shell-text);
    background: white;
  }

  .services-grid-item {
    display: grid;
    align-content: start;
    gap: 0.8rem;
    padding: 1.65rem 1.5rem;
    color: inherit;
    text-decoration: none;
    border-left: 1px solid color-mix(in oklch, var(--color-envision-blue-900) 7%, white);
    border-top: 1px solid color-mix(in oklch, var(--color-envision-blue-900) 7%, white);
    transition:
      background-color 220ms ease,
      transform 220ms ease;
  }

  .services-grid-item:nth-child(-n + 3) {
    border-top: 0;
  }

  .services-grid-item__index {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: color-mix(in oklch, var(--ui-primary) 62%, white);
  }

  .services-grid-item__title {
    margin: 0;
    font-size: clamp(1.36rem, 1.65vw, 1.85rem);
    font-weight: 600;
    line-height: 1.02;
    letter-spacing: -0.035em;
  }

  .services-grid-item__description {
    margin: 0;
    max-width: 22ch;
    font-size: 0.98rem;
    color: color-mix(in oklch, var(--header-shell-text) 72%, white);
    line-height: 1.42;
  }

  .services-grid-item:hover,
  .services-grid-item:focus-visible {
    background-color: color-mix(in oklch, var(--color-envision-blue-50) 32%, white);
    transform: none;
    outline: none;
  }

  .services-grid-item:hover .services-grid-item__title,
  .services-grid-item:focus-visible .services-grid-item__title {
    color: var(--ui-primary);
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

@media (max-width: 767px) {
  .header-root::before,
  .header-root::after {
    display: none;
  }
}

@keyframes enterFromTop {
  from {
    opacity: 0;
    transform: translateY(-100%);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes enterFromRight {
  from {
    opacity: 0;
    transform: translateX(48px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes enterFromLeft {
  from {
    opacity: 0;
    transform: translateX(-48px);
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
    transform: translateX(36px);
  }
}

@keyframes exitToLeft {
  from {
    opacity: 1;
    transform: translateX(0);
  }

  to {
    opacity: 0;
    transform: translateX(-36px);
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
  .main-header {
    animation: none !important;
  }

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
