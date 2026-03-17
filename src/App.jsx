import { useState, useEffect, useRef } from "react";

/* ─── GOOGLE FONTS ─── */
const FontLink = () => (
  <style>{`@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,400;1,600&display=swap');`}</style>
);

/* ─── DATA ─── */
const ROLES = ["Full-Stack Developer", "UI/UX Designer"];

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
    visual: "chat",
    visual: "kana", rev: true,
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
];

const STATUS_CONFIG = {
  live:       { label: "Live",           dot: "#22c55e", bg: "rgba(34,197,94,0.12)",  border: "rgba(34,197,94,0.25)" },
  opensource: { label: "Open Source",    dot: "#3b82f6", bg: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.25)" },
  indev:      { label: "In Development", dot: "#eab308", bg: "rgba(234,179,8,0.12)",  border: "rgba(234,179,8,0.25)" },
  private:    { label: "Private",        dot: "#a855f7", bg: "rgba(168,85,247,0.12)", border: "rgba(168,85,247,0.25)" },
};

const SKILLS = [
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
  { title: "Backend",    items: "Golang · Node.js · Gin · REST APIs · Microservices · WebSockets" },
  { title: "Frontend",   items: "React · NextJs · ReactNative · TypeScript · Tailwind CSS" },
  { title: "Cloud & DB", items: "OCI · Oracle VBCS · PostgreSQL · Redis · MongoDB" },
  { title: "Design",     items: "Figma · Adobe XD · Prototyping · Wireframing · UI/UX" },
  { title: "DevOps",     items: "Docker · Git · JIRA · Kafka · CI/CD · Linux" },
];

const ARTICLES_PAGES = [
  [
    { title: "Building a Real-Time Kafka + Golang Microservice Pipeline", desc: "A hands-on guide to implementing a production-grade event-driven architecture using Apache Kafka, Golang, and Docker Compose from scratch.", emoji: "🦊" },
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
  { title: "Kafka + Golang Microservice Pipeline", desc: "Building a real-time event-driven architecture using Apache Kafka, Golang, and Docker from scratch.", emoji: "🦊" },
  { title: "Dockerizing a Full-Stack App: Beyond the Basics", desc: "Multi-stage builds, secrets management, and orchestration patterns for real-world apps.", emoji: "🐳" },
  { title: "React Patterns You Should Know in 2025", desc: "Compound components, render props, and custom hooks reshaping React architecture.", emoji: "⚛️" },
];

const RESUME_LINK = "https://drive.google.com/file/d/119aWs2pg2xOLRaC2MV-uAVG8rILT1D4a/view?usp=drive_link";

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
const EmailIcon    = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const TelegramIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>;
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

/* ─── DOT RATING ─── */
function DotRating({ dots, max = 5, color }) {
  const [ref, visible] = useFadeIn();
  return (
    <span ref={ref} style={{ display: "inline-flex", gap: 4, alignItems: "center" }}>
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} style={{
          width: 7, height: 7, borderRadius: "50%",
          background: i < dots ? color : "rgba(166,166,166,0.2)",
          display: "inline-block",
          transform: visible ? "scale(1)" : "scale(0)",
          transition: `transform 0.4s cubic-bezier(0.34,1.56,0.64,1) ${i * 60}ms`,
        }} />
      ))}
    </span>
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

/* ─── HERO CAROUSEL ─── */
function HeroCarousel({ dark, heroSlide, setHeroSlide }) {
  const trackRef   = useRef(null);
  const dragRef    = useRef({ dragging: false, startX: 0, startSlide: 0 });

  /* Card dimensions */
  const CARD_W   = 300;
  const CARD_GAP = 20;
  const STEP     = CARD_W + CARD_GAP;

  /* Compute translate so active card is always centred in the viewport */
  function getTranslate(slide, viewW) {
    const center = viewW / 2;
    return center - (slide * STEP + CARD_W / 2);
  }

  /* ── pointer / touch helpers ── */
  function onDragStart(clientX) {
    dragRef.current = { dragging: true, startX: clientX, startSlide: heroSlide };
  }
  function onDragEnd(clientX) {
    if (!dragRef.current.dragging) return;
    dragRef.current.dragging = false;
    const dx = clientX - dragRef.current.startX;
    if (Math.abs(dx) > 40) {
      const dir = dx < 0 ? 1 : -1;
      setHeroSlide(s => Math.max(0, Math.min(HERO_ARTICLES.length - 1, s + dir)));
    }
  }

  /* mouse */
  const onMouseDown = e => onDragStart(e.clientX);
  const onMouseUp   = e => onDragEnd(e.clientX);
  /* touch */
  const onTouchStart = e => onDragStart(e.touches[0].clientX);
  const onTouchEnd   = e => onDragEnd(e.changedTouches[0].clientX);

  const [viewW, setViewW] = useState(800);
  const wrapRef = useRef(null);
  useEffect(() => {
    if (!wrapRef.current) return;
    const ro = new ResizeObserver(([e]) => setViewW(e.contentRect.width));
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  const translate = getTranslate(heroSlide, viewW);

  return (
    <div style={{ marginTop: 40 }}>
      {/* Overflow hidden viewport */}
      <div
        ref={wrapRef}
        style={{ overflow: "hidden", cursor: "grab", userSelect: "none", WebkitUserSelect: "none" }}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={e => { if (dragRef.current.dragging) onDragEnd(e.clientX); }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Sliding track */}
        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: CARD_GAP,
            transform: `translateX(${translate}px)`,
            transition: "transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)",
            willChange: "transform",
            paddingBottom: 4,
          }}
        >
          {HERO_ARTICLES.map((a, i) => {
            const active = i === heroSlide;
            return (
              <div
                key={i}
                onClick={() => setHeroSlide(i)}
                style={{
                  flex: `0 0 ${CARD_W}px`,
                  background: active
                    ? (dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)")
                    : (dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)"),
                  border: active
                    ? (dark ? "1px solid rgba(255,255,255,0.14)" : "1px solid rgba(0,0,0,0.16)")
                    : (dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)"),
                  borderRadius: 16,
                  overflow: "hidden",
                  opacity: active ? 1 : 0.38,
                  transform: active ? "scale(1.04)" : "scale(0.96)",
                  transition: "opacity 0.4s, transform 0.4s, border-color 0.3s, background 0.3s",
                  cursor: active ? "default" : "pointer",
                  pointerEvents: "auto",
                }}
              >
                <div style={{ width: "100%", height: 130, background: "linear-gradient(135deg,#2a2a3a,#3a2a4a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>
                  {a.emoji}
                </div>
                <div style={{ padding: 16 }}>
                  <h4 style={{ fontFamily: "'Fira Code',monospace", fontSize: 13, fontWeight: 600, color: "var(--white)", marginBottom: 8, lineHeight: 1.4 }}>{a.title}</h4>
                  <p style={{ fontSize: 12, color: "var(--mid)", lineHeight: 1.6, marginBottom: 14 }}>{a.desc}</p>
                  <a href="#" onClick={e => e.stopPropagation()} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--white)", color: "var(--bg)", borderRadius: 50, padding: "7px 16px", fontSize: 12, fontWeight: 600, textDecoration: "none" }}>Read more</a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 16 }}>
        <button
          onClick={() => setHeroSlide(s => Math.max(0, s - 1))}
          disabled={heroSlide === 0}
          style={{ width: 34, height: 34, borderRadius: "50%", border: dark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.12)", background: "transparent", color: heroSlide === 0 ? "var(--dark)" : "var(--white)", cursor: heroSlide === 0 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, transition: "color 0.2s", opacity: heroSlide === 0 ? 0.35 : 1 }}>←</button>
        <button
          onClick={() => setHeroSlide(s => Math.min(HERO_ARTICLES.length - 1, s + 1))}
          disabled={heroSlide === HERO_ARTICLES.length - 1}
          style={{ width: 34, height: 34, borderRadius: "50%", border: dark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.12)", background: "transparent", color: heroSlide === HERO_ARTICLES.length - 1 ? "var(--dark)" : "var(--white)", cursor: heroSlide === HERO_ARTICLES.length - 1 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, transition: "color 0.2s", opacity: heroSlide === HERO_ARTICLES.length - 1 ? 0.35 : 1 }}>→</button>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {HERO_ARTICLES.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroSlide(i)}
              style={{
                width: i === heroSlide ? 18 : 6,
                height: 6,
                borderRadius: 3,
                border: "none",
                cursor: "pointer",
                background: i === heroSlide ? "var(--white)" : "var(--dark)",
                padding: 0,
                transition: "all 0.3s cubic-bezier(0.25,0.46,0.45,0.94)",
              }}
            />
          ))}
        </div>
      </div>
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
      hi:       0,
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
            if (state.score > state.hi) state.hi = state.score;
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
function ContactForm({ dark }) {
  const [form, setForm]   = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");
  const bg = dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)";
  const border = dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.1)";
  const color = dark ? "#f5f5f5" : "#121212";
  const ph = dark ? "#a6a6a6" : "#888";
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      // ─────────────────────────────────────────────────────
      // EMAILJS SETUP — replace these 3 values:
      // 1. Sign up free at https://www.emailjs.com
      // 2. Add Email Service (Gmail etc.) → copy Service ID
      // 3. Create Template using {{from_name}}, {{from_email}}, {{subject}}, {{message}} → copy Template ID
      // 4. Account → API Keys → copy Public Key
      const SERVICE_ID  = "YOUR_SERVICE_ID";
      const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
      const PUBLIC_KEY  = "YOUR_PUBLIC_KEY";
      // ─────────────────────────────────────────────────────
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service_id: SERVICE_ID, template_id: TEMPLATE_ID, user_id: PUBLIC_KEY,
          template_params: { from_name: form.name, from_email: form.email, subject: form.subject, message: form.message } }),
      });
      if (res.ok) { setStatus("success"); setForm({ name: "", email: "", subject: "", message: "" }); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };
  const inp = { width: "100%", background: bg, border, borderRadius: 10, padding: "12px 14px", color, fontSize: 13, fontFamily: "'Open Sans',sans-serif", outline: "none", transition: "border-color 0.2s", boxSizing: "border-box" };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <style>{`.ci::placeholder{color:${ph}}.ci:focus{border-color:rgba(255,255,255,0.25)!important}`}</style>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="contact-form-grid">
        <input className="ci" style={inp} name="name" placeholder="Your name" value={form.name} onChange={handleChange} />
        <input className="ci" style={inp} name="email" placeholder="your@email.com" value={form.email} onChange={handleChange} />
      </div>
      <input className="ci" style={inp} name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} />
      <textarea className="ci" style={{ ...inp, minHeight: 120, resize: "vertical" }} name="message" placeholder="Your message..." value={form.message} onChange={handleChange} />
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <button onClick={handleSubmit} disabled={status === "sending"} style={{ background: dark ? "#fff" : "#121212", color: dark ? "#121212" : "#fff", border: "none", borderRadius: 50, padding: "11px 26px", fontFamily: "'Open Sans',sans-serif", fontWeight: 600, fontSize: 13, cursor: "pointer", opacity: status === "sending" ? 0.6 : 1 }}>
          {status === "sending" ? "Sending…" : "Send Message →"}
        </button>
        {status === "success" && <span style={{ fontSize: 12, color: "#22c55e" }}>✓ Message sent!</span>}
        {status === "error"   && <span style={{ fontSize: 12, color: "#e06c75" }}>Something went wrong. Try again.</span>}
      </div>
    </div>
  );
}

/* ─── HERO COLOR PAIRS ─── */
// [word1Color, word2Color] for dark mode; [word1Light, word2Light] for light mode
const HERO_COLOR_PAIRS = [
  { dark: ["#ffffff", "#a78bfa"], light: ["#121212", "#7c3aed"] }, // White / Violet
  { dark: ["#f9a8d4", "#ffffff"], light: ["#be185d", "#121212"] }, // Pink / White
  { dark: ["#7dd3fc", "#fb923c"], light: ["#0284c7", "#ea580c"] }, // Sky / Orange
  { dark: ["#86efac", "#ffffff"], light: ["#16a34a", "#121212"] }, // Green / White
  { dark: ["#ffffff", "#f9a8d4"], light: ["#121212", "#be185d"] }, // White / Pink
  { dark: ["#fb923c", "#7dd3fc"], light: ["#ea580c", "#0284c7"] }, // Orange / Sky
  { dark: ["#a78bfa", "#86efac"], light: ["#7c3aed", "#16a34a"] }, // Violet / Green
  { dark: ["#fde047", "#ffffff"], light: ["#ca8a04", "#121212"] }, // Yellow / White
];

/* ─── HERO TITLE (independent per-word colour cycles) ─── */
function HeroTitle({ dark, roleIdx, roleVisible }) {
  const [c1, setC1] = useState(0); // word-1 colour index
  const [c2, setC2] = useState(3); // word-2 colour index (start offset)

  useEffect(() => {
    const t1 = setInterval(() => setC1(i => (i + 1) % HERO_COLOR_PAIRS.length), 2400);
    return () => clearInterval(t1);
  }, []);

  useEffect(() => {
    // Stagger word-2 by 1.2 s, different cadence
    let t2;
    const delay = setTimeout(() => {
      t2 = setInterval(() => setC2(i => (i + 1) % HERO_COLOR_PAIRS.length), 3100);
    }, 1200);
    return () => { clearTimeout(delay); clearInterval(t2); };
  }, []);

  const pair1 = HERO_COLOR_PAIRS[c1];
  const pair2 = HERO_COLOR_PAIRS[c2];
  const col1  = dark ? pair1.dark[0] : pair1.light[0];
  const col2  = dark ? pair2.dark[1] : pair2.light[1];

  const words = ROLES[roleIdx].split(" ");
  const word1 = words[0];
  const word2 = words.slice(1).join(" ");

  const titleStyle = {
    fontFamily: "'Fira Code',monospace",
    fontSize: "clamp(52px,8vw,96px)",
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: "-0.02em",
    transition: "color 0.55s cubic-bezier(0.22,1,0.36,1), opacity 0.4s cubic-bezier(0.22,1,0.36,1), transform 0.4s cubic-bezier(0.22,1,0.36,1)",
    opacity: roleVisible ? 1 : 0,
    transform: roleVisible ? "none" : "translateY(8px)",
  };

  return (
    <>
      {/* Word 1 row */}
      <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap", opacity: 0, animation: "fadeSlideUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s forwards", position: "relative" }}>
        <span className="hero-title-size" style={{ ...titleStyle, color: col1 }}>{word1}</span>
        <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
          style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--white)", color: "var(--bg)", border: "none", borderRadius: 50, padding: "12px 24px", fontFamily: "'Open Sans',sans-serif", fontSize: 14, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", transition: "transform 0.2s, box-shadow 0.2s", backgroundImage: "linear-gradient(120deg, transparent 0%, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%, transparent 100%)", backgroundSize: "200% auto", animation: "shimmer 3s linear infinite" }}
          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
          Projects <span style={{ width: 28, height: 28, background: "var(--bg)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>→</span>
        </button>
      </div>
      {/* Word 2 row */}
      <div style={{ opacity: 0, animation: "fadeSlideUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.3s both", position: "relative" }}>
        <span className="hero-title-size" style={{ ...titleStyle, display: "block", textAlign: "right", color: col2 }}>{word2}</span>
      </div>
    </>
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
  const [lang, setLang]               = useState("En");
  const [roleIdx, setRoleIdx]         = useState(0);
  const [roleVisible, setRoleVisible] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [dinoOpen, setDinoOpen]           = useState(false);

  const theme = dark
    ? { "--black":"#121212","--dark":"#3D3D3D","--mid":"#A6A6A6","--light":"#F5F5F5","--white":"#ffffff","--bg":"#121212","--text":"#F5F5F5" }
    : { "--black":"#f5f5f5","--dark":"#d0d0d0","--mid":"#666","--light":"#1a1a1a","--white":"#121212","--bg":"#f0f0f0","--text":"#121212" };

  /* Role typing cycle */
  useEffect(() => {
    const t = setInterval(() => {
      setRoleVisible(false);
      setTimeout(() => { setRoleIdx(i => (i + 1) % ROLES.length); setRoleVisible(true); }, 400);
    }, 3000);
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
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
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
        .section-hr{border:none;border-top:1px solid rgba(128,128,128,0.08)}
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
          .work-row-grid{grid-template-columns:80px 1fr auto!important}
          .work-expanded-pad{padding-left:80px!important}
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 48px", background: dark ? "rgba(18,18,18,0.9)" : "rgba(240,240,240,0.9)", backdropFilter: "blur(12px)", borderBottom: divider }}>
        <div style={{ fontFamily: "'Fira Code',monospace", fontWeight: 600, fontSize: 15, color: "var(--white)", lineHeight: 1.3 }}>
          Raghul Prasanth
          <span style={{ display: "block", fontWeight: 300, color: "var(--mid)", fontSize: 11 }}>Full-Stack Developer · UI/UX Designer</span>
        </div>
        <ul className="nav-links-desktop" style={{ display: "flex", gap: 36, listStyle: "none" }}>
          {navLinks.map(l => (
            <li key={l.id} style={{ position: "relative" }}>
              <button onClick={() => scrollTo(l.id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: activeSection === l.id ? "var(--white)" : "var(--mid)", fontFamily: "'Open Sans',sans-serif", transition: "color 0.2s", padding: "4px 0" }}>{l.label}</button>
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
      <section id="hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "120px 48px 60px", position: "relative", overflow: "hidden" }} className="hero-pad">
        <div style={{ position: "absolute", top: 80, right: -80, width: 420, height: 420, border: dark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.05)", borderRadius: "50%", pointerEvents: "none", animation: "floatA 9s ease-in-out infinite" }} />
        <div style={{ position: "absolute", top: 220, right: 80, width: 180, height: 180, border: dark ? "1px solid rgba(255,255,255,0.03)" : "1px solid rgba(0,0,0,0.03)", borderRadius: "50%", pointerEvents: "none", animation: "floatB 7s ease-in-out infinite" }} />
        <div style={{ position: "absolute", top: 300, right: -20, width: 80, height: 80, border: dark ? "1px solid rgba(255,255,255,0.04)" : "1px solid rgba(0,0,0,0.04)", borderRadius: "50%", pointerEvents: "none", animation: "floatA 11s ease-in-out infinite 2s" }} />
        <div style={{ fontFamily: "'Fira Code',monospace", fontSize: 12, color: "var(--mid)", marginBottom: 8, letterSpacing: "0.05em", opacity: 0, animation: "fadeSlideUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s forwards" }}>... /Main ...</div>
        <HeroTitle dark={dark} roleIdx={roleIdx} roleVisible={roleVisible} />
        <p style={{ marginTop: 20, maxWidth: 340, fontSize: 13, color: "var(--mid)", lineHeight: 1.8, opacity: 0, animation: "fadeSlideUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.45s forwards" }}>
          My goal is to write <em style={{ fontStyle: "italic", color: "var(--light)" }}>maintainable, clean</em> and <em style={{ fontStyle: "italic", color: "var(--light)" }}>understandable code</em> while crafting <em style={{ fontStyle: "italic", color: "var(--light)" }}>delightful user experiences</em>.
        </p>
        <div style={{ display: "flex", gap: 10, marginTop: 36, flexWrap: "wrap", opacity: 0, animation: "fadeSlideUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.55s forwards" }}>
          {[{ icon: <GithubIcon />, label: "Github" }, { icon: <LinkedInIcon />, label: "LinkedIn" }, { icon: <TelegramIcon />, label: "Telegram" }, { icon: <EmailIcon />, label: "E-mail" }].map(s => (
            <a key={s.label} href="#" style={{ display: "flex", alignItems: "center", gap: 7, background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)", border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)", borderRadius: 50, padding: "8px 16px", fontSize: 12, color: "var(--light)", textDecoration: "none", transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = dark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.09)"}
              onMouseLeave={e => e.currentTarget.style.background = dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"}
            >{s.icon}{s.label}</a>
          ))}
        </div>
        {/* Hero carousel — centered active card, swipeable */}
        <HeroCarousel dark={dark} heroSlide={heroSlide} setHeroSlide={setHeroSlide} />
      </section>

      <hr style={{ border: "none", borderTop: divider }} />

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "80px 48px" }} className="about-pad">
        <SectionHeader label="About" title="About" mb={40} />
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <FadeIn>
            <p style={{ fontSize: 15, color: "var(--light)", lineHeight: 1.9 }}>
              I'm <em style={{ fontStyle: "italic", fontWeight: 600, color: "var(--white)" }}>Raghul Prasanth</em>, a <em style={{ fontStyle: "italic", fontWeight: 600, color: "var(--white)" }}>Full-Stack Developer & UI/UX Designer</em> based in Chennai, India. I build scalable cloud-native applications and craft delightful, user-centred interfaces — bridging the gap between engineering and design.
            </p>
            <p style={{ fontSize: 12, color: "var(--mid)", maxWidth: 300, lineHeight: 1.7, margin: "32px 0 14px" }}>
              My <em style={{ color: "var(--light)", fontStyle: "italic" }}>core stack</em> spans backend, frontend, cloud infrastructure, and design.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 32 }}>
              {SKILL_CARDS.map(s => (
                <div key={s.title}
                  style={{ background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)", border: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)", borderRadius: 14, padding: 16, transition: "border-color 0.25s, background 0.25s, transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.14)"; e.currentTarget.style.background = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = dark ? "0 8px 24px rgba(0,0,0,0.4)" : "0 8px 24px rgba(0,0,0,0.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"; e.currentTarget.style.background = dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                  <h4 style={{ fontFamily: "'Fira Code',monospace", fontSize: 12, fontWeight: 600, color: "var(--white)", marginBottom: 7 }}>{s.title}</h4>
                  <p style={{ fontSize: 11, color: "var(--mid)", lineHeight: 1.9 }}>{s.items}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 12, color: "var(--mid)", marginBottom: 14, fontFamily: "'Fira Code',monospace", letterSpacing: "0.04em" }}>PROFICIENCY</p>
            <div className="skills-grid-resp" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 32px" }}>
              {SKILLS.map(s => (
                <div key={s.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                  <span style={{ fontSize: 12, color: "var(--mid)", fontFamily: "'Fira Code',monospace" }}>{s.label}</span>
                  <DotRating dots={s.dots} color={dotColor} />
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", padding: "20px 0" }}>
              <img src="/photo.jpeg" alt="Raghul Prasanth"
                style={{ width: "100%", maxWidth: 280, aspectRatio: "3/4", objectFit: "cover", borderRadius: 16, display: "block" }}
                onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
              <div style={{ display: "none", width: "100%", maxWidth: 280, aspectRatio: "3/4", background: dark ? "linear-gradient(160deg,#222,#181818)" : "linear-gradient(160deg,#ddd,#e8e8e8)", borderRadius: 16, alignItems: "center", justifyContent: "center", color: "var(--dark)", fontSize: 13, fontFamily: "'Fira Code',monospace" }}>[ photo ]</div>
            </div>
          </FadeIn>
        </div>
      </section>

      <hr style={{ border: "none", borderTop: divider }} />

      {/* ── WORK ── */}
      <section id="work" style={{ padding: "80px 48px" }} className="work-pad">
        <FadeIn>
          <SectionHeader label="Work" title="Experience" mb={32} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            {WORK.map((w, wi) => (
              <FadeIn key={w.id} delay={wi * 80}>
              <div style={{ borderTop: divider }}>
                <div className="work-row-grid"
                  onClick={() => setExpandedWork(expandedWork === w.id ? null : w.id)}
                  style={{ display: "grid", gridTemplateColumns: "110px 1fr auto", gap: "0 20px", alignItems: "center", padding: "22px 12px", cursor: "pointer", borderRadius: 8, transition: "background 0.2s", background: expandedWork === w.id ? (dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)") : "transparent" }}
                  onMouseEnter={e => { if (expandedWork !== w.id) e.currentTarget.style.background = dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)"; }}
                  onMouseLeave={e => { if (expandedWork !== w.id) e.currentTarget.style.background = "transparent"; }}>
                  <div style={{ fontFamily: "'Fira Code',monospace", fontSize: 11, color: "var(--mid)" }}>
                    <div>{w.date}</div><div style={{ opacity: 0.7 }}>{w.dur}</div>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 12px" }}>
                    <span style={{ fontWeight: 700, fontSize: 15, color: "var(--white)", fontFamily: "'Fira Code',monospace" }}>{w.company}</span>
                    <span style={{ fontSize: 12, color: "var(--mid)" }}>·</span>
                    <span style={{ fontSize: 13, color: "var(--mid)" }}>{w.role}</span>
                    <span style={{ fontSize: 12, color: "var(--mid)" }}>·</span>
                    <span style={{ fontSize: 12, color: "var(--mid)" }}>{w.location}</span>
                    <span style={{ fontSize: 11, background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)", border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)", borderRadius: 50, padding: "2px 8px", color: "var(--mid)", fontFamily: "'Fira Code',monospace" }}>{w.type}</span>
                  </div>
                  <div style={{ color: "var(--mid)", transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)", transform: expandedWork === w.id ? "rotate(180deg)" : "rotate(0deg)", display: "flex" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6,9 12,15 18,9"/></svg>
                  </div>
                </div>
                {expandedWork === w.id && (
                  <div className="work-expanded-pad" style={{ padding: "0 12px 20px 130px", animation: "fadeSlideUp 0.35s cubic-bezier(0.22,1,0.36,1)" }}>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                      {w.bullets.map((b, bi) => (
                        <li key={bi} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, color: "var(--mid)", lineHeight: 1.7, opacity: 0, animation: `fadeSlideUp 0.4s cubic-bezier(0.22,1,0.36,1) ${bi * 60}ms forwards` }}>
                          <span style={{ color: dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)", marginTop: 2, flexShrink: 0 }}>▸</span>{b}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              </FadeIn>
            ))}
          </div>
          <div style={{ textAlign: "right", paddingTop: 16 }}>
            <p style={{ fontSize: 12, color: "var(--mid)" }}>Total experience</p>
            <strong style={{ fontFamily: "'Fira Code',monospace", fontSize: 13, color: "var(--white)", fontStyle: "italic" }}>~ 1.5 years</strong>
          </div>
        </FadeIn>
      </section>

      <hr style={{ border: "none", borderTop: divider }} />

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ padding: "80px 48px" }} className="projects-pad">
        <SectionHeader label="Projects" title="Projects" mb={48} />
        {PROJECTS.map((p, pi) => (
          <FadeIn key={p.id} delay={pi * 60}>
            <div className="project-item-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, padding: "48px 0", borderTop: pi === 0 ? "none" : divider, alignItems: "center", direction: p.rev ? "rtl" : "ltr" }}>
              <div style={{ direction: "ltr" }}>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                  {p.status.map(s => <StatusBadge key={s} type={s} />)}
                </div>
                <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 14 }}>
                  {p.tags.map(t => <span key={t} style={{ background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)", border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)", borderRadius: 6, padding: "4px 10px", fontFamily: "'Fira Code',monospace", fontSize: 11, color: "var(--mid)" }}>{t}</span>)}
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
              <div style={{ direction: "ltr", borderRadius: 16, overflow: "hidden", background: dark ? "#1a1a26" : "#e8e8f0", aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px) scale(1.01)"; e.currentTarget.style.boxShadow = dark ? "0 20px 48px rgba(0,0,0,0.5)" : "0 20px 48px rgba(0,0,0,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                {p.visual === "gostat" && <GostatVisual />}
                {p.visual === "kana"   && <KanaVisual />}
                {p.visual === "anime"  && <AnimeVisual />}
                {p.visual === "chat"   && <ChatVisual />}
                {p.visual === "ai"     && <AIVisual />}
              </div>
            </div>
          </FadeIn>
        ))}
      </section>

      <hr style={{ border: "none", borderTop: divider }} />

      {/* ── ARTICLES ── */}
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
                  <div style={{ fontSize: 24, marginBottom: 10 }}>{a.emoji}</div>
                  <h4 style={{ fontFamily: "'Fira Code',monospace", fontSize: 13, fontWeight: 600, color: "var(--white)", marginBottom: 10, lineHeight: 1.5 }}>{a.title}</h4>
                  <p style={{ fontSize: 12, color: "var(--mid)", lineHeight: 1.7, marginBottom: 16 }}>{a.desc}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "var(--white)", color: "var(--bg)", borderRadius: 50, padding: "7px 16px", fontSize: 12, fontWeight: 600, textDecoration: "none", transition: "opacity 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                      onMouseLeave={e => e.currentTarget.style.opacity = "1"}>Read more</a>
                    <button style={{ width: 28, height: 28, borderRadius: "50%", border: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)", background: "transparent", color: "var(--white)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>→</button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

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
                { icon: <GithubIcon />,   label: "Github",   href: "#" },
                { icon: <LinkedInIcon />, label: "LinkedIn", href: "#" },
                { icon: <EmailIcon />,    label: "E-mail",   href: "#" },
                { icon: <TelegramIcon />, label: "Telegram", href: "#" },
              ].map(s => (
                <a key={s.label} href={s.href}
                  title={s.label}
                  style={{ width: 38, height: 38, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)", border: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)", color: "var(--mid)", textDecoration: "none", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"; e.currentTarget.style.color = "var(--white)"; e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"; e.currentTarget.style.color = "var(--mid)"; e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"; }}
                >{s.icon}</a>
              ))}
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
            <a href={RESUME_LINK} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", border: dark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.12)", borderRadius: 50, padding: "10px 20px", fontSize: 13, color: "var(--mid)", textDecoration: "none", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.color = "var(--white)"; e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "var(--mid)"; e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"; }}>
              <DownloadIcon /> Download Resume
            </a>

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
            Made in React with ❤️ by <span style={{ color: "var(--white)", fontWeight: 600 }}>Raghul Prasanth</span>
          </span>
          <span style={{ fontSize: 12, color: "var(--mid)", fontFamily: "'Open Sans',sans-serif" }}>
            © {new Date().getFullYear()} Raghul Prasanth. All rights reserved.
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
}