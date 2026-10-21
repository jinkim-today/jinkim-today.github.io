// Editable site copy. Change text here; no component edits needed.
export const siteUrl = "https://jinkim-today.github.io";

export const siteTitle = "Jin Kim";
export const siteDescription =
  "Jin Kim is a forward-deployed and AI engineer in Seoul and Vancouver. He goes on-site, finds the real problem, and ships the software that fixes it.";

export const badgeText = "Open to FDE / AI Engineer roles · Seoul & Vancouver";

export const heroHeadline = "Software and AI, built where the work happens.";
export const heroIdentity = "Jin Kim · Fullstack & AI engineer · Seongnam → Vancouver 2027";

export const heroTitle =
  "I go on-site, find the real problem, and ship the software that fixes it.";
export const heroSubline = "I build the tool next to the people who use it, then train them to run it.";

export const heroKeywords =
  "AI agents · RAG · LangGraph · Next.js · FastAPI · On-site ERP · Claude Code rollouts";

export const projectsSubline =
  "Everything I have shipped, on-site and in production.";

export const projectsStrip =
  "8 projects · 2 B2B AI apps · 3 client AI rollouts · 2 factories · 1 exit";

export const writingSubline = "Notes from building software where the work happens.";

export const proofStats = [
  { value: "2", label: "companies founded, 1 sold" },
  { value: "8", label: "projects shipped to production" },
  { value: "3", label: "client companies on AI implementation" },
  { value: "10+", label: "years living and working in Canada" },
];

export const contactStatus =
  "Open to FDE / AI engineer roles from early 2027 · Seoul or Vancouver";

export const footerTitle = "Let's build something.";

export const contact = {
  email: "jinkim.today@gmail.com",
  linkedin: "https://www.linkedin.com/in/kukjinkim",
  linkedinLabel: "linkedin.com/in/kukjinkim",
  github: "https://github.com/jinkim-today",
  githubLabel: "github.com/jinkim-today",
  resume: "/resume/jinkim-resume.pdf",
};

export const howIWork = [
  {
    step: "01",
    title: "On-site",
    body: "I go to where the work happens and talk to people at every level. The real problem is rarely the one in the brief.",
  },
  {
    step: "02",
    title: "Build",
    body: "I build the smallest working version fast, on a stack the team can keep running, and put it in front of real users early.",
  },
  {
    step: "03",
    title: "Hand off",
    body: "I train the people who will own it, write down how it works, and leave a system that runs without me.",
  },
];

export const aboutSummary = [
  "I am a fullstack and AI engineer based between Seoul and Vancouver.",
  "I have built and shipped products as a founder, a consultant, and the sole engineer on small teams.",
  "I work best close to the people who use the software.",
];

/** dark = black marks (inverted in dark mode), white = white marks (blackened in light mode), color = leave as is. */
export type LogoTone = "dark" | "white" | "color";

export const about = {
  metaDescription:
    "About Jin Kim: forward-deployed and AI engineer in Seongnam and Vancouver. Founder, consultant, and sole engineer who builds software next to the people who use it.",
  title: "About",
  intro: [
    "I am a forward-deployed engineer. I work directly with client companies, find the real problem behind their manual work, and build the software and AI systems that fix it, from factory floors to office and marketing teams.",
    "I have done this as a founder, a consultant, and the sole engineer on small teams. I built and sold a photography business, built a factory system that cut an office team from 3 people to 1 manager, and now lead AI work for client companies at SDI.",
    "I work best close to the people who use the software. I go on-site, build the smallest working version fast, and train the team to run it without me.",
  ],
  education: [
    {
      org: "Simon Fraser University",
      logo: "/logos/sfu.png",
      logoTone: "color" as LogoTone,
      short: "Computer science degree, Burnaby, BC",
      role: "Bachelor of Computer Science",
      when: "Sep 2020 - Oct 2025",
      place: "Burnaby, BC",
      line: "Computer science degree in Burnaby, BC.",
    },
  ],
  timelineTitle: "Where I have worked",
  timeline: [
    {
      org: "SDI Creative Technologies",
      logo: "/logos/sdi.svg",
      logoTone: "dark" as LogoTone,
      short: "Built 2 AI apps, led AI for 3 client companies",
      role: "AI & Forward Deployed Engineer",
      when: "Jan 2026 - Present",
      line: "Built 2 AI apps from scratch, led AI work for 3 client companies, and put AI to work inside the company.",
    },
    {
      org: "IntelliWorks",
      logo: "/logos/intelliworks.svg",
      logoTone: "dark" as LogoTone,
      short: "Signed 2 factories; office team cut 3 to 1",
      role: "Founder",
      when: "Jun 2025 - Present",
      line: "An AI consultancy that signed 2 client factories and cut one factory's office team from 3 people to 1 manager.",
    },
    {
      org: "Dialpad",
      logo: "/logos/dialpad.svg",
      logoTone: "dark" as LogoTone,
      short: "C++ call-testing tool caught a critical bug early",
      role: "Software Engineer, Co-op",
      when: "Jan 2025 - Jan 2026",
      line: "Built a C++ tool that tests phone calls automatically and used it to catch a critical bug before customers did.",
    },
    {
      org: "Photobyme (acquired)",
      logo: "/logos/photobyme.png",
      logoTone: "white" as LogoTone,
      short: "300+ events, $8-10K monthly revenue, then sold",
      role: "Founder",
      when: "Apr 2022 - Jan 2026",
      line: "Ran 300+ events and 3,000+ sessions, grew to $8-10K monthly revenue with a 10-person part-time team, then sold it.",
    },
    {
      org: "Computrol Systems",
      logo: "/logos/computrol.svg",
      logoTone: "dark" as LogoTone,
      short: "Firmware and web app, setup time cut 80%",
      role: "Junior Developer, Co-op",
      when: "Jan 2024 - Dec 2024",
      line: "Built firmware, a management web app, and deployments for fuel and water control systems, cutting setup time 80%.",
    },
    {
      org: "Intersystem Controls",
      logo: "/logos/intersystem.png",
      logoTone: "color" as LogoTone,
      short: "Automated license keys; stock tracking time cut 75%",
      role: "Full-stack Developer, Co-op",
      when: "Jan 2023 - Sep 2023",
      line: "Automated license key creation end to end and built a stock tracking system that cut manual tracking time 75%.",
    },
  ],
  nowTitle: "Now",
  now: "Based in Seongnam, South Korea until early 2027, then back to Vancouver. Open to forward-deployed engineer and AI engineer roles.",
  skillsTitle: "Skills",
  skills: [
    { group: "Programming languages", items: "Python, TypeScript, JavaScript, C++, SQL" },
    {
      group: "AI and machine learning",
      items: "LangGraph, LangChain, GraphRAG, RAG, Claude API, Gemini API, PyTorch",
    },
    {
      group: "Web and mobile",
      items: "Next.js, React, React Native, Node.js, FastAPI, Flask, PostgreSQL, Supabase",
    },
    {
      group: "Cloud and DevOps",
      items: "AWS (EC2, S3), Docker, GitHub Actions, Vercel, CI/CD, Linux, Sentry",
    },
  ],
  resumeLabel: "Resume (PDF)",
  emailLabel: "Email",
  linkedinLabel: "LinkedIn",
  githubLabel: "GitHub",
};
