<template>
  <div
    class="overflow-hidden rounded-lg border border-border bg-surface/80 font-mono text-xs shadow-sm backdrop-blur"
  >
    <!-- Header -->
    <div class="flex items-center gap-2 border-b border-border px-3 py-2">
      <span class="size-2 rounded-full bg-destructive/70" />
      <span class="size-2 rounded-full bg-primary/70" />
      <span class="size-2 rounded-full bg-success/70" />
      <span class="ml-2 text-[11px] text-muted-foreground"
        >zsh — portfolio</span
      >
    </div>

    <!-- Terminal Output -->
    <div ref="scrollRef" class="h-56 space-y-1 overflow-y-auto p-3 sm:h-60">
      <p
        v-for="(line, i) in lines"
        :key="i"
        :class="
          line.kind === 'in'
            ? 'whitespace-pre-wrap text-foreground'
            : 'whitespace-pre-wrap text-muted-foreground'
        "
      >
        <span v-if="line.kind === 'in'" class="text-primary">$ </span>
        {{ line.text }}
      </p>

      <!-- Input Form -->
      <form @submit.prevent="onSubmit" class="flex items-center gap-2 pt-1">
        <label for="console-input" class="text-primary"> $ </label>
        <input
          id="console-input"
          v-model="value"
          :spellcheck="false"
          autocomplete="off"
          placeholder="help"
          aria-label="Команда консоли"
          class="w-full bg-transparent text-foreground outline-none"
        />
        <span class="caret-blink text-primary" aria-hidden="true"> ▍ </span>
      </form>
    </div>

    <!-- Quick Actions Bar -->
    <div class="flex flex-wrap gap-1.5 border-t border-border px-3 py-2">
      <button
        v-for="c in quickCommands"
        :key="c"
        type="button"
        @click="run(c)"
        class="rounded-sm border border-border px-2 py-1 text-[11px] text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
      >
        {{ c }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { profile, stackGroups } from "~/content/profile";

const props = defineProps<{
  profile: ProfileQueryResult;
  projects: ProjectsQueryResult;
}>();
// import { ref, nextTick } from "vue";

// Убедитесь, что пути соответствуют настройкам алиасов в вашем nuxt.config.ts
// import { profile, stackGroups } from "@/content/profile";
// import { projects } from "@/content/projects";

type Line = { kind: "in" | "out"; text: string };

const HELP = [
  "whoami      — who i am",
  "ls projects — list of projects",
  "stack       — technologies",
  "contact     — how to contact me",
  "clear       — clear the console",
];

const initial: Line[] = [
  {
    kind: "out",
    text: `${props.profile?.shortName?.toLowerCase()}@portfolio — type help`,
  },
];

const lines = ref<Line[]>([...initial]);
const value = ref("");
const scrollRef = ref<HTMLDivElement | null>(null);

const quickCommands = ["whoami", "ls projects", "stack", "contact"];

async function push(next: Line[]) {
  lines.value.push(...next);

  // nextTick дожидается обновления DOM в Vue перед тем как скроллить
  await nextTick();
  if (scrollRef.value) {
    scrollRef.value.scrollTo({ top: scrollRef.value.scrollHeight });
  }
}

function run(raw: string) {
  const cmd = raw.trim().toLowerCase();
  if (!cmd) return;

  const out: string[] = [];

  switch (cmd) {
    case "help":
      out.push(...HELP);
      break;
    case "whoami":
      out.push(
        `${props.profile?.name} — ${props.profile?.role}, ${props.profile?.location}`,
      );
      out.push(
        `Experience since ${props.profile?.since}: Vue, React, Nuxt, Next, Astro`,
      );
      break;
    case "ls projects":
    case "ls":
    case "projects":
      out.push(
        ...props.projects.map(
          (p) =>
            `${String(p.slug).padEnd(20)} ${p.year}  ${p.tech?.[0]?.title}`,
        ),
      );
      out.push("→ opening /projects");
      break;
    case "stack":
      out.push(
        ...stackGroups.map(
          (g) => `${g.title.padEnd(18)} ${g.items.join(", ")}`,
        ),
      );
      break;
    case "contact":
      out.push(
        ...(props.profile?.socials?.map(
          (s) => `${String(s.label).padEnd(10)} ${String(s.handle)}`,
        ) || []),
      );
      break;
    case "clear":
      lines.value = [...initial];
      return;
    default:
      out.push(`command not found: ${cmd} — try help`);
  }

  push([
    { kind: "in", text: raw.trim() },
    ...out.map((text) => ({ kind: "out" as const, text })),
  ]);

  if (["ls projects", "ls", "projects"].includes(cmd)) {
    setTimeout(() => navigateTo("/projects"), 500);
  }
}

function onSubmit() {
  run(value.value);
  value.value = "";
}
</script>
