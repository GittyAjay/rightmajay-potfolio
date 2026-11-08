// full-page captures — these scroll inside the browser frame
import longRealEstAi from "../assets/projects/realestai-long.jpg";
import longRapidGST from "../assets/projects/rapidgst-long.jpg";
import longElynker from "../assets/projects/elynker-long.jpg";
import longFertility from "../assets/projects/fertilityanswers-long.jpg";
import longSmartWMS from "../assets/projects/smartwms-long.jpg";
import longAryadhan from "../assets/projects/aryadhan-long.jpg";
import longFixAi from "../assets/projects/fixai-long.jpg";

// employer logo, saved locally rather than hotlinked. It's a transparent PNG
// with a dark grey wordmark, so it carries the `logoBg` plate it needs.
import logoEsoft from "../assets/logos/esoft.png";

export const profile = {
  name: "Ajay Kumar Pandey",
  role: "Senior Software Engineer",
  tagline: "Web and mobile, five years in.",
  blurb:
    "Five years shipping production web (Next.js, Node.js) and iOS/Android (React Native) products in fintech, healthcare and legal-tech. I'm comfortable owning a product end to end, from API design to App Store release. Lately that's meant putting LLMs and RAG pipelines into live client products.",
  email: "rightmajay@gmail.com",
  phone: "+91-6392363003",
  // served from /public — downloads as the filename below
  resume: {
    url: "/Full_Stack_developer.pdf",
    filename: "Ajay-Kumar-Pandey-Resume.pdf",
  },
  links: {
    linkedin: "https://www.linkedin.com/in/rightmajay/",
    // rightmajay is a 404 — the account is GittyAjay
    github: "https://github.com/GittyAjay",
    // r8majay.web.app is dead (404) — this is the live one
    site: "https://ajaypandeyfullstack.vercel.app/",
  },
};

// `core` names the handful in each group I'm in most weeks — those get a solid
// chip, everything else recedes. Without the split all 40-odd read at the same
// weight and none of them land. A name in `core` that isn't in `items` is
// simply ignored.
export const skills = [
  {
    group: "Languages",
    items: ["JavaScript", "TypeScript", "Node.js", "SQL"],
    core: ["JavaScript", "TypeScript", "Node.js"],
  },
  {
    group: "Frontend",
    items: ["React.js", "Next.js 14", "Redux Toolkit", "Zustand", "SSR / SSG", "TailwindCSS", "Material-UI"],
    core: ["React.js", "Next.js 14", "Redux Toolkit"],
  },
  {
    group: "Mobile",
    items: ["React Native", "Expo", "Reanimated", "EAS Build / Update", "Fastlane", "Offline-first sync", "App Store & Play Store"],
    core: ["React Native", "Expo", "EAS Build / Update"],
  },
  {
    group: "Backend",
    items: ["Express.js", "REST APIs", "BullMQ", "Socket.io", "NestJS", "GraphQL", "WebRTC", "RabbitMQ"],
    core: ["Express.js", "REST APIs", "BullMQ"],
  },
  {
    group: "Databases",
    items: ["MongoDB", "PostgreSQL", "Prisma ORM", "Redis", "MySQL", "SQLite", "MMKV"],
    core: ["MongoDB", "PostgreSQL", "Prisma ORM"],
  },
  {
    group: "AI & GenAI",
    items: ["OpenAI API", "Claude API", "RAG pipelines", "Embeddings", "Pinecone"],
    core: ["OpenAI API", "Claude API", "RAG pipelines"],
  },
  {
    group: "Auth & Security",
    items: ["NextAuth.js v5", "RBAC", "TOTP MFA", "JWT", "Multi-tenant isolation", "Audit logging", "Rate limiting"],
    core: ["NextAuth.js v5", "RBAC", "JWT"],
  },
  {
    group: "Cloud & DevOps",
    items: ["AWS (EC2, S3, Lambda, CloudFront)", "Azure", "Docker", "GitHub Actions", "Nginx", "Avalanche (AVAX)"],
    core: ["AWS (EC2, S3, Lambda, CloudFront)", "Docker", "GitHub Actions"],
  },
  {
    group: "Testing & Quality",
    items: ["Jest", "Detox", "React Testing Library", "Sentry", "ESLint"],
    core: ["Jest", "Detox"],
  },
];

export const experience = [
  {
    company: "e.Soft Technologies",
    site: "https://www.esoftech.com/",
    logo: logoEsoft,
    logoBg: "light",
    role: "Senior Software Engineer",
    roles: [
      { title: "Senior Software Engineer", period: "Feb 2023 — Present" },
      { title: "Software Engineer", period: "Oct 2021 — Feb 2023" },
    ],
    period: "Oct 2021 — Present",
    location: "Mumbai, India",
    // the job, not the projects — the Work section already covers those in
    // detail, and repeating them here just made both read thinner
    summary:
      "Most of the products in the Work section were built here, on web and mobile. I take architecture on new builds and stay on them through delivery.",
    points: [
      "Owned architecture and delivery of RealEstAi, including the GPT-4 and Claude pipeline that pulls structured data out of legal PDFs.",
      "Built and maintain StaffWorks for 5,000+ concurrent mobile users — geofenced clock-in over Socket.io, WebRTC calls, a React Native app on both stores.",
      "Cut critical mobile fix turnaround from days to under 30 minutes with EAS OTA updates; iOS and Android releases automated with GitHub Actions and Fastlane.",
      "Led a team of four on Elynker — client calls, sprint planning and hands-on development.",
      "Designed a 22-level RBAC system with TOTP MFA and audit logging on NextAuth.js v5. I mentor four junior developers and own the team's PR review checklist.",
    ],
    projects: ["RealEstAi", "Aryadhan", "RapidGST", "Elynker", "FertilityAnswers", "SmartWMS", "FixAi", "CareHudl", "StaffWorks"],
  },
];

// `featured` gets a full-width row with a browser frame; `more` entries are
// text-only cards at the end. Set scrollShot on a full-page capture and it
// scrolls inside the window instead of sitting still.
// Any project can carry site / github / caseStudy links — only what you fill in
// gets rendered.
//
// Every project must declare ownership, and it's kept in two separate fields so
// it can't get lost in the prose:
//   role          one of the ROLES below — renders as a badge, scannable
//   contributions the specific things I built, 2–4 short lines
// `description` is the product, not me. Anything starting "I built…" belongs in
// contributions instead.
// three levels, and nothing in between — vague middle ground is the thing that
// made the old copy unreadable. `weight` orders the badge styling.
export const ROLES = {
  solo: { label: "Sole developer", weight: 3 },
  lead: { label: "Team lead", weight: 2 },
  core: { label: "Core developer", weight: 1 },
};

export const projects = [
  {
    name: "Aryadhan",
    tier: "featured",
    period: "Feb 2025 — Present",
    stack: ["Node.js", "Express.js", "BullMQ", "MongoDB", "Avalanche (AVAX)", "NFT", "Webhooks"],
    images: [longAryadhan],
    scrollShot: true,
    links: { site: "https://www.arya.ag/" },
    description:
      "Commodity-backed lending on blockchain — loans against goods sitting in a warehouse, live with four partner banks.",
    role: "core",
    roleNote: "owned the Finternet Gateway · team of 7+",
    contributions: [
      "Built the Finternet Gateway end to end — the APIs that take data out of the Aryadhan system and put it on chain",
      "Wallet creation, NFT minting, and pledging or burning tokens as loans get issued and settled",
      "Webhooks out to the four partner banks, so none of them has to poll",
    ],
    color: "violet",
  },
  {
    name: "RapidGST",
    tier: "featured",
    period: "Oct 2022 — Present",
    stack: ["Next.js", "React Native", "Prisma", "BullMQ", "RabbitMQ", "MongoDB", "Redis", "AWS"],
    images: [longRapidGST],
    scrollShot: true,
    links: { site: "https://www.rapidgst.com/" },
    description:
      "GST filing for people selling on Amazon, Flipkart and Meesho — 50,000+ monthly active users across the web app and a mobile companion.",
    role: "core",
    roleNote: "owned the invoice pipeline · team of 4–6",
    contributions: [
      "Wrote the parser that reads each marketplace's invoice export and finds the right fields — the three of them lay out a spreadsheet very differently",
      "Validation for HSN codes, state codes and GSTINs on the way through",
      "Moved the filing APIs onto BullMQ, so a job keeps processing if the user drops offline",
      "Built the React Native companion app that syncs seller data over RabbitMQ — one-tap submission took filing from hours to under 5 minutes",
    ],
    color: "coral",
  },
  {
    name: "Elynker",
    tier: "featured",
    period: "Apr 2023 — Present",
    stack: ["Next.js", "Node.js", "MySQL", "AWS"],
    images: [longElynker],
    scrollShot: true,
    links: { site: "https://www.elynker.com/homepage" },
    description:
      "For small business owners with no marketing team: marketplace listing, a digital profile, Google Business setup, social pages.",
    role: "lead",
    roleNote: "4 developers",
    contributions: [
      "Led four developers — sprint planning and client calls alongside the build",
      "Wrote the microsite generator and the catalog tooling myself",
    ],
    color: "coral",
  },
  {
    name: "FertilityAnswers",
    tier: "featured",
    period: "Feb 2026 — Present",
    stack: ["React Native", "Expo", "TypeScript", "OpenAI API", "Pinecone", "Redis", "AWS"],
    images: [longFertility],
    scrollShot: true,
    links: { site: "https://fertility.medanswers.com/" },
    description:
      "An AI-powered Q&A app, on iOS and Android, for 300+ fertility specialists. Search was keyword-based and kept returning the wrong papers.",
    role: "core",
    roleNote: "owned search and retrieval",
    contributions: [
      "Replaced keyword search with retrieval — embeddings over the corpus in Pinecone, OpenAI answering from whatever came back",
      "Results landed much closer to what people were actually asking",
      "Cross-platform React Native app, shipped through EAS Build with staged OTA updates",
    ],
    color: "violet",
  },
  {
    name: "RealEstAi",
    tier: "featured",
    period: "2024 — Present",
    stack: ["Next.js 14", "NextAuth.js v5", "PostgreSQL", "GPT-4", "Claude", "Azure"],
    images: [longRealEstAi],
    scrollShot: true,
    links: { site: "https://realestai.ca" },
    description:
      "Conveyancing for Alberta law firms. You upload the documents, it reads them, checks the details against each other and drafts the closing file for a lawyer to sign off on.",
    role: "solo",
    roleNote: "architecture and delivery",
    contributions: [
      "Architecture and most of the delivery, still — Next.js 14, multi-tenant, Azure with CI/CD",
      "The document pipeline: GPT-4 and Claude read a legal PDF, pull the fields out and produce the firm's own version. Drafting that used to be done by hand mostly isn't any more",
      "A file can't close until the cross-checks pass, and that rule lives on the server, not the UI — a gate in the UI isn't a gate",
      "22 permission levels on NextAuth.js v5, TOTP MFA and an audit trail behind them",
    ],
    color: "teal",
  },
  {
    name: "SmartWMS",
    tier: "featured",
    period: "Jan 2025 — Present",
    stack: ["React", "React Native", "Node.js", "TypeScript", "Razorpay"],
    images: [longSmartWMS],
    scrollShot: true,
    links: { site: "https://www.smartwms.in/" },
    description:
      "Multi-tenant warehouse management SaaS for small operators — stock, orders, GST billing and delivery in one place, on web and mobile.",
    role: "solo",
    contributions: [
      "Web dashboard, mobile app and backend, all of it mine",
      "Per-tenant data isolation and role-based access — keeping one customer's data away from the next one's took the most thought",
      "A GST e-invoicing engine: IRN registration, signed QR codes and e-Way Bills",
      "Warehouse app for barcode receiving, picking, packing and proof-of-delivery; Razorpay for subscriptions",
    ],
    color: "teal",
  },
  {
    name: "FixAi",
    tier: "featured",
    stack: ["Node.js", "RAG", "Vector DB", "OpenAI"],
    images: [longFixAi],
    scrollShot: true,
    links: { site: "https://www.fixai.ca/" },
    description:
      "For people who own appliances and forget they need servicing. Manuals and service history in one place.",
    role: "core",
    roleNote: "owned the RAG assistant",
    contributions: [
      "Built the RAG pipeline over a vector database, so a troubleshooting answer comes out of the appliance manual instead of the model's imagination",
      "Document ingestion and embedding for the manuals",
    ],
    color: "violet",
  },
  {
    name: "CareHudl",
    tier: "more",
    period: "May 2023 — Dec 2023",
    stack: ["Node.js", "Socket.io", "Firebase", "FHIR API"],
    description:
      "Healthcare staffing for around 500 practitioners. It went through a HIPAA audit, which decided a lot of the architecture.",
    role: "core",
    contributions: [
      "Shift matching and credential verification",
      "The messaging and call plumbing underneath it",
    ],
    color: "gold",
  },
  {
    name: "StaffWorks",
    tier: "more",
    period: "Oct 2021 — Present",
    stack: ["MERN", "React Native", "Socket.io", "Redis", "Docker", "WebRTC"],
    description: "Workforce platform for hourly staff with 5,000+ concurrent mobile users — managers and field crews on opposite ends of it.",
    role: "core",
    contributions: [
      "React Native app shipped to the App Store and Play Store",
      "Clock-in and clock-out by proximity, over Socket.io geofencing, rather than on the honour system",
      "WebRTC calls between managers and field staff",
      "Role-based access with an audit trail of who changed what",
    ],
    color: "teal",
  },
  {
    name: "Adroit",
    tier: "more",
    period: "2019 — 2021",
    stack: ["Node.js", "HLS", "S3 / CloudFront", "Razorpay", "Stripe"],
    description: "Ed-tech — instructors put their courses up and sell them.",
    role: "solo",
    roleNote: "architecture through deployment",
    contributions: [
      "HLS live streaming with auto-recording, and transcoding at several quality levels",
      "DRM on delivery through S3 and CloudFront, with CDN cache invalidation",
      "Access checks at the API rather than in the player, since a player can be lied to",
      "Razorpay and Stripe, covering one-off purchases and subscriptions",
    ],
    color: "gold",
  },
  {
    name: "Arogyam",
    tier: "more",
    period: "2019 — 2021",
    stack: ["MERN", "MySQL", "Payments"],
    description: "Multi-vendor medicine ordering, pharmacies on one side and patients on the other.",
    role: "solo",
    contributions: [
      "The whole build, alone — ordering, vendor onboarding, payments",
      "Prescription upload, held at a pharmacist verification step before anything ships",
    ],
    color: "coral",
  },
];

export const achievements = [
  { title: "Employee of the Year ×2", detail: "e.Soft Technologies, for mobile delivery and mentoring" },
  { title: "Team lead on Elynker", detail: "four developers, sprint planning and client calls alongside the build" },
  { title: "AI in production", detail: "GPT-4 and Claude doing document work and RAG conversations in live client products" },
];

export const education = [
  {
    school: "Galgotias College of Engineering and Technology",
    location: "Greater Noida, India",
    degree: "Master of Computer Applications (MCA), 72.95%",
    period: "2022",
  },
  {
    school: "Mahatma Gandhi Kashi Vidyapith",
    location: "Varanasi, India",
    degree: "Bachelor of Computer Applications (BCA)",
    period: "2019",
  },
];
