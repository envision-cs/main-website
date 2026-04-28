<!-- eslint-disable @stylistic/quotes, @stylistic/no-multiple-empty-lines -->
<script setup lang="ts">
definePageMeta({ layout: "layout-a" });
useSeoMeta({
  title: "Tenant Improvements | Envision",
  description:
    "Tenant improvement construction for active offices, healthcare facilities, faith-based spaces, education facilities, hospitality, and retail environments.",
});
</script>

<template>
  <main class="tenant-improvement">
    <section class="tenant-hero" aria-labelledby="tenant-hero-title">
      <NuxtImg
        src="/TPA_ASC_Restrooms_Hero.jpg"
        alt="Completed tenant improvement restroom interior"
        class="tenant-hero__image"
        fit="cover"
        format="webp"
        sizes="100vw"
        width="1920"
        height="1080"
        preload
      />
      <div class="tenant-hero__overlay" aria-hidden="true" />

      <div class="tenant-hero__content">
        <app-typography tag="p" variant="eyebrow-md" class="tenant-section-tag">
          Tenant Improvements
        </app-typography>
        <app-typography
          id="tenant-hero-title"
          tag="h1"
          variant="heading-huge"
          class="tenant-hero__title"
        >
          Your operations continue. <span>Your space transforms.</span>
        </app-typography>
        <app-typography tag="p" variant="text-xl" class="tenant-hero__body">
          When we complete a tenant improvement, we are walking into your home. We treat it that
          way, from the first conversation to the final walkthrough.
        </app-typography>
        <app-button to="/contact" icon="i-lucide-arrow-right">Tell us about your space</app-button>
      </div>
    </section>

    <section class="tenant-split tenant-split--light" aria-labelledby="tenant-respect-title">
      <div class="tenant-split__copy">
        <app-typography tag="p" variant="eyebrow-md" class="tenant-section-tag">
          Built Around You
        </app-typography>
        <app-typography id="tenant-respect-title" tag="h2" variant="heading-lg">
          Not every contractor can work in a live environment. We've been doing it for over a
          decade.
        </app-typography>
        <div class="tenant-copy-stack">
          <app-typography tag="p" variant="text-lg">
            Envision has delivered tenant improvements across active campuses, occupied offices,
            operating healthcare facilities, and live hospitality environments. We understand the
            nuances of working in your space while you are still using it.
          </app-typography>
          <app-typography tag="p" variant="text-lg">
            The standard is not just completing the scope. It is protecting your people, your
            guests, and your operations throughout every phase of construction while delivering the
            space you envisioned.
          </app-typography>
        </div>
      </div>

      <figure class="tenant-split__media">
        <NuxtImg
          src="/MaternityBathroom_Vanity.jpg"
          alt="Finished tenant improvement interior with updated fixtures and finishes"
          fit="cover"
          format="webp"
          sizes="sm:100vw md:42vw"
          width="900"
          height="1200"
          loading="lazy"
        />
      </figure>
    </section>

    <section class="tenant-operations" aria-labelledby="tenant-operations-title">
      <div class="tenant-section-heading">
        <app-typography tag="p" variant="eyebrow-md" class="tenant-section-tag">
          Active Operations Protection
        </app-typography>
        <app-typography id="tenant-operations-title" tag="h2" variant="heading-lg">
          How we keep your world running while we build.
        </app-typography>
        <app-typography tag="p" variant="text-lg" class="tenant-section-heading__body">
          Every tenant improvement scope is planned around your schedule, not ours.
        </app-typography>
      </div>

      <div class="tenant-operations__grid">
        <article class="tenant-operations__item">
          <app-typography tag="h3" variant="heading-sm" class="tenant-operations__title">
            Phased Construction Sequencing
          </app-typography>
          <app-typography tag="p" variant="text-md" class="tenant-operations__body">
            Work is planned around your schedule, not ours. We sequence around your peak hours,
            events, and operational needs from day one.
          </app-typography>
        </article>
        <article class="tenant-operations__item">
          <app-typography tag="h3" variant="heading-sm" class="tenant-operations__title">
            Negative Air And Dust Containment
          </app-typography>
          <app-typography tag="p" variant="text-md" class="tenant-operations__body">
            In sensitive environments like healthcare, hospitality, and occupied offices, we
            implement full dust barriers and negative air pressure where required.
          </app-typography>
        </article>
        <article class="tenant-operations__item">
          <app-typography tag="h3" variant="heading-sm" class="tenant-operations__title">
            After-Hours And Weekend Work
          </app-typography>
          <app-typography tag="p" variant="text-md" class="tenant-operations__body">
            When operations cannot pause, we work around them. After-hours and weekend scheduling is
            standard practice, not an exception.
          </app-typography>
        </article>
        <article class="tenant-operations__item">
          <app-typography tag="h3" variant="heading-sm" class="tenant-operations__title">
            Daily Communication
          </app-typography>
          <app-typography tag="p" variant="text-md" class="tenant-operations__body">
            Every day you know what is happening: access points, noise windows, site conditions, and
            what to expect next.
          </app-typography>
        </article>
      </div>
    </section>

    <section class="tenant-sectors" aria-labelledby="tenant-sectors-title">
      <div class="tenant-section-heading">
        <app-typography tag="p" variant="eyebrow-md" class="tenant-section-tag">
          Where We Work
        </app-typography>
        <app-typography id="tenant-sectors-title" tag="h2" variant="heading-lg">
          Environments we know well.
        </app-typography>
        <app-typography tag="p" variant="text-lg" class="tenant-sectors__sub">
          Each one requires a different approach. We've built in all of them.
        </app-typography>
      </div>

      <ul class="tenant-sectors__grid" role="list">
        <li class="tenant-sectors__item">
          <span class="tenant-sectors__icon">
            <UIcon name="i-lucide-briefcase-business" aria-hidden="true" />
          </span>
          <app-typography tag="p" variant="text-md" class="tenant-sectors__label">
            Corporate offices
          </app-typography>
        </li>
        <li class="tenant-sectors__item">
          <span class="tenant-sectors__icon">
            <UIcon name="i-lucide-activity" aria-hidden="true" />
          </span>
          <app-typography tag="p" variant="text-md" class="tenant-sectors__label">
            Healthcare facilities
          </app-typography>
        </li>
        <li class="tenant-sectors__item">
          <span class="tenant-sectors__icon">
            <UIcon name="i-lucide-church" aria-hidden="true" />
          </span>
          <app-typography tag="p" variant="text-md" class="tenant-sectors__label">
            Faith-based spaces
          </app-typography>
        </li>
        <li class="tenant-sectors__item">
          <span class="tenant-sectors__icon">
            <UIcon name="i-lucide-shield-check" aria-hidden="true" />
          </span>
          <app-typography tag="p" variant="text-md" class="tenant-sectors__label">
            Educational facilities
          </app-typography>
        </li>
        <li class="tenant-sectors__item">
          <span class="tenant-sectors__icon">
            <UIcon name="i-lucide-heart" aria-hidden="true" />
          </span>
          <app-typography tag="p" variant="text-md" class="tenant-sectors__label">
            Hospitality and retail
          </app-typography>
        </li>
      </ul>
    </section>

    <section class="tenant-split tenant-split--dark" aria-labelledby="tenant-scopes-title">
      <div class="tenant-split__copy">
        <app-typography tag="p" variant="eyebrow-md" class="tenant-section-tag">
          Typical Scopes
        </app-typography>
        <app-typography id="tenant-scopes-title" tag="h2" variant="heading-lg">
          What we deliver.
        </app-typography>
        <ul class="tenant-scopes" role="list">
          <li>Corporate office build-outs and interior renovations</li>
          <li>Healthcare facility renovations</li>
          <li>Educational facility upgrades</li>
          <li>Faith-based interior renovations</li>
          <li>Hospitality and retail fit-outs</li>
          <li>Shell-to-finish build-outs</li>
        </ul>
      </div>

      <figure class="tenant-split__media">
        <NuxtImg
          src="/greater-tampa-realtors-03.jpg"
          alt="Tenant improvement construction progress inside an active office"
          fit="cover"
          format="webp"
          sizes="sm:100vw md:42vw"
          width="900"
          height="1000"
          loading="lazy"
        />
      </figure>
    </section>

    <section class="tenant-proof" aria-labelledby="tenant-proof-title">
      <div class="tenant-proof__copy">
        <app-typography tag="p" variant="eyebrow-md" class="tenant-section-tag">
          Featured Project
        </app-typography>
        <app-typography id="tenant-proof-title" tag="h2" variant="heading-lg">
          Greater Tampa Realtors: 17,000 SF Interior Office Renovation
        </app-typography>
        <div class="tenant-copy-stack">
          <app-typography tag="p" variant="text-lg">
            GTAR's office had not been renovated in approximately 15 years. The scope came with a
            fixed budget, scope uncertainties from the age of the building, and missing details in
            the design documents, all while staff remained fully operational throughout
            construction.
          </app-typography>
          <app-typography tag="p" variant="text-lg">
            Envision worked collaboratively with the design team to find solutions that fit the
            environment, budget, and schedule. We sourced comparable products, adjusted design where
            needed, and set up hard barriers to protect staff safety and maintain air quality
            throughout every phase.
          </app-typography>
        </div>
        <ul class="tenant-proof__highlights" role="list">
          <li>17,000 SF active office renovation with staff remaining operational</li>
          <li>Hard barriers and air quality controls maintained throughout construction</li>
          <li>
            Budget constraints navigated through product substitution and design collaboration
          </li>
          <li>Delivered within the client's fixed budget without scope reduction</li>
          <li>
            Modernized layout and finishes the client was excited to share with their team and
            clients
          </li>
        </ul>
      </div>

      <figure class="tenant-proof__media">
        <NuxtImg
          src="/greater-tampa-realtors-01.jpg"
          alt="Completed Greater Tampa Realtors tenant improvement office renovation"
          fit="cover"
          format="webp"
          sizes="sm:100vw md:42vw"
          width="900"
          height="1000"
          loading="lazy"
        />
      </figure>
    </section>

    <section class="tenant-cta" aria-labelledby="tenant-cta-title">
      <app-typography id="tenant-cta-title" tag="h2" variant="heading-lg">
        Ready to transform your space?
      </app-typography>
      <app-typography tag="p" variant="text-lg" class="tenant-cta__body">
        Tell us about your environment, your timeline, and what you are trying to achieve. We'll
        tell you exactly how we would approach it.
      </app-typography>
      <app-button to="/contact" variant="outline" fill="secondary" icon="i-lucide-arrow-right">
        Tell us about your space
      </app-button>
    </section>

    <section class="tenant-promise" aria-label="Envision promise">
      <span>Envision's promise</span>
      <strong>Total Transparency. Or We Make It Right.</strong>
    </section>
  </main>
</template>

<style scoped>
.tenant-improvement {
  background-color: var(--color-envision-gray-900);
  color: var(--color-white);
}

.tenant-section-tag {
  color: var(--ui-secondary);
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.tenant-hero {
  position: relative;
  min-height: min(760px, 92vh);
  display: grid;
  align-items: end;
  overflow: clip;
  isolation: isolate;
}

.tenant-hero__image,
.tenant-hero__overlay {
  position: absolute;
  inset: 0;
}

.tenant-hero__image {
  z-index: -2;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tenant-hero__overlay {
  z-index: -1;
  background:
    linear-gradient(
      90deg,
      color-mix(in srgb, var(--color-envision-gray-900) 96%, transparent) 0%,
      color-mix(in srgb, var(--color-envision-blue-900) 70%, transparent) 46%,
      transparent 100%
    ),
    linear-gradient(to top, var(--color-envision-gray-900) 0%, transparent 58%);
}

.tenant-hero__content {
  display: grid;
  gap: calc(var(--spacing) * 5);
  width: min(100%, 78rem);
  margin-inline: auto;
  padding: calc(var(--spacing) * 10) calc(var(--spacing) * 6);
}

.tenant-hero__title {
  max-width: 12ch;
  color: var(--color-white);
}

.tenant-hero__body {
  max-width: 36rem;
  color: color-mix(in srgb, var(--color-white) 74%, var(--color-envision-blue-100));
}

.tenant-split,
.tenant-proof,
.tenant-operations,
.tenant-sectors,
.tenant-cta,
.tenant-promise {
  padding: clamp(3rem, 7vw, 6rem) calc(var(--spacing) * 6);
}

.tenant-split,
.tenant-proof {
  display: grid;
  gap: clamp(2rem, 5vw, 5rem);
  align-items: center;
}

.tenant-split--light,
.tenant-proof {
  background-color: var(--color-white);
  color: var(--color-envision-gray-900);
}

.tenant-split--dark,
.tenant-operations {
  background-color: var(--color-envision-gray-900);
  color: var(--color-white);
}

.tenant-split__copy,
.tenant-proof__copy,
.tenant-section-heading {
  display: grid;
  gap: calc(var(--spacing) * 4);
}

.tenant-copy-stack {
  display: grid;
  gap: calc(var(--spacing) * 4);
  color: var(--text-color-muted);
}

.tenant-split--dark .tenant-copy-stack,
.tenant-operations__body {
  color: color-mix(in srgb, var(--color-white) 64%, var(--color-envision-gray-300));
}

.tenant-split__media,
.tenant-proof__media {
  min-height: clamp(18rem, 38vw, 30rem);
  margin: 0;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--ui-border) 62%, transparent);
}

.tenant-split__media img,
.tenant-proof__media img {
  display: block;
  width: 100%;
  height: 100%;
  min-height: inherit;
  object-fit: cover;
}

.tenant-section-heading {
  width: min(100%, 78rem);
  margin-inline: auto;
  margin-bottom: calc(var(--spacing) * 9);
}

.tenant-section-heading__body,
.tenant-sectors__sub,
.tenant-cta__body {
  color: color-mix(in srgb, var(--color-white) 60%, var(--color-envision-gray-300));
}

.tenant-sectors__grid,
.tenant-scopes,
.tenant-proof__highlights {
  list-style: none;
  margin: 0;
  padding: 0;
}

.tenant-operations__grid {
  display: grid;
  gap: 1px;
  width: min(100%, 78rem);
  margin-inline: auto;
}

.tenant-operations__item {
  display: grid;
  gap: calc(var(--spacing) * 3);
  padding: calc(var(--spacing) * 6);
  border-left: 3px solid var(--ui-secondary);
  background-color: color-mix(in srgb, var(--color-white) 5%, transparent);
}

.tenant-operations__title {
  color: var(--color-white);
}

.tenant-sectors {
  background-color: color-mix(in srgb, var(--color-envision-blue-50) 35%, var(--color-white));
  color: var(--color-envision-gray-900);
}

.tenant-sectors .tenant-section-heading__body,
.tenant-sectors__sub {
  color: var(--text-color-muted);
}

.tenant-sectors__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1px;
  width: min(100%, 78rem);
  margin-inline: auto;
}

.tenant-sectors__item {
  display: grid;
  gap: calc(var(--spacing) * 4);
  place-items: center;
  min-height: 11rem;
  padding: calc(var(--spacing) * 5);
  border: 1px solid color-mix(in srgb, var(--ui-border) 42%, transparent);
  background-color: var(--color-white);
  text-align: center;
}

.tenant-sectors__icon {
  display: grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  color: var(--color-envision-green-700);
  background-color: color-mix(in srgb, var(--ui-secondary) 18%, var(--color-white));
}

.tenant-sectors__icon :deep(svg) {
  width: 1.35rem;
  height: 1.35rem;
}

.tenant-sectors__label {
  color: var(--color-envision-gray-900);
  font-weight: 600;
}

.tenant-scopes {
  display: grid;
  gap: calc(var(--spacing) * 2);
  margin-top: calc(var(--spacing) * 3);
}

.tenant-scopes li,
.tenant-proof__highlights li {
  position: relative;
  padding-left: calc(var(--spacing) * 5);
}

.tenant-scopes li {
  padding-block: calc(var(--spacing) * 3);
  color: color-mix(in srgb, var(--color-white) 74%, var(--color-envision-gray-300));
  border-bottom: 1px solid color-mix(in srgb, var(--ui-border) 36%, transparent);
}

.tenant-scopes li::before,
.tenant-proof__highlights li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 1.15em;
  width: 0.45rem;
  height: 0.45rem;
  background-color: var(--ui-secondary);
}

.tenant-proof__highlights {
  display: grid;
  gap: calc(var(--spacing) * 3);
  color: var(--text-color-muted);
}

.tenant-cta {
  display: grid;
  justify-items: start;
  gap: calc(var(--spacing) * 5);
  background-color: var(--ui-secondary);
  color: var(--color-envision-gray-900);
}

.tenant-cta :deep(.base) {
  color: inherit;
}

.tenant-cta__body {
  max-width: 38rem;
  color: color-mix(in srgb, var(--color-envision-gray-900) 78%, var(--ui-secondary));
}

.tenant-promise {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: calc(var(--spacing) * 3);
  padding-block: calc(var(--spacing) * 6);
  color: color-mix(in srgb, var(--color-white) 54%, var(--color-envision-gray-300));
  border-top: 1px solid color-mix(in srgb, var(--ui-border) 34%, transparent);
}

.tenant-promise strong {
  color: var(--ui-secondary);
  font-weight: 600;
}

@media (min-width: 700px) {
  .tenant-hero__content {
    padding-inline: calc(var(--spacing) * 10);
  }

  .tenant-split,
  .tenant-proof {
    grid-template-columns: minmax(0, 1.08fr) minmax(18rem, 0.78fr);
  }

  .tenant-split--dark {
    grid-template-columns: minmax(0, 0.92fr) minmax(18rem, 0.82fr);
  }

  .tenant-operations__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .tenant-sectors__grid {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .tenant-split,
  .tenant-proof,
  .tenant-operations,
  .tenant-sectors,
  .tenant-cta {
    padding-inline: max(calc(var(--spacing) * 12), calc((100vw - 90rem) / 2 + 3rem));
  }

  .tenant-hero__content {
    padding-inline: max(calc(var(--spacing) * 12), calc((100vw - 90rem) / 2 + 3rem));
  }

  .tenant-cta {
    justify-items: center;
    text-align: center;
  }
}
</style>
