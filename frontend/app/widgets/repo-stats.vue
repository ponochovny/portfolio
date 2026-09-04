<script lang="ts" setup>
import type { ProjectMetrics } from "~/content/projects";

const props = defineProps<{
  metrics: NonNullable<ProjectQueryResult>["metrics"];
  className?: string;
}>();

const parts: string[] = [];
if (props.metrics?.commits) parts.push(`${props.metrics?.commits} commits`);
if (props.metrics?.stars) parts.push(`${props.metrics?.stars} stars`);
if (props.metrics?.lastUpdated) {
  parts.push(
    `updated ${new Date(props.metrics?.lastUpdated).toLocaleDateString(
      "ru-RU",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      },
    )}`,
  );
}
</script>

<template>
  <p className="font-mono text-[11px] text-muted-foreground">
    {{ parts.join(" · ") }}
  </p>
</template>
