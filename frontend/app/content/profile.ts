export type SocialLink = {
  label: string;
  href: string;
  handle: string;
};

export const profile = {
  name: "Vyacheslav Ponochovny",
  shortName: "Vyacheslav",
  role: "Fullstack Engineer",
  location: "Remote",
  since: 2018,
  tagline: "Fullstack Engineer building fast, typed, accessible web products.",
  intro:
    "I've been developing web products since 2018. I work with Vue, React, Nuxt, Next, and Astro—from frontend architecture and SSR to APIs, integrations, and CI. I love strong typing, honest performance metrics, and keyboard-friendly interfaces..",
  philosophy: [
    {
      title: "Types as a contract",
      body: "TypeScript end-to-end: validation schemes at the boundaries, inferred types within. Errors should be reported in the editor, not in production..",
    },
    {
      title: "Rendering on demand",
      body: "SSG where content is static, SSR where freshness is needed, client — only for interactivity. Less JS in the bundle, faster first screen.",
    },
    {
      title: "Accessibility as a feature",
      body: "Semantics, focus states, keyboard navigation, and prefers-reduced-motion are baked in from the start, not added post-audit.",
    },
  ],
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/ponochovny",
      handle: "@ponochovny",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/ponochovny",
      handle: "/in/ponochovny",
    },
    {
      label: "Telegram",
      href: "https://t.me/ponochovny",
      handle: "@ponochovny",
    },
    {
      label: "Email",
      href: "mailto:hello@ponochovny.dev",
      handle: "hello@ponochovny.dev",
    },
  ] satisfies SocialLink[],
  resumeUrl: "/resume.pdf",
} as const;

export type StackGroup = {
  title: string;
  items: string[];
};

export const stackGroups: StackGroup[] = [
  {
    title: "Frontend",
    items: [
      "TypeScript",
      "React 19",
      "Vue 3",
      "Next.js",
      "Nuxt",
      "Astro",
      "TanStack Router / Query",
      "Tailwind CSS",
      "shadcn/ui",
      "Motion",
    ],
  },
  {
    title: "Backend",
    items: [
      "Node.js",
      "Nitro / H3",
      "REST",
      "GraphQL",
      "tRPC",
      "Zod",
      "Server Functions",
    ],
  },
  {
    title: "Data & CMS",
    items: ["PostgreSQL", "Supabase", "Prisma", "Redis", "Sanity", "Strapi"],
  },
  {
    title: "DevOps & Quality",
    items: [
      "GitHub Actions",
      "Lighthouse CI",
      "Vercel",
      "Cloudflare",
      "Docker",
      "Vitest",
      "Playwright",
    ],
  },
];
