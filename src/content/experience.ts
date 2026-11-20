export type Experience = {
  id: string;
  organization: string;
  role: string;
  summary: string;
  bullets: string[];
  startDate?: string;
  endDate?: string;
  current?: boolean;
  verified: boolean;
  published: boolean;
  order: number;
};

export const experiences: Experience[] = [
  {
    id: "nueve",
    organization: "Nueve Technologies",
    role: "Technology Consulting and Solutions",
    summary:
      "Technology consulting across cloud applications, communications platforms, and digital services.",
    bullets: [
      "Assess business technology needs, operational workflows, automation opportunities, and integration requirements.",
      "Coordinate solution design across cloud applications, communications platforms, and digital services.",
      "Develop requirements, support testing, and translate business processes into technical workflows.",
    ],
    verified: true,
    published: true,
    order: 1,
  },
  {
    id: "kwik",
    organization: "Kwik Tech",
    role: "Technical Support and Field Services",
    summary:
      "Computer troubleshooting, network and IT support, and field technical services.",
    bullets: [
      "Provide or coordinate computer troubleshooting, network and IT support, and field technical services.",
      "Assess technical issues and document service requirements.",
      "Support connectivity, equipment, and end-user technology needs.",
    ],
    verified: true,
    published: true,
    order: 2,
  },
  {
    id: "leks",
    organization: "LEKS Computers",
    role: "IT Engineering and Solutions",
    summary:
      "Client technology requirements, computer systems, and practical IT solutions.",
    bullets: [
      "Work on client technology requirements, computer systems, and practical IT solutions.",
      "Support technical engineering and customer technology needs.",
    ],
    verified: true,
    published: true,
    order: 3,
  },
];

export const expertiseTags = [
  "IT service delivery",
  "Technical troubleshooting",
  "Network support",
  "Systems integration",
  "Cloud collaboration",
  "Technical documentation",
  "Product requirements",
];

export const qualitativeHighlights = [
  {
    title: "Hands-on IT operations",
    description: "Practical work across support, systems, and infrastructure.",
  },
  {
    title: "Business-focused planning",
    description: "Technology choices aligned to operational priorities.",
  },
  {
    title: "Digital product initiatives",
    description: "Requirements through implementation for software solutions.",
  },
];

export const publishedExperiences = experiences
  .filter((e) => e.published)
  .sort((a, b) => a.order - b.order);
