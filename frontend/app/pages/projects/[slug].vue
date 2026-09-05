<script lang="ts" setup>
import { ArrowLeftIcon, ArrowRightIcon, ExternalLinkIcon } from "@lucide/vue";
import { profile } from "~/content/profile";
import { getNeighbours, getProject } from "~/content/projects";
import FeatureList from "~/entities/project/ui/feature-list.vue";
import Section from "~/entities/project/ui/section.vue";
import LazyVideo from "~/widgets/lazy-video.vue";
import RepoStats from "~/widgets/repo-stats.vue";
import ScoreBadges from "~/widgets/score-badges.vue";

const route = useRoute();
const slug = route.params.slug as string;

// const project = getProject(slug);

const { data: project } = await useProject(slug);

const title = project.value
  ? `${project.value.title} — project by ${profile.name}`
  : "Project not found";

useSeoMeta({
  title,
  description: project.value?.summary,
  ogTitle: title,
  ogDescription: project.value?.summary,
  ogType: "article",
  ogUrl: `/projects/${slug}`,
  robots: !project.value ? "noindex, nofollow" : "index, follow",
});

useHead({
  link: [{ rel: "canonical", href: `/projects/${slug}` }],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareSourceCode",
        name: project.value?.title,
        description: project.value?.summary,
        programmingLanguage: "TypeScript",
        author: { "@type": "Person", name: profile.name },
        keywords: project.value?.tech?.map((t) => t.title).join(", "),
        codeRepository: project.value?.links?.repo,
      }),
    },
  ],
});

const { prev, next } = getNeighbours(project.value?.slug ?? "");
</script>

<template>
  <div v-if="!project" class="mx-auto max-w-3xl px-5 py-24 text-center">
    <h1 class="text-3xl font-semibold">Project not found</h1>
    <p class="mt-3 text-sm text-muted-foreground">
      Maybe the link is outdated. Check out all projects.
    </p>
    <NuxtLink
      to="/projects"
      class="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
    >
      All projects <ArrowRightIcon class="size-4" />
    </NuxtLink>
  </div>
  <article v-else class="mx-auto max-w-4xl px-5 py-12">
    <NuxtLink
      to="/projects"
      class="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
    >
      <ArrowLeftIcon class="size-3.5" /> All projects
    </NuxtLink>

    <header class="mt-6">
      <p class="label-mono">{{ project.year }} · {{ project.role }}</p>
      <h1 class="mt-3 text-4xl font-semibold sm:text-5xl">
        {{ project.title }}
      </h1>
      <p class="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
        {{ project.summary }}
      </p>

      <div class="mt-6 flex flex-wrap items-center gap-4">
        <ScoreBadges :metrics="project.metrics" />
        <RepoStats :metrics="project.metrics" />
      </div>

      <div class="mt-6 flex flex-wrap gap-3">
        <a
          v-if="project?.links?.demo"
          :href="project?.links.demo"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Live demo <ExternalLinkIcon class="size-4" />
        </a>
        <a
          v-if="project.links?.repo"
          :href="project.links.repo"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 rounded-md border border-border-strong px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
        >
          <svg
            class="size-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 128 128"
          >
            <g fill="#181616">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"
              />
              <path
                d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zM31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0"
              />
            </g>
          </svg>
          Repository
        </a>
      </div>
    </header>

    <figure
      class="mt-10 overflow-hidden rounded-lg border border-border bg-surface"
    >
      <NuxtImg
        :src="project?.coverUrl || ''"
        :alt="`Project cover image ${project?.title}`"
        width="1280"
        height="800"
        class="w-full object-cover"
      />
    </figure>

    <Section
      v-if="project?.overview?.length"
      label="Overview"
      title="Task and role"
    >
      <div class="space-y-4 text-base leading-relaxed text-muted-foreground">
        <p v-for="(p, i) in project.overview" :key="i">
          {{ p }}
        </p>
      </div>
    </Section>

    <Section label="Tech stack" title="Tech stack">
      <ul class="flex flex-wrap gap-1.5">
        <li
          v-for="(t, i) in project.tech"
          :key="i"
          class="rounded-sm border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
        >
          {{ t.title }}
        </li>
      </ul>
    </Section>

    <Section
      v-if="project?.features?.length"
      label="Key features"
      title="Key features"
    >
      <FeatureList :items="project?.features || []" />
    </Section>

    <Section v-if="project?.video" label="Demo" title="Video overview">
      <LazyVideo
        :id="project?.video?.id || ''"
        :title="project?.video?.title || ''"
        :poster="project?.coverUrl || ''"
      />
    </Section>

    <Section
      v-if="project?.challenges?.length"
      label="Architecture & challenges"
      title="Architecture & challenges"
    >
      <div class="space-y-6">
        <div
          v-for="(c, i) in project?.challenges || []"
          :key="i"
          class="border-l-2 border-primary/60 pl-4"
        >
          <h3 class="text-base font-semibold">{{ c.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
            {{ c.body }}
          </p>
        </div>
      </div>
    </Section>

    <nav
      v-if="prev || next"
      class="grid gap-px overflow-hidden rounded-lg border border-t border-border bg-border sm:grid-cols-2"
    >
      <NuxtLink
        v-if="prev"
        :to="`/projects/${prev.slug}`"
        class="bg-card p-5 transition-colors hover:bg-accent"
      >
        <span class="label-mono">Previous</span>
        <span class="mt-1 block text-base font-semibold">{{ prev.title }}</span>
      </NuxtLink>
      <span v-else class="bg-card p-5" />
      <NuxtLink
        v-if="next"
        :to="`/projects/${next.slug}`"
        class="bg-card p-5 text-right transition-colors hover:bg-accent"
      >
        <span class="label-mono">Next</span>
        <span class="mt-1 block text-base font-semibold">{{ next.title }}</span>
      </NuxtLink>
      <span v-else class="bg-card p-5" />
    </nav>
  </article>
</template>
