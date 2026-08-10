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
    "Most of that time has gone on Kafka pipelines, change-data-capture, and keeping a dozen services talking to each other when one of them is having a bad day. The work I'm proudest of is the unglamorous kind: finding the connection pool behind a week of 504s, or shipping a Spring Boot 3 upgrade across every service without anyone noticing.",
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
    // the job, not the systems — the Work section covers those in detail, and
    // repeating them here made both read thinner
    summary:
      "Every system in the Work section was built here. Backend the whole time, and Scrum Lead for a six-person team since 2023.",
    points: [
      "Led the Spring Boot 2.x → 3.3 upgrade across the microservices. Deprecated APIs cleaned up, rolled out without downtime.",
      "Traced a run of 504 gateway errors back to a misconfigured connection pool and got the affected services back inside SLA.",
      "Owned the audit pipeline end to end — connector failures, memory leaks and Kafka lag that only ever showed up under real production load.",
      "Ran point as Scrum Lead for six people and mentored two juniors, mostly through code review.",
      "Moved the nightly batch jobs onto ExecutorService and CompletableFuture so they run in parallel instead of one at a time.",
    ],
    projects: ["Aryadhan", "CDC & Audit Pipeline", "iPulse", "StaffWorks", "CareHudl", "Catalog, Order & Checkout"],
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
      "My first job out of university, and where I learned Spring properly — one platform, two years, most of it in production.",
    points: [
      "Built the REST APIs behind the Aarogyam healthcare platform: patient sign-up, appointments, medical records.",
      "Designed the MySQL schema for patient and clinical data, then kept indexing and queries honest as the user base grew.",
      "Set up role-based access with Spring Security so doctors, patients and admin staff each saw only what they needed to.",
      "Integrated lab reports, pharmacy and SMS/email providers, which took a lot of manual follow-up off the clinics.",
      "Handled several production releases start to finish, usually on a tight sprint.",
    ],
    projects: ["Aarogyam"],
  },
];

// three levels, and nothing in between — a vague middle ground is what makes
// ownership unreadable. Every project declares one.
export const ROLES = {
  solo: { label: "Sole developer", weight: 3 },
  lead: { label: "Team lead", weight: 2 },
  core: { label: "Core developer", weight: 1 },
};

// Backend work has no screenshots, so each system carries a `diagram` instead:
// the services, the brokers and the stores, and which way the data actually
// moves between them. See SystemDiagram.jsx for the layout rules — the short
// version is that `col` runs left to right and `row` runs top to bottom, and
// anything past four columns stops being readable.
//
// A node reads name / what it runs on / the one technical fact worth drawing:
//   { id, label, sub, meta, kind, col, row }
// An edge reads what it is over what it carries:
//   { from, to, label, note, dashed }
// and `facts` under the picture is the part an interviewer actually asks about
// — ordering, delivery, what happens when it fails.
//
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
    name: "Aryadhan",
    tagline: "Commodity-backed lending on a blockchain",
    period: "Feb 2025 — Present",
    stack: ["Java", "Spring Boot", "Apache Kafka", "Avalanche", "REST APIs"],
    links: { site: { isPrivate: true, label: "Partner-bank platform" } },
    description:
      "Commodities sitting in a warehouse get tokenised as NFTs, and partner banks lend against them. Two of the services in the middle of that are mine.",
    role: "core",
    roleNote: "owned the gateway and the adapter",
    contributions: [
      "Built the Blockchain Gateway and the Finternet Adapter in Java and Spring Boot — one talks to the banks, the other talks to the chain",
      "Minting and collateral verification against Avalanche smart contracts, behind an API the banking side can actually use",
      "Kafka event flows for loan requests, collateral checks and payment confirmations, so a slow chain call never blocks a bank call",
    ],
    color: "violet",
    diagram: {
      caption:
        "A loan request never waits on the chain: the adapter answers the bank, Kafka carries the work, and confirmations come back the same way.",
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
        { k: "Topics", v: "loan.requested · collateral.checked · payment.confirmed, all keyed by loan id" },
        { k: "Latency", v: "the chain call is async — the adapter answers the bank on its own clock, not the block's" },
        { k: "Retries", v: "at-least-once delivery, so the gateway checks whether a token already exists before it mints" },
      ],
    },
  },
  {
    name: "CDC & Audit Pipeline",
    tagline: "Keeping every service's copy of the truth in sync",
    period: "Oct 2021 — Present",
    stack: ["Java", "Spring Boot", "Debezium", "Kafka Connect", "Elasticsearch", "MongoDB"],
    links: { site: { isPrivate: true, label: "Internal platform" } },
    description:
      "Services kept drifting out of sync because each one polled the others on its own schedule. This replaced all of that: the database says what changed, and everyone downstream hears it in near real time.",
    role: "solo",
    roleNote: "owned the pipeline end to end",
    contributions: [
      "Built the pipeline on Debezium, Kafka Connect and Spring Boot — row-level changes out of the OLTP databases and onto per-table topics",
      "Wildcard search across Elasticsearch and MongoDB, so millions of records can be searched on a partial match instead of an exact one",
      "Ran the audit side in production: connector restarts, a memory leak in a sink consumer, and consumer lag that only appeared under real load",
      "The failures that mattered were never the ones from the test environment, so most of the work was making them visible before a user hit them",
    ],
    color: "teal",
    diagram: {
      caption:
        "Nothing polls anything. The binlog is the source, Kafka is the fan-out, and every read model is a consumer that can be rebuilt from scratch.",
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
        { k: "Ordering", v: "topics are keyed by primary key, so two edits to the same row can't land out of order" },
        { k: "Rebuild", v: "any read model can be thrown away and rebuilt by resetting that consumer group's offset" },
        { k: "Recovery", v: "a connector that dies resumes from its last committed offset rather than re-snapshotting the table" },
      ],
    },
  },
  {
    name: "iPulse",
    tagline: "Clinic management platform",
    period: "Jan 2025 — Present",
    stack: ["Java", "Spring Boot", "Spring Security", "Apache Kafka", "MySQL", "Redis", "Docker"],
    links: { site: { isPrivate: true, label: "Client platform" } },
    description:
      "Registration, scheduling, prescriptions and billing for clinics, in one backend. Reception is the busiest part of a clinic, so most of the design pressure was there.",
    role: "core",
    roleNote: "owned scheduling and notifications",
    contributions: [
      "Built the scheduling engine — it catches double-bookings on the way in and reshuffles the day when someone cancels",
      "Put clinic notifications on Kafka: reminders, prescription updates and billing alerts all delivered from one pipeline rather than four code paths",
      "Role-based access with Spring Security for admins, doctors, nurses and patients",
      "Cached doctor schedules and patient lookups in Redis, which took the repeated reads off MySQL entirely",
    ],
    color: "gold",
    diagram: {
      caption:
        "Reads that repeat all day come from Redis; anything that has to reach a person leaves through Kafka so a slow SMS provider never holds up a booking.",
      nodes: [
        { id: "app", label: "Clinic front desk", sub: "web · mobile", meta: "REST · JWT bearer", kind: "client", col: 0, row: 1 },
        { id: "api", label: "iPulse API", sub: "Spring Boot", meta: "Spring Security · RBAC", kind: "service", col: 1, row: 1 },
        { id: "sched", label: "Scheduling engine", sub: "conflict rules", meta: "lock per doctor + day", kind: "service", col: 2, row: 0 },
        { id: "redis", label: "Redis", sub: "schedule cache", meta: "read-through, per day", kind: "store", col: 2, row: 1 },
        { id: "mysql", label: "MySQL", sub: "clinical data", meta: "idx (doctor, day)", kind: "store", col: 2, row: 2 },
        { id: "kafka", label: "Kafka", sub: "notification topics", meta: "SMS · email · in-app", kind: "broker", col: 3, row: 0 },
      ],
      edges: [
        { from: "app", to: "api", label: "REST", note: "JWT bearer" },
        { from: "api", to: "sched", label: "book slot", note: "conflict check" },
        { from: "api", to: "redis", label: "lookup", note: "miss → MySQL" },
        { from: "api", to: "mysql", label: "JDBC", note: "HikariCP pool" },
        { from: "sched", to: "kafka", label: "reminder.due", note: "fan-out per channel" },
      ],
      facts: [
        { k: "Double booking", v: "the lock is held per doctor and day, so two receptionists racing one slot get a booking and an error, not two bookings" },
        { k: "Cache", v: "a write invalidates that doctor's day, not the whole doctor — otherwise a busy clinic never gets a hit" },
        { k: "Notifications", v: "leave through Kafka, so a slow SMS provider holds up nothing at the front desk" },
      ],
    },
  },
  {
    name: "StaffWorks",
    tagline: "Employee management, taken off a monolith",
    period: "Nov 2024 — Jul 2025",
    stack: ["Java", "Spring Boot", "Spring Cloud", "MongoDB", "RabbitMQ", "Kubernetes", "JWT"],
    links: { site: { isPrivate: true, label: "Client platform" } },
    description:
      "One employee system that had grown too big to deploy safely. Split into services for employee data, scheduling and payroll, and put behind a gateway.",
    role: "lead",
    roleNote: "led the split",
    contributions: [
      "Broke the monolith into separate Spring Boot services, one deploy at a time, with the old paths still serving until each cut-over was proven",
      "Cross-service JWT auth with Spring Security, plus routing and rate limiting through Spring Cloud Gateway",
      "Moved payroll onto RabbitMQ events with dead-letter queues, because a dropped payroll message is not something you find out about quietly",
      "Added MongoDB read replicas and better indexes, which cleared out most of the timeouts on cross-service reports",
      "Containerised the lot and ran it on Kubernetes so payroll week can scale up on its own",
    ],
    color: "coral",
    diagram: {
      caption:
        "The gateway is the only public door. Payroll talks in events rather than calls, so a failed message waits in a dead-letter queue instead of vanishing.",
      nodes: [
        { id: "client", label: "Clients", sub: "web · mobile", meta: "REST · JWT", kind: "client", col: 0, row: 1 },
        { id: "gw", label: "Cloud Gateway", sub: "Spring Cloud Gateway", meta: "JWT filter · rate limit", kind: "guard", col: 1, row: 1 },
        { id: "emp", label: "Employee svc", sub: "Spring Boot", meta: "own collections", kind: "service", col: 2, row: 0 },
        { id: "sched", label: "Scheduling svc", sub: "Spring Boot", meta: "own collections", kind: "service", col: 2, row: 1 },
        { id: "pay", label: "Payroll svc", sub: "Spring Boot", meta: "publishes, never calls", kind: "service", col: 2, row: 2 },
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
        { k: "The split", v: "one service at a time, with the monolith's old routes still serving until each cut-over was proven" },
        { k: "Reports", v: "the heavy cross-service queries read from a secondary, which is what stopped them timing out against the write path" },
        { k: "Payroll", v: "durable messages, manual ack, dead-letter queue — a failed payroll message waits to be looked at instead of vanishing" },
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
      "Care coordination for around 500 practitioners. It went through a full HIPAA audit, and that shaped the architecture more than any feature did.",
    role: "core",
    roleNote: "owned audit and the media pipeline",
    contributions: [
      "Encrypted patient fields at the field level rather than trusting disk encryption to be the whole answer",
      "Event-sourced the access log on Kafka, so who read which record and when is a replayable stream, not a table someone can quietly update",
      "Streamed 200MB+ DICOM images through a processing pipeline that holds a bounded amount of memory no matter how large the study is",
      "Booking that survives two people tapping the same slot at once, which is the one thing a clinic notices immediately",
      "Terraform on Docker Swarm for the infrastructure, with Twilio behind telemedicine on bad connections",
    ],
    color: "violet",
    diagram: {
      caption:
        "Every read of a patient record emits an event before it returns. The audit trail is derived from that stream, so it cannot drift from what happened.",
      nodes: [
        { id: "clin", label: "Clinicians", sub: "app · portal", meta: "REST · role scoped", kind: "client", col: 0, row: 1 },
        { id: "api", label: "Care API", sub: "Spring Boot", meta: "Spring Security · RBAC", kind: "service", col: 1, row: 1 },
        { id: "kafka", label: "Kafka", sub: "access events", meta: "append-only log", kind: "broker", col: 2, row: 0 },
        { id: "crypto", label: "Field encryption", sub: "PHI columns only", meta: "per-field keys", kind: "guard", col: 2, row: 1 },
        { id: "dicom", label: "DICOM pipeline", sub: "200MB+ studies", meta: "streamed, bounded buf", kind: "service", col: 2, row: 2 },
        { id: "audit", label: "Audit trail", sub: "event-sourced", meta: "derived, not written", kind: "store", col: 3, row: 0 },
        { id: "atlas", label: "MongoDB Atlas", sub: "encrypted store", meta: "ciphertext fields", kind: "store", col: 3, row: 1 },
      ],
      edges: [
        { from: "clin", to: "api", label: "REST", note: "JWT · role scoped" },
        { from: "api", to: "kafka", label: "record.read", note: "before the response" },
        { from: "kafka", to: "audit", label: "project", note: "replayable" },
        { from: "api", to: "crypto", label: "encrypt", note: "on the way in" },
        { from: "crypto", to: "atlas", label: "store", note: "ciphertext only" },
        { from: "api", to: "dicom", label: "upload", note: "chunked stream" },
        { from: "dicom", to: "atlas", label: "object ref", note: "metadata only" },
      ],
      facts: [
        { k: "Audit", v: "the event is emitted before the response returns, so the trail is derived from access rather than written alongside it and trusted" },
        { k: "PHI", v: "encrypted field by field, which means a database dump is ciphertext rather than a spreadsheet of patients" },
        { k: "Memory", v: "a study is streamed through a bounded buffer — a 200MB DICOM costs the same heap as a 2MB one" },
      ],
    },
  },
  {
    name: "Catalog, Order & Checkout",
    tagline: "The commerce services, made to hold up",
    period: "Jan 2022 — Dec 2024",
    stack: ["Java", "Spring Boot", "Elasticsearch", "Resilience4j", "Redis", "Jaeger"],
    links: { site: { isPrivate: true, label: "Internal platform" } },
    description:
      "The search and checkout path of an e-commerce platform. Search was slow, and payment failures were quietly climbing — both turned out to be fixable without a rewrite.",
    role: "core",
    roleNote: "owned search and the retry path",
    contributions: [
      "Added Elasticsearch to the Catalog service from scratch and cut search latency by about 25%",
      "Reworked Order and Checkout retry logic after payment failures crept up — retries with backoff, and an idempotency key so a retry can't charge twice",
      "Put Resilience4j circuit breakers between the services, so one struggling dependency degrades instead of taking the checkout down with it",
      "Wired up distributed tracing, which turned 'checkout feels slow' into a span I could point at",
    ],
    color: "teal",
    diagram: {
      caption:
        "Two paths through the same storefront: search reads from an index rather than the database, and checkout only reaches the payment gateway through a breaker.",
      nodes: [
        { id: "store", label: "Storefront", sub: "web · app", meta: "REST", kind: "client", col: 0, row: 1 },
        { id: "cat", label: "Catalog svc", sub: "Spring Boot", meta: "reads the index", kind: "service", col: 1, row: 0 },
        { id: "chk", label: "Checkout svc", sub: "Spring Boot", meta: "idempotency key", kind: "service", col: 1, row: 2 },
        { id: "es", label: "Elasticsearch", sub: "search index", meta: "p95 down ~25%", kind: "store", col: 2, row: 0 },
        { id: "cb", label: "Resilience4j", sub: "breaker + retry", meta: "backoff, then open", kind: "guard", col: 2, row: 2 },
        { id: "psp", label: "Payment gateway", sub: "third party", meta: "someone else's SLA", kind: "external", col: 3, row: 2 },
      ],
      edges: [
        { from: "store", to: "cat", label: "search", note: "wildcard + facets" },
        { from: "store", to: "chk", label: "pay", note: "one key per attempt" },
        { from: "cat", to: "es", label: "query", note: "not the tables" },
        { from: "chk", to: "cb", label: "call", note: "guarded" },
        { from: "cb", to: "psp", label: "charge", note: "retry is safe" },
      ],
      facts: [
        { k: "Search", v: "queries hit the index instead of the catalog tables, which is where the ~25% off p95 came from" },
        { k: "Payments", v: "every retry of one checkout carries the same idempotency key, so a retry can't charge a card twice" },
        { k: "Degrading", v: "when the gateway is slow the breaker opens and checkout fails fast rather than holding threads until the pool is gone" },
      ],
    },
  },
  {
    name: "Aarogyam",
    tagline: "Healthcare platform — the first one I built",
    period: "Jun 2019 — Aug 2021",
    stack: ["Java", "Spring Boot", "Spring Security", "MySQL", "REST APIs"],
    links: { site: { isPrivate: true, label: "Client platform" } },
    description:
      "Patient sign-up, appointments and medical records for a clinic network, with labs and pharmacy hanging off the side of it. Built at Osizone, and the platform I learned Spring on.",
    role: "core",
    contributions: [
      "Wrote the REST APIs for sign-up, appointments and medical records",
      "Designed the MySQL schema for patient and clinical data, then spent the next year tuning indexes and queries as the tables filled up",
      "Role-based access with Spring Security, so a doctor, a patient and an admin see three different versions of the same record",
      "Integrated lab reports, pharmacy and SMS/email providers, which removed a lot of the phoning-round the clinics were doing",
    ],
    color: "gold",
    diagram: {
      caption:
        "Authorisation sits in front of the API, not inside each controller — every request is filtered by role before it reaches a record.",
      nodes: [
        { id: "pat", label: "Patients", sub: "portal", meta: "role: PATIENT", kind: "client", col: 0, row: 0 },
        { id: "doc", label: "Doctors · admin", sub: "console", meta: "role: DOCTOR / ADMIN", kind: "client", col: 0, row: 2 },
        { id: "sec", label: "Spring Security", sub: "filter chain", meta: "role → endpoint", kind: "guard", col: 1, row: 1 },
        { id: "api", label: "Aarogyam API", sub: "Spring Boot REST", meta: "service layer", kind: "service", col: 2, row: 1 },
        { id: "sql", label: "MySQL", sub: "records · billing", meta: "indexed and tuned", kind: "store", col: 3, row: 0 },
        { id: "ext", label: "Labs · pharmacy", sub: "SMS · email", meta: "one adapter each", kind: "external", col: 3, row: 2 },
      ],
      edges: [
        { from: "pat", to: "sec", label: "request", note: "own records only" },
        { from: "doc", to: "sec", label: "request", note: "assigned patients" },
        { from: "sec", to: "api", label: "authorised", note: "filtered by role" },
        { from: "api", to: "sql", label: "JDBC", note: "indexed reads" },
        { from: "api", to: "ext", label: "reports", note: "async callbacks" },
      ],
      facts: [
        { k: "Access", v: "the filter chain decides before a controller runs, so a check someone forgets in one handler can't leak a record" },
        { k: "Schema", v: "patient and clinical tables, re-indexed and re-tuned as the tables filled up rather than designed once and left" },
        { k: "Integrations", v: "labs, pharmacy and messaging each sit behind their own adapter, so one flaky provider is one class" },
      ],
    },
  },
];

export const achievements = [
  { title: "Employee of the Year, twice", detail: "at e.Soft, for backend delivery and for mentoring" },
  {
    title: "Stack Overflow",
    detail: "1,008 rep and 14 badges, mostly answering Java and Spring questions. 335 days straight at one point.",
  },
];

export const education = {
  school: "Mahatma Gandhi Kashi Vidyapith",
  location: "Varanasi, India",
  degree: "Bachelor of Computer Applications (BCA)",
  period: "Feb 2016 — May 2019",
};
