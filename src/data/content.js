// full-page captures — these scroll inside the browser frame
import longRealEstAi from "../assets/projects/realestai-long.jpg";
import longRapidGST from "../assets/projects/rapidgst-long.jpg";
import longElynker from "../assets/projects/elynker-long.jpg";
import longFertility from "../assets/projects/fertilityanswers-long.jpg";
import longSmartWMS from "../assets/projects/smartwms-long.jpg";
import longAryadhan from "../assets/projects/aryadhan-long.jpg";
import longFixAi from "../assets/projects/fixai-long.jpg";

// employer logos, saved locally rather than hotlinked off their sites.
// both are transparent PNGs that only work on one kind of backdrop — eSoft's
// wordmark is dark grey, Osizone's is white — so each carries the `logoBg` it
// needs and gets that plate in both themes.
import logoEsoft from "../assets/logos/esoft.png";
import logoOsizone from "../assets/logos/osizone.png";

export const profile = {
  name: "Ajay Kumar Pandey",
  role: "Senior Full Stack Developer",
  tagline: "Full stack developer, seven years in.",
  blurb:
    "Seven years of MERN and Next.js. The last two have been mostly AI work: document pipelines for law firms, a RAG assistant, GST filing that has to come out right the first time. Two of the platforms below I built alone. On one I ran a team of four.",
  email: "rightmajay@gmail.com",
  phone: "+91-6392363003",
  // served from /public — downloads as the filename below
  resume: {
    url: "/Full_Stack_developer.pdf",
    filename: "Ajay-Kumar-Pandey-Full-Stack.pdf",
  },
  links: {
    linkedin: "https://www.linkedin.com/in/rightmajay/",
    // rightmajay is a 404 — the account is GittyAjay
    github: "https://github.com/GittyAjay",
    // r8majay.web.app is dead (404) — this is the live one
    site: "https://ajayonlive.vercel.app",
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
    items: ["React.js", "Next.js 14", "Redux Toolkit", "SSR / SSG", "TailwindCSS", "Context API", "Material-UI"],
    core: ["React.js", "Next.js 14", "Redux Toolkit"],
  },
  {
    group: "Backend",
    items: ["Express.js", "REST APIs", "BullMQ", "Socket.io", "NestJS", "GraphQL"],
    core: ["Express.js", "REST APIs", "BullMQ"],
  },
  {
    group: "Databases",
    items: ["MongoDB", "PostgreSQL", "Prisma ORM", "Redis", "MySQL"],
    core: ["MongoDB", "PostgreSQL", "Prisma ORM"],
  },
  {
    group: "AI & GenAI",
    items: ["OpenAI GPT-4", "RAG pipelines", "Vector databases", "Claude API", "Embeddings"],
    core: ["OpenAI GPT-4", "RAG pipelines", "Vector databases"],
  },
  {
    group: "Auth & Security",
    items: ["NextAuth.js v5", "RBAC", "JWT", "TOTP MFA", "Rate limiting", "bcrypt", "Helmet"],
    core: ["NextAuth.js v5", "RBAC", "JWT"],
  },
  {
    group: "Cloud & DevOps",
    items: ["AWS (EC2, S3, Lambda, CloudFront)", "Docker", "GitHub Actions", "Azure App Service", "Nginx"],
    core: ["AWS (EC2, S3, Lambda, CloudFront)", "Docker", "GitHub Actions"],
  },
  {
    group: "Testing & Quality",
    items: ["Jest", "React Testing Library", "Sentry", "ESLint"],
    core: ["Jest", "Sentry"],
  },
];

export const experience = [
  {
    company: "e.Soft Technologies",
    site: "https://www.esoftech.com/",
    logo: logoEsoft,
    logoBg: "light",
    role: "Senior Full Stack Developer",
    period: "Oct 2021 — Present",
    location: "Mumbai, India",
    // the job, not the projects — the Work section already covers those in
    // detail, and repeating them here just made both read thinner
    summary:
      "Nine of the products in the Work section were built here. I take architecture on new builds and stay on them through delivery.",
    points: [
      "Team lead on Elynker — four developers, sprint planning and client calls alongside my own build work.",
      "Code review for four juniors. Production bugs are down from where they were, and I think the reviews are most of the reason.",
      "The last two years have been mostly AI work — document pipelines and RAG, in products clients actually pay for rather than prototypes.",
      "Auth and permissions across the products: NextAuth.js v5, role-based access, TOTP MFA, audit logging.",
      "SSR and SSG on everything SEO-facing. Lighthouse sits in the 90s.",
    ],
    projects: ["RealEstAi", "Aryadhan", "RapidGST", "Elynker", "FertilityAnswers", "SmartWMS", "FixAi", "CareHudl", "StaffWorks"],
  },
  {
    company: "Osizone Services Pvt. Ltd",
    site: "https://www.osizone.com/",
    logo: logoOsizone,
    logoBg: "dark",
    role: "Software Developer",
    period: "Jun 2019 — Aug 2021",
    location: "Noida, India",
    summary:
      "My first job out of university, and both products here were mine alone — architecture through deployment, nobody else on the repo.",
    points: [
      "Learned video the hard way: streaming, transcoding and DRM, with nobody more senior on hand to ask.",
      "Both products moved real money and gated real access, so payments and authorisation were mine to get right.",
      "Talked to the clients myself, which is where I learned to ask what a feature is for before building it.",
    ],
    projects: ["Adroit", "Arogyam"],
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
    stack: ["Node.js", "Express.js", "BullMQ", "MongoDB", "Avalanche (AVAX)", "Webhooks"],
    images: [longAryadhan],
    scrollShot: true,
    links: { site: "https://www.arya.ag/" },
    description:
      "Loans against commodities sitting in a warehouse, with four partner banks on it so far.",
    role: "core",
    roleNote: "owned the Finternet Gateway",
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
    stack: ["Next.js", "Redux Toolkit", "Prisma", "BullMQ", "MongoDB", "AWS"],
    images: [longRapidGST],
    scrollShot: true,
    links: { site: "https://www.rapidgst.com/" },
    description:
      "GST filing for people selling on Amazon, Flipkart and Meesho. Nothing filed on it has come back rejected from the GST portal yet.",
    role: "core",
    roleNote: "owned the invoice pipeline",
    contributions: [
      "Wrote the parser that reads each marketplace's invoice export and finds the right fields — the three of them lay out a spreadsheet very differently",
      "Validation for HSN codes, state codes and GSTINs on the way through",
      "Moved the filing APIs onto BullMQ, so a job survives a page refresh or lost signal",
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
    stack: ["Node.js", "OpenAI API", "Pinecone", "RAG"],
    images: [longFertility],
    scrollShot: true,
    links: { site: "https://fertility.medanswers.com/" },
    description:
      "A question and answer platform for about 300 fertility specialists. Search was keyword-based and kept returning the wrong papers.",
    role: "core",
    roleNote: "owned search and retrieval",
    contributions: [
      "Replaced keyword search with retrieval — embeddings over the corpus in Pinecone, OpenAI answering from whatever came back",
      "Results landed much closer to what people were actually asking",
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
    stack: ["Node.js", "React", "TypeScript", "Razorpay"],
    images: [longSmartWMS],
    scrollShot: true,
    links: { site: "https://www.smartwms.in/" },
    description:
      "Warehouse management for small operators — stock, orders and billing in one place.",
    role: "solo",
    contributions: [
      "Dashboard, APIs and billing, all of it mine",
      "Multi-tenant, so most of the work that took real thought was keeping one customer's data away from the next one's",
      "Razorpay for subscriptions",
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
    period: "Oct 2021 — Feb 2023",
    stack: ["MERN", "Socket.io", "Redis", "Docker", "WebRTC"],
    description: "Scheduling for hourly staff, with managers and field crews on opposite ends of it.",
    role: "core",
    contributions: [
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
  { title: "Two platforms built alone", detail: "Adroit and Arogyam, architecture through deployment, nobody else on the repo" },
  { title: "Team lead on Elynker", detail: "four developers, sprint planning and client calls alongside the build" },
  { title: "AI in production", detail: "GPT-4 and Claude doing document work and RAG conversations in live client products" },
];

export const education = {
  school: "Mahatma Gandhi Kashi Vidyapith",
  location: "Varanasi, India",
  degree: "Bachelor of Computer Applications (BCA)",
  period: "Feb 2016 — May 2019",
};
