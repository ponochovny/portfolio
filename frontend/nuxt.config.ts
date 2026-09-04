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

	routeRules: {
		// Static pages pre-rendered at build time
		'/about': {prerender: true},

		// CMS dynamic sections cached with ISR (revalidates via webhook or 1 hour fallback TTL)
		'/': {isr: 3600},
		'/projects/**': {isr: 3600},

		// API endpoints and Sanity Studio Visual Editing preview routes (never cached)
		'/api/**': {cache: false},
		'/preview/**': {cache: false},
	},
  

	app: {
		head: {
			link: [
				{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
				{rel: 'icon', sizes: '192x192', href: '/android-chrome-192x192.png'},
				{rel: 'icon', sizes: '512x512', href: '/android-chrome-512x512.png'},

				// Specific PNG sizes
				{rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png'},
				{rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png'},

				// Apple Touch Icon for iOS home screens
				{rel: 'apple-touch-icon', href: '/apple-touch-icon.png'},
			],
		},
	},
});