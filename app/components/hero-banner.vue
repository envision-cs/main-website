<script setup lang="ts">
interface HomeHero {
  title?: string;
  subtitle?: string;
  image?: {
    url?: string;
  } | null;
}

const { data: hero } = useAsyncData<HomeHero>("home-hero", () => $fetch("/api/home-hero"));
</script>

<template>
  <section
    class="hero-win"
    aria-labelledby="hero-title"
    aria-describedby="hero-summary"
    role="region"
  >
    <!-- Marquee ticker at top -->
    <div class="win-marquee-bar" aria-hidden="true">
      <div class="win-marquee-track">
        <span>*** ENVISION CONSTRUCTION SERVICES *** Complex Projects. Simple Accountability. *** Established 2009 *** $180M+ Project Delivery *** 90% Repeat Clients *** Central Florida Coverage *** Click "Start your project" to get started! ***&nbsp;&nbsp;&nbsp;</span>
        <span>*** ENVISION CONSTRUCTION SERVICES *** Complex Projects. Simple Accountability. *** Established 2009 *** $180M+ Project Delivery *** 90% Repeat Clients *** Central Florida Coverage *** Click "Start your project" to get started! ***&nbsp;&nbsp;&nbsp;</span>
      </div>
    </div>

    <!-- Main window panel -->
    <div class="win-hero-window">
      <!-- Title bar -->
      <div class="win-titlebar" role="presentation">
        <span class="win-titlebar-icon" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="14" height="14" fill="#1084d0"/>
            <rect x="2" y="2" width="10" height="10" fill="#ffffff" opacity="0.3"/>
            <text x="2" y="11" font-size="9" fill="white" font-weight="bold">E</text>
          </svg>
        </span>
        <span>Envision CS - Home</span>
        <div class="win-titlebar-buttons" aria-hidden="true">
          <button class="win-titlebar-btn" tabindex="-1" aria-hidden="true">_</button>
          <button class="win-titlebar-btn" tabindex="-1" aria-hidden="true">&#9633;</button>
          <button class="win-titlebar-btn win-titlebar-btn--close" tabindex="-1" aria-hidden="true">&#x2715;</button>
        </div>
      </div>

      <!-- Menu bar inside window -->
      <div class="win-menubar" aria-hidden="true">
        <span class="win-menubar-item">File</span>
        <span class="win-menubar-item">Edit</span>
        <span class="win-menubar-item">View</span>
        <span class="win-menubar-item">Favorites</span>
        <span class="win-menubar-item">Tools</span>
        <span class="win-menubar-item">Help</span>
      </div>

      <!-- Toolbar -->
      <div class="win-toolbar" aria-hidden="true">
        <button class="win-toolbar-btn" tabindex="-1">&#9664; Back</button>
        <button class="win-toolbar-btn" tabindex="-1">Forward &#9654;</button>
        <button class="win-toolbar-btn win-toolbar-btn--stop" tabindex="-1">&#x25A0; Stop</button>
        <button class="win-toolbar-btn" tabindex="-1">&#8635; Refresh</button>
        <button class="win-toolbar-btn" tabindex="-1">&#x2302; Home</button>
        <div class="win-address-bar">
          <span class="win-address-label">Address</span>
          <span class="win-address-input">http://www.envisioncs.com/</span>
          <button class="win-address-go" tabindex="-1">Go</button>
        </div>
      </div>

      <!-- Content area with image -->
      <div class="win-hero-content">
        <div class="win-hero-image-area">
          <NuxtImg
            v-if="hero?.image?.url"
            :src="hero.image.url"
            alt="Exterior view of a residence hall at dusk"
            sizes="100vw sm:640px md:768px lg:1024px xl:1280px"
            fit="cover"
            preload
            format="avif"
            loading="eager"
            class="win-hero-img"
          />
          <div v-else class="win-hero-img-placeholder" />
        </div>

        <div class="win-hero-text-panel">
          <!-- Inner window for text -->
          <div class="win-inner-window">
            <div class="win-titlebar win-titlebar--secondary" role="presentation">
              <span>Project Overview</span>
            </div>
            <div class="win-inner-content">
              <h2 id="hero-title" class="win-hero-title">
                Complex Projects.<br>Simple Accountability
              </h2>
              <hr class="win-separator-h">
              <p id="hero-summary" class="win-hero-summary">
                Local responsiveness. National-level expertise. Zero guesswork on your timeline or budget.
              </p>
              <hr class="win-separator-h">
              <div class="win-hero-actions">
                <NuxtLink to="/contact" class="win-button win-button-primary">Start your project</NuxtLink>
                <NuxtLink to="/projects" class="win-button">Explore Portfolio</NuxtLink>
              </div>
              <div class="win-status-bar win-hero-status">
                <span>&#9679;</span>
                <span>Ready</span>
                <div class="win-separator-v" style="height:14px" />
                <span>Tampa, FL</span>
                <div class="win-separator-v" style="height:14px" />
                <span>Est. 2009</span>
              </div>
            </div>
          </div>

          <!-- Stats panel -->
          <div class="win-stats-panel">
            <div class="win-titlebar win-titlebar--secondary" role="presentation">
              <span>Company Statistics</span>
            </div>
            <div class="win-stats-grid">
              <div class="win-stat-item">
                <span class="win-stat-value">2009</span>
                <span class="win-stat-label">Established</span>
              </div>
              <div class="win-stat-divider" />
              <div class="win-stat-item">
                <span class="win-stat-value">$180M+</span>
                <span class="win-stat-label">Project Delivery</span>
              </div>
              <div class="win-stat-divider" />
              <div class="win-stat-item">
                <span class="win-stat-value">90%</span>
                <span class="win-stat-label">Repeat Clients</span>
              </div>
              <div class="win-stat-divider" />
              <div class="win-stat-item">
                <span class="win-stat-value">FL</span>
                <span class="win-stat-label">Coverage</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Status bar at bottom -->
      <div class="win-hero-bottom-status" aria-hidden="true">
        <div class="win-status-bar">
          <span class="win-status-icon">&#x1F310;</span>
          <span>Done</span>
          <div class="win-sep-v" />
          <span>Internet zone</span>
        </div>
      </div>
    </div>

    <!-- Win2K taskbar at very bottom -->
    <div class="win-taskbar" aria-hidden="true">
      <button class="win-start-btn">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect width="7" height="7" fill="#FF0000"/><rect x="7" y="0" width="7" height="7" fill="#00AA00"/><rect x="0" y="7" width="7" height="7" fill="#0000FF"/><rect x="7" y="7" width="7" height="7" fill="#FFFF00"/></svg>
        <strong>Start</strong>
      </button>
      <div class="win-taskbar-sep" />
      <button class="win-task-item win-task-item--active">
        <span>&#128196;</span> Envision CS - Home
      </button>
      <button class="win-task-item">
        <span>&#128196;</span> Our Projects
      </button>
      <div class="win-taskbar-right">
        <span class="win-tray-icon">&#128266;</span>
        <span class="win-tray-icon">&#128246;</span>
        <span class="win-clock">{{ new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-win {
  grid-column: 1 / -1;
  background: var(--color-win-teal);
  background-image:
    radial-gradient(circle at 30% 40%, rgba(0,128,128,0.6) 0%, transparent 50%),
    radial-gradient(circle at 70% 60%, rgba(0,0,128,0.3) 0%, transparent 50%);
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 8px 8px 0;
}

/* Marquee bar */
.win-marquee-bar {
  background: var(--color-win-navy);
  color: #ffffff;
  font-size: 11px;
  font-family: "Tahoma", sans-serif;
  height: 20px;
  overflow: hidden;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  box-shadow: var(--win-border-sunken);
  flex-shrink: 0;
}

.win-marquee-track {
  display: flex;
  white-space: nowrap;
  animation: win-marquee-scroll 30s linear infinite;
}

@keyframes win-marquee-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* Main window */
.win-hero-window {
  background: var(--color-win-gray-light);
  box-shadow: var(--win-border-raised), 6px 6px 0 rgba(0,0,0,0.4);
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  min-height: 0;
}

/* Title bar */
.win-titlebar {
  background: var(--win-titlebar);
  color: #ffffff;
  font-weight: bold;
  font-size: 11px;
  font-family: "Tahoma", sans-serif;
  padding: 3px 4px 3px 6px;
  display: flex;
  align-items: center;
  gap: 4px;
  user-select: none;
  flex-shrink: 0;
}

.win-titlebar--secondary {
  font-size: 10px;
  padding: 2px 4px;
}

.win-titlebar-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
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
  font-family: "Tahoma", sans-serif;
}

.win-titlebar-btn--close:hover {
  background: #cc0000;
  color: white;
}

/* Menu bar */
.win-menubar {
  display: flex;
  align-items: center;
  gap: 0;
  background: var(--color-win-gray-light);
  padding: 2px 4px;
  font-size: 11px;
  font-family: "Tahoma", sans-serif;
  border-bottom: 1px solid #808080;
  flex-shrink: 0;
}

.win-menubar-item {
  padding: 2px 8px;
  cursor: default;
  user-select: none;
}

.win-menubar-item:hover {
  background: var(--color-win-highlight);
  color: var(--color-win-highlight-text);
}

/* Toolbar */
.win-toolbar {
  display: flex;
  align-items: center;
  gap: 2px;
  background: var(--color-win-gray-light);
  padding: 3px 6px;
  border-bottom: 2px solid #808080;
  box-shadow: 0 2px 0 #ffffff;
  flex-shrink: 0;
  flex-wrap: wrap;
}

.win-toolbar-btn {
  background: var(--color-win-gray-light);
  box-shadow: var(--win-border-button);
  color: var(--color-win-black);
  font-size: 10px;
  font-family: "Tahoma", sans-serif;
  padding: 2px 8px 3px;
  cursor: pointer;
  border: 0;
  white-space: nowrap;
}

.win-toolbar-btn:active {
  box-shadow: var(--win-border-sunken);
}

.win-toolbar-btn--stop {
  color: #cc0000;
}

.win-address-bar {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
  min-width: 0;
  margin-left: 8px;
}

.win-address-label {
  font-size: 10px;
  font-family: "Tahoma", sans-serif;
  white-space: nowrap;
  color: var(--color-win-black);
}

.win-address-input {
  flex: 1;
  min-width: 0;
  background: #ffffff;
  box-shadow: var(--win-border-sunken);
  padding: 2px 6px;
  font-size: 11px;
  font-family: "Courier New", monospace;
  color: var(--color-win-navy);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.win-address-go {
  background: var(--color-win-gray-light);
  box-shadow: var(--win-border-button);
  color: var(--color-win-black);
  font-size: 10px;
  font-family: "Tahoma", sans-serif;
  padding: 2px 8px 3px;
  cursor: pointer;
  border: 0;
}

/* Content area */
.win-hero-content {
  display: grid;
  grid-template-columns: 1fr;
  flex: 1;
  overflow: hidden;
  min-height: 0;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 1.5fr 1fr;
  }
}

.win-hero-image-area {
  position: relative;
  overflow: hidden;
  min-height: 200px;
  border-right: 2px solid #808080;
}

.win-hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.7) contrast(0.9);
  display: block;
}

.win-hero-img-placeholder {
  width: 100%;
  height: 100%;
  background: #336699;
}

/* Text panel */
.win-hero-text-panel {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  overflow-y: auto;
  background: var(--color-win-gray-light);
}

/* Inner window */
.win-inner-window {
  background: var(--color-win-gray-light);
  box-shadow: var(--win-border-raised);
}

.win-inner-content {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.win-hero-title {
  font-size: clamp(16px, 2.5vw, 26px);
  font-weight: bold;
  font-family: "Tahoma", "MS Sans Serif", sans-serif;
  color: var(--color-win-navy);
  line-height: 1.25;
  margin: 0;
}

.win-hero-summary {
  font-size: 11px;
  font-family: "Tahoma", sans-serif;
  color: var(--color-win-black);
  line-height: 1.45;
  margin: 0;
}

.win-separator-h {
  height: 0;
  border: 0;
  border-top: 1px solid #808080;
  border-bottom: 1px solid #ffffff;
  margin: 4px 0;
}

.win-hero-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.win-button {
  background: var(--color-win-gray-light);
  box-shadow: var(--win-border-button);
  color: var(--color-win-black);
  font-family: "Tahoma", "MS Sans Serif", sans-serif;
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

.win-hero-status {
  font-size: 10px;
  margin-top: 4px;
}

.win-status-bar {
  background: var(--color-win-gray-light);
  border-top: 1px solid #808080;
  padding: 2px 6px;
  font-size: 10px;
  font-family: "Tahoma", sans-serif;
  display: flex;
  align-items: center;
  gap: 6px;
}

.win-sep-v {
  width: 1px;
  background: #808080;
  align-self: stretch;
}

/* Stats panel */
.win-stats-panel {
  background: var(--color-win-gray-light);
  box-shadow: var(--win-border-raised);
}

.win-stats-grid {
  display: flex;
  align-items: stretch;
  padding: 8px 12px;
  gap: 0;
}

.win-stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  flex: 1;
  padding: 4px 8px;
}

.win-stat-divider {
  width: 1px;
  background: #808080;
  box-shadow: 1px 0 0 #ffffff;
  align-self: stretch;
  margin: 4px 0;
}

.win-stat-value {
  font-size: 16px;
  font-weight: bold;
  font-family: "Tahoma", sans-serif;
  color: var(--color-win-navy);
  line-height: 1;
}

.win-stat-label {
  font-size: 9px;
  font-family: "Tahoma", sans-serif;
  color: #404040;
  text-align: center;
  line-height: 1.2;
}

/* Bottom status */
.win-hero-bottom-status {
  flex-shrink: 0;
}

/* Taskbar */
.win-taskbar {
  background: var(--color-win-gray-light);
  box-shadow:
    inset 0 1px 0 #ffffff,
    inset 0 2px 0 #d4d0c8;
  height: 30px;
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 2px;
  flex-shrink: 0;
  margin-top: 8px;
  position: relative;
  z-index: 10;
}

.win-start-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  background: var(--color-win-gray-light);
  box-shadow: var(--win-border-button);
  border: 0;
  padding: 2px 8px 3px 6px;
  font-size: 11px;
  font-family: "Tahoma", sans-serif;
  font-weight: bold;
  cursor: pointer;
  height: 22px;
}

.win-start-btn:active {
  box-shadow: var(--win-border-sunken);
}

.win-taskbar-sep {
  width: 2px;
  height: 100%;
  border-left: 1px solid #808080;
  border-right: 1px solid #ffffff;
  margin: 0 2px;
}

.win-task-item {
  display: flex;
  align-items: center;
  gap: 4px;
  background: var(--color-win-gray-light);
  box-shadow: var(--win-border-raised);
  border: 0;
  padding: 2px 10px 3px;
  font-size: 11px;
  font-family: "Tahoma", sans-serif;
  cursor: pointer;
  height: 22px;
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.win-task-item--active {
  box-shadow: var(--win-border-sunken);
  font-weight: bold;
}

.win-taskbar-right {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 4px;
  box-shadow: var(--win-border-sunken);
  padding: 2px 8px;
  height: 22px;
  font-size: 11px;
  font-family: "Tahoma", sans-serif;
}

.win-tray-icon {
  font-size: 14px;
  line-height: 1;
}

.win-clock {
  font-size: 11px;
  font-family: "Tahoma", sans-serif;
}
</style>
    <div class="col-span-full row-span-full">
      <NuxtImg
        v-if="hero.image?.url"
        :src="hero.image.url"
        alt="Exterior view of a residence hall at dusk"
        sizes="100vw sm:640px md:768px lg:1024px xl:1280px 2xl:1536px"
        fit="cover"
        preload
        format="avif"
        loading="eager"
        class="image"
      />
    </div>
    <div class="hero-vignette" aria-hidden="true" />
    <app-gradient-overlay direction="top" class="overlay" />

    <div class="content site-max">
      <div class="hero-layout">
        <div class="hero-frame">
          <app-typography id="hero-title" tag="h2" variant="heading-huge" bold class="hero-title">
            Complex Projects. Simple Accountability
          </app-typography>

          <app-typography id="hero-summary" tag="p" variant="text-xl" class="hero-summary">
            Local responsiveness. National-level expertise. Zero guesswork on your timeline or
            budget.
          </app-typography>

          <div class="hero-actions">
            <Button variant="primary" size="md" to="/contact">Start your project</Button>
            <Button variant="outline" size="md" to="/projects">Explore Our Portfolio</Button>
          </div>
        </div>

        <home-featured-projects-carousel class="hero-projects" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  grid-column: 1/-1;
  display: grid;
  grid-template-columns: 1rem 1fr 1rem;
  grid-template-rows: 1fr 1fr 1fr;
  isolation: isolate;
  height: 100dvh;
  background:
    linear-gradient(135deg, rgb(9 15 25 / 72%) 0%, rgb(9 15 25 / 14%) 45%, rgb(9 15 25 / 56%) 100%),
    oklch(0.2 0.03 245);
}

.content {
  display: flex;
  grid-column: 1/-1;
  grid-row: 1/-1;
  width: 100%;
  z-index: 3;
  align-items: center;

  padding: clamp(1.25rem, 2vw, 2.5rem);

  @media (min-width: 800px) {
    padding: clamp(2rem, 4vw, 4.5rem);
  }
}

.hero-layout {
  display: grid;
  gap: clamp(1.5rem, 3vw, 3rem);
  align-items: end;
  width: 100%;
  height: 100%;

  @media (min-width: 1100px) {
    grid-template-columns: minmax(0, 1.15fr) minmax(22rem, 38rem);
  }
}

.overlay {
  z-index: 2;
  opacity: 0.9;
}

.image {
  animation: hero-drift 18s ease-in-out infinite alternate;
  transform: scale(1.04);
  transform-origin: center center;
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.hero-vignette,
.hero-glow,
.hero-gridline {
  grid-column: 1/-1;
  grid-row: 1/-1;
  pointer-events: none;
}

.hero-vignette {
  z-index: 1;
  background:
    radial-gradient(circle at 68% 34%, rgb(174 205 255 / 5%), transparent 20%),
    radial-gradient(
      circle at 50% 72%,
      rgb(6 11 18 / 0%),
      rgb(6 11 18 / 40%) 70%,
      rgb(6 11 18 / 60%) 100%
    );
}

.hero-frame {
  display: grid;
  gap: clamp(0.75rem, 1vw, 1.2rem);
  align-self: end;
  max-width: 44rem;

  @media (min-width: 799px) {
    align-self: center;
  }
}

.hero-eyebrow {
  margin: 0;
  color: var(--color-envision-gray-300);
  font-size: clamp(0.72rem, 0.9vw, 0.82rem);
  letter-spacing: 0.22em;
  line-height: 1;
  text-transform: uppercase;
  animation: hero-reveal 800ms cubic-bezier(0.19, 1, 0.22, 1) both;
}

.hero-title {
  color: var(--color-white);
  text-wrap: balance;
  letter-spacing: 1%;
  line-height: 0.92;
  animation: hero-reveal 1040ms cubic-bezier(0.19, 1, 0.22, 1) both;
  max-width: 25ch;

  span {
    color: var(--color-envision-blue-500);
    font-style: italic;
  }

  span:nth-of-type(2) {
    color: var(--color-envision-green-500);
    font-style: italic;
  }
}

.hero-summary {
  margin: 0;
  max-width: 60ch;
  color: var(--color-envision-gray-300);
  line-height: 1.35;
  text-wrap: balance;
  animation: hero-reveal 1160ms cubic-bezier(0.19, 1, 0.22, 1) both;
}

.hero-actions {
  display: flex;
  flex: wrap;
  flex-direction: column;
  gap: calc(var(--spacing) * 4);
  padding-top: clamp(0.5rem, 1vw, 0.85rem);
  animation: hero-reveal 1280ms cubic-bezier(0.19, 1, 0.22, 1) both;

  @media (min-width: 600px) {
    flex-direction: row;
  }
}

.hero-projects {
  animation: hero-reveal 1380ms cubic-bezier(0.19, 1, 0.22, 1) both;
  justify-self: end;
  width: 100%;
}

@keyframes hero-drift {
  from {
    transform: scale(1.04) translate3d(0, 0, 0);
  }

  to {
    transform: scale(1.1) translate3d(-1.5%, -1%, 0);
  }
}

@keyframes hero-reveal {
  from {
    opacity: 0.01;
    transform: translateY(28px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 799px) {
  .content {
    align-items: flex-start;
  }

  .hero-frame {
    width: 100%;
    margin-block-end: 0.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .image,
  .hero-eyebrow,
  .hero-rule,
  .hero-title,
  .hero-summary,
  .hero-actions,
  .hero-projects {
    animation: none;
    transform: none;
  }
}
</style>
