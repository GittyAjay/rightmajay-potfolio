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

export const skills = [
  {
    group: "Core",
    items: ["React Native", "Expo", "TypeScript", "JavaScript"],
  },
  {
    group: "Navigation & Animation",
    items: ["React Navigation", "Reanimated 2", "Gesture Handler", "Animated API"],
  },
  {
    group: "Device & Platform",
    items: ["Native Modules", "Deep Linking", "FCM / APNs", "FaceID / TouchID", "EAS Update", "EAS Build"],
  },
  {
    group: "State & Storage",
    items: ["Redux Toolkit", "Zustand", "Context API", "MMKV", "AsyncStorage", "SQLite"],
  },
  {
    group: "Forms & Validation",
    items: ["react-hook-form", "Formik", "Yup", "Zod"],
  },
  {
    group: "Testing & Release",
    items: ["Jest", "Detox", "GitHub Actions", "Fastlane", "App Store", "Play Store"],
  },
];

export const experience = [
  {
    company: "e.Soft Technologies",
    period: "Oct 2021 — Present",
    location: "Mumbai, India",
    // one company, two titles — the promotion is worth showing
    roles: [
      { title: "Senior React Native Developer", period: "Feb 2023 — Present" },
      { title: "React Native Developer", period: "Oct 2021 — Feb 2023" },
    ],
    points: [
      "I own StaffWorks, a workforce app that holds around 5,000 people online at once. Live location and shift changes run over Socket.io.",
      "Moved us onto EAS Update. A critical fix used to mean waiting on App Store review; now it's out in about half an hour.",
      "Release prep was a manual afternoon of signing and uploading. I put it behind GitHub Actions and Fastlane, and the botched-build problem mostly went away with it.",
      "I mentor four juniors on the team. The PR checklist we use is one I wrote after getting tired of leaving the same three comments.",
      "Before that I worked on the core of RapidGST, a GST compliance app with about 50,000 people using it monthly. Reanimated 2 for anything that had to stay at 60fps.",
      "Wrote its offline layer. Everything lands in MMKV first and syncs in the background whenever the connection comes back, which for a lot of our users is not often.",
      "Added FaceID and TouchID login with JWT refresh behind it, plus Jest and Detox coverage on the flows we couldn't afford to break.",
    ],
  },
  {
    company: "Osizone Services Pvt. Ltd",
    role: "React Native Developer",
    period: "Jun 2019 — Aug 2021",
    location: "Noida, India",
    points: [
      "My first real production app: Aarogyam, used by over 100,000 patients across 12 specialties for appointments, records and billing.",
      "We replaced eight paper workflows in the clinics with actual screens. Staff reckoned it took about 15 minutes off each visit.",
      "I handled store submissions on both platforms, so I learned signing, provisioning and review compliance the hard way.",
    ],
  },
];

// Each project can carry any of: ios, android, site, github, caseStudy.
// Only the ones you fill in get rendered as buttons — leave the rest out.
export const projects = [
  {
    name: "FertilityAnswers",
    shotType: "web",
    period: "Feb 2026 — Present",
    stack: ["React Native", "Expo", "OpenAI API", "Pinecone"],
    images: [shotFertility],
    links: { site: "https://fertility.medanswers.com/" },
    description:
      "A Q&A app for about 300 fertility specialists. Keyword search kept surfacing the wrong papers, so I put a RAG pipeline behind it with OpenAI and Pinecone. The answers got a lot closer to what people were actually asking.",
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
      "Shift work for hourly staff: you see your week, accept a shift, then clock in from the venue. Geofencing decides whether you're actually there, and around 5,000 people are on it at once during a busy evening.",
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
      "The events side of the same business. Staffing a venue, handling the leave and absence requests that always land the morning of, and keeping the crew talking to each other in one thread.",
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
      "Home maintenance for people who own appliances and forget they need servicing. You add what's in the house, it tracks manuals and service history, and when something starts making a noise you describe it to the assistant and get an answer in plain English.",
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
    description:
      "Rooftop solar, from the first quote to the switch being flipped. Customers see their estimated bill savings, approve the quotation in the app, then follow the install through site survey, equipment and commissioning without ringing anyone to ask where it's up to.",
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
      "Sellers were pulling numbers off three or four platforms by hand every filing cycle. This pulls it all in over RabbitMQ and files in one tap. What took an evening now takes five minutes.",
    color: "coral",
  },
  {
    name: "SmartWMS",
    shotType: "web",
    period: "Jan 2025 — Present",
    stack: ["React Native", "TypeScript", "Razorpay"],
    images: [shotSmartWMS],
    links: { site: "https://www.smartwms.in/" },
    description:
      "Warehouse management SaaS I built on my own: dashboard, mobile app, APIs, all of it. Multi-tenant, so most of the hard thinking went into keeping one customer's data properly walled off from the next.",
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
      "Care coordination for around 500 practitioners: contacts, chat, audio and video calls, all offline-first because a lot of them work in buildings with no usable signal. Charting time dropped 37%, and it cleared a full HIPAA audit, which shaped most of the architecture.",
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
      "Conveyancing for Alberta law firms. You drop the documents in, it reads them, cross-checks the details against each other and drafts the closing file for a lawyer to approve. A file can't close until the checks actually pass, and that gate is enforced server-side rather than in the UI.",
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
      "Indian real estate news, aggregated daily and sorted by category. Readers save the stories they want to come back to. Around 5,000 people signed up in the first stretch after launch.",
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
