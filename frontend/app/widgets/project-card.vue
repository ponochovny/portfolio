<script lang="ts" setup>
// import type { Project } from "@/content/projects";
import ScoreBadges from "./score-badges.vue";
import RepoStats from "./repo-stats.vue";
import { ArrowUpRightIcon } from "@lucide/vue";
import type { ProjectQueryResult } from "#build/types/sanity-typegen.js";

defineProps<{
  project: ProjectQueryResult;
  priority: boolean;
}>();
</script>

<template>
  <article
    class="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-border-strong"
  >
    <NuxtLink
      :to="{ path: `/projects/${project?.slug}` }"
      class="relative block aspect-16/10 overflow-hidden border-b border-border bg-surface"
    >
      <NuxtImg
        :src="project?.coverUrl || ''"
        :alt="`Project cover image ${project?.title}`"
        :loading="priority ? 'eager' : 'lazy'"
        width="1280"
        height="800"
        class="size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
      />
    </NuxtLink>

    <div class="flex flex-1 flex-col gap-4 p-5">
      <div class="flex items-baseline justify-between gap-4">
        <h3 class="text-lg font-semibold">
          <NuxtLink :to="{ path: `/projects/${project?.slug}` }">
            {{ project?.title }}
          </NuxtLink>
        </h3>
        <span class="font-mono text-xs text-muted-foreground">{{
          project?.year
        }}</span>
      </div>

      <p class="text-sm leading-relaxed text-muted-foreground">
        {{ project?.summary }}
      </p>

      <ul v-if="project?.tech?.length" class="flex flex-wrap gap-1.5">
        <li
          v-for="t in project?.tech?.slice(0, 4)"
          :key="t.title"
          class="rounded-sm border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
        >
          {{ t.title }}
        </li>
      </ul>

      <div class="mt-auto space-y-3 pt-2">
        <ScoreBadges :metrics="project?.metrics" />
        <RepoStats :metrics="project?.metrics" />
        <NuxtLink
          :to="{ path: `/projects/${project?.slug}` }"
          class="inline-flex items-center gap-1.5 font-mono text-xs text-primary transition-colors hover:text-foreground"
        >
          Read case
          <ArrowUpRightIcon class="size-3.5" />
        </NuxtLink>
      </div>
    </div>
  </article>
</template>
