<script lang="ts" setup>
const stats = [
  { id: 1, value: "2009", label: "Established" },
  { id: 2, value: "$180M+", label: "Project Delivery" },
  { id: 3, value: "90%", label: "Repeat Clients" },
  { id: 4, value: "Central Florida", label: "Regional Coverage" },
];
</script>
<template>
  <section class="stats-win-section">
    <!-- Window chrome -->
    <div class="stats-win-window">
      <div class="win-titlebar" role="presentation">
        <span>Company Information</span>
        <div class="win-titlebar-buttons" aria-hidden="true">
          <button class="win-titlebar-btn" tabindex="-1">_</button>
          <button class="win-titlebar-btn" tabindex="-1">&#9633;</button>
          <button class="win-titlebar-btn" tabindex="-1">&#x2715;</button>
        </div>
      </div>
      <div class="stats-win-body">
        <ul class="stats-win-list">
          <li v-for="stat in stats" :key="stat.id" class="stats-win-item">
            <div class="stats-win-panel">
              <span class="stats-win-value">{{ stat.value }}</span>
              <span class="stats-win-label">{{ stat.label }}</span>
            </div>
          </li>
        </ul>
        <div class="win-status-bar stats-win-status">
          <span>&#9679;</span>
          <span>4 items loaded</span>
          <div class="stats-sep" />
          <span>Envision Construction Services, Tampa FL</span>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.stats-win-section {
  grid-column: 1 / -1;
  background: var(--color-win-gray-light);
  padding: 24px 16px;
  display: flex;
  justify-content: center;
}

.stats-win-window {
  background: var(--color-win-gray-light);
  box-shadow: var(--win-border-raised);
  width: 100%;
  max-width: 960px;
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

.stats-win-body {
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.stats-win-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;

  @media (min-width: 600px) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.stats-win-item {
  padding: 0;
}

.stats-win-panel {
  background: var(--color-win-white);
  box-shadow: var(--win-border-sunken);
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-align: center;
}

.stats-win-value {
  font-size: clamp(18px, 3vw, 28px);
  font-weight: bold;
  font-family: "Tahoma", sans-serif;
  color: var(--color-win-navy);
  line-height: 1;
}

.stats-win-label {
  font-size: 10px;
  font-family: "Tahoma", sans-serif;
  color: #404040;
  text-transform: uppercase;
  letter-spacing: 0.05em;
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

.stats-sep {
  width: 1px;
  height: 12px;
  background: #808080;
  box-shadow: 1px 0 0 #ffffff;
}
</style>
