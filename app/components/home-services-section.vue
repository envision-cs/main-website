<script setup lang="ts">
interface ServiceLink {
  number: string;
  name: string;
  to: string;
}

interface CoverageStat {
  value: string;
  label: string;
}

// Display labels differ from the footer wording on purpose (e.g. "Design-Build"
// keeps its hyphen); the URLs are the live service pages.
const services: ServiceLink[] = [
  { number: '01', name: 'Construction Management', to: '/services/construction-management' },
  { number: '02', name: 'Design-Build', to: '/services/design-build' },
  { number: '03', name: 'Enhanced Preconstruction', to: '/services/enhanced-preconstruction' },
  { number: '04', name: 'Specialty Projects Division', to: '/services/specialty-projects-division' },
  { number: '05', name: 'Tenant Improvements', to: '/services/tenant-improvements' },
];

const coverageStats: CoverageStat[] = [
  { value: '2009', label: 'Year Established' },
  { value: '200+', label: 'Projects Delivered. On Time & On Budget.' },
  { value: '90%', label: 'Repeat Clients' },
];
</script>

<template>
  <section class="home-services">
    <div class="home-services__inner">
      <!-- What we do -->
      <div class="home-services__header">
        <p class="kicker kicker--green">
          <span class="kicker__bar" aria-hidden="true" />
          <span class="kicker__label">What we do</span>
        </p>
        <h2 class="home-services__headline">
          Five Services.<br><span class="home-services__headline-strong">One Standard.</span>
        </h2>
      </div>

      <!-- Five services -->
      <div class="svc-grid">
        <NuxtLink v-for="svc in services" :key="svc.number" :to="svc.to" class="svc-cell">
          <i class="svc-mark" aria-hidden="true" />
          <span class="svc-num" aria-hidden="true">{{ svc.number }}</span>
          <span class="svc-body">
            <span class="svc-name">{{ svc.name }}</span>
            <span class="svc-arrow" aria-hidden="true">&#8594;</span>
          </span>
        </NuxtLink>
      </div>

      <!-- Regional coverage -->
      <div class="cov-grid">
        <div class="cov-headline">
          <p class="kicker kicker--blue">
            <span class="kicker__bar" aria-hidden="true" />
            <span class="kicker__label">Regional coverage</span>
          </p>
          <h3 class="cov-title">
            Greater Tampa Bay +<br><span class="cov-title-strong">Central Florida</span>
          </h3>
        </div>
        <div v-for="stat in coverageStats" :key="stat.label" class="cov-stat">
          <span class="cov-stat__value">{{ stat.value }}</span>
          <span class="cov-stat__label">{{ stat.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-services {
  --navy: #0f2233;
  --green: #59ba48;
  --blue: #1b95d2;
  --hairline: rgb(255 255 255 / 0.18);

  grid-column: 1 / -1;
  background: var(--navy);
  color: #fff;
  -webkit-font-smoothing: antialiased;
}

.home-services__inner {
  max-width: 1800px;
  margin-inline: auto;
  padding: 60px 48px 68px;
}

/* Kicker (green bar + label) */
.kicker {
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 0;
}

.kicker__bar {
  width: 24px;
  height: 2px;
}

.kicker__label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.kicker--green .kicker__bar {
  background: var(--green);
}

.kicker--green .kicker__label {
  color: var(--green);
}

.kicker--blue .kicker__bar {
  background: var(--blue);
}

.kicker--blue .kicker__label {
  color: var(--blue);
}

/* Header */
.home-services__header {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding-bottom: 20px;
}

.home-services__headline {
  margin: 0;
  font-weight: 300;
  font-size: clamp(28px, 2.6vw, 40px);
  line-height: 1.02;
  letter-spacing: -0.02em;
}

.home-services__headline-strong {
  font-weight: 600;
}

/* Five services grid */
.svc-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  column-gap: 20px;
}

.svc-cell {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 4px 12px 12px 0;
  color: inherit;
  text-decoration: none;
  transition: opacity 180ms ease;
}

.svc-mark {
  position: absolute;
  top: 12px;
  left: -4px;
  width: 9px;
  height: 9px;
  opacity: 0;
  background: var(--green);
  transition: opacity 180ms ease;
  clip-path: polygon(
    45% 0, 55% 0, 55% 45%, 100% 45%, 100% 55%, 55% 55%,
    55% 100%, 45% 100%, 45% 55%, 0 55%, 0 45%, 45% 45%
  );
}

.svc-num {
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.18em;
  color: rgb(255 255 255 / 0.34);
}

.svc-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.svc-name {
  font-weight: 500;
  font-size: 19px;
  line-height: 1.25;
  letter-spacing: -0.01em;
  color: rgb(255 255 255 / 0.92);
  transition: color 180ms ease;
}

.svc-arrow {
  font-size: 17px;
  line-height: 1;
  color: var(--blue);
  transition: transform 180ms ease, color 180ms ease;
}

/* Hover: dim the row, keep the hovered cell lit */
.svc-grid:hover .svc-cell {
  opacity: 0.5;
}

.svc-cell:hover {
  opacity: 1;
}

.svc-cell:hover .svc-name {
  color: #fff;
}

.svc-cell:hover .svc-arrow {
  transform: translateX(7px);
  color: var(--green);
}

.svc-cell:hover .svc-mark {
  opacity: 1;
}

.svc-cell:active .svc-name {
  color: var(--green);
}

.svc-cell:focus-visible {
  outline: 2px solid var(--green);
  outline-offset: -2px;
}

/* Regional coverage */
.cov-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  column-gap: 20px;
  align-items: start;
  margin-top: 20px;
  padding-top: 18px;
  border-top: 1px solid var(--hairline);
}

.cov-headline {
  grid-column: span 2;
  align-self: end;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cov-title {
  margin: 0;
  font-weight: 300;
  font-size: clamp(28px, 2.9vw, 46px);
  line-height: 1.04;
  letter-spacing: -0.02em;
  text-wrap: balance;
}

.cov-title-strong {
  font-weight: 600;
}

.cov-stat {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 4px;
}

.cov-stat__value {
  font-weight: 300;
  font-size: clamp(32px, 2.4vw, 40px);
  line-height: 1;
  letter-spacing: -0.02em;
}

.cov-stat__label {
  font-size: 13px;
  line-height: 1.4;
  max-width: 20ch;
  color: rgb(255 255 255 / 0.62);
}

/* Tablet */
@media (max-width: 1180px) {
  .svc-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 4px;
  }

  .cov-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    row-gap: 34px;
  }

  .cov-headline {
    grid-column: 1 / -1;
  }
}

/* Phone */
@media (max-width: 720px) {
  .home-services__inner {
    padding-inline: 24px;
  }

  .svc-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .svc-cell {
    padding-bottom: 18px;
  }

  .cov-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

/* Touch devices: don't dim the row on hover */
@media (hover: none) {
  .svc-grid:hover .svc-cell {
    opacity: 1;
  }
}

/* Reduced motion: keep colors, drop movement */
@media (prefers-reduced-motion: reduce) {
  .svc-cell,
  .svc-name,
  .svc-arrow,
  .svc-mark {
    transition-property: color, opacity;
  }

  .svc-cell:hover .svc-arrow {
    transform: none;
  }
}
</style>
