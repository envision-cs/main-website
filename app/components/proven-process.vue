<script setup lang="ts">
const process = [
  {
    id: 1,
    order: "01",
    title: "Listen",
    description:
      "Every project begins with thoughtful listening. We take time to understand your vision, goals, and constraints. Through discovery meetings, site reviews, and clear communication, we lay the foundation for a partnership built on trust and alignment.",
  },
  {
    id: 2,
    order: "02",
    title: "Plan",
    description:
      "Before any work begins, we bring certainty to the process. From budget-aligned designs and permitting to early trade coordination and risk mitigation, we focus on eliminating surprises and protecting your timeline from day one.",
  },
  {
    id: 3,
    order: "03",
    title: "Execute",
    description:
      "With the plan in place, we deliver with precision. Using tools like Procore, we provide full visibility, weekly updates, and proactive oversight. Our team owns the outcome, communicates clearly, and protects your project through to the final walkthrough.",
  },
  {
    id: 4,
    order: "04",
    title: "Cultivate",
    description:
      "Our work doesn't end at closeout. We stay engaged with system training, 30-60-90 day check-ins, and a one-year walkthrough. The goal: ensure your space performs, your team is supported, and your trust in us grows long after the build is done.",
  },
];
</script>

<template>
  <section class="process-win-section">
    <div class="process-win-window">
      <!-- Window title bar -->
      <div class="win-titlebar" role="presentation">
        <span>Our Proven Process</span>
        <div class="win-titlebar-buttons" aria-hidden="true">
          <button class="win-titlebar-btn" tabindex="-1">_</button>
          <button class="win-titlebar-btn" tabindex="-1">&#9633;</button>
          <button class="win-titlebar-btn" tabindex="-1">&#x2715;</button>
        </div>
      </div>

      <!-- Description panel -->
      <div class="process-win-desc">
        <div class="process-win-desc-inner">
          <p>
            Our proven process brings structure and consistency to every project. We listen, plan, and
            execute to reduce risk, maintain alignment, and deliver on time, on budget, and with
            complete transparency.
          </p>
        </div>
      </div>

      <!-- Tabs (decorative) -->
      <div class="process-win-tabs" aria-hidden="true">
        <button class="process-win-tab process-win-tab--active">Phases</button>
        <button class="process-win-tab">Timeline</button>
        <button class="process-win-tab">Tools</button>
      </div>

      <!-- Process steps grid -->
      <div class="process-win-body">
        <ul class="process-win-list">
          <li v-for="(item, idx) in process" :key="item.id" class="process-win-item">
            <div class="process-win-item-inner">
              <!-- Step number as folder icon -->
              <div class="process-win-icon">
                <svg width="32" height="28" viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M0 4h12l4 4h16v20H0V4z" :fill="idx === 0 ? '#1084d0' : idx === 1 ? '#008000' : idx === 2 ? '#808080' : '#404080'" />
                  <path d="M0 2h10l2 2h-12z" :fill="idx === 0 ? '#1084d0' : idx === 1 ? '#008000' : idx === 2 ? '#808080' : '#404080'" opacity="0.7"/>
                  <text x="16" y="22" text-anchor="middle" font-size="12" font-weight="bold" fill="white" font-family="Tahoma">{{ item.order }}</text>
                </svg>
              </div>
              <h3 class="process-win-title">{{ item.title }}</h3>
              <p class="process-win-text">{{ item.description }}</p>
              <div class="process-win-footer">
                <span class="process-win-badge">Step {{ item.order }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="win-status-bar process-win-status">
        <span>&#9679;</span>
        <span>4 steps</span>
        <div class="process-sep" />
        <span>Envision CS Methodology</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.process-win-section {
  grid-column: 1 / -1;
  background: var(--color-win-gray-light);
  padding: 16px;
  display: flex;
  justify-content: center;
}

.process-win-window {
  background: var(--color-win-gray-light);
  box-shadow: var(--win-border-raised);
  width: 100%;
  max-width: 1100px;
  display: flex;
  flex-direction: column;
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

.process-win-desc {
  padding: 8px;
}

.process-win-desc-inner {
  background: var(--color-win-white);
  box-shadow: var(--win-border-sunken);
  padding: 10px 12px;
  font-size: 11px;
  font-family: "Tahoma", sans-serif;
  line-height: 1.5;

  p {
    margin: 0;
  }
}

.process-win-tabs {
  display: flex;
  gap: 2px;
  padding: 0 8px;
  border-bottom: 2px solid #808080;
}

.process-win-tab {
  background: var(--color-win-gray-light);
  color: var(--color-win-black);
  font-size: 11px;
  font-family: "Tahoma", sans-serif;
  padding: 3px 12px 4px;
  border: 0;
  cursor: pointer;
  border-top: 2px solid #ffffff;
  border-left: 1px solid #808080;
  border-right: 1px solid #808080;
  margin-bottom: -2px;
  position: relative;
}

.process-win-tab--active {
  background: var(--color-win-gray-light);
  border-bottom: 2px solid var(--color-win-gray-light);
  font-weight: bold;
  z-index: 1;
}

.process-win-body {
  padding: 8px;
  background: var(--color-win-gray-light);
}

.process-win-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.process-win-item {
  background: var(--color-win-gray-light);
  box-shadow: var(--win-border-raised);
}

.process-win-item-inner {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
}

.process-win-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.process-win-title {
  font-size: 14px;
  font-weight: bold;
  font-family: "Tahoma", sans-serif;
  color: var(--color-win-navy);
  margin: 0;
  text-align: center;
}

.process-win-text {
  font-size: 10px;
  font-family: "Tahoma", sans-serif;
  color: var(--color-win-black);
  line-height: 1.45;
  margin: 0;
  flex: 1;
  background: var(--color-win-white);
  box-shadow: var(--win-border-sunken);
  padding: 8px;
}

.process-win-footer {
  display: flex;
  justify-content: flex-end;
}

.process-win-badge {
  font-size: 9px;
  font-family: "Tahoma", sans-serif;
  color: #606060;
  background: var(--color-win-white);
  box-shadow: var(--win-border-sunken);
  padding: 1px 6px;
}

.win-status-bar {
  background: var(--color-win-gray-light);
  border-top: 1px solid #808080;
  padding: 2px 8px;
  font-size: 10px;
  font-family: "Tahoma", sans-serif;
  display: flex;
  align-items: center;
  gap: 6px;
}

.process-sep {
  width: 1px;
  height: 12px;
  background: #808080;
  box-shadow: 1px 0 0 #ffffff;
}
</style>
