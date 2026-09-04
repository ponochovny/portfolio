import orbitImg from "@/assets/project-orbit.jpg";
import atlasImg from "@/assets/project-atlas.jpg";
import cadenceImg from "@/assets/project-cadence.jpg";
import lumenImg from "@/assets/project-lumen.jpg";

export type ProjectMetrics = {
  /** Lighthouse scores, 0-100 */
  performance?: number;
  accessibility?: number;
  seo?: number;
  /** GitHub slots — заполняются позже, живым API или вручную */
  commits?: number;
  stars?: number;
  lastUpdated?: string;
};

export type ProjectFeature = {
  title: string;
  body: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  year: number;
  role: string;
  featured: boolean;
  tech: string[];
  cover: string;
  overview: string[];
  features: ProjectFeature[];
  challenges: ProjectFeature[];
  metrics: ProjectMetrics;
  links: {
    demo?: string;
    repo?: string;
  };
  /** Опциональное видео-превью: подгружается только по клику */
  video?: {
    provider: "youtube";
    id: string;
    title: string;
  };
};

export const projects: Project[] = [
  {
    slug: "orbit-analytics",
    title: "Orbit Analytics",
    summary:
      "An analytics dashboard for marketing teams with live metrics and reports.",
    year: 2025,
    role: "Fullstack: frontend architecture, API layer, charts, real-time",
    featured: true,
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Recharts", "Redis"],
    cover: orbitImg,
    overview: [
      "A marketing team used to compile reports manually in spreadsheets: data came from four sources, and numbers often conflicted between departments.",
      "I designed a unified dashboard with server-side aggregation and caching, live streams for active users, and export capabilities. I was responsible for the entire frontend and the data aggregation layer.",
    ],
    features: [
      {
        title: "Live metrics via SSE",
        body: "Event stream updates counters without polling: one connection instead of 12 requests per minute.",
      },
      {
        title: "Server-side aggregation with caching",
        body: "Complex calculations run on the server and are cached in Redis by filter key — 40ms response instead of 2.3s.",
      },
      {
        title: "Export reports",
        body: "Generate CSV and PDF in background with completion notification, without blocking the UI.",
      },
      {
        title: "Flexible data slices",
        body: "All filters live in the URL — dashboard state is shareable by link and restored on reload.",
      },
    ],
    challenges: [
      {
        title: "Charts lagged on large datasets",
        body: "10k+ points killed the frame rate. I introduced LTTB downsampling on the server: visually identical charts with 800 points, stable 60fps rendering.",
      },
      {
        title: "Conflicting numbers between reports",
        body: "Each report calculated aggregates differently. I extracted calculations into a single typed layer with business rule tests — creating a single source of truth.",
      },
    ],
    metrics: {
      performance: 98,
      accessibility: 100,
      seo: 95,
      commits: 412,
      lastUpdated: "2025-08-14",
    },
    links: {
      demo: "https://example.com",
      repo: "https://github.com/ponochovny",
    },
    video: {
      provider: "youtube",
      id: "dQw4w9WgXcQ",
      title: "Orbit Analytics — interface overview",
    },
  },
  {
    slug: "atlas-storefront",
    title: "Atlas Storefront",
    summary:
      "A store built on Astro with a Nuxt backend: static delivery, live prices, and cart.",
    year: 2024,
    role: "Fullstack: catalog assembly, checkout, CMS integration",
    featured: true,
    tech: ["Astro", "Vue 3", "Sanity", "Stripe", "Tailwind CSS"],
    cover: atlasImg,
    overview: [
      "A brand of home goods was living on a heavy off-the-shelf platform: the catalog page took 4+ seconds to load, and content editing required a developer.",
      "I assembled a storefront on Astro with island hydration: the catalog is static, interactivity only where needed. Content is edited in the CMS, and rebuilds are triggered by webhook.",
    ],
    features: [
      {
        title: "Island hydration",
        body: "Cart, gallery, and filters are separate islands. The catalog page sends 18KB of JS instead of 340KB.",
      },
      {
        title: "Rebuild on webhook from CMS",
        body: "Publishing to Sanity triggers a deploy endpoint: changed pages are rebuilt in the background without a full release.",
      },
      {
        title: "Checkout on Stripe",
        body: "Payments, promo codes, and order status webhooks with idempotent event processing.",
      },
      {
        title: "Live prices and stock",
        body: "Static page augmented with up-to-date data via a single request after hydration.",
      },
    ],
    challenges: [
      {
        title: "Static vs live stock",
        body: "Rebuilding the site on every stock change is impossible. I split the layers: content is static, while stock and prices are fetched on the client with a skeleton.",
      },
      {
        title: "Duplicate Stripe webhooks",
        body: "Duplicate events created duplicate orders. I introduced idempotent keys and a table of processed events.",
      },
    ],
    metrics: {
      performance: 100,
      accessibility: 98,
      seo: 100,
      commits: 268,
      lastUpdated: "2025-03-02",
    },
    links: {
      demo: "https://example.com",
      repo: "https://github.com/ponochovny",
    },
  },
  {
    slug: "cadence-scheduler",
    title: "Cadence Scheduler",
    summary:
      "A task and meeting scheduler with Google Calendar integration via OAuth 2.0.",
    year: 2024,
    role: "Fullstack: OAuth flow, scheduling engine, calendar UI",
    featured: true,
    tech: ["Nuxt", "TypeScript", "Node.js", "PostgreSQL", "Google API"],
    cover: cadenceImg,
    overview: [
      "Teams needed to schedule recurring tasks and calls in one place, syncing with members' personal calendars.",
      "I built a scheduling engine on cron expressions with correct timezone handling and bidirectional sync with Google Calendar.",
    ],
    features: [
      {
        title: "Google Calendar integration (OAuth 2.0)",
        body: "Authorization with refresh tokens, bidirectional event sync, and access revocation handling.",
      },
      {
        title: "Cron expressions with human-friendly input",
        body: 'A parser translates "every Tuesday at 9:00" into cron and back, with a preview of next runs.',
      },
      {
        title: "Timezones without surprises",
        body: "All calculations are in UTC, display in the user's timezone, with correct daylight saving transitions.",
      },
      {
        title: "Execution history",
        body: "A log of executions with duration, status, and one-click retry.",
      },
    ],
    challenges: [
      {
        title: "DST transitions shifted events",
        body: "Storing local time naively broke schedules twice a year. I switched to UTC + IANA timezones and recalculated the next run on each iteration.",
      },
      {
        title: "Google API limits",
        body: "Bulk sync was hitting quotas. I added a queue with exponential backoff and batched requests.",
      },
    ],
    metrics: {
      performance: 96,
      accessibility: 100,
      seo: 92,
      commits: 331,
      lastUpdated: "2025-06-21",
    },
    links: {
      demo: "https://example.com",
      repo: "https://github.com/ponochovny",
    },
  },
  {
    slug: "lumen-docs",
    title: "Lumen Docs",
    summary:
      "Documentation engine with instant search and API reference generation from types.",
    year: 2023,
    role: "Project author",
    featured: false,
    tech: ["Astro", "TypeScript", "MDX", "Pagefind"],
    cover: lumenImg,
    overview: [
      "Internal SDKs were living in scattered README files, search didn't work across them, and examples diverged from actual signatures.",
      "I built a docs engine: MDX content, API reference generated from TypeScript declarations, and fully static, offline-capable search.",
    ],
    features: [
      {
        title: "Type-driven reference",
        body: "A script parses .d.ts files and generates method pages — examples don't diverge from code.",
      },
      {
        title: "Static search",
        body: "The index is built during the build; search works without a backend and without network delays.",
      },
      {
        title: "Checking code examples",
        body: "All snippets are type-checked in CI: a broken example won't pass the build.",
      },
    ],
    challenges: [
      {
        title: "Search index size",
        body: "The index for 900 pages was 6MB. I split it into chunks with lazy loading — the first request loads 90KB.",
      },
    ],
    metrics: {
      performance: 100,
      accessibility: 100,
      seo: 100,
      commits: 154,
      lastUpdated: "2024-11-09",
    },
    links: { repo: "https://github.com/ponochovny" },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const allTech = Array.from(
  new Set(projects.flatMap((p) => p.tech)),
).sort();

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getNeighbours(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: undefined, next: undefined };
  return {
    prev: i > 0 ? projects[i - 1] : undefined,
    next: i < projects.length - 1 ? projects[i + 1] : undefined,
  };
}
