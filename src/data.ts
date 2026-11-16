export const info = {
  name: "Haseeb Aleem",
  title: "Senior Full Stack Developer",
  tagline:
    "I build multi-tenant SaaS and real-time products with Node.js, React and TypeScript. Most recently I led iPanel, an ISP platform serving 50,000 users.",
  location: "Riyadh, Saudi Arabia",
  email: "haseebaleem2802@gmail.com",
  phone: "+92 308 119 8535",
  whatsapp: "https://wa.me/923081198535",
  linkedin: "https://www.linkedin.com/in/haseeb-aleem-dev/",
  github: "https://github.com/Haseebaleem",
  cv: "/Haseeb_Aleem_Full_Stack.pdf",
};

export const about =
  "I am a full stack developer with 6+ years of experience delivering web applications across React, Node.js, TypeScript, PHP and PostgreSQL. I led the iPanel multi-tenant platform and delivered five production applications for UAE clients. I work across the whole stack: frontend delivery, API design, authentication, database optimization and automated testing.";

export const skills = [
  ["Languages and frameworks", "JavaScript, TypeScript, PHP 8.2, Node.js, Express, React 18, Next.js 14, Laravel 11, Tailwind CSS, shadcn/ui"],
  ["Databases", "PostgreSQL, MySQL, MongoDB, Prisma ORM, Mongoose, atomic transactions, row-level locking, indexing"],
  ["Backend and architecture", "REST APIs, JWT with refresh token rotation, Sanctum, Socket.io, microservices, monorepos, audit logging, rate limiting, RBAC"],
  ["Infrastructure and tooling", "Apache, Nginx, Linux (Ubuntu), Docker, CI/CD, Redis, Git/GitHub, Jest, Vitest, PHPUnit, Agile/Scrum"],
];

export const jobs = [
  {
    role: "Freelance Full Stack Developer",
    company: "Self-employed, remote",
    period: "2020 – Present",
    duration: "6+ yrs",
    badge: "FL",
    stats: ["Remote clients", "8 n8n workflows"],
    tags: ["Node.js", "React", "TypeScript", "PostgreSQL", "Laravel", "n8n"],
    points: [
      "Build and ship custom web applications for clients, from requirements and estimates to deployment and support, using Node.js, React, TypeScript, PostgreSQL and Laravel.",
      "Building an attendance web app for a client, using browser geolocation to capture where employees mark attendance.",
      "Create workflow automations with n8n, including a B2B lead generation agent made of 8 workflows.",
      "Own client delivery from requirements and estimates through implementation, deployment and ongoing support.",
    ],
  },
  {
    role: "Senior Full Stack Developer and Team Lead",
    company: "InstaCom, Multan",
    period: "May 2024 – Jul 2026",
    duration: "2 yrs 3 mos",
    badge: "IC",
    stats: ["50,000 users", "Team of 8", "Thousands of queries/sec"],
    tags: ["Node.js", "Express", "React", "PostgreSQL", "Prisma", "Apache"],
    points: [
      "Led iPanel, a multi-tenant ISP management SaaS on Node.js, Express, React, PostgreSQL and Prisma, serving multiple ISPs and 50,000 users.",
      "Optimized queries and API response times in a production environment handling thousands of queries per second.",
      "Built role-based access control across tenant boundaries so each ISP's data stays isolated.",
      "Set up an Apache reverse proxy with SSL virtual hosts for the React SPA and pgAdmin.",
      "Led a team of 8: sprint planning, code reviews, mentoring and coding standards.",
    ],
  },
  {
    role: "Full Stack Developer",
    company: "InstaCom, Multan",
    period: "Oct 2023 – Apr 2024",
    duration: "7 mos",
    badge: "IC",
    stats: ["+30% engagement", "70% performance gain"],
    tags: ["PostgreSQL", "REST APIs", "RADIUS"],
    points: [
      "Built Radius Management System (RMS) v1 on my own, for ISP authentication and accounting. It grew into iPanel v2.",
      "Built a customer portal that raised user engagement by 30%.",
      "Designed PostgreSQL schemas that improved performance by 70%.",
    ],
  },
  {
    role: "Full Stack Developer",
    company: "Dee Designers, Multan (UAE clients)",
    period: "Jul 2021 – Sep 2023",
    duration: "2 yrs 3 mos",
    badge: "DD",
    stats: ["5 production apps", "UAE clients"],
    tags: ["React", "Node.js", "PHP", "MySQL", "Arabic RTL"],
    points: [
      "Delivered 5 production apps for UAE clients: Al Guthmi Online, Rugs Dubai, Posh Interior, Project Tracking System and Car AC Repair.",
      "Adapted layouts for right-to-left Arabic content and GCC design conventions.",
      "Worked remotely with the Dubai office and visited it in 2023.",
    ],
  },
  {
    role: "Full Stack Developer",
    company: "Data Byes, Multan",
    period: "Apr 2020 – Jul 2021",
    duration: "1 yr 4 mos",
    badge: "DB",
    stats: ["Monolith to microservices", "+25% user satisfaction"],
    tags: ["Microservices", "REST APIs", "Authentication"],
    points: [
      "Built Sell My Phone, a device buyback platform with a valuation engine.",
      "Led the migration of a monolith to microservices and built custom integration APIs.",
      "Mentored two junior developers on Git, REST design and query optimization.",
    ],
  },
];

export type PortfolioProject = {
  name: string;
  status: string;
  ownership: string;
  highlights: string[];
  repo: string;
  live: string;
  desc: string;
  stack: string;
  details?: { title: string; items: string[] }[];
};

export const projects: PortfolioProject[] = [
  {
    name: "iPanel",
    status: "Company platform",
    ownership: "Built the platform end to end and led the eight-person delivery team.",
    highlights: [
      "End-to-end ISP workflows spanning subscriber onboarding, network configuration, billing and accounting.",
      "Separate application and RADIUS PostgreSQL databases with Prisma clients and directional logical replication.",
      "Transactional subscriber creation and shared invoice-settlement logic for manual and gateway payment flows.",
      "Database-driven forms and PostgreSQL notifications connected to live browser updates through Socket.IO.",
    ],
    repo: "",
    live: "",
    desc: "An ISP operations platform connecting operators, franchises, dealers, subdealers and subscribers. iPanel brings service provisioning, package management, billing, reseller balances, accounting and network monitoring into one React application backed by Node.js and PostgreSQL.",
    stack: "React, TypeScript, Vite, Node.js, Express, PostgreSQL, Prisma, Socket.IO",
    details: [
      {
        title: "Platform setup and access",
        items: [
          "Operator and company setup, service-area hierarchies, customer/vendor records, classifications, invoice templates and billing settings.",
          "Super Admin, Admin, Franchise, Dealer, Subdealer and Subscriber roles, with configurable permissions and role-aware navigation.",
          "JWT bearer-token authentication and bcrypt password hashing for panel accounts. Backend role and ownership enforcement remains a review area in the documented local source.",
        ],
      },
      {
        title: "Subscriber lifecycle and service catalog",
        items: [
          "Products define charges; plans combine products and quantities; packages connect commercial pricing with network policies, IP pools and bandwidth allocation.",
          "Subscriber onboarding creates credentials, profile, parent reseller links, address, package, activation settings, order and applicable initial invoice within an application transaction.",
          "Profile and package changes, expiry management, static-IP assignment, NAS associations, documents, identity proof, contacts, comments and subscriber inventory.",
          "RADIUS access attributes and group membership are stored in the application database and replicated to the network authentication database.",
        ],
      },
      {
        title: "Reseller hierarchy and revenue sharing",
        items: [
          "Operator → franchise → dealer → subdealer → subscriber relationships, with package and NAS assignments at reseller level.",
          "Reseller margins, profit shares, wallet balances, credit limits, payment records and statements.",
          "Separate franchise, dealer and subdealer ledgers, with payment logic distinguishing internal parent-wallet transfers from external gateway receipts.",
        ],
      },
      {
        title: "Billing and subscription payments",
        items: [
          "Subscription orders and invoices, quotations, refunds, payment processing and service activation/renewal workflows.",
          "Business-specific calculations for recurring charges, one-time charges, prorated prices and sequential taxes: other tax is applied to the PRA-inclusive amount.",
          "The documented prepaid renewal rule targets the 10th of the following month; Pay-As-You-Go expiry advances by one calendar month.",
          "A shared settlement helper connects invoice payment, wallet movement, ledger posting, reseller shares and RADIUS expiry updates. Financial edge cases require further verification.",
        ],
      },
      {
        title: "Accounting and reporting",
        items: [
          "A hierarchical chart of accounts, account and subaccount numbering, general ledgers and role-specific reseller ledgers.",
          "Expenses, bank accounts and deposits, funds transfers, journals, credit notes and debit notes.",
          "Sales, payments, due invoices, user balances, refunds, account ledgers, consolidated statements, trial balance, profit/loss, tax and employee-related report views.",
          "Invoices, wallet movements and accounting postings are distinct records, allowing service charges and money movements to be traced separately.",
        ],
      },
      {
        title: "RADIUS architecture and live monitoring",
        items: [
          "Two PostgreSQL databases separate panel operations from RADIUS access and session data; Prisma handles the schema clients and pg supports SQL and persistent notification listeners.",
          "Eight shared configuration tables replicate from iPanel to RADIUS; three authentication/accounting tables replicate back to iPanel, with a defined write owner for each direction.",
          "Completed sessions are archived on the RADIUS side. Replicated accounting changes trigger PostgreSQL notifications, which the backend converts into Socket.IO online/offline updates.",
          "NAS and policy configuration, authentication/accounting logs, usage views, server/network information, IP pools, assignments and IP change history.",
          "Router actions and CoA/disconnect integration depend on a separately configured RADIUS service, reachable devices, SSH access and required remote tools.",
        ],
      },
      {
        title: "Configurable forms and frontend workflows",
        items: [
          "Database-driven form definitions control labels, required fields, visibility, defaults, input metadata and regex validation using stable field keys.",
          "The documented local baseline contains 36 forms and 239 fields reconstructed from active frontend consumers.",
          "React Router organizes protected feature pages; Axios supplies API requests; Redux and context support shared interface and permission state.",
          "Shared grids, searchable selections, permission trees, document/table export tools and file/image previews support operational workflows. Uploads are stored by the backend with associated database records.",
        ],
      },
      {
        title: "JazzCash integration",
        items: [
          "Gateway configuration, payment requests, transaction logging and signed callbacks are implemented in the source.",
          "HMAC-SHA256 verification checks callback integrity, and payment processing connects to the shared subscriber/reseller settlement helpers.",
          "Live merchant payments were not verified by the documented local checks. Pending wallet-payment state is in memory; durable recovery, duplicate callbacks and reconciliation remain review points.",
        ],
      },
      {
        title: "Documented verification and current scope",
        items: [
          "The project guide dated 16 November 2026 records a successful frontend production build, initial login, all 11 shared-table replication directions, completed-session history/notifications and form API coverage.",
          "The local schemas contain 102 application models and 11 RADIUS models; shared tables exist in both databases. These counts describe schema scope, not production traffic or distinct business features.",
          "Quota/FUP automation contains incomplete paths. Multi-invoice settlement, partial/exact-balance payments, concurrent posting, money/date handling and authorization coverage need dedicated review.",
          "This is a company platform with no public source or demo linked here. The recorded local checks do not establish complete live-payment or real-device verification.",
        ],
      },
    ],
  },
  {
    name: "Inventory-POS",
    status: "Full-stack application",
    ownership: "Designed and implemented the frontend, API and database.",
    highlights: ["Atomic sales transactions with row-level stock locking.", "Owner and cashier roles, stock movements and audit history.", "Thermal-print receipts and concurrency-safe sale numbers."],
    repo: "Inventory-POS",
    live: "",
    desc: "Multi-cashier point-of-sale and inventory system. Sales complete atomically with row-level locking, sale numbers are concurrency-safe, and receipts are thermal-printer ready.",
    stack: "Node.js, TypeScript, React, PostgreSQL, Prisma, Tailwind CSS",
  },
  {
    name: "Marketplace",
    status: "Full-stack application",
    ownership: "Designed and implemented the application across the frontend, backend and shared types.",
    highlights: ["Admin, supplier and buyer workflows.", "TypeScript monorepo with shared contracts.", "Audit logging and concurrency-aware commerce operations."],
    repo: "Marketplace",
    live: "",
    desc: "Multi-vendor e-commerce platform with Admin, Supplier and Buyer roles, concurrency-safe operations, audit logging and a type-safe monorepo.",
    stack: "Next.js 14, TypeScript, Node.js, Express, PostgreSQL, Prisma",
  },
  {
    name: "Task-Manager",
    status: "Full-stack application",
    ownership: "Built the frontend, backend and database integration.",
    highlights: ["Collaborative Kanban workflows with Socket.io.", "Threaded comments and activity timelines.", "Authenticated multi-user access and audit history."],
    repo: "Task-Manager",
    live: "",
    desc: "Real-time collaborative Kanban board with multi-user auth, activity timelines, threaded comments and a full audit trail.",
    stack: "React, Node.js, Express, Socket.io, PostgreSQL, Prisma",
  },
  {
    name: "NewsHub",
    status: "Full-stack application",
    ownership: "Built the React application and Laravel API with PostgreSQL persistence.",
    highlights: ["Server-side news proxy keeps provider keys out of the browser.", "Bookmarks retain article snapshots.", "Reading history, preferences and activity statistics."],
    repo: "NewsHub",
    live: "",
    desc: "Personal news aggregator with bookmarks, reading history and stats. A server-side API proxy keeps third-party API keys out of the browser.",
    stack: "Laravel 11, React 18, TypeScript, PostgreSQL",
  },
  {
    name: "Auth-Boilerplate",
    status: "Backend starter",
    ownership: "Built the authentication API and database integration.",
    highlights: ["Short-lived access tokens with refresh-token rotation.", "Role-based authorization and schema validation.", "Password hashing and centralized error responses."],
    repo: "Auth-Boilerplate",
    live: "",
    desc: "Production-ready Node.js authentication starter with JWT access and refresh token rotation, bcrypt hashing, role-based authorization and strict input validation.",
    stack: "Node.js, JWT, bcrypt, RBAC",
  },
  {
    name: "TextKit",
    status: "Browser application",
    ownership: "Rebuilt and implemented the current application, tools and tests.",
    highlights: ["Text transformations, encoding, JSON tools and diff utilities.", "Client-side processing with local history.", "Pure utility functions covered by automated tests."],
    repo: "TextKit",
    live: "https://haseeb-textkit.netlify.app",
    desc: "Developer text utilities suite with 15+ tools for transformations, analysis, encoding and generators, with a dark-first UI and unit tests.",
    stack: "React, TypeScript, Vite, Tailwind CSS",
  },
  {
    name: "Inkwell",
    status: "In development",
    ownership: "Built the current frontend and backend foundation.",
    highlights: ["JWT authentication with refresh-token rotation.", "MongoDB-backed API and protected client routes.", "Themed workspace shell; note features are not yet complete."],
    repo: "Inkwell",
    live: "",
    desc: "Foundation for a note-taking application, with authentication, protected routing and a themed workspace. Note editing is still in development.",
    stack: "React, TypeScript, Node.js, Express, MongoDB",
  },
];

export const education = [
  ["BSCS, Bahauddin Zakariya University", "Sep 2022 – Jun 2026"],
  ["ICS, Emerson University, Multan (HEC, IBCC and MOFA attested)", "2020 – 2022"],
  ["Web Development (Net Rider), Spoken English and SEO (Ace Institute)", "Certifications"],
];

export const roles = [
  "Senior Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "Node.js & TypeScript Engineer",
  "React & Next.js Developer",
  "Laravel & PHP Developer",
  "Team Lead",
];
