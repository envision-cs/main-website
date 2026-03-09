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

const desktopMenuValue = ref('');
const route = useRoute();

watch(() => route.fullPath, () => {
  desktopMenuValue.value = '';
});
</script>

<template>
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
            <button type="button" class="NavigationMenuTrigger">
              Services
            </button>
          </NavigationMenuTrigger>
          <NavigationMenuContent class="NavigationMenuContent" data-test="desktop-services-content">
            <NuxtLink class="NavigationMenuLink big-link" to="/services">
              All Services
            </NuxtLink>
            <ul class="List two">
              <li>
                <app-navigation-panel-link
                  to="/services/specialty-projects-division"
                  title="Specialty Projects Division"
                  description="Not every project is large-scale, but every project deserves the same precision, coordination, and care."
                />
              </li>
              <li>
                <app-navigation-panel-link
                  to="/services/construction-management"
                  title="Construction Management"
                  description="Not every project is large-scale, but every project deserves the same precision, coordination, and care."
                />
              </li>
              <li>
                <app-navigation-panel-link
                  to="/services/enhanced-preconstruction"
                  title="Enhanced Preconstruction"
                  description="Not every project is large-scale, but every project deserves the same precision, coordination, and care."
                />
              </li>
              <li>
                <app-navigation-panel-link
                  to="/services/design-build"
                  title="Design Build"
                  description="Not every project is large-scale, but every project deserves the same precision, coordination, and care."
                />
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink as-child>
            <NuxtLink class="NavigationMenuLink" to="/projects">
              Projects
            </NuxtLink>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink as-child>
            <NuxtLink class="NavigationMenuLink" to="/team">
              Meet the Team
            </NuxtLink>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink as-child>
            <NuxtLink class="NavigationMenuLink" to="/about">
              About Us
            </NuxtLink>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink as-child>
            <NuxtLink class="NavigationMenuLink" to="/contact">
              Contact
            </NuxtLink>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
      <div class="ViewportPosition">
        <NavigationMenuViewport class="NavigationMenuViewport" />
      </div>
    </NavigationMenuRoot>

    <app-mobile-nav-drawer />
  </header>
</template>

<style>
.header-root {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  z-index: 10;
  padding: 0.75rem 1rem;
}

.brand-link {
  display: inline-flex;
  align-items: center;
}

.desktop-nav {
  display: none;
}

@media (min-width: 768px) {
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
  }

  .NavigationMenuList {
    display: flex;
    justify-content: center;
    color: white;
    gap: calc(var(--spacing) * 4);
    padding: 4px;
    border-radius: 6px;
    list-style: none;
    margin: 0;
  }

  .NavigationMenuTrigger {
    background: transparent;
    cursor: pointer;
  }

  .big-link {
    cursor: pointer;
    position: relative;
    isolation: isolate;
    overflow: hidden;
    min-height: 16rem;
    display: flex;
    align-items: flex-end;
    color: white;
    padding: 1rem;
  }

  .big-link::before,
  .big-link::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .big-link::before {
    background-image: url('/focus-flooring-office-01.jpg');
    background-size: cover;
    background-position: center;
    filter: grayscale(100%);
    z-index: -2;
  }

  .big-link::after {
    background-color: var(--color-envision-blue-500);
    mix-blend-mode: multiply;
    z-index: -1;
  }

  .NavigationMenuTrigger:hover {
    border-bottom: 1px solid var(--color-primary-500);
  }

  .NavigationMenuContent {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 2fr;

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
    position: absolute;
    display: flex;
    justify-content: center;
    width: 100%;
    top: 100%;
    left: 0;
    perspective: 2000px;
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
    margin-top: 10px;
    width: 100dvi;
    background-color: white;
    border-radius: 6px;
    overflow: hidden;
    height: var(--reka-navigation-menu-viewport-height);
    transition:
      width,
      height,
      300ms ease;
  }

  .List {
    display: grid;
    padding: 22px;
    margin: 0;
    column-gap: 10px;
    list-style: none;
  }

  .List.two {
    grid-template-rows: repeat(3, 1fr);
  }

  .Arrow {
    position: relative;
    top: 70%;
    background-color: white;
    width: 10px;
    height: 10px;
    transform: rotate(45deg);
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
</style>
