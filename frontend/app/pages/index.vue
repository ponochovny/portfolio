<script lang="ts" setup>
import { ArrowRightIcon, DownloadIcon } from "@lucide/vue";
// import { experience } from "~/content/experience";
// import { profile, profile?.stackGroups } from "~/content/profile";
// import { featuredProjects } from "~/content/projects";
import HeroConsole from "~/widgets/hero-console.vue";
import ProjectCard from "~/widgets/project-card.vue";

const { data: profile } = await useProfile();
const { data: projects } = await useProjects();
const { data: experience } = await useExperience();

const featuredProjects = computed(
  () => projects.value?.filter((p) => p.featured) || [],
);

const title = `${profile.value?.name} — ${profile.value?.role}`;
const description =
  "Full-stack engineer portfolio: projects in React, Vue, Next, Nuxt, and Astro with case studies, performance metrics, and technical solutions.";

useSeoMeta({
  title: title,
  description: description,
  ogTitle: title,
  ogDescription: description,
  ogType: "website",
  ogUrl: "/",
  twitterCard: "summary_large_image",
});

useHead({
  link: [{ rel: "canonical", href: "/" }],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: profile.value?.name,
        jobTitle: profile.value?.role,
        description: profile.value?.tagline,
        url: "/",
        sameAs:
          profile.value?.socials
            ?.filter((s) => s.href && !s.href.startsWith("mailto:"))
            ?.map((s) => s.href) || [],
        knowsAbout: profile.value?.stackGroups?.flatMap((g) => g.items),
      }),
    },
  ],
});
</script>

<template>
  <div>
    <section class="relative overflow-hidden border-b border-border">
      <div
        class="grid-backdrop pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
      <div
        class="relative mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:py-28"
      >
        <div>
          <p class="label-mono">
            {{ profile?.role }} · {{ profile?.location }} · Since
            {{ profile?.since }}
          </p>
          <h1
            class="mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl"
          >
            I build fast, type-safe, and accessible web products..
          </h1>
          <p
            class="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground"
          >
            {{ profile?.intro }}
          </p>

          <div class="mt-8 flex flex-wrap items-center gap-3">
            <NuxtLink
              to="/projects"
              class="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              View my work
              <ArrowRightIcon class="size-4" />
            </NuxtLink>
            <a
              href="https://t.me/vponochovny"
              class="inline-flex items-center gap-2 rounded-md border border-border-strong px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
            >
              Contact me
            </a>
            <a
              :href="profile?.resumeUrl || ''"
              class="inline-flex items-center gap-2 px-1 py-2.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <DownloadIcon class="size-3.5" />
              Resume PDF
            </a>
          </div>
        </div>

        <HeroConsole :profile="profile" :projects="projects || []" />
      </div>
    </section>

    <section v-if="featuredProjects.length" class="border-b border-border">
      <div class="mx-auto max-w-6xl px-5 py-20">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p class="label-mono">Featured work</p>
            <h2 class="mt-3 text-3xl font-semibold sm:text-4xl">
              Featured work
            </h2>
          </div>
          <NuxtLink
            to="/projects"
            class="inline-flex items-center gap-1.5 font-mono text-xs text-primary transition-colors hover:text-foreground"
          >
            All projects <ArrowRightIcon class="size-3.5" />
          </NuxtLink>
        </div>

        <div class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ProjectCard
            v-for="(project, i) in featuredProjects"
            :key="project._id || i"
            :project="project"
            :priority="i === 0"
          />
        </div>
      </div>
    </section>

    <section
      v-if="profile?.stackGroups?.length"
      class="border-b border-border bg-surface/40"
    >
      <div class="mx-auto max-w-6xl px-5 py-20">
        <p class="label-mono">Stack & philosophy</p>
        <h2 class="mt-3 text-3xl font-semibold sm:text-4xl">
          What and how I work with
        </h2>

        <div
          class="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2"
        >
          <div
            v-for="(group, i) in profile?.stackGroups"
            :key="group.title || i"
            class="bg-card p-5"
          >
            <h3
              class="font-mono text-xs uppercase tracking-widest text-primary"
            >
              {{ group.title }}
            </h3>
            <ul class="mt-4 flex flex-wrap gap-1.5">
              <li
                v-for="item in group.items"
                :key="item.title"
                class="rounded-sm border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
              >
                {{ item.title }}
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-6 grid gap-6 md:grid-cols-3">
          <div
            v-for="p in profile?.philosophy"
            :key="p.title"
            class="border-l-2 border-primary/60 pl-4"
          >
            <h3 class="text-base font-semibold">{{ p.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
              {{ p.body }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section v-if="experience?.length" class="border-b border-border">
      <div class="mx-auto max-w-6xl px-5 py-20">
        <p class="label-mono">Experience</p>
        <h2 class="mt-3 text-3xl font-semibold sm:text-4xl">Experience</h2>

        <ol class="mt-10 space-y-10 border-l border-border pl-6">
          <li v-for="(item, i) in experience" :key="i" class="relative">
            <span
              class="absolute -left-7.25 top-1.5 size-2.5 rounded-full border-2 border-background bg-primary"
              aria-hidden="true"
            />
            <p class="font-mono text-xs text-muted-foreground">
              {{ item.period }}
            </p>
            <h3 class="mt-1.5 text-lg font-semibold">
              {{ item.role }}{{ " " }}
              <span class="font-normal text-muted-foreground"
                >· {{ item.company }}</span
              >
            </h3>
            <p
              class="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground"
            >
              {{ item.summary }}
            </p>
            <ul class="mt-3 max-w-2xl space-y-1.5">
              <li
                v-for="(a, i) in item.achievements"
                :key="i"
                class="flex gap-2 text-sm text-foreground/90"
              >
                <span class="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                {{ a }}
              </li>
            </ul>
            <ul class="mt-3 flex flex-wrap gap-1.5">
              <li
                v-for="(s, i) in item.stack"
                :key="i"
                class="rounded-sm border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
              >
                {{ s.title }}
              </li>
            </ul>
          </li>
        </ol>

        <NuxtLink
          to="/about"
          class="mt-10 inline-flex items-center gap-1.5 font-mono text-xs text-primary transition-colors hover:text-foreground"
        >
          Read more about me <ArrowRightIcon class="size-3.5" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
