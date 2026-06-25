<script setup lang="ts">
const mobileDrawerOpen = ref(false);
const mobileServicesOpen = ref(false);
const mobileProjectsOpen = ref(false);
const menuButtonRef = ref<HTMLButtonElement | null>(null);
const firstDrawerLinkRef = ref<HTMLElement | null>(null);
const isDrawerClosing = ref(false);

const { services } = await useServicesList();
const { sectors } = await useSectors();

const servicesPanel = {
  eyebrow: "What we do",
  title: "One accountable team, start to finish.",
  copy: "Preconstruction through closeout — delivered on time and on budget.",
  to: "/services",
  cta: "All services",
};

const projectsPanel = {
  eyebrow: "Where we work",
  title: "Proof across every sector.",
  copy: "Browse completed work by the kind of space you’re building.",
  to: "/projects",
  cta: "All projects",
};

const companyLinks = [
  { title: "Meet the Team", to: "/team" },
  { title: "About Us", to: "/about" },
] as const;

const primaryLinks = [
  { title: "Contact", to: "/contact" },
  { title: "Trade Partner Program", to: "/trade-partners", accent: true },
] as const;

const footerLinkGroups = [
  {
    title: "Envision",
    links: [
      { title: "Home", to: "/" },
      { title: "Services", to: "/services" },
      { title: "Projects", to: "/projects" },
      { title: "Company", to: "/about" },
    ],
  },
  {
    title: "Connect",
    links: [
      { title: "Contact", to: "/contact" },
      { title: "Meet the Team", to: "/team" },
      { title: "Trade Partners", to: "/trade-partners" },
    ],
  },
] as const;

const route = useRoute();
const gsap = useGSAP();

type FocusableRef = HTMLElement | { $el?: Element } | null | undefined;

watch(
  () => route.fullPath,
  async () => {
    if (mobileDrawerOpen.value) await closeDrawer();

    mobileServicesOpen.value = false;
    mobileProjectsOpen.value = false;
  },
);

watch(mobileDrawerOpen, (open) => {
  if (!open) {
    mobileServicesOpen.value = false;
    mobileProjectsOpen.value = false;
  }
});

function closeDrawerAndNavigate() {
  void closeDrawer();
}

function scrollPopoverIntoView(selector: string) {
  requestAnimationFrame(() => {
    const trigger = document.body.querySelector(selector);
    const section = trigger?.closest(".mobile-nav-list__item");
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";

    section?.scrollIntoView({ behavior, block: "start" });
  });
}

async function onServicesOpenChange(open: boolean) {
  mobileServicesOpen.value = open;
  if (open) {
    mobileProjectsOpen.value = false;
    await nextTick();
    scrollPopoverIntoView('[data-test="mobile-services-toggle"]');
  }
}

async function onProjectsOpenChange(open: boolean) {
  mobileProjectsOpen.value = open;
  if (open) {
    mobileServicesOpen.value = false;
    await nextTick();
    scrollPopoverIntoView('[data-test="mobile-projects-toggle"]');
  }
}

function getDrawerElements() {
  const content = document.body.querySelector('[data-test="mobile-drawer"]') as HTMLElement | null;
  const overlay = document.body.querySelector(
    '[data-test="mobile-drawer-overlay"]',
  ) as HTMLElement | null;
  const navTargets = content
    ? (Array.from(content.querySelectorAll('[data-anim="mobile-nav-link"]')) as HTMLElement[])
    : [];

  return { content, overlay, navTargets };
}

function resolveFocusable(target: FocusableRef, fallbackSelector: string) {
  if (target instanceof HTMLElement) return target;

  if (target?.$el instanceof HTMLElement) return target.$el;

  return document.body.querySelector(fallbackSelector) as HTMLElement | null;
}

function focusTarget(target: FocusableRef, fallbackSelector: string) {
  resolveFocusable(target, fallbackSelector)?.focus();
}

function focusFirstDrawerLink() {
  focusTarget(firstDrawerLinkRef.value, '[data-test="mobile-services-toggle"]');
}

function queueFirstDrawerLinkFocus() {
  requestAnimationFrame(() => {
    requestAnimationFrame(focusFirstDrawerLink);
  });
}

function animateDrawerOpen() {
  const { content, overlay, navTargets } = getDrawerElements();
  if (!content) return;

  const targets = overlay ? [overlay, content, ...navTargets] : [content, ...navTargets];
  gsap.killTweensOf(targets);

  if (overlay) {
    gsap.set(overlay, { autoAlpha: 0 });
    gsap.to(overlay, { autoAlpha: 1, duration: 0.2, ease: "power2.out" });
  }

  gsap.set(content, { xPercent: 100 });
  if (navTargets.length) gsap.set(navTargets, { opacity: 0, x: 24 });

  const timeline = gsap.timeline();
  timeline.to(content, { xPercent: 0, duration: 0.4, ease: "power3.out" }, 0);

  if (navTargets.length) {
    timeline.to(
      navTargets,
      { opacity: 1, x: 0, duration: 0.24, stagger: 0.06, ease: "power2.out" },
      0.1,
    );
  }
}

function animateDrawerClose() {
  const { content, overlay, navTargets } = getDrawerElements();
  if (!content) return Promise.resolve();

  const targets = overlay ? [overlay, content, ...navTargets] : [content, ...navTargets];
  gsap.killTweensOf(targets);

  return new Promise<void>((resolve) => {
    if (navTargets.length) {
      gsap.to(navTargets, {
        opacity: 0,
        x: 14,
        duration: 0.14,
        stagger: { each: 0.03, from: "end" },
        ease: "power2.in",
      });
    }

    if (overlay) gsap.to(overlay, { autoAlpha: 0, duration: 0.2, ease: "power2.inOut" });

    gsap.to(content, {
      xPercent: 100,
      duration: 0.3,
      ease: "power3.in",
      onComplete: resolve,
    });
  });
}

async function closeDrawer() {
  if (!mobileDrawerOpen.value || isDrawerClosing.value) return;

  isDrawerClosing.value = true;
  await nextTick();
  await animateDrawerClose();
  mobileDrawerOpen.value = false;
  mobileServicesOpen.value = false;
  mobileProjectsOpen.value = false;
  isDrawerClosing.value = false;
}

async function onDrawerOpenChange(nextOpen: boolean) {
  if (nextOpen) {
    mobileDrawerOpen.value = true;
    mobileServicesOpen.value = false;
    mobileProjectsOpen.value = false;
    await nextTick();
    animateDrawerOpen();
    queueFirstDrawerLinkFocus();
    return;
  }

  await closeDrawer();
}

function onDrawerOpenAutoFocus(event: Event) {
  event.preventDefault();
  queueFirstDrawerLinkFocus();
}

function onDrawerCloseAutoFocus(event: Event) {
  event.preventDefault();
  focusTarget(menuButtonRef.value, '[data-test="mobile-menu-trigger"]');
}
</script>

<template>
  <DialogRoot :open="mobileDrawerOpen" @update:open="onDrawerOpenChange">
    <MButton
      ref="menuButtonRef"
      type="button"
      class="mobile-trigger mobile-menu-button"
      data-test="mobile-menu-trigger"
      aria-label="Open main menu"
      aria-haspopup="dialog"
      :aria-expanded="String(mobileDrawerOpen)"
      @click="onDrawerOpenChange(true)"
      @keydown.enter.prevent="onDrawerOpenChange(true)"
      @keydown.space.prevent="onDrawerOpenChange(true)"
    >
      <template #icon>
        <UIcon name="i-lucide-grip" aria-hidden="true" />
      </template>
      Menu
    </MButton>

    <DialogPortal>
      <DialogOverlay class="mobile-overlay" data-test="mobile-drawer-overlay" />
      <DialogContent
        class="mobile-content"
        data-test="mobile-drawer"
        aria-label="Main menu"
        @open-auto-focus="onDrawerOpenAutoFocus"
        @close-auto-focus="onDrawerCloseAutoFocus"
      >
        <VisuallyHidden>
          <DialogTitle>Main menu</DialogTitle>
          <DialogDescription>Primary site navigation links</DialogDescription>
        </VisuallyHidden>

        <div class="mobile-content-header">
          <NuxtLink
            to="/"
            class="mobile-content-header__brand"
            aria-label="Envision home"
            @click="closeDrawerAndNavigate"
          >
            <NuxtImg
              provider="imagekit"
              src="https://ik.imagekit.io/pnixsw7lg/main-website/thumbnail_White_Envision_Logo_c1724c69d3.png?updatedAt=1780533539340"
              alt="Envision Construction logo"
              width="140"
              height="28"
              format="avif"
            />
          </NuxtLink>
          <MButton
            type="button"
            class="mobile-menu-button mobile-menu-button--inside"
            data-test="mobile-menu-close"
            aria-label="Close main menu"
            @click="closeDrawerAndNavigate"
          >
            <template #icon>
              <UIcon name="i-lucide-grip" aria-hidden="true" />
            </template>
            Menu
          </MButton>
        </div>

        <nav class="mobile-nav" aria-label="Mobile primary">
          <ul class="mobile-nav-list">
            <li class="mobile-nav-list__item mobile-nav-list__item--popover">
              <CollapsibleRoot :open="mobileServicesOpen" @update:open="onServicesOpenChange">
                <CollapsibleTrigger as-child>
                  <button
                    ref="firstDrawerLinkRef"
                    class="mobile-popover-trigger"
                    type="button"
                    data-test="mobile-services-toggle"
                    data-anim="mobile-nav-link"
                    :aria-expanded="String(mobileServicesOpen)"
                  >
                    <span class="mobile-popover-trigger__label">Services</span>
                    <UIcon
                      name="i-lucide-chevron-down"
                      class="mobile-popover-trigger__icon"
                      aria-hidden="true"
                    />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent class="mobile-popover-panel" data-test="mobile-services-panel">
                  <div class="mobile-popover-intro">
                    <p class="mobile-popover-intro__eyebrow">{{ servicesPanel.eyebrow }}</p>
                    <p class="mobile-popover-intro__title">{{ servicesPanel.title }}</p>
                    <p class="mobile-popover-intro__copy">{{ servicesPanel.copy }}</p>
                    <NuxtLink
                      :to="servicesPanel.to"
                      class="mobile-popover-intro__cta"
                      @click="closeDrawerAndNavigate"
                    >
                      {{ servicesPanel.cta }}
                      <UIcon name="i-lucide-arrow-right" aria-hidden="true" />
                    </NuxtLink>
                  </div>
                  <ul class="mobile-popover-list">
                    <li v-for="service in services" :key="service.id">
                      <NuxtLink
                        class="mobile-sub-link mobile-popover-row"
                        :to="service.to"
                        @click="closeDrawerAndNavigate"
                      >
                        <span class="mobile-popover-row__body">
                          <span class="mobile-popover-row__title">{{ service.title }}</span>
                          <span v-if="service.nav_content" class="mobile-popover-row__desc">
                            {{ service.nav_content }}
                          </span>
                        </span>
                        <UIcon
                          name="i-lucide-arrow-up-right"
                          class="mobile-popover-row__arrow"
                          aria-hidden="true"
                        />
                      </NuxtLink>
                    </li>
                  </ul>
                </CollapsibleContent>
              </CollapsibleRoot>
            </li>

            <li class="mobile-nav-list__item mobile-nav-list__item--popover">
              <CollapsibleRoot :open="mobileProjectsOpen" @update:open="onProjectsOpenChange">
                <CollapsibleTrigger as-child>
                  <button
                    class="mobile-popover-trigger"
                    type="button"
                    data-test="mobile-projects-toggle"
                    data-anim="mobile-nav-link"
                    :aria-expanded="String(mobileProjectsOpen)"
                  >
                    <span class="mobile-popover-trigger__label">Projects</span>
                    <UIcon
                      name="i-lucide-chevron-down"
                      class="mobile-popover-trigger__icon"
                      aria-hidden="true"
                    />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent class="mobile-popover-panel" data-test="mobile-projects-panel">
                  <div class="mobile-popover-intro">
                    <p class="mobile-popover-intro__eyebrow">{{ projectsPanel.eyebrow }}</p>
                    <p class="mobile-popover-intro__title">{{ projectsPanel.title }}</p>
                    <p class="mobile-popover-intro__copy">{{ projectsPanel.copy }}</p>
                    <NuxtLink
                      :to="projectsPanel.to"
                      class="mobile-popover-intro__cta"
                      @click="closeDrawerAndNavigate"
                    >
                      {{ projectsPanel.cta }}
                      <UIcon name="i-lucide-arrow-right" aria-hidden="true" />
                    </NuxtLink>
                  </div>
                  <ul class="mobile-popover-list">
                    <li v-for="sector in sectors" :key="sector.slug">
                      <NuxtLink
                        class="mobile-sub-link mobile-popover-row"
                        :to="sector.to"
                        @click="closeDrawerAndNavigate"
                      >
                        <span class="mobile-popover-row__body">
                          <span class="mobile-popover-row__title">{{ sector.name }}</span>
                          <span v-if="sector.description" class="mobile-popover-row__desc">
                            {{ sector.description }}
                          </span>
                        </span>
                        <UIcon
                          name="i-lucide-arrow-up-right"
                          class="mobile-popover-row__arrow"
                          aria-hidden="true"
                        />
                      </NuxtLink>
                    </li>
                  </ul>
                </CollapsibleContent>
              </CollapsibleRoot>
            </li>

            <li v-for="link in companyLinks" :key="link.to" class="mobile-nav-list__item">
              <NuxtLink
                class="mobile-link"
                :to="link.to"
                data-anim="mobile-nav-link"
                @click="closeDrawerAndNavigate"
              >
                <span class="mobile-link__label">{{ link.title }}</span>
                <UIcon
                  name="i-lucide-arrow-up-right"
                  class="mobile-link__icon"
                  aria-hidden="true"
                />
              </NuxtLink>
            </li>

            <li v-for="link in primaryLinks" :key="link.to" class="mobile-nav-list__item">
              <NuxtLink
                class="mobile-link"
                :class="{ 'mobile-link--accent': link.accent }"
                :to="link.to"
                data-anim="mobile-nav-link"
                @click="closeDrawerAndNavigate"
              >
                <span class="mobile-link__label">{{ link.title }}</span>
                <UIcon
                  name="i-lucide-arrow-up-right"
                  class="mobile-link__icon"
                  aria-hidden="true"
                />
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <footer class="mobile-footer" aria-label="Secondary navigation">
          <div v-for="group in footerLinkGroups" :key="group.title" class="mobile-footer__group">
            <p class="mobile-footer__title">{{ group.title }}</p>
            <NuxtLink
              v-for="link in group.links"
              :key="link.to"
              class="mobile-footer__link"
              :to="link.to"
              :data-test="link.to === '/' ? 'mobile-home-link' : undefined"
              @click="closeDrawerAndNavigate"
            >
              {{ link.title }}
            </NuxtLink>
          </div>
        </footer>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style scoped>
.mobile-trigger {
  display: inline-flex;
  pointer-events: auto;
}

.mobile-menu-button {
  display: inline-flex;
  min-height: 2.5rem;
  align-items: center;
  justify-content: center;
  gap: calc(var(--spacing) * 2);
  padding-inline: calc(var(--spacing) * 4);
  border: 1px solid color-mix(in oklch, var(--color-white) 12%, transparent);
  border-radius: calc(var(--spacing) * 2);
  background: color-mix(in oklch, var(--color-envision-gray-900) 75%, transparent);
  color: var(--color-white);
  font: inherit;
  font-size: 0.78rem;
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: none;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.mobile-menu-button svg {
  width: 1rem;
  height: 1rem;
}

.mobile-menu-button:focus-visible {
  outline: 2px solid var(--color-envision-blue-400);
  outline-offset: 3px;
}

.mobile-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: color-mix(in oklch, var(--color-envision-gray-900) 72%, transparent);
}

.mobile-content {
  --drawer-bg: color-mix(in oklch, var(--color-envision-gray-900) 96%, black);
  --drawer-surface: color-mix(in oklch, var(--color-envision-gray-900) 75%, transparent);
  --drawer-surface-hover: color-mix(in oklch, var(--color-white) 6%, transparent);
  --drawer-text: var(--color-white);
  --drawer-muted: color-mix(in oklch, var(--color-white) 54%, transparent);
  --drawer-border: color-mix(in oklch, var(--color-white) 12%, transparent);
  --drawer-accent: var(--color-envision-blue-400);

  position: fixed;
  inset: 0;
  z-index: 201;
  width: 100vw;
  height: 100dvh;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  border: 0;
  outline: none;
  background: var(--drawer-bg);
  color: var(--drawer-text);
}

.mobile-content-header {
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: calc(var(--spacing) * 4);
  padding: calc(var(--spacing) * 6) calc(var(--spacing) * 3);
  border-bottom: 1px solid var(--drawer-border);
  background: color-mix(in oklch, var(--drawer-bg) 88%, transparent);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

.mobile-content-header__brand {
  display: inline-flex;
  align-items: center;
  width: fit-content;
}

.mobile-content-header__brand img {
  display: block;
  width: 8.75rem;
  height: auto;
}

.mobile-content-header__brand:focus-visible {
  outline: 2px solid var(--drawer-accent);
  outline-offset: 4px;
}

.mobile-menu-button--inside {
  background: color-mix(in oklch, var(--color-envision-gray-900) 75%, transparent);
}

.mobile-nav {
  width: min(100%, 42rem);
  margin-inline: auto;
  padding: calc(var(--spacing) * 7) calc(var(--spacing) * 3) calc(var(--spacing) * 10);
}

.mobile-nav-list,
.mobile-popover-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.mobile-nav-list {
  display: grid;
  gap: calc(var(--spacing) * 3);
}

.mobile-nav-list__item {
  overflow: clip;
  scroll-margin-top: 6.5rem;
  border: 1px solid var(--drawer-border);
  border-radius: calc(var(--spacing) * 2);
  background: var(--drawer-surface);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.mobile-popover-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: calc(var(--spacing) * 4);
  width: 100%;
  min-height: 4rem;
  padding: calc(var(--spacing) * 4) calc(var(--spacing) * 5);
  border: 0;
  background: transparent;
  color: var(--drawer-text);
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: background-color 160ms ease;
}

.mobile-popover-trigger:hover,
.mobile-popover-trigger:focus-visible,
.mobile-popover-trigger[aria-expanded="true"] {
  background: var(--drawer-surface-hover);
}

.mobile-popover-trigger:focus-visible {
  outline: 2px solid var(--drawer-accent);
  outline-offset: -2px;
}

.mobile-popover-trigger__label {
  font-size: 0.84rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.mobile-popover-trigger__icon {
  width: 1rem;
  height: 1rem;
  color: var(--drawer-muted);
  transition:
    color 160ms ease,
    transform 200ms cubic-bezier(0.22, 1, 0.36, 1);
}

.mobile-popover-trigger[aria-expanded="true"] .mobile-popover-trigger__icon {
  color: var(--drawer-accent);
  transform: rotate(180deg);
}

.mobile-popover-panel {
  overflow: hidden;
  border-top: 1px solid var(--drawer-border);
}

.mobile-popover-intro {
  display: grid;
  padding: calc(var(--spacing) * 5);
  border-bottom: 1px solid var(--drawer-border);
  background: color-mix(in oklch, var(--color-envision-gray-900) 82%, transparent);
}

.mobile-popover-intro__eyebrow {
  margin: 0;
  color: var(--drawer-accent);
  font-size: 0.7rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.mobile-popover-intro__title {
  max-width: 19rem;
  margin: calc(var(--spacing) * 4) 0 0;
  color: var(--drawer-text);
  font-size: clamp(1.35rem, 5.5vw, 1.65rem);
  font-weight: 300;
  line-height: 1.12;
  text-wrap: balance;
}

.mobile-popover-intro__copy {
  max-width: 28rem;
  margin: calc(var(--spacing) * 3) 0 0;
  color: var(--drawer-muted);
  font-size: 0.82rem;
  font-weight: 500;
  line-height: 1.4;
}

.mobile-popover-intro__cta {
  display: inline-flex;
  align-items: center;
  gap: calc(var(--spacing) * 2);
  width: fit-content;
  margin-top: calc(var(--spacing) * 5);
  color: var(--drawer-text);
  font-size: 0.72rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.1em;
  text-decoration: none;
  text-transform: uppercase;
  transition: color 160ms ease;
}

.mobile-popover-intro__cta:hover,
.mobile-popover-intro__cta:focus-visible {
  color: var(--color-envision-blue-300);
}

.mobile-popover-intro__cta:focus-visible {
  outline: 2px solid var(--drawer-accent);
  outline-offset: 4px;
}

.mobile-popover-list {
  display: flex;
  flex-direction: column;
}

.mobile-popover-list li:not(:first-child) {
  border-top: 1px solid color-mix(in oklch, var(--color-white) 10%, transparent);
}

.mobile-sub-link.mobile-popover-row {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: calc(var(--spacing) * 4);
  width: 100%;
  padding: calc(var(--spacing) * 4) calc(var(--spacing) * 5);
  color: var(--drawer-text);
  text-decoration: none;
  transition: background-color 160ms ease;
}

.mobile-popover-row::before,
.mobile-link::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  width: 2px;
  height: 0;
  background: var(--drawer-accent);
  transform: translateY(-50%);
  transition: height 220ms cubic-bezier(0.22, 1, 0.36, 1);
}

.mobile-popover-row:hover,
.mobile-popover-row:focus-visible,
.mobile-link:hover,
.mobile-link:focus-visible {
  background: var(--drawer-surface-hover);
  color: var(--drawer-text);
}

.mobile-popover-row:hover::before,
.mobile-popover-row:focus-visible::before,
.mobile-link:hover::before,
.mobile-link:focus-visible::before {
  height: 100%;
}

.mobile-popover-row:focus-visible,
.mobile-link:focus-visible {
  outline: 2px solid var(--drawer-accent);
  outline-offset: -2px;
}

.mobile-popover-row__body {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 1);
  min-width: 0;
}

.mobile-popover-row__title,
.mobile-link__label {
  color: inherit;
  font-size: 0.98rem;
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: normal;
  text-transform: none;
}

.mobile-popover-row__desc {
  display: -webkit-box;
  overflow: hidden;
  color: var(--drawer-muted);
  font-size: 0.78rem;
  font-weight: 500;
  line-height: 1.35;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.mobile-popover-row__arrow,
.mobile-link__icon {
  flex-shrink: 0;
  width: 1rem;
  height: 1rem;
  color: color-mix(in oklch, var(--color-white) 36%, transparent);
  opacity: 0.7;
  transform: translate(-0.15rem, 0.15rem);
  transition:
    color 180ms ease,
    opacity 180ms ease,
    transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
}

.mobile-popover-row:hover .mobile-popover-row__arrow,
.mobile-popover-row:focus-visible .mobile-popover-row__arrow,
.mobile-link:hover .mobile-link__icon,
.mobile-link:focus-visible .mobile-link__icon {
  color: var(--color-envision-blue-300);
  opacity: 1;
  transform: translate(0, 0);
}

.mobile-link {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: calc(var(--spacing) * 4);
  width: 100%;
  min-height: 3.75rem;
  padding: calc(var(--spacing) * 4) calc(var(--spacing) * 5);
  color: var(--drawer-text);
  background: transparent;
  text-decoration: none;
  transition: background-color 160ms ease;
}

.mobile-link--accent {
  background: color-mix(in oklch, var(--drawer-accent) 10%, transparent);
  box-shadow: inset 2px 0 var(--drawer-accent);
}

.mobile-link--accent:hover,
.mobile-link--accent:focus-visible {
  background: color-mix(in oklch, var(--drawer-accent) 16%, transparent);
}

.mobile-footer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: calc(var(--spacing) * 8);
  width: min(100%, 42rem);
  margin-inline: auto;
  padding: calc(var(--spacing) * 8) calc(var(--spacing) * 3);
  border-top: 1px solid var(--drawer-border);
}

.mobile-footer__group {
  display: grid;
  align-content: start;
  gap: calc(var(--spacing) * 3);
}

.mobile-footer__title {
  margin: 0 0 calc(var(--spacing) * 1);
  color: var(--drawer-muted);
  font-size: 0.7rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.mobile-footer__link {
  width: fit-content;
  color: var(--drawer-text);
  font-size: 0.78rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0.06em;
  text-decoration: none;
  text-transform: uppercase;
}

.mobile-footer__link:hover,
.mobile-footer__link:focus-visible {
  color: var(--color-envision-blue-300);
}

.mobile-footer__link:focus-visible {
  outline: 2px solid var(--drawer-accent);
  outline-offset: 4px;
}

@media (min-width: 480px) {
  .mobile-content-header,
  .mobile-nav,
  .mobile-footer {
    padding-inline: calc(var(--spacing) * 6);
  }
}

@media (min-width: 700px) {
  .mobile-popover-panel {
    display: grid;
    grid-template-columns: minmax(200px, 0.85fr) 1.5fr;
  }

  .mobile-popover-intro {
    border-right: 1px solid var(--drawer-border);
    border-bottom: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .mobile-popover-trigger__icon,
  .mobile-popover-row::before,
  .mobile-link::before,
  .mobile-popover-row__arrow,
  .mobile-link__icon {
    transition: none;
  }
}

@media (min-width: 1100px) {
  .mobile-trigger,
  .mobile-overlay,
  .mobile-content {
    display: none;
  }
}
</style>
