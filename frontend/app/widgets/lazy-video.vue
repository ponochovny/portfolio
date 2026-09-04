<script lang="ts" setup>
import { PlayIcon } from "@lucide/vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    default: "",
  },
});

const active = ref(false);
const thumb =
  props.poster || `https://i.ytimg.com/vi/${props.id}/maxresdefault.jpg`;
</script>

<template>
  <div
    class="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-surface"
  >
    <iframe
      v-if="active"
      class="absolute inset-0 size-full"
      :src="`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`"
      :title="title"
      allow="
        accelerometer;
        autoplay;
        clipboard-write;
        encrypted-media;
        picture-in-picture;
      "
      allowFullScreen
    />
    <button
      v-else
      type="button"
      @click="active = true"
      class="group absolute inset-0 size-full cursor-pointer"
      :aria-label="`Play video: ${title}`"
    >
      <NuxtImg
        :src="thumb"
        alt=""
        loading="lazy"
        width="1280"
        height="720"
        class="size-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
      />
      <span class="absolute inset-0 flex items-center justify-center">
        <span
          class="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-105"
        >
          <PlayIcon class="size-6 translate-x-px" fill="currentColor" />
        </span>
      </span>
      <span
        class="absolute inset-x-0 bottom-0 bg-linear-to-t from-background/90 to-transparent p-4 text-left font-mono text-xs text-foreground"
      >
        {{ title }}
      </span>
    </button>
  </div>
</template>
