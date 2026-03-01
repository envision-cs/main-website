<script setup lang="ts">
const props = withDefaults(defineProps<{
  variant?: 'a' | 'b';
  contactImage?: string;
}>(), {
  variant: 'a',
  contactImage: 'https://ik.imagekit.io/pnixsw7lg/main-website/small_5000_acline_drive_office_01_20b859f5db.jpg?updatedAt=1770956670122',
});

const isWhite = computed(() => props.variant === 'b');

const drawerOpen = ref(false);
const servicesExpanded = ref(false);

const menuButtonRef = ref<HTMLButtonElement | null>(null);
const drawerRef = ref<HTMLDialogElement | null>(null);
const firstDrawerLinkRef = ref<HTMLElement | null>(null);

async function openDrawer() {
  if (!drawerRef.value || drawerOpen.value)
    return;

  drawerRef.value.showModal();
  drawerOpen.value = true;
  await nextTick();
  firstDrawerLinkRef.value?.focus();
}

function closeDrawer() {
  if (!drawerRef.value)
    return;

  drawerRef.value.close();
}

function onDrawerClose() {
  drawerOpen.value = false;
  servicesExpanded.value = false;
  menuButtonRef.value?.focus();
}

function onDrawerClick(event: MouseEvent) {
  if (event.target === drawerRef.value)
    closeDrawer();
}

function closeDrawerAndNavigate() {
  closeDrawer();
}
</script>

<template>
  <header class="site-max" :class="{ 'header--white': isWhite }">
    <NuxtLink
      class="logo"
      to="/"
      aria-label="Envision home"
    >
      <Icon
        :name="isWhite ? 'logos:envision' : 'logos:envision'"
        size="30"
        alt="envision construction logo"
      />
    </NuxtLink>

    <button
      ref="menuButtonRef"
      class="mobile-menu-trigger"
      type="button"
      data-test="mobile-menu-trigger"
      aria-label="Open main menu"
      aria-haspopup="dialog"
      :aria-expanded="String(drawerOpen)"
      @click="openDrawer"
    >
      Menu
    </button>

    <nav class="main-nav" aria-label="Primary">
      <ul>
        <li>
          <nav-dropdown button-text="Services">
            <div id="nav-panel">
              <ul>
                <li>
                  <NuxtLink autofocus to="/services/">
                    All Services
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/services/specialty-projects-division">
                    Specialty Projects Division
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/services/construction-management">
                    Construction Managment
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/services/enhanced-preconstruction">
                    Enhanced Preconstruction
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/services/design-build">
                    Design Build
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </nav-dropdown>
        </li>

        <li>
          <NuxtLink to="/projects">
            Projects
          </NuxtLink>
        </li>

        <li>
          <NuxtLink to="/team">
            Meet the Team
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/about">
            About Us
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/contact">
            Contact
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <dialog
      ref="drawerRef"
      class="mobile-drawer"
      data-test="mobile-drawer"
      aria-label="Main menu"
      @close="onDrawerClose"
      @click="onDrawerClick"
    >
      <div class="mobile-drawer__panel">
        <div class="mobile-drawer__header">
          <p class="mobile-drawer__title">
            Menu
          </p>
          <button
            class="mobile-menu-close"
            type="button"
            data-test="mobile-menu-close"
            aria-label="Close main menu"
            @click="closeDrawer"
          >
            Close
          </button>
        </div>

        <nav aria-label="Mobile primary">
          <ul class="mobile-menu-list">
            <li>
              <button
                class="mobile-services-toggle"
                type="button"
                data-test="mobile-services-toggle"
                aria-controls="mobile-services-panel"
                :aria-expanded="String(servicesExpanded)"
                @click="servicesExpanded = !servicesExpanded"
              >
                Services
              </button>
              <div
                id="mobile-services-panel"
                :hidden="!servicesExpanded"
              >
                <ul class="mobile-submenu-list">
                  <li>
                    <NuxtLink
                      ref="firstDrawerLinkRef"
                      class="mobile-menu-link"
                      to="/services/"
                      @click="closeDrawerAndNavigate"
                    >
                      All Services
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      class="mobile-menu-link"
                      to="/services/specialty-projects-division"
                      @click="closeDrawerAndNavigate"
                    >
                      Specialty Projects Division
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      class="mobile-menu-link"
                      to="/services/construction-management"
                      @click="closeDrawerAndNavigate"
                    >
                      Construction Management
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      class="mobile-menu-link"
                      to="/services/enhanced-preconstruction"
                      @click="closeDrawerAndNavigate"
                    >
                      Enhanced Preconstruction
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      class="mobile-menu-link"
                      to="/services/design-build"
                      @click="closeDrawerAndNavigate"
                    >
                      Design Build
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <NuxtLink
                class="mobile-menu-link"
                to="/projects"
                @click="closeDrawerAndNavigate"
              >
                Projects
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                class="mobile-menu-link"
                to="/team"
                @click="closeDrawerAndNavigate"
              >
                Meet the Team
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                class="mobile-menu-link"
                to="/about"
                @click="closeDrawerAndNavigate"
              >
                About Us
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                class="mobile-menu-link"
                to="/contact"
                @click="closeDrawerAndNavigate"
              >
                Contact
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </dialog>
  </header>
</template>

<style scoped>
header {
  --header-height: 4rem;

  position: absolute;
  height: var(--header-height);
  top: 0;
  width: 100%;
  z-index: 100;
  margin-inline: auto;
  justify-content: space-between;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding-inline: calc(var(--spacing) * 8);
  padding-block: calc(var(--spacing) * 4);
  background-color: transparent;
  transition: background-color 0.2s ease;
  color: #fff;
}

header.header--white {
  background-color: var(--color-white);
  border-bottom: 1px solid var(--ui-border);
}

.logo {
  margin-left: calc(var(--spacing) * 4);
}

.main-nav ul {
  display: flex;
  text-transform: uppercase;
  gap: calc(var(--spacing) * 4);
}

#services-button {
  anchor-name: --services;
}

#nav-panel ul {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.mobile-menu-trigger,
.mobile-menu-close,
.mobile-services-toggle,
.mobile-menu-link {
  min-height: 44px;
}

.mobile-menu-trigger,
.mobile-menu-close,
.mobile-services-toggle {
  border: 1px solid var(--ui-border);
  background: var(--color-white);
  color: var(--color-black);
  padding: calc(var(--spacing) * 2) calc(var(--spacing) * 3);
  text-transform: uppercase;
}

.mobile-menu-link {
  display: flex;
  align-items: center;
  padding-block: calc(var(--spacing) * 2);
  text-transform: uppercase;
}

.mobile-menu-trigger:focus-visible,
.mobile-menu-close:focus-visible,
.mobile-services-toggle:focus-visible,
.mobile-menu-link:focus-visible,
.main-nav a:focus-visible,
.main-nav button:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.mobile-drawer {
  margin: 0 0 0 auto;
  height: 100dvh;
  width: min(28rem, 92vw);
  border: none;
  padding: 0;
  color: var(--color-black);
  background: transparent;
}

.mobile-drawer::backdrop {
  background: rgb(0 0 0 / 45%);
}

.mobile-drawer__panel {
  height: 100%;
  background: var(--color-white);
  padding: calc(var(--spacing) * 4);
  overflow-y: auto;
}

.mobile-drawer__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: calc(var(--spacing) * 4);
}

.mobile-drawer__title {
  margin: 0;
  font-weight: 700;
  text-transform: uppercase;
}

.mobile-menu-list,
.mobile-submenu-list {
  display: grid;
  gap: calc(var(--spacing) * 2);
  list-style: none;
  padding: 0;
  margin: 0;
}

.mobile-submenu-list {
  margin-top: calc(var(--spacing) * 2);
  padding-left: calc(var(--spacing) * 3);
}

@media (min-width: 768px) {
  .mobile-menu-trigger,
  .mobile-drawer {
    display: none;
  }

  .main-nav {
    display: block;
  }
}

@media (max-width: 767px) {
  header {
    padding-inline: calc(var(--spacing) * 4);
  }

  .main-nav {
    display: none;
  }

  .mobile-menu-trigger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
    animation: none !important;
  }
}
</style>
