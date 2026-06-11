<script setup lang="ts">const servicesFeatureImage = '/design-build.jpg';
const projectsFeatureImage
  = 'https://ik.imagekit.io/pnixsw7lg/main-website/small_5000_acline_drive_office_01_20b859f5db.jpg?updatedAt=1770956670122';
const servicesDropdownDescription
  = 'Construction services shaped for complex schedules, demanding coordination, and institution-grade execution.';
const projectsDropdownDescription
  = 'Selected work across commercial interiors, healthcare, sports, and complex active sites.';
type DesktopDropdownValue = 'services' | 'projects';

const { services } = await useServicesList();
const { sectors } = await useSectors();

const desktopDropdowns = computed(() => [
  {
    value: 'services',
    label: 'Services',
    triggerDataTest: 'desktop-services-trigger',
    panelDataTest: 'desktop-mega-menu-panel',
    gridDataTest: 'services-grid',
    itemDataTest: 'services-grid-item',
    featurePanel: {
      dataTest: 'services-feature-panel',
      to: '/services',
      image: servicesFeatureImage,
      eyebrow: 'Capabilities',
      title: 'Services',
      copy: servicesDropdownDescription,
      linkLabel: 'view all services',
    },
    items: services.value.map((item, index) => ({
      id: index,
      slug: item.slug,
      to: item.to,
      label: item.title,
      description: item.description,
    })),
  },
  {
    value: 'projects',
    label: 'Projects',
    triggerDataTest: 'desktop-projects-trigger',
    panelDataTest: 'desktop-projects-menu-panel',
    gridDataTest: 'projects-grid',
    itemDataTest: 'projects-grid-item',
    featurePanel: {
      dataTest: 'projects-feature-panel',
      to: '/projects',
      image: projectsFeatureImage,
      eyebrow: 'Selected Work',
      title: 'Projects',
      copy: projectsDropdownDescription,
      linkLabel: 'view all projects',
      tone: 'projects' as const,
    },
    items: sectors.value.map((item, index) => ({
      id: index,
      slug: item.slug,
      to: item.to,
      label: item.name,
      description: item.description,
    })),
  },
]);

const desktopMenuValue = ref<'' | DesktopDropdownValue>('');
const suppressDesktopMenuOpenUntil = ref(0);
const desktopMenuModel = computed({
  get: () => desktopMenuValue.value,
  set: (value: string) => {
    if (Date.now() < suppressDesktopMenuOpenUntil.value) {
      desktopMenuValue.value = '';
      return;
    }

    desktopMenuValue.value = value === 'services' || value === 'projects' ? value : '';
  },
});
const isDesktopMenuOpen = computed(() => desktopMenuValue.value !== '');
const route = useRoute();
const router = useRouter();
let removeDesktopMenuRouteHook: (() => void) | undefined;

watch(
  () => route.fullPath,
  () => {
    closeDesktopMenu(800);
  },
);

if (import.meta.client) {
  removeDesktopMenuRouteHook = router.afterEach(() => {
    closeDesktopMenu(1000);
  });
}

onBeforeUnmount(() => {
  removeDesktopMenuRouteHook?.();
});

function closeDesktopMenu(suppressMs = 350) {
  suppressDesktopMenuOpenUntil.value = Date.now() + suppressMs;
  desktopMenuValue.value = '';

  if (import.meta.client) {
    window.setTimeout(() => {
      desktopMenuValue.value = '';
    }, 0);
  }
}

function openDesktopMenu(menu: string) {
  if (menu !== 'services' && menu !== 'projects')
    return;
  if (Date.now() < suppressDesktopMenuOpenUntil.value)
    return;

  desktopMenuValue.value = menu;
}

function onHeaderFocusout(event: FocusEvent) {
  const nextTarget = event.relatedTarget;
  const currentTarget = event.currentTarget;

  if (!(currentTarget instanceof HTMLElement))
    return;

  if (nextTarget instanceof Node && currentTarget.contains(nextTarget))
    return;

  closeDesktopMenu(0);
}
</script>

<template>
  <div
    ref="header"
    class="main-header"
    :class="{
      'main-header--desktop-open': isDesktopMenuOpen,
    }"
    @focusout="onHeaderFocusout"
    @keydown.esc="closeDesktopMenu(0)"
  >
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
        <NuxtImg
          src="https://ik.imagekit.io/pnixsw7lg/main-website/thumbnail_White_Envision_Logo_c1724c69d3.png?updatedAt=1780533539340"
          alt="Envision Construction logo"
          width="160px"
          format="avif, webp"
          class="brand-link__logo"
          data-test="envision-logo"
          placeholder
          :preload="{ fetchPriority: 'high' }"
        />
      </NuxtLink>

      <NavigationMenuRoot
        v-model="desktopMenuModel"
        class="desktop-nav NavigationMenuRoot"
        :delay-duration="0"
        :skip-delay-duration="0"
        disable-click-trigger
        aria-label="Primary"
      >
        <NavigationMenuList class="desktop-nav-list NavigationMenuList">
          <NavigationMenuItem>
            <NavigationMenuLink as-child>
              <NuxtLink class="NavigationMenuLink desktop-inline-nav-link" to="/">Home</NuxtLink>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <app-navigation-dropdown-menu
            v-for="dropdown in desktopDropdowns"
            :key="dropdown.value"
            :value="dropdown.value"
            :label="dropdown.label"
            :is-open="desktopMenuValue === dropdown.value"
            :feature-panel="dropdown.featurePanel"
            :items="dropdown.items"
            :trigger-data-test="dropdown.triggerDataTest"
            :panel-data-test="dropdown.panelDataTest"
            :grid-data-test="dropdown.gridDataTest"
            :item-data-test="dropdown.itemDataTest"
            :close-menu="closeDesktopMenu"
            @open="openDesktopMenu"
          />

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
          <NavigationMenuItem>
            <NavigationMenuLink as-child>
              <NuxtLink class="NavigationMenuLink desktop-inline-nav-link" to="/contact">
                Contact
              </NuxtLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
        <div class="ViewportPosition">
          <NavigationMenuViewport class="NavigationMenuViewport" />
        </div>

        <NuxtLink
          class="desktop-nav-action"
          to="/trade-partners"
          aria-label="Trade Partner Program"
        >
          Trade Partners
          <UIcon name="i-lucide-arrow-up-right" aria-hidden="true" />
        </NuxtLink>
      </NavigationMenuRoot>

      <app-mobile-nav-drawer />
    </header>
  </div>
</template>

<style>
.main-header {
  --header-height: 3.5rem;
  --header-shell-bg: color-mix(in oklch, black 20%, var(--color-envision-blue-50) 3%);
  --header-shell-border: color-mix(in oklch, var(--color-envision-blue-900) 18%, white);
  --header-panel-bg: var(--header-shell-bg);

  width: 100%;
  z-index: 1000;
  color: var(--section-color);
  background: var(--color-envision-gray-800);
}

.main-header.main-header--desktop-open {
  background: var(--color-envision-gray-800);
  border-bottom-color: transparent;
  backdrop-filter: blur(16px);
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

@media (min-width: 1100px) {
  .header-cta.header-cta--mobile-hidden {
    display: block !important;
  }

  .desktop-nav {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .NavigationMenuRoot {
    position: relative;
    display: flex;
    justify-content: end;
    width: 100%;
    z-index: 1;
    align-items: center;
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

  .desktop-dropdown-trigger-group {
    display: inline-flex;
    align-items: center;
    position: relative;
  }

  .desktop-dropdown-open-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    inset-inline-start: calc(100% + 0.3rem);
    top: 50%;
    transform: translateY(-50%);
    width: 1.75rem;
    height: 1.75rem;
    border: 1px solid color-mix(in oklch, var(--color-white) 28%, transparent);
    border-radius: 0;
    background: transparent;
    color: var(--color-white);
    cursor: pointer;
    opacity: 0;
    pointer-events: none;
    transition:
      border-color 160ms ease,
      background-color 160ms ease;
  }

  .desktop-dropdown-open-button:focus,
  .desktop-dropdown-open-button:focus-visible {
    opacity: 1;
  }

  .desktop-dropdown-open-button:focus-visible {
    outline: 2px solid var(--color-envision-green-500);
    outline-offset: 0.2rem;
  }

  .desktop-dropdown-open-button:focus[aria-expanded='true'],
  .desktop-dropdown-open-button:focus-visible[aria-expanded='true'] {
    border-color: var(--color-envision-green-500);
    background: color-mix(in oklch, var(--color-envision-green-500) 16%, transparent);
  }

  .desktop-dropdown-open-button svg {
    width: 1rem;
    height: 1rem;
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
    font-size: 0.85rem;
    font-weight: 600;
    transition:
      color 220ms ease,
      transform 220ms ease;
  }

  .desktop-inline-nav-link::after {
    content: '';
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

  .desktop-inline-nav-link:hover {
    outline: none;
  }

  .desktop-inline-nav-link:focus-visible {
    outline: 2px solid var(--color-envision-green-500);
    outline-offset: 0.35rem;
  }

  .desktop-inline-nav-link:hover::after,
  .desktop-inline-nav-link:focus-visible::after,
  .desktop-inline-nav-link[data-menu-open='true']::after,
  .desktop-inline-nav-link[aria-expanded='true']::after {
    transform: scaleX(1);
  }

  .desktop-inline-nav-link[aria-expanded='true']:not(:focus-visible) {
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
    transition: transform 250ms ease;
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
    pointer-events: auto;
    border-top: 0;
    transition: height 200ms cubic-bezier(0.19, 1, 0.22, 1);
  }

  .NavigationMenuViewport[data-state='open'] {
    animation: viewportSlideIn 250ms cubic-bezier(0.19, 1, 0.22, 1);
  }

  .NavigationMenuViewport[data-state='closed'] {
    animation: viewportSlideOut 200ms cubic-bezier(0.19, 1, 0.22, 1);
  }

  .mega-menu-grid {
    display: grid;
    grid-template-columns: minmax(320px, 0.85fr) minmax(0, 1.85fr);
    margin: 0 auto;
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: repeat(2, minmax(0, 1fr));
    color: var(--section-color);
    background: var(--color-envision-gray-800);
  }

  .services-grid-item {
    display: grid;
    align-content: start;
    gap: 0.8rem;
    color: inherit;
    text-decoration: none;
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
    color: #fff;
    line-height: 1.42;
  }

  .services-grid-item:hover {
    transform: none;
    outline: none;
  }

  .services-grid-item:focus-visible {
    transform: none;
    outline: 2px solid var(--accent-color);
    outline-offset: -2px;
  }

  .services-grid-item:hover .services-grid-item__title,
  .services-grid-item:focus-visible .services-grid-item__title {
    color: var(--accent-color);
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

@keyframes viewportSlideIn {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes viewportSlideOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }

  to {
    opacity: 0;
    transform: translateY(-4px);
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

/* Screenshot-aligned overlay header */
.main-header {
  --header-height: 5.5rem;
  --header-pill-bg: color-mix(in oklch, var(--color-envision-gray-900) 74%, transparent);
  --header-pill-border: color-mix(in oklch, var(--color-white) 10%, transparent);

  position: absolute;
  inset: 0 0 auto;
  z-index: 1000;
  background: transparent;
  color: var(--color-white);
  pointer-events: none;
}

.main-header.main-header--desktop-open {
  background: transparent;
  border-bottom-color: transparent;
  backdrop-filter: none;
}

.header-root {
  width: 100vw;
  max-width: none;
  margin-inline: 0;
  box-sizing: border-box;
  min-height: var(--header-height);
  padding: calc(var(--spacing) * 9) calc(var(--spacing) * 3) 0;
  position: relative;
  z-index: 1;
  pointer-events: none;
}

.header-root > * {
  pointer-events: auto;
}

.brand-link {
  display: inline-flex;
  align-items: center;
  padding: 0;
  color: var(--color-white);
}

.brand-link__mark {
  display: block;
  width: clamp(5.75rem, 22vw, 8rem);
  height: clamp(1.05rem, 4vw, 1.45rem);
}

.brand-link:focus-visible {
  outline: 2px solid var(--color-envision-green-500);
  outline-offset: 3px;
}

.desktop-nav-action {
  display: none;
}

@media (max-width: 1099px) {
  .header-root {
    justify-content: space-between;
  }
}

@media (min-width: 1100px) {
  .header-root {
    align-items: flex-start;
    padding: calc(var(--spacing) * 9) clamp(2rem, 3vw, 3rem) 0;
  }

  .brand-link {
    display: inline-flex;
    margin-top: 0.1rem;
  }

  .desktop-nav {
    display: flex;
    justify-content: flex-end;
    width: auto;
    margin-left: auto;
  }

  .NavigationMenuRoot {
    width: auto;
    gap: calc(var(--spacing) * 1.5);
  }

  .NavigationMenuList {
    width: auto;
    min-height: 2.85rem;
    gap: 0;
    margin: 0;
    padding: 0.22rem;
    border: 1px solid var(--header-pill-border);
    border-radius: 14px;
    background: var(--header-pill-bg);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    box-shadow: 0 18px 44px rgb(0 0 0 / 16%);
  }

  .NavigationMenuList > :last-child {
    margin-left: 0;
  }

  .desktop-dropdown-trigger-group {
    display: inline-flex;
    align-items: center;
  }

  .desktop-dropdown-open-button {
    display: none;
  }

  .desktop-inline-nav-link {
    min-height: 2.35rem;
    padding: 0 calc(var(--spacing) * 5);
    border-radius: 11px;
    color: var(--color-white);
    font-size: 0.9rem;
    font-weight: 600;
    line-height: 1;
    letter-spacing: 0;
    text-transform: none;
    transition:
      background-color 180ms ease,
      color 180ms ease;
  }

  .desktop-inline-nav-link::after {
    display: none;
  }

  .desktop-inline-nav-link:hover,
  .desktop-inline-nav-link:focus-visible,
  .desktop-inline-nav-link[data-menu-open='true'],
  .desktop-inline-nav-link[aria-expanded='true'] {
    background: color-mix(in oklch, var(--color-white) 9%, transparent);
    color: var(--color-white);
  }

  .desktop-inline-nav-link:focus-visible,
  .desktop-nav-action:focus-visible,
  .brand-link:focus-visible {
    outline: 2px solid var(--color-envision-green-500);
    outline-offset: 3px;
  }

  .desktop-nav-action {
    display: inline-flex;
    min-height: 2.85rem;
    align-items: center;
    justify-content: center;
    gap: calc(var(--spacing) * 1.5);
    padding: 0 calc(var(--spacing) * 5);
    border: 1px solid var(--header-pill-border);
    border-radius: 14px;
    background: var(--header-pill-bg);
    color: var(--color-white);
    font-size: 0.9rem;
    font-weight: 600;
    line-height: 1;
    text-decoration: none;
    white-space: nowrap;
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    transition:
      background-color 180ms ease,
      color 180ms ease;
  }

  .desktop-nav-action:hover {
    background: color-mix(in oklch, var(--color-white) 12%, var(--header-pill-bg));
  }

  .desktop-nav-action svg {
    width: 0.9rem;
    height: 0.9rem;
  }

  .desktop-mega-menu-backdrop {
    inset: 0;
    background: transparent;
    pointer-events: auto;
  }

  .ViewportPosition {
    position: fixed;
    top: calc(var(--spacing) * 22);
    right: clamp(2rem, 3vw, 3rem);
    left: auto;
    justify-content: flex-end;
    width: min(52rem, calc(100vw - 4rem));
    pointer-events: none;
  }

  .NavigationMenuViewport {
    width: 100%;
    margin-top: 0;
    border: 0;
    border-radius: 18px;
    background: transparent;
    overflow: visible;
    pointer-events: auto;
  }

  .NavigationMenuContent {
    width: 100%;
  }
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
  .mobileClose,
  .NavigationMenuContent,
  .NavigationMenuIndicator,
  .NavigationMenuViewport {
    transition: none !important;
    animation: none !important;
  }
}
</style>
