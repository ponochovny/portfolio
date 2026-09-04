<script lang="ts" setup>
import { ArrowRightIcon, DownloadIcon } from "@lucide/vue";
import { experience } from "~/content/experience";
import { profile, stackGroups } from "~/content/profile";

const title = `About — ${profile.name}`;
const description =
  "Fullstack Engineer since 2018: approach to architecture, rendering, typing, and performance, experience with the full stack of technologies.";

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: "profile",
  ogUrl: "/about",
});

useHead({
  link: [{ rel: "canonical", href: "/about" }],
});
</script>

<template>
  <div class="mx-auto max-w-3xl px-5 py-16">
    <p class="label-mono">About</p>
    <h1 class="mt-3 text-4xl font-semibold sm:text-5xl">{{ profile.name }}</h1>
    <p class="mt-2 font-mono text-sm text-muted-foreground">
      {{ profile.role }} · {{ profile.location }} · Since {{ profile.since }}
    </p>

    <div class="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground">
      <p>{{ profile.intro }}</p>
      <p>
        I'm interested in products where both engineering and results are
        important: loading speed impacts conversion, and clear code affects team
        speed. I usually handle the entire frontend, server layer, and release
        process, and work closely with design and product.
      </p>
    </div>

    <h2 class="mt-14 text-2xl font-semibold">Approach</h2>
    <div class="mt-6 space-y-6">
      <div
        v-for="p in profile.philosophy"
        :key="p.title"
        class="border-l-2 border-primary/60 pl-4"
      >
        <h3 class="text-base font-semibold">{{ p.title }}</h3>
        <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
          {{ p.body }}
        </p>
      </div>
    </div>

    <h2 class="mt-14 text-2xl font-semibold">Experience</h2>
    <ol class="mt-6 space-y-8 border-l border-border pl-6">
      <li v-for="item in experience" :key="item.company" class="relative">
        <span
          class="absolute -left-7.25 top-1.5 size-2.5 rounded-full border-2 border-background bg-primary"
          aria-hidden="true"
        />
        <p class="font-mono text-xs text-muted-foreground">{{ item.period }}</p>
        <h3 class="mt-1.5 text-lg font-semibold">
          {{ item.role }}
          <span class="font-normal text-muted-foreground"
            >· {{ item.company }}</span
          >
        </h3>
        <ul class="mt-3 space-y-1.5">
          <li
            v-for="a in item.achievements"
            :key="a"
            class="flex gap-2 text-sm text-foreground/90"
          >
            <span class="mt-2 size-1 shrink-0 rounded-full bg-primary" />
            {{ a }}
          </li>
        </ul>
      </li>
    </ol>

    <h2 class="mt-14 text-2xl font-semibold">Stack</h2>
    <div class="mt-6 space-y-5">
      <div v-for="g in stackGroups" :key="g.title">
        <h3 class="font-mono text-xs uppercase tracking-widest text-primary">
          {{ g.title }}
        </h3>
        <ul class="mt-3 flex flex-wrap gap-1.5">
          <li
            v-for="i in g.items"
            :key="i"
            class="rounded-sm border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
          >
            {{ i }}
          </li>
        </ul>
      </div>
    </div>

    <div class="mt-14 flex flex-wrap items-center gap-3">
      <NuxtLink
        to="/projects"
        class="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        Projects <ArrowRightIcon class="size-4" />
      </NuxtLink>
      <a
        :href="profile.resumeUrl"
        class="inline-flex items-center gap-2 rounded-md border border-border-strong px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
      >
        <DownloadIcon class="size-4" /> Resume PDF
      </a>
    </div>
  </div>
</template>
