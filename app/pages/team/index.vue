<script setup lang="ts">
useSeoMeta({
  title: 'Meet the Team | Envision Construction Services',
  description:
    'Meet the Envision team and learn how each group collaborates to deliver organized, high-quality construction work across Tampa Bay and Central Florida.',
  ogTitle: 'Meet the Team | Envision Construction Services',
  ogDescription:
    "Six teams, one mission. See how Envision's people collaborate to deliver high-quality projects on time and within budget.",
  ogImage: 'https://ik.imagekit.io/pnixsw7lg/main-website/MeetTheTeam.jpg',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Meet the Team | Envision Construction Services',
  twitterDescription:
    "Six teams, one mission. See how Envision's people collaborate to deliver high-quality projects on time and within budget.",
  twitterImage: 'https://ik.imagekit.io/pnixsw7lg/main-website/MeetTheTeam.jpg',
});

const { data } = useFetch('/api/team', {
  key: 'team',
});
</script>

<template>
  <div class="">
    <banner-b
      class="col-start-1 -col-end-1"
      image="https://ik.imagekit.io/pnixsw7lg/main-website/MeetTheTeam.jpg"
      body="Collaborating with Colors (CWC) is how we define teams within our team and their function in relation to Envision. Our six teams—the Orange Team, Gray Team, COL Team, Red Team, Blue Team, and Green Team—collaborate to deliver high-quality projects on time and within budget. We chose to empower our team members by recognizing their strengths, discovering where they best fit into daily operations, and developing a title that best illustrates the value that the team member adds to the company. Meet the Envision team"
    >
      Meet the team
    </banner-b>
    <section-e
      v-for="team in data"
      :key="team.name"
      bgcolor="dark"
      class="team-section"
      no-padding
      :style="{ '--teamColor': team.color }"
    >
      <template #header>
        <div class="team-color" :class="{ '--border': team.color }">
          <section-header-a
            neutral
            :eyebrow="team.role"
            :title="team.name"
            :body="team.description"
          />
        </div>
      </template>
      <template #body>
        <app-team-member-list class="light">
          <li v-for="member in team.team_members" :key="member.name">
            <project-card
              :to="`/team/${member.slug}`"
              :aria-label="member.name"
              :image="member.photo?.url"
              :alt="member.name"
              link-mode="overlay"
              aspect-ratio="3/4"
              image-sizes="(max-width: 768px) 100vw, 300px"
              :image-hover-scale="1.1"
              :outlined="false"
              :meta-border="false"
              class="team-member-card"
            >
              <template #title>
                <app-typography class="h3 team-member-title" variant="heading-md">
                  {{ member.name }}
                </app-typography>
                <app-typography
                  tag="p"
                  variant="text-md"
                  class="team-member-role text-primary-200 dark:text-primary-200"
                >
                  {{ member.title }}
                </app-typography>
              </template>
            </project-card>
          </li>
        </app-team-member-list>
      </template>
    </section-e>
  </div>
</template>

<style scoped>
.team-color {
  border-left: 8px solid var(--teamColor);
}

.team-section {
  --accent-color: #fff;
  display: grid;
  grid-column: 1/-1;
  border-top: 1px solid var(--ui-border);
  color: var(--section-color);
  background: var(--section-bg);
}

.section-head {
  --teamColor: var(--ui-primary);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding-bottom: calc(var(--spacing) * 4);
  gap: calc(var(--spacing) * 3);
}

.team-role {
  width: fit-content;
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.4rem 0.85rem;
  border-left: calc(var(--spacing) * 2) solid var(--teamColor);
}

.team-role-dot {
  width: 0.65rem;
  height: 0.65rem;
  border-radius: 999px;
  flex-shrink: 0;
  background: var(--teamColor);
}

.team-role-label {
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.team-accent {
  width: min(100%, 12rem);
  height: 0.35rem;
  border-radius: 999px;
  background-color: var(--teamColor);
}

.team-description {
  line-height: 1.4;
  max-width: 38ch;
}

.team-member-card {
  :deep(.reveal-card__content) {
    color: white;
  }

  :deep(.reveal-card__meta) {
    justify-content: flex-start;
  }
}

.team-member-title {
  margin-bottom: 0.75rem;
  text-wrap: balance;
}

.team-member-role {
  opacity: 0.85;
}

.team-member-actions {
  display: flex;
  gap: 0.5rem;
  color: #fff;
}

@media (min-width: 1024px) {
  .section-head {
    padding: calc(var(--spacing) * 5);
    gap: calc(var(--spacing) * 3.5);
  }
}
</style>
