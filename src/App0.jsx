import { useState, useEffect, useRef } from "react";

/* ─── GOOGLE FONTS ─── */
const FontLink = () => (
  <style>{`@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,400;1,600&display=swap');`}</style>
);

/* ─── DATA ─── */
const WORK = [
  {
    id: 1,
    date: "Jun 2025",
    dur: "Present",
    company: "Oracle OFSS",
    location: "Chennai, India",
    role: "Associate Consultant",
    type: "Full-time",
    desc: "Developing MVPs using Oracle VBCS with an emphasis on scalability, rapid iteration, and cloud-native design. Integrated OCI services and Oracle Autonomous Database to develop fault-tolerant cloud-native applications. Implemented AI-driven automation using Generative AI to optimize user workflows and system intelligence.",
  },
  {
    id: 2,
    date: "Nov 2024",
    dur: "May 2025",
    company: "Bluestock Fintech",
    location: "Remote",
    role: "Software Development Intern",
    type: "Internship",
    desc: "Developed web application and REST APIs serving IPO data to thousands of users with company details, price bands, and real-time listing metrics. Built scalable API endpoints for current market prices with optimized latency. Integrated downloadable RHP and DRHP PDFs with responsive design, enhancing accessibility and user engagement across devices.",
  },
  {
    id: 3,
    date: "Mar 2024",
    dur: "Jul 2024",
    company: "Jithwa Solutions",
    location: "Chennai, India",
    role: "Full Stack Intern",
    type: "Internship",
    desc: "Developed responsive web applications using ReactJS, HTML, and Tailwind CSS with cross-device compatibility. Designed and implemented RESTful APIs integrating frontend components with backend services for dynamic content. Utilized Git and JIRA for version control and agile project management, conducting code reviews to maintain quality.",
  },
];

const PROJECTS = [
  {
    id: 1,
    tags: ["Golang", "TypeScript", "Gin", "NextJs", "PostgreSQL", "Redis"],
    name: "Gostat",
    desc: [
      "GOStat — a cutting-edge microservice-based application designed to handle HTTP request authentication and statistics with finesse.",
      "This project comprises several key microservices, each contributing to its overall functionality and prowess.",
    ],
    visual: "gostat",
  },
  {
    id: 2,
    tags: ["TypeScript", "ReactNative", "Redux Toolkit", "i18n", "iOS"],
    name: "Kana Master",
    desc: [
      "Kana Master is an iOS application designed for learning Katakana and Hiragana. It includes various tests and practical exercises that help in learning and memorizing Japanese characters.",
      "The app also offers audio training for correct pronunciation and demonstrates how to properly draw each character.",
    ],
    visual: "kana",
    rev: true,
  },
  {
    id: 3,
    tags: ["Golang", "GORM", "PostgreSQL", "i18n", "goquery", "gcron"],
    name: "Anime Sentry",
    desc: [
      "Hey, anime fans! Struggling to track new episodes? Anime Sentry is your solution. Get auto-notifications for new episode releases!",
      "Send the bot your anime link, get release schedules instantly. Every 30 mins, the bot checks for new episodes using a cron schedule.",
    ],
    visual: "anime",
  },
];

const ARTICLES_PAGES = [
  [
    {
      title: "Building a Real-Time Kafka + Golang Microservice Pipeline",
      desc: "A hands-on guide to implementing a production-grade event-driven architecture using Apache Kafka, Golang, and Docker Compose from scratch.",
      emoji: "🦊",
    },
    {
      title: "Dockerizing a Full-Stack App: Beyond the Basics",
      desc: "Go beyond hello-world Docker setups — multi-stage builds, secrets management, and orchestration patterns for real-world full-stack applications.",
      emoji: "🐳",
    },
    {
      title: "React Patterns You Should Know in 2025",
      desc: "A deep dive into compound components, render props, custom hooks, and the emerging patterns reshaping how we think about React architecture today.",
      emoji: "⚛️",
    },
    {
      title: "Designing Fault-Tolerant REST APIs with Gin and PostgreSQL",
      desc: "From connection pooling and graceful shutdowns to retry logic and circuit breakers — how to build APIs that stay up when everything else falls apart.",
      emoji: "🛡️",
    },
  ],
  [
    {
      title: "Redis Caching Strategies for High-Traffic Applications",
      desc: "Exploring cache-aside, write-through, and write-behind strategies with practical Golang examples to drastically cut latency in production systems.",
      emoji: "⚡",
    },
    {
      title: "Type-Safe State Management with Redux Toolkit in React Native",
      desc: "How to structure Redux slices, async thunks, and selectors in a large-scale React Native app without losing your mind or type safety.",
      emoji: "📱",
    },
    {
      title: "Internationalization Done Right: i18n in Modern Web Apps",
      desc: "A practical walkthrough of pluralization rules, locale-aware formatting, and lazy-loading translation bundles in React and React Native projects.",
      emoji: "🌏",
    },
    {
      title: "OCI + Oracle Autonomous Database: A Developer's Survival Guide",
      desc: "Everything I wish I knew before deploying cloud-native apps on Oracle Cloud Infrastructure — from VBCS quirks to Autonomous DB connection tricks.",
      emoji: "☁️",
    },
  ],
  [
    {
      title: "Generative AI in Enterprise Workflows: Real Integration Patterns",
      desc: "Moving past demos — how to integrate LLM-powered automation into legacy enterprise systems without breaking everything around it.",
      emoji: "🤖",
    },
    {
      title: "Scraping at Scale with goquery and gcron: A Bot's Life",
      desc: "Building a resilient, schedule-aware web scraper in Golang that handles rate limits, failures, and incremental updates like a well-behaved citizen.",
      emoji: "🕷️",
    },
    {
      title: "IPO Data APIs: Building Financial Backends That Scale",
      desc: "Behind the scenes of building REST APIs for real-time IPO listing data — architecture decisions, latency optimizations, and lessons from production.",
      emoji: "📈",
    },
    {
      title: "Agile in Practice: Git, JIRA, and Code Reviews That Actually Work",
      desc: "A developer's perspective on making version control workflows, sprint rituals, and code review culture genuinely improve team output and code quality.",
      emoji: "🔄",
    },
  ],
];

const HERO_ARTICLES = [
  { title: "Kafka + Golang Microservice Pipeline", desc: "Building a real-time event-driven architecture using Apache Kafka, Golang, and Docker from scratch.", emoji: "🦊" },
  { title: "Dockerizing a Full-Stack App: Beyond the Basics", desc: "Multi-stage builds, secrets management, and orchestration patterns for real-world apps.", emoji: "🐳" },
  { title: "React Patterns You Should Know in 2025", desc: "Compound components, render props, and custom hooks reshaping React architecture.", emoji: "⚛️" },
];

/* ─── ICONS ─── */
const GithubIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
);
const LinkedInIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
);
const EmailIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
);
const TelegramIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
);
const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
);
const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
);
const SunIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
);
const MoonIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
);

/* ─── FADE IN HOOK ─── */
function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ─── FADE WRAPPER ─── */
function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, visible] = useFadeIn();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(18px)",
      transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      ...style,
    }}>{children}</div>
  );
}

/* ─── PROJECT VISUALS ─── */
function GostatVisual() {
  return (
    <div style={{ display: "flex", gap: 10, width: "100%", height: "100%" }}>
      <div style={{ flex: 1.6, background: "#242436", borderRadius: 10, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,#7f5af0,#2cb67d)" }} />
        <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 7 }}>
          {["38%","62%","100%","","38%","62%","80%"].map((w, i) =>
            w ? <div key={i} style={{ height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 3, width: w }} />
              : <div key={i} style={{ height: 44, background: "rgba(255,255,255,0.03)", borderRadius: 7, margin: "4px 0" }} />
          )}
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

function MockPhone({ children, style = {} }) {
  return (
    <div style={{ width: 68, height: 136, background: "#181826", borderRadius: 14, border: "2px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", overflow: "hidden", ...style }}>
      <div style={{ width: 28, height: 4, background: "rgba(255,255,255,0.07)", borderRadius: 2, margin: "6px auto 0" }} />
      <div style={{ flex: 1, margin: 6, background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: "7px 5px", display: "flex", flexDirection: "column", gap: 4 }}>
        {children}
      </div>
    </div>
  );
}

/* ─── CONTACT FORM ─── */
function ContactForm({ dark }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const bg = dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)";
  const border = dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.1)";
  const color = dark ? "#f5f5f5" : "#121212";
  const placeholder = dark ? "#a6a6a6" : "#888";

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      // ─────────────────────────────────────────────────────
      // EMAILJS SETUP — replace these 3 values:
      //   1. Go to https://www.emailjs.com and create a free account
      //   2. Add an Email Service (Gmail, Outlook, etc.) → copy your Service ID
      //   3. Create an Email Template → copy your Template ID
      //   4. Go to Account → API Keys → copy your Public Key
      // ─────────────────────────────────────────────────────
      const SERVICE_ID  = "YOUR_SERVICE_ID";   // e.g. "service_abc123"
      const TEMPLATE_ID = "YOUR_TEMPLATE_ID";  // e.g. "template_xyz789"
      const PUBLIC_KEY  = "YOUR_PUBLIC_KEY";   // e.g. "abcDEFghiJKL"
      // ─────────────────────────────────────────────────────
      // Your EmailJS template should use these variables:
      //   {{from_name}}, {{from_email}}, {{subject}}, {{message}}
      // ─────────────────────────────────────────────────────

      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: SERVICE_ID,
          template_id: TEMPLATE_ID,
          user_id: PUBLIC_KEY,
          template_params: {
            from_name: form.name,
            from_email: form.email,
            subject: form.subject,
            message: form.message,
          },
        }),
      });
      if (res.ok) { setStatus("success"); setForm({ name: "", email: "", subject: "", message: "" }); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  const inputStyle = {
    width: "100%", background: bg, border, borderRadius: 10,
    padding: "12px 14px", color, fontSize: 13,
    fontFamily: "'Open Sans', sans-serif", outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <style>{`.contact-input::placeholder{color:${placeholder}} .contact-input:focus{border-color:rgba(255,255,255,0.25)!important}`}</style>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <input className="contact-input" style={inputStyle} name="name" placeholder="Your name" value={form.name} onChange={handleChange} />
        <input className="contact-input" style={inputStyle} name="email" placeholder="your@email.com" value={form.email} onChange={handleChange} />
      </div>
      <input className="contact-input" style={inputStyle} name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} />
      <textarea className="contact-input" style={{ ...inputStyle, minHeight: 120, resize: "vertical" }} name="message" placeholder="Your message..." value={form.message} onChange={handleChange} />
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <button
          onClick={handleSubmit}
          disabled={status === "sending"}
          style={{
            background: dark ? "#fff" : "#121212", color: dark ? "#121212" : "#fff",
            border: "none", borderRadius: 50, padding: "11px 26px",
            fontFamily: "'Open Sans',sans-serif", fontWeight: 600, fontSize: 13,
            cursor: "pointer", transition: "opacity 0.2s", opacity: status === "sending" ? 0.6 : 1,
          }}
        >
          {status === "sending" ? "Sending…" : "Send Message →"}
        </button>
        {status === "success" && <span style={{ fontSize: 12, color: "#2cb67d" }}>✓ Message sent!</span>}
        {status === "error" && <span style={{ fontSize: 12, color: "#e06c75" }}>Something went wrong. Try again.</span>}
      </div>
    </div>
  );
}

/* ─── MAIN APP ─── */
export default function Portfolio() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") return window.matchMedia("(prefers-color-scheme: dark)").matches;
    return true;
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [expandedWork, setExpandedWork] = useState(null);
  const [articlePage, setArticlePage] = useState(0);
  const [heroSlide, setHeroSlide] = useState(0);
  const [lang, setLang] = useState("En");

  // Dark/light CSS vars
  const theme = dark
    ? { "--black":"#121212","--dark":"#3D3D3D","--mid":"#A6A6A6","--light":"#F5F5F5","--white":"#ffffff","--bg":"#121212","--text":"#F5F5F5" }
    : { "--black":"#f5f5f5","--dark":"#d0d0d0","--mid":"#666","--light":"#1a1a1a","--white":"#121212","--bg":"#f0f0f0","--text":"#121212" };

  // Scroll-based active nav
  useEffect(() => {
    const handler = () => {
      const ids = ["hero","about","work","projects","articles","contact"];
      let cur = "hero";
      ids.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) cur = id;
      });
      setActiveSection(cur);
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Listen to system dark mode changes
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = e => setDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navLinks = [
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Articles", id: "articles" },
    { label: "Contacts", id: "contact" },
  ];

  const articles = ARTICLES_PAGES[articlePage];

  return (
    <div style={{ ...theme, background: "var(--bg)", color: "var(--text)", fontFamily: "'Open Sans', sans-serif", fontSize: 14, lineHeight: 1.6, overflowX: "hidden", minHeight: "100vh" }}>
      <FontLink />
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:var(--bg)}
        ::-webkit-scrollbar-thumb{background:var(--dark);border-radius:2px}
        body{overflow-x:hidden}
        @media(max-width:768px){
          .nav-links-desktop{display:none!important}
          .hero-pad,.about-pad,.work-pad,.projects-pad,.articles-pad,.footer-pad{padding-left:20px!important;padding-right:20px!important}
          .about-grid{grid-template-columns:1fr!important}
          .project-item-grid{grid-template-columns:1fr!important;direction:ltr!important}
          .art-cards-grid{grid-template-columns:1fr!important}
          .footer-grid{grid-template-columns:1fr!important}
          .footer-socials-grid{grid-template-columns:1fr 1fr!important}
          .hero-title-size{font-size:clamp(40px,12vw,96px)!important}
          .contact-name-size{font-size:clamp(28px,8vw,60px)!important}
          .work-heading{font-size:clamp(36px,10vw,80px)!important}
          .contact-form-grid{grid-template-columns:1fr!important}
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "24px 48px",
        background: dark ? "rgba(18,18,18,0.9)" : "rgba(240,240,240,0.9)",
        backdropFilter: "blur(12px)",
        borderBottom: dark ? "1px solid rgba(255,255,255,0.04)" : "1px solid rgba(0,0,0,0.06)",
      }}>
        <div style={{ fontFamily: "'Fira Code',monospace", fontWeight: 600, fontSize: 15, color: "var(--white)", lineHeight: 1.2 }}>
          Raghul Prasanth
          <span style={{ display: "block", fontWeight: 300, color: "var(--mid)", fontSize: 12 }}>Full-stack Developer</span>
        </div>

        <ul className="nav-links-desktop" style={{ display: "flex", gap: 36, listStyle: "none" }}>
          {navLinks.map(l => (
            <li key={l.id}>
              <button onClick={() => scrollTo(l.id)} style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: 13,
                color: activeSection === l.id ? "var(--white)" : "var(--mid)",
                fontFamily: "'Open Sans',sans-serif",
                transition: "color 0.2s",
              }}>{l.label}</button>
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Language toggle */}
          <div style={{ fontFamily: "'Fira Code',monospace", fontSize: 13, color: "var(--mid)", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2, cursor: "pointer" }}
            onClick={() => setLang(l => l === "En" ? "Ge" : "En")}>
            <span style={{ color: lang === "En" ? "var(--white)" : "var(--mid)" }}>En</span>
            <span style={{ color: lang === "Ge" ? "var(--white)" : "var(--mid)" }}>Ge</span>
          </div>
          {/* Theme toggle */}
          <button onClick={() => setDark(d => !d)} style={{
            background: "transparent", border: dark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.12)",
            borderRadius: "50%", width: 32, height: 32,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--mid)", cursor: "pointer", transition: "background 0.2s",
          }}>
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
          {/* Hamburger */}
          <button onClick={() => setMenuOpen(o => !o)} style={{
            display: "none", background: "none", border: "none", cursor: "pointer",
            color: "var(--white)", padding: 4,
          }} className="hamburger-btn">
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
          <style>{`@media(max-width:768px){.hamburger-btn{display:flex!important}}`}</style>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 72, left: 0, right: 0, zIndex: 99,
          background: dark ? "rgba(18,18,18,0.97)" : "rgba(240,240,240,0.97)",
          backdropFilter: "blur(12px)",
          borderBottom: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
          padding: "20px 20px",
          display: "flex", flexDirection: "column", gap: 16,
        }}>
          {navLinks.map(l => (
            <button key={l.id} onClick={() => scrollTo(l.id)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: 15, color: "var(--white)", fontFamily: "'Open Sans',sans-serif",
              textAlign: "left", padding: "6px 0",
            }}>{l.label}</button>
          ))}
        </div>
      )}

      {/* ── HERO ── */}
      <section id="hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "120px 48px 60px", position: "relative", overflow: "hidden" }} className="hero-pad">
        <div style={{ position: "absolute", top: 80, right: -80, width: 420, height: 420, border: dark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.05)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 220, right: 80, width: 180, height: 180, border: dark ? "1px solid rgba(255,255,255,0.03)" : "1px solid rgba(0,0,0,0.03)", borderRadius: "50%", pointerEvents: "none" }} />

        <div style={{ fontFamily: "'Fira Code',monospace", fontSize: 12, color: "var(--mid)", marginBottom: 8, letterSpacing: "0.05em" }}>... /Main ...</div>
        <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <div className="hero-title-size" style={{ fontFamily: "'Fira Code',monospace", fontSize: "clamp(52px,8vw,96px)", fontWeight: 700, lineHeight: 1, color: "var(--white)", letterSpacing: "-0.02em" }}>Full-stack</div>
          <button onClick={() => scrollTo("projects")} style={{
            display: "flex", alignItems: "center", gap: 10,
            background: "var(--white)", color: "var(--bg)",
            border: "none", borderRadius: 50, padding: "12px 24px",
            fontFamily: "'Open Sans',sans-serif", fontSize: 14, fontWeight: 600,
            cursor: "pointer", transition: "transform 0.2s", whiteSpace: "nowrap",
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            Projects <span style={{ width: 28, height: 28, background: "var(--bg)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>→</span>
          </button>
        </div>
        <div className="hero-title-size" style={{ fontFamily: "'Fira Code',monospace", fontSize: "clamp(52px,8vw,96px)", fontWeight: 700, lineHeight: 1, color: "var(--white)", letterSpacing: "-0.02em", textAlign: "right" }}>Developer</div>
        <p style={{ marginTop: 20, maxWidth: 320, fontSize: 13, color: "var(--mid)", lineHeight: 1.8 }}>
          My goal is to write <em style={{ fontStyle: "italic", color: "var(--light)" }}>maintainable, clean</em> and <em style={{ fontStyle: "italic", color: "var(--light)" }}>understandable code</em> to make the development process enjoyable.
        </p>

        {/* Socials */}
        <div style={{ display: "flex", gap: 10, marginTop: 36, flexWrap: "wrap" }}>
          {[
            { icon: <GithubIcon />, label: "Github" },
            { icon: <LinkedInIcon />, label: "LinkedIn" },
            { icon: <TelegramIcon />, label: "Telegram" },
            { icon: <EmailIcon />, label: "E-mail" },
          ].map(s => (
            <a key={s.label} href="#" style={{
              display: "flex", alignItems: "center", gap: 7,
              background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
              border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
              borderRadius: 50, padding: "8px 16px", fontSize: 12, color: "var(--light)", textDecoration: "none",
              transition: "background 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = dark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.09)"}
              onMouseLeave={e => e.currentTarget.style.background = dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"}
            >{s.icon}{s.label}</a>
          ))}
        </div>

        {/* Hero article carousel */}
        <div style={{ marginTop: 40 }}>
          <div style={{ display: "flex", gap: 14, overflow: "hidden" }}>
            {HERO_ARTICLES.map((a, i) => {
              const isFeatured = i === heroSlide;
              return (
                <div key={i} style={{
                  flex: isFeatured ? "0 0 330px" : "0 0 290px",
                  background: isFeatured
                    ? (dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)")
                    : (dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"),
                  border: isFeatured
                    ? (dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.12)")
                    : (dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)"),
                  borderRadius: 16, overflow: "hidden", opacity: isFeatured ? 1 : 0.4,
                  transition: "all 0.3s",
                }}>
                  <div style={{ width: "100%", height: 130, background: "linear-gradient(135deg,#2a2a3a,#3a2a4a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>{a.emoji}</div>
                  <div style={{ padding: 16 }}>
                    <h4 style={{ fontFamily: "'Fira Code',monospace", fontSize: 13, fontWeight: 600, color: "var(--white)", marginBottom: 8, lineHeight: 1.4 }}>{a.title}</h4>
                    <p style={{ fontSize: 12, color: "var(--mid)", lineHeight: 1.6, marginBottom: 14 }}>{a.desc}</p>
                    <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--white)", color: "var(--bg)", borderRadius: 50, padding: "7px 16px", fontSize: 12, fontWeight: 600, textDecoration: "none" }}>Read more</a>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Carousel controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 14 }}>
            <button onClick={() => setHeroSlide(s => (s - 1 + HERO_ARTICLES.length) % HERO_ARTICLES.length)}
              style={{ width: 34, height: 34, borderRadius: "50%", border: dark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.12)", background: "transparent", color: "var(--white)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>←</button>
            <button onClick={() => setHeroSlide(s => (s + 1) % HERO_ARTICLES.length)}
              style={{ width: 34, height: 34, borderRadius: "50%", border: dark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.12)", background: "transparent", color: "var(--white)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>→</button>
            <div style={{ display: "flex", gap: 6 }}>
              {HERO_ARTICLES.map((_, i) => (
                <button key={i} onClick={() => setHeroSlide(i)} style={{
                  width: 6, height: 6, borderRadius: "50%", border: "none", cursor: "pointer",
                  background: i === heroSlide ? "var(--white)" : "var(--dark)", padding: 0,
                  transition: "background 0.2s",
                }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr style={{ border: "none", borderTop: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)" }} />

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "80px 48px" }} className="about-pad">
        <div style={{
          display: "flex", alignItems: "baseline", justifyContent: "space-between",
          marginBottom: 40, flexWrap: "wrap", gap: 8,
        }}>
          <span style={{ fontFamily: "'Fira Code',monospace", fontSize: 12, color: "var(--mid)", letterSpacing: "0.05em" }}>... /About ...</span>
          <span className="work-heading" style={{ fontFamily: "'Fira Code',monospace", fontSize: "clamp(48px,7vw,80px)", fontWeight: 700, color: "var(--white)", lineHeight: 1 }}>About</span>
        </div>
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <FadeIn>
            <p style={{ fontSize: 15, color: "var(--light)", lineHeight: 1.9 }}>
              I'm <em style={{ fontStyle: "italic", fontWeight: 600, color: "var(--white)" }}>Raghul Prasanth</em>, a Full-Stack Developer based in Chennai, India with a passion for building
              <em style={{ fontStyle: "italic", fontWeight: 600, color: "var(--white)" }}> scalable cloud-native applications</em>. I thrive at the intersection of backend robustness and clean frontend UX.
            </p>
            <p style={{ fontSize: 12, color: "var(--mid)", maxWidth: 240, lineHeight: 1.7, margin: "36px 0 16px" }}>
              My <em style={{ color: "var(--light)", fontStyle: "italic" }}>core stack</em> spans backend services, cloud infrastructure, and modern frontend frameworks.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { title: "Backend", items: "Golang · Node.js · Gin · REST APIs · Microservices" },
                { title: "Frontend", items: "React · NextJs · ReactNative · TypeScript · Tailwind" },
                { title: "Cloud & DB", items: "OCI · Oracle VBCS · PostgreSQL · Redis · MongoDB" },
                { title: "DevOps", items: "Docker · Git · JIRA · Kafka · CI/CD · Linux" },
              ].map(s => (
                <div key={s.title}
                  style={{ background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)", border: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)", borderRadius: 14, padding: 18, transition: "border-color 0.2s, background 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"; e.currentTarget.style.background = dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"; e.currentTarget.style.background = dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)"; }}
                >
                  <h4 style={{ fontFamily: "'Fira Code',monospace", fontSize: 12, fontWeight: 600, color: "var(--white)", marginBottom: 8 }}>{s.title}</h4>
                  <p style={{ fontSize: 11, color: "var(--mid)", lineHeight: 1.9 }}>{s.items}</p>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", padding: "20px 0" }}>
              <div style={{ width: "100%", maxWidth: 280, aspectRatio: "3/4", background: dark ? "linear-gradient(160deg,#222,#181818)" : "linear-gradient(160deg,#ddd,#e8e8e8)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--dark)", fontSize: 13, fontFamily: "'Fira Code',monospace" }}>
              <img
                src="/photo.jpeg"
                alt="Raghul Prasanth"
                style={{
                  width: "100%",
                  maxWidth: 280,
                  aspectRatio: "3/4",
                  objectFit: "cover",
                  borderRadius: 16,
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <hr style={{ border: "none", borderTop: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)" }} />

      {/* ── WORK ── */}
      <section id="work" style={{ padding: "80px 48px" }} className="work-pad">
        <FadeIn>
          <div style={{
            display: "flex", alignItems: "baseline", justifyContent: "space-between",
            marginBottom: 40, flexWrap: "wrap", gap: 8,
          }}>
            <span style={{ fontFamily: "'Fira Code',monospace", fontSize: 12, color: "var(--mid)", letterSpacing: "0.05em" }}>... /Work ...</span>
            <span className="work-heading" style={{ fontFamily: "'Fira Code',monospace", fontSize: "clamp(48px,7vw,80px)", fontWeight: 700, color: "var(--white)", lineHeight: 1 }}>Experience</span>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {WORK.map(w => (
                <>
                  <tr key={w.id}
                    onClick={() => setExpandedWork(expandedWork === w.id ? null : w.id)}
                    style={{
                      borderTop: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
                      cursor: "pointer",
                      background: expandedWork === w.id ? (dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)") : "transparent",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={e => { if (expandedWork !== w.id) e.currentTarget.style.background = dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)"; }}
                    onMouseLeave={e => { if (expandedWork !== w.id) e.currentTarget.style.background = "transparent"; }}
                  >
                    <td style={{ padding: "18px 10px", verticalAlign: "middle" }}>
                      <span style={{ fontFamily: "'Fira Code',monospace", fontSize: 11, color: "var(--mid)", whiteSpace: "nowrap" }}>
                        {w.date}<span style={{ display: "block", marginTop: 2 }}>{w.dur}</span>
                      </span>
                    </td>
                    <td style={{ padding: "18px 10px", verticalAlign: "middle", fontWeight: 600, fontSize: 14, color: "var(--white)", minWidth: 160 }}>{w.company}</td>
                    <td style={{ padding: "18px 10px", verticalAlign: "middle", fontSize: 13, color: "var(--mid)" }}>
                      <strong style={{ color: "var(--light)", fontWeight: 400 }}>{w.role}</strong> · {w.location}
                    </td>
                    <td style={{ padding: "18px 10px", verticalAlign: "middle", color: "var(--white)", fontSize: 11, width: 20, textAlign: "center" }}>
                      <span style={{ transition: "transform 0.2s", display: "inline-block", transform: expandedWork === w.id ? "rotate(90deg)" : "none" }}>→</span>
                    </td>
                  </tr>
                  {expandedWork === w.id && (
                    <tr key={`${w.id}-exp`} style={{ background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}>
                      <td colSpan={4} style={{ padding: "0 10px 20px 10px" }}>
                        <div style={{
                          fontSize: 13, color: "var(--mid)", lineHeight: 1.8, maxWidth: 680,
                          borderLeft: dark ? "2px solid rgba(255,255,255,0.1)" : "2px solid rgba(0,0,0,0.1)",
                          paddingLeft: 16, marginLeft: 4,
                          animation: "fadeSlide 0.3s ease",
                        }}>
                          <style>{`@keyframes fadeSlide{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}`}</style>
                          {w.desc}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
          <div style={{ textAlign: "right", paddingTop: 16 }}>
            <p style={{ fontSize: 12, color: "var(--mid)" }}>Total experience</p>
            <strong style={{ fontFamily: "'Fira Code',monospace", fontSize: 13, color: "var(--white)", fontStyle: "italic" }}>~ 1.5 years</strong>
          </div>
        </FadeIn>
      </section>

      <hr style={{ border: "none", borderTop: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)" }} />

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ padding: "80px 48px" }} className="projects-pad">
        <div style={{
          display: "flex", alignItems: "baseline", justifyContent: "space-between",
          marginBottom: 48, flexWrap: "wrap", gap: 8,
        }}>
          <span style={{ fontFamily: "'Fira Code',monospace", fontSize: 12, color: "var(--mid)", letterSpacing: "0.05em" }}>... /Projects ...</span>
          <span className="work-heading" style={{ fontFamily: "'Fira Code',monospace", fontSize: "clamp(48px,7vw,80px)", fontWeight: 700, color: "var(--white)", lineHeight: 1 }}>Projects</span>
        </div>
        {PROJECTS.map((p, pi) => (
          <FadeIn key={p.id} delay={pi * 80}>
            <div className="project-item-grid" style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48,
              padding: "48px 0", borderTop: pi === 0 ? "none" : (dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)"),
              alignItems: "center",
              direction: p.rev ? "rtl" : "ltr",
            }}>
              <div style={{ direction: "ltr" }}>
                <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 14 }}>
                  {p.tags.map(t => (
                    <span key={t} style={{ background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)", border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)", borderRadius: 6, padding: "4px 10px", fontFamily: "'Fira Code',monospace", fontSize: 11, color: "var(--mid)" }}>{t}</span>
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
              <div style={{ direction: "ltr", borderRadius: 16, overflow: "hidden", background: dark ? "#1a1a26" : "#e8e8f0", aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
                {p.visual === "gostat" && <GostatVisual />}
                {p.visual === "kana" && <KanaVisual />}
                {p.visual === "anime" && <AnimeVisual />}
              </div>
            </div>
          </FadeIn>
        ))}
      </section>

      <hr style={{ border: "none", borderTop: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)" }} />

      {/* ── ARTICLES ── */}
      <section id="articles" style={{ padding: "80px 48px" }} className="articles-pad">
        <div style={{
          display: "flex", alignItems: "baseline", justifyContent: "space-between",
          marginBottom: 48, flexWrap: "wrap", gap: 8,
        }}>
          <span style={{ fontFamily: "'Fira Code',monospace", fontSize: 12, color: "var(--mid)", letterSpacing: "0.05em" }}>... /Articles ...</span>
          <span className="work-heading" style={{ fontFamily: "'Fira Code',monospace", fontSize: "clamp(48px,7vw,80px)", fontWeight: 700, color: "var(--white)", lineHeight: 1 }}>Articles</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "36px 1fr", gap: "0 24px" }}>
          {/* Page number buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {ARTICLES_PAGES.map((_, i) => (
              <button key={i} onClick={() => setArticlePage(i)} style={{
                width: 28, height: 28, borderRadius: "50%",
                border: articlePage === i ? "none" : (dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)"),
                background: articlePage === i ? "var(--white)" : "transparent",
                color: articlePage === i ? "var(--bg)" : "var(--mid)",
                fontFamily: "'Fira Code',monospace", fontSize: 10, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s",
              }}>{i + 1}</button>
            ))}
          </div>
          {/* Article cards */}
          <div className="art-cards-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {articles.map((a, i) => (
              <FadeIn key={`${articlePage}-${i}`} delay={i * 60}>
                <div style={{
                  background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                  border: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
                  borderRadius: 14, padding: 20, transition: "border-color 0.2s", height: "100%",
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}
                >
                  <div style={{ fontSize: 24, marginBottom: 10 }}>{a.emoji}</div>
                  <h4 style={{ fontFamily: "'Fira Code',monospace", fontSize: 13, fontWeight: 600, color: "var(--white)", marginBottom: 10, lineHeight: 1.5 }}>{a.title}</h4>
                  <p style={{ fontSize: 12, color: "var(--mid)", lineHeight: 1.7, marginBottom: 16 }}>{a.desc}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "var(--white)", color: "var(--bg)", borderRadius: 50, padding: "7px 16px", fontSize: 12, fontWeight: 600, textDecoration: "none", fontFamily: "'Open Sans',sans-serif", transition: "opacity 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                      onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                    >Read more</a>
                    <button style={{ width: 28, height: 28, borderRadius: "50%", border: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)", background: "transparent", color: "var(--white)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>→</button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER / CONTACT ── */}
      <footer id="contact" style={{ borderTop: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)", padding: "64px 48px 40px" }} className="footer-pad">
        {/* Top: form + right column aligned at top */}
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
          {/* Left — name + form */}
          <FadeIn>
            <div style={{ fontFamily: "'Fira Code',monospace", fontSize: 12, color: "var(--mid)", marginBottom: 16 }}>... /Contacts ...</div>
            <div className="contact-name-size" style={{ fontFamily: "'Fira Code',monospace", fontSize: "clamp(36px,5vw,60px)", fontWeight: 700, color: "var(--white)", lineHeight: 1 }}>
              Raghul<br />Prasanth
            </div>
            <div style={{ fontSize: 12, color: "var(--mid)", marginTop: 8, marginBottom: 32 }}>Full-stack developer</div>
            <ContactForm dark={dark} />
          </FadeIn>

          {/* Right — nav links + socials */}
          <FadeIn delay={100}>
            <nav style={{ display: "flex", gap: 22, marginBottom: 32, flexWrap: "wrap", background: "none", padding: 0, border: "none", backdropFilter: "none" }}>
              {navLinks.map(l => (
                <button key={l.id} onClick={() => scrollTo(l.id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "var(--mid)", fontFamily: "'Open Sans',sans-serif", transition: "color 0.2s", padding: 0 }}
                  onMouseEnter={e => e.currentTarget.style.color = "var(--white)"}
                  onMouseLeave={e => e.currentTarget.style.color = "var(--mid)"}
                >{l.label}</button>
              ))}
            </nav>
            <div className="footer-socials-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[
                { icon: <GithubIcon />, label: "Github" },
                { icon: <LinkedInIcon />, label: "LinkedIn" },
                { icon: <EmailIcon />, label: "E-mail" },
                { icon: <TelegramIcon />, label: "Telegram" },
              ].map(s => (
                <a key={s.label} href="#" style={{
                  display: "flex", alignItems: "center", gap: 8,
                  background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
                  border: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
                  borderRadius: 10, padding: "10px 14px", fontSize: 12, color: "var(--light)", textDecoration: "none", transition: "background 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}
                  onMouseLeave={e => e.currentTarget.style.background = dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)"}
                >{s.icon}{s.label}</a>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Bottom bar — copyright */}
        <div style={{
          marginTop: 48,
          paddingTop: 24,
          borderTop: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
        }}>
          <span style={{ fontSize: 12, color: "var(--mid)", fontFamily: "'Open Sans',sans-serif" }}>
            Made in React with ❤️ by <span style={{ color: "var(--white)", fontWeight: 600 }}>Raghul Prasanth</span>
          </span>
          <span style={{ fontSize: 12, color: "var(--mid)", fontFamily: "'Open Sans',sans-serif" }}>
            © {new Date().getFullYear()} Raghul Prasanth. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
