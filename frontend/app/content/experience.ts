export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  summary: string;
  achievements: string[];
  stack: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: "Product studio (remote)",
    role: "Senior Fullstack Engineer",
    period: "2023 — present",
    summary:
      "Leading engineer on B2B client products: frontend architecture, SSR layer, integrations, and release process.",
    achievements: [
      "Migrated the core product to SSG + incremental revalidation: LCP 3.4s → 1.1s",
      "Introduced Lighthouse CI into the pipeline — Performance maintained ≥ 95 across all releases",
      "Reduced client bundle size by 41% by separating server logic",
    ],
    stack: ["Nuxt", "Next.js", "TypeScript", "PostgreSQL", "GitHub Actions"],
  },
  {
    company: "SaaS platform",
    role: "Frontend Engineer → Team Lead",
    period: "2020 — 2023",
    summary:
      "Responsible for the design system and frontend architecture of the platform, grew into a team lead for 4 engineers.",
    achievements: [
      "Built a design system with 60+ components — new page assembly time dropped from 3 days to 4 hours",
      "Introduced a typed API layer: runtime errors on the frontend decreased by 70%",
      "Set up e2e coverage for critical flows — regressions on releases practically disappeared",
    ],
    stack: ["Vue 3", "Nuxt", "TypeScript", "GraphQL", "Storybook"],
  },
  {
    company: "Digital agency",
    role: "Web Developer",
    period: "2018 — 2020",
    summary:
      "Client websites, landing pages, and online stores: layout, CMS integration, and search engine optimization.",
    achievements: [
      "Delivered 30+ projects, improving the portfolio's average PageSpeed from 62 to 91",
      "Standardized the agency's starter template — project kickoff time reduced to one day",
    ],
    stack: ["Vue 2", "Nuxt", "SCSS", "Strapi", "WordPress"],
  },
];
