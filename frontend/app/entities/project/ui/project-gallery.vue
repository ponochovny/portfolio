<script lang="ts" setup>
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ExpandIcon,
  XIcon,
} from "@lucide/vue";

export interface GalleryItem {
  _key?: string;
  url?: string | null;
  alt?: string | null;
  caption?: string | null;
}

interface Props {
  items: GalleryItem[];
  projectTitle?: string;
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  projectTitle: "Project",
});

const activeIndex = ref<number | null>(null);

const openLightbox = (index: number) => {
  activeIndex.value = index;
};

const closeLightbox = () => {
  activeIndex.value = null;
};

const nextImage = () => {
  if (activeIndex.value === null) return;
  activeIndex.value = (activeIndex.value + 1) % props.items.length;
};

const prevImage = () => {
  if (activeIndex.value === null) return;
  activeIndex.value =
    (activeIndex.value - 1 + props.items.length) % props.items.length;
};

const onKeydown = (e: KeyboardEvent) => {
  if (activeIndex.value === null) return;
  if (e.key === "Escape") closeLightbox();
  else if (e.key === "ArrowRight") nextImage();
  else if (e.key === "ArrowLeft") prevImage();
};

watch(activeIndex, (newVal) => {
  if (import.meta.client) {
    if (newVal !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }
});

onMounted(() => {
  window.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
  if (import.meta.client) {
    document.body.style.overflow = "";
  }
  window.removeEventListener("keydown", onKeydown);
});
</script>

<template>
  <div v-if="items?.length" class="space-y-4">
    <!-- Gallery Grid -->
    <div
      class="grid gap-4"
      :class="{
        'grid-cols-1': items.length === 1,
        'grid-cols-1 sm:grid-cols-2': items.length === 2,
        'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3': items.length >= 3,
      }"
    >
      <button
        v-for="(item, index) in items"
        :key="item._key || index"
        type="button"
        :aria-label="`Open ${item.alt || `${projectTitle} gallery image ${index + 1}`} in fullscreen`"
        class="group relative block w-full cursor-pointer overflow-hidden rounded-lg border border-border bg-surface text-left transition-all duration-300 hover:border-border-strong hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        @click="openLightbox(index)"
      >
        <div class="aspect-video w-full overflow-hidden bg-muted/20">
          <NuxtImg
            v-if="item.url"
            :src="item.url"
            :alt="item.alt || `${projectTitle} gallery image ${index + 1}`"
            loading="lazy"
            class="size-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-105"
          />
        </div>

        <!-- Hover overlay -->
        <div
          class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-200 group-hover:opacity-100"
        >
          <div
            class="flex size-10 items-center justify-center rounded-full bg-background/80 text-foreground shadow-sm backdrop-blur-sm"
          >
            <ExpandIcon class="size-5" />
          </div>
        </div>

        <!-- Optional caption in thumbnail -->
        <div
          v-if="item.caption"
          class="p-3 text-xs text-muted-foreground transition-colors group-hover:text-foreground"
        >
          {{ item.caption }}
        </div>
      </button>
    </div>

    <!-- Lightbox Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="activeIndex !== null && items[activeIndex]"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          @click.self="closeLightbox"
        >
          <!-- Top bar: counter & close -->
          <div
            class="absolute top-4 inset-x-4 flex items-center justify-between text-white/80"
          >
            <span class="font-mono text-xs tracking-wider">
              {{ activeIndex + 1 }} / {{ items.length }}
            </span>
            <button
              type="button"
              class="rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close fullscreen gallery"
              @click="closeLightbox"
            >
              <XIcon class="size-6" />
            </button>
          </div>

          <!-- Prev Button -->
          <button
            v-if="items.length > 1"
            type="button"
            class="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white/80 backdrop-blur-sm transition-all hover:bg-black/80 hover:text-white"
            aria-label="Previous image"
            @click.stop="prevImage"
          >
            <ChevronLeftIcon class="size-6" />
          </button>

          <!-- Main Image -->
          <div
            class="flex max-h-[80vh] max-w-5xl flex-col items-center justify-center"
            @click.stop
          >
            <img
              v-if="items[activeIndex]?.url"
              :src="items[activeIndex]?.url || ''"
              :alt="
                items[activeIndex]?.alt ||
                `${projectTitle} full image ${activeIndex + 1}`
              "
              class="max-h-[75vh] w-auto max-w-full rounded-md object-contain shadow-2xl"
            />
            <p
              v-if="items[activeIndex]?.caption"
              class="mt-3 text-center text-sm text-white/80"
            >
              {{ items[activeIndex]?.caption }}
            </p>
          </div>

          <!-- Next Button -->
          <button
            v-if="items.length > 1"
            type="button"
            class="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white/80 backdrop-blur-sm transition-all hover:bg-black/80 hover:text-white"
            aria-label="Next image"
            @click.stop="nextImage"
          >
            <ChevronRightIcon class="size-6" />
          </button>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
