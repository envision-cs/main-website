<script setup lang="ts">
const mobileDrawerOpen = ref(false);
const mobileServicesOpen = ref(false);
const mobileProjectsOpen = ref(false);
const menuButtonRef = ref<HTMLButtonElement | null>(null);
const firstDrawerLinkRef = ref<HTMLElement | null>(null);
const isDrawerClosing = ref(false);

const { services } = await useServicesList();
const { sectors } = await useSectors();

const serviceLinks = computed(() => [
  { title: "All Services", to: "/services" },
  ...services.value.map((service) => ({
    title: service.title,
    to: service.to,
  })),
]);

const projectLinks = computed(() => [
  { title: "All Projects", to: "/projects" },
  ...sectors.value.map((sector) => ({
    title: sector.name,
    to: sector.to,
  })),
]);

const primaryLinks = [
  { title: "Meet the Team", to: "/team" },
  { title: "About Us", to: "/about" },
  { title: "Contact", to: "/contact" },
  { title: "Trade Partner Program", to: "/trade-partners", accent: true },
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
  focusTarget(firstDrawerLinkRef.value, '[data-test="mobile-home-link"]');
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
    <DialogTrigger class="mobile-trigger" as-child>
      <my-button
        ref="menuButtonRef"
        size="sm"
        data-test="mobile-menu-trigger"
        aria-label="Open main menu"
        aria-haspopup="dialog"
        :aria-expanded="String(mobileDrawerOpen)"
      >
        Menu
      </my-button>
    </DialogTrigger>

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
          <div class="mobile-brand-block">
            <app-typography tag="span" variant="eyebrow-md" class="mobile-brand-block__eyebrow">
              Navigation
            </app-typography>
            <div class="mobile-brand-block__mark">
              <Icon name="logos:envision-white" size="28" alt="envision construction logo" />
            </div>
          </div>
          <my-button
            size="sm"
            type="button"
            class="mobile-nav-close"
            data-test="mobile-menu-close"
            aria-label="Close main menu"
            @click="closeDrawerAndNavigate"
          >
            Close
          </my-button>
        </div>

        <nav class="mobile-nav" aria-label="Mobile primary">
          <ul class="mobile-nav-list">
            <li class="mobile-nav-list__item">
              <NuxtLink
                ref="firstDrawerLinkRef"
                class="mobile-link"
                to="/"
                data-test="mobile-home-link"
                data-anim="mobile-nav-link"
                @click="closeDrawerAndNavigate"
              >
                <app-typography tag="span" variant="heading-sm" class="mobile-link__label">
                  Home
                </app-typography>
                <UIcon name="i-lucide-arrow-right" class="mobile-link__icon" aria-hidden="true" />
              </NuxtLink>
            </li>
            <li class="mobile-nav-list__item">
              <CollapsibleRoot v-model:open="mobileServicesOpen">
                <CollapsibleTrigger as-child>
                  <button
                    class="mobile-services-toggle"
                    type="button"
                    data-test="mobile-services-toggle"
                    data-anim="mobile-nav-link"
                    :aria-expanded="String(mobileServicesOpen)"
                  >
                    <app-typography
                      tag="span"
                      variant="heading-sm"
                      class="mobile-services-toggle__label"
                    >
                      Services
                    </app-typography>
                    <UIcon
                      name="i-lucide-chevron-down"
                      class="mobile-services-toggle__icon"
                      aria-hidden="true"
                    />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent class="mobile-services-panel" data-test="mobile-services-panel">
                  <ul class="mobile-services-list">
                    <li
                      v-for="link in serviceLinks"
                      :key="link.to"
                      class="mobile-services-list__item"
                    >
                      <NuxtLink
                        class="mobile-link"
                        :to="link.to"
                        data-anim="mobile-nav-link"
                        @click="closeDrawerAndNavigate"
                      >
                        <app-typography tag="span" variant="text-md" class="mobile-link__label">
                          {{ link.title }}
                        </app-typography>
                        <UIcon
                          name="i-lucide-arrow-right"
                          class="mobile-link__icon"
                          aria-hidden="true"
                        />
                      </NuxtLink>
                    </li>
                  </ul>
                </CollapsibleContent>
              </CollapsibleRoot>
            </li>
            <li class="mobile-nav-list__item">
              <CollapsibleRoot v-model:open="mobileProjectsOpen">
                <CollapsibleTrigger as-child>
                  <button
                    class="mobile-services-toggle"
                    type="button"
                    data-test="mobile-projects-toggle"
                    data-anim="mobile-nav-link"
                    :aria-expanded="String(mobileProjectsOpen)"
                  >
                    <app-typography
                      tag="span"
                      variant="heading-sm"
                      class="mobile-services-toggle__label"
                    >
                      Projects
                    </app-typography>
                    <UIcon
                      name="i-lucide-chevron-down"
                      class="mobile-services-toggle__icon"
                      aria-hidden="true"
                    />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent class="mobile-services-panel" data-test="mobile-projects-panel">
                  <ul class="mobile-services-list">
                    <li
                      v-for="link in projectLinks"
                      :key="link.to"
                      class="mobile-services-list__item"
                    >
                      <NuxtLink
                        class="mobile-link"
                        :to="link.to"
                        data-anim="mobile-nav-link"
                        @click="closeDrawerAndNavigate"
                      >
                        <app-typography tag="span" variant="text-md" class="mobile-link__label">
                          {{ link.title }}
                        </app-typography>
                        <UIcon
                          name="i-lucide-arrow-right"
                          class="mobile-link__icon"
                          aria-hidden="true"
                        />
                      </NuxtLink>
                    </li>
                  </ul>
                </CollapsibleContent>
              </CollapsibleRoot>
            </li>
            <li v-for="link in primaryLinks" :key="link.to" class="mobile-nav-list__item">
              <NuxtLink
                class="mobile-link"
                :class="{ 'mobile-link--accent': link.accent }"
                :to="link.to"
                data-anim="mobile-nav-link"
                @click="closeDrawerAndNavigate"
              >
                <app-typography tag="span" variant="heading-sm" class="mobile-link__label">
                  {{ link.title }}
                </app-typography>
                <UIcon name="i-lucide-arrow-right" class="mobile-link__icon" aria-hidden="true" />
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style scoped>
.mobile-trigger {
  display: inline-flex;
  border-radius: 0;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 0.78rem;
  font-weight: 600;
}

.mobile-trigger:deep(.btn),
.mobile-trigger {
  border-radius: 0;
}

.mobile-overlay {
  position: fixed;
  inset: 0;
  background: color-mix(in oklch, var(--color-envision-gray-900) 72%, transparent);
  z-index: 200;
}

.mobile-content {
  --drawer-bg: var(--color-envision-gray-800);
  --drawer-bg-deep: var(--color-envision-gray-900);
  --drawer-text: var(--color-white);
  --drawer-muted: color-mix(in oklch, var(--color-white) 62%, var(--color-envision-blue-300));
  --drawer-border: color-mix(in oklch, var(--color-white) 13%, transparent);
  --drawer-accent: var(--color-envision-green-500);
  --drawer-blue: var(--color-envision-blue-500);

  position: fixed;
  top: 0;
  right: 0;
  height: 100dvh;
  width: min(31rem, 94vw);
  margin: 0;
  border-left: 1px solid var(--drawer-border);
  background: var(--drawer-bg);
  color: var(--drawer-text);
  z-index: 201;
  overflow-y: auto;
  padding: 0;
  outline: none;
}

.mobile-content-header {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  justify-content: space-between;
  gap: calc(var(--spacing) * 4);
  padding: calc(var(--spacing) * 5) calc(var(--spacing) * 4) calc(var(--spacing) * 6);
  border-bottom: 1px solid var(--drawer-border);
  background: var(--drawer-bg-deep);
}

.mobile-brand-block {
  display: grid;
  gap: calc(var(--spacing) * 2);
  min-width: 0;
}

.mobile-brand-block__eyebrow {
  color: var(--drawer-blue);
  letter-spacing: 0.18em;
  line-height: 1;
}

.mobile-brand-block__mark {
  display: inline-flex;
  align-items: center;
  color: var(--drawer-text);
  width: fit-content;
  min-height: 2rem;
}

.mobile-nav-close {
  flex: 0 0 auto;
  border-radius: 0;
}

.mobile-nav-close:deep(.btn) {
  border: 1px solid var(--drawer-border);
  border-radius: 0;
  background: transparent;
  color: var(--drawer-text);
  outline-color: var(--drawer-border);
  text-transform: uppercase;
  letter-spacing: 0.14em;
}

.mobile-nav-close:deep(.btn--sm) {
  padding: 0.6rem 0.85rem;
  font-size: 0.74rem;
}

.mobile-nav-close:deep(.btn:hover),
.mobile-nav-close:deep(.btn:focus-visible) {
  color: var(--drawer-bg-deep);
  background: var(--drawer-text);
  outline-color: var(--drawer-accent);
}

.mobile-nav {
  padding: 0;
}

.mobile-nav-list,
.mobile-services-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0;
}

.mobile-nav-list {
  counter-reset: mobile-nav;
}

.mobile-nav-list__item {
  counter-increment: mobile-nav;
  border-bottom: 1px solid var(--drawer-border);
}

.mobile-services-list__item {
  border-top: 1px solid color-mix(in oklch, var(--color-white) 8%, transparent);
}

.mobile-link,
.mobile-services-toggle {
  display: grid;
  grid-template-columns: 3rem minmax(0, 1fr) auto;
  align-items: center;
  column-gap: calc(var(--spacing) * 4);
  width: 100%;
  min-height: 5rem;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--drawer-text);
  background: transparent;
  border: 0;
  transition:
    background-color 180ms ease,
    color 180ms ease,
    padding-inline 180ms ease;
}

.mobile-link::before,
.mobile-services-toggle::before {
  content: counter(mobile-nav, decimal-leading-zero);
  align-self: start;
  padding-top: 0.18rem;
  color: var(--drawer-accent);
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  line-height: 1;
}

.mobile-link {
  padding: calc(var(--spacing) * 4);
}

.mobile-link__label,
.mobile-services-toggle__label {
  max-inline-size: none;
  color: inherit;
  line-height: 0.98;
  text-transform: none;
  letter-spacing: -0.025em;
}

.mobile-link__icon,
.mobile-services-toggle__icon {
  width: 1.1rem;
  height: 1.1rem;
  color: var(--drawer-muted);
  transition:
    color 180ms ease,
    transform 180ms ease;
}

.mobile-link--accent {
  color: var(--drawer-text);
  background: color-mix(in oklch, var(--drawer-blue) 22%, transparent);
  box-shadow: inset 4px 0 0 var(--drawer-blue);
}

.mobile-link--accent::before {
  color: var(--drawer-text);
}

.mobile-services-toggle {
  padding: calc(var(--spacing) * 4);
  text-align: left;
  cursor: pointer;
}

.mobile-link:hover,
.mobile-services-toggle:hover {
  color: var(--drawer-text);
  background: color-mix(in oklch, var(--color-white) 6%, transparent);
  outline: none;
}

.mobile-link:hover .mobile-link__icon,
.mobile-link:focus-visible .mobile-link__icon {
  color: var(--drawer-accent);
  transform: translateX(0.25rem);
}

.mobile-services-toggle:hover .mobile-services-toggle__icon,
.mobile-services-toggle:focus-visible .mobile-services-toggle__icon {
  color: var(--drawer-accent);
}

.mobile-services-toggle[aria-expanded="true"] .mobile-services-toggle__icon {
  color: var(--drawer-accent);
  transform: rotate(180deg);
}

.mobile-link:focus-visible,
.mobile-services-toggle:focus-visible {
  background: color-mix(in oklch, var(--color-white) 6%, transparent);
  outline: 2px solid var(--drawer-accent);
  outline-offset: -2px;
}

.mobile-link--accent:hover,
.mobile-link--accent:focus-visible {
  background: color-mix(in oklch, var(--drawer-blue) 34%, transparent);
}

.mobile-services-panel {
  background: var(--drawer-bg-deep);
  border-top: 1px solid var(--drawer-border);
}

.mobile-services-list {
  padding-block: calc(var(--spacing) * 1);
}

.mobile-services-list .mobile-link {
  grid-template-columns: 1.35rem minmax(0, 1fr) auto;
  min-height: 3.65rem;
  padding: calc(var(--spacing) * 3) calc(var(--spacing) * 4);
  color: var(--drawer-muted);
}

.mobile-services-list .mobile-link::before {
  content: "";
  display: block;
  width: 0.75rem;
  height: 1px;
  padding: 0;
  margin-top: 0.72rem;
  background: var(--drawer-accent);
}

.mobile-services-list .mobile-link__label {
  line-height: 1.15;
  letter-spacing: 0;
}

.mobile-services-list .mobile-link:hover,
.mobile-services-list .mobile-link:focus-visible {
  color: var(--drawer-text);
}

@media (min-width: 1100px) {
  .mobile-trigger,
  .mobile-overlay,
  .mobile-content {
    display: none;
  }
}
</style>
