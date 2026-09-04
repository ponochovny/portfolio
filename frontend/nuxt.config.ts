// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/sanity",
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxt/image",
  ],
  shadcn: {
    prefix: "",
    componentDir: "@/shared/ui",
  },
  sanity: {
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    apiVersion: "2024-06-15",
    useCdn: true,
    typegen: {
      enabled: true,
      schemaTypesPath: "../sanity/schemaTypes",
    },
    visualEditing: {
      studioUrl: process.env.SANITY_STUDIO_URL || 'https://ponochovny-portfolio.sanity.studio',
      token: process.env.SANITY_STUDIO_TOKEN || "",
      stega: true,
      zIndex: 51,
    },
  },
});