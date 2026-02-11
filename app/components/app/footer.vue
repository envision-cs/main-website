<script setup lang="ts">
const config = useAppConfig();
const { data: locations } = await useFetch('/api/locations');

const items = config.navigationMenuItems;
const services = items.find(item => item.label === 'Services');
</script>

<template>
  <footer>
    <div class="divider">
      <div class="footer-wrapper">
        <div class="main-content">
          <div class="logp">
            <Icon
              name="logos:envision"
              size="30"
              alt="envision construction logo"
            />
          </div>
          <div class="nav-container">
            <nav class="">
              <ul>
                <li v-for="item in items" :key="item.id">
                  <NuxtLink
                    variant="link"
                    :to="item.to"
                    color="neutral"
                  >
                    {{ item.label }}
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    variant="link"
                    to="/contact"
                    color="neutral"
                  >
                    Contact
                  </NuxtLink>
                </li>
              </ul>
              <ul>
                <li v-for="item in services?.children" :key="item.id">
                  <NuxtLink
                    variant="link"
                    :to="item.to"
                    color="neutral"
                  >
                    {{ item.label }}
                  </NuxtLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div class="location-container">
          <ul class="location-wrapper" aria-label="Office locations">
            <li
              v-for="location in locations"
              :key="location.location"
              class="pl-0 min-[800px]:pl-8"
            >
              <address>
                <AppTypography
                  variant="eyebrow-md"
                  tag="h3"
                  class="mb-2"
                >
                  {{ location.location }}
                </AppTypography>
                <AppTypography
                  tag="p"
                  variant="text-lg"
                  class=""
                >
                  {{ location.address }}<br>
                  {{ location.city }}<br>
                  {{ location.phone }}
                </AppTypography>
              </address>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  border-top: 1px solid var(--ui-border);
}

address {
  font-style: normal;
}

.main-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: calc(var(--spacing) * 2);

  nav {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  a:hover {
    color: var(--ui-primary);
  }
}

.footer-wrapper {
  display: grid;
  padding: calc(var(--spacing) * 4);
  grid-template-columns: 1fr;

  @media (min-width: 800px) {
    padding: calc(var(--spacing) * 8);
    grid-template-columns: 1fr 1fr;
  }
}

.location-wrapper {
  display: grid;
  padding-top: 1rem;
  grid-template-columns: 1fr;
  gap: calc(var(--spacing) * 4);

  @media (min-width: 475px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 800px) {
    padding-top: 0;
  }
}

.divider {
  position: relative;
}

.divider::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 0px;
  height: 100%;
  background-color: var(--ui-border);

  @media (min-width: 800px) {
    width: 1px;
  }
}
</style>
