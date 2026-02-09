<script setup lang="ts">
const config = useAppConfig();
const { data: locations } = await useFetch('/api/locations');

const items = config.navigationMenuItems;
const services = items.find(item => item.label === 'Services');
const year = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <div class="footer__frame">
      <div class="footer__grid">
        <div class="brand">
          <div class="brand__mark">
            <Icon
              name="logos:envision"
              size="30"
              alt="envision construction logo"
            />
          </div>
          <AppTypography
            tag="p"
            variant="text-md"
            class="brand__tagline"
          >
            Aligning vision and action.
          </AppTypography>
        </div>

        <nav class="nav" aria-label="Footer navigation">
          <ul class="nav__list">
            <li v-for="item in items" :key="item.id">
              <NuxtLink class="nav__link" :to="item.to">
                {{ item.label }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink class="nav__link" to="/contact">
                Contact
              </NuxtLink>
            </li>
          </ul>
          <ul class="nav__list">
            <li v-for="item in services?.children" :key="item.id">
              <NuxtLink class="nav__link" :to="item.to">
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <div class="locations">
          <ul class="locations__grid" aria-label="Office locations">
            <li
              v-for="location in locations"
              :key="location.location"
              class="locations__card"
            >
              <address>
                <AppTypography
                  variant="eyebrow-md"
                  tag="h3"
                  class="locations__name"
                >
                  {{ location.location }}
                </AppTypography>
                <AppTypography
                  tag="p"
                  variant="text-md"
                  class="locations__text"
                >
                  {{ location.address }}<br>
                  {{ location.city }}<br>
                  {{ location.phone }}
                </AppTypography>
              </address>
            </li>
          </ul>
        </div>

        <div class="cta">
          <NuxtLink class="cta__button" to="/contact">
            Contact us
          </NuxtLink>
        </div>
      </div>

      <div class="footer__bottom">
        <div class="footer__meta">
          <NuxtLink class="meta__link" to="/contact">
            Request a proposal
          </NuxtLink>
          <NuxtLink class="meta__link" to="/about">
            Company
          </NuxtLink>
        </div>
        <p>© {{ year }} Envision Construction Services. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  border-top: 1px solid var(--ui-border);
  background: var(--ui-bg);
}

address {
  font-style: normal;
}

.footer__frame {
  position: relative;
  padding: clamp(2.5rem, 4vw, 4.5rem);
}

.footer__grid {
  display: grid;
  gap: clamp(2rem, 4vw, 3.5rem);

  @media (min-width: 900px) {
    grid-template-columns: minmax(220px, 1.05fr) minmax(240px, 1fr) minmax(320px, 1.2fr);
    align-items: start;
  }
}

.brand__tagline {
  max-width: 36ch;
  color: var(--ui-text);
  margin-top: 0.9rem;
  font-weight: 500;
}

.nav {
  display: grid;
  gap: 2rem;
  border-left: 1px solid var(--ui-border);
  padding-left: 2rem;

  @media (min-width: 700px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.nav__list {
  display: grid;
  gap: 0.6rem;
}

.nav__link {
  display: inline-flex;
  padding-block: 0.2rem;
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease;
}

.nav__link:hover {
  color: var(--ui-primary);
}

.locations__grid {
  display: grid;
  gap: 1.25rem;
  border-left: 1px solid var(--ui-border);
  padding-left: 2rem;

  @media (min-width: 480px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.locations__card {
  padding-right: 1rem;
}

.locations__name {
  margin-bottom: 0.4rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--ui-text-muted);
}

.locations__text {
  color: var(--ui-text);
}

.cta {
  display: flex;
  align-items: end;
  justify-content: flex-end;
}

.cta__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 220px;
  padding: 1rem 1.5rem;
  background: var(--ui-text);
  color: var(--ui-bg);
  text-decoration: none;
  letter-spacing: 0.02em;
}

.footer__bottom {
  margin-top: clamp(2rem, 3vw, 3rem);
  padding-top: 1.5rem;
  border-top: 1px solid var(--ui-border);
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
  color: var(--ui-text-muted);
}

.footer__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.meta__link {
  color: inherit;
  text-decoration: none;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  font-size: 0.75rem;
}

@media (max-width: 899px) {
  .nav,
  .locations__grid {
    border-left: none;
    padding-left: 0;
  }

  .cta {
    justify-content: flex-start;
  }
}
</style>
