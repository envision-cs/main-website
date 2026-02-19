<script setup lang="ts">
const config = useAppConfig();
const { data: locations } = await useFetch('/api/locations');

const items = config.navigationMenuItems;
const services = items.find(item => item.label === 'Services');
const year = new Date().getFullYear();
</script>

<template>
  <footer class="site-footer" aria-label="Site footer">
    <div class="site-footer__inner">
      <div class="site-footer__top">
        <div class="site-footer__brand">
          <Icon
            name="logos:envision"
            size="32"
            aria-hidden="true"
          />
          <p class="site-footer__tagline">
            Built with clarity, precision, and care.
          </p>
        </div>

        <nav class="site-footer__nav" aria-label="Footer navigation">
          <div>
            <h2 class="site-footer__heading">
              Navigate
            </h2>
            <ul class="site-footer__list">
              <li v-for="item in items" :key="item.label">
                <NuxtLink
                  v-if="item.to"
                  :to="item.to"
                  class="site-footer__link"
                >
                  {{ item.label }}
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/contact" class="site-footer__link">
                  Contact
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div>
            <h2 class="site-footer__heading">
              Services
            </h2>
            <ul class="site-footer__list">
              <li v-for="item in services?.children" :key="item.label">
                <NuxtLink
                  v-if="item.to"
                  :to="item.to"
                  class="site-footer__link"
                >
                  {{ item.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </nav>

        <section class="site-footer__locations" aria-label="Office locations">
          <h2 class="site-footer__heading">
            Locations
          </h2>
          <ul class="site-footer__location-list">
            <li
              v-for="location in locations"
              :key="location.id"
              class="site-footer__location-item"
            >
              <p class="site-footer__location-name">
                {{ location.name }}
              </p>
              <address>
                <span>{{ location.address }}</span>
                <span>{{ location.city }}</span>
              </address>
              <a
                v-if="location.phone"
                :href="`tel:${location.phone}`"
                class="site-footer__link"
              >
                {{ location.phone }}
              </a>
              <a
                v-if="location.email"
                :href="`mailto:${location.email}`"
                class="site-footer__link"
              >
                {{ location.email }}
              </a>
            </li>
          </ul>
        </section>
      </div>

      <div class="site-footer__bottom">
        <p>© {{ year }} Envision Construction. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid var(--ui-border);
  background: #fff;
}

.site-footer__inner {
  max-width: var(--ui-container);
  margin-inline: auto;
  padding: 2rem 1rem;

  @media (min-width: 800px) {
    padding: 3rem 2rem;
  }
}

address {
  font-style: normal;
  display: grid;
  gap: 0.15rem;
}

.site-footer__top {
  display: grid;
  gap: 2rem;

  @media (min-width: 960px) {
    grid-template-columns: 1.1fr 1fr 1.2fr;
  }
}

.site-footer__brand {
  display: grid;
  align-content: start;
  gap: 0.75rem;
}

.site-footer__tagline {
  max-width: 30ch;
  color: var(--ui-color-neutral-600);
  line-height: 1.5;
}

.site-footer__nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.site-footer__heading {
  margin: 0 0 0.75rem 0;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ui-color-neutral-600);
}

.site-footer__list,
.site-footer__location-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.5rem;
}

.site-footer__location-list {
  gap: 1rem;
}

.site-footer__location-item {
  display: grid;
  gap: 0.25rem;
}

.site-footer__location-name {
  margin: 0;
  font-weight: 600;
}

.site-footer__link {
  color: inherit;
  text-decoration: none;
  transition: color 140ms ease;
}

.site-footer__link:hover {
  color: var(--ui-primary);
}

.site-footer__link:focus-visible {
  outline: 2px solid var(--ui-primary);
  outline-offset: 2px;
}

.site-footer__bottom {
  margin-top: 1.75rem;
  padding-top: 1rem;
  border-top: 1px solid var(--ui-border);
  color: var(--ui-color-neutral-600);
  font-size: 0.9rem;
}
</style>
