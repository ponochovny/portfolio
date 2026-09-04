<script lang="ts" setup>
interface Props {
  label: string;
  title: string;
}

const props = defineProps<Props>();
</script>

<template>
  <section class="border-t border-border py-12">
    <p class="label-mono">{{ label }}</p>
    <h2 class="mt-3 text-2xl font-semibold sm:text-3xl">
      {{ title }}
    </h2>
    <div class="mt-6">
      <slot />
    </div>
  </section>
</template>
