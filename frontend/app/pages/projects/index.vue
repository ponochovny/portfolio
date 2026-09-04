<script lang="ts" setup>
import { useRoute } from "vue-router";
// import { projects, allTech } from "~/content/projects";
import ProjectCard from "~/widgets/project-card.vue";

const { data: projects } = await useProjects();
const allTech = computed(() => {
  const tech =
    projects.value?.map((p) => p.tech?.map((t) => t.title)).flat() || [];
  return [...new Set(tech)];
});
const route = useRoute();
const active = computed(() => {
  const tech = route.query.tech as string;
  return tech && allTech.value.includes(tech) ? tech : "";
});
const list = computed(() => {
  return active.value
    ? projects.value?.filter((p) =>
        p.tech?.some((t) => t.title === active.value),
      )
    : projects.value;
});
</script>

<template>
  <div class="mx-auto max-w-6xl px-5 py-16">
    <p class="label-mono">Projects</p>
    <h1 class="mt-3 text-4xl font-semibold sm:text-5xl">Projects</h1>
    <p class="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
      Each project is structured as a case study: task, role, stack, key
      features, and technical challenges. The technology filter is saved in the
      link.
    </p>

    <div class="mt-8 flex flex-wrap gap-1.5">
      <NuxtLink
        to="/projects"
        class="rounded-sm border px-2.5 py-1 font-mono text-[11px] transition-colors"
        :class="
          active === ''
            ? 'border-primary bg-primary/10 text-primary'
            : 'border-border text-muted-foreground hover:border-border-strong hover:text-foreground'
        "
      >
        All ({{ projects?.length }})
      </NuxtLink>
      <NuxtLink
        v-for="t in allTech"
        :key="t"
        :to="{ path: '/projects', query: { tech: t } }"
        class="rounded-sm border px-2.5 py-1 font-mono text-[11px] transition-colors"
        :class="
          active === t
            ? 'border-primary bg-primary/10 text-primary'
            : 'border-border text-muted-foreground hover:border-border-strong hover:text-foreground'
        "
      >
        {{ t }}
      </NuxtLink>
    </div>

    <div class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <ProjectCard
        v-for="(p, i) in list"
        :key="p._id"
        :project="p"
        :priority="i === 0"
      />
    </div>

    <p
      v-if="list?.length === 0"
      class="mt-10 font-mono text-sm text-muted-foreground"
    >
      No projects with this technology yet.
    </p>
  </div>
</template>
