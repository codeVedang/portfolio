import { writeFileSync, mkdirSync, copyFileSync, cpSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const resume = "assets/VEDANG_KUMAR_TRIPATHI_FULL_STACK_DEV_RESUME.pdf";
const icons = [
  "arrow-right",
  "arrow-up-right",
  "arrow-left",
  "download",
  "map-pin",
  "menu",
  "mail",
  "copy",
  "github",
  "linkedin",
  "code-2",
  "mic",
  "image",
];
for (const folder of ["icons", "fonts"])
  mkdirSync(path.join(root, `assets/${folder}`), { recursive: true });
for (const name of icons)
  copyFileSync(
    path.join(
      root,
      `node_modules/lucide-static/icons/${name === "code-2" ? "code-xml" : name}.svg`,
    ),
    path.join(root, `assets/icons/${name}.svg`),
  );
copyFileSync(
  path.join(
    root,
    "node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
  ),
  path.join(root, "assets/fonts/manrope-latin.woff2"),
);
copyFileSync(
  path.join(root, "node_modules/@fontsource-variable/manrope/LICENSE"),
  path.join(root, "assets/fonts/LICENSE.txt"),
);
copyFileSync(
  path.join(root, "node_modules/lucide-static/LICENSE"),
  path.join(root, "assets/icons/LICENSE.txt"),
);

const icon = (name) =>
  `<img class="icon" src="assets/icons/${name}.svg" width="20" height="20" alt="" aria-hidden="true">`;
const link = (
  href,
  text,
  name = "arrow-right",
  cls = "text-link",
  external = false,
) =>
  `<a class="${cls}" href="${href}"${external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${text}${icon(name)}</a>`;
const ext = (href, text, name = "arrow-up-right") =>
  link(href, text, name, "text-link", true);
const brand = `<a class="brand" href="index.html" aria-label="Vedang Kumar Tripathi home"><span>VT</span><span class="brand-slash">/</span><span class="teal">Vedang</span></a>`;
const header = (active) =>
  `<a class="skip-link" href="#main">Skip to content</a><header class="site-header shell">${brand}<button class="menu-toggle" aria-expanded="false" aria-controls="site-nav" aria-label="Open navigation" data-menu-toggle>${icon("menu")}</button><nav id="site-nav" class="site-nav" aria-label="Main navigation">${["Work", "Experience", "About", "Contact"].map((label) => `<a href="${label.toLowerCase()}.html"${active === label.toLowerCase() ? ' aria-current="page"' : ""}>${label}</a>`).join("")}</nav></header>`;
const footer = `<footer class="shell"><div class="footer-invite"><div><p class="eyebrow">NEXT, SOMETHING GOOD.</p><h2>Let's build something <span class="teal">useful.</span></h2></div>${link("contact.html", "Get in touch", "arrow-up-right", "button primary")}</div><div class="footer-bottom">${brand}<p>Full stack + AI. Built with intention.</p><div>${ext("https://github.com/codeVedang", "GitHub")}${ext("https://www.linkedin.com/in/vedangtripathi/", "LinkedIn")}</div><a class="back-top" href="#top">Back to top ${icon("arrow-up-right")}</a></div></footer>`;
const page = (title, description, active, content) => `<!doctype html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="${description}"><meta name="theme-color" content="#ffffff"><meta property="og:title" content="${title} | Vedang Kumar Tripathi"><meta property="og:description" content="${description}"><meta property="og:type" content="website"><title>${title} | Vedang Kumar Tripathi</title><link rel="icon" href="assets/icons/code-2.svg" type="image/svg+xml"><link rel="preload" href="assets/fonts/manrope-latin.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="styles.css"><script src="script.js" defer></script></head><body id="top">${header(active)}<main id="main" class="shell">${content}</main>${footer}</body></html>`;
const intro = (label, title, description, extra = "") =>
  `<section class="page-intro"><p class="eyebrow">${label}</p><h1>${title}</h1><p class="page-description">${description}</p>${extra}</section>`;

const projects = [
  {
    id: "taskplanet",
    number: "01",
    name: "TaskPlanet",
    category: "professional",
    label: "PROFESSIONAL WORK / 3W BUSINESS",
    tagline: "Real product work. Real people.",
    description:
      "Contributed web, mobile, and admin modules to a platform serving 100K users during my first internship.",
    stack: "React / Node.js / MongoDB / WebSockets",
    image: "taskplanet-system.png",
    alt: "Concept illustration of connected web, mobile and admin modules with REST APIs and WebSockets.",
    metric: "100K",
    metricLabel: "users served by the platform",
    action: "Explore my contribution",
  },
  {
    id: "modemesh",
    number: "02",
    name: "ModeMesh AI",
    category: "personal",
    label: "PERSONAL PROJECT / MULTI-AGENT AI",
    tagline: "From a conversation to a useful output.",
    description:
      "A voice-first AI workspace with multi-agent routing, document retrieval, persistent chats, and downloadable outputs.",
    stack: "React / Node.js / LangGraph / RAG",
    image: "modemesh-system.png",
    alt: "Concept architecture connecting voice and documents to ModeMesh AI, agents and outputs, with Redis, MongoDB and Qdrant.",
    metric: "5",
    metricLabel: "connected Node.js microservices",
    action: "Explore the project",
  },
];
const projectRow = (p, lazy = true) =>
  `<article class="project-row" data-category="${p.category}"><div class="project-copy"><p class="eyebrow"><span class="project-index">${p.number} /</span>${p.label}</p><h2><a href="${p.id}.html">${p.name}</a></h2><p class="project-tagline">${p.tagline}</p><p class="project-description">${p.description}</p><p class="stack">${p.stack}</p>${link(`${p.id}.html`, p.action)}</div><a class="project-media" href="${p.id}.html" aria-label="${p.action}: ${p.name}"><img src="assets/${p.image}" alt="${p.alt}" width="1774" height="887"${lazy ? ' loading="lazy"' : ' fetchpriority="high"'}><span class="media-caption"><span>${p.metric} <span>${p.metricLabel}</span></span>${icon("arrow-up-right")}</span></a></article>`;
const impact = `<dl class="impact-strip" aria-label="Experience and impact"><div><dt><span class="approx">Approx.</span> 12 <span class="unit">months</span></dt><dd>Professional full stack experience</dd></div><div><dt>100K <span class="unit">users</span></dt><dd>Platform reach at my first internship</dd></div><div><dt>5 <span class="unit">microservices</span></dt><dd>Built into ModeMesh AI</dd></div></dl>`;
const home = `<section class="hero"><div class="hero-eyebrow"><p class="eyebrow">FULL STACK + AI DEVELOPER</p><a class="experience-note" href="experience.html"><span class="signal" aria-hidden="true"></span>Approx. 12 months of experience ${icon("arrow-up-right")}</a></div><h1>Vedang Kumar<br><span class="teal">Tripathi</span><span class="period">.</span></h1><p class="hero-description">I build thoughtful web experiences<br>and practical AI tools.</p><div class="hero-bottom"><div class="actions">${link("#projects", "Selected work", "arrow-right", "button primary")}${link(resume, "Resume", "download")}</div><p class="location">${icon("map-pin")}Noida, India</p></div></section>${impact}<section id="projects" class="selected-work"><div class="section-heading"><p class="eyebrow">SELECTED WORK / TWO HIGHLIGHTS</p>${link("work.html", "View all work")}</div>${projects.map((p, i) => projectRow(p, i > 0)).join("")}</section>`;
const smallProjects = `<div class="other-work" data-category="personal"><article class="small-project"><div class="small-project-head">${icon("mic")}<span class="eyebrow">03 / PERSONAL PROJECT</span></div><h2>AI Medical Voice Agent</h2><p>A voice consultation assistant with a speech-to-text and text-to-speech pipeline, built with Next.js, TypeScript, OpenAI, and PostgreSQL.</p><p class="stack">Approx. 2-second voice interaction latency</p><div class="actions">${ext("https://ai-medical-voice-agent-v2-peach.vercel.app/", "Live project")}${ext("https://github.com/codeVedang/ai-medical-voice-agent-v2", "Source", "github")}</div></article><article class="small-project"><div class="small-project-head">${icon("image")}<span class="eyebrow">04 / PERSONAL PROJECT</span></div><h2>AI Background Remover</h2><p>An image-editing workflow with asynchronous processing and uploads, built with React, Node.js, Express, MongoDB, and the Clipdrop AI API.</p><p class="stack">20% lower average processing time</p><div class="actions">${ext("https://removal-bg-vedang.vercel.app/", "Live project")}${ext("https://github.com/codeVedang/https---github.com-codeVedang-removal-bg", "Source", "github")}</div></article></div>`;
const work = `${intro("THE WORK", 'Built to be <span class="teal">used.</span>', "From contributing to a platform serving 100K users to building a voice-first AI workspace. A selection of professional and personal work.")}<div class="work-toolbar"><div class="filters" role="group" aria-label="Filter work"><button type="button" data-filter="all" aria-pressed="true">All work</button><button type="button" data-filter="professional" aria-pressed="false">Professional</button><button type="button" data-filter="personal" aria-pressed="false">Personal</button></div><span class="result-count" aria-live="polite" data-result-count>4 projects</span></div><section class="work-list" aria-label="Projects">${projects.map((p) => projectRow(p)).join("")}${smallProjects}</section>`;

const jobs = [
  {
    legal: "CrowdBuzz Technologies Pvt. Ltd.",
    role: "MERN Stack Developer Intern",
    date: "Mar 2026 - Jul 2026",
    summary: "Reusable features. Faster delivery.",
    bullets: [
      "Delivered reusable MERN modules and shared React components, reducing feature development time by 30%.",
      "Developed 15+ REST APIs with JWT authentication and role-based access control for protected workflows.",
      "Optimized MongoDB queries and indexes, reducing API response time by 25%.",
    ],
    stack: "MERN / REST APIs / JWT / RBAC / MongoDB",
  },
  {
    legal: "3W Business Pvt. Ltd. / TaskPlanet",
    role: "Full Stack Developer Intern",
    date: "Sep 2025 - Mar 2026",
    summary: "Contributing to a platform serving 100K users.",
    bullets: [
      "Built customer web, mobile, and admin modules for TaskPlanet, a platform serving 100K users.",
      "Developed 10+ REST APIs and WebSocket notification flows, reducing notification latency by 40%.",
      "Contributed to testing, deployments, and production issue resolution across Agile sprints.",
    ],
    stack: "React / Node.js / REST APIs / WebSockets / Agile",
    href: "taskplanet.html",
  },
];
const list = (values) =>
  `<ul class="detail-list">${values.map((v) => `<li>${v}</li>`).join("")}</ul>`;
const job = (j) =>
  `<article class="experience-row"><div class="job-date"><span>${j.date}</span><span class="muted">Remote / Internship</span></div><div><p class="eyebrow">${j.legal}</p><h2>${j.role}</h2><p class="job-summary">${j.summary}</p>${list(j.bullets)}<p class="stack">${j.stack}</p>${j.href ? link(j.href, "Explore the TaskPlanet work") : ""}</div></article>`;
const experience = `${intro("EXPERIENCE", 'Learning by <span class="teal">shipping.</span>', "Approximately 12 months of professional full stack experience across two internships, from production features to performance improvements.")}${impact}<section class="experience-list" aria-label="Professional experience">${jobs.map(job).join("")}</section><section class="closing-note"><p class="eyebrow">WHAT CAME NEXT</p><h2>From production experience<br>to <span class="teal">ModeMesh AI.</span></h2><p>I brought that full stack foundation into a personal voice-first platform, connecting five microservices with multi-agent routing and document retrieval.</p>${link("modemesh.html", "Explore ModeMesh")}</section>`;
const skills = [
  ["Languages", "JavaScript (ES6+), TypeScript, Python, Java, SQL"],
  [
    "Frontend",
    "React.js, Next.js, Redux Toolkit, Tailwind CSS, Web Speech API",
  ],
  [
    "Backend",
    "Node.js, Express.js, REST APIs, WebSockets, Microservices, JWT, RBAC",
  ],
  ["Databases", "MongoDB, PostgreSQL, Redis, Qdrant"],
  [
    "Cloud & AI",
    "AWS, Docker, LangChain, LangGraph, RAG, Groq, Gemini, Firebase",
  ],
  ["Tools", "Git, GitHub Actions, Render, Postman, Agile/Scrum"],
];
const about = `${intro("A LITTLE ABOUT ME", 'Curious about the details.<br><span class="teal">Focused on the whole.</span>', "I'm Vedang, a full stack developer based in Noida. I enjoy connecting thoughtful interfaces with the systems that make them work.")}<section class="about-story"><p class="eyebrow">HOW I WORK</p><div><p>My experience spans customer-facing web apps, mobile modules, admin tools, APIs, and production issue resolution. At TaskPlanet, I contributed to a platform serving 100K users. At CrowdBuzz, I worked on reusable MERN features, protected workflows, and database performance.</p><p>With ModeMesh AI, I explored the next layer: voice interaction, multi-agent orchestration, and document retrieval. I care about the full journey, from the first interaction to a reliable result.</p>${link("experience.html", "My experience")}</div></section><section id="skills" class="skills-section"><div class="section-heading"><h2>My toolkit.</h2><span class="eyebrow">FULL STACK / CLOUD / AI</span></div><dl class="skills-grid">${skills.map(([a, b]) => `<div><dt>${a}</dt><dd>${b}</dd></div>`).join("")}</dl></section><section class="education-section"><div><p class="eyebrow">EDUCATION</p><h2>A foundation in<br>computer science.</h2></div><div><h3>Bachelor of Technology</h3><p>Computer Science / United Institute of Technology, AKTU</p><p class="stack">2022 - 2026 / CGPA 7.9 out of 10</p><hr><h3>Certifications</h3><p>HackerRank certifications in Problem Solving, HTML, CSS, JavaScript, and React.</p>${link(resume, "Download resume", "download")}</div></section>`;
const contact = `${intro("LET'S CONNECT", 'Good work starts with<br><span class="teal">a conversation.</span>', "Have a full stack role, an AI product, or an interesting problem in mind? I would love to hear about it.")}<section class="contact-layout"><div class="contact-details"><p class="eyebrow">DIRECT LINE</p><a class="email-address" href="mailto:vedangt17@gmail.com">vedangt17@gmail.com</a><button class="text-link copy-email" type="button" data-copy-email>${icon("copy")}<span>Copy email address</span></button><p data-copy-status class="copy-status" aria-live="polite"></p><dl><div><dt>Based in</dt><dd>Noida, Uttar Pradesh, India</dd></div><div><dt>Phone</dt><dd><a href="tel:+918115933889">+91 81159 33889</a></dd></div></dl><div class="actions">${ext("https://github.com/codeVedang", "GitHub", "github")}${ext("https://www.linkedin.com/in/vedangtripathi/", "LinkedIn", "linkedin")}</div></div><form class="contact-form" data-contact-form><h2>Say hello.</h2><label for="name">Your name</label><input id="name" name="name" autocomplete="name" required maxlength="100" placeholder="Alex Morgan"><label for="email">Your email</label><input id="email" name="email" type="email" autocomplete="email" required maxlength="254" placeholder="alex@company.com"><label for="message">What do you have in mind?</label><textarea id="message" name="message" rows="5" required maxlength="4000" placeholder="Tell me a little about the opportunity..."></textarea><p class="form-note">Opens a draft in your email app.</p><button type="submit" class="button primary">Compose email ${icon("arrow-up-right")}</button><p class="form-status" aria-live="polite" data-form-status></p></form></section>`;

const facts = (values) =>
  `<dl class="case-facts">${values.map(([a, b]) => `<div><dt>${a}</dt><dd>${b}</dd></div>`).join("")}</dl>`;
const section = (label, title, content) =>
  `<section class="case-section"><p class="eyebrow">${label}</p><div><h2>${title}</h2>${content}</div></section>`;
const artwork = (p) =>
  `<figure class="case-image"><img src="assets/${p.image}" alt="${p.alt}" width="1774" height="887"><figcaption>Concept illustration / ${p.id === "taskplanet" ? "Web, mobile, and admin delivery" : "Voice, documents, and AI orchestration"}</figcaption></figure>`;
const back = `<div class="back-link">${link("work.html", "All work", "arrow-left")}</div>`;
const taskplanet = `${back}${intro("01 / PROFESSIONAL WORK", 'TaskPlanet<span class="teal">.</span>', "My first internship. A platform serving 100K users. An opportunity to contribute across web, mobile, and admin experiences.")}${facts(
  [
    ["Role", "Full Stack Developer Intern"],
    ["Company", "3W Business Pvt. Ltd."],
    ["Period", "Sep 2025 - Mar 2026"],
    ["Platform reach", "100K users"],
  ],
)}${artwork(projects[0])}${section("THE CONTEXT", "One product. Multiple experiences.", "<p>TaskPlanet spans customer-facing web and mobile experiences alongside admin workflows. My contribution focused on building modules across these surfaces and supporting the APIs and notifications behind them.</p>")}${section("MY CONTRIBUTION", "From interface to production.", `${list(jobs[1].bullets)}<p>The 100K figure describes the platform's user reach; this was a team product to which I contributed as an intern.</p>`)}${section("THE TAKEAWAY", "Think beyond the screen.", '<p>This experience connected frontend work with API contracts, notification latency, testing, and deployment. It gave me a practical foundation for building across an entire product.</p><p class="stack">React / Node.js / REST APIs / WebSockets / MongoDB</p>')}<div class="next-project"><span class="eyebrow">NEXT / PERSONAL PROJECT</span>${link("modemesh.html", "ModeMesh AI")}</div>`;
const modemesh = `${back}${intro("02 / PERSONAL PROJECT", 'ModeMesh <span class="teal">AI.</span>', "A voice-first workspace that brings conversations, document retrieval, and multi-agent workflows into one place.", `<div class="actions">${link("https://modemesh-vedang.onrender.com/", "Open live project", "arrow-up-right", "button primary", true)}${ext("https://github.com/codeVedang/mode-mesh", "View source", "github")}</div>`)}${facts(
  [
    ["Scope", "Full stack + AI"],
    ["Architecture", "5 Node.js microservices"],
    ["Orchestration", "LangGraph + RAG"],
    ["Delivery", "Docker / Render / AWS"],
  ],
)}${artwork(projects[1])}${section("THE EXPERIENCE", "Speak, explore, and keep the result.", "<p>A voice-and-text workspace with persistent conversations, downloadable outputs, and Web Speech API support. Document retrieval adds PDF context to the conversation, while multi-agent routing coordinates the workflow.</p>")}${section("UNDER THE HOOD", "Connected services. Clear responsibilities.", list(["Five Node.js microservices with internal service authentication.", "MongoDB, Redis, and Firebase support the application infrastructure.", "LangGraph routes multi-agent workflows; Qdrant supports PDF retrieval.", "Groq and Gemini support AI capabilities, with S3, Docker, Render, and AWS CI/CD in the delivery stack."]))}${section("THE BUILD", "A full stack foundation, applied to AI.", '<p>I built ModeMesh after gaining experience with production interfaces, APIs, authentication, and real-time workflows. It brings those foundations together with voice interaction and retrieval-augmented generation.</p><p class="stack">React / Node.js / LangGraph / Qdrant / Redis / Docker / AWS</p>')}<div class="next-project"><span class="eyebrow">MORE / THE FULL COLLECTION</span>${link("work.html", "Explore all work")}</div>`;

const pages = [
  [
    "index.html",
    "Full Stack + AI Developer",
    "Vedang Kumar Tripathi: approximately 12 months of full stack experience, contributions to TaskPlanet serving 100K users, and ModeMesh AI.",
    "",
    home,
  ],
  [
    "work.html",
    "Selected Work",
    "Professional and personal projects: TaskPlanet, ModeMesh AI, AI Medical Voice Agent, and AI Background Remover.",
    "work",
    work,
  ],
  [
    "experience.html",
    "Experience",
    "Full stack internships at CrowdBuzz and 3W Business, contributing to TaskPlanet serving 100K users.",
    "experience",
    experience,
  ],
  [
    "about.html",
    "About",
    "Meet Vedang Kumar Tripathi, a full stack and AI developer in Noida. Skills, approach, education, and certifications.",
    "about",
    about,
  ],
  [
    "contact.html",
    "Contact",
    "Contact Vedang Kumar Tripathi for full stack roles, AI products, and collaboration.",
    "contact",
    contact,
  ],
  [
    "taskplanet.html",
    "TaskPlanet",
    "Web, mobile, admin, API, and notification contributions to TaskPlanet at 3W Business.",
    "work",
    taskplanet,
  ],
  [
    "modemesh.html",
    "ModeMesh AI",
    "A voice-first multi-agent workspace with five microservices, LangGraph, and RAG, built by Vedang Kumar Tripathi.",
    "work",
    modemesh,
  ],
];
for (const [filename, title, description, active, content] of pages)
  writeFileSync(
    path.join(root, filename),
    page(title, description, active, content),
  );
// Keep direct-file previews working while publishing only the static site.
const output = path.join(root, "dist");
mkdirSync(output, { recursive: true });
for (const filename of [...pages.map(([filename]) => filename), "styles.css", "script.js"])
  copyFileSync(path.join(root, filename), path.join(output, filename));
cpSync(path.join(root, "assets"), path.join(output, "assets"), { recursive: true });
console.log(`Built ${pages.length} static portfolio pages in dist/.`);
