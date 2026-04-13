<script setup lang="ts">
const year = new Date().getFullYear();

const navLinks = [
  { id: 1, to: "/", label: "Home" },
  { id: 2, to: "/services", label: "Services" },
  { id: 3, to: "/projects", label: "Projects" },
  { id: 4, to: "/team", label: "Meet the team" },
  { id: 5, to: "/about", label: "About Us" },
];
const { services: servicesLinks } = await useServicesList();
// const servicesLinks = [
//  { id: 1, to: "/services/tenant-improvement", label: "Tenant Improvement" },
//  { id: 2, to: "/services/design-build", label: "Design Build" },
//  { id: 3, to: "/services/construction-management", label: "Construction Management" },
//  { id: 4, to: "/services/enhanced-preconstruction", label: "Enhanced Preconstruction" },
//  { id: 5, to: "/services", label: "View all services" },
// ];
</script>

<template>
  <footer class="relative" aria-label="Site footer">
    <div class="footer-head">
      <NuxtLink class="brand-link" to="/" aria-label="Envision home">
        <Icon name="logos:envision" size="30" alt="envision construction logo" />
      </NuxtLink>
    </div>
    <section class="site-footer">
      <div class="navigation">
        <nav aria-label="Footer navigation">
          <h3>Navigate</h3>
          <ul>
            <li v-for="link in navLinks" :key="link.id" class="footer-link">
              <NuxtLink :to="link.to">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
        <nav>
          <h3>Services</h3>
          <ul>
            <li v-for="link in servicesLinks" :key="link.id" class="footer-link">
              <NuxtLink :to="link.to">
                {{ link.title }}
              </NuxtLink>
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
              <p class="max-w-sm text-envision-gray-300">
                5000 Acline Drive East Tampa, FL 33619 Po Box 89098 Tampa, FL 33689
              </p>
              <p class="text-envision-gray-300">(813) 997-0330</p>
            </div>
            <div>
              <h4>Pasco Office</h4>
              <p class="max-w-sm text-envision-gray-300">
                5000 Acline Drive East Tampa, FL 33619 Po Box 89098 Tampa FL 33689
              </p>
            </div>
          </div>
        </div>
        <div class="contact">
          <h3>Start the conversation</h3>
          <p class="max-w-sm mb-3 text-envision-gray-300">
            From preconstruction through closeout, our process stays direct: listen, plan, execute,
            cultivate.
          </p>
          <my-button to="/contact" size="sm" variant="outline">Contact Us</my-button>
        </div>
      </div>
      <div class="date-socials">
        <div>
          <NuxtLink class="mr-2 mb-0" to="https://www.facebook.com/envisioncstampa">
            <Icon name="ri:facebook-box-fill" size="32" />
          </NuxtLink>
          <NuxtLink class="mb-0" to="https://www.linkedin.com/company/envision-cs/">
            <Icon name="ri:linkedin-box-fill" size="32" />
          </NuxtLink>
        </div>
        <p>©{{ year }}Envision Construction. All rights reserved.</p>
      </div>
    </section>
  </footer>
</template>

<style scoped>
footer {
  background-color: var(--color-envision-gray-800);
  padding: calc(var(--spacing) * 4);
  color: var(--color-envision-blue-50);
  overflow: hidden;
}

.footer-head {
  margin-inline: auto;
  max-width: 1200px;
  margin-top: calc(var(--spacing));
  margin-bottom: calc(var(--spacing) * 4);
}

.site-footer {
  display: grid;
  margin-inline: auto;
  max-width: 1200px;
  grid-template-areas:
    "a"
    "b"
    "c";

  @media (min-width: 768px) {
    grid-template-areas:
      "a b"
      "c c";
    gap: calc(var(--spacing) * 8);
  }
}

h3 {
  font-size: var(--text-lg);
  letter-spacing: 2%;
  font-weight: 600;
  margin-bottom: calc(var(--spacing) * 2);
}

.footer-link {
  color: var(--color-envision-gray-300);
  font-size: var(--text-base);
  opacity: 1;
  transition: opacity 300ms ease-in-out;
  cursor: pointer;
  margin-bottom: calc(var(--spacing) * 2);
}

.navigation:has(a:hover) a:not(:hover) {
  opacity: 0.4;
}

.navigation {
  grid-area: a;
  display: flex;
  flex-wrap: wrap;
  gap: calc(var(--spacing) * 6);
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
