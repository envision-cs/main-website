<script setup lang="ts">
// const config = useAppConfig();
// const { data: locations } = await useFetch('/api/locations');
// const items = config.navigationMenuItems;
// const services = items.find(item => item.label === 'Services');
// const featuredServices = computed(() => services?.children?.slice(0, 4) ?? []);
const year = new Date().getFullYear();
</script>

<template>
  <footer aria-label="Site footer">
    <section class="site-footer">
      <div class="navigation">
        <nav>
          <p>Navigate</p>
          <ul>
            <li>
              <NuxtLink>Home</NuxtLink>
            </li>
            <li>
              <NuxtLink>Services</NuxtLink>
            </li>
            <li>
              <NuxtLink>Projects</NuxtLink>
            </li>
            <li>
              <NuxtLink>Meet the team</NuxtLink>
            </li>
            <li>
              <NuxtLink>About Us</NuxtLink>
            </li>
          </ul>
        </nav>
        <nav>
          <p>Services</p>
          <ul>
            <li>
              <NuxtLink>Tenant Improvement</NuxtLink>
            </li>
            <li>
              <NuxtLink>Design Build</NuxtLink>
            </li>
            <li>
              <NuxtLink>Construction Managment</NuxtLink>
            </li>
            <li>
              <NuxtLink>Enhanced Preconstruction</NuxtLink>
            </li>
            <li>
              <NuxtLink>View all services</NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
      <div class="location-contact">
        <div class="locations-container">
          <h3>Locations</h3>
          <div class="location-wrapper">
            <div>
              <h4>Tampa Office</h4>
              <p class="max-w-sm">
                5000 Acline Drive East Tampa, FL 33619 Po Box 89098 Tampa, FL 33689
              </p>
              <p>(813) 997-0330</p>
            </div>
            <div>
              <h4>Pasco Office</h4>
              <p class="max-w-sm">
                5000 Acline Drive East Tampa, FL 33619 Po Box 89098 Tampa FL 33689
              </p>
            </div>
          </div>
        </div>
        <div class="contact">
          <h3>Start the conversation</h3>
          <p class="max-w-sm">
            From preconstruction through closeout, our process stays direct: listen, plan, execute,
            cultivate.
          </p>
          <NuxtLink>Contact Us</NuxtLink>
        </div>
      </div>
      <div class="date-socials">
        <div>
          <NuxtLink>Linkedin</NuxtLink>
          <NuxtLink>Facebook</NuxtLink>
        </div>
        <p>
          ©{{ year }}Envision Construction. All rights reserved.
        </p>
      </div>
    </section>
  </footer>
</template>

<style scoped>
footer {
  padding: calc(var(--spacing) * 4);
}

.site-footer {
  display: grid;
  margin-inline: auto;
  max-width: 1200px;
  grid-template-areas:
    'a'
    'b'
    'c';

  @media (min-width: 768px) {
    grid-template-areas:
      'a b'
      'c c';
    gap: calc(var(--spacing) * 8);
  }
}

.navigation {
  grid-area: a;
  display: flex;
  flex-wrap: wrap;
  gap: calc(var(--spacing) * 4);
}

.location-contact {
  grid-area: b;
  display: grid;
  gap: calc(var(--spacing) * 4);
}

.location-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: calc(var(--spacing) * 3);
}

.date-socials {
  grid-area: c;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
