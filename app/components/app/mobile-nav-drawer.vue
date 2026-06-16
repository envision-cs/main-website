<script setup lang="ts">const mobileDrawerOpen = ref(false);
const mobileServicesOpen = ref(false);
const mobileProjectsOpen = ref(false);
const mobileCompanyOpen = ref(false);
const menuButtonRef = ref<HTMLButtonElement | null>(null);
const firstDrawerLinkRef = ref<HTMLElement | null>(null);
const isDrawerClosing = ref(false);

const { services } = await useServicesList();
const { sectors } = await useSectors();

const serviceLinks = computed(() => [
  { title: 'All Services', to: '/services' },
  ...services.value.map(service => ({
    title: service.title,
    to: service.to,
  })),
]);

const projectLinks = computed(() => [
  { title: 'All Projects', to: '/projects' },
  ...sectors.value.map(sector => ({
    title: sector.name,
    to: sector.to,
  })),
]);

const companyLinks = [
  { title: 'Meet the Team', to: '/team' },
  { title: 'About Us', to: '/about' },
] as const;

const primaryLinks = [
  { title: 'Contact', to: '/contact' },
  { title: 'Trade Partner Program', to: '/trade-partners', accent: true },
] as const;

const footerLinkGroups = [
  {
    title: 'Envision',
    links: [
      { title: 'Home', to: '/' },
      { title: 'Services', to: '/services' },
      { title: 'Projects', to: '/projects' },
      { title: 'Company', to: '/about' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { title: 'Contact', to: '/contact' },
      { title: 'Meet the Team', to: '/team' },
      { title: 'Trade Partners', to: '/trade-partners' },
    ],
  },
] as const;

const route = useRoute();
const gsap = useGSAP();

type FocusableRef = HTMLElement | { $el?: Element } | null | undefined;

watch(
  () => route.fullPath,
  async () => {
    if (mobileDrawerOpen.value)
      await closeDrawer();

    mobileServicesOpen.value = false;
    mobileProjectsOpen.value = false;
    mobileCompanyOpen.value = false;
  },
);

watch(mobileDrawerOpen, (open) => {
  if (!open) {
    mobileServicesOpen.value = false;
    mobileProjectsOpen.value = false;
    mobileCompanyOpen.value = false;
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
  if (target instanceof HTMLElement)
    return target;

  if (target?.$el instanceof HTMLElement)
    return target.$el;

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
  if (!content)
    return;

  const targets = overlay ? [overlay, content, ...navTargets] : [content, ...navTargets];
  gsap.killTweensOf(targets);

  if (overlay) {
    gsap.set(overlay, { autoAlpha: 0 });
    gsap.to(overlay, { autoAlpha: 1, duration: 0.2, ease: 'power2.out' });
  }

  gsap.set(content, { xPercent: 100 });
  if (navTargets.length)
    gsap.set(navTargets, { opacity: 0, x: 24 });

  const timeline = gsap.timeline();
  timeline.to(content, { xPercent: 0, duration: 0.4, ease: 'power3.out' }, 0);

  if (navTargets.length) {
    timeline.to(
      navTargets,
      { opacity: 1, x: 0, duration: 0.24, stagger: 0.06, ease: 'power2.out' },
      0.1,
    );
  }
}

function animateDrawerClose() {
  const { content, overlay, navTargets } = getDrawerElements();
  if (!content)
    return Promise.resolve();

  const targets = overlay ? [overlay, content, ...navTargets] : [content, ...navTargets];
  gsap.killTweensOf(targets);

  return new Promise<void>((resolve) => {
    if (navTargets.length) {
      gsap.to(navTargets, {
        opacity: 0,
        x: 14,
        duration: 0.14,
        stagger: { each: 0.03, from: 'end' },
        ease: 'power2.in',
      });
    }

    if (overlay)
      gsap.to(overlay, { autoAlpha: 0, duration: 0.2, ease: 'power2.inOut' });

    gsap.to(content, {
      xPercent: 100,
      duration: 0.3,
      ease: 'power3.in',
      onComplete: resolve,
    });
  });
}

async function closeDrawer() {
  if (!mobileDrawerOpen.value || isDrawerClosing.value)
    return;

  isDrawerClosing.value = true;
  await nextTick();
  await animateDrawerClose();
  mobileDrawerOpen.value = false;
  mobileServicesOpen.value = false;
  mobileProjectsOpen.value = false;
  mobileCompanyOpen.value = false;
  isDrawerClosing.value = false;
}

async function onDrawerOpenChange(nextOpen: boolean) {
  if (nextOpen) {
    mobileDrawerOpen.value = true;
    mobileServicesOpen.value = true;
    mobileProjectsOpen.value = false;
    mobileCompanyOpen.value = false;
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
            <li class="mobile-nav-list__item">
              <CollapsibleRoot v-model:open="mobileServicesOpen">
                <CollapsibleTrigger as-child>
                  <MButton
                    ref="firstDrawerLinkRef"
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
                    <template #icon>
                      <UIcon
                        name="i-lucide-chevron-down"
                        class="mobile-services-toggle__icon"
                        aria-hidden="true"
                      />
                    </template>
                  </MButton>
                </CollapsibleTrigger>
                <CollapsibleContent class="mobile-services-panel" data-test="mobile-services-panel">
                  <ul class="mobile-services-list">
                    <li
                      v-for="link in serviceLinks"
                      :key="link.to"
                      class="mobile-services-list__item"
                    >
                      <NuxtLink
                        class="mobile-sub-link"
                        :to="link.to"
                        data-anim="mobile-nav-link"
                        @click="closeDrawerAndNavigate"
                      >
                        {{ link.title }}
                      </NuxtLink>
                    </li>
                  </ul>
                </CollapsibleContent>
              </CollapsibleRoot>
            </li>

            <li class="mobile-nav-list__item">
              <CollapsibleRoot v-model:open="mobileProjectsOpen">
                <CollapsibleTrigger as-child>
                  <MButton
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
                    <template #icon>
                      <UIcon
                        name="i-lucide-chevron-down"
                        class="mobile-services-toggle__icon"
                        aria-hidden="true"
                      />
                    </template>
                  </MButton>
                </CollapsibleTrigger>
                <CollapsibleContent class="mobile-services-panel" data-test="mobile-projects-panel">
                  <ul class="mobile-services-list">
                    <li
                      v-for="link in projectLinks"
                      :key="link.to"
                      class="mobile-services-list__item"
                    >
                      <NuxtLink
                        class="mobile-sub-link"
                        :to="link.to"
                        data-anim="mobile-nav-link"
                        @click="closeDrawerAndNavigate"
                      >
                        {{ link.title }}
                      </NuxtLink>
                    </li>
                  </ul>
                </CollapsibleContent>
              </CollapsibleRoot>
            </li>


                    <li
                      v-for="link in companyLinks"
                      :key="link.to"
                      class="mobile-services-list__item"
                    >
                      <NuxtLink
                        class="mobile-link"
                        :to="link.to"
                        data-anim="mobile-nav-link"
                        @click="closeDrawerAndNavigate"
                      >
                        <app-typography tag="span" variant="heading-sm" class="mobile-link__label">
                          {{ link.title }}
                        </app-typography>
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
                <app-typography tag="span" variant="heading-sm" class="mobile-link__label">
                  {{ link.title }}
                </app-typography>
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
              data-anim="mobile-nav-link"
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

.mobile-services-toggle[aria-expanded='true'] .mobile-services-toggle__icon {
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
  content: '';
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

/* Screenshot-aligned full-screen drawer */
.mobile-trigger {
  display: inline-flex;
  pointer-events: auto;
}

.mobile-menu-button {
  display: inline-flex;
  min-height: 3rem;
  align-items: center;
  justify-content: center;
  gap: calc(var(--spacing) * 2);
  padding: 0 calc(var(--spacing) * 4);
  border: 1px solid color-mix(in oklch, var(--color-white) 10%, transparent);
  border-radius: 14px;
  background: color-mix(in oklch, var(--color-envision-gray-900) 66%, transparent);
  color: var(--color-white);
  font: inherit;
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0;
  text-transform: none;
  cursor: pointer;
  box-shadow: 0 18px 44px rgb(0 0 0 / 16%);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}

.mobile-menu-button svg {
  width: 1.15rem;
  height: 1.15rem;
}

.mobile-menu-button:focus-visible {
  outline: 2px solid var(--color-envision-green-500);
  outline-offset: 3px;
}

.mobile-overlay {
  background: color-mix(in oklch, var(--color-envision-gray-900) 72%, transparent);
}

.mobile-content {
  --drawer-bg: color-mix(in oklch, var(--color-envision-gray-900) 96%, black);
  --drawer-bg-deep: color-mix(in oklch, var(--color-envision-gray-900) 88%, black);
  --drawer-text: var(--color-white);
  --drawer-muted: color-mix(in oklch, var(--color-white) 62%, transparent);
  --drawer-border: color-mix(in oklch, var(--color-white) 8%, transparent);
  --drawer-accent: var(--color-envision-green-500);

  inset: 0;
  width: 100vw;
  max-width: none;
  height: 100dvh;
  border-left: 0;
  background: var(--drawer-bg);
  overflow-y: auto;
}

.mobile-content-header {
  display: flex;
  justify-content: flex-end;
  padding: calc(var(--spacing) * 9) calc(var(--spacing) * 3) calc(var(--spacing) * 8);
  border-bottom: 0;
  background: transparent;
}

.mobile-menu-button--inside {
  background: color-mix(in oklch, var(--color-envision-gray-800) 66%, black);
}

.mobile-nav {
  display: grid;
  gap: calc(var(--spacing) * 8);
  padding: calc(var(--spacing) * 8) calc(var(--spacing) * 3) calc(var(--spacing) * 10);
}

.mobile-nav-list {
  gap: calc(var(--spacing) * 6);
  counter-reset: none;
}

.mobile-nav-list__item {
  border-bottom: 0;
}

.mobile-link,
.mobile-services-toggle {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  min-height: auto;
  column-gap: calc(var(--spacing) * 3);
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--drawer-text);
  text-transform: none;
}

.mobile-link::before,
.mobile-services-toggle::before {
  display: none;
}

.mobile-link__label,
.mobile-services-toggle__label {
  color: inherit;
  font-size: 1.45rem;
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: 0;
}

.mobile-link__icon,
.mobile-services-toggle__icon {
  width: 1.1rem;
  height: 1.1rem;
  color: color-mix(in oklch, var(--color-white) 48%, transparent);
}

.mobile-services-toggle {
  text-align: left;
}

.mobile-services-toggle[aria-expanded='true'] .mobile-services-toggle__icon {
  transform: rotate(180deg);
}

.mobile-link:hover,
.mobile-services-toggle:hover,
.mobile-link:focus-visible,
.mobile-services-toggle:focus-visible {
  background: transparent;
  color: var(--drawer-text);
  outline: none;
}

.mobile-link:focus-visible,
.mobile-services-toggle:focus-visible,
.mobile-sub-link:focus-visible,
.mobile-action:focus-visible,
.mobile-footer__link:focus-visible {
  outline: 2px solid var(--drawer-accent);
  outline-offset: 4px;
}

.mobile-services-panel {
  margin-top: calc(var(--spacing) * 3);
  border-top: 0;
  background: transparent;
}

.mobile-services-list {
  display: grid;
  gap: calc(var(--spacing) * 3);
  padding: 0;
}

.mobile-services-list__item {
  border-top: 0;
}

.mobile-sub-link {
  display: inline-flex;
  width: fit-content;
  color: color-mix(in oklch, var(--color-white) 67%, transparent);
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.2;
  text-decoration: none;
}

.mobile-sub-link:hover {
  color: var(--drawer-text);
}

.mobile-link--accent {
  box-shadow: none;
  background: transparent;
}

.mobile-actions {
  display: grid;
  gap: calc(var(--spacing) * 2);
  padding-top: calc(var(--spacing) * 4);
}

.mobile-action {
  display: inline-flex;
  min-height: 4rem;
  align-items: center;
  justify-content: space-between;
  gap: calc(var(--spacing) * 4);
  padding: 0 calc(var(--spacing) * 6);
  border-radius: 16px;
  background: color-mix(in oklch, var(--color-white) 7%, transparent);
  color: var(--drawer-text);
  font-size: 0.82rem;
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
}

.mobile-action--primary {
  background: color-mix(in oklch, var(--color-white) 86%, var(--color-envision-gray-300));
  color: var(--color-envision-gray-900);
}

.mobile-action svg {
  width: 0.9rem;
  height: 0.9rem;
}

.mobile-footer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: calc(var(--spacing) * 8);
  padding: calc(var(--spacing) * 12) calc(var(--spacing) * 3) calc(var(--spacing) * 8);
}

.mobile-footer__group {
  display: grid;
  align-content: start;
  gap: calc(var(--spacing) * 3);
}

.mobile-footer__title {
  margin: 0 0 calc(var(--spacing) * 1);
  color: color-mix(in oklch, var(--color-white) 58%, transparent);
  font-size: 0.78rem;
  font-weight: 700;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.mobile-footer__link {
  width: fit-content;
  color: var(--drawer-text);
  font-size: 0.82rem;
  font-weight: 800;
  line-height: 1;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.mobile-footer__link:hover {
  color: color-mix(in oklch, var(--color-white) 74%, var(--drawer-accent));
}

@media (min-width: 480px) {
  .mobile-link__label,
  .mobile-services-toggle__label {
    font-size: 1.65rem;
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
