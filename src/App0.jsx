import { useState, useEffect, useRef } from "react";

/* ─── GOOGLE FONTS ─── */
const FontLink = () => (
  <style>{`@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,400;1,600&display=swap');`}</style>
);

/* ─── DATA ─── */
const ROLES = ["Full-Stack Developer", "UI/UX Designer"];

/* ─── HERO TITLE COLOR PAIRS ─── */
const COLOR_COMBOS = [
  ["#ffffff", "#a78bfa"],
  ["#f97316", "#ffffff"],
  ["#22d3ee", "#f472b6"],
  ["#ffffff", "#34d399"],
  ["#fbbf24", "#ffffff"],
  ["#e879f9", "#67e8f9"],
  ["#ffffff", "#fb7185"],
  ["#86efac", "#fde047"],
];


/* ─── ANIMATED GRADIENT MESH ─── */
function GradientMesh({ dark }) {
  const colors = dark
    ? ["#7c3aed","#2563eb","#059669","#7c3aed"]
    : ["#a78bfa","#60a5fa","#34d399","#a78bfa"];
  return (
    <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none", zIndex:0 }}>
      <div style={{ position:"absolute", width:"70%", height:"70%", top:"-20%", left:"-10%", borderRadius:"50%", background:`radial-gradient(circle, ${colors[0]}18 0%, transparent 70%)`, animation:"floatA 12s ease-in-out infinite", filter:"blur(40px)" }} />
      <div style={{ position:"absolute", width:"60%", height:"60%", bottom:"-10%", right:"-10%", borderRadius:"50%", background:`radial-gradient(circle, ${colors[1]}14 0%, transparent 70%)`, animation:"floatB 10s ease-in-out infinite 2s", filter:"blur(50px)" }} />
      <div style={{ position:"absolute", width:"40%", height:"40%", top:"40%", right:"20%", borderRadius:"50%", background:`radial-gradient(circle, ${colors[2]}10 0%, transparent 70%)`, animation:"floatA 14s ease-in-out infinite 4s", filter:"blur(35px)" }} />
      <div style={{ position:"absolute", inset:0, backgroundImage: dark ? "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)" : "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.04) 1px, transparent 0)", backgroundSize:"32px 32px" }} />
    </div>
  );
}

function AnimWord({ text, color, delay = 0, align = "left" }) {
  const [ref, visible] = useFadeIn();
  return (
    <span ref={ref} style={{ display: "block", color, transition: "color 0.7s cubic-bezier(0.22,1,0.36,1)", textAlign: align, lineHeight: 1 }}>
      {text.split("").map((ch, i) => (
        <span key={i} style={{ display: "inline-block", opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(32px) rotate(6deg)", transition: `opacity 0.55s cubic-bezier(0.22,1,0.36,1) ${delay + i * 38}ms, transform 0.55s cubic-bezier(0.22,1,0.36,1) ${delay + i * 38}ms`, whiteSpace: ch === " " ? "pre" : "normal" }}>{ch === " " ? "\u00a0" : ch}</span>
      ))}
    </span>
  );
}

const WORK = [
  {
    id: 1, date: "Jun 2025", dur: "Present", company: "Oracle OFSS",
    location: "Chennai, India", role: "Associate Consultant", type: "Full-time",
    bullets: [
      "Developing MVPs using Oracle VBCS with an emphasis on scalability, rapid iteration, and cloud-native design.",
      "Integrated OCI services and Oracle Autonomous Database to develop fault-tolerant cloud-native applications.",
      "Implemented AI-driven automation using Generative AI to optimize user workflows and system intelligence.",
    ],
  },
  {
    id: 2, date: "Nov 2024", dur: "May 2025", company: "Bluestock Fintech",
    location: "Remote", role: "Software Development Intern", type: "Internship",
    bullets: [
      "Developed web application and REST APIs serving IPO data to thousands of users with company details, price bands, and real-time listing metrics.",
      "Built scalable API endpoints for current market prices with optimized latency, ensuring seamless data flow.",
      "Integrated downloadable RHP and DRHP PDFs with responsive design, enhancing accessibility across devices.",
    ],
  },
  {
    id: 3, date: "Mar 2024", dur: "Jul 2024", company: "Jithwa Solutions",
    location: "Chennai, India", role: "Full Stack Intern", type: "Internship",
    bullets: [
      "Developed responsive web applications using ReactJS, HTML, and Tailwind CSS with cross-device compatibility.",
      "Designed and implemented RESTful APIs integrating frontend components with backend services for dynamic content.",
      "Utilized Git and JIRA for version control and agile project management, conducting code reviews to maintain quality.",
    ],
  },
];

/* status: live | opensource | indev | private */
const PROJECTS = [
  {
    id: 7, tags: ["Python", "Machine Learning", "Continual Learning", "Algorithm", "AI"],
    name: "DRIFT", status: ["opensource"],
    desc: [
      "DRIFT (Dynamic Radius Intelligence with Forgetting Tolerance) — an algorithm designed to prevent catastrophic forgetting in AI systems through adaptive memory protection and continual learning.",
      "Published research exploring why AI assistants lose prior knowledge during training updates, and a mathematical framework to stop it with adaptive radius-based memory retention.",
    ],
    visual: "drift", rev: true
  },
  {
    id: 1, tags: ["Golang", "TypeScript", "Gin", "NextJs", "PostgreSQL", "Redis"],
    name: "Gostat", status: ["live", "opensource"],
    desc: [
      "GOStat — a cutting-edge microservice-based application designed to handle HTTP request authentication and statistics with finesse.",
      "This project comprises several key microservices, each contributing to its overall functionality and prowess.",
    ],
    visual: "gostat",
  },
  {
    id: 2, tags: ["TypeScript", "ReactNative", "Redux Toolkit", "i18n", "iOS"],
    name: "Kana Master", status: ["indev"],
    desc: [
      "Kana Master is an iOS application designed for learning Katakana and Hiragana. It includes various tests and practical exercises that help in learning and memorizing Japanese characters.",
      "The app also offers audio training for correct pronunciation and demonstrates how to properly draw each character.",
    ],
    visual: "kana", rev: true,
  },
  {
    id: 3, tags: ["Golang", "GORM", "PostgreSQL", "i18n", "goquery", "gcron"],
    name: "Anime Sentry", status: ["indev"],
    desc: [
      "Hey, anime fans! Struggling to track new episodes? Anime Sentry is your solution. Get auto-notifications for new episode releases!",
      "Send the bot your anime link, get release schedules instantly. Every 30 mins, the bot checks for new episodes using a cron schedule.",
    ],
    visual: "anime",
  },
  {
    id: 4, tags: ["WebSockets", "Golang", "React", "Redis", "PostgreSQL"],
    name: "Distributed Real-Time Chat", status: ["live"],
    desc: [
      "Engineered multi-room chat using WebSockets with low-latency message broadcast and scalable handling.",
      "Designed efficient message routing with concurrency-safe operations supporting multiple parallel users.",
    ],
    visual: "chat", rev:true,
  },
  {
    id: 5, tags: ["Python", "RAG", "LangChain", "Vector DB", "FastAPI"],
    name: "Universal AI Chatbot", status: ["opensource"],
    desc: [
      "Built domain-adaptive chatbot using Retrieval-Augmented Generation with vector-based knowledge retrieval.",
      "Optimized search indexing workflows to decrease retrieval latency and enhance response accuracy.",
    ],
    visual: "ai", 
  },
  {
    id: 6, tags: ["React", "Supabase", "PostgreSQL", "React Query", "Zustand"],
    name: "Zoro Capital", status: ["private", "indev"],
    desc: [
      "Full-stack B2B lending & leasing platform with role-based access for admins, originators, and customers — covering onboarding, deal submission, credit review, contract lifecycle, and a self-service customer portal.",
      "Features multi-step onboarding with document upload, admin deal queue with contract generation, CRM with prospect pipeline, quote builder, amendment requests, and automated payment status tracking via Supabase Edge Functions.",
    ],
    visual: "zoro", rev: true,
  },
];

const STATUS_CONFIG = {
  live:       { label: "Live",           dot: "#22c55e", bg: "rgba(34,197,94,0.12)",  border: "rgba(34,197,94,0.25)" },
  opensource: { label: "Open Source",    dot: "#3b82f6", bg: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.25)" },
  indev:      { label: "In Development", dot: "#eab308", bg: "rgba(234,179,8,0.12)",  border: "rgba(234,179,8,0.25)" },
  private:    { label: "Private",        dot: "#a855f7", bg: "rgba(168,85,247,0.12)", border: "rgba(168,85,247,0.25)" },
};

const SKILLS = [
  { label: "Python",       dots: 4 },
  { label: "Golang",       dots: 4 },
  { label: "React/Next",   dots: 5 },
  { label: "TypeScript",   dots: 4 },
  { label: "PostgreSQL",   dots: 4 },
  { label: "Docker",       dots: 3 },
  { label: "Figma",        dots: 4 },
  { label: "Node.js",      dots: 4 },
  { label: "UI/UX Design", dots: 4 },
];

const SKILL_CARDS = [
  { title: "Backend",    items: "Python . Golang · Node.js · Gin · REST APIs · Microservices · WebSockets" },
  { title: "Frontend",   items: "React · NextJs · ReactNative · TypeScript · Tailwind CSS" },
  { title: "Cloud & DB", items: "OCI · Oracle VBCS · PostgreSQL · Redis · MongoDB" },
  { title: "Design",     items: "Figma · Adobe XD · Prototyping · Wireframing · UI/UX" },
  { title: "DevOps",     items: "Docker · Git · JIRA · Kafka · CI/CD · Linux" },
  { title: "Learning",   items: "Rust · Kubernetes · LLM Fine-tuning", learning: true },
];

const ARTICLES_PAGES = [
  [
    { title: "I Built an Algorithm to Stop AI from Forgetting. Here's What I Found.", desc: "A technical deep dive into DRIFT — Dynamic Radius Intelligence with Forgetting Tolerance — continual learning, adaptive memory, and why existing AI memory tools all miss the same thing.", emoji: "🧠", link: "https://medium.com/@raghul01020405/i-built-an-algorithm-to-stop-ai-from-forgetting-heres-what-i-found-8c8ad6125741" },
    { title: "Dockerizing a Full-Stack App: Beyond the Basics", desc: "Go beyond hello-world Docker setups — multi-stage builds, secrets management, and orchestration patterns for real-world full-stack applications.", emoji: "🐳" },
    { title: "React Patterns You Should Know in 2025", desc: "A deep dive into compound components, render props, custom hooks, and the emerging patterns reshaping how we think about React architecture today.", emoji: "⚛️" },
    { title: "Designing Fault-Tolerant REST APIs with Gin and PostgreSQL", desc: "From connection pooling and graceful shutdowns to retry logic and circuit breakers — how to build APIs that stay up when everything else falls apart.", emoji: "🛡️" },
  ],
  [
    { title: "Redis Caching Strategies for High-Traffic Applications", desc: "Exploring cache-aside, write-through, and write-behind strategies with practical Golang examples to drastically cut latency in production systems.", emoji: "⚡" },
    { title: "Type-Safe State Management with Redux Toolkit in React Native", desc: "How to structure Redux slices, async thunks, and selectors in a large-scale React Native app without losing your mind or type safety.", emoji: "📱" },
    { title: "Internationalization Done Right: i18n in Modern Web Apps", desc: "A practical walkthrough of pluralization rules, locale-aware formatting, and lazy-loading translation bundles in React and React Native projects.", emoji: "🌏" },
    { title: "OCI + Oracle Autonomous Database: A Developer's Survival Guide", desc: "Everything I wish I knew before deploying cloud-native apps on Oracle Cloud Infrastructure — from VBCS quirks to Autonomous DB connection tricks.", emoji: "☁️" },
  ],
  [
    { title: "Generative AI in Enterprise Workflows: Real Integration Patterns", desc: "Moving past demos — how to integrate LLM-powered automation into legacy enterprise systems without breaking everything around it.", emoji: "🤖" },
    { title: "Scraping at Scale with goquery and gcron: A Bot's Life", desc: "Building a resilient, schedule-aware web scraper in Golang that handles rate limits, failures, and incremental updates like a well-behaved citizen.", emoji: "🕷️" },
    { title: "IPO Data APIs: Building Financial Backends That Scale", desc: "Behind the scenes of building REST APIs for real-time IPO listing data — architecture decisions, latency optimizations, and lessons from production.", emoji: "📈" },
    { title: "Agile in Practice: Git, JIRA, and Code Reviews That Actually Work", desc: "A developer's perspective on making version control workflows, sprint rituals, and code review culture genuinely improve team output and code quality.", emoji: "🔄" },
  ],
];

const HERO_ARTICLES = [
  { title: "I Built an Algorithm to Stop AI from Forgetting", desc: "DRIFT: adaptive memory protection for continual learning — why AI assistants forget, and how to stop it mathematically.", emoji: "🧠", link: "https://medium.com/@raghul01020405/i-built-an-algorithm-to-stop-ai-from-forgetting-heres-what-i-found-8c8ad6125741" },
];

const RESUME_LINK = "https://drive.google.com/file/d/1nhl979AV7NmIj4Q0GMf-iMP0ksQfDO16/view?usp=sharing";

/* ─── EMAILJS CONFIG (Vite) ──────────────────────────────────────────
   Add these to your .env file in the project root:
     VITE_EMAILJS_SERVICE_ID=your_service_id
     VITE_EMAILJS_TEMPLATE_ID=your_template_id
     VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ------------------------------------------------------------------ */
const EMAILJS_SERVICE_ID  = "";
const EMAILJS_TEMPLATE_ID = "";
const EMAILJS_PUBLIC_KEY  = "";

/* ─── DINO SOUND ENGINE (Web Audio API — no external files needed) ─── */
function createDinoSounds() {
  let ctx = null;
  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }
  function tone(freq, type, vol, attack, sustain, release, startT) {
    const ac = getCtx();
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.connect(gain); gain.connect(ac.destination);
    osc.type = type; osc.frequency.setValueAtTime(freq, startT);
    gain.gain.setValueAtTime(0, startT);
    gain.gain.linearRampToValueAtTime(vol, startT + attack);
    gain.gain.setValueAtTime(vol, startT + attack + sustain);
    gain.gain.linearRampToValueAtTime(0, startT + attack + sustain + release);
    osc.start(startT); osc.stop(startT + attack + sustain + release + 0.01);
  }
  function noise(vol, dur, startT) {
    const ac = getCtx();
    const buf = ac.createBuffer(1, ac.sampleRate * dur, ac.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1);
    const src = ac.createBufferSource();
    const gain = ac.createGain();
    const filter = ac.createBiquadFilter();
    filter.type = "bandpass"; filter.frequency.value = 200;
    src.buffer = buf;
    src.connect(filter); filter.connect(gain); gain.connect(ac.destination);
    gain.gain.setValueAtTime(vol, startT);
    gain.gain.linearRampToValueAtTime(0, startT + dur);
    src.start(startT); src.stop(startT + dur);
  }
  return {
    jump() {
      try {
        const ac = getCtx(); const t = ac.currentTime;
        tone(200, "sine", 0.18, 0.01, 0.01, 0.12, t);
        tone(320, "sine", 0.12, 0.02, 0.02, 0.1,  t + 0.03);
        tone(480, "sine", 0.08, 0.02, 0.01, 0.08, t + 0.07);
      } catch(e) {}
    },
    land() {
      try {
        const ac = getCtx(); const t = ac.currentTime;
        noise(0.12, 0.06, t);
        tone(120, "square", 0.06, 0.005, 0.01, 0.05, t);
      } catch(e) {}
    },
    die() {
      try {
        const ac = getCtx(); const t = ac.currentTime;
        tone(400, "sawtooth", 0.2,  0.01, 0.02, 0.08, t);
        tone(300, "sawtooth", 0.18, 0.01, 0.02, 0.1,  t + 0.06);
        tone(200, "sawtooth", 0.15, 0.01, 0.04, 0.15, t + 0.12);
        tone(100, "sawtooth", 0.12, 0.01, 0.06, 0.2,  t + 0.18);
        noise(0.15, 0.3, t);
      } catch(e) {}
    },
    score(milestone) {
      try {
        const ac = getCtx(); const t = ac.currentTime;
        const freqs = milestone >= 5 ? [523, 659, 784, 1047] : [440, 554, 659];
        freqs.forEach((f, i) => tone(f, "sine", 0.1, 0.01, 0.04, 0.08, t + i * 0.07));
      } catch(e) {}
    },
    step(frame) {
      try {
        if (frame % 6 !== 0) return;
        const ac = getCtx(); const t = ac.currentTime;
        noise(0.04, 0.03, t);
      } catch(e) {}
    },
  };
}

/* ─── ICONS ─── */
const GithubIcon   = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>;
const LinkedInIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const EmailIcon    = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>;
const InstagramIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>;
const MenuIcon     = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
const CloseIcon    = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const SunIcon      = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>;
const MoonIcon     = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;
const DownloadIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
const ChevronUp    = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="18,15 12,9 6,15"/></svg>;

/* ─── HOOKS & HELPERS ─── */
function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}
function FadeIn({ children, delay = 0, style = {}, from = "bottom" }) {
  const [ref, visible] = useFadeIn();
  const transforms = { bottom: "translateY(28px)", top: "translateY(-16px)", left: "translateX(-24px)", right: "translateX(24px)" };
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : (transforms[from] || "translateY(28px)"),
      transition: `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      ...style
    }}>
      {children}
    </div>
  );
}

/* ─── STATUS BADGE ─── */
function StatusBadge({ type }) {
  const c = STATUS_CONFIG[type];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: c.bg, border: `1px solid ${c.border}`, borderRadius: 50, padding: "3px 10px", fontSize: 11, color: c.dot, fontFamily: "'Fira Code',monospace", whiteSpace: "nowrap" }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.dot, display: "inline-block", flexShrink: 0 }} />
      {c.label}
    </span>
  );
}

/* ─── SKILL BAR ─── */
function DotRating({ dots, max = 5, color }) {
  const [ref, visible] = useFadeIn();
  const pct = (dots / max) * 100;
  return (
    <div ref={ref} style={{ display:"flex", alignItems:"center", gap:8, flex:1 }}>
      <div style={{ flex:1, height:3, borderRadius:2, background:"rgba(128,128,128,0.15)", overflow:"hidden" }}>
        <div style={{ height:"100%", width: visible ? `${pct}%` : "0%", background: color, borderRadius:2, transition:"width 1s cubic-bezier(0.22,1,0.36,1)" }} />
      </div>
      <span style={{ fontSize:11, color:"var(--mid)", fontFamily:"'Fira Code',monospace", flexShrink:0, width:24, textAlign:"right", fontWeight:500 }}>{dots}<span style={{ opacity:0.4 }}>/{max}</span></span>
    </div>
  );
}

/* ─── SECTION HEADER ─── */
function SectionHeader({ label, title, mb = 48 }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: mb, flexWrap: "wrap", gap: 8 }}>
      <span style={{ fontFamily: "'Fira Code',monospace", fontSize: 12, color: "var(--mid)", letterSpacing: "0.05em" }}>... /{label} ...</span>
      <span className="work-heading" style={{ fontFamily: "'Fira Code',monospace", fontSize: "clamp(48px,7vw,80px)", fontWeight: 700, color: "var(--white)", lineHeight: 1 }}>{title}</span>
    </div>
  );
}

/* ─── PROJECT VISUALS ─── */
function MockPhone({ children, style = {} }) {
  return (
    <div style={{ width: 68, height: 136, background: "#181826", borderRadius: 14, border: "2px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", overflow: "hidden", ...style }}>
      <div style={{ width: 28, height: 4, background: "rgba(255,255,255,0.07)", borderRadius: 2, margin: "6px auto 0" }} />
      <div style={{ flex: 1, margin: 6, background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: "7px 5px", display: "flex", flexDirection: "column", gap: 4 }}>{children}</div>
    </div>
  );
}
function GostatVisual() {
  return (
    <div style={{ display: "flex", gap: 10, width: "100%", height: "100%" }}>
      <div style={{ flex: 1.6, background: "#242436", borderRadius: 10, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,#7f5af0,#2cb67d)" }} />
        <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 7 }}>
          {["38%","62%","100%","","38%","62%","80%"].map((w, i) => w
            ? <div key={i} style={{ height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 3, width: w }} />
            : <div key={i} style={{ height: 44, background: "rgba(255,255,255,0.03)", borderRadius: 7, margin: "4px 0" }} />)}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 88 }}>
        <div style={{ flex: 1, background: "linear-gradient(135deg,#1e1e32,#2a2a44)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>🦊</div>
        <MockPhone><div style={{ background: "linear-gradient(135deg,#2a3a5a,#1a2a4a)", borderRadius: 5, height: 36, marginBottom: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🏙️</div></MockPhone>
      </div>
    </div>
  );
}
function KanaVisual() {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-end", height: "100%", width: "100%" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, justifyContent: "flex-end" }}>
        <div style={{ width: 66, height: 66, borderRadius: "50%", background: "#2a3a2a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>🐱</div>
        <MockPhone style={{ width: 66, height: 118 }}>
          <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 5, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: "white", fontFamily: "'Fira Code',monospace", marginBottom: 4 }}>あ</div>
          <div style={{ height: 5, background: "rgba(255,255,255,0.05)", borderRadius: 3 }} />
          <div style={{ height: 5, background: "rgba(255,255,255,0.05)", borderRadius: 3, width: "50%", marginTop: 4 }} />
        </MockPhone>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, height: "90%" }}>
        <div style={{ flex: 1, background: "#22223a", borderRadius: 10, padding: 12 }}>
          <div style={{ fontSize: 9, color: "#6b6b80", fontFamily: "'Fira Code',monospace", marginBottom: 4 }}>Learning</div>
          <div style={{ fontSize: 32, color: "white", fontFamily: "'Fira Code',monospace", textAlign: "center", marginTop: 8 }}>カ</div>
        </div>
        <div style={{ height: 52, background: "linear-gradient(135deg,#3a2a2a,#2a3a3a)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: 10, color: "#a6a6a6", fontFamily: "'Fira Code',monospace" }}>Progress 68%</div>
        </div>
      </div>
    </div>
  );
}
function AnimeVisual() {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "center", height: "100%", width: "100%", justifyContent: "center" }}>
      <MockPhone style={{ width: 74, height: 148 }}>
        <div style={{ background: "linear-gradient(135deg,#2a3a5a,#1a2a4a)", borderRadius: 6, height: 60, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 5 }}>🌟</div>
        <div style={{ height: 5, background: "rgba(255,255,255,0.05)", borderRadius: 3 }} />
        <div style={{ height: 5, background: "rgba(255,255,255,0.05)", borderRadius: 3, width: "60%", marginTop: 4 }} />
      </MockPhone>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ width: 74, height: 80, background: "linear-gradient(135deg,#3a2040,#1a1030)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>⚔️</div>
        <MockPhone style={{ width: 74, height: 90 }}>
          <div style={{ background: "linear-gradient(180deg,#3a4a6a,#1a2a4a)", borderRadius: 5, height: 40, marginBottom: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🏙️</div>
        </MockPhone>
      </div>
    </div>
  );
}
function ChatVisual() {
  const msgs = [
    { me: false, text: "Hey, is room #general available?" },
    { me: true,  text: "Yes! Connecting you now..." },
    { me: false, text: "Connected ✓  128 users online" },
  ];
  return (
    <div style={{ width: "100%", height: "100%", background: "#1a1a2e", borderRadius: 10, padding: 14, display: "flex", flexDirection: "column", gap: 8, justifyContent: "center" }}>
      <div style={{ fontSize: 10, color: "#6b6b80", fontFamily: "'Fira Code',monospace", marginBottom: 4 }}># general · 128 online</div>
      {msgs.map((m, i) => (
        <div key={i} style={{ display: "flex", justifyContent: m.me ? "flex-end" : "flex-start" }}>
          <div style={{ background: m.me ? "rgba(59,130,246,0.3)" : "rgba(255,255,255,0.06)", borderRadius: m.me ? "12px 12px 2px 12px" : "12px 12px 12px 2px", padding: "6px 10px", fontSize: 10, color: "#f5f5f5", maxWidth: "75%", fontFamily: "'Open Sans',sans-serif" }}>{m.text}</div>
        </div>
      ))}
      <div style={{ display: "flex", gap: 6, marginTop: 4, alignItems: "center" }}>
        <div style={{ flex: 1, height: 28, background: "rgba(255,255,255,0.04)", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)" }} />
        <div style={{ width: 28, height: 28, background: "rgba(59,130,246,0.4)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#fff" }}>↑</div>
      </div>
    </div>
  );
}
function AIVisual() {
  return (
    <div style={{ width: "100%", height: "100%", background: "#1a2a1e", borderRadius: 10, padding: 14, display: "flex", flexDirection: "column", gap: 8, justifyContent: "center" }}>
      <div style={{ fontSize: 10, color: "#6b6b80", fontFamily: "'Fira Code',monospace", marginBottom: 4 }}>RAG · Vector Search</div>
      <div style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 8, padding: "8px 10px", fontSize: 10, color: "#86efac", fontFamily: "'Open Sans',sans-serif" }}>
        Query: "Explain our refund policy"
      </div>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {["doc_42","doc_17","doc_89"].map(d => (
          <span key={d} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 4, padding: "2px 6px", fontSize: 9, color: "#a6a6a6", fontFamily: "'Fira Code',monospace" }}>{d}</span>
        ))}
      </div>
      <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: "8px 10px", fontSize: 10, color: "#d4d4d4", fontFamily: "'Open Sans',sans-serif", lineHeight: 1.6 }}>
        Based on retrieved context: refunds are processed within 5–7 business days...
      </div>
    </div>
  );
}

function ZoroVisual() {
  const statuses = [
    { label: "Submitted",  color: "#60a5fa" },
    { label: "In review",  color: "#fbbf24" },
    { label: "Approved",   color: "#34d399" },
    { label: "Declined",   color: "#f87171" },
  ];
  const rows = [
    { ref: "ZC-2026-48201", client: "TechWorks Ltd",     amount: "£1,089/mo", st: 2 },
    { ref: "ZC-2026-51874", client: "BuildRight Co",     amount: "£2,340/mo", st: 1 },
    { ref: "ZC-2026-39045", client: "Sunrise Bakeries",  amount: "£420/mo",   st: 0 },
  ];
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
      {/* Top bar */}
      <div style={{ background: "#12121e", borderRadius: 8, padding: "8px 12px", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#f97316", flexShrink: 0 }} />
        <span style={{ fontFamily: "'Fira Code',monospace", fontSize: 10, color: "#f97316", fontWeight: 700, letterSpacing: 1 }}>ZORO CAPITAL</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
          {["#ff5f57","#febc2e","#28c840"].map(c => (
            <div key={c} style={{ width: 7, height: 7, borderRadius: "50%", background: c }} />
          ))}
        </div>
      </div>
      {/* KPI row */}
      <div style={{ display: "flex", gap: 6 }}>
        {[
          { label: "Active contracts", val: "24",   color: "#34d399" },
          { label: "Portfolio value",  val: "£2.4M", color: "#60a5fa" },
          { label: "Pending review",   val: "7",    color: "#fbbf24" },
        ].map(k => (
          <div key={k.label} style={{ flex: 1, background: "#1a1a2e", borderRadius: 7, padding: "7px 8px" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: k.color, fontFamily: "'Fira Code',monospace" }}>{k.val}</div>
            <div style={{ fontSize: 8, color: "#6b6b80", marginTop: 1, lineHeight: 1.3 }}>{k.label}</div>
          </div>
        ))}
      </div>
      {/* Deal queue rows */}
      <div style={{ flex: 1, background: "#1a1a2e", borderRadius: 8, overflow: "hidden" }}>
        <div style={{ padding: "5px 10px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 6 }}>
          {["Reference","Client","Status"].map(h => (
            <div key={h} style={{ fontSize: 8, color: "#6b6b80", fontFamily: "'Fira Code',monospace", textTransform: "uppercase", letterSpacing: .5 }}>{h}</div>
          ))}
        </div>
        {rows.map((r, i) => (
          <div key={i} style={{ padding: "6px 10px", borderBottom: i < rows.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 6, alignItems: "center" }}>
            <div style={{ fontSize: 8, color: "#f97316", fontFamily: "'Fira Code',monospace" }}>{r.ref}</div>
            <div style={{ fontSize: 9, color: "#d4d4d4" }}>{r.client}</div>
            <div style={{ fontSize: 8, fontWeight: 700, color: statuses[r.st].color, background: statuses[r.st].color + "18", borderRadius: 4, padding: "1px 6px", whiteSpace: "nowrap" }}>
              {statuses[r.st].label}
            </div>
          </div>
        ))}
      </div>
      {/* Monthly amount */}
      <div style={{ background: "linear-gradient(90deg,#f9731615,#60a5fa10)", border: "1px solid rgba(249,115,22,0.2)", borderRadius: 7, padding: "6px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 9, color: "#6b6b80" }}>Monthly book</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#f97316", fontFamily: "'Fira Code',monospace" }}>£48,200</span>
      </div>
    </div>
  );
}

// /* ─── DRIFT MINI VISUAL (crisp SVG-based, no emoji) ─── */
// function DriftMiniVisual() {
//   const [tick, setTick] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => setTick(n => n + 1), 80);
//     return () => clearInterval(t);
//   }, []);

//   const W = 520, H = 144;
//   const pts = 32;
//   const forgettingPts = Array.from({ length: pts }, (_, i) => {
//     const x = (i / (pts - 1)) * W;
//     const y = snap(H - H * Math.exp(-i / 7) * 0.85 - 2);
//     return `${x},${y}`;
//   }).join(" ");
//   const driftPts = Array.from({ length: pts }, (_, i) => {
//     const x = snap((i / (pts - 1)) * W);
//     const decay = Math.exp(-i / 22) * 0.82;
//     const ripple = Math.sin(i * 0.7 + tick * 0.18) * 0.025;
//     const y = H - H * (decay + ripple + 0.1) - 2;
//     return `${x},${y}`;
//   }).join(" ");

//   const nodes = [
//     { cx: 22,  cy: 28, r: 5,  label: "M₁", protected: true  },
//     { cx: 62,  cy: 16, r: 4.5,label: "M₂", protected: true  },
//     { cx: 104, cy: 30, r: 6,  label: "M₃", protected: false },
//     { cx: 146, cy: 14, r: 4.5,label: "M₄", protected: true  },
//     { cx: 186, cy: 26, r: 5,  label: "M₅", protected: true  },
//   ];
//   const edges = [[0,1],[1,2],[2,3],[3,4],[0,3]];
//   const pulse = (base, i) => base + Math.sin(tick * 0.12 + i * 1.1) * 1.2;

//   return (
//     <div style={{ width:"100%", height:"100%", background:"#0d1117", display:"flex", flexDirection:"column", gap:6, padding:"12px 14px", fontFamily:"'Fira Code',monospace", overflow:"hidden" }}>
//       {/* Header row */}
//       <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
//         <div style={{ display:"flex", alignItems:"center", gap:5 }}>
//           <span style={{ width:5, height:5, borderRadius:"50%", background:"#a78bfa", display:"inline-block", animation:"pulse 1.8s infinite" }} />
//           <span style={{ fontSize:8, color:"#a78bfa", letterSpacing:"0.1em", fontWeight:700 }}>DRIFT</span>
//         </div>
//         <span style={{ fontSize:7, color:"#3d4a5a", letterSpacing:"0.06em" }}>MEMORY PROTECTION ACTIVE</span>
//       </div>

//       {/* Neural graph */}
//       <div style={{ background:"#111827", borderRadius:7, padding:"6px 8px" }}>
//         <span style={{ fontSize:7, color:"#3d4a5a", display:"block", marginBottom:4 }}>MEMORY GRAPH · T+{tick % 99 + 1}</span>
//         <svg width="100%" viewBox="0 0 210 46" style={{ display:"block", overflow:"visible" }}>
//           {edges.map(([a,b], i) => (
//             <line key={i}
//               x1={nodes[a].cx} y1={nodes[a].cy}
//               x2={nodes[b].cx} y2={nodes[b].cy}
//               stroke={nodes[a].protected && nodes[b].protected ? "rgba(167,139,250,0.28)" : "rgba(255,255,255,0.07)"}
//               strokeWidth="0.9"
//               strokeDasharray={nodes[a].protected && nodes[b].protected ? "none" : "3,3"}
//             />
//           ))}
//           {nodes.map((n, i) => (
//             <g key={i}>
//               {n.protected && (
//                 <circle cx={n.cx} cy={n.cy} r={pulse(n.r + 5.5, i)}
//                   fill="none" stroke="rgba(167,139,250,0.18)" strokeWidth="0.9" />
//               )}
//               <circle cx={n.cx} cy={n.cy} r={pulse(n.r, i)}
//                 fill={n.protected ? "rgba(167,139,250,0.22)" : "rgba(239,68,68,0.15)"}
//                 stroke={n.protected ? "#a78bfa" : "#ef4444"}
//                 strokeWidth="1.1"
//               />
//               <text x={n.cx} y={n.cy + 3} textAnchor="middle" fontSize="5.5" fill={n.protected ? "#c4b5fd" : "#fca5a5"} fontFamily="'Fira Code',monospace">{n.label}</text>
//             </g>
//           ))}
//         </svg>
//       </div>

//       {/* Retention curves */}
//       <div style={{ background:"#111827", borderRadius:7, padding:"5px 8px", flex:1 }}>
//         <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:3 }}>
//           <span style={{ fontSize:7, color:"#3d4a5a" }}>RETENTION OVER TIME</span>
//           <div style={{ display:"flex", gap:8 }}>
//             <span style={{ fontSize:6.5, color:"#ef4444", display:"flex", alignItems:"center", gap:2 }}>
//               <svg width="10" height="3" viewBox="0 0 10 3"><line x1="0" y1="1.5" x2="10" y2="1.5" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2,2"/></svg>
//               No protection
//             </span>
//             <span style={{ fontSize:6.5, color:"#a78bfa", display:"flex", alignItems:"center", gap:2 }}>
//               <svg width="10" height="3" viewBox="0 0 10 3"><line x1="0" y1="1.5" x2="10" y2="1.5" stroke="#a78bfa" strokeWidth="1.5"/></svg>
//               DRIFT
//             </span>
//           </div>
//         </div>
//         <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display:"block" }}>
//           {[0.25,0.5,0.75].map(f => (
//             <line key={f} x1="0" y1={H*f} x2={W} y2={H*f} stroke="rgba(255,255,255,0.035)" strokeWidth="1"/>
//           ))}
//           <polyline points={forgettingPts} fill="none" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="3,3" opacity="0.7"/>
//           <polyline points={`0,${H} ${driftPts} ${W},${H}`} fill="rgba(167,139,250,0.07)" stroke="none"/>
//           <polyline points={driftPts} fill="none" stroke="#a78bfa" strokeWidth="1.5" opacity="0.9"/>
//         </svg>
//       </div>

//       {/* Stats row */}
//       <div style={{ display:"flex", gap:4 }}>
//         {[
//           { label:"Radius", val:"adaptive", color:"#a78bfa" },
//           { label:"FT Score", val:(0.91 + Math.sin(tick*0.05)*0.02).toFixed(2), color:"#34d399" },
//           { label:"Forgetting", val:"↓ 73%", color:"#fbbf24" },
//         ].map(s => (
//           <div key={s.label} style={{ flex:1, background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.05)", borderRadius:5, padding:"3px 5px" }}>
//             <div style={{ fontSize:6.5, color:"#3d4a5a", marginBottom:1 }}>{s.label}</div>
//             <div style={{ fontSize:8, fontWeight:700, color:s.color }}>{s.val}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

function DriftMiniVisual() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 80);
    return () => clearInterval(t);
  }, []);

  // 🔥 Retina resolution
  const W = 520, H = 144;
  const pts = 40;

  const snap = (n) => Math.round(n * 2) / 2;

  // 🔥 Smooth path generator (instead of polyline)
  const buildPath = (points) => {
    let d = `M ${points[0][0]} ${points[0][1]}`;
    for (let i = 1; i < points.length - 1; i++) {
      const [x0, y0] = points[i - 1];
      const [x1, y1] = points[i];
      const [x2, y2] = points[i + 1];

      const cx = (x1 + x2) / 2;
      const cy = (y1 + y2) / 2;

      d += ` Q ${x1} ${y1} ${cx} ${cy}`;
    }
    return d;
  };

  const forgettingArr = Array.from({ length: pts }, (_, i) => {
    const x = snap((i / (pts - 1)) * W);
    const y = snap(H - H * Math.exp(-i / 7) * 0.85 - 2);
    return [x, y];
  });

  const driftArr = Array.from({ length: pts }, (_, i) => {
    const x = snap((i / (pts - 1)) * W);
    const decay = Math.exp(-i / 22) * 0.82;
    const ripple = Math.sin(i * 0.7 + tick * 0.18) * 0.02;
    const y = snap(H - H * (decay + ripple + 0.1) - 2);
    return [x, y];
  });

  const forgettingPath = buildPath(forgettingArr);
  const driftPath = buildPath(driftArr);

  const nodes = [
    { cx: 44,  cy: 56, r: 6,  label: "M₁", protected: true  },
    { cx: 124, cy: 32, r: 5,  label: "M₂", protected: true  },
    { cx: 208, cy: 60, r: 7,  label: "M₃", protected: false },
    { cx: 292, cy: 28, r: 5,  label: "M₄", protected: true  },
    { cx: 372, cy: 52, r: 6,  label: "M₅", protected: true  },
  ];

  const edges = [[0,1],[1,2],[2,3],[3,4],[0,3]];

  const pulse = (base, i) =>
    snap(base + Math.sin(tick * 0.12 + i * 1.1) * 1);

  return (
    <div style={{
      width:"100%",
      height:"100%",
      background:"#0d1117",
      display:"flex",
      flexDirection:"column",
      gap:6,
      padding:"12px 14px",
      fontFamily:"'Fira Code',monospace",
      overflow:"hidden",
      transform:"translateZ(0)"
    }}>

      {/* HEADER */}
      <div style={{ display:"flex", justifyContent:"space-between" }}>
        <div style={{ display:"flex", gap:5, alignItems:"center" }}>
          <span style={{ width:5, height:5, borderRadius:"50%", background:"#a78bfa" }} />
          <span style={{ fontSize:8, color:"#a78bfa", fontWeight:700 }}>DRIFT</span>
        </div>
        <span style={{ fontSize:7, color:"#3d4a5a" }}>MEMORY PROTECTION ACTIVE</span>
      </div>

      {/* GRAPH */}
      <div style={{ background:"#111827", borderRadius:7, padding:"6px 8px" }}>
        <span style={{ fontSize:7, color:"#3d4a5a" }}>
          MEMORY GRAPH · T+{tick % 99 + 1}
        </span>

        <svg
          width="100%"
          viewBox="0 0 420 90"
          style={{ display:"block", shapeRendering:"geometricPrecision" }}
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="1.2" result="b"/>
              <feMerge>
                <feMergeNode in="b"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {edges.map(([a,b], i) => (
            <line
              key={i}
              x1={nodes[a].cx} y1={nodes[a].cy}
              x2={nodes[b].cx} y2={nodes[b].cy}
              stroke="rgba(167,139,250,0.25)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          ))}

          {nodes.map((n, i) => (
            <g key={i} filter={n.protected ? "url(#glow)" : "none"}>
              {n.protected && (
                <circle
                  cx={n.cx}
                  cy={n.cy}
                  r={pulse(n.r + 6, i)}
                  fill="none"
                  stroke="rgba(167,139,250,0.15)"
                />
              )}
              <circle
                cx={n.cx}
                cy={n.cy}
                r={pulse(n.r, i)}
                fill={n.protected ? "rgba(167,139,250,0.25)" : "rgba(239,68,68,0.15)"}
                stroke={n.protected ? "#a78bfa" : "#ef4444"}
                strokeWidth="1.2"
              />
              <text
                x={n.cx}
                y={n.cy}
                fontSize="6"
                textAnchor="middle"
                dominantBaseline="middle"
                fill={n.protected ? "#c4b5fd" : "#fca5a5"}
              >
                {n.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* CURVES */}
      <div style={{ background:"#111827", borderRadius:7, padding:"5px 8px", flex:1 }}>
        <svg
          width="100%"
          viewBox={`0 0 ${W} ${H}`}
          style={{ display:"block", shapeRendering:"geometricPrecision" }}
        >
          <path
            d={forgettingPath}
            fill="none"
            stroke="#ef4444"
            strokeWidth="1.2"
            strokeDasharray="3,3"
            opacity="0.7"
            vectorEffect="non-scaling-stroke"
          />

          <path
            d={driftPath}
            fill="none"
            stroke="#a78bfa"
            strokeWidth="1.6"
            vectorEffect="non-scaling-stroke"
          />

          <path
            d={`${driftPath} L ${W} ${H} L 0 ${H} Z`}
            fill="rgba(167,139,250,0.06)"
          />
        </svg>
      </div>

      {/* STATS */}
      <div style={{ display:"flex", gap:4 }}>
        {[
          { label:"Radius", val:"adaptive", color:"#a78bfa" },
          { label:"FT Score", val:(0.91 + Math.sin(tick*0.05)*0.02).toFixed(2), color:"#34d399" },
          { label:"Forgetting", val:"↓ 73%", color:"#fbbf24" },
        ].map(s => (
          <div key={s.label} style={{
            flex:1,
            background:"rgba(255,255,255,0.025)",
            border:"1px solid rgba(255,255,255,0.05)",
            borderRadius:5,
            padding:"3px 5px"
          }}>
            <div style={{ fontSize:6.5, color:"#3d4a5a" }}>{s.label}</div>
            <div style={{ fontSize:8, fontWeight:700, color:s.color }}>{s.val}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
/* ─── HERO FEATURED ARTICLE (replaces carousel when only 1 item) ─── */
function HeroCarousel({ dark }) {
  const a = HERO_ARTICLES[0];
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{ marginTop: 40, opacity: 0, animation: "fadeSlideUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.75s forwards" }}>
      {/* Label */}
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
        <span style={{ fontFamily:"'Fira Code',monospace", fontSize:10, color:"var(--mid)", letterSpacing:"0.08em" }}>... /latest-writing ...</span>
        <span style={{ height:1, flex:1, maxWidth:60, background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }} />
      </div>

      {/* Featured card — horizontal split */}
      <a
        href={a.link || "#"}
        target={a.link ? "_blank" : undefined}
        rel="noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "grid",
          gridTemplateColumns: "200px 1fr",
          borderRadius: 16,
          overflow: "hidden",
          border: dark
            ? `1px solid ${hovered ? "rgba(167,139,250,0.35)" : "rgba(255,255,255,0.08)"}`
            : `1px solid ${hovered ? "rgba(109,40,217,0.3)"  : "rgba(0,0,0,0.08)"}`,
          background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.025)",
          textDecoration: "none",
          transition: "border-color 0.3s, box-shadow 0.3s, transform 0.35s cubic-bezier(0.22,1,0.36,1)",
          transform: hovered ? "translateY(-3px)" : "none",
          boxShadow: hovered
            ? (dark ? "0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(167,139,250,0.12)" : "0 12px 36px rgba(0,0,0,0.1)")
            : "none",
          maxWidth: 580,
        }}
      >
        {/* Left — DRIFT live visual */}
        <div style={{ height: 160, overflow:"hidden", flexShrink:0, position:"relative" }}>
          <DriftMiniVisual />
          {/* Subtle right-edge fade into the card body */}
          <div style={{ position:"absolute", top:0, right:0, width:32, height:"100%", background: dark ? "linear-gradient(to right, transparent, rgba(18,18,18,0.55))" : "linear-gradient(to right, transparent, rgba(240,240,240,0.55))", pointerEvents:"none" }} />
        </div>

        {/* Right — text content */}
        <div style={{ padding:"18px 20px", display:"flex", flexDirection:"column", justifyContent:"center", gap:8 }}>
          {/* Badge */}
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <span style={{ fontFamily:"'Fira Code',monospace", fontSize:9, color:"#a78bfa", background:"rgba(167,139,250,0.1)", border:"1px solid rgba(167,139,250,0.2)", borderRadius:50, padding:"2px 8px", letterSpacing:"0.06em" }}>FEATURED ARTICLE</span>
          </div>
          <h4 style={{ fontFamily:"'Fira Code',monospace", fontSize:13, fontWeight:600, color:"var(--white)", lineHeight:1.45, margin:0 }}>{a.title}</h4>
          <p style={{ fontSize:11, color:"var(--mid)", lineHeight:1.65, margin:0 }}>{a.desc}</p>
          <div style={{ display:"inline-flex", alignItems:"center", gap:6, marginTop:2 }}>
            <span style={{ fontSize:11, fontWeight:600, color: hovered ? "#a78bfa" : "var(--light)", transition:"color 0.25s", fontFamily:"'Open Sans',sans-serif" }}>Read on Medium</span>
            <span style={{ fontSize:13, color: hovered ? "#a78bfa" : "var(--mid)", transition:"color 0.25s, transform 0.25s", display:"inline-block", transform: hovered ? "translateX(3px)" : "none" }}>→</span>
          </div>
        </div>
      </a>
    </div>
  );
}

/* ─── DINO MINI PREVIEW (looping animation, no interaction) ─── */
function DinoMiniPreview({ dark }) {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    const W = canvas.width  = 500;
    const H = canvas.height = 110;
    const GND  = H - 28;
    const GRAV = 0.55;

    const dino = { x: 60, y: GND, w: 28, h: 34, vy: 0, onGround: true, frame: 0, ft: 0 };
    const obstacles = [
      { x: W + 40,  h: 26, w: 14 },
      { x: W + 260, h: 32, w: 16 },
    ];
    let speed = 4;
    let jumpTimer = 0;
    let jumpInterval = 95;
    let groundX = 0;
    let clouds = [{ x: 120, y: 18, w: 60 }, { x: 340, y: 10, w: 48 }];

    function autoJump() {
      // find nearest obstacle
      const ahead = obstacles.filter(o => o.x > dino.x).sort((a,b) => a.x - b.x)[0];
      if (ahead && ahead.x - dino.x < 110 && dino.onGround) {
        dino.vy = -12; dino.onGround = false;
      }
    }

    function drawDino(d) {
      const c = dark ? "#ffffff" : "#121212";
      ctx.fillStyle = c;
      ctx.fillRect(d.x, d.y, d.w, d.h);
      ctx.fillRect(d.x + d.w - 7, d.y - 11, 13, 13);
      ctx.fillStyle = dark ? "#121212" : "#ffffff";
      ctx.fillRect(d.x + d.w + 1, d.y - 8, 4, 4);
      ctx.fillStyle = c;
      ctx.fillRect(d.x - 7, d.y + 7, 9, 6);
      if (d.onGround) {
        const alt = Math.floor(d.frame / 3) % 2 === 0;
        ctx.fillRect(d.x + 4,  d.y + d.h, 7, alt ? 10 : 6);
        ctx.fillRect(d.x + 16, d.y + d.h, 7, alt ? 6  : 10);
      } else {
        ctx.fillRect(d.x + 4,  d.y + d.h, 7, 8);
        ctx.fillRect(d.x + 16, d.y + d.h, 7, 8);
      }
    }

    function drawCactus(o) {
      ctx.fillStyle = dark ? "#2cb67d" : "#1a7a50";
      const cy = GND + dino.h - o.h;
      ctx.fillRect(o.x, cy, o.w, o.h);
      ctx.fillRect(o.x - 6, cy + 8,  6, Math.floor(o.h * 0.38));
      ctx.fillRect(o.x + o.w, cy + 10, 6, Math.floor(o.h * 0.32));
      ctx.fillRect(o.x - 6, cy + 8  - 9, 5, 11);
      ctx.fillRect(o.x + o.w, cy + 10 - 8, 5, 10);
    }

    function drawCloud(cl) {
      ctx.fillStyle = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
      ctx.beginPath();
      ctx.ellipse(cl.x, cl.y, cl.w * 0.45, 10, 0, 0, Math.PI * 2);
      ctx.ellipse(cl.x - cl.w*0.18, cl.y + 4, cl.w * 0.3, 7, 0, 0, Math.PI * 2);
      ctx.ellipse(cl.x + cl.w*0.18, cl.y + 5, cl.w * 0.27, 7, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    function loop() {
      rafRef.current = requestAnimationFrame(loop);
      ctx.clearRect(0, 0, W, H);

      // bg
      ctx.fillStyle = dark ? "#121212" : "#f0f0f0";
      ctx.fillRect(0, 0, W, H);

      // clouds
      clouds.forEach(cl => { cl.x -= speed * 0.25; if (cl.x + cl.w < 0) cl.x = W + 20; drawCloud(cl); });

      // ground
      ctx.fillStyle = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
      ctx.fillRect(0, GND + dino.h + 1, W, 1.5);

      // physics
      dino.vy += GRAV;
      dino.y  += dino.vy;
      if (dino.y >= GND) { dino.y = GND; dino.vy = 0; dino.onGround = true; }
      else dino.onGround = false;

      dino.ft++;
      if (dino.ft > 2) { dino.frame++; dino.ft = 0; }

      autoJump();

      // obstacles loop
      obstacles.forEach(o => {
        o.x -= speed;
        if (o.x + o.w < -10) o.x = W + 60 + Math.random() * 120;
        drawCactus(o);
      });

      drawDino(dino);
    }

    loop();
    return () => cancelAnimationFrame(rafRef.current);
  }, [dark]);

  return <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: 110 }} />;
}

/* ─── DINO GAME MODAL ─── */
function DinoModal({ onClose, dark }) {
  const canvasRef = useRef(null);
  const stateRef  = useRef(null);
  const rafRef    = useRef(null);
  const soundRef  = useRef(null);
  const wrapRef   = useRef(null);
  const [muted, setMuted] = useState(false);
  const mutedRef = useRef(false);

  const toggleMute = () => {
    mutedRef.current = !mutedRef.current;
    setMuted(mutedRef.current);
  };

  useEffect(() => {
    soundRef.current = createDinoSounds();
    const snd = () => {
      if (!mutedRef.current) soundRef.current;
    };
    void snd;

    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    const W = canvas.width  = 700;
    const H = canvas.height = 220;

    const GND   = H - 40;
    const GRAV  = 0.6;
    const JUMP  = -13;
    const SPD0  = 5;

    const state = {
      dino:     { x: 80, y: GND, w: 40, h: 48, vy: 0, onGround: true, dead: false, frame: 0, frameTimer: 0, wasOnGround: true },
      obstacles: [],
      score:    0,
      hi:       (() => { try { return parseInt(localStorage.getItem('dino_hi') || '0'); } catch(e) { return 0; } })(),
      speed:    SPD0,
      spawnT:   0,
      started:  false,
      over:     false,
      shake:    0,
      particles: [],
      lastMilestone: 0,
      milestoneFlash: 0,
      clouds:   [
        { x: 200, y: 40, w: 80 },
        { x: 500, y: 25, w: 60 },
        { x: 650, y: 55, w: 70 },
      ],
      groundX: 0,
    };
    stateRef.current = state;

    function play(name, ...args) {
      if (!mutedRef.current && soundRef.current) {
        try { soundRef.current[name](...args); } catch(e) {}
      }
    }

    function jump() {
      if (!state.started) { state.started = true; return; }
      if (state.over) { restart(); return; }
      if (state.dino.onGround) {
        state.dino.vy = JUMP;
        state.dino.onGround = false;
        play("jump");
        // spawn jump particles
        for (let i = 0; i < 6; i++) {
          state.particles.push({
            x: state.dino.x + state.dino.w / 2,
            y: GND + state.dino.h,
            vx: (Math.random() - 0.5) * 3,
            vy: -(Math.random() * 2 + 1),
            life: 1, size: Math.random() * 4 + 2, type: "dust"
          });
        }
      }
    }

    function restart() {
      state.dino     = { x: 80, y: GND, w: 40, h: 48, vy: 0, onGround: true, dead: false, frame: 0, frameTimer: 0, wasOnGround: true };
      state.obstacles = [];
      state.score    = 0;
      state.speed    = SPD0;
      state.spawnT   = 0;
      state.started  = true;
      state.over     = false;
      state.shake    = 0;
      state.particles = [];
      state.lastMilestone = 0;
      state.milestoneFlash = 0;
    }

    const onKey = e => { if (["Space","ArrowUp"].includes(e.code)) { e.preventDefault(); jump(); } };
    const onTap = ()  => jump();
    window.addEventListener("keydown", onKey);
    canvas.addEventListener("click", onTap);

    function spawnObstacle() {
      const h   = 30 + Math.random() * 30;
      const w   = 18 + Math.random() * 14;
      const cnt = Math.random() < 0.35 ? 2 : 1;
      for (let i = 0; i < cnt; i++) {
        state.obstacles.push({ x: W + i * (w + 6), y: GND + state.dino.h - h, w, h });
      }
    }

    function drawDino(d) {
      const c = dark ? "#ffffff" : "#121212";
      ctx.fillStyle = d.dead ? "#e06c75" : c;
      // body
      ctx.fillRect(d.x, d.y, d.w, d.h);
      // head bump
      ctx.fillRect(d.x + d.w - 10, d.y - 16, 18, 18);
      // eye (blink on death)
      ctx.fillStyle = dark ? "#121212" : "#ffffff";
      if (d.dead) {
        // X eyes
        ctx.fillStyle = "#e06c75";
        ctx.fillRect(d.x + d.w + 1, d.y - 13, 3, 3);
        ctx.fillRect(d.x + d.w + 4, d.y - 10, 3, 3);
        ctx.fillRect(d.x + d.w + 1, d.y - 10, 3, 3);
        ctx.fillRect(d.x + d.w + 4, d.y - 13, 3, 3);
      } else {
        ctx.fillRect(d.x + d.w + 2, d.y - 12, 5, 5);
      }
      // legs (animated)
      ctx.fillStyle = d.dead ? "#e06c75" : c;
      if (d.onGround) {
        const legOff = Math.floor(d.frame / 3) % 2 === 0;
        ctx.fillRect(d.x + 6,  d.y + d.h,      10, legOff ? 14 : 8);
        ctx.fillRect(d.x + 22, d.y + d.h, 10, legOff ? 8  : 14);
      } else {
        ctx.fillRect(d.x + 6,  d.y + d.h, 10, 10);
        ctx.fillRect(d.x + 22, d.y + d.h, 10, 10);
      }
      // tail
      ctx.fillRect(d.x - 10, d.y + 10, 12, 8);
    }

    function drawCactus(o) {
      ctx.fillStyle = dark ? "#2cb67d" : "#1a7a50";
      ctx.fillRect(o.x, o.y, o.w, o.h);
      const armH = Math.floor(o.h * 0.4);
      ctx.fillRect(o.x - 8,  o.y + 10, 8,  armH);
      ctx.fillRect(o.x + o.w, o.y + 14, 8,  armH - 4);
      ctx.fillRect(o.x - 8,  o.y + 10 - 12, 6, 14);
      ctx.fillRect(o.x + o.w, o.y + 14 - 10, 6, 12);
    }

    function drawCloud(cl) {
      ctx.fillStyle = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)";
      ctx.beginPath();
      ctx.ellipse(cl.x,           cl.y,      cl.w * 0.5, 14, 0, 0, Math.PI * 2);
      ctx.ellipse(cl.x - cl.w*0.2, cl.y + 5, cl.w * 0.35, 10, 0, 0, Math.PI * 2);
      ctx.ellipse(cl.x + cl.w*0.2, cl.y + 6, cl.w * 0.3,  9, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    function collides(a, b) {
      const pad = 6;
      return (
        a.x + pad < b.x + b.w - pad &&
        a.x + a.w - pad > b.x + pad &&
        a.y + pad < b.y + b.h &&
        a.y + a.h > b.y + pad
      );
    }

    function loop() {
      rafRef.current = requestAnimationFrame(loop);

      const shakeX = state.shake > 0 ? (Math.random() - 0.5) * state.shake * 6 : 0;
      const shakeY = state.shake > 0 ? (Math.random() - 0.5) * state.shake * 3 : 0;
      if (state.shake > 0) state.shake = Math.max(0, state.shake - 0.08);

      ctx.save();
      ctx.translate(shakeX, shakeY);

      ctx.clearRect(0, 0, W, H);

      const bg = dark ? "#121212" : "#f0f0f0";
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // milestone flash overlay
      if (state.milestoneFlash > 0) {
        ctx.fillStyle = `rgba(255,255,255,${state.milestoneFlash * 0.12})`;
        ctx.fillRect(0, 0, W, H);
        state.milestoneFlash = Math.max(0, state.milestoneFlash - 0.06);
      }

      // clouds
      state.clouds.forEach(cl => {
        if (state.started && !state.over) cl.x -= state.speed * 0.3;
        if (cl.x + cl.w < 0) cl.x = W + 20;
        drawCloud(cl);
      });

      // ground
      ctx.fillStyle = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
      ctx.fillRect(0, GND + state.dino.h + 2, W, 2);

      if (!state.started) {
        drawDino(state.dino);
        ctx.fillStyle = dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)";
        ctx.font = "bold 16px 'Fira Code',monospace";
        ctx.textAlign = "center";
        ctx.fillText("Press SPACE or tap to start", W / 2, H / 2 - 10);
        ctx.font = "12px 'Fira Code',monospace";
        ctx.fillText("Avoid the cacti!", W / 2, H / 2 + 14);
        ctx.textAlign = "left";
        ctx.restore();
        return;
      }

      if (!state.over) {
        const d = state.dino;
        const prevOnGround = d.onGround;

        // gravity
        d.vy += GRAV;
        d.y  += d.vy;
        if (d.y >= GND) {
          d.y = GND; d.vy = 0;
          if (!prevOnGround) {
            // just landed
            play("land");
            for (let i = 0; i < 4; i++) {
              state.particles.push({
                x: d.x + d.w / 2 + (Math.random() - 0.5) * 20,
                y: GND + d.h,
                vx: (Math.random() - 0.5) * 2.5,
                vy: -(Math.random() * 1.5 + 0.5),
                life: 1, size: Math.random() * 3 + 1, type: "dust"
              });
            }
          }
          d.onGround = true;
        } else d.onGround = false;

        // footstep sounds
        if (d.onGround) play("step", d.frame);

        // animate legs
        d.frameTimer++;
        if (d.frameTimer > 2) { d.frame++; d.frameTimer = 0; }

        // speed ramp
        state.score  += 1;
        state.speed   = SPD0 + Math.floor(state.score / 300) * 0.8;

        // score milestone every 500pts
        const milestone = Math.floor(state.score / 500);
        if (milestone > state.lastMilestone) {
          state.lastMilestone = milestone;
          state.milestoneFlash = 1;
          play("score", milestone);
        }

        // spawn
        state.spawnT++;
        const minGap = Math.max(55, 90 - Math.floor(state.score / 200) * 5);
        if (state.spawnT > minGap + Math.random() * 40) {
          spawnObstacle();
          state.spawnT = 0;
        }

        // move & draw obstacles
        state.obstacles = state.obstacles.filter(o => o.x + o.w > -10);
        state.obstacles.forEach(o => {
          o.x -= state.speed;
          drawCactus(o);
          if (collides(d, o)) {
            state.over = true;
            d.dead     = true;
            state.shake = 1;
            play("die");
            if (state.score > state.hi) {
              state.hi = state.score;
              try { localStorage.setItem('dino_hi', String(state.hi)); } catch(e) {}
            }
            // death explosion particles
            for (let i = 0; i < 14; i++) {
              const angle = (i / 14) * Math.PI * 2;
              state.particles.push({
                x: d.x + d.w / 2, y: d.y + d.h / 2,
                vx: Math.cos(angle) * (Math.random() * 4 + 1),
                vy: Math.sin(angle) * (Math.random() * 4 + 1) - 2,
                life: 1, size: Math.random() * 5 + 2, type: "spark"
              });
            }
          }
        });
      }

      // draw particles
      state.particles = state.particles.filter(p => p.life > 0);
      state.particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.15; p.life -= 0.05;
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.type === "spark"
          ? (dark ? `rgba(255,${Math.floor(p.life * 200)},80,1)` : "#e06c75")
          : (dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.25)");
        ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
        ctx.globalAlpha = 1;
      });

      drawDino(state.dino);

      // score
      const sc = String(Math.floor(state.score / 5)).padStart(5, "0");
      const hi = String(Math.floor(state.hi   / 5)).padStart(5, "0");
      ctx.fillStyle = dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.35)";
      ctx.font      = "bold 14px 'Fira Code',monospace";
      ctx.textAlign = "right";
      ctx.fillText(`HI ${hi}  ${sc}`, W - 16, 24);
      ctx.textAlign = "left";

      if (state.over) {
        ctx.fillStyle = dark ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.6)";
        ctx.fillRect(W/2 - 160, H/2 - 38, 320, 64);
        ctx.fillStyle = dark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.8)";
        ctx.font      = "bold 20px 'Fira Code',monospace";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", W / 2, H / 2 - 10);
        ctx.font = "13px 'Fira Code',monospace";
        ctx.fillStyle = dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)";
        ctx.fillText("Press SPACE or tap to restart", W / 2, H / 2 + 16);
        ctx.textAlign = "left";
      }

      ctx.restore();
    }

    loop();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("keydown", onKey);
      canvas.removeEventListener("click", onTap);
    };
  }, [dark]);

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", animation: "fadeSlide 0.3s ease" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div ref={wrapRef} style={{ background: dark ? "#121212" : "#f0f0f0", borderRadius: 20, overflow: "hidden", border: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)", maxWidth: "95vw", animation: "fadeSlideUp 0.35s cubic-bezier(0.22,1,0.36,1)" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)" }}>
          <span style={{ fontFamily: "'Fira Code',monospace", fontSize: 13, color: dark ? "#f5f5f5" : "#121212", fontWeight: 600 }}>🦕 Dino Run</span>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 11, color: dark ? "#a6a6a6" : "#666", fontFamily: "'Fira Code',monospace" }}>SPACE / tap to jump</span>
            {/* Mute toggle */}
            <button
              onClick={toggleMute}
              title={muted ? "Unmute" : "Mute"}
              style={{ background: "transparent", border: dark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.12)", borderRadius: "50%", width: 28, height: 28, color: dark ? "#a6a6a6" : "#666", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, transition: "border-color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"}
            >{muted ? "🔇" : "🔊"}</button>
            <button onClick={onClose} style={{ background: "transparent", border: dark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.12)", borderRadius: "50%", width: 28, height: 28, color: dark ? "#a6a6a6" : "#666", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, transition: "border-color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"}>✕</button>
          </div>
        </div>
        {/* Canvas */}
        <canvas ref={canvasRef} style={{ display: "block", maxWidth: "100%" }} />
      </div>
    </div>
  );
}

/* ─── FOOTER QUOTE ─── */
const FOOTER_QUOTES = [
  { line: "Let's build something", accent: "extraordinary." },
  { line: "Great code meets",      accent: "great design." },
  { line: "Available for your",    accent: "next big idea." },
  { line: "Let's work",            accent: "together." },
];

function FooterQuote({ dark }) {
  const [idx, setIdx]         = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIdx(i => (i + 1) % FOOTER_QUOTES.length); setVisible(true); }, 400);
    }, 3200);
    return () => clearInterval(t);
  }, []);

  const q = FOOTER_QUOTES[idx];
  return (
    <div style={{
      marginTop: 36,
      padding: "28px 24px",
      background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
      border: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
      borderRadius: 16,
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(6px)",
      transition: "opacity 0.4s ease, transform 0.4s ease",
    }}>
      <div style={{ fontFamily: "'Fira Code',monospace", fontSize: "clamp(18px,2.2vw,26px)", fontWeight: 700, lineHeight: 1.25, color: "var(--white)" }}>
        {q.line}{" "}
        <span style={{ color: "var(--mid)", fontWeight: 300 }}>{q.accent}</span>
      </div>
      <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block", animation: "pulse 2s infinite" }} />
        <span style={{ fontSize: 12, color: "var(--mid)", fontFamily: "'Open Sans',sans-serif" }}>Open to opportunities — Chennai, India</span>
      </div>
    </div>
  );
}

/* ─── CONTACT FORM ─── */
function FloatInput({ name, placeholder, value, onChange, type = "text", dark, error }) {
  const [focused, setFocused] = useState(false);
  const filled = value.length > 0;
  const active = focused || filled;
  const bg = dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)";
  const borderC = error
    ? "#e06c75"
    : focused
    ? dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"
    : dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)";
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <label style={{ position: "absolute", left: 14, top: active ? 6 : "50%", transform: active ? "none" : "translateY(-50%)", fontSize: active ? 10 : 13, color: error ? "#e06c75" : focused ? (dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.5)") : "var(--mid)", transition: "all 0.2s cubic-bezier(0.22,1,0.36,1)", pointerEvents: "none", fontFamily: "'Open Sans',sans-serif", zIndex: 1 }}>
        {placeholder}
      </label>
      <input name={name} type={type} value={value} onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ width: "100%", background: bg, border: `1px solid ${borderC}`, borderRadius: 10, padding: active ? "22px 14px 8px" : "14px 14px", color: dark ? "#f5f5f5" : "#121212", fontSize: 13, fontFamily: "'Open Sans',sans-serif", outline: "none", transition: "border-color 0.2s, padding 0.2s", boxSizing: "border-box" }} />
    </div>
  );
}

function FloatTextarea({ name, placeholder, value, onChange, dark, error }) {
  const [focused, setFocused] = useState(false);
  const filled = value.length > 0;
  const active = focused || filled;
  const bg = dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)";
  const borderC = error
    ? "#e06c75"
    : focused
    ? dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"
    : dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)";
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <label style={{ position: "absolute", left: 14, top: active ? 8 : 14, fontSize: active ? 10 : 13, color: error ? "#e06c75" : focused ? (dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.5)") : "var(--mid)", transition: "all 0.2s cubic-bezier(0.22,1,0.36,1)", pointerEvents: "none", fontFamily: "'Open Sans',sans-serif", zIndex: 1 }}>
        {placeholder}
      </label>
      <textarea name={name} value={value} onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ width: "100%", background: bg, border: `1px solid ${borderC}`, borderRadius: 10, padding: active ? "26px 14px 10px" : "14px", color: dark ? "#f5f5f5" : "#121212", fontSize: 13, fontFamily: "'Open Sans',sans-serif", outline: "none", resize: "vertical", minHeight: 120, transition: "border-color 0.2s", boxSizing: "border-box" }} />
    </div>
  );
}

function ContactForm({ dark }) {
  const [form, setForm]     = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({ name: false, email: false, subject: false, message: false });
  const [touched, setTouched] = useState({ name: false, email: false, subject: false, message: false });
  const [status, setStatus] = useState("idle");
  const [flying, setFlying] = useState(false);

  const validate = (field, value) => {
    if (field === "email") return value.trim() === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    return value.trim() === "";
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (touched[name]) setErrors(er => ({ ...er, [name]: validate(name, value) }));
  };

  const handleBlur = e => {
    const { name, value } = e.target;
    setTouched(t => ({ ...t, [name]: true }));
    setErrors(er => ({ ...er, [name]: validate(name, value) }));
  };

  const handleSubmit = async () => {
    const newTouched = { name: true, email: true, subject: true, message: true };
    const newErrors = {
      name:    validate("name",    form.name),
      email:   validate("email",   form.email),
      subject: validate("subject", form.subject),
      message: validate("message", form.message),
    };
    setTouched(newTouched);
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;

    setFlying(true);
    setStatus("sending");
    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service_id: EMAILJS_SERVICE_ID, template_id: EMAILJS_TEMPLATE_ID, user_id: EMAILJS_PUBLIC_KEY,
          template_params: { from_name: form.name, from_email: form.email, subject: form.subject, message: form.message } }),
      });
      if (res.ok) { setStatus("success"); setForm({ name: "", email: "", subject: "", message: "" }); setTouched({ name: false, email: false, subject: false, message: false }); setErrors({ name: false, email: false, subject: false, message: false }); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="contact-form-grid">
        <FloatInput dark={dark} name="name"    placeholder="Your name"      value={form.name}    onChange={handleChange} onBlur={handleBlur} error={errors.name} />
        <FloatInput dark={dark} name="email"   placeholder="your@email.com" value={form.email}   onChange={handleChange} onBlur={handleBlur} error={errors.email} type="email" />
      </div>
      <FloatInput   dark={dark} name="subject" placeholder="Subject"        value={form.subject} onChange={handleChange} onBlur={handleBlur} error={errors.subject} />
      <FloatTextarea dark={dark} name="message" placeholder="Your message…" value={form.message} onChange={handleChange} onBlur={handleBlur} error={errors.message} />
      <div style={{ display: "flex", alignItems: "center", gap: 14, minHeight: 38 }}>
        {flying ? (
          <PaperPlane onDone={() => setFlying(false)} />
        ) : (
          <button onClick={handleSubmit} disabled={status === "sending"} style={{ background: dark ? "#fff" : "#121212", color: dark ? "#121212" : "#fff", border: "none", borderRadius: 50, padding: "11px 26px", fontFamily: "'Open Sans',sans-serif", fontWeight: 600, fontSize: 13, cursor: "pointer", opacity: status === "sending" ? 0.6 : 1, position: "relative", overflow: "hidden" }}>
            {status === "sending" ? "Sending…" : "Send Message →"}
          </button>
        )}
        {status === "success" && !flying && <span style={{ fontSize: 12, color: "#22c55e" }}>✓ Message sent!</span>}
        {status === "error"   && !flying && <span style={{ fontSize: 12, color: "#e06c75" }}>Something went wrong.</span>}
      </div>
    </div>
  );
}


/* ─── HERO COLOR PAIRS ─── */
const HERO_COLOR_PAIRS_DARK = [
  ["#ffffff", "#a78bfa"],
  ["#f472b6", "#ffffff"],
  ["#38bdf8", "#fb923c"],
  ["#4ade80", "#ffffff"],
  ["#ffffff", "#f472b6"],
  ["#fb923c", "#38bdf8"],
  ["#a78bfa", "#4ade80"],
  ["#ffffff", "#facc15"],
];
const HERO_COLOR_PAIRS_LIGHT = [
  ["#121212", "#7c3aed"],
  ["#db2777", "#121212"],
  ["#0284c7", "#ea580c"],
  ["#16a34a", "#121212"],
  ["#121212", "#db2777"],
  ["#ea580c", "#0284c7"],
  ["#7c3aed", "#16a34a"],
  ["#121212", "#ca8a04"],
];

const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

function useGlitchText(target) {
  const [display, setDisplay] = useState(target);
  const rafRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    const totalFrames = 18;
    const len = Math.max(target.length, display.length);

    function tick() {
      frame++;
      const progress = frame / totalFrames;
      const resolved = Math.floor(progress * target.length);
      let next = "";
      for (let i = 0; i < len; i++) {
        if (i < resolved) {
          next += target[i] ?? "";
        } else if (i < target.length) {
          next += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        } else {
          next += "";
        }
      }
      setDisplay(next);
      if (frame < totalFrames) rafRef.current = setTimeout(tick, 28);
      else setDisplay(target);
    }

    rafRef.current = setTimeout(tick, 0);
    return () => clearTimeout(rafRef.current);
  }, [target]);

  return display;
}

function HeroTitle({ dark, roleIdx, roleVisible }) {
  const pairs = dark ? HERO_COLOR_PAIRS_DARK : HERO_COLOR_PAIRS_LIGHT;
  const [w1pair, setW1pair] = useState(0);
  const [w2pair, setW2pair] = useState(3);
  const [w1vis,  setW1vis]  = useState(true);
  const [w2vis,  setW2vis]  = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setW1vis(false);
      setTimeout(() => { setW1pair(i => (i + 1) % pairs.length); setW1vis(true); }, 350);
    }, 2400);
    return () => clearInterval(t);
  }, [pairs.length]);

  useEffect(() => {
    let t2;
    const delay = setTimeout(() => {
      t2 = setInterval(() => {
        setW2vis(false);
        setTimeout(() => { setW2pair(i => (i + 1) % pairs.length); setW2vis(true); }, 350);
      }, 3100);
    }, 1200);
    return () => { clearTimeout(delay); clearInterval(t2); };
  }, [pairs.length]);

  const role = ROLES[roleIdx];
  const word1 = role.split(" ")[0];
  const word2 = role.split(" ").slice(1).join(" ");
  const color1 = pairs[w1pair][0];
  const color2 = pairs[w2pair][1];

  const glitchWord1 = useGlitchText(word1);
  const glitchWord2 = useGlitchText(word2);

  const baseStyle = {
    fontFamily: "'Fira Code',monospace",
    fontSize: "clamp(52px,8vw,96px)",
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: "-0.02em",
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap", opacity: 0, animation: "fadeSlideUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s forwards" }}>
        <div className="hero-title-size" style={{ ...baseStyle, color: color1, opacity: (roleVisible && w1vis) ? 1 : 0, transform: (roleVisible && w1vis) ? "none" : "translateY(10px)", transition: "opacity 0.38s cubic-bezier(0.22,1,0.36,1), transform 0.38s cubic-bezier(0.22,1,0.36,1), color 0.55s cubic-bezier(0.22,1,0.36,1)", willChange: "color, opacity, transform" }}>
          {glitchWord1}
        </div>
      </div>
      <div className="hero-title-size" style={{ ...baseStyle, color: color2, textAlign: "right", opacity: (roleVisible && w2vis) ? 1 : 0, transform: (roleVisible && w2vis) ? "none" : "translateY(10px)", transition: "opacity 0.38s cubic-bezier(0.22,1,0.36,1), transform 0.38s cubic-bezier(0.22,1,0.36,1), color 0.55s cubic-bezier(0.22,1,0.36,1)", willChange: "color, opacity, transform", animation: "fadeSlideUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.3s both" }}>
        {glitchWord2}
      </div>
    </>
  );
}


/* ─── CUSTOM CURSOR ─── */
function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const pos     = useRef({ x: -100, y: -100 });
  const ring    = useRef({ x: -100, y: -100 });
  const hovering = useRef(false);
  const rafId   = useRef(null);

  useEffect(() => {
    const onMove = e => { pos.current = { x: e.clientX, y: e.clientY }; };
    const onOver = e => {
      const t = e.target.closest('a,button,[data-magnetic]');
      hovering.current = !!t;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);

    function tick() {
      rafId.current = requestAnimationFrame(tick);
      const dot  = dotRef.current;
      const rng  = ringRef.current;
      if (!dot || !rng) return;
      dot.style.transform  = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      rng.style.transform  = `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px) scale(${hovering.current ? 1.8 : 1})`;
      rng.style.opacity    = hovering.current ? "0.6" : "0.35";
      rng.style.borderColor = hovering.current ? "var(--white)" : "var(--mid)";
    }
    tick();
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  style={{ position:"fixed", top:0, left:0, width:8,  height:8,  borderRadius:"50%", background:"var(--white)", pointerEvents:"none", zIndex:9999, transition:"opacity 0.2s" }} />
      <div ref={ringRef} style={{ position:"fixed", top:0, left:0, width:40, height:40, borderRadius:"50%", border:"1.5px solid var(--mid)", pointerEvents:"none", zIndex:9998, transition:"transform 0.08s linear, opacity 0.2s, border-color 0.2s, scale 0.25s cubic-bezier(0.22,1,0.36,1)" }} />
    </>
  );
}

/* ─── READING PROGRESS BAR ─── */
function ReadingProgress({ dark }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const h = () => {
      const el  = document.documentElement;
      const sc  = window.scrollY;
      const max = el.scrollHeight - el.clientHeight;
      setPct(max > 0 ? (sc / max) * 100 : 0);
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <div style={{ position:"fixed", top:0, left:0, right:0, height:2, zIndex:9997, background:"transparent", pointerEvents:"none" }}>
      <div style={{ height:"100%", width:`${pct}%`, background: dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.4)", transition:"width 0.1s linear", borderRadius:"0 1px 1px 0" }} />
    </div>
  );
}

/* ─── RIPPLE ─── */
function useRipple() {
  const [ripples, setRipples] = useState([]);
  const fire = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const id = Date.now();
    setRipples(r => [...r, { id, x, y }]);
    setTimeout(() => setRipples(r => r.filter(rp => rp.id !== id)), 900);
  };
  const layer = (
    <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none", borderRadius:"inherit" }}>
      {ripples.map(rp => (
        <span key={rp.id} style={{
          position:"absolute", left: rp.x, top: rp.y,
          width:8, height:8, borderRadius:"50%",
          background:"rgba(255,255,255,0.18)",
          transform:"translate(-50%,-50%) scale(0)",
          animation:"rippleOut 0.9s cubic-bezier(0.22,1,0.36,1) forwards",
          pointerEvents:"none",
        }} />
      ))}
    </div>
  );
  return [fire, layer];
}

/* ─── 3D TILT CARD ─── */
function TiltCard({ children, style = {}, dark }) {
  const ref = useRef(null);
  const raf = useRef(null);
  const cur = useRef({ rx:0, ry:0, gx:50, gy:50 });
  const tgt = useRef({ rx:0, ry:0, gx:50, gy:50 });

  const onMove = e => {
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top)  / rect.height;
    tgt.current = { rx: (y - 0.5) * -14, ry: (x - 0.5) * 14, gx: x * 100, gy: y * 100 };
  };
  const onLeave = () => { tgt.current = { rx:0, ry:0, gx:50, gy:50 }; };

  useEffect(() => {
    let running = true;
    function tick() {
      if (!running) return;
      raf.current = requestAnimationFrame(tick);
      const c = cur.current, t = tgt.current;
      c.rx += (t.rx - c.rx) * 0.1;
      c.ry += (t.ry - c.ry) * 0.1;
      c.gx += (t.gx - c.gx) * 0.1;
      c.gy += (t.gy - c.gy) * 0.1;
      if (!ref.current) return;
      ref.current.style.transform = `perspective(800px) rotateX(${c.rx}deg) rotateY(${c.ry}deg)`;
      const shine = ref.current.querySelector(".tilt-shine");
      if (shine) shine.style.background = `radial-gradient(circle at ${c.gx}% ${c.gy}%, rgba(255,255,255,${dark ? 0.07 : 0.12}) 0%, transparent 65%)`;
    }
    tick();
    return () => { running = false; cancelAnimationFrame(raf.current); };
  }, [dark]);

  return (
    <div ref={ref}
      style={{ ...style, position:"relative", transformStyle:"preserve-3d", transition:"box-shadow 0.3s", willChange:"transform" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}>
      <div className="tilt-shine" style={{ position:"absolute", inset:0, borderRadius:"inherit", pointerEvents:"none", zIndex:2, transition:"background 0.05s" }} />
      {children}
    </div>
  );
}

/* ─── MAGNETIC BUTTON ─── */
function Magnetic({ children, strength = 0.35 }) {
  const ref = useRef(null);
  const onMove = e => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = e.clientX - cx, dy = e.clientY - cy;
    ref.current.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
  };
  const onLeave = () => { ref.current.style.transform = "translate(0,0)"; };
  return (
    <div ref={ref} style={{ display:"inline-flex", transition:"transform 0.4s cubic-bezier(0.22,1,0.36,1)" }}
      onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}

/* ─── TERMINAL ─── */
const CONTACT_STEPS = ["name","email","subject","message"];

const ALL_COMMANDS = ["help","message","contact","about","projects","articles","skills","whoami","banner","open","theme","resume","date","time","echo","sudo","rm","hack","coffee","dino","clear","close","exit"];

const ASCII_BANNER = [
  " ██████╗  █████╗  ██████╗ ██╗  ██╗██╗   ██╗██╗",
  " ██╔══██╗██╔══██╗██╔════╝ ██║  ██║██║   ██║██║",
  " ██████╔╝███████║██║  ███╗███████║██║   ██║██║",
  " ██╔══██╗██╔══██║██║   ██║██╔══██║██║   ██║██║",
  " ██║  ██║██║  ██║╚██████╔╝██║  ██║╚██████╔╝███████╗",
  " ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚══════╝",
  "",
  " Full-Stack Dev · UI/UX · Chennai",
];

function Terminal({ onClose, dark, onThemeToggle, onDinoOpen }) {
  const BOOT_LINES = [
    { type:"ban", text: ASCII_BANNER[0] },
    { type:"ban", text: ASCII_BANNER[1] },
    { type:"ban", text: ASCII_BANNER[2] },
    { type:"ban", text: ASCII_BANNER[3] },
    { type:"ban", text: ASCII_BANNER[4] },
    { type:"ban", text: ASCII_BANNER[5] },
    { type:"ban", text: ASCII_BANNER[6] },
    { type:"out", text: ASCII_BANNER[7] },
    { type:"out", text: "" },
    { type:"sys", text: '  Type "help" for available commands.' },
  ];

  const [lines,        setLines]       = useState([]);
  const [input,        setInput]       = useState("");
  const [hist,         setHist]        = useState([]);
  const [hIdx,         setHIdx]        = useState(-1);
  const [contactMode,  setContactMode] = useState(null);
  const [contactData,  setContactData] = useState({ name:"", email:"", subject:"", message:"" });
  const [sending,      setSending]     = useState(false);
  const [tabMatches,   setTabMatches]  = useState([]);
  const [hackMode,     setHackMode]    = useState(false);
  const endRef   = useRef(null);
  const inputRef = useRef(null);
  const timers   = useRef([]);

  /* ── Typewriter: adds lines one by one with a delay ── */
  const typeLines = (newLines, delay = 32) => {
    newLines.forEach((line, idx) => {
      const t = setTimeout(() => {
        setLines(l => [...l, line]);
      }, idx * delay);
      timers.current.push(t);
    });
  };

  /* ── Immediate: add all lines at once ── */
  const addImmediate = (newLines) => {
    setLines(l => [...l, ...newLines]);
  };

  /* Boot */
  useEffect(() => {
    typeLines(BOOT_LINES, 40);
    setTimeout(() => inputRef.current?.focus(), 0);
    return () => timers.current.forEach(clearTimeout);
  }, []);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:"smooth" }); }, [lines]);

  /* ── Tab completion ── */
  const handleTab = () => {
    const val = input.trim().toLowerCase();
    if (!val) return;
    const matches = ALL_COMMANDS.filter(c => c.startsWith(val));
    if (matches.length === 1) {
      setInput(matches[0]);
      setTabMatches([]);
    } else if (matches.length > 1) {
      setTabMatches(matches);
      addImmediate([{ type:"sys", text: "  " + matches.join("   ") }]);
    }
  };

  /* ── Contact field prompts ── */
  const fieldPrompt = (step) => ({
    name:    "  👤 Your name:",
    email:   "  📧 Your email:",
    subject: "  📋 Subject:",
    message: "  💬 Message:",
  }[step]);

  /* ── Submit via EmailJS (same service as ContactForm) ── */
  const submitContact = async (data) => {
    setSending(true);
    addImmediate([{ type:"sys", text:"" }, { type:"sys", text:"  ✈️  Sending your message..." }]);
    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id:  EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id:     EMAILJS_PUBLIC_KEY,
          template_params: {
            from_name:  data.name,
            from_email: data.email,
            subject:    data.subject,
            message:    data.message,
          },
        }),
      });
      if (res.ok) {
        typeLines([
          { type:"ok",  text:"  ✓ Message sent! I'll get back to you soon." },
          { type:"sys", text:"  Closing terminal..." },
        ], 40);
        setTimeout(onClose, 2200);
      } else {
        addImmediate([{ type:"err", text:"  ✗ Failed to send. Check your EmailJS keys." }]);
        setSending(false);
      }
    } catch {
      addImmediate([{ type:"err", text:"  ✗ Network error. Please try the contact form." }]);
      setSending(false);
    }
  };

  /* ── Contact step handler ── */
  const runContactStep = (value) => {
    const trimmed = value.trim();
    if (!trimmed) {
      addImmediate([
        { type:"err", text:`  ✗ This field cannot be empty.` },
        { type:"sys", text: fieldPrompt(contactMode) },
      ]);
      return;
    }
    if (contactMode === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      addImmediate([
        { type:"err", text:"  ✗ Invalid email address." },
        { type:"sys", text: fieldPrompt("email") },
      ]);
      return;
    }
    addImmediate([{ type:"in", text:`  ${trimmed}` }]);
    const updated = { ...contactData, [contactMode]: trimmed };
    setContactData(updated);
    const idx  = CONTACT_STEPS.indexOf(contactMode);
    const next = CONTACT_STEPS[idx + 1];
    if (next) {
      setContactMode(next);
      addImmediate([{ type:"sys", text: fieldPrompt(next) }]);
    } else {
      setContactMode(null);
      typeLines([
        { type:"sys", text:"" },
        { type:"sys", text:"  ┌─ Review ───────────────────────────────────┐" },
        { type:"out", text:`  │  Name    › ${updated.name}` },
        { type:"out", text:`  │  Email   › ${updated.email}` },
        { type:"out", text:`  │  Subject › ${updated.subject}` },
        { type:"out", text:`  │  Message › ${updated.message}` },
        { type:"sys", text:"  └────────────────────────────────────────────┘" },
      ], 30);
      setTimeout(() => submitContact(updated), 500);
    }
  };

  /* ── Hack easter egg ── */
  const runHack = () => {
    setHackMode(true);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*";
    let count = 0;
    const interval = setInterval(() => {
      const line = Array.from({ length: 48 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
      addImmediate([{ type:"hack", text: "  " + line }]);
      count++;
      if (count >= 18) {
        clearInterval(interval);
        setHackMode(false);
        addImmediate([
          { type:"ok",  text:"  ACCESS GRANTED. Just kidding 😄" },
          { type:"out", text:"  Nice try though." },
        ]);
      }
    }, 80);
  };

  /* ── Main command runner ── */
  const run = (cmd) => {
    const trimmed = cmd.trim();
    const lower   = trimmed.toLowerCase();
    setTabMatches([]);

    if (contactMode) {
      runContactStep(trimmed);
      setInput(""); setHIdx(-1);
      return;
    }

    addImmediate([{ type:"in", text:`~ % ${trimmed}` }]);
    setHist(h => [trimmed, ...h.slice(0, 19)]);
    setHIdx(-1);
    setInput("");
    if (!trimmed) return;

    /* ── commands ── */
    if (lower === "close" || lower === "exit") { setTimeout(onClose, 180); return; }
    if (lower === "clear") { setLines([]); return; }

    if (lower === "help") {
      typeLines([
        { type:"sys", text:"  Commands:" },
        { type:"out", text:"  message            send me a message" },
        { type:"out", text:"  whoami             who is Raghul?" },
        { type:"out", text:"  banner             show ASCII banner" },
        { type:"out", text:"  skills             tech proficiency" },
        { type:"out", text:"  open <github|linkedin|instagram|resume>  open link" },
        { type:"out", text:"  theme <dark|light>  toggle site theme" },
        { type:"out", text:"  resume             open resume PDF" },
        { type:"out", text:"  date / time        current date & time" },
        { type:"out", text:"  echo <text>        echo text" },
        { type:"out", text:"  about / projects / articles  navigate" },
        { type:"out", text:"  dino               🦕 " },
        { type:"out", text:"  hack               👾 " },
        { type:"out", text:"  coffee             ☕ " },
        { type:"out", text:"  sudo               🤫 " },
        { type:"out", text:"  clear              clear terminal" },
        { type:"out", text:"  close / exit       close terminal" },
        { type:"sys", text:"  Tip: Tab to autocomplete · ↑↓ for history" },
      ], 22);
      return;
    }

    if (lower === "banner") {
      typeLines(ASCII_BANNER.map((t, i) => ({ type: i < 6 ? "ban" : "out", text: t })), 40);
      return;
    }

    if (lower === "whoami") {
      typeLines([
        { type:"sys", text:"  raghul@portfolio" },
        { type:"out", text:"  ─────────────────────────────────────" },
        { type:"out", text:"  Name    : Raghul Prasanth S P" },
        { type:"out", text:"  Role    : Full-Stack Developer & UI/UX Designer" },
        { type:"out", text:"  Based   : Chennai, India" },
        { type:"out", text:"  Stack   : Golang · React · Node.js · PostgreSQL" },
        { type:"out", text:"  Current : Associate Consultant @ Oracle OFSS" },
        { type:"out", text:"  Loves   : Clean code, great UX, late nights ☕" },
        { type:"out", text:"  ─────────────────────────────────────" },
      ], 30);
      return;
    }

    if (lower === "message" || lower === "contact") {
      setContactData({ name:"", email:"", subject:"", message:"" });
      setContactMode("name");
      typeLines([
        { type:"sys", text:"" },
        { type:"sys", text:"  📬 New message to Raghul" },
        { type:"sys", text:"  ─────────────────────────────────────" },
        { type:"sys", text: fieldPrompt("name") },
      ], 30);
      return;
    }

    if (lower === "skills") {
      typeLines([
        { type:"sys", text:"  Tech Proficiency:" },
        { type:"out", text:"  Python  ████████░░  4/5" },
        { type:"out", text:"  Golang        ████████░░  4/5" },
        { type:"out", text:"  React / Next  ██████████  5/5" },
        { type:"out", text:"  TypeScript    ████████░░  4/5" },
        { type:"out", text:"  PostgreSQL    ████████░░  4/5" },
        { type:"out", text:"  Docker        ██████░░░░  3/5" },
        { type:"out", text:"  Figma         ████████░░  4/5" },
        { type:"out", text:"  UI/UX Design  ████████░░  4/5" },
      ], 28);
      return;
    }

    if (lower === "resume" || lower === "open resume") {
      window.open("https://drive.google.com/file/d/119aWs2pg2xOLRaC2MV-uAVG8rILT1D4a/view?usp=drive_link", "_blank");
      addImmediate([{ type:"ok", text:"  ✓ Opened resume in new tab." }]);
      setTimeout(onClose, 900);
      return;
    }

    if (lower.startsWith("open ")) {
      const target = lower.slice(5).trim();
      const links = {
        github:    "https://github.com/Raghul-18",
        linkedin:  "https://www.linkedin.com/in/raghul-prasanth/",
        instagram: "https://www.instagram.com/rag.hul._/",
        resume:    "https://drive.google.com/file/d/119aWs2pg2xOLRaC2MV-uAVG8rILT1D4a/view?usp=drive_link",
      };
      if (links[target]) {
        window.open(links[target], "_blank");
        addImmediate([{ type:"ok", text:`  ✓ Opened ${target} in new tab.` }]);
        setTimeout(onClose, 900);
      } else {
        addImmediate([{ type:"err", text:`  ✗ Unknown target "${target}". Try: github, linkedin, instagram, resume` }]);
      }
      return;
    }

    if (lower.startsWith("theme ")) {
      const t = lower.slice(6).trim();
      if (t === "dark" || t === "light") {
        onThemeToggle(t === "dark");
        addImmediate([{ type:"ok", text:`  ✓ Theme set to ${t}.` }]);
        setTimeout(onClose, 700);
      } else {
        addImmediate([{ type:"err", text:'  ✗ Usage: theme dark | theme light' }]);
      }
      return;
    }

    if (lower === "date") {
      addImmediate([{ type:"out", text:`  ${new Date().toDateString()}` }]);
      return;
    }
    if (lower === "time") {
      addImmediate([{ type:"out", text:`  ${new Date().toLocaleTimeString()}` }]);
      return;
    }

    if (lower.startsWith("echo ")) {
      addImmediate([{ type:"out", text:`  ${trimmed.slice(5)}` }]);
      return;
    }

    if (lower === "about")    { document.getElementById("about")?.scrollIntoView({ behavior:"smooth" });    addImmediate([{ type:"out", text:"→ Scrolling to About..." }]);    setTimeout(onClose, 700); return; }
    if (lower === "projects") { document.getElementById("projects")?.scrollIntoView({ behavior:"smooth" }); addImmediate([{ type:"out", text:"→ Scrolling to Projects..." }]); setTimeout(onClose, 700); return; }
    if (lower === "articles") { document.getElementById("articles")?.scrollIntoView({ behavior:"smooth" }); addImmediate([{ type:"out", text:"→ Scrolling to Articles..." }]); setTimeout(onClose, 700); return; }

    if (lower === "dino") {
      addImmediate([{ type:"ok", text:"  🦕  Launching Dino Run..." }]);
      setTimeout(() => { onClose(); onDinoOpen(); }, 600);
      return;
    }

    if (lower === "coffee") {
      typeLines([
        { type:"out", text:"  ☕  Brewing..." },
        { type:"out", text:"  Raghul runs on coffee and late-night debugging sessions." },
        { type:"out", text:"  Current caffeine level: ████████░░  80%" },
      ], 60);
      return;
    }

    if (lower === "hack") {
      addImmediate([{ type:"sys", text:"  Initialising hack sequence..." }]);
      setTimeout(runHack, 400);
      return;
    }

    if (lower.startsWith("sudo")) {
      addImmediate([{ type:"err", text:"  sudo: permission denied. Nice try 😄" }]);
      return;
    }

    if (lower.startsWith("rm ")) {
      addImmediate([{ type:"err", text:"  rm: cannot remove '/': you wish 😂" }]);
      return;
    }

    addImmediate([{ type:"err", text:`  command not found: ${trimmed}. Type "help".` }]);
  };

  const onKey = e => {
    if (sending || hackMode) return;
    if (e.key === "Enter")  { run(input); }
    if (e.key === "Tab")    { e.preventDefault(); handleTab(); }
    if (e.key === "ArrowUp"   && !contactMode) { const i = Math.min(hIdx+1, hist.length-1); setHIdx(i); setInput(hist[i] || ""); }
    if (e.key === "ArrowDown" && !contactMode) { const i = Math.max(hIdx-1, -1); setHIdx(i); setInput(i === -1 ? "" : hist[i]); }
    if (e.key === "Escape") {
      if (contactMode) { setContactMode(null); setContactData({ name:"", email:"", subject:"", message:"" }); addImmediate([{ type:"err", text:"  ✗ Message cancelled." }]); }
      else onClose();
    }
  };

  const lineColor = (type) => {
    if (type === "in")   return "#a78bfa";
    if (type === "sys")  return "#fbbf24";
    if (type === "ok")   return "#34d399";
    if (type === "err")  return "#f87171";
    if (type === "ban")  return "#7dd3fc";
    if (type === "hack") return "#22c55e";
    return "#e2e8f0";
  };

  return (
    <div style={{ position:"fixed", inset:0, zIndex:9990, background:"rgba(0,0,0,0.75)", backdropFilter:"blur(6px)", display:"flex", alignItems:"center", justifyContent:"center" }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ width:"min(700px,98vw)", background:"#0a0a0a", borderRadius:16, border:"1px solid rgba(255,255,255,0.1)", overflow:"hidden", boxShadow:"0 40px 100px rgba(0,0,0,0.8)", display:"flex", flexDirection:"column", maxHeight:"92vh" }}>

        {/* ── title bar ── */}
        <div style={{ display:"flex", alignItems:"center", gap:8, padding:"12px 16px", borderBottom:"1px solid rgba(255,255,255,0.07)", background:"rgba(255,255,255,0.025)", flexShrink:0 }}>
          {["#f87171","#fbbf24","#34d399"].map(c => (
            <span key={c} style={{ width:12, height:12, borderRadius:"50%", background:c, cursor: c==="#f87171"?"pointer":"default", flexShrink:0 }}
              onClick={c==="#f87171" ? onClose : undefined} />
          ))}
          <span style={{ marginLeft:8, fontSize:12, color:"#6b7280", fontFamily:"'Fira Code',monospace" }}>
            raghul@portfolio:~{contactMode ? ` [msg·${contactMode}]` : ""}
          </span>
          <span style={{ marginLeft:"auto", fontSize:11, color:"#374151", fontFamily:"'Fira Code',monospace" }}>
            {hackMode ? "● HACKING" : "● zsh"}
          </span>
        </div>

        {/* ── output ── */}
        <div style={{ flex:1, overflowY:"auto", padding:"14px 16px", fontFamily:"'Fira Code',monospace", fontSize:"clamp(10px,2.5vw,13px)", lineHeight:1.9, minHeight:0, overflowX:"auto", wordBreak:"break-all", WebkitOverflowScrolling:"touch" }}>
          {lines.map((l, i) => (
            <div key={i} className={l.type === "ban" ? "terminal-ban" : ""} style={{ color: lineColor(l.type), whiteSpace: l.type === "ban" ? "pre" : "pre-wrap", fontWeight: l.type === "ban" ? 700 : 400, fontSize: l.type === "ban" ? "clamp(7px,1.6vw,13px)" : undefined }}>{l.text}</div>
          ))}
          {/* blinking cursor line */}
          <div style={{ display:"flex", alignItems:"center", height:20 }}>
            <span style={{ display:"inline-block", width:8, height:15, background:"#a78bfa", opacity:1, animation:"pulse 1.1s step-end infinite", borderRadius:1 }} />
          </div>
          <div ref={endRef} />
        </div>

        {/* ── input ── */}
        <div style={{ display:"flex", alignItems:"center", gap:10, padding:"12px 20px", borderTop:"1px solid rgba(255,255,255,0.07)", background: contactMode ? "rgba(52,211,153,0.04)" : "rgba(167,139,250,0.03)", flexShrink:0, transition:"background 0.3s" }}>
          <span style={{ color: contactMode ? "#34d399" : "#a78bfa", fontFamily:"'Fira Code',monospace", fontSize:13, flexShrink:0 }}>
            {contactMode ? `[${contactMode}] ›` : "~ %"}
          </span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => { setInput(e.target.value); setTabMatches([]); }}
            onKeyDown={onKey}
            disabled={sending || hackMode}
            style={{ flex:1, background:"transparent", border:"none", outline:"none", color:"#f1f5f9", fontFamily:"'Fira Code',monospace", fontSize:13, caretColor: contactMode ? "#34d399" : "#a78bfa", opacity: (sending || hackMode) ? 0.4 : 1 }}
            placeholder={contactMode ? `enter your ${contactMode}…` : "type a command… (Tab to complete)"}
            autoComplete="off" spellCheck="false"
          />
        </div>

        {/* ── tab completions ── */}
        {tabMatches.length > 1 && (
          <div style={{ padding:"6px 20px 10px", fontFamily:"'Fira Code',monospace", fontSize:12, color:"#6b7280", borderTop:"1px solid rgba(255,255,255,0.04)", display:"flex", gap:16, flexWrap:"wrap" }}>
            {tabMatches.map(m => <span key={m} style={{ color:"#a78bfa" }}>{m}</span>)}
          </div>
        )}
      </div>
    </div>
  );
}



/* ─── COUNT UP ─── */
function CountUp({ target, suffix = "", duration = 1800 }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useFadeIn();
  const started = useRef(false);
  useEffect(() => {
    if (!visible || started.current) return;
    started.current = true;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(ease * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [visible]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── TIMEZONE WIDGET ─── */
function TimezoneWidget({ dark }) {
  const [localTime,   setLocalTime]   = useState("");
  const [istTime,     setIstTime]     = useState("");
  const [isWorkHours, setIsWorkHours] = useState(false);
  const [tzLabel,     setTzLabel]     = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();

      // Visitor local time
      const local = now.toLocaleTimeString([], { hour:"2-digit", minute:"2-digit", hour12:true });
      setLocalTime(local);

      // Detect visitor timezone label (e.g. "EST", "GMT+1")
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const short = now.toLocaleTimeString("en-US", { timeZoneName:"short" }).split(" ").pop();
        setTzLabel(short || tz);
      } catch { setTzLabel(""); }

      // IST time for working hours check
      const istHourStr = now.toLocaleString("en-IN", { timeZone:"Asia/Kolkata", hour:"numeric", hour12:false });
      const istH = parseInt(istHourStr);
      setIsWorkHours(istH >= 9 && istH < 22);

      // Show IST time too
      const ist = now.toLocaleTimeString("en-IN", { timeZone:"Asia/Kolkata", hour:"2-digit", minute:"2-digit", hour12:true });
      setIstTime(ist);
    };
    update();
    const t = setInterval(update, 15000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 16px", background: dark?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.03)", border: dark?"1px solid rgba(255,255,255,0.06)":"1px solid rgba(0,0,0,0.06)", borderRadius:12 }}>
      <span style={{ width:8, height:8, borderRadius:"50%", background: isWorkHours ? "#22c55e" : "#f59e0b", flexShrink:0, animation:"pulse 2s infinite" }} />
      <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
        <span style={{ fontSize:12, color:"var(--white)", fontFamily:"'Fira Code',monospace" }}>
          {isWorkHours ? "Available now" : "Outside work hours"} · Chennai, IN
        </span>
        <span style={{ fontSize:11, color:"var(--mid)", fontFamily:"'Fira Code',monospace" }}>
          Your time: {localTime}{tzLabel ? ` (${tzLabel})` : ""} · IST: {istTime} · Usually responds within 24hrs
        </span>
      </div>
    </div>
  );
}

/* ─── FLOATING LABEL INPUT ─── */
// function FloatInput({ name, placeholder, value, onChange, type="text", dark }) {
//   const [focused, setFocused] = useState(false);
//   const filled = value.length > 0;
//   const active = focused || filled;
//   const bg = dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)";
//   const borderC = focused ? (dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)") : (dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)");
//   return (
//     <div style={{ position:"relative", width:"100%" }}>
//       <label style={{ position:"absolute", left:14, top: active ? 6 : "50%", transform: active ? "none" : "translateY(-50%)", fontSize: active ? 10 : 13, color: focused ? (dark?"rgba(255,255,255,0.7)":"rgba(0,0,0,0.5)") : "var(--mid)", transition:"all 0.2s cubic-bezier(0.22,1,0.36,1)", pointerEvents:"none", fontFamily:"'Open Sans',sans-serif", zIndex:1 }}>
//         {placeholder}
//       </label>
//       <input name={name} type={type} value={value} onChange={onChange}
//         onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
//         style={{ width:"100%", background:bg, border:`1px solid ${borderC}`, borderRadius:10, padding: active ? "22px 14px 8px" : "14px 14px", color: dark?"#f5f5f5":"#121212", fontSize:13, fontFamily:"'Open Sans',sans-serif", outline:"none", transition:"border-color 0.2s, padding 0.2s", boxSizing:"border-box" }} />
//     </div>
//   );
// }
// function FloatTextarea({ name, placeholder, value, onChange, dark }) {
//   const [focused, setFocused] = useState(false);
//   const filled = value.length > 0;
//   const active = focused || filled;
//   const bg = dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)";
//   const borderC = focused ? (dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)") : (dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)");
//   return (
//     <div style={{ position:"relative", width:"100%" }}>
//       <label style={{ position:"absolute", left:14, top: active ? 8 : 14, fontSize: active ? 10 : 13, color: focused ? (dark?"rgba(255,255,255,0.7)":"rgba(0,0,0,0.5)") : "var(--mid)", transition:"all 0.2s cubic-bezier(0.22,1,0.36,1)", pointerEvents:"none", fontFamily:"'Open Sans',sans-serif", zIndex:1 }}>
//         {placeholder}
//       </label>
//       <textarea name={name} value={value} onChange={onChange}
//         onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
//         style={{ width:"100%", background:bg, border:`1px solid ${borderC}`, borderRadius:10, padding: active ? "26px 14px 10px" : "14px", color: dark?"#f5f5f5":"#121212", fontSize:13, fontFamily:"'Open Sans',sans-serif", outline:"none", resize:"vertical", minHeight:120, transition:"border-color 0.2s", boxSizing:"border-box" }} />
//     </div>
//   );
// }

/* ─── PAPER AIRPLANE SEND ─── */
function PaperPlane({ onDone }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.animate([
      { transform:"translate(0,0) rotate(0deg)",   opacity:1 },
      { transform:"translate(180px,-120px) rotate(25deg)", opacity:1, offset:0.6 },
      { transform:"translate(420px,-60px) rotate(15deg)",  opacity:0 },
    ], { duration:800, easing:"cubic-bezier(0.22,1,0.36,1)", fill:"forwards" }).onfinish = onDone;
  }, []);
  return (
    <span ref={ref} style={{ display:"inline-block", fontSize:18, pointerEvents:"none" }}>✈️</span>
  );
}

/* ─── MAIN APP ─── */
export default function Portfolio() {
  const [dark, setDark]               = useState(() => typeof window !== "undefined" ? window.matchMedia("(prefers-color-scheme: dark)").matches : true);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [expandedWork, setExpandedWork]   = useState(null);
  const [articlePage, setArticlePage]     = useState(0);
  const [heroSlide, setHeroSlide]         = useState(0);
  const [roleIdx, setRoleIdx]         = useState(0);
  const [roleVisible, setRoleVisible] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [dinoOpen, setDinoOpen]           = useState(false);
  const [terminalOpen, setTerminalOpen]   = useState(false);
  const [scrollPct, setScrollPct]         = useState(0);
  const [mousePos, setMousePos]           = useState({ x: 0, y: 0 });
  const [activeTag, setActiveTag]         = useState(null);
  const heroRef = useRef(null);

  const theme = dark
    ? { "--black":"#121212","--dark":"#3D3D3D","--mid":"#A6A6A6","--light":"#F5F5F5","--white":"#ffffff","--bg":"#121212","--text":"#F5F5F5" }
    : { "--black":"#f5f5f5","--dark":"#d0d0d0","--mid":"#666","--light":"#1a1a1a","--white":"#121212","--bg":"#f0f0f0","--text":"#121212" };

  /* Role glitch cycle */
  useEffect(() => {
    const t = setInterval(() => {
      setRoleVisible(false);
      setTimeout(() => { setRoleIdx(i => (i + 1) % ROLES.length); setRoleVisible(true); }, 80);
    }, 3200);
    return () => clearInterval(t);
  }, []);

  /* Scroll: active nav + scroll-to-top visibility */
  useEffect(() => {
    const handler = () => {
      const ids = ["hero","about","work","projects","articles","contact"];
      let cur = "hero";
      ids.forEach(id => { const el = document.getElementById(id); if (el && window.scrollY >= el.offsetTop - 120) cur = id; });
      setActiveSection(cur);
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* Terminal shortcut: press "/" */
  useEffect(() => {
    const onKey = e => {
      if (e.key === "/" && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
        e.preventDefault();
        setTerminalOpen(t => !t);
      }
      if (e.key === "Escape") setTerminalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* Mouse tracking for spotlight */
  useEffect(() => {
    const h = e => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h, { passive: true });
    return () => window.removeEventListener("mousemove", h);
  }, []);

  /* System dark mode */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const h = e => setDark(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  const scrollTo = id => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  const navLinks = [
    { label: "About",    id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Articles", id: "articles" },
    { label: "Contacts", id: "contact" },
  ];
  const articles = ARTICLES_PAGES[articlePage];
  const dotColor = dark ? "#ffffff" : "#121212";
  const divider  = dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)";

  return (
    <div style={{ ...theme, background: "var(--bg)", color: "var(--text)", fontFamily: "'Open Sans',sans-serif", fontSize: 14, lineHeight: 1.6, overflowX: "hidden", minHeight: "100vh" }}>
      <ReadingProgress dark={dark} />
      {/* Spotlight overlay */}
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:1, background:`radial-gradient(circle 380px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, ${dark ? "rgba(0,0,0,0.18)" : "rgba(0,0,0,0.06)"} 100%)` }} />
      {terminalOpen && <Terminal onClose={() => setTerminalOpen(false)} dark={dark} onThemeToggle={v => setDark(v)} onDinoOpen={() => setDinoOpen(true)} />}
      <FontLink />
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:var(--bg)}
        ::-webkit-scrollbar-thumb{background:var(--dark);border-radius:2px}
        body{overflow-x:hidden}
        .role-anim{transition:opacity 0.4s cubic-bezier(0.22,1,0.36,1),transform 0.4s cubic-bezier(0.22,1,0.36,1)}
        @keyframes fadeSlide{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}
        @keyframes fadeSlideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        @keyframes floatA{0%,100%{transform:scale(1) translateY(0)}50%{transform:scale(1.04) translateY(-18px)}}
        @keyframes floatB{0%,100%{transform:scale(1) translateY(0)}50%{transform:scale(0.96) translateY(14px)}}
        @keyframes spinSlow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes scorePopIn{0%{transform:scale(0.6) translateY(4px);opacity:0}60%{transform:scale(1.15);opacity:1}100%{transform:scale(1);opacity:1}}
        @keyframes dinoJumpParticle{0%{transform:translateY(0) scale(1);opacity:0.8}100%{transform:translateY(-28px) scale(0);opacity:0}}
        .nav-score-pop{animation:scorePopIn 0.35s cubic-bezier(0.22,1,0.36,1) both}
        @keyframes rippleOut{0%{transform:translate(-50%,-50%) scale(0);opacity:1}100%{transform:translate(-50%,-50%) scale(40);opacity:0}}
        .section-hr{border:none;border-top:1px solid rgba(128,128,128,0.08)}
        @keyframes meshFloat{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(20px,-20px) scale(1.05)}}
        @media(max-width:768px){
          .nav-links-desktop{display:none!important}
          .hamburger-btn{display:flex!important}
          .hero-pad,.about-pad,.work-pad,.projects-pad,.articles-pad,.footer-pad{padding-left:20px!important;padding-right:20px!important}
          .about-grid{grid-template-columns:1fr!important}
          .project-item-grid{grid-template-columns:1fr!important;direction:ltr!important}
          .art-cards-grid{grid-template-columns:1fr!important}
          .footer-grid{grid-template-columns:1fr!important}
          .footer-avail-grid{grid-template-columns:1fr 1fr!important}
          .hero-title-size{font-size:clamp(40px,12vw,96px)!important}
          .contact-name-size{font-size:clamp(28px,8vw,60px)!important}
          .work-heading{font-size:clamp(36px,10vw,80px)!important}
          .contact-form-grid{grid-template-columns:1fr!important}
          .skills-grid-resp{grid-template-columns:1fr!important}
          .about-stack-grid{grid-template-columns:1fr!important}
          .about-prof-grid{grid-template-columns:1fr 1fr!important}
          .work-row-grid{grid-template-columns:80px 1fr auto!important}
          .work-expanded-pad{padding-left:80px!important}
          .terminal-ban{font-size:7px!important;letter-spacing:-0.5px!important}
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 48px", background: dark ? "rgba(18,18,18,0.9)" : "rgba(240,240,240,0.9)", backdropFilter: "blur(12px)", borderBottom: divider }}>
        <div style={{ fontFamily: "'Fira Code',monospace", fontWeight: 600, fontSize: 15, color: "var(--white)", lineHeight: 1.3 }}>
          Raghul Prasanth S P
          <span style={{ display: "block", fontWeight: 300, color: "var(--mid)", fontSize: 11 }}>Full-Stack Developer · UI/UX Designer</span>
        </div>
        <ul className="nav-links-desktop" style={{ display: "flex", gap: 36, listStyle: "none" }}>
          {navLinks.map(l => (
            <li key={l.id} style={{ position: "relative" }}>
              <Magnetic strength={0.4}><button onClick={() => scrollTo(l.id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: activeSection === l.id ? "var(--white)" : "var(--mid)", fontFamily: "'Open Sans',sans-serif", transition: "color 0.2s", padding: "4px 0" }}>{l.label}</button></Magnetic>
              <span style={{ position: "absolute", bottom: -2, left: 0, right: 0, height: 1.5, borderRadius: 1, background: "var(--white)", transform: activeSection === l.id ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)" }} />
            </li>
          ))}
        </ul>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <a href={RESUME_LINK} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, background: "transparent", border: dark ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(0,0,0,0.15)", borderRadius: 50, padding: "7px 14px", fontSize: 12, color: "var(--mid)", textDecoration: "none", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.color = "var(--white)"; e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "var(--mid)"; e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"; }}>
            <DownloadIcon /> Resume
          </a>
          <button onClick={() => setDark(d => !d)} style={{ background: "transparent", border: dark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.12)", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--mid)", cursor: "pointer" }}>
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
          <button onClick={() => setMenuOpen(o => !o)} className="hamburger-btn" style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: "var(--white)", padding: 4 }}>
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ position: "fixed", top: 72, left: 0, right: 0, zIndex: 99, background: dark ? "rgba(18,18,18,0.97)" : "rgba(240,240,240,0.97)", backdropFilter: "blur(12px)", borderBottom: divider, padding: "20px", display: "flex", flexDirection: "column", gap: 16 }}>
          {navLinks.map(l => <button key={l.id} onClick={() => scrollTo(l.id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 15, color: "var(--white)", fontFamily: "'Open Sans',sans-serif", textAlign: "left", padding: "6px 0" }}>{l.label}</button>)}
          <a href={RESUME_LINK} target="_blank" rel="noreferrer" style={{ fontSize: 14, color: "var(--mid)", textDecoration: "none", padding: "6px 0", display: "flex", alignItems: "center", gap: 6 }}><DownloadIcon /> Download Resume</a>
        </div>
      )}

      {/* ── HERO ── */}
      <section id="hero" ref={heroRef} style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "120px 48px 60px", position: "relative", overflow: "hidden" }} className="hero-pad">
        <GradientMesh dark={dark} />
        <div style={{ position:"absolute", top: 80 + mousePos.y * 0.018, right: -80 - mousePos.x * 0.008, width:420, height:420, border: dark?"1px solid rgba(255,255,255,0.05)":"1px solid rgba(0,0,0,0.05)", borderRadius:"50%", pointerEvents:"none", animation:"floatA 9s ease-in-out infinite", transition:"top 0.6s cubic-bezier(0.22,1,0.36,1), right 0.6s cubic-bezier(0.22,1,0.36,1)", zIndex:1 }} />
        <div style={{ position:"absolute", top: 220 + mousePos.y * 0.028, right: 80 - mousePos.x * 0.014, width:180, height:180, border: dark?"1px solid rgba(255,255,255,0.03)":"1px solid rgba(0,0,0,0.03)", borderRadius:"50%", pointerEvents:"none", animation:"floatB 7s ease-in-out infinite", transition:"top 0.5s cubic-bezier(0.22,1,0.36,1), right 0.5s cubic-bezier(0.22,1,0.36,1)", zIndex:1 }} />
        <div style={{ position:"absolute", top: 300 + mousePos.y * 0.038, right: -20 - mousePos.x * 0.02, width:80, height:80, border: dark?"1px solid rgba(255,255,255,0.04)":"1px solid rgba(0,0,0,0.04)", borderRadius:"50%", pointerEvents:"none", animation:"floatA 11s ease-in-out infinite 2s", transition:"top 0.4s cubic-bezier(0.22,1,0.36,1), right 0.4s cubic-bezier(0.22,1,0.36,1)", zIndex:1 }} />
        <div style={{ fontFamily: "'Fira Code',monospace", fontSize: 12, color: "var(--mid)", marginBottom: 8, letterSpacing: "0.05em", opacity: 0, animation: "fadeSlideUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s forwards", zIndex:2, position:"relative" }}>... /Main ...</div>
        <div onClick={() => setTerminalOpen(true)} style={{ position:"absolute", top:130, right:48, zIndex:2, display:"flex", alignItems:"center", gap:6, opacity:0, animation:"fadeSlideUp 0.5s cubic-bezier(0.22,1,0.36,1) 1.2s forwards", cursor:"pointer" }} title="Open terminal">
          <kbd style={{ fontFamily:"'Fira Code',monospace", fontSize:11, color:"var(--mid)", background: dark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.06)", border: dark?"1px solid rgba(255,255,255,0.12)":"1px solid rgba(0,0,0,0.12)", borderRadius:5, padding:"2px 7px", transition:"all 0.2s" }}>/</kbd>
          <span style={{ fontSize:11, color:"var(--mid)", fontFamily:"'Open Sans',sans-serif" }}>terminal</span>
        </div>

        <HeroTitle dark={dark} roleIdx={roleIdx} roleVisible={roleVisible} />

        {/* Projects button — fixed position below title, never shifts */}
        <div style={{ opacity: 0, animation: "fadeSlideUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.4s forwards", marginTop: 20 }}>
          <button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--white)", color: "var(--bg)", border: "none", borderRadius: 50, padding: "12px 24px", fontFamily: "'Open Sans',sans-serif", fontSize: 14, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", transition: "transform 0.2s, box-shadow 0.2s", backgroundImage: "linear-gradient(120deg, transparent 0%, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%, transparent 100%)", backgroundSize: "200% auto", animation: "shimmer 3s linear infinite" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
            Projects <span style={{ width: 28, height: 28, background: "var(--bg)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>→</span>
          </button>
        </div>

        <p style={{ marginTop: 20, maxWidth: 340, fontSize: 13, color: "var(--mid)", lineHeight: 1.8, opacity: 0, animation: "fadeSlideUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.45s forwards" }}>
          I write{" "}
          <em style={{ fontStyle: "italic", color: "var(--light)" }}>code that lasts</em>{" "}
          and build{" "}
          <em style={{ fontStyle: "italic", color: "var(--light)" }}>interfaces people remember</em>.{" "}
          Good code shouldn't sacrifice great design.<br></br>I craft full-stack products as{" "}
          <em style={{ fontStyle: "italic", color: "var(--light)" }}>thoughtful under the hood</em>{" "}
          as they are on the surface.
        </p>

        <div style={{ display: "flex", gap: 10, marginTop: 36, flexWrap: "wrap", opacity: 0, animation: "fadeSlideUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.55s forwards" }}>
          {[
            { icon: <GithubIcon />,    label: "Github",    href: "https://github.com/Raghul-18" },
            { icon: <LinkedInIcon />,  label: "LinkedIn",  href: "https://www.linkedin.com/in/raghul-prasanth/" },
            { icon: <InstagramIcon />, label: "Instagram", href: "https://www.instagram.com/rag.hul._/" },
            { icon: <EmailIcon />,     label: "E-mail",    href: "mailto:raghulprasanth@email.com" },
          ].map(s => (
            <a key={s.label} href={s.href} target={s.label !== "E-mail" ? "_blank" : undefined} rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 7, background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)", border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)", borderRadius: 50, padding: "8px 16px", fontSize: 12, color: "var(--light)", textDecoration: "none", transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = dark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.09)"}
              onMouseLeave={e => e.currentTarget.style.background = dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"}
            >{s.icon}{s.label}</a>
          ))}
        </div>

        {/* Stats row */}
        <div style={{ display:"flex", gap:32, marginTop:32, opacity:0, animation:"fadeSlideUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.65s forwards", flexWrap:"wrap" }}>
          {[
            { label:"Years of exp in Dev", value:5, suffix:"+" },
            { label:"Projects shipped", value:10, suffix:"+" },
            { label:"Technologies", value:15, suffix:"+" },
          ].map(s => (
            <div key={s.label} style={{ display:"flex", flexDirection:"column", gap:2 }}>
              <span style={{ fontFamily:"'Fira Code',monospace", fontSize:28, fontWeight:700, color:"var(--white)", lineHeight:1 }}>
                <CountUp target={s.value} suffix={s.suffix} />
              </span>
              <span style={{ fontSize:11, color:"var(--mid)" }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Hero carousel */}
        <HeroCarousel dark={dark} />
      </section>

      <hr style={{ border: "none", borderTop: divider }} />

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "80px 48px" }} className="about-pad">
        <SectionHeader label="About" title="About" mb={40} />

        {/* ── Bio + badge ── */}
        <FadeIn>
          <div style={{ maxWidth: 680, marginBottom: 40 }}>
            <p style={{ fontSize: 15, color: "var(--light)", lineHeight: 1.9 }}>
              I'm <em style={{ fontStyle: "italic", fontWeight: 600, color: "var(--white)" }}>Raghul Prasanth</em>, a <em style={{ fontStyle: "italic", fontWeight: 600, color: "var(--white)" }}>Full-Stack Developer & UI/UX Designer</em> based in Chennai, India. I build scalable cloud-native applications and craft delightful, user-centred interfaces, bridging the gap between engineering and design.
            </p>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background: dark?"rgba(34,197,94,0.08)":"rgba(34,197,94,0.06)", border:"1px solid rgba(34,197,94,0.2)", borderRadius:50, padding:"6px 14px", marginTop:16 }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#22c55e", animation:"pulse 2s infinite", flexShrink:0 }} />
              <span style={{ fontSize:12, color:"#22c55e", fontFamily:"'Fira Code',monospace" }}>Currently @ Oracle OFSS · Building cloud-native MVPs</span>
            </div>
          </div>
        </FadeIn>

        {/* ── Tech stack — 3-col grid ── */}
        <FadeIn delay={60}>
          <p style={{ fontSize: 12, color: "var(--mid)", marginBottom: 14, fontFamily: "'Fira Code',monospace", letterSpacing: "0.04em" }}>CORE STACK</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 48 }} className="about-stack-grid">
            {SKILL_CARDS.map(s => (
              <div key={s.title}
                style={{
                  background: s.learning
                    ? (dark ? "rgba(167,139,250,0.06)" : "rgba(124,58,237,0.04)")
                    : (dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)"),
                  border: s.learning
                    ? (dark ? "1px solid rgba(167,139,250,0.2)" : "1px solid rgba(124,58,237,0.15)")
                    : (dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)"),
                  borderRadius: 14, padding: 16,
                  transition: "border-color 0.25s, background 0.25s, transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s"
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = s.learning ? (dark?"rgba(167,139,250,0.4)":"rgba(124,58,237,0.3)") : (dark?"rgba(255,255,255,0.14)":"rgba(0,0,0,0.14)"); e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = dark ? "0 8px 24px rgba(0,0,0,0.4)" : "0 8px 24px rgba(0,0,0,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = s.learning ? (dark?"rgba(167,139,250,0.2)":"rgba(124,58,237,0.15)") : (dark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.06)"); e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:7 }}>
                  <h4 style={{ fontFamily: "'Fira Code',monospace", fontSize: 12, fontWeight: 600, color: s.learning ? (dark?"#a78bfa":"#7c3aed") : "var(--white)", margin:0 }}>{s.title}</h4>
                  {s.learning && <span style={{ fontSize:9, background: dark?"rgba(167,139,250,0.15)":"rgba(124,58,237,0.1)", color: dark?"#a78bfa":"#7c3aed", border: dark?"1px solid rgba(167,139,250,0.2)":"1px solid rgba(124,58,237,0.2)", borderRadius:50, padding:"1px 7px", fontFamily:"'Fira Code',monospace" }}>in progress</span>}
                </div>
                <p style={{ fontSize: 11, color: "var(--mid)", lineHeight: 1.9, margin:0 }}>{s.items}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* ── Proficiency — 3-col bars ── */}
        <FadeIn delay={120}>
          <p style={{ fontSize: 12, color: "var(--mid)", marginBottom: 20, fontFamily: "'Fira Code',monospace", letterSpacing: "0.04em" }}>PROFICIENCY</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px 48px" }} className="about-prof-grid">
            {SKILLS.map(s => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 12, color: "var(--mid)", fontFamily: "'Fira Code',monospace", width: 88, flexShrink: 0 }}>{s.label}</span>
                <DotRating dots={s.dots} color={dotColor} />
              </div>
            ))}
          </div>
        </FadeIn>

      </section>

      <hr style={{ border: "none", borderTop: divider }} />

      {/* ── WORK ── */}
      <section id="work" style={{ padding: "80px 48px" }} className="work-pad">
        <FadeIn>
          <SectionHeader label="Work" title="Experience" mb={48} />
          {/* Vertical timeline */}
          <div style={{ position:"relative", paddingLeft:32 }}>
            {/* Timeline spine — left:12 centers on the 12px dots (paddingLeft32 - dotLeft26 + dotRadius6) */}
            <div style={{ position:"absolute", left:12, top:16, bottom:16, width:1, background: dark?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)" }} />
            {WORK.map((w, wi) => (
              <FadeIn key={w.id} delay={wi * 100}>
                <div style={{ position:"relative", marginBottom: wi < WORK.length-1 ? 40 : 0 }}>
                  {/* Timeline dot */}
                  <div style={{ position:"absolute", left:-26, top:6, width:12, height:12, borderRadius:"50%", background: wi === 0 ? "#22c55e" : (dark?"#3D3D3D":"#d0d0d0"), border: wi === 0 ? "2px solid #22c55e" : (dark?"2px solid rgba(255,255,255,0.12)":"2px solid rgba(0,0,0,0.12)"), boxShadow: wi === 0 ? "0 0 0 3px rgba(34,197,94,0.15)" : "none", transition:"all 0.3s" }} />
                  {/* Card */}
                  <div onClick={() => setExpandedWork(expandedWork === w.id ? null : w.id)}
                    style={{ background: expandedWork === w.id ? (dark?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.04)") : (dark?"rgba(255,255,255,0.02)":"rgba(0,0,0,0.02)"), border: dark?"1px solid rgba(255,255,255,0.06)":"1px solid rgba(0,0,0,0.06)", borderRadius:14, padding:"18px 20px", cursor:"pointer", transition:"background 0.2s, border-color 0.2s, transform 0.2s", userSelect:"none" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = dark?"rgba(255,255,255,0.12)":"rgba(0,0,0,0.12)"; e.currentTarget.style.transform="translateX(3px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = dark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.06)"; e.currentTarget.style.transform="translateX(0)"; }}>
                    <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12, flexWrap:"wrap" }}>
                      <div>
                        <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap", marginBottom:4 }}>
                          <span style={{ fontWeight:700, fontSize:15, color:"var(--white)", fontFamily:"'Fira Code',monospace" }}>{w.company}</span>
                          <span style={{ fontSize:11, background: dark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.05)", border: dark?"1px solid rgba(255,255,255,0.08)":"1px solid rgba(0,0,0,0.08)", borderRadius:50, padding:"2px 8px", color:"var(--mid)", fontFamily:"'Fira Code',monospace" }}>{w.type}</span>
                          {wi === 0 && <span style={{ fontSize:11, background:"rgba(34,197,94,0.1)", border:"1px solid rgba(34,197,94,0.2)", borderRadius:50, padding:"2px 8px", color:"#22c55e", fontFamily:"'Fira Code',monospace" }}>● Current</span>}
                        </div>
                        <div style={{ fontSize:13, color:"var(--mid)", marginBottom:2 }}>{w.role}</div>
                        <div style={{ fontSize:11, color:"var(--mid)", opacity:0.7 }}>{w.location}</div>
                      </div>
                      <div style={{ display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
                        <div style={{ textAlign:"right" }}>
                          <div style={{ fontFamily:"'Fira Code',monospace", fontSize:11, color:"var(--mid)" }}>{w.date}</div>
                          <div style={{ fontFamily:"'Fira Code',monospace", fontSize:11, color:"var(--mid)", opacity:0.6 }}>→ {w.dur}</div>
                        </div>
                        <div style={{ color:"var(--mid)", transition:"transform 0.3s cubic-bezier(0.22,1,0.36,1)", transform: expandedWork === w.id ? "rotate(180deg)" : "rotate(0deg)" }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6,9 12,15 18,9"/></svg>
                        </div>
                      </div>
                    </div>
                    {expandedWork === w.id && (
                      <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:8, marginTop:16, paddingTop:16, borderTop: dark?"1px solid rgba(255,255,255,0.06)":"1px solid rgba(0,0,0,0.06)" }}>
                        {w.bullets.map((b, bi) => (
                          <li key={bi} style={{ display:"flex", gap:10, alignItems:"flex-start", fontSize:13, color:"var(--mid)", lineHeight:1.7, opacity:0, animation:`fadeSlideUp 0.4s cubic-bezier(0.22,1,0.36,1) ${bi * 60}ms forwards` }}>
                            <span style={{ color:"#22c55e", marginTop:2, flexShrink:0, fontSize:10 }}>▸</span>{b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <div style={{ textAlign:"right", paddingTop:24, marginTop:8 }}>
            <p style={{ fontSize:12, color:"var(--mid)" }}>Corporate experience</p>
            <strong style={{ fontFamily:"'Fira Code',monospace", fontSize:13, color:"var(--white)", fontStyle:"italic" }}>~ 1.5 years</strong>
          </div>
        </FadeIn>
      </section>

      <hr style={{ border: "none", borderTop: divider }} />

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ padding: "80px 48px" }} className="projects-pad">
        <SectionHeader label="Projects" title="Projects" mb={24} />
        {/* Tag filter */}
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:40 }}>
          <button onClick={() => setActiveTag(null)} style={{ background: activeTag === null ? "var(--white)" : "transparent", color: activeTag === null ? "var(--bg)" : "var(--mid)", border: dark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.12)", borderRadius:50, padding:"5px 14px", fontFamily:"'Fira Code',monospace", fontSize:11, cursor:"pointer", transition:"all 0.2s" }}>All</button>
          {[...new Set(PROJECTS.flatMap(p => p.tags))].map(tag => (
            <button key={tag} onClick={() => setActiveTag(activeTag === tag ? null : tag)} style={{ background: activeTag === tag ? "var(--white)" : "transparent", color: activeTag === tag ? "var(--bg)" : "var(--mid)", border: dark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.12)", borderRadius:50, padding:"5px 14px", fontFamily:"'Fira Code',monospace", fontSize:11, cursor:"pointer", transition:"all 0.2s" }}>{tag}</button>
          ))}
        </div>
        {PROJECTS.filter(p => !activeTag || p.tags.includes(activeTag)).map((p, pi) => (
          <FadeIn key={p.id} delay={pi * 60}>
            <div className="project-item-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, padding: "48px 0", borderTop: pi === 0 ? "none" : divider, alignItems: "center", direction: p.rev ? "rtl" : "ltr" }}>
              <div style={{ direction: "ltr" }}>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                  {p.status.map(s => <StatusBadge key={s} type={s} />)}
                </div>
                <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 14 }}>
                  {p.tags.map(t => (
                    <span key={t} onClick={() => setActiveTag(activeTag === t ? null : t)} style={{ background: activeTag === t ? (dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)") : (dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"), border: activeTag === t ? (dark ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(0,0,0,0.2)") : (dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)"), borderRadius: 6, padding: "4px 10px", fontFamily: "'Fira Code',monospace", fontSize: 11, color: activeTag === t ? "var(--white)" : "var(--mid)", cursor:"pointer", transition:"all 0.2s" }}>{t}</span>
                  ))}
                </div>
                <div style={{ fontFamily: "'Fira Code',monospace", fontSize: 22, fontWeight: 700, color: "var(--white)", marginBottom: 12 }}>{p.name}</div>
                {p.desc.map((d, di) => <p key={di} style={{ fontSize: 13, color: "var(--mid)", lineHeight: 1.8, marginBottom: 6 }}>{d}</p>)}
                <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                  {["⌘","↗"].map(ic => (
                    <a key={ic} href="#" style={{ width: 36, height: 36, borderRadius: "50%", border: dark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.12)", background: "transparent", color: "var(--white)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, textDecoration: "none", transition: "background 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.background = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >{ic}</a>
                  ))}
                </div>
              </div>
              <TiltCard dark={dark} style={{ direction:"ltr", borderRadius:16, overflow:"hidden", background: dark?"#1a1a26":"#e8e8f0", aspectRatio:"4/3", display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
                {p.visual === "drift"  && <DriftMiniVisual />}
                {p.visual === "gostat" && <GostatVisual />}
                {p.visual === "kana"   && <KanaVisual />}
                {p.visual === "anime"  && <AnimeVisual />}
                {p.visual === "chat"   && <ChatVisual />}
                {p.visual === "ai"     && <AIVisual />}
                {p.visual === "zoro"   && <ZoroVisual />}
              </TiltCard>
            </div>
          </FadeIn>
        ))}
      </section>

      <hr style={{ border: "none", borderTop: divider }} />

      {/* ── ARTICLES ──
      <section id="articles" style={{ padding: "80px 48px" }} className="articles-pad">
        <SectionHeader label="Articles" title="Articles" mb={48} />
        <div style={{ display: "grid", gridTemplateColumns: "36px 1fr", gap: "0 24px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {ARTICLES_PAGES.map((_, i) => (
              <button key={i} onClick={() => setArticlePage(i)} style={{ width: 28, height: 28, borderRadius: "50%", border: articlePage === i ? "none" : (dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)"), background: articlePage === i ? "var(--white)" : "transparent", color: articlePage === i ? "var(--bg)" : "var(--mid)", fontFamily: "'Fira Code',monospace", fontSize: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>{i + 1}</button>
            ))}
          </div>
          <div className="art-cards-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {articles.map((a, i) => (
              <FadeIn key={`${articlePage}-${i}`} delay={i * 60}>
                <div style={{ background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)", border: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)", borderRadius: 14, padding: 20, transition: "border-color 0.25s, transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s", height: "100%" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.14)"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = dark ? "0 12px 32px rgba(0,0,0,0.35)" : "0 12px 32px rgba(0,0,0,0.07)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
                    <span style={{ fontSize: 24 }}>{a.emoji}</span>
                    <span style={{ fontSize:10, color:"var(--mid)", fontFamily:"'Fira Code',monospace", background: dark?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.04)", border: dark?"1px solid rgba(255,255,255,0.06)":"1px solid rgba(0,0,0,0.06)", borderRadius:50, padding:"2px 8px" }}>{Math.max(3, Math.ceil(a.desc.split(" ").length / 40 * 5))} min read</span>
                  </div>
                  <h4 style={{ fontFamily: "'Fira Code',monospace", fontSize: 13, fontWeight: 600, color: "var(--white)", marginBottom: 10, lineHeight: 1.5 }}>{a.title}</h4>
                  <p style={{ fontSize: 12, color: "var(--mid)", lineHeight: 1.7, marginBottom: 16 }}>{a.desc}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <a href={a.link || "#"} target={a.link ? "_blank" : undefined} rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "var(--white)", color: "var(--bg)", borderRadius: 50, padding: "7px 16px", fontSize: 12, fontWeight: 600, textDecoration: "none", transition: "opacity 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                      onMouseLeave={e => e.currentTarget.style.opacity = "1"}>Read more</a>
                    <a href={a.link || "#"} target={a.link ? "_blank" : undefined} rel="noreferrer" style={{ width: 28, height: 28, borderRadius: "50%", border: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)", background: "transparent", color: "var(--white)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, textDecoration: "none" }}>→</a>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section> */}

      {/* ── FOOTER / CONTACT ── */}
      <footer id="contact" style={{ borderTop: divider, padding: "64px 48px 40px" }} className="footer-pad">
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
          {/* Left */}
          <FadeIn>
            <div style={{ fontFamily: "'Fira Code',monospace", fontSize: 12, color: "var(--mid)", marginBottom: 16 }}>... /Contacts ...</div>
            <div className="contact-name-size" style={{ fontFamily: "'Fira Code',monospace", fontSize: "clamp(36px,5vw,60px)", fontWeight: 700, color: "var(--white)", lineHeight: 1 }}>Raghul<br />Prasanth</div>
            <div style={{ fontSize: 12, color: "var(--mid)", marginTop: 8, marginBottom: 20 }}>Full-Stack Developer · UI/UX Designer</div>
            {/* Social icon buttons */}
            <div style={{ display: "flex", gap: 10, marginBottom: 32, flexWrap: "wrap" }}>
              {[
                { icon: <GithubIcon />,    label: "Github",    href: "https://github.com/Raghul-18" },
                { icon: <LinkedInIcon />,  label: "LinkedIn",  href: "https://www.linkedin.com/in/raghul-prasanth/" },
                { icon: <EmailIcon />,     label: "E-mail",    href: "mailto:raghul.18sp@gmail.com" },
                { icon: <InstagramIcon />, label: "Instagram", href: "https://www.instagram.com/rag.hul._/" },
              ].map(s => (
                <a key={s.label} href={s.href}
                  title={s.label}
                  style={{ width: 38, height: 38, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)", border: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)", color: "var(--mid)", textDecoration: "none", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"; e.currentTarget.style.color = "var(--white)"; e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"; e.currentTarget.style.color = "var(--mid)"; e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"; }}
                >{s.icon}</a>
              ))}
            </div>
            {/* Timezone + availability */}
            <div style={{ marginBottom:24, display:"flex", flexDirection:"column", gap:8 }}>
              <TimezoneWidget dark={dark} />
            </div>
            <ContactForm dark={dark} />
          </FadeIn>
          {/* Right */}
          <FadeIn delay={100}>
            <nav style={{ display: "flex", gap: 22, marginBottom: 28, flexWrap: "wrap", background: "none", padding: 0, border: "none", backdropFilter: "none" }}>
              {navLinks.map(l => (
                <button key={l.id} onClick={() => scrollTo(l.id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "var(--mid)", fontFamily: "'Open Sans',sans-serif", transition: "color 0.2s", padding: 0 }}
                  onMouseEnter={e => e.currentTarget.style.color = "var(--white)"}
                  onMouseLeave={e => e.currentTarget.style.color = "var(--mid)"}>{l.label}</button>
              ))}
            </nav>
            <p style={{ fontSize: 11, color: "var(--mid)", fontFamily: "'Fira Code',monospace", letterSpacing: "0.06em", marginBottom: 12 }}>AVAILABILITY</p>
            <div className="footer-avail-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 28 }}>
              {[
                { label: "Freelance Projects", color: "#22c55e", bg: "rgba(34,197,94,0.08)",  border: "rgba(34,197,94,0.2)" },
                { label: "Consulting",         color: "#3b82f6", bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.2)" },
                { label: "Full-time Roles",    color: "#a855f7", bg: "rgba(168,85,247,0.08)", border: "rgba(168,85,247,0.2)" },
                { label: "Remote Work",        color: "#f97316", bg: "rgba(249,115,22,0.08)", border: "rgba(249,115,22,0.2)" },
              ].map(av => (
                <button key={av.label} onClick={() => scrollTo("contact")} style={{ display: "flex", alignItems: "center", gap: 8, background: av.bg, border: `1px solid ${av.border}`, borderRadius: 10, padding: "10px 14px", fontSize: 12, color: av.color, cursor: "pointer", fontFamily: "'Open Sans',sans-serif", transition: "opacity 0.2s", textAlign: "left" }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.75"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: av.color, flexShrink: 0, animation: "pulse 2s infinite" }} />
                  {av.label}
                </button>
              ))}
            </div>
            <div style={{ display:"flex", gap:10, flexWrap:"wrap", alignItems:"center" }}>
              <a href={RESUME_LINK} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", border: dark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.12)", borderRadius: 50, padding: "10px 20px", fontSize: 13, color: "var(--mid)", textDecoration: "none", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.color = "var(--white)"; e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "var(--mid)"; e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"; }}>
                <DownloadIcon /> Download Resume
              </a>
              <span style={{ fontSize:11, color:"var(--mid)", fontFamily:"'Fira Code',monospace", display:"flex", alignItems:"center", gap:5 }}>
                <span style={{ width:5, height:5, borderRadius:"50%", background:"#22c55e", animation:"pulse 2s infinite" }} />
                Usually responds within 24hrs
              </span>
            </div>

            {/* Cycling quote */}
            <FooterQuote dark={dark} />

            {/* Mini dino preview card */}
            <div
              onClick={() => setDinoOpen(true)}
              style={{
                marginTop: 16, cursor: "pointer", borderRadius: 16, overflow: "hidden",
                border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
                background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                transition: "border-color 0.25s, transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.18)"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = dark ? "0 12px 32px rgba(0,0,0,0.4)" : "0 12px 32px rgba(0,0,0,0.07)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
            >
              {/* Mini canvas preview */}
              <DinoMiniPreview dark={dark} />
              {/* Card footer */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", borderTop: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 16 }}>🦕</span>
                  <div>
                    <div style={{ fontFamily: "'Fira Code',monospace", fontSize: 12, fontWeight: 600, color: "var(--white)" }}>Dino Run</div>
                    <div style={{ fontSize: 11, color: "var(--mid)" }}>Easter egg — click to play</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)", borderRadius: 50, padding: "5px 12px", fontSize: 12, color: "var(--mid)", fontFamily: "'Fira Code',monospace" }}>
                  Play ↗
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: divider, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 12, color: "var(--mid)", fontFamily: "'Open Sans',sans-serif" }}>
            Made in React with ❤️ by <span style={{ color: "var(--white)", fontWeight: 600 }}>Raghul Prasanth S P</span>
          </span>
          <span style={{ fontSize: 12, color: "var(--mid)", fontFamily: "'Open Sans',sans-serif" }}>
            © {new Date().getFullYear()} Raghul Prasanth S P. All rights reserved.
          </span>
        </div>
      </footer>

      {/* ── SCROLL TO TOP ── */}
      {showScrollTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ position: "fixed", bottom: 32, right: 86, zIndex: 99, width: 44, height: 44, borderRadius: "50%", background: dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)", border: dark ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(0,0,0,0.12)", color: "var(--white)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)", animation: "fadeSlide 0.3s ease" }}
          onMouseEnter={e => e.currentTarget.style.background = dark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.15)"}
          onMouseLeave={e => e.currentTarget.style.background = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}>
          <ChevronUp />
        </button>
      )}

      {/* ── DINO PEEK BUTTON ── */}
      <button
        onClick={() => setDinoOpen(true)}
        title="Play Dino Game"
        style={{ position: "fixed", bottom: 32, right: 32, zIndex: 99, width: 44, height: 44, borderRadius: "50%", background: dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)", border: dark ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(0,0,0,0.12)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)", fontSize: 20, transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1), background 0.2s", animation: "fadeSlide 0.3s ease" }}
        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.2) rotate(-10deg)"; e.currentTarget.style.background = dark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.15)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1) rotate(0deg)"; e.currentTarget.style.background = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"; }}>
        🦕
      </button>

      {/* ── DINO GAME MODAL ── */}
      {dinoOpen && <DinoModal onClose={() => setDinoOpen(false)} dark={dark} />}
    </div>
  );
}// INSERTION_POINT