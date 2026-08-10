// employer logos, saved locally rather than hotlinked off their sites.
// both are transparent PNGs that only work on one kind of backdrop — eSoft's
// wordmark is dark grey, Osizone's is white — so each carries the `logoBg` it
// needs and gets that plate in both themes.
import logoEsoft from "../assets/logos/esoft.png";
import logoOsizone from "../assets/logos/osizone.png";

export const profile = {
  name: "Ajay Kumar Pandey",
  role: "Senior Java Backend Engineer",
  tagline: "Java and Spring Boot, seven years in.",
  blurb:
    "Backend work, mostly Java and Spring Boot. Kafka pipelines, change data capture, and a fair amount of production debugging. I've led a small team and owned a few systems end to end, across healthcare, e-commerce and lending.",
  email: "rightmajay@gmail.com",
  phone: "+91-6392363003",
  // served from /public — downloads as the filename below
  resume: { url: "/Java_Resume.pdf", filename: "Ajay-Kumar-Pandey-Java.pdf" },
  // the number the hero badge shows, kept here so the copy has one home
  badge: { value: "7+ yrs", label: "on JVM backends" },
  links: {
    linkedin: "https://www.linkedin.com/in/rightmajay/",
    // rightmajay is a 404 — the account is GittyAjay
    github: "https://github.com/GittyAjay",
  },
};

// `core` names the handful in each group I'm in most weeks — those get a solid
// chip, everything else recedes. Without the split every entry reads at the
// same weight and none of them land. A name in `core` that isn't in `items` is
// simply ignored.
export const skills = [
  {
    group: "Core",
    items: ["Java", "Spring Boot", "Spring MVC", "Spring Data JPA", "Hibernate", "REST APIs", "Maven", "Gradle"],
    core: ["Java", "Spring Boot", "Spring Data JPA"],
  },
  {
    group: "JVM & Concurrency",
    items: ["ExecutorService", "Thread Pools", "CompletableFuture", "Streams API", "Collections", "JVM tuning"],
    core: ["ExecutorService", "CompletableFuture", "Streams API"],
  },
  {
    group: "Messaging & Streaming",
    items: ["Apache Kafka", "Kafka Connect", "Debezium", "RabbitMQ", "Change data capture", "Event sourcing"],
    core: ["Apache Kafka", "Debezium", "Kafka Connect"],
  },
  {
    group: "Data & Search",
    items: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "Query tuning"],
    core: ["MySQL", "MongoDB", "Elasticsearch", "Redis"],
  },
  {
    group: "Resilience & Observability",
    items: ["Resilience4j", "OpenTelemetry", "Jaeger", "Kibana", "New Relic", "CloudWatch"],
    core: ["Resilience4j", "OpenTelemetry"],
  },
  {
    group: "Security & Testing",
    items: ["Spring Security", "JWT", "HashiCorp Vault", "JUnit", "Mockito", "JMeter"],
    core: ["Spring Security", "JWT", "JUnit"],
  },
  {
    group: "Cloud & Delivery",
    items: ["Docker", "Kubernetes", "AWS", "Azure", "Jenkins", "GitHub Actions", "Terraform", "ArgoCD", "SonarQube", "NGINX"],
    core: ["Docker", "Kubernetes", "AWS", "Jenkins"],
  },
];

export const experience = [
  {
    company: "e.Soft Technologies",
    site: "https://www.esoftech.com/",
    logo: logoEsoft,
    logoBg: "light",
    role: "Software Development Engineer",
    period: "Oct 2021 — Present",
    location: "Mumbai, India",
    summary:
      "Backend the whole time, and Scrum Lead for a six-person team since 2023. Everything in the Work section was built here.",
    points: [
      "Upgraded the microservices from Spring Boot 2.x to 3.3. Deprecated APIs, dependency bumps, rolled out service by service.",
      "Ran the audit pipeline in production: connector restarts, a memory leak in a sink consumer, Kafka consumer lag.",
      "Tracked a run of 504 gateway errors back to a misconfigured connection pool.",
      "Scrum Lead for six people. Two juniors, mentored mostly through code review.",
      "Rewrote the nightly batch jobs to run in parallel with ExecutorService and CompletableFuture.",
    ],
    projects: ["CDC & Audit Pipeline", "Aryadhan", "StaffWorks", "CareHudl", "Catalog, Order & Checkout"],
  },
  {
    company: "Osizone Services Pvt. Ltd",
    site: "https://www.osizone.com/",
    logo: logoOsizone,
    logoBg: "dark",
    role: "Software Developer",
    period: "Jun 2019 — Aug 2021",
    location: "Noida, India",
    // no project chips here — Aarogyam predates everything in the Work section,
    // so there is nothing above to link a visitor to
    summary:
      "First job out of university, and where I learned Spring properly. One platform, two years, most of it in production.",
    points: [
      "Built the REST APIs for the Aarogyam healthcare platform: patient sign-up, appointments, medical records.",
      "Designed the MySQL schema for patient and clinical data, with indexing and query tuning as it grew.",
      "Role-based access with Spring Security for doctors, patients and admin staff.",
      "Integrated lab reports, pharmacy, and SMS/email providers.",
      "Several production releases, start to finish, on a sprint schedule.",
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

// Backend work has no screenshots, so the systems whose shape is the point
// carry a `diagram`: the services, the brokers and the stores, and which way
// the data moves. Only three of the five have one, deliberately — a diagram on
// every project makes them all look equally considered, and they aren't.
//
// A node reads name / what it runs on / the one technical fact worth drawing:
//   { id, label, sub, meta, kind, col, row }
// An edge reads what it is over what it carries:
//   { from, to, label, note, dashed }
// and `facts` under the picture is the ordering / delivery / failure detail.
//
// See SystemDiagram.jsx for the layout rules. The short version: `col` runs
// left to right, `row` runs top to bottom, four columns is the limit.
// Node kinds: client · service · broker · store · guard · chain · external.
//
// Text has to fit the boxes, and nothing wraps: keep `label` under ~18
// characters, `sub` and `meta` under ~22, and edge `label`/`note` under ~19,
// or they run out past the shape they belong to. Don't route an edge across a
// column that already has a node in that row — it will pass behind the box.
//
// `description` is the system. Anything starting "I built…" belongs in
// `contributions` instead, so what I did is never buried in the prose.
export const projects = [
  {
    name: "CDC & Audit Pipeline",
    tagline: "Change data capture across the services",
    period: "Oct 2021 — Present",
    stack: ["Java", "Spring Boot", "Debezium", "Kafka Connect", "Elasticsearch", "MongoDB"],
    links: { site: { isPrivate: true, label: "Internal platform" } },
    description:
      "Services were polling each other to stay in sync, each on its own schedule, and drifting apart in between. This replaced that with change data capture off the databases.",
    role: "solo",
    roleNote: "owned it end to end",
    contributions: [
      "Built the pipeline on Debezium, Kafka Connect and Spring Boot. Row-level changes out of MySQL and Postgres onto a topic per table.",
      "Wildcard search across Elasticsearch and MongoDB, over a few million records.",
      "Ran the audit side in production: connector restarts, a memory leak in a sink consumer, consumer lag under load.",
      "Most of the work has been operational rather than the initial build.",
    ],
    color: "teal",
    diagram: {
      caption:
        "The database binlog is the source. Kafka fans it out, and each read model downstream is a consumer.",
      nodes: [
        { id: "db", label: "MySQL · Postgres", sub: "OLTP tables", meta: "binlog / WAL on", kind: "store", col: 0, row: 1 },
        { id: "dbz", label: "Debezium", sub: "Kafka Connect", meta: "snapshot → stream", kind: "service", col: 1, row: 1 },
        { id: "kafka", label: "Kafka topics", sub: "one per table", meta: "key = primary key", kind: "broker", col: 2, row: 1 },
        { id: "es", label: "Elasticsearch", sub: "wildcard search", meta: "bulk sink, batched", kind: "store", col: 3, row: 0 },
        { id: "mongo", label: "MongoDB", sub: "read models", meta: "upsert by _id", kind: "store", col: 3, row: 1 },
        { id: "audit", label: "Audit service", sub: "Spring Boot", meta: "group: audit-sink", kind: "service", col: 3, row: 2 },
      ],
      edges: [
        { from: "db", to: "dbz", label: "binlog", note: "row-level, in order" },
        { from: "dbz", to: "kafka", label: "cdc.<table>", note: "row events" },
        { from: "kafka", to: "es", label: "sink", note: "bulk index" },
        { from: "kafka", to: "mongo", label: "sink", note: "idempotent upsert" },
        { from: "kafka", to: "audit", label: "consume", note: "own offset" },
      ],
      facts: [
        { k: "Ordering", v: "Topics are keyed by primary key, so two edits to one row stay in order." },
        { k: "Rebuild", v: "A read model can be dropped and rebuilt by resetting that consumer group's offset." },
        { k: "Recovery", v: "A connector that dies resumes from its last committed offset." },
      ],
    },
  },
  {
    name: "Aryadhan",
    tagline: "Commodity-backed lending on a blockchain",
    period: "Feb 2025 — Present",
    stack: ["Java", "Spring Boot", "Apache Kafka", "Avalanche", "REST APIs"],
    links: { site: { isPrivate: true, label: "Partner-bank platform" } },
    description:
      "Commodities sitting in a warehouse are tokenised as NFTs so partner banks can lend against them. Two of the services in the middle are mine. Still in progress.",
    role: "core",
    roleNote: "the gateway and the adapter",
    contributions: [
      "The Blockchain Gateway and the Finternet Adapter, both Java and Spring Boot. The adapter is the banking-side API; the gateway does the chain work.",
      "Minting and collateral verification against Avalanche smart contracts.",
      "Kafka events between the two for loan requests, collateral checks and payment confirmations.",
    ],
    color: "violet",
    diagram: {
      caption:
        "The adapter answers the bank over REST. Chain work happens behind Kafka, and confirmations come back on a topic.",
      nodes: [
        { id: "bank", label: "Partner bank", sub: "Arya lending desk", meta: "REST · JSON", kind: "client", col: 0, row: 0 },
        { id: "wh", label: "Warehouse", sub: "collateral intake", meta: "receipt → token req", kind: "client", col: 0, row: 2 },
        { id: "adapter", label: "Finternet Adapter", sub: "Spring Boot 3.3", meta: "REST in · Kafka out", kind: "service", col: 1, row: 1 },
        { id: "kafka", label: "Kafka", sub: "3 topics", meta: "key = loan id", kind: "broker", col: 2, row: 1 },
        { id: "gw", label: "Blockchain Gateway", sub: "Spring Boot 3.3", meta: "async tx submit", kind: "service", col: 3, row: 0 },
        { id: "chain", label: "Avalanche C-Chain", sub: "collateral tokens", meta: "ERC-721 · escrow", kind: "chain", col: 3, row: 2 },
      ],
      edges: [
        { from: "bank", to: "adapter", label: "loan request", note: "POST /loans" },
        { from: "wh", to: "adapter", label: "deposit", note: "warehouse receipt" },
        { from: "adapter", to: "kafka", label: "loan.requested", note: "acks=all" },
        { from: "kafka", to: "gw", label: "collateral.checked", note: "group: chain-gw" },
        { from: "gw", to: "chain", label: "mint / verify", note: "one tx per token" },
        { from: "chain", to: "kafka", label: "payment.confirmed", note: "on tx receipt", dashed: true },
      ],
      facts: [
        { k: "Topics", v: "loan.requested, collateral.checked, payment.confirmed. All keyed by loan id." },
        { k: "Retries", v: "Delivery is at-least-once, so the gateway checks for an existing token before it mints." },
      ],
    },
  },
  {
    name: "StaffWorks",
    tagline: "Splitting an employee platform into services",
    period: "Nov 2024 — Jul 2025",
    stack: ["Java", "Spring Boot", "Spring Cloud", "MongoDB", "RabbitMQ", "Kubernetes", "JWT"],
    links: { site: { isPrivate: true, label: "Client platform" } },
    description:
      "One employee system that had got too big to deploy safely. Split into services for employee data, scheduling and payroll, behind a gateway.",
    role: "lead",
    roleNote: "led the split",
    contributions: [
      "Split the monolith one service at a time, with the old routes still serving until each cut-over was done.",
      "JWT auth across the services, plus routing and rate limiting through Spring Cloud Gateway.",
      "Moved payroll onto RabbitMQ events with a dead-letter queue.",
      "MongoDB read replicas and new indexes for the cross-service reports, which had been timing out.",
      "Docker and Kubernetes.",
    ],
    color: "coral",
    diagram: {
      caption:
        "Everything comes in through the gateway. Payroll publishes events; nothing calls it directly.",
      nodes: [
        { id: "client", label: "Clients", sub: "web · mobile", meta: "REST · JWT", kind: "client", col: 0, row: 1 },
        { id: "gw", label: "Cloud Gateway", sub: "Spring Cloud Gateway", meta: "JWT filter · rate limit", kind: "guard", col: 1, row: 1 },
        { id: "emp", label: "Employee svc", sub: "Spring Boot", meta: "own collections", kind: "service", col: 2, row: 0 },
        { id: "sched", label: "Scheduling svc", sub: "Spring Boot", meta: "own collections", kind: "service", col: 2, row: 1 },
        { id: "pay", label: "Payroll svc", sub: "Spring Boot", meta: "publishes events", kind: "service", col: 2, row: 2 },
        { id: "mongo", label: "MongoDB", sub: "replica set", meta: "reports on secondary", kind: "store", col: 3, row: 0 },
        { id: "mq", label: "RabbitMQ", sub: "payroll events", meta: "durable · manual ack", kind: "broker", col: 3, row: 2 },
      ],
      edges: [
        { from: "client", to: "gw", label: "REST", note: "one public door" },
        { from: "gw", to: "emp", label: "route", note: "/employees/**" },
        { from: "gw", to: "sched", label: "route", note: "/shifts/**" },
        { from: "gw", to: "pay", label: "route", note: "/payroll/**" },
        { from: "emp", to: "mongo", label: "primary", note: "writes" },
        { from: "sched", to: "mongo", label: "secondary", note: "for reports" },
        { from: "pay", to: "mq", label: "payroll.run", note: "DLQ on failure" },
      ],
      facts: [
        { k: "The split", v: "One service at a time, with the monolith still serving until each cut-over was proven." },
        { k: "Payroll", v: "Durable messages, manual ack, dead-letter queue." },
      ],
    },
  },
  {
    name: "CareHudl",
    tagline: "Healthcare backend, built to a HIPAA audit",
    period: "May 2023 — Dec 2023",
    stack: ["Java", "Spring Boot", "Spring Security", "Apache Kafka", "MongoDB", "Terraform", "Docker"],
    links: { site: { isPrivate: true, label: "Client platform" } },
    description:
      "Care coordination for around 500 practitioners. It went through a full HIPAA audit, which set most of the constraints on how patient data could be stored and read.",
    role: "core",
    roleNote: "audit trail and the media pipeline",
    contributions: [
      "Field-level encryption on patient data.",
      "Access logging as Kafka events, so the audit trail is derived from the stream.",
      "A processing pipeline for DICOM images, streamed so a 200MB+ study doesn't sit in memory.",
      "Appointment booking that holds up when two people take the same slot.",
      "Terraform on Docker Swarm, and Twilio for telemedicine on bad connections.",
    ],
    color: "gold",
  },
  {
    name: "Catalog, Order & Checkout",
    period: "Jan 2022 — Dec 2024",
    stack: ["Java", "Spring Boot", "Elasticsearch", "Resilience4j", "Redis", "Jaeger"],
    links: { site: { isPrivate: true, label: "Internal platform" } },
    description:
      "The search and checkout path of an e-commerce platform. Search was slow, and payment failures were climbing.",
    role: "core",
    contributions: [
      "Added Elasticsearch to the Catalog service. Search latency down about 25%.",
      "Reworked the Order and Checkout retry logic: backoff, and an idempotency key per attempt.",
      "Resilience4j circuit breakers between the services.",
      "Distributed tracing, which is how I found the slow spans.",
    ],
    color: "violet",
  },
];

export const achievements = [
  { title: "Employee of the Year, twice", detail: "At e.Soft, for backend delivery and mentoring." },
  {
    title: "Stack Overflow",
    detail: "1,008 rep and 14 badges, mostly Java and Spring answers. 335-day streak at one point.",
  },
];

export const education = {
  school: "Mahatma Gandhi Kashi Vidyapith",
  location: "Varanasi, India",
  degree: "Bachelor of Computer Applications (BCA)",
  period: "Feb 2016 — May 2019",
};
