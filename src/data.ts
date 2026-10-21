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
      "Manage an Upwork profile and project catalog, keeping clients updated with clear scope and milestones.",
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

export const projects = [
  {
    name: "iPanel",
    repo: "",
    live: "",
    desc: "Multi-tenant ISP management SaaS used by multiple providers, with tenant-level access control and high query throughput. This is a company project, so there is no public code.",
    stack: "Node.js, Express, React, PostgreSQL, Prisma",
  },
  {
    name: "Inventory-POS",
    repo: "Inventory-POS",
    live: "",
    desc: "Multi-cashier point-of-sale and inventory system. Sales complete atomically with row-level locking, sale numbers are concurrency-safe, and receipts are thermal-printer ready.",
    stack: "Node.js, TypeScript, React, PostgreSQL, Prisma, Tailwind CSS",
  },
  {
    name: "Marketplace",
    repo: "Marketplace",
    live: "",
    desc: "Multi-vendor e-commerce platform with Admin, Supplier and Buyer roles, concurrency-safe operations, audit logging and a type-safe monorepo.",
    stack: "Next.js 14, TypeScript, Node.js, Express, PostgreSQL, Prisma",
  },
  {
    name: "Task-Manager",
    repo: "Task-Manager",
    live: "",
    desc: "Real-time collaborative Kanban board with multi-user auth, activity timelines, threaded comments and a full audit trail.",
    stack: "React, Node.js, Express, Socket.io, PostgreSQL, Prisma",
  },
  {
    name: "NewsHub",
    repo: "NewsHub",
    live: "",
    desc: "Personal news aggregator with bookmarks, reading history and stats. A server-side API proxy keeps third-party API keys out of the browser.",
    stack: "Laravel 11, React 18, TypeScript, PostgreSQL",
  },
  {
    name: "Auth-Boilerplate",
    repo: "Auth-Boilerplate",
    live: "",
    desc: "Production-ready Node.js authentication starter with JWT access and refresh token rotation, bcrypt hashing, role-based authorization and strict input validation.",
    stack: "Node.js, JWT, bcrypt, RBAC",
  },
  {
    name: "TextKit",
    repo: "TextKit",
    live: "",
    desc: "Developer text utilities suite with 15+ tools for transformations, analysis, encoding and generators, with a dark-first UI and unit tests.",
    stack: "React, TypeScript, Vite, Tailwind CSS",
  },
  {
    name: "Inkwell",
    repo: "Inkwell",
    live: "",
    desc: "A modern note-taking app for thinkers, writers and developers.",
    stack: "",
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
