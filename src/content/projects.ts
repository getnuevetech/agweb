export type ProjectCategory =
  | "IT Operations"
  | "Cloud & Communications"
  | "Digital Products";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  category: ProjectCategory;
  coverImage: string;
  coverAlt: string;
  imageClassification: "approved" | "illustrative";
  role: string;
  focus: string;
  sections: {
    opportunity: string;
    contribution: string;
    workflow: string;
    scope: string;
  };
  technologies?: string[];
  timeframe?: string;
  externalUrl?: string;
  related: string[];
  verified: boolean;
  published: boolean;
  seoDescription: string;
};

export const projects: Project[] = [
  {
    slug: "sauticall",
    title: "SautiCall",
    summary:
      "A cloud communications initiative exploring phone-system workflows, AI-assisted reception, and business notifications.",
    category: "Cloud & Communications",
    coverImage: "/images/project-sauticall.svg",
    coverAlt: "Illustrative preview of a call routing workflow interface",
    imageClassification: "illustrative",
    role: "Product requirements, call-flow planning, and systems integration",
    focus: "Product planning and systems integration",
    sections: {
      opportunity:
        "Business calls involve routing, follow-up, and repeated communication tasks. This initiative explores how cloud telephony and AI-assisted workflows can support those interactions.",
      contribution:
        "My work focuses on product requirements, call-flow planning, and systems integration across the communications experience.",
      workflow:
        "The design considers inbound call handling, receptionist workflows, account configuration, and business notifications.",
      scope:
        "The project continues through implementation and validation. Public descriptions reflect the features available at the time of publication.",
    },
    related: ["influrios", "squadpay"],
    verified: false,
    published: true,
    seoDescription:
      "SautiCall — cloud communications and AI-assisted call workflow initiative by Agboola Olomola.",
  },
  {
    slug: "influrios",
    title: "Influrios",
    summary:
      "An influencer discovery and collaboration platform initiative connecting professional profiles, business opportunities, and collaboration workflows.",
    category: "Digital Products",
    coverImage: "/images/project-influrios.svg",
    coverAlt: "Illustrative preview of a discovery and profile interface",
    imageClassification: "illustrative",
    role: "Product direction, requirements, and platform workflow design",
    focus: "Discovery, profiles, and collaboration workflows",
    sections: {
      opportunity:
        "Businesses and professionals need a clearer way to discover creators, evaluate fit, and manage collaboration workflows without fragmented tools.",
      contribution:
        "My work centers on product requirements, platform structure, and the collaboration workflows that connect profiles with opportunities.",
      workflow:
        "The initiative considers profile discovery, opportunity matching, and collaboration steps across business and creator participants.",
      scope:
        "Development continues. Public materials describe the initiative without exposing private admin data, payments, or personal contact details.",
    },
    related: ["sauticall", "squadpay"],
    verified: false,
    published: true,
    seoDescription:
      "Influrios — influencer discovery and collaboration platform initiative by Agboola Olomola.",
  },
  {
    slug: "squadpay",
    title: "SquadPay",
    summary:
      "A group bill-splitting initiative focused on shared receipts, item selection, and contribution tracking.",
    category: "Digital Products",
    coverImage: "/images/project-squadpay.svg",
    coverAlt: "Illustrative preview of a shared receipt and contribution flow",
    imageClassification: "illustrative",
    role: "Product requirements and workflow design for shared expenses",
    focus: "Shared receipts and contribution tracking",
    sections: {
      opportunity:
        "Groups often struggle to split shared expenses fairly when receipts include many items and contributions differ.",
      contribution:
        "My work focuses on clarifying the user journey for shared receipts, item selection, and contribution tracking.",
      workflow:
        "The design explores how participants review a receipt, select items, and track what each person owes.",
      scope:
        "This initiative is described at the product-planning level. Payment rails, payouts, and funding routes are not presented as live operational features.",
    },
    related: ["influrios", "sauticall"],
    verified: false,
    published: true,
    seoDescription:
      "SquadPay — group bill-splitting and contribution tracking initiative by Agboola Olomola.",
  },
];

export const projectCategories: Array<"All" | ProjectCategory> = [
  "All",
  "IT Operations",
  "Cloud & Communications",
  "Digital Products",
];

export function getPublishedProjects() {
  return projects.filter((p) => p.published);
}

export function getProject(slug: string) {
  return getPublishedProjects().find((p) => p.slug === slug);
}

export function getRelatedProjects(slug: string) {
  const project = getProject(slug);
  if (!project) return [];
  return project.related
    .map((s) => getProject(s))
    .filter((p): p is Project => Boolean(p));
}
