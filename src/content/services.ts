export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  cardDescription: string;
  introduction: string;
  suitableTopics: string[];
  typicalOutputs: string[];
  topic: string;
  icon: "consult" | "systems" | "support" | "strategy";
};

export const services: Service[] = [
  {
    slug: "it-consulting",
    title: "IT Consulting",
    shortTitle: "IT Consulting",
    cardDescription:
      "Make informed technology decisions based on your business needs, current systems, and operational priorities.",
    introduction:
      "Make informed technology decisions based on your business needs, current systems, and operational priorities.",
    suitableTopics: [
      "Technology reviews",
      "Requirements discovery",
      "System selection",
      "Integration planning",
      "Implementation scoping",
    ],
    typicalOutputs: [
      "Findings summary",
      "Priority list",
      "Agreed implementation plan",
    ],
    topic: "IT Consulting",
    icon: "consult",
  },
  {
    slug: "systems-administration",
    title: "Systems Administration",
    shortTitle: "Systems Administration",
    cardDescription:
      "Support the configuration, maintenance, and improvement of the systems your team relies on.",
    introduction:
      "Support the configuration, maintenance, and improvement of the systems your team relies on.",
    suitableTopics: [
      "User access",
      "Device and server environments",
      "Collaboration systems",
      "Network coordination",
      "Backup checks",
      "Technical documentation",
    ],
    typicalOutputs: [
      "Environment improvements",
      "Documented configurations",
      "Operational checklists",
    ],
    topic: "Systems Administration",
    icon: "systems",
  },
  {
    slug: "support-leadership",
    title: "IT Support Leadership",
    shortTitle: "IT Support Leadership",
    cardDescription:
      "Improve how support requests are received, prioritized, resolved, and reviewed.",
    introduction:
      "Improve how support requests are received, prioritized, resolved, and reviewed.",
    suitableTopics: [
      "Intake processes",
      "Escalation paths",
      "Service ownership",
      "Knowledge articles",
      "Vendor coordination",
      "Operational reporting",
    ],
    typicalOutputs: [
      "Support process design",
      "Ownership model",
      "Reporting cadence",
    ],
    topic: "IT Support Leadership",
    icon: "support",
  },
  {
    slug: "product-strategy",
    title: "Technology & Product Strategy",
    shortTitle: "Technology & Product Strategy",
    cardDescription:
      "Turn an idea or business requirement into a clear product direction and implementation plan.",
    introduction:
      "Turn an idea or business requirement into a clear product direction and implementation plan.",
    suitableTopics: [
      "Workflow mapping",
      "User journeys",
      "Feature prioritization",
      "Integration requirements",
      "Acceptance criteria",
      "Release planning",
    ],
    typicalOutputs: [
      "Product direction",
      "Prioritized backlog",
      "Implementation plan",
    ],
    topic: "Technology and Product Strategy",
    icon: "strategy",
  },
];

export const howWeWork = [
  {
    title: "Discover",
    description: "Understand the problem, the environment, and the outcome that matters.",
  },
  {
    title: "Define",
    description: "Translate requirements into a practical scope, priorities, and plan.",
  },
  {
    title: "Implement",
    description: "Coordinate the agreed technical work, test key workflows, and document results.",
  },
  {
    title: "Review",
    description: "Confirm the result, clarify ownership, and identify the next improvements.",
  },
];

export const serviceFaqs = [
  {
    question: "Can we work remotely?",
    answer:
      "Remote work is available. On-site arrangements can be discussed based on location and project needs.",
  },
  {
    question: "Can you review an existing system?",
    answer: "Yes. Share the environment and the problem you want to address.",
  },
  {
    question: "How is an engagement priced?",
    answer:
      "Scope and pricing are discussed after the initial requirements are understood.",
  },
  {
    question: "Can I ask about a project still at the idea stage?",
    answer:
      "Yes. An initial discussion can help clarify the problem, users, and next steps.",
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
