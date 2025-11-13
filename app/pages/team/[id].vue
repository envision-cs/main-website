<script setup lang="ts">
const route = useRoute();
const id = computed(() => route.params.id);
const { data: teamMember } = useFetch(`/api/team/${id.value}`);
const router = useRouter();
const title = teamMember.value?.seo?.name || teamMember.value?.name;
useSeoMeta({
  title,
});
</script>

<template>
  <UPage>
    <div class="mt-20">
      <UButton @click="router.back()">
        Back
      </UButton>
    </div>
    <pre>
      {{ teamMember }}
    </pre>
  </UPage>
</template>
