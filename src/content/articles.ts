export type ArticleCategory = "IT Operations" | "Automation" | "Digital Products";

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  tags: string[];
  body: ArticleSection[];
  author: string;
  coverImage: string;
  coverAlt: string;
  publishedAt?: string;
  updatedAt?: string;
  published: boolean;
  seoDescription: string;
};

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
};

export const articles: Article[] = [
  {
    slug: "building-reliable-it-operations",
    title: "Building reliable IT operations",
    excerpt:
      "A practical look at support processes, documentation, and service ownership.",
    category: "IT Operations",
    tags: ["operations", "support", "ownership"],
    author: "Agboola Olomola",
    coverImage: "/images/article-operations.svg",
    coverAlt: "Illustration representing reliable IT operations",
    published: false,
    seoDescription:
      "Practical guidance on ownership, support intake, documentation, and recurring failure review.",
    body: [
      {
        heading: "Start with ownership",
        paragraphs: [
          "For each important system, identify who manages access, who responds to incidents, and who makes decisions about changes. Record a backup contact where one exists. A short ownership register can prevent a simple issue from moving between teams without a clear next action.",
        ],
      },
      {
        heading: "Make support requests traceable",
        paragraphs: [
          "Capture requests in a consistent place. Describe the issue, who is affected, the urgency, and the action already taken. Prioritize work according to its impact on the business. Give the requester a clear way to follow progress and understand what is needed from them.",
        ],
      },
      {
        heading: "Document recurring work",
        paragraphs: [
          "Write down the steps that are repeated, especially work involving access, configuration, troubleshooting, and handover. Keep instructions close to the tools and people using them. Review documentation when a process changes so that it remains useful during a real incident.",
        ],
      },
      {
        heading: "Review what fails repeatedly",
        paragraphs: [
          "A resolved ticket does not always remove the underlying cause. Look for recurring incidents, unclear handoffs, and tasks that require avoidable manual effort. Choose a manageable improvement, test it, and record whether it reduced the problem.",
        ],
      },
    ],
  },
  {
    slug: "when-to-automate-a-workflow",
    title: "When to automate a workflow",
    excerpt:
      "Questions to ask before replacing a manual process with an automated one.",
    category: "Automation",
    tags: ["automation", "process"],
    author: "Agboola Olomola",
    coverImage: "/images/article-automation.svg",
    coverAlt: "Illustration representing workflow automation",
    published: false,
    seoDescription:
      "A practical checklist for deciding when automation improves a business workflow.",
    body: [
      {
        heading: "Clarify the outcome",
        paragraphs: [
          "Start with the business result you want, not the tool. If the manual process is unclear, automation will usually amplify the confusion.",
        ],
      },
    ],
  },
  {
    slug: "planning-a-digital-product",
    title: "Planning a digital product",
    excerpt:
      "Start with the user’s problem, the core journey, and the smallest useful release.",
    category: "Digital Products",
    tags: ["product", "planning"],
    author: "Agboola Olomola",
    coverImage: "/images/article-product.svg",
    coverAlt: "Illustration representing digital product planning",
    published: false,
    seoDescription:
      "How to plan a digital product from problem definition to a useful first release.",
    body: [
      {
        heading: "Begin with the user problem",
        paragraphs: [
          "Define who is affected, what breaks today, and what a successful first release must make possible.",
        ],
      },
    ],
  },
  {
    slug: "connecting-systems-with-purpose",
    title: "Connecting systems with purpose",
    excerpt:
      "Define the information that needs to move before choosing the integration.",
    category: "Automation",
    tags: ["integration", "systems"],
    author: "Agboola Olomola",
    coverImage: "/images/article-integration.svg",
    coverAlt: "Illustration representing systems integration",
    published: false,
    seoDescription:
      "Practical guidance for planning system integrations around information flow.",
    body: [
      {
        heading: "Map the information first",
        paragraphs: [
          "Identify what data must move, who owns it, and what happens when it is delayed or incomplete.",
        ],
      },
    ],
  },
];

export function getPublishedArticles() {
  return articles
    .filter((a) => a.published)
    .sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || ""));
}

export function getArticle(slug: string) {
  return getPublishedArticles().find((a) => a.slug === slug);
}

export function estimateReadingMinutes(article: Article) {
  const words = article.body
    .flatMap((s) => [s.heading, ...s.paragraphs])
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export const articleCategories: Array<"All" | ArticleCategory> = [
  "All",
  "IT Operations",
  "Automation",
  "Digital Products",
];
