<script setup lang="ts">
const { data } = useFetch('/api/team', {
  key: 'team',
});
</script>

<template>
  <div class="site-grid">
    <app-banner-b image="/greater-tampa-realtors-02.jpg" class="col-start-1 -col-end-1">
      <template #title>
        Envision
      </template>
      Meet the team
    </app-banner-b>
    <app-section-a
      v-for="team in data"
      :key="team.name"
      class="team-section"
    >
      <template #header>
        <div class="section-head">
          <app-typography tag="h2" variant="heading-lg">
            {{ team.name }}
          </app-typography>
          <div
            class="w-80 h-3"
            :class="[team.color]"
            :style="{
              backgroundColor: team.color,
            }"
          />
          <app-typography tag="p" variant="heading-md">
            {{ team.role }}
          </app-typography>
          <app-typography
            tag="p"
            variant="text-lg"
            class="mt-auto"
          >
            {{ team.description }}
          </app-typography>
        </div>
      </template>
      <template #body>
        <app-team-member-list>
          <app-team-member-card
            v-for="member in team.members"
            :key="member.name"
            :path="member.path"
            :name="member.name"
            :title="member.title"
            :image="member.image"
            :linkedin="member.linkedin"
            :email="member.email"
          />
        </app-team-member-list>
      </template>
    </app-section-a>
  </div>
</template>

<style scoped>
.team-section {
  display: grid;
  grid-column: 1/-1;
}

.section-head {
  display: flex;
  padding: calc(var(--spacing) * 4);
  flex-direction: column;
  gap: calc(var(--spacing) * 3);
}
</style>
