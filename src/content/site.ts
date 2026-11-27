export const portraitVariants = {
  home: "/images/portrait-home-v2.jpg",
  about: "/images/portrait-about-v2.jpg",
  resume: "/images/portrait-resume-v2.jpg",
  services: "/images/portrait-services-v2.jpg",
  projects: "/images/portrait-projects-v2.jpg",
  blog: "/images/portrait-blog-v2.jpg",
  contact: "/images/portrait-contact-v2.jpg",
} as const;

export type PortraitVariant = keyof typeof portraitVariants;

export const site = {
  name: "Agboola Olomola",
  monogram: "AG",
  title: "IT Consultant, Systems Administrator & Technology Strategist",
  shortTitle: "IT Consultant and Technology Strategist",
  brandLine:
    "IT Consultant, Systems Administrator, Technology Strategist & Entrepreneur",
  location: "Houston, Texas (On-Site & Remote)",
  locationShort: "Houston, Texas",
  emails: {
    primary: "a@agboolaolomola.com",
  },
  phone: {
    display: "+1 979 800 9800",
    tel: "+19798009800",
  },
  social: {
    linkedin: "https://www.linkedin.com/in/agolomola/",
  },
  portrait: {
    src: portraitVariants.home,
    alt: "Illustrated portrait of Agboola Olomola",
  },
  portraits: portraitVariants,
  resumePdf: null as string | null,
  consultationMode: "request" as const,
  newsletterEnabled: false,
  origin: process.env.NEXT_PUBLIC_SITE_ORIGIN || "",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "About" },
  { href: "/resume/", label: "Resume" },
  { href: "/services/", label: "Services" },
  { href: "/projects/", label: "Projects" },
  { href: "/blog/", label: "Blog" },
  { href: "/contact/", label: "Contact" },
] as const;

export const contactTopics = [
  "IT Consulting",
  "Systems Administration",
  "IT Support Leadership",
  "Technology and Product Strategy",
  "Recruitment or Opportunity",
  "Other",
] as const;

export type ContactTopic = (typeof contactTopics)[number];
