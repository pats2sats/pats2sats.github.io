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
type ProjectVariant = "hostr" | "nestr" | "evolut" | "sudonym";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#stack" },
  { label: "Other", href: "#other" },
];

const projects: Array<{
  name: string;
  description: string;
  link: string;
  linkLabel: string;
  stack: string[];
  variant: ProjectVariant;
}> = [
  {
    name: "Hostr",
    description:
      "Peer-to-peer accommodation built on Nostr and Lightning, with a Flutter app, SDK, CLI, and MCP surface for AI-assisted booking workflows.",
    link: "https://github.com/sudonym-btc/hostr",
    linkLabel: "Repository",
    stack: ["Flutter", "Dart", "Nostr", "Lightning", "MCP"],
    variant: "hostr",
  },
  {
    name: "Evolut",
    description:
      "A SaaS platform for LinkedIn marketing automation with an Angular dashboard, NestJS API, Puppeteer workers, GCP infrastructure, Stripe billing, Zapier, and Electron builds.",
    link: "https://github.com/pats2sats",
    linkLabel: "GitHub",
    stack: ["Angular", "NestJS", "Puppeteer", "GCP", "Stripe"],
    variant: "evolut",
  },
  {
    name: "Sudonym",
    description:
      "A white-label Bitcoin and Lightning wallet with a Flutter app, NestJS API, Core Lightning node services, LNURL flows, BOLT card support, and app-store pipelines.",
    link: "https://github.com/sudonym-btc/sudonym",
    linkLabel: "Private repo",
    stack: ["Flutter", "NestJS", "Lightning", "LNURL", "GCP"],
    variant: "sudonym",
  },
  {
    name: "Nestr",
    description: "A virtual office environment for nostr protocol chatrooms",
    link: "https://github.com/sudonym-btc/nestr",
    linkLabel: "Repository",
    stack: ["React", "TypeScript", "Three.js", "NIP-29", "WebRTC"],
    variant: "nestr",
  },
];

const stack = [
  "TypeScript",
  "JavaScript",
  "Node.js",
  "NestJS",
  "React",
  "Angular",
  "Flutter",
  "Dart",
  "Go",
  "Python",
  "Google Cloud",
  "AWS",
  "GKE",
  "Kubernetes",
  "Docker",
  "Docker Compose",
  "Terraform",
  "Cloud IAM",
  "Cloud Build",
  "GitHub Actions",
  "CI/CD",
  "Artifact Registry",
  "Cloud KMS",
  "Secret Manager",
  "Cloud Pub/Sub",
  "Cloud Storage",
  "Cloud DNS",
  "Serverless",
  "App Engine",
  "Firebase",
  "MySQL",
  "Sequelize",
  "GraphQL",
  "REST APIs",
  "WebSockets",
  "Puppeteer",
  "Electron",
  "Stripe",
  "SendGrid",
  "Zapier",
  "iOS",
  "Android",
  "App Store",
  "Google Play",
  "Bitcoin",
  "Lightning",
  "LNURL",
  "Core Lightning",
  "LND",
  "Nostr",
  "Nostr Tools",
  "Cashu",
  "Rootstock",
  "EVM Escrow",
  "Solidity",
  "ERC-4337",
  "Boltz",
  "H3",
  "Three.js",
  "WebRTC",
  "MCP",
  "OpenAI",
  "Product Engineering",
  "Security",
];

const githubAvatarSrc = "/assets/patrick-github-avatar.jpg";
const linkedinPortraitSrc = "/assets/patrick-linkedin-profile.jpg";
const contactEmail = "patrick.geyer1@gmail.com";

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

          <a className="contact-button" href={`mailto:${contactEmail}`}>
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
              href={`mailto:${contactEmail}`}
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
            <div className="avatar-ring">
              <img
                className="avatar-photo"
                src={githubAvatarSrc}
                alt="Patrick Geyer GitHub avatar"
                width="460"
                height="460"
              />
            </div>

            <h1>
              Hi, I&apos;m <span>Patrick Geyer</span>
            </h1>

            <div className="question-panel" aria-label="Portfolio prompts">
              <div className="panel-log">
                <p className="prompt">
                  Ask about personal projects or professional employment...
                </p>
              </div>

              <div className="prompt-row">
                <a href="#projects">Ask about personal projects</a>
                <a href="#about">Ask about professional employment</a>
              </div>

              <div className="fake-input">
                <span>Ask about personal projects or professional employment...</span>
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
            <article className="about-tile focus-tile">
              <p className="tile-label">Scope</p>
              <h3>Marketing, finance, cryptography</h3>
              <p>
                Startup systems, wallet infrastructure, and Nostr-native
                product experiments.
              </p>
            </article>

            <article className="about-tile portrait-tile">
              <img
                className="portrait-photo"
                src={linkedinPortraitSrc}
                alt="Patrick Geyer LinkedIn profile photo"
                width="200"
                height="200"
              />
              <div className="portrait-caption">
                <strong>Patrick Geyer</strong>
                <span>self-sovereign product engineering</span>
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
            <h2>Startups and Projects</h2>
            <p>
              A focused selection of projects spreading from marketing to
              finance to cryptography.
            </p>
          </div>

          <div className="project-list">
            {projects.map((project, index) => (
              <article className="project-card" key={project.name}>
                <div className="project-copy">
                  <div className="project-meta">
                    <span>{String(index + 1).padStart(2, "0")}</span>
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
          <span>GitHub</span>
        </a>
        <span>Patrick Geyer</span>
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
          className="project-shot"
          src="/assets/hostr-listing-real.png"
          alt="Hostr listing detail screen"
          width="1600"
          height="1039"
        />
      </div>
    );
  }

  if (variant === "nestr") {
    return (
      <div className="project-visual nestr-visual" aria-label="Nestr office preview">
        <img
          className="project-shot"
          src="/assets/nestr-office-real.png"
          alt="Nestr spatial office screen"
          width="1440"
          height="960"
        />
      </div>
    );
  }

  if (variant === "evolut") {
    return (
      <div className="project-visual evolut-visual" aria-label="Evolut system preview">
        <img
          className="project-shot"
          src="/assets/evolut-demo-real.png"
          alt="Evolut demo dashboard screen"
          width="1600"
          height="999"
        />
      </div>
    );
  }

  return (
    <div className="project-visual sudonym-visual" aria-label="Sudonym wallet preview">
      <img
        className="project-shot"
        src="/assets/sudonym-wallet-real.jpeg"
        alt="Sudonym Lightning wallet screens"
        width="1800"
        height="958"
      />
    </div>
  );
}

export default App;
