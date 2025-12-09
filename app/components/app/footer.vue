<script setup lang="ts">
const config = useAppConfig();
const { data: locations } = await useFetch('/api/locations');

const items = config.navigationMenuItems;
const services = items.find(item => item.label === 'Services');
</script>

<template>
  <footer>
    <div class="footer-wrapper">
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
              <NuxtLink :to="item.to">
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
          <ul>
            <li v-for="item in services?.children" :key="item.id">
              <NuxtLink :to="item.to">
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
      <div class="location-container">
        <div class="location-wrapper">
          <app-location-card
            v-for="location in locations"
            :key="location.id"
            :title="location.location"
            :address="location.address"
            :phone="location.phone"
            :email="location.email"
          />
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-wrapper {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
}
.nav-container {
  grid-column: 1 / 5;
  padding: calc(var(--spacing) * 4);
}
.location-container {
  grid-column: 5 / -1;
}

nav {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.location-wrapper {
  display: flex;
  flex-wrap: wrap;
}
</style>
