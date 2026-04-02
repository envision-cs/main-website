<script setup lang="ts">
const year = new Date().getFullYear();

const navLinks = [
  { id: 1, to: "/", label: "Home" },
  { id: 2, to: "/services", label: "Services" },
  { id: 3, to: "/projects", label: "Projects" },
  { id: 4, to: "/team", label: "Meet the team" },
  { id: 5, to: "/about", label: "About Us" },
];

const servicesLinks = [
  { id: 1, to: "/services/tenant-improvement", label: "Tenant Improvement" },
  { id: 2, to: "/services/design-build", label: "Design Build" },
  { id: 3, to: "/services/construction-management", label: "Construction Management" },
  { id: 4, to: "/services/enhanced-preconstruction", label: "Enhanced Preconstruction" },
  { id: 5, to: "/services", label: "View all services" },
];
</script>

<template>
  <footer class="footer-win" aria-label="Site footer">
    <!-- Footer window -->
    <div class="footer-win-window">
      <!-- Title bar -->
      <div class="win-titlebar" role="presentation">
        <span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:middle;margin-right:4px">
            <rect width="14" height="14" fill="#1084d0"/>
            <text x="2" y="11" font-size="9" fill="white" font-weight="bold">E</text>
          </svg>
          Envision Construction Services
        </span>
        <div class="win-titlebar-buttons" aria-hidden="true">
          <button class="win-titlebar-btn" tabindex="-1">_</button>
          <button class="win-titlebar-btn" tabindex="-1">&#9633;</button>
          <button class="win-titlebar-btn" tabindex="-1">&#x2715;</button>
        </div>
      </div>

      <!-- Footer body -->
      <div class="footer-win-body">
        <!-- Navigation panel -->
        <div class="footer-win-panel footer-nav-panel">
          <div class="footer-panel-title">Navigate</div>
          <div class="footer-panel-body">
            <nav aria-label="Footer navigation">
              <ul class="footer-win-links">
                <li v-for="link in navLinks" :key="link.id">
                  <NuxtLink :to="link.to" class="footer-win-link">
                    <span aria-hidden="true">&#128196;</span> {{ link.label }}
                  </NuxtLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <!-- Services panel -->
        <div class="footer-win-panel footer-services-panel">
          <div class="footer-panel-title">Services</div>
          <div class="footer-panel-body">
            <nav>
              <ul class="footer-win-links">
                <li v-for="link in servicesLinks" :key="link.id">
                  <NuxtLink :to="link.to" class="footer-win-link">
                    <span aria-hidden="true">&#128196;</span> {{ link.label }}
                  </NuxtLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <!-- Locations panel -->
        <div class="footer-win-panel footer-locations-panel">
          <div class="footer-panel-title">Locations</div>
          <div class="footer-panel-body footer-locations-body">
            <div class="footer-location">
              <div class="footer-location-title">
                <span aria-hidden="true">&#127968;</span> Tampa Office
              </div>
              <p class="footer-location-addr">5000 Acline Drive East<br>Tampa, FL 33619<br>Po Box 89098 Tampa, FL 33689</p>
              <p class="footer-location-phone">(813) 997-0330</p>
            </div>
            <hr class="footer-divider">
            <div class="footer-location">
              <div class="footer-location-title">
                <span aria-hidden="true">&#127968;</span> Pasco Office
              </div>
              <p class="footer-location-addr">5000 Acline Drive East<br>Tampa, FL 33619<br>Po Box 89098 Tampa FL 33689</p>
            </div>
          </div>
        </div>

        <!-- Contact panel -->
        <div class="footer-win-panel footer-contact-panel">
          <div class="footer-panel-title">Start the Conversation</div>
          <div class="footer-panel-body">
            <p class="footer-contact-text">
              From preconstruction through closeout, our process stays direct: listen, plan, execute, cultivate.
            </p>
            <div class="footer-win-sep" />
            <NuxtLink to="/contact" class="win-button win-button-primary">Contact Us</NuxtLink>
            <div class="footer-win-sep" />
            <div class="footer-social-row">
              <NuxtLink to="https://www.facebook.com/envisioncstampa" class="footer-social-btn" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </NuxtLink>
              <NuxtLink to="https://www.linkedin.com/company/envision-cs/" class="footer-social-btn" aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom status bar -->
      <div class="footer-win-bottom">
        <div class="win-status-bar">
          <span>&#9679;</span>
          <span>&copy;{{ year }} Envision Construction Services. All rights reserved.</span>
          <div class="footer-bottom-sep" />
          <span>Tampa, FL</span>
          <div class="footer-bottom-sep" />
          <a href="/privacy" class="footer-bottom-link">Privacy Policy</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-win {
  background: var(--color-win-gray-light);
  padding: 16px 16px 8px;
  border-top: 2px solid #808080;
  box-shadow: inset 0 2px 0 #ffffff;
}

.footer-win-window {
  background: var(--color-win-gray-light);
  box-shadow: var(--win-border-raised);
  max-width: 1100px;
  margin: 0 auto;
}

.win-titlebar {
  background: var(--win-titlebar);
  color: #fff;
  font-weight: bold;
  font-size: 11px;
  font-family: "Tahoma", sans-serif;
  padding: 3px 4px 3px 6px;
  display: flex;
  align-items: center;
  gap: 4px;
  user-select: none;
}

.win-titlebar-buttons {
  margin-left: auto;
  display: flex;
  gap: 2px;
}

.win-titlebar-btn {
  width: 16px;
  height: 14px;
  background: var(--color-win-gray-light);
  box-shadow: var(--win-border-button);
  font-size: 9px;
  font-weight: bold;
  color: var(--color-win-black);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 0;
  padding: 0;
}

.footer-win-body {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  padding: 8px;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1000px) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.footer-win-panel {
  background: var(--color-win-gray-light);
  box-shadow: var(--win-border-raised);
  display: flex;
  flex-direction: column;
}

.footer-panel-title {
  background: linear-gradient(to right, #000080 0%, #404080 100%);
  color: #fff;
  font-size: 10px;
  font-weight: bold;
  font-family: "Tahoma", sans-serif;
  padding: 3px 8px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.footer-panel-body {
  padding: 8px;
  flex: 1;
}

.footer-win-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.footer-win-link {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-family: "Tahoma", sans-serif;
  color: var(--color-win-link);
  text-decoration: underline;
  padding: 1px 2px;
}

.footer-win-link:hover {
  background: var(--color-win-highlight);
  color: var(--color-win-highlight-text);
  text-decoration: none;
}

.footer-locations-body {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.footer-location {}

.footer-location-title {
  font-size: 11px;
  font-weight: bold;
  font-family: "Tahoma", sans-serif;
  color: var(--color-win-navy);
  margin-bottom: 3px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.footer-location-addr {
  font-size: 10px;
  font-family: "Tahoma", sans-serif;
  color: var(--color-win-black);
  line-height: 1.4;
  margin: 0;
}

.footer-location-phone {
  font-size: 10px;
  font-family: "Tahoma", sans-serif;
  color: var(--color-win-black);
  margin: 2px 0 0;
}

.footer-divider {
  height: 0;
  border: 0;
  border-top: 1px solid #808080;
  border-bottom: 1px solid #ffffff;
  margin: 4px 0;
}

.footer-contact-text {
  font-size: 10px;
  font-family: "Tahoma", sans-serif;
  color: var(--color-win-black);
  line-height: 1.45;
  margin: 0 0 8px;
}

.footer-win-sep {
  height: 0;
  border-top: 1px solid #808080;
  border-bottom: 1px solid #ffffff;
  margin: 8px 0;
}

.win-button {
  background: var(--color-win-gray-light);
  box-shadow: var(--win-border-button);
  color: var(--color-win-black);
  font-family: "Tahoma", sans-serif;
  font-size: 11px;
  padding: 3px 14px 4px;
  cursor: pointer;
  border: 0;
  text-decoration: none;
  display: inline-block;
  min-width: 75px;
  text-align: center;
}

.win-button:active {
  box-shadow: var(--win-border-sunken);
  padding: 4px 14px 3px;
}

.win-button-primary {
  outline: 1px solid #000;
  outline-offset: -1px;
}

.footer-social-row {
  display: flex;
  gap: 4px;
}

.footer-social-btn {
  background: var(--color-win-gray-light);
  box-shadow: var(--win-border-button);
  color: var(--color-win-black);
  width: 28px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.footer-social-btn:active {
  box-shadow: var(--win-border-sunken);
}

.footer-win-bottom {
  border-top: 2px solid #808080;
  box-shadow: inset 0 2px 0 #ffffff;
}

.win-status-bar {
  background: var(--color-win-gray-light);
  padding: 2px 8px;
  font-size: 10px;
  font-family: "Tahoma", sans-serif;
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.footer-bottom-sep {
  width: 1px;
  height: 12px;
  background: #808080;
  box-shadow: 1px 0 0 #ffffff;
}

.footer-bottom-link {
  color: var(--color-win-link);
  text-decoration: underline;
  font-size: 10px;
  font-family: "Tahoma", sans-serif;
}

.footer-bottom-link:hover {
  color: var(--color-win-navy);
}
</style>
