// full-page captures — these scroll inside the browser frame
import longRealEstAi from "../assets/projects/realestai-long.jpg";
import longRapidGST from "../assets/projects/rapidgst-long.jpg";
import longElynker from "../assets/projects/elynker-long.jpg";
import longFertility from "../assets/projects/fertilityanswers-long.jpg";
import longSmartWMS from "../assets/projects/smartwms-long.jpg";
import longAryadhan from "../assets/projects/aryadhan-long.jpg";
import longFixAi from "../assets/projects/fixai-long.jpg";

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

export const skills = [
  {
    group: "Languages",
    items: ["JavaScript", "TypeScript", "Node.js", "SQL", "HTML5", "CSS3"],
  },
  {
    group: "Frontend",
    items: ["React.js", "Next.js 14", "Redux Toolkit", "Context API", "TailwindCSS", "Material-UI", "SSR / SSG"],
  },
  {
    group: "Backend",
    items: ["Express.js", "NestJS", "REST APIs", "GraphQL", "Socket.io", "BullMQ"],
  },
  {
    group: "Databases",
    items: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Prisma ORM"],
  },
  {
    group: "AI & GenAI",
    items: ["OpenAI GPT-4", "Claude API", "RAG pipelines", "Vector databases", "Embeddings"],
  },
  {
    group: "Auth & Security",
    items: ["NextAuth.js v5", "JWT", "RBAC", "TOTP MFA", "bcrypt", "Helmet", "Rate limiting"],
  },
  {
    group: "Cloud & DevOps",
    items: ["AWS (EC2, S3, Lambda, CloudFront)", "Azure App Service", "Docker", "GitHub Actions", "Nginx"],
  },
  {
    group: "Testing & Quality",
    items: ["Jest", "React Testing Library", "ESLint", "Prettier", "Sentry"],
  },
];

export const experience = [
  {
    company: "e.Soft Technologies",
    role: "Senior Full Stack Developer",
    period: "Oct 2021 — Present",
    location: "Mumbai, India",
    points: [
      "RealEstAi is mine end to end. I did the architecture and I still do most of the delivery: Next.js 14, multi-tenant, running on Azure with CI/CD.",
      "Its document pipeline runs on GPT-4 and Claude. It reads a legal PDF, pulls the fields out and produces the firm's own version of the document. Drafting that used to be done by hand mostly isn't any more.",
      "FixAi is the other AI one. A RAG pipeline over a vector database, so a troubleshooting answer comes out of the appliance manual instead of the model's imagination.",
      "CareHudl was a healthcare staffing build, with shift matching and credential checks.",
      "On Elynker I was team lead for four developers. Client calls and sprint planning, and I still wrote the microsite and catalog tooling.",
      "Four juniors come to me for code review. Production bugs are down from where they were, and I think the reviews are most of the reason.",
      "22 permission levels on NextAuth.js v5, with TOTP MFA and an audit log behind them.",
      "Spent a while on SSR and SSG for the SEO pages. Lighthouse sits in the 90s now.",
    ],
  },
  {
    company: "Osizone Services Pvt. Ltd",
    role: "Software Developer",
    period: "Jun 2019 — Aug 2021",
    location: "Noida, India",
    points: [
      "Adroit was mine alone. An ed-tech platform where instructors sell courses: HLS live streaming, auto-recording, DRM on delivery through S3 and CloudFront.",
      "Razorpay and Stripe both, covering one-off purchases and subscriptions.",
      "The transcoding pipeline was the fiddly part. Several quality levels, cache invalidation on the CDN, and access checks at the API rather than in the player, since a player can be lied to.",
      "Arogyam I also built alone. Multi-vendor medicine ordering, prescription upload, and a pharmacist has to verify before anything ships.",
    ],
  },
];

// `featured` gets a full-width row with a browser frame; `more` entries are
// text-only cards at the end. Set scrollShot on a full-page capture and it
// scrolls inside the window instead of sitting still.
// Any project can carry site / github / caseStudy links — only what you fill in
// gets rendered.
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
      "Loans against commodities sitting in a warehouse. Four partner banks on it so far. My piece is the Finternet Gateway: the APIs that take data out of the Aryadhan system and put it on chain, plus wallet creation, NFT minting, and pledging or burning tokens as loans get issued and settled. Partner banks don't poll for any of that, they get webhooks.",
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
      "GST filing for people selling on Amazon, Flipkart and Meesho. I wrote the part that reads each marketplace's invoice export and finds the right fields in it, which sounds simple until you see how differently the three of them lay out a spreadsheet. HSN codes, state codes and GSTINs get validated on the way through. Nothing filed on it has come back rejected from the GST portal yet. The APIs run through BullMQ, so a job survives you refreshing the page or losing signal.",
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
      "For small business owners with no marketing team. Marketplace listing, a digital profile, Google Business setup, social pages. I was team lead for four here, which meant client calls and sprint planning on top of the microsite generator and catalog tooling, which I wrote.",
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
      "A question and answer platform for about 300 fertility specialists. Search was keyword-based and kept returning the wrong papers, so we moved it to retrieval: embeddings over the corpus in Pinecone, then OpenAI answering from whatever came back. Much closer to what people were actually asking.",
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
      "Conveyancing for Alberta law firms. You upload the documents, it reads them, checks the details against each other and drafts the closing file for a lawyer to sign off on. A file can't close until those checks pass, and that rule lives on the server, not in the UI, because a gate in the UI isn't a gate. Multi-tenant, 22 permission levels, TOTP MFA, audit trail.",
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
      "Warehouse management, built on my own: dashboard, APIs, billing. It's multi-tenant, so most of the work that took real thought was keeping one customer's data away from the next one's.",
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
      "For people who own appliances and forget they need servicing. Manuals and service history in one place, and an assistant that answers troubleshooting questions out of the documentation rather than guessing.",
    color: "violet",
  },
  {
    name: "CareHudl",
    tier: "more",
    period: "May 2023 — Dec 2023",
    stack: ["Node.js", "Socket.io", "Firebase", "FHIR API"],
    description:
      "Healthcare staffing for around 500 practitioners. Shift matching, credential verification, and the messaging and call plumbing underneath it. It went through a HIPAA audit, which decided a lot of the architecture for us.",
    color: "gold",
  },
  {
    name: "StaffWorks",
    tier: "more",
    period: "Oct 2021 — Feb 2023",
    stack: ["MERN", "Socket.io", "Redis", "Docker", "WebRTC"],
    description:
      "Scheduling for hourly staff. Clock-in and clock-out go by proximity, over Socket.io geofencing, rather than on the honour system. WebRTC calls between managers and field staff, and role-based access with an audit trail of who changed what.",
    color: "teal",
  },
  {
    name: "Adroit",
    tier: "more",
    period: "2019 — 2021",
    stack: ["Node.js", "HLS", "S3 / CloudFront", "Razorpay", "Stripe"],
    description:
      "Ed-tech, built solo from architecture to deployment. Live streaming with auto-recording, transcoding at several quality levels, DRM on delivery, and per-user access enforced at the API.",
    color: "gold",
  },
  {
    name: "Arogyam",
    tier: "more",
    period: "2019 — 2021",
    stack: ["MERN", "MySQL", "Payments"],
    description:
      "Also solo. Multi-vendor medicine ordering with prescription upload, held at a pharmacist verification step before anything ships.",
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
