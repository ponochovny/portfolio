<template>
  <div class="relative flex min-h-screen flex-col">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/widgets/app-header.vue'
import AppFooter from '@/widgets/app-footer.vue'
</script>
