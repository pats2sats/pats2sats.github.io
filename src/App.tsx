import {
  ArrowDown,
  Calendar,
  ExternalLink,
  Menu,
  Moon,
  Send,
  Sun,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Theme = "dark" | "light";
type ProjectVariant = "hostr" | "nestr" | "evolut";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#stack" },
  { label: "Other", href: "#other" },
];

const projects: Array<{
  name: string;
  eyebrow: string;
  description: string;
  link: string;
  linkLabel: string;
  status: string;
  stack: string[];
  variant: ProjectVariant;
}> = [
  {
    name: "Hostr",
    eyebrow: "Bitcoin stays",
    description:
      "Peer-to-peer accommodation built on Nostr and Lightning, with a Flutter app, SDK, CLI, and MCP surface for AI-assisted booking workflows.",
    link: "https://github.com/sudonym-btc/hostr",
    linkLabel: "Repository",
    status: "Shipping",
    stack: ["Flutter", "Dart", "Nostr", "Lightning", "MCP"],
    variant: "hostr",
  },
  {
    name: "Nestr",
    eyebrow: "Nostr office",
    description:
      "A NIP-29 spatial-office prototype where relay groups become shared rooms with deterministic maps, live chat, presence, and WebRTC call pressure modeling.",
    link: "https://github.com/sudonym-btc/nestr",
    linkLabel: "Repository",
    status: "Prototype",
    stack: ["React", "TypeScript", "Phaser", "NIP-29", "WebRTC"],
    variant: "nestr",
  },
  {
    name: "Evolut",
    eyebrow: "Product systems",
    description:
      "A product-engineering track for evolving bitcoin-native workflows into practical tools, experiments, and user-facing product surfaces.",
    link: "https://github.com/pats2sats",
    linkLabel: "GitHub",
    status: "In progress",
    stack: ["Bitcoin", "Automation", "UX", "Agents", "TypeScript"],
    variant: "evolut",
  },
];

const stack = [
  "Bitcoin",
  "Lightning",
  "Nostr",
  "Dart",
  "Flutter",
  "TypeScript",
  "React",
  "MCP",
  "WebRTC",
  "OpenAI",
  "Product",
  "Security",
];

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  const saved = window.localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") {
    return saved;
  }

  return "dark";
}

function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const activeIcon = useMemo(
    () => (theme === "dark" ? <Moon size={18} /> : <Sun size={18} />),
    [theme],
  );

  return (
    <>
      <header className="site-header">
        <nav className="nav-shell" aria-label="Primary navigation">
          <button
            className="icon-button"
            type="button"
            aria-label="Toggle color theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {activeIcon}
          </button>

          <div className="nav-links">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>

          <a className="contact-button" href="mailto:paco@walletofsatoshi.com">
            <Calendar size={16} />
            <span>Contact</span>
          </a>

          <button
            className="icon-button menu-button"
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {menuOpen && (
          <div className="mobile-menu">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="mailto:paco@walletofsatoshi.com"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </a>
          </div>
        )}
      </header>

      <main>
        <section id="home" className="hero section">
          <div className="hero-content">
            <div className="avatar-ring" aria-hidden="true">
              <div className="avatar-mark">
                <span>P2S</span>
              </div>
            </div>

            <h1>
              Hi, I&apos;m <span>pats2sats</span>
            </h1>

            <div className="question-panel" aria-label="Portfolio highlights">
              <div className="panel-log">
                <p className="prompt">Ask me anything about pats2sats...</p>
              </div>

              <div className="prompt-row">
                <a href="#projects">Hostr</a>
                <a href="#projects">Nestr</a>
                <a href="#projects">Evolut</a>
                <a href="#stack">Skills</a>
              </div>

              <div className="fake-input">
                <span>Ask anything about pats2sats...</span>
                <a href="#projects" aria-label="Jump to projects">
                  <Send size={16} />
                </a>
              </div>
            </div>

            <a className="scroll-cue" href="#about">
              <span>Scroll to explore</span>
              <ArrowDown size={18} />
            </a>
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="about-grid">
            <article className="about-tile name-tile">
              <span>P</span>
              <span>A</span>
              <span>T</span>
              <span>S</span>
              <span>2</span>
              <span>S</span>
              <span>A</span>
              <span>T</span>
              <span>S</span>
            </article>

            <article className="about-tile portrait-tile">
              <div className="portrait-mark" aria-label="pats2sats monogram">
                <span>P2S</span>
                <strong>pats2sats</strong>
                <small>self-sovereign product engineering</small>
              </div>
            </article>

            <article className="about-tile text-tile">
              <p className="tile-label">Craft</p>
              <h2>Building software where money, identity, and real products meet.</h2>
              <p>
                I work around cryptography, bitcoin, Nostr, and practical
                product systems. The useful thing is the target: fewer demos,
                more tools people can actually pick up.
              </p>
            </article>

            <article className="about-tile status-tile">
              <p className="tile-label">Base</p>
              <h3>London / Munich / San Salvador</h3>
              <p>Shipping across time zones with a strong bias for self-sovereign rails.</p>
            </article>

            <article className="about-tile signal-tile">
              <p className="tile-label">Signal</p>
              <h3>Cryptography, bitcoin, programming</h3>
              <p>Public work lives on GitHub. The portfolio starts with the active projects below.</p>
            </article>
          </div>
        </section>

        <section id="projects" className="section projects-section">
          <div className="section-heading">
            <p className="kicker">Featured projects</p>
            <h2>Three active product tracks</h2>
            <p>
              A focused selection across marketplace infrastructure, Nostr
              social spaces, and product systems.
            </p>
          </div>

          <div className="project-list">
            {projects.map((project, index) => (
              <article className="project-card" key={project.name}>
                <div className="project-copy">
                  <div className="project-meta">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span>{project.eyebrow}</span>
                    <span>{project.status}</span>
                  </div>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="stack-row">
                    {project.stack.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                  <a className="project-link" href={project.link} target="_blank" rel="noreferrer">
                    <GitHubMark />
                    <span>{project.linkLabel}</span>
                    <ExternalLink size={15} />
                  </a>
                </div>
                <ProjectVisual variant={project.variant} />
              </article>
            ))}
          </div>
        </section>

        <section id="stack" className="section stack-section">
          <div className="section-heading">
            <p className="kicker">Tech stack</p>
            <h2>My <span>Skills</span></h2>
          </div>

          <div className="stack-cloud" aria-label="Technical skills">
            {stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </section>
      </main>

      <footer id="other" className="site-footer">
        <a href="https://github.com/pats2sats" target="_blank" rel="noreferrer">
          <GitHubMark />
          <span>github.com/pats2sats</span>
        </a>
        <span>pats2sats.github.io</span>
      </footer>
    </>
  );
}

function GitHubMark() {
  return (
    <svg
      aria-hidden="true"
      className="github-mark"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
    >
      <path d="M12 2.2c-5.5 0-9.9 4.5-9.9 10 0 4.4 2.8 8.1 6.8 9.4.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 0 1.6 1.1 1.6 1.1.9 1.6 2.4 1.1 2.9.9.1-.7.4-1.1.7-1.4-2.2-.3-4.5-1.1-4.5-4.9 0-1.1.4-2 1-2.7-.1-.3-.5-1.3.1-2.7 0 0 .9-.3 2.8 1 .8-.2 1.6-.3 2.5-.3s1.7.1 2.5.3c1.9-1.3 2.8-1 2.8-1 .6 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.8-2.3 4.6-4.5 4.9.4.3.8 1 .8 2v2.9c0 .3.2.6.7.5 4-1.3 6.8-5 6.8-9.4 0-5.5-4.4-10-9.9-10Z" />
    </svg>
  );
}

function ProjectVisual({ variant }: { variant: ProjectVariant }) {
  if (variant === "hostr") {
    return (
      <div className="project-visual hostr-visual" aria-label="Hostr app preview">
        <img
          className="desktop-shot"
          src="/assets/hostr-explore.png"
          alt="Hostr desktop explore screen"
          width="1400"
          height="909"
        />
        <img
          className="phone-shot"
          src="/assets/hostr-listing.png"
          alt="Hostr mobile listing screen"
          width="414"
          height="900"
        />
      </div>
    );
  }

  if (variant === "nestr") {
    return (
      <div className="project-visual nestr-visual" aria-label="Nestr office preview">
        <div className="office-map">
          <span className="desk desk-a" />
          <span className="desk desk-b" />
          <span className="desk desk-c" />
          <span className="desk desk-d" />
          <span className="avatar-dot dot-a" />
          <span className="avatar-dot dot-b" />
          <span className="avatar-dot dot-c" />
          <span className="room-label">NIP-29 room</span>
        </div>
        <div className="chat-rail">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    );
  }

  return (
    <div className="project-visual evolut-visual" aria-label="Evolut system preview">
      <div className="system-lane">
        <span>Discover</span>
        <strong>Inputs</strong>
      </div>
      <div className="system-lane">
        <span>Shape</span>
        <strong>Signals</strong>
      </div>
      <div className="system-lane">
        <span>Ship</span>
        <strong>Product</strong>
      </div>
      <div className="system-pulse" />
    </div>
  );
}

export default App;
