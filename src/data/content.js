import sw1 from "../assets/projects/staffworks-1.jpg";
import sw2 from "../assets/projects/staffworks-2.jpg";
import sw3 from "../assets/projects/staffworks-3.jpg";
import sw4 from "../assets/projects/staffworks-4.jpg";
import ew1 from "../assets/projects/eventsworks-1.jpg";
import ew2 from "../assets/projects/eventsworks-2.jpg";
import ew3 from "../assets/projects/eventsworks-3.jpg";
import ew4 from "../assets/projects/eventsworks-4.jpg";
import ew5 from "../assets/projects/eventsworks-5.jpg";
import ch1 from "../assets/projects/carehudl-1.jpg";
import ch2 from "../assets/projects/carehudl-2.jpg";
import pn1 from "../assets/projects/propnewstime-1.jpg";
import pn2 from "../assets/projects/propnewstime-2.jpg";
import shotElynker from "../assets/projects/elynker.jpg";
import shotFertility from "../assets/projects/fertilityanswers.jpg";
import shotRapidGST from "../assets/projects/rapidgst.jpg";
import shotSmartWMS from "../assets/projects/smartwms.jpg";
import fx1 from "../assets/projects/fixai-1.jpg";
import fx2 from "../assets/projects/fixai-2.jpg";
import fx3 from "../assets/projects/fixai-3.jpg";
import sg1 from "../assets/projects/samagra-1.jpg";
import sg2 from "../assets/projects/samagra-2.jpg";
import sg3 from "../assets/projects/samagra-3.jpg";
import sg4 from "../assets/projects/samagra-4.jpg";
import sg5 from "../assets/projects/samagra-5.jpg";
import shotRealEstAi from "../assets/projects/realestai.jpg";
import videoRapidGST from "../assets/projects/rapidgst.mp4";

// employer logos, saved locally rather than hotlinked off their sites.
// both are transparent PNGs that only work on one kind of backdrop — eSoft's
// wordmark is dark grey, Osizone's is white — so each carries the `logoBg` it
// needs and gets that plate in both themes.
import logoEsoft from "../assets/logos/esoft.png";
import logoOsizone from "../assets/logos/osizone.png";

export const profile = {
  name: "Ajay Kumar Pandey",
  role: "React Native Engineer",
  tagline: "React Native developer, seven years in.",
  blurb:
    "I've spent most of that time on healthcare, GST filing, and workforce apps. The work I'm proudest of is usually the unglamorous kind: getting offline sync right, cutting release prep from a day to an hour, figuring out why a list drops frames on a three-year-old Android.",
  email: "rightmajay@gmail.com",
  phone: "+91-6392363003",
  // served from /public — downloads as the filename below
  resume: { url: "/React_Native.pdf", filename: "Ajay-Kumar-Pandey-React-Native.pdf" },
  links: {
    linkedin: "https://www.linkedin.com/in/rightmajay/",
    // rightmajay is a 404 — the account is GittyAjay
    github: "https://github.com/GittyAjay",
    // r8majay.web.app is dead (404) — this is the live one
    site: "https://ajayonlive.vercel.app",
  },
};

// `core` names the handful in each group I'm in most weeks — those get a solid
// chip, everything else recedes. Without the split every entry reads at the
// same weight and none of them land. A name in `core` that isn't in `items` is
// simply ignored.
export const skills = [
  {
    group: "Core",
    items: ["React Native", "Expo", "TypeScript", "JavaScript"],
    core: ["React Native", "Expo", "TypeScript"],
  },
  {
    group: "Navigation & Animation",
    items: ["React Navigation", "Reanimated 2", "Gesture Handler", "Animated API"],
    core: ["React Navigation", "Reanimated 2"],
  },
  {
    group: "Device & Platform",
    items: ["EAS Update", "EAS Build", "Native Modules", "FCM / APNs", "Deep Linking", "FaceID / TouchID"],
    core: ["EAS Update", "EAS Build", "Native Modules"],
  },
  {
    group: "State & Storage",
    items: ["Redux Toolkit", "MMKV", "Zustand", "AsyncStorage", "SQLite", "Context API"],
    core: ["Redux Toolkit", "MMKV"],
  },
  {
    group: "Forms & Validation",
    items: ["react-hook-form", "Zod", "Formik", "Yup"],
    core: ["react-hook-form", "Zod"],
  },
  {
    group: "Testing & Release",
    items: ["Fastlane", "GitHub Actions", "Jest", "Detox", "App Store", "Play Store"],
    core: ["Fastlane", "GitHub Actions", "Jest"],
  },
];

export const experience = [
  {
    company: "e.Soft Technologies",
    site: "https://www.esoftech.com/",
    logo: logoEsoft,
    logoBg: "light",
    period: "Oct 2021 — Present",
    location: "Mumbai, India",
    // one company, two titles — the promotion is worth showing
    roles: [
      { title: "Senior React Native Developer", period: "Feb 2023 — Present" },
      { title: "React Native Developer", period: "Oct 2021 — Feb 2023" },
    ],
    // the job, not the projects — the Work section covers those in detail now,
    // and repeating them here made both read thinner
    summary:
      "Every product in the Work section was built here. Mobile the whole time, senior on the team since 2023.",
    points: [
      "Moved us onto EAS Update. A critical fix used to mean waiting on App Store review; now it's out in about half an hour.",
      "Release prep was a manual afternoon of signing and uploading. I put it behind GitHub Actions and Fastlane, and the botched-build problem mostly went with it.",
      "I mentor four juniors on the team. The PR checklist we use is one I wrote after getting tired of leaving the same three comments.",
      "The briefs that keep coming back to me are offline-first sync and getting a list to hold 60fps on a three-year-old Android. Both show up across the apps above.",
    ],
    projects: ["StaffWorks", "RapidGST", "CareHudl", "EventsWorks", "PropNewsTime", "FixAi", "Samagra Enterprises", "SmartWMS", "Elynker", "RealEstAi", "FertilityAnswers"],
  },
  {
    company: "Osizone Services Pvt. Ltd",
    site: "https://www.osizone.com/",
    logo: logoOsizone,
    logoBg: "dark",
    role: "React Native Developer",
    period: "Jun 2019 — Aug 2021",
    location: "Noida, India",
    // no chips here: the app from this job predates everything in the Work
    // section, so there is nothing above to link a visitor to
    summary:
      "My first job out of university. The app I built here isn't in the Work section above — it shipped before any of those.",
    points: [
      "My first real production app: Aarogyam, used by over 100,000 patients across 12 specialties for appointments, records and billing.",
      "We replaced eight paper workflows in the clinics with actual screens. Staff reckoned it took about 15 minutes off each visit.",
      "I handled store submissions on both platforms, so I learned signing, provisioning and review compliance the hard way.",
    ],
  },
];

// three levels, and nothing in between — a vague middle ground is what makes
// ownership unreadable. Every project declares one.
export const ROLES = {
  solo: { label: "Sole developer", weight: 3 },
  lead: { label: "Team lead", weight: 2 },
  core: { label: "Core developer", weight: 1 },
};

// Each project can carry any of: ios, android, site, github, caseStudy.
// Only the ones you fill in get rendered as buttons — leave the rest out.
//
// `description` is the product. Anything starting "I built…" belongs in
// `contributions` instead, so what I did is never buried in the prose.
export const projects = [
  {
    name: "FertilityAnswers",
    shotType: "web",
    period: "Feb 2026 — Present",
    stack: ["React Native", "Expo", "OpenAI API", "Pinecone"],
    images: [shotFertility],
    links: { site: "https://fertility.medanswers.com/" },
    description:
      "A Q&A app for about 300 fertility specialists. Keyword search kept surfacing the wrong papers.",
    role: "core",
    roleNote: "owned search and retrieval",
    contributions: [
      "Put a RAG pipeline behind search — Pinecone over the corpus, OpenAI answering from what came back",
      "Answers landed a lot closer to what people were actually asking",
    ],
    color: "violet",
  },
  {
    name: "StaffWorks",
    shotType: "phone",
    period: "Jan 2023 — Aug 2023",
    stack: ["React Native", "TypeScript", "Redux", "Socket.io"],
    images: [sw1, sw2, sw3, sw4],
    links: {
      ios: "https://apps.apple.com/in/app/staffworks/id6469592461",
      android: "https://play.google.com/store/apps/details?id=com.gigflex.staffworks",
    },
    description:
      "Shift work for hourly staff. You see your week, accept a shift, then clock in once you're at the venue.",
    role: "solo",
    roleNote: "owned the app end to end",
    contributions: [
      "Geofenced clock-in — the app works out whether you're actually at the venue rather than taking your word for it",
      "Live location and shift changes over Socket.io, holding around 5,000 people online at once on a busy evening",
      "TypeScript throughout, Redux for state",
    ],
    color: "teal",
  },
  {
    name: "EventsWorks",
    shotType: "phone",
    period: "Sep 2022 — Apr 2023",
    stack: ["React Native", "GraphQL", "Node.js", "AWS"],
    images: [ew1, ew2, ew3, ew4, ew5],
    links: {
      ios: {
        url: "https://apps.apple.com/in/app/cincymarshals/id1473793274",
        note: "The iOS build ships under the client's own name, CincyMarshals.",
      },
      android: "https://play.google.com/store/apps/details?id=com.gigflex.eventsworks",
    },
    description:
      "The events side of the same business — staffing a venue, and the leave and absence requests that always land the morning of.",
    role: "core",
    contributions: [
      "Scheduling and crew screens against a GraphQL API",
      "Kept the whole crew talking in one thread instead of across four",
      "Ships under the client's own name on iOS, as CincyMarshals",
    ],
    color: "gold",
  },
  {
    name: "FixAi",
    shotType: "phone",
    period: "",
    stack: ["React Native", "AI assistant"],
    images: [fx1, fx2, fx3],
    links: {
      ios: { isPrivate: true },
      android: "https://play.google.com/store/apps/details?id=com.fixaimobile.app",
      site: "https://www.fixai.ca/",
    },
    description:
      "Home maintenance for people who own appliances and forget they need servicing. It keeps manuals and service history for everything in the house.",
    role: "core",
    roleNote: "owned the assistant",
    contributions: [
      "The troubleshooting assistant — you describe the noise it's making and get an answer out of the documentation, in plain English",
      "Appliance inventory and service-history screens",
    ],
    color: "violet",
  },
  {
    name: "Samagra Enterprises",
    shotType: "phone",
    period: "",
    stack: ["React Native"],
    images: [sg1, sg2, sg3, sg4, sg5],
    links: {
      ios: { isPrivate: true },
      android: { isPrivate: true },
    },
    description: "Rooftop solar, from the first quote to the switch being flipped.",
    role: "core",
    contributions: [
      "Quotation approval in the app, with estimated bill savings shown before the customer commits",
      "Install tracking through site survey, equipment and commissioning, so nobody has to ring to ask where it's up to",
    ],
    color: "gold",
  },
  {
    name: "RapidGST",
    shotType: "web",
    period: "Jan 2026 — Present",
    stack: ["React Native", "RabbitMQ", "AWS"],
    images: [shotRapidGST],
    video: videoRapidGST,
    links: { site: "https://www.rapidgst.com/" },
    description:
      "Sellers were pulling numbers off three or four platforms by hand every filing cycle. This pulls it all in and files in one tap — what took an evening now takes five minutes.",
    role: "core",
    roleNote: "owned the offline layer",
    contributions: [
      "Worked on the core of the app, which about 50,000 people use a month",
      "Wrote the offline layer — everything lands in MMKV first and syncs in the background when the connection returns, which for a lot of these users is not often",
      "Reanimated 2 on anything that had to hold 60fps",
      "FaceID and TouchID login with JWT refresh behind it",
    ],
    color: "coral",
  },
  {
    name: "SmartWMS",
    shotType: "web",
    period: "Jan 2025 — Present",
    stack: ["React Native", "TypeScript", "Razorpay"],
    images: [shotSmartWMS],
    links: { site: "https://www.smartwms.in/" },
    description: "Warehouse management SaaS for small operators — stock, orders and billing in one place.",
    role: "solo",
    contributions: [
      "Dashboard, mobile app and APIs, all three mine",
      "Multi-tenant, so most of the work that took real thought was keeping one customer's data away from the next one's",
      "Razorpay for subscriptions",
    ],
    color: "teal",
  },
  {
    name: "CareHudl",
    shotType: "phone",
    period: "May 2023 — Dec 2023",
    stack: ["React Native", "Redux Saga", "Firebase", "FHIR API"],
    images: [ch1, ch2],
    links: {
      ios: {
        url: "https://apps.apple.com/in/developer/gigflex-llc/id1473793273",
        label: "App Store (Gigflex LLC)",
        note: "The iOS listing sits on the publisher's developer page and isn't available on the India store.",
      },
      android: "https://play.google.com/store/apps/details?id=com.gigflex.carehudl",
    },
    description:
      "Care coordination for around 500 practitioners. It went through a full HIPAA audit, which shaped most of the architecture.",
    role: "core",
    contributions: [
      "Contacts, chat, and audio and video calling",
      "Offline-first throughout, because a lot of them work in buildings with no usable signal",
      "Charting time dropped 37%",
    ],
    color: "gold",
  },
  {
    name: "RealEstAi",
    shotType: "web",
    period: "",
    stack: ["Next.js", "AI document review"],
    images: [shotRealEstAi],
    links: { site: "https://realestai.ca" },
    description:
      "Conveyancing for Alberta law firms. You drop the documents in, it reads them, cross-checks the details against each other and drafts the closing file for a lawyer to approve.",
    role: "core",
    contributions: [
      "Document upload and review screens in Next.js",
      "A file can't close until the cross-checks pass, and that gate is enforced server-side rather than in the UI — a gate in the UI isn't a gate",
    ],
    color: "teal",
  },
  {
    name: "Elynker",
    shotType: "web",
    period: "Apr 2023 — Present",
    stack: ["React Native", "AWS"],
    images: [shotElynker],
    links: { site: "https://www.elynker.com/homepage" },
    description:
      "For small business owners who don't have a marketing team: marketplace listing, a digital profile, Google Business setup, social pages. Everything they'd otherwise pay an agency for, in one place.",
    role: "lead",
    roleNote: "4 developers",
    contributions: [
      "Led four developers — sprint planning and client calls alongside my own build work",
      "Wrote the microsite generator and the catalog tooling myself",
    ],
    color: "coral",
  },
  {
    name: "PropNewsTime",
    shotType: "phone",
    period: "Aug 2023 — Present",
    stack: ["React Native", "Node.js", "MongoDB", "AWS"],
    images: [pn1, pn2],
    links: {
      ios: "https://apps.apple.com/in/app/prop-news-time/id6467655980",
      android: "https://play.google.com/store/apps/details?id=com.propnewstimes",
    },
    description:
      "Indian real estate news, aggregated daily and sorted by category. Around 5,000 people signed up in the first stretch after launch.",
    role: "core",
    contributions: [
      "Feed, category sorting, and saved stories readers come back to",
      "Node.js and MongoDB behind it, on AWS",
    ],
    color: "violet",
  },
];

export const achievements = [
  { title: "Employee of the Year, twice", detail: "at e.Soft, for mobile delivery and for mentoring" },
  { title: "Stack Overflow", detail: "1,008 rep and 14 badges, mostly answering React Native questions. 335 days straight at one point." },
];

export const education = {
  school: "Mahatma Gandhi Kashi Vidyapith",
  location: "Varanasi, India",
  degree: "Bachelor of Computer Applications (BCA)",
  period: "Feb 2016 — May 2019",
};
