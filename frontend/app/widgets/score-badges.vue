<script lang="ts" setup>
// import type { ProjectMetrics } from "~/content/projects";
import { cn } from "~/shared/lib/utils";

const props = defineProps<{
  metrics: NonNullable<ProjectQueryResult>["metrics"];
  class?: string;
}>();

function tone(score: number) {
  if (score >= 95) return "text-success border-success/35";
  if (score >= 80) return "text-primary border-primary/35";
  return "text-muted-foreground border-border";
}

const items = [
  { key: "PERF", value: props.metrics?.performance },
  { key: "A11Y", value: props.metrics?.accessibility },
  { key: "SEO", value: props.metrics?.seo },
].filter(
  (i): i is { key: string; value: number } => typeof i.value === "number",
);
</script>

<template>
  <ul :class="cn('flex flex-wrap items-center gap-1.5', props.class)">
    <li
      v-for="i in items"
      :key="i.key"
      :title="`Lighthouse ${i.key}: ${i.value}`"
      :class="
        cn(
          'flex items-center gap-1.5 rounded-sm border bg-surface/60 px-2 py-1 font-mono text-[10px] tracking-widest',
          tone(i.value),
        )
      "
    >
      <span class="text-muted-foreground">{{ i.key }}</span>
      <span class="font-semibold">{{ i.value }}</span>
    </li>
  </ul>
</template>
