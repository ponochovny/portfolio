<script lang="ts" setup>
// import type { Project } from "~/content/projects";

interface Props {
  items: NonNullable<ProjectQueryResult>["features"];
}

const props = defineProps<Props>();
</script>

<template>
  <div
    class="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2"
  >
    <div v-for="feature in items" :key="feature.title" class="bg-card p-5">
      <h3 class="text-base font-semibold">{{ feature.title }}</h3>
      <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
        {{ feature.body }}
      </p>
    </div>
  </div>
</template>
