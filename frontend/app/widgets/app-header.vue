<template>
  <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
    <div class="max-w-6xl mx-auto px-5 flex h-14 items-center justify-between">
      <div class="flex items-center gap-6">
        <NuxtLink to="/" class="flex items-center space-x-2">
          <span class="font-bold text-lg">Portfolio</span>
        </NuxtLink>
        <nav class="hidden md:flex! items-center gap-6 text-sm font-medium text-muted-foreground">
          <NuxtLink to="/" class="transition-colors hover:text-foreground" active-class="text-foreground">Home</NuxtLink>
          <NuxtLink to="/projects" class="transition-colors hover:text-foreground" active-class="text-foreground">Projects</NuxtLink>
          <NuxtLink to="/about" class="transition-colors hover:text-foreground" active-class="text-foreground">About</NuxtLink>
        </nav>
      </div>
      
      <!-- Mobile navigation links (simplified) -->
      <nav class="flex items-center gap-4 md:hidden text-sm font-medium text-muted-foreground">
        <NuxtLink to="/" class="transition-colors hover:text-foreground" active-class="text-foreground">Home</NuxtLink>
        <NuxtLink to="/projects" class="transition-colors hover:text-foreground" active-class="text-foreground">Projects</NuxtLink>
        <NuxtLink to="/about" class="transition-colors hover:text-foreground" active-class="text-foreground">About</NuxtLink>
      </nav>
    </div>
  </header>
</template>