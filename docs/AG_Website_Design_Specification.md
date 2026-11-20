# Agboola Olomola Website Design and Development Specification

Developer handoff • Version 1 • 19 November 2026

Build a responsive personal website for Agboola Olomola that presents his IT consulting, systems administration, technology operations, and digital product work. The website should help business prospects understand his services, help recruiters evaluate his experience, and make inquiries easy to submit.

Use the approved navy blue and gold homepage with technology backgrounds as the visual foundation. This document defines the additional pages, proposed website copy, interactions, responsive behavior, data requirements, and acceptance criteria. The accompanying visual boards illustrate the page composition. Implement the website as responsive components with live text and accessible controls.

The latest user decisions are authoritative. Use an AG monogram, a navy polo portrait, Houston location, and only the two approved email addresses. Use circuit traces, connected nodes, and flowing data textures in the backgrounds. Keep decorative patterns subtle around reading areas.

The website copy below is proposed editorial content. The resume source contains dates and credentials that still require confirmation. Numeric achievements, the sample testimonial, and the dated career timeline in the original homepage image are design placeholders. Their launch treatment is specified here.

Deliver the implementation in the existing project framework where available. This is a design and behavior specification, not authorization to publish a new site or configure paid services. Use configurable integrations for contact delivery, consultation scheduling, and optional subscriptions.

## 01 Scope and information architecture

The main navigation has seven links in this order: Home, About, Resume, Services, Projects, Blog, Contact. The AG monogram and name link to Home. The primary conversion is an inquiry or consultation request. The secondary conversion is viewing or downloading the resume.

| Route | Page purpose | Primary action |
| --- | --- | --- |
| / | Introduce expertise and selected work | Request a Consultation |
| /about | Explain background and working approach | Contact Me |
| /resume | Present readable professional experience | Download PDF |
| /services | Explain four service areas | Discuss This Service |
| /projects | Browse approved initiatives and case studies | View Initiative |
| /projects/[slug] | Explain one initiative and personal contribution | Discuss a Similar Project |
| /blog | Browse published articles | Read Article |
| /blog/[slug] | Read one article | Related Article |
| /contact | Send a message or request a consultation | Send Message |
| /privacy | Describe actual website data practices | Contact email link |
| /terms | Present approved website terms | Contact email link |
| unmatched route | Recover from a missing page | Back to Home |

No visitor account is required. All public content is viewable without login. A draft-preview mechanism can be available to the owner through the existing content system, but drafts must not appear in public listings or search results.

Use “Request a Consultation” consistently wherever the flow submits a preferred time for later confirmation. If a real scheduling provider is connected and actually reserves an available slot, the CTA may become “Book a Consultation.” The supplied visual reference uses both patterns. The implemented wording must describe the actual behavior.

## 02 Brand and design tokens

| Token | Value | Usage |
| --- | --- | --- |
| Navy base | #17366A | Main branded sections |
| Navy deep | #0B2447 | Text overlays and strong contrast |
| Navy light | #244B80 | Gradients and subtle panels |
| Gold | #D9A441 | Borders, icons, emphasis |
| Gold light | #F1CB75 | CTA highlight and selected accents |
| White | #FFFFFF | Content surfaces |
| Cool surface | #F5F7FB | Cards and secondary backgrounds |
| Primary text | #13233B | Text on light backgrounds |
| Muted text | #526176 | Supporting content |
| Border | #DCE3ED | Dividers and input outlines |
| Error | #B42318 | Error text and indicators |
| Success | #176B45 | Confirmed successful states |

Use Playfair Display for editorial headings and Inter for interface text and body copy. Georgia and system sans-serif are the fallbacks. Package fonts locally when licensing and the project setup permit. Use no more than the two type families.

Desktop sizes are H1 52/58 px, H2 36/44 px, H3 22/30 px, body 16/26 px, small text 14/20 px. Mobile sizes are H1 34/40 px, H2 28/34 px, H3 20/28 px, body 16/25 px. Use fluid interpolation between the mobile and desktop values. Small uppercase section labels use 12/18 px with modest letter spacing.

Use an 8 px spacing rhythm with 4 px available for tight icon alignment. Standard spacing values are 8, 16, 24, 32, 48, 64, and 96 px. Card radius is 12 px, input radius 8 px, and button radius 8 px. Preserve the reference portrait frame radius and its offset gold accent. Card shadows are soft and restrained.

Gold buttons use dark navy text. Gold body text on white is not a default combination. Verify actual contrast on every rendered color and background combination.

## 03 Layout backgrounds and imagery

At 1440 px, use a centered 1200 px maximum content container. At widths below 1280 px, retain 32 px side gutters where space allows. At 768–1023 px, use 24 px gutters. Below 768 px, use 20 px gutters. Avoid fixed canvas widths and horizontal scrolling.

Desktop layouts use a 12-column grid with 24 px gaps. Hero content occupies approximately seven columns and the portrait five. About content can split five and seven. Four-card rows become two columns on tablets and one column on narrow mobile screens. Section padding is normally 80 px vertically on desktop and 48 px on mobile.

Technology background treatment follows a hierarchy. The homepage hero has the strongest pattern, combining circuit traces at the corners with connected nodes and a flowing blue-and-gold wave along the lower edge. Experience and testimonial bands use quieter connected lines or data waves. White sections use faint blue dot grids and network fragments near outer margins. Footer patterns are low contrast.

Keep dense patterns away from paragraphs and controls. Use a navy overlay or a quiet gradient beneath white text. Decorative artwork must be separate from content, excluded from accessibility semantics, and unable to intercept pointer events. Do not bake readable text into background images. Use the approved artwork as visual guidance and create reusable optimized image layers for implementation.

The portrait must depict Agboola in a navy polo, with glasses and gray goatee. Use the approved edited portrait or a supplied original processed consistently with it. Do not swap in a stock person. The background of the portrait is neutral and the head must have adequate space above it. A chest-up crop should show the polo collar.

Project images should be owner-approved product screenshots where available. Until they are provided, use clearly identified illustrative previews on private review builds. Blog images may use licensed technology photography or original illustrations appropriate to the article. Do not imply that generic stock photography depicts a client installation.

## 04 Shared components and navigation

Header height is 80 px on desktop and 68 px on mobile. Show AG and “Agboola Olomola” on the left, navigation on the right. Use gold for the active page label and a short underline. The current route also receives aria-current. Detail pages activate their parent Projects or Blog item.

The header can remain sticky with a subtle shadow after scrolling. Anchor destinations must account for its height. Include a visible-on-focus “Skip to content” link before navigation. On mobile, show the brand and a Menu button. Opening Menu reveals a labeled navigation panel with a Close button, visible focus, and a clear active item. Escape closes it, focus returns to Menu, and background scrolling is locked while a modal drawer is open.

Primary buttons have gold fill, navy text, and a minimum 44 px target height. Hover darkens the gold slightly and focus adds an obvious outer ring. Secondary buttons are outlined navy on light sections and outlined white on navy sections. Disabled controls must communicate why they are unavailable. Buttons submit or trigger actions, and links navigate.

Cards use one clear title link plus a descriptive action. Avoid nesting interactive elements inside a clickable parent. Project cards may contain a preview, category, title, short description, status label when verified, and View Initiative. Do not open an external tab without indicating the destination behavior.

Footer columns contain brand description, quick links, services, and contact information. Brand description is “IT Consultant, Systems Administrator, Technology Strategist & Entrepreneur.” Use the approved contact details. Show only social profiles whose URLs are verified. The resume identifies LinkedIn at https://www.linkedin.com/in/agolomola/. Other social icons in the mockup require confirmed destinations.

Footer legal links point to real approved pages. Render the current year automatically. The reference’s 2025 is not a fixed content requirement. The Stay Updated field is optional and appears only with a working subscription integration and approved privacy copy. Otherwise use the contact block in that space.

## 05 Home page content and interactions

Use the approved homepage section order. The hero eyebrow is “Technology • People • Business Impact.” H1 is “IT Consultant, Systems Administrator & Technology Strategist.” Highlight “Technology Strategist” in gold. Body copy is “I help organizations build, secure, and scale reliable technology solutions — from IT operations and infrastructure to business technology strategy and product innovation.” Actions are View Resume and Request a Consultation. View Resume opens /resume. Consultation opens /contact?intent=consultation.

The About preview heading is “A Technology Leader with a Business Mindset.” Copy is “I’m Agboola Olomola, an IT consultant, systems administrator, and technology entrepreneur. My work connects hands-on technical problem-solving with business requirements, service delivery, and digital product development.” More About Me opens /about.

The four Core Expertise cards are IT Infrastructure & Systems Administration, IT Support & Operations Leadership, Business Technology Strategy, and Product Innovation & Delivery. Their descriptions respectively cover reliable environments, support operations, business-aligned planning, and product requirements through implementation. Cards can link to the corresponding service section.

Replace the reference’s 10+, 50+, and 20+ figures with three qualitative statements until approved evidence exists: “Hands-on IT operations,” “Business-focused planning,” and “Digital product initiatives.” Keep the compact three-column presentation. Verified statistics may later replace these through structured content.

The Experience Highlights section introduces technology consulting, technical support and field services, and IT engineering. Use the source-backed organizations from the resume. Do not publish the reference’s 2020–Present, 2017–2020, or 2013–2017 dates as employment history. Where dates are unconfirmed, omit the date badge.

Selected Work uses approved initiative cards, initially prepared for SautiCall, Influrios, and SquadPay. Show actual availability and approved descriptions. The generic transformation case studies in the original image are templates, not established achievements. View All Projects opens /projects.

Services shows the four service areas. The sample “Former Manager” testimonial remains hidden until an authentic quote and attribution are approved. Collapse that section cleanly when empty. The final contact band contains the two approved emails, mobile number, location, Request a Consultation, and Send a Message.

## 06 About page design and copy

The About visual board shows a compact navy technology hero, a portrait at right, white narrative sections, a working-approach grid, and a closing CTA. Use one H1, “Technology with a business mindset.” Introductory copy is “I help organizations connect practical IT operations with business goals.” Hero actions are View Resume and Contact Me. Avoid a self-linking About Me button on this page.

The main biography reads: “I’m Agboola Olomola, a Houston-based technology professional working across IT operations, technical consulting, systems implementation, and digital solutions. I enjoy understanding how people use technology, identifying where processes break down, and turning business requirements into practical technical work.”

Continue with: “My background spans user support, network and infrastructure services, systems integration, and technology product initiatives. I combine hands-on problem-solving with requirements analysis, documentation, and coordination across technical and business stakeholders.”

The My Approach section contains four equal cards. Understand: “Learn the business context, the current environment, and the outcome that matters.” Plan: “Translate requirements into a practical scope, priorities, and implementation steps.” Deliver: “Coordinate the technical work, test key workflows, and document the result.” Support: “Review operation, clarify ownership, and identify the next improvements.”

Areas of Focus contains four short descriptions. IT Operations covers reliable day-to-day systems and support. Systems Integration covers connecting tools and workflows. Business Automation covers repeatable processes and reduced manual effort. Digital Products covers requirements, user journeys, and implementation planning.

Experience and Initiatives introduces Nueve Technologies, technical support and field services associated with Kwik Tech, and LEKS Computers. Treat these as professional background references. Do not imply that a historical entity is currently trading without confirmation. The biography does not need a full employment timeline because that belongs on Resume.

The closing heading is “Let’s discuss your technology needs.” Copy is “Share the challenge, the system you are improving, or the idea you want to develop.” Actions are Request a Consultation and Contact Me. On mobile, show the hero text before the portrait, then the biography, approach cards, focus areas, and CTA.

## 07 Resume page design and content

Use H1 “Experience and capabilities” and a brief introduction: “A summary of my professional background in IT operations, technical consulting, systems implementation, and digital solutions.” Actions are Download PDF and Contact Me. The PDF button appears only when an approved file is configured. If unavailable, show “Resume download is being updated. Contact me for a copy.”

The page must be readable as HTML. On desktop, place professional history in an eight-column main area and skills/contact in a four-column sidebar. On mobile, place profile and expertise before experience, followed by education only when confirmed. Use a print layout with white background and hide navigation, decorative patterns, and form CTAs.

Professional Profile: “Technology professional with a broad background across IT engineering, user support, network services, systems implementation, software solutions, and technology consulting. Experience includes building and supporting technology environments, coordinating technical service delivery, and developing cloud, communications, and digital-product initiatives.”

Technology Consulting and Solutions — Nueve Technologies. Bullets: “Assess business technology needs, operational workflows, automation opportunities, and integration requirements.” “Coordinate solution design across cloud applications, communications platforms, and digital services.” “Develop requirements, support testing, and translate business processes into technical workflows.”

Technical Support and Field Services — Kwik Tech. Bullets: “Provide or coordinate computer troubleshooting, network and IT support, and field technical services.” “Assess technical issues and document service requirements.” “Support connectivity, equipment, and end-user technology needs.” Confirm organization naming and historical dates before publishing employment claims.

IT Engineering and Solutions — LEKS Computers. Bullets: “Work on client technology requirements, computer systems, and practical IT solutions.” “Support technical engineering and customer technology needs.” The source lists a founder/lead role and an October 2002 start, but the current end date requires confirmation. Do not infer continuous tenure from an unresolved source.

Expertise tags include IT service delivery, technical troubleshooting, network support, systems integration, cloud collaboration, technical documentation, and product requirements. The source mentions education and professional affiliations but qualifies exact credential details. Hold those entries for confirmation. DTS role and dates also remain unpublished until confirmed. Use the updated website emails in any future downloadable resume revision.

## 08 Services page design and copy

H1 is “Practical technology support for your business.” Introductory copy is “From IT operations to digital product planning, start with the problem you need to solve.” The first CTA is Request a Consultation. A short in-page service navigation links to #it-consulting, #systems-administration, #support-leadership, and #product-strategy.

IT Consulting: “Make informed technology decisions based on your business needs, current systems, and operational priorities.” Suitable topics include technology reviews, requirements discovery, system selection, integration planning, and implementation scoping. Typical outputs are a findings summary, priority list, and agreed implementation plan. CTA Discuss This Service opens /contact?intent=consultation&service=it-consulting.

Systems Administration: “Support the configuration, maintenance, and improvement of the systems your team relies on.” Scope may include user access, device and server environments, collaboration systems, network coordination, backup checks, and technical documentation. Deliverables depend on the agreed engagement. CTA carries service=systems-administration.

IT Support Leadership: “Improve how support requests are received, prioritized, resolved, and reviewed.” Work can include intake processes, escalation paths, service ownership, knowledge articles, vendor coordination, and operational reporting. CTA carries service=support-leadership.

Technology and Product Strategy: “Turn an idea or business requirement into a clear product direction and implementation plan.” Work can include workflow mapping, user journeys, feature prioritization, integration requirements, acceptance criteria, and release planning. CTA carries service=product-strategy.

How We Work uses four steps: Discover the problem; Define the scope; Implement the agreed work; Review the result. Each step has one sentence and a simple icon. Avoid promising fixed timing, fixed pricing, around-the-clock support, or guaranteed business outcomes without owner confirmation.

FAQ answers: “Can we work remotely?” — “Remote work is available. On-site arrangements can be discussed based on location and project needs.” “Can you review an existing system?” — “Yes. Share the environment and the problem you want to address.” “How is an engagement priced?” — “Scope and pricing are discussed after the initial requirements are understood.” “Can I ask about a project still at the idea stage?” — “Yes. An initial discussion can help clarify the problem, users, and next steps.”

## 09 Projects listing design and content

H1 is “Selected work and initiatives.” Introductory copy is “Explore technology and product initiatives across communications, digital platforms, and operational workflows.” Use a featured project row, category filters, and a responsive card grid. The default filter is All. Additional filters are IT Operations, Cloud & Communications, and Digital Products. Only show categories containing visible records.

Project cards contain a 16:10 image, category, title, short summary, optional verified status, and View Initiative. Use a project’s configured internal slug rather than automatically constructing an external website link. External links appear only when the destination is verified and appropriate for visitors.

SautiCall proposed summary: “A cloud communications initiative exploring phone-system workflows, AI-assisted reception, and business notifications.” Category is Cloud & Communications. Suggested visual is an approved call-management interface. Until supplied, the review image must say Illustrative Preview. Verify exact personal contribution, current availability, integrations, and any feature claims before public release.

Influrios proposed summary: “An influencer discovery and collaboration platform initiative connecting professional profiles, business opportunities, and collaboration workflows.” Category is Digital Products. Use an approved discovery or profile screenshot with permission to display any personal details. Do not show private admin data, payment records, or real user contact information in the preview.

SquadPay proposed summary: “A group bill-splitting initiative focused on shared receipts, item selection, and contribution tracking.” Category is Digital Products. Suggested visual is an approved receipt and contribution flow. Do not describe payments, instant payouts, or funding routes as operational unless currently verified.

Infrastructure, ownCloud collaboration, and service-delivery projects may be added when the owner provides a publishable account of the work. The existing resume references a 2016 ownCloud initiative, but detailed scope and outcomes still need owner review. Do not invent a case study to fill a card slot.

Filter selection updates the visible cards and the URL query parameter category. Preserve selection on Back navigation. Show “No projects match this category” with Clear Filters when appropriate. A no-content state says “Project details are being prepared” and offers Contact Me. Use pagination or Load More after nine items if the library grows.

## 10 Project detail template

Each detail page starts with breadcrumb Home / Projects / project name, the project title, a concise summary, category, and a verified status where available. A wide image below the header introduces the actual work. A private draft may use an illustrative image with an explicit label. Public pages must accurately describe what the image represents.

The desktop body uses an eight-column narrative and a four-column facts panel. The facts panel can contain role, focus areas, timeframe when confirmed, relevant technologies when confirmed, and an approved external link. Omit unknown fields instead of publishing “TBD.” On mobile, put the essential facts below the lead image and before the narrative.

Required narrative sections are The Opportunity, My Contribution, Workflow or Implementation Focus, and Current Scope or Outcomes. Choose Outcomes only when there is evidence for the stated result. Follow with two or three related initiatives and a CTA “Discuss a similar project.” The CTA opens Contact with the project slug as context and a visible prefilled subject.

Proposed SautiCall narrative for owner review: The Opportunity — “Business calls involve routing, follow-up, and repeated communication tasks. This initiative explores how cloud telephony and AI-assisted workflows can support those interactions.” My Contribution — “My work focuses on product requirements, call-flow planning, and systems integration across the communications experience.” Workflow Focus — “The design considers inbound call handling, receptionist workflows, account configuration, and business notifications.” Current Scope — “The project continues through implementation and validation. Public descriptions should reflect the features available at the time of publication.”

Do not reuse that contribution statement as a verified claim until the owner approves it. Each initiative needs its own role description. Avoid customer names, implementation screenshots, performance metrics, or partner logos without publication permission and supporting evidence.

A missing or unpublished slug returns an actual 404 response. Previous and Next navigation only includes published records. External links show a clear destination label. If a video is provided, include captions and a poster image, load it on user action, and provide a text summary of the demonstrated workflow.

## 11 Blog listing and editorial design

H1 is “Notes on technology and business.” Introductory copy is “Practical observations on IT operations, automation, systems integration, and digital product development.” The visual board presents an editorial layout with one featured story and a smaller article grid. Its sample articles are draft concepts, not a claim that posts have already been published.

Featured card contains a 16:9 image, category, title, excerpt, author, publication date when published, and Read Article. The article grid contains the same fields in a compact layout. Avoid fabricated reading times. Calculate estimated reading time from the published body using one consistent rule, such as 200 words per minute rounded up.

Search placeholder is “Search articles.” Search considers title, excerpt, category, and approved tags. Category choices are All, IT Operations, Automation, and Digital Products, reduced to categories with published articles. Search and filters are reflected in q and category query parameters. Debounce requests if search is remote. Enter submits immediately. Announce the result count accessibly without moving keyboard focus.

Proposed draft titles and excerpts: “Building reliable IT operations” — “A practical look at support processes, documentation, and service ownership.” “When to automate a workflow” — “Questions to ask before replacing a manual process with an automated one.” “Planning a digital product” — “Start with the user’s problem, the core journey, and the smallest useful release.” “Connecting systems with purpose” — “Define the information that needs to move before choosing the integration.”

Display nine articles per page when sufficient content exists. Keep pagination accessible with Previous, page numbers, and Next. Preserve search and category when changing page. Clear Filters resets the search and category. No results copy is “No articles match your search. Try another term or clear the filters.”

If there are no approved published articles at launch, show “Articles are being prepared” and a Contact Me link. The footer newsletter field remains conditional on an operational subscription service. Article thumbnails require meaningful alt text when they convey content and empty alt text when they repeat nearby information purely decoratively.

## 12 Article detail and sample draft

Article pages use breadcrumb, category, H1, author, publication date, optional updated date, and a lead image. Reading width is approximately 720 px with 18/30 px body text on desktop and 16/26 px on mobile. A desktop table of contents can sit alongside articles with at least three substantive headings. On mobile, collapse it behind an “In this article” disclosure.

Draft article title: Building reliable IT operations

Opening copy: “Reliable IT operations depend on people knowing what they own, how work enters the team, and what to do when something goes wrong. Tools support that process, but the process needs to be understandable before it can be measured or improved.”

Start with ownership: “For each important system, identify who manages access, who responds to incidents, and who makes decisions about changes. Record a backup contact where one exists. A short ownership register can prevent a simple issue from moving between teams without a clear next action.”

Make support requests traceable: “Capture requests in a consistent place. Describe the issue, who is affected, the urgency, and the action already taken. Prioritize work according to its impact on the business. Give the requester a clear way to follow progress and understand what is needed from them.”

Document recurring work: “Write down the steps that are repeated, especially work involving access, configuration, troubleshooting, and handover. Keep instructions close to the tools and people using them. Review documentation when a process changes so that it remains useful during a real incident.”

Review what fails repeatedly: “A resolved ticket does not always remove the underlying cause. Look for recurring incidents, unclear handoffs, and tasks that require avoidable manual effort. Choose a manageable improvement, test it, and record whether it reduced the problem.”

Closing copy: “Start with a small number of critical systems and repeat the review as the environment changes. Consistency in ownership, support intake, and documentation provides a practical foundation for improvement.”

This is proposed ghostwritten content requiring owner review before publication under his name. The detail footer shows the author bio, two related published articles, and “Discuss your IT operations.” Copy Link announces success and handles clipboard failure with a selectable URL. Images, tables, and code blocks must fit on mobile. Draft article URLs remain private and noindex.

## 13 Contact page and form copy

H1 is “Let’s work together.” Introductory copy is “Tell me what you are working on and where you need support.” Desktop uses a five-column contact panel and a seven-column form. Mobile shows a short introduction, form tabs, form, and then secondary contact methods. Contact information remains available without submitting a form.

| Contact field | Exact display value | Interaction |
| --- | --- | --- |
| Primary email | a@agboolaolomola.com | mailto link |
| Secondary email | ag@richardwinfred.com | mailto link |
| Mobile | +1 832 593 3512 | tel:+18325933512 |
| Location | Houston, Texas (On-Site & Remote) | Plain text |

Use tabs “Message” and “Consultation.” A direct link with intent=consultation opens the Consultation tab. Tabs must support keyboard navigation and expose their selected state. Changing tabs should preserve compatible values already entered.

Message fields are Full name required, Email required, Company optional, Topic required, Phone optional, and Message required. Topics are IT Consulting, Systems Administration, IT Support Leadership, Technology and Product Strategy, Recruitment or Opportunity, and Other. Service links preselect the matching topic. A Project Context field can appear read-only when entered from a project page, with an option to clear it.

Help text beneath Message is “Describe the challenge, your current setup, and what you would like to achieve.” The contact permission checkbox reads “I agree to be contacted about this inquiry.” Add a Privacy Policy link beside it. This permission covers the inquiry only and must not opt the visitor into marketing.

The action label is “Send Message.” While submitting, show “Sending…” and prevent duplicate clicks. Success heading is “Your message has been received.” Supporting copy is “Thank you for getting in touch. I’ll review your inquiry and respond using the contact details you provided.” Show success only after durable server acceptance, with the delivery behavior defined in the implementation section.

On failure, show “Your message could not be sent. Please try again or email a@agboolaolomola.com.” Preserve values and focus an error summary that links to invalid fields. Do not promise a response time until the owner defines one.

## 14 Consultation flow and interaction states

The default consultation workflow is a request for a conversation. It uses the same identity fields as Message, adds Service or Topic, Preferred Date, Preferred Time, Time Zone, and a short Project Summary. Preferred date and time are optional unless a connected booking service requires them. Label the time zone clearly and default to the visitor’s detected zone when supported, with America/Chicago available explicitly.

The form explains “Your requested time will be confirmed by email.” The button reads “Send Consultation Request.” Success reads “Your consultation request has been received. The time is not confirmed yet. I’ll contact you to agree the details.” A preferred time must never produce a calendar booking or a “confirmed” badge without a successful scheduling response.

Validate dates using the selected time zone. Prevent dates in the past when provided. Do not show invented office hours or available slots. If a provider is connected later, replace the preference controls with actual availability and handle expired slots, cancellations, rescheduling, and provider failures using its supported flow. Preserve a contact fallback if the embed fails to load.

| State | User experience | Required behavior |
| --- | --- | --- |
| Default | Labeled editable fields | Clear required markers |
| Invalid field | Specific inline error | Retain input and link from summary |
| Submitting | Sending indicator | Block duplicate action |
| Accepted | Success message | Reference accepted request only |
| Network failure | Retry and email option | Preserve input |
| Rate limited | Wait and retry guidance | No silent failure |
| Filter empty | Explanation and reset | Clear active filters |
| Missing content | 404 and useful links | Correct HTTP response |

For required name use “Enter your name.” For email use “Enter a valid email address.” For message use “Tell me how I can help.” Apply reasonable limits such as 100 characters for name, 254 for email, 150 for company, and 5,000 for message. Validate on the server as well as the client. Avoid clearing form data when a user follows Privacy and returns.

## 15 Mobile tablet and accessibility behavior

At 1024 px and above, use the full navigation and multi-column layouts where labels fit. At 768–1023 px, use the compact menu if necessary, two-column cards, and reduced section spacing. Below 768 px, use a single-column reading flow. The actual navigation breakpoint may move slightly if required to prevent wrapping.

Mobile Home order is header, hero copy, hero buttons, portrait, About preview, expertise cards, experience, projects, services, approved testimonial when available, contact band, and footer. Buttons can stack at full width. Avoid making the portrait so tall that it pushes all supporting content far below the first screen. Aim for a portrait width near 280 px, bounded by its container.

Mobile Resume places the download action close to the introduction. Long organization names wrap naturally. Mobile Projects uses one card per row and a wrapping category control or accessible horizontal category list. Mobile Blog places search before filters. Detail pages move their sidebar metadata into the normal reading flow. Mobile forms use one column and place errors next to the field.

Use semantic header, nav, main, section, article, and footer elements. Each page has one H1 and a logical heading order. All actionable controls must work with keyboard alone. Provide visible focus on light and dark backgrounds, use descriptive accessible names for icon-only controls, and avoid relying on color alone for status.

Target WCAG 2.2 AA in implementation. Check text contrast, component contrast, keyboard focus, error identification, label association, reflow at 320 CSS px, and usability at 200 percent zoom. Body links should be identifiable without hover. Accordions must expose expanded state. Input placeholders are supplementary and never replace labels.

Respect reduced-motion preferences. Use static background artwork by default. If motion is added, keep it subtle, avoid continuous parallax, and provide a static reduced-motion treatment. Avoid autoplaying testimonial carousels. If several approved testimonials exist, allow manual Previous and Next buttons with an accessible item indicator.

## 16 Content model and integration requirements

Reuse the existing framework and content platform where practical. Keep templates separate from content records so the owner can update project descriptions, articles, contact details, and resume files without editing layout code. A custom admin portal is outside this handoff unless separately commissioned.

Site settings contain display name, monogram asset, portrait asset, two emails, mobile display and machine-readable value, location, social URLs, resume file, consultation configuration, and optional newsletter configuration. Keep contact values in one place and render them consistently across pages and metadata.

An experience record contains organization, role, summary, bullets, optional start and end dates, current flag, display order, verified flag, and publication status. Missing dates render without a badge. A service record contains stable slug, title, introduction, scope items, typical deliverables, FAQ entries, and contact topic mapping.

A project record contains slug, title, summary, category, cover image with alt text, image classification, personal role, sections, optional dates, verified status, optional external URL, related projects, SEO fields, and draft or published state. An article record contains slug, title, excerpt, category, tags, body, author, cover image, publication and modification dates, and draft or published state. Calculate reading time from body content.

Suggested contact handler contract is POST /api/contact with name, email, company, phone, topic, message, contactPermission, intent, optional serviceSlug/projectSlug, and optional preferredLocalTime/timeZone. Return a validation response for invalid fields, a rate-limit response when applicable, and a success response only when the inquiry is durably stored or accepted for reliable delivery. These route names are implementation suggestions and may follow existing conventions.

Use server-held delivery credentials. Configure the receiving mailbox with the owner before launch. Use an approved sender identity and set Reply-To to the visitor’s validated email. Escape untrusted content in notification templates, reject header injection, and never accept arbitrary destination email addresses from the browser. Use a honeypot and rate limiting, adding an accessible challenge only if needed.

Use an idempotency token for retries to avoid duplicate inquiries. If a queue is used, retry transient failures and expose delivery failures to the operator. Do not log full message bodies or personal contact details in analytics. No email service, calendar, or newsletter integration is considered complete until an end-to-end test succeeds.

## 17 SEO performance and asset delivery

Set a unique title and description for each published page. Suggested Home title is “Agboola Olomola | IT Consultant and Technology Strategist.” About, Resume, Services, Projects, Blog, and Contact use their page topic followed by the name. Project and article titles include the individual title. Use the verified production origin for canonical URLs when the domain is confirmed.

Generate a sitemap from published routes only. Exclude draft previews, internal tools, form endpoints, and private assets. Configure robots behavior for staging and private previews. Add social sharing title, description, and a branded image that contains no misleading credential claims. Person structured data may use verified name, URL, portrait, and approved profile links. Do not publish rating, review, or credential markup from placeholders.

Use optimized responsive portrait and cover images, with explicit dimensions to reserve space. Deliver modern image formats with a compatible fallback according to the framework. Load the hero portrait promptly and lazy-load below-the-fold images. Decorative backgrounds should be reusable and compressed. Avoid sending a full-page mockup as the website itself.

Set implementation budgets of approximately 250 KB for the hero portrait and 300 KB for each large decorative texture where quality permits. Do not treat these proposed budgets as reasons to blur the portrait. Keep interactive client code small and avoid loading a calendar or video embed until it is needed. Use caching and immutable asset names when supported by deployment.

Target largest contentful paint at or below 2.5 seconds, cumulative layout shift at or below 0.1, and interaction to next paint at or below 200 ms under representative conditions. Validate with actual measurements. These are implementation targets, not claims of a completed audit.

Track only useful consent-appropriate events such as resume download, contact action, consultation request accepted, and project view. Exclude field values, email addresses, phone numbers, and message contents from event properties. Privacy and Terms pages must reflect the actual integrations, retention, and operator details selected for launch. Final policy text requires owner approval.

## 18 Developer build order and acceptance criteria

Start by confirming the content schema and the approved identity/contact settings. Build the shared header, footer, type styles, buttons, cards, form fields, and background layers. Implement Home and the shared interior-page hero next. Continue with About, Resume, Services, and Contact. Then build listing and detail templates for Projects and Blog. Connect approved content and integrations, and complete responsive and accessibility checks.

Use the written specification as the source of truth for exact copy, routes, states, and unknown-content handling. The image boards communicate visual composition and may contain abbreviated or generated text. Replace any inconsistent generated labels, draft badges, dates, footer year, or unsupported copy using this document. Do not reproduce entire mockup images as page backgrounds.

Acceptance checks include all seven primary routes, detail pages, legal routes, and missing-page behavior. Verify header active states, direct route loads, Back navigation after filtering, mobile menu focus, anchor offsets, keyboard form use, inline validation, failure recovery, and successful inquiry delivery. Confirm no duplicate inquiry is created by retry or repeated clicks.

Test layouts at 360, 390, 768, 1024, and 1440 px, with a separate reflow check at 320 px. Confirm no clipped text, horizontal page overflow, obscured CTA, or unreadable pattern overlap. Test both mouse and keyboard behavior. Verify image loading, alt text, print styling, and the actual resume download. Validate contrast against the rendered background rather than the palette swatch alone.

Content acceptance requires AG branding, navy polo portrait, navy-and-gold technology backgrounds, the two approved emails, the exact mobile number, Houston location, and consistent conversion wording. Search the project for the removed Gmail and Kwik Tech email and remove them from public website content. Audit all social and external links. Verify that placeholder statistics, quotes, dates, and unapproved drafts are absent from production.

Before launch, resolve the public domain, approved resume file, exact employment dates and credentials, publishable project descriptions and images, receiving mailbox, scheduling mode, actual privacy practices, and optional newsletter provider. Each missing optional item should have a deliberate hidden or empty state. A working inquiry path and accurate public identity content are required for release.

## 19 Visual reference guidance

The following boards extend the approved homepage. They illustrate page composition, typography hierarchy, image placement, card structure, and calls to action. Use their images together with the exact copy and interaction requirements in the preceding sections.

Specific implementation corrections to the concept boards are required. Use the current footer year. Activate Projects on project detail pages and Blog on article detail pages. Replace the About page self-link with View Resume. On Services, View Services may scroll to the service cards. On Projects, View All Projects may scroll to the listing rather than reload the page. Contact has one form with Message and Consultation tabs; the separately pictured consultation strip illustrates the alternate tab and must not become a second incomplete submission form. Preferred date and time are optional in request mode. The mobile Contact view abbreviates the form for space; include the optional Company and Phone fields defined in Section 13. Display only confirmed social links, and replace Stay Updated with contact details if subscriptions are not configured.

Homepage is the approved visual foundation. Its example statistics, dated timeline, and testimonial need the source-of-truth corrections described in Section 05.

About and Resume share the portrait hero but serve distinct purposes. About explains the person and approach. Resume prioritizes professional evidence and an accessible downloadable file.

Services and Projects share the card styling. Services explains what visitors can request. Projects shows approved examples of work and initiatives with accurate availability and contribution statements.

Blog and Contact share the site shell. Blog prioritizes readable editorial content. Contact prioritizes a short, accessible inquiry flow and direct contact options.

Project and Article detail pages use a narrower reading column with supplementary information. Draft captions in the boards are review aids. Public pages display only approved content and real publication metadata.

## 20 Content provenance and decisions

The design source is the user-approved “Tech-driven IT consultant portfolio” image created on 19 November 2026. The selected portrait is the approved navy-polo adaptation of the user-supplied photograph. Contact details and AG branding follow the latest instructions in this conversation.

Professional-background content was checked against Resume_1_Full.doc, read on 19 November 2026. That source explicitly leaves some dates, role details, and credential classifications unresolved. This specification preserves those limitations and does not treat its older Gmail address as current website contact information.

The proposed project summaries use the user’s previously described SautiCall, Influrios, and SquadPay initiatives. Their current feature availability, launch status, individual role wording, and publishable screenshots require owner review. This handoff does not independently verify the live products.

Design decisions made for implementation include Playfair Display with Inter, a 1200 px content container, the token palette, a default consultation-request flow, conditional newsletter display, and structured content records. These choices make the supplied design concrete and can be adapted to the existing codebase while preserving the intended visual result and behavior.

Proposed website copy, including the sample article, is newly drafted for this handoff. No fictional testimonials, metrics, customer outcomes, or professional credentials should be introduced during development.
