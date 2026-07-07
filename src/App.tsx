import {
  ArrowDown,
  Calendar,
  ExternalLink,
  LockKeyhole,
  Menu,
  Moon,
  Play,
  Send,
  Sun,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type Theme = "dark" | "light";
type ProjectVariant = "hostr" | "nestr" | "evolut" | "sudonym";
type DemoSource = {
  title: string;
  type: "video" | "iframe";
  src: string;
};
type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

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
  repoPrivate: boolean;
  demo?: DemoSource;
  stack: string[];
  variant: ProjectVariant;
}> = [
  {
    name: "Hostr",
    description:
      "Peer-to-peer accommodation built on Nostr and Lightning, with a Flutter app, SDK, CLI, and MCP surface for AI-assisted booking workflows.",
    link: "https://github.com/sudonym-btc/hostr",
    linkLabel: "Public repo",
    repoPrivate: false,
    demo: {
      title: "Hostr Product Demo",
      type: "video",
      src: "/assets/hostr-product-demo.mp4",
    },
    stack: ["Flutter", "Dart", "Nostr", "Lightning", "MCP"],
    variant: "hostr",
  },
  {
    name: "Evolut",
    description:
      "A SaaS platform for LinkedIn marketing automation with an Angular dashboard, NestJS API, Puppeteer workers, GCP infrastructure, Stripe billing, Zapier, and Electron builds.",
    link: "https://github.com/pats2sats/linkedin_frontend",
    linkLabel: "Private repos",
    repoPrivate: true,
    demo: {
      title: "Evolut Demo",
      type: "iframe",
      src: "https://drive.google.com/file/d/1SlrToYoWAD9beqE-yhPbRDnR5GVzTOYT/preview",
    },
    stack: ["Angular", "NestJS", "Puppeteer", "GCP", "Stripe"],
    variant: "evolut",
  },
  {
    name: "Sudonym",
    description:
      "A white-label Bitcoin and Lightning wallet with a Flutter app, NestJS API, Core Lightning node services, LNURL flows, BOLT card support, and app-store pipelines.",
    link: "https://github.com/sudonym-btc/sudonym",
    linkLabel: "Private repo",
    repoPrivate: true,
    demo: {
      title: "Sudonym Wallet Demo",
      type: "video",
      src: "/assets/sudonym-linkedin-demo.mp4",
    },
    stack: ["Flutter", "NestJS", "Lightning", "LNURL", "GCP"],
    variant: "sudonym",
  },
  {
    name: "Nestr",
    description: "A virtual office environment for nostr protocol chatrooms",
    link: "https://github.com/sudonym-btc/nestr",
    linkLabel: "Public repo",
    repoPrivate: false,
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
const quickPrompts = [
  "Ask about personal projects",
  "Ask about professional employment",
  "Skills",
  "Contact",
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

function getPortfolioAnswer(question: string) {
  const normalized = question.toLowerCase();

  if (normalized.includes("hostr")) {
    return "Hostr is Patrick's peer-to-peer short-term rental marketplace built around Nostr, Lightning, and self-custodial escrow ideas. The stack includes Flutter, Dart, a Dart SDK and CLI, Nostr event modeling, Solidity/Hardhat escrow contracts, Docker Compose, Terraform, Google Cloud, GitHub Actions, and an MCP surface for AI-assisted booking workflows.";
  }

  if (normalized.includes("nestr")) {
    return "Nestr is a virtual office environment for Nostr protocol chatrooms. It uses React, TypeScript, Vite, Three.js, Nostr Tools, NIP-29 group concepts, NIP-46/Nostr Connect paths, encrypted IndexedDB/WebCrypto session restoration, presence, chat, and WebRTC proximity-call modeling.";
  }

  if (normalized.includes("sudonym") || normalized.includes("wallet")) {
    return "Sudonym was a white-label Bitcoin and Lightning wallet. Patrick worked across the Flutter app, NestJS API, shared TypeScript/Dart models, Firebase auth, MySQL/Sequelize, GCP/GKE infrastructure, Cloud Build, Codemagic app-store pipelines, Core Lightning/c-lightning-rest, LNURL, BOLT11, and BOLT card/NFC flows.";
  }

  if (normalized.includes("evolut") || normalized.includes("marketing")) {
    return "Evolut was Patrick's LinkedIn marketing automation SaaS. It combined an Angular dashboard, NestJS/Node API, Puppeteer worker infrastructure, MySQL/Sequelize, Firebase, GCP Pub/Sub and Storage, Cloud Build, GKE/App Engine, Docker, Stripe, SendGrid, Zapier, and Electron/white-label desktop builds.";
  }

  if (
    normalized.includes("employment") ||
    normalized.includes("professional") ||
    normalized.includes("work") ||
    normalized.includes("job")
  ) {
    return "Patrick's professional experience includes 21Bitcoin, CoinBurp, Sellar, and Majestic3. The strongest themes are Bitcoin exchange order-flow routing, backend/API development, database work, customer tax-balance calculations, REST API rebuilds, and earlier full-stack/email-marketing engineering.";
  }

  if (
    normalized.includes("skill") ||
    normalized.includes("stack") ||
    normalized.includes("technology") ||
    normalized.includes("tech")
  ) {
    return "Patrick's core stack is backend-leaning full-stack engineering: JavaScript, TypeScript, Node.js, NestJS, React, Angular, Flutter, Dart, Docker, Kubernetes/GKE, Terraform, Google Cloud, AWS, MySQL, Sequelize, WebSockets, Puppeteer, Stripe, SendGrid, Zapier, Bitcoin, Lightning, Nostr, EVM/Solidity, MCP, and app-store deployment.";
  }

  if (
    normalized.includes("bitcoin") ||
    normalized.includes("lightning") ||
    normalized.includes("nostr") ||
    normalized.includes("crypto")
  ) {
    return "Patrick has worked on Bitcoin exchange infrastructure, a custodial Lightning wallet, and newer self-sovereign Nostr marketplace experiments. Relevant technologies include Bitcoin, Lightning, Core Lightning, LNURL, BOLT11, Nostr, NIP-29, NIP-46, Cashu, Rootstock/EVM escrow, Solidity, Hardhat, ERC-4337-style account abstraction, and Boltz-oriented swap flows.";
  }

  if (normalized.includes("contact") || normalized.includes("email")) {
    return `You can contact Patrick at ${contactEmail}. His portfolio is https://pats2sats.github.io/ and his GitHub profile is https://github.com/pats2sats.`;
  }

  if (normalized.includes("project") || normalized.includes("built")) {
    return "A focused set of Patrick's projects: Hostr for Nostr-native accommodation, Sudonym for Bitcoin/Lightning wallet infrastructure, Evolut for marketing automation, and Nestr for virtual office chatrooms on Nostr. Broader open-source work also includes marketplace/NMDK packages around Cashu, EVM escrow, H3 geospatial tags, and local Bitcoin/Lightning/EVM stacks.";
  }

  return "I can answer best about Patrick's projects, jobs, skills, Bitcoin/Lightning/Nostr work, marketing automation work, and contact details. Try asking about Hostr, Sudonym, Evolut, Nestr, 21Bitcoin, or his cloud/backend stack.";
}

function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDemo, setActiveDemo] = useState<DemoSource | null>(null);
  const [portfolioQuestion, setPortfolioQuestion] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const chatPanelRef = useRef<HTMLDivElement | null>(null);
  const chatLogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!activeDemo) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveDemo(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeDemo]);

  useEffect(() => {
    chatLogRef.current?.scrollTo({
      top: chatLogRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatMessages]);

  function submitPortfolioQuestion(question: string) {
    const trimmed = question.trim();
    if (!trimmed) {
      return;
    }

    const now = Date.now();
    setChatMessages((messages) => [
      ...messages,
      { id: now, role: "user", content: trimmed },
      {
        id: now + 1,
        role: "assistant",
        content: getPortfolioAnswer(trimmed),
      },
    ]);
    setPortfolioQuestion("");
    if (window.matchMedia("(max-width: 620px)").matches) {
      window.requestAnimationFrame(() => {
        chatPanelRef.current?.scrollIntoView({
          block: "center",
          behavior: "smooth",
        });
      });
    }
  }

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

            <div
              className="question-panel"
              ref={chatPanelRef}
              aria-label="Portfolio prompts"
            >
              <div className="panel-log" ref={chatLogRef}>
                {chatMessages.length === 0 ? (
                  <p className="prompt">
                    Ask about personal projects or professional employment...
                  </p>
                ) : (
                  <div className="chat-messages" aria-live="polite">
                    {chatMessages.map((message) => (
                      <div
                        className={`chat-message ${message.role}`}
                        key={message.id}
                      >
                        {message.content}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="prompt-row">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => submitPortfolioQuestion(prompt)}
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <form
                className="fake-input"
                onSubmit={(event) => {
                  event.preventDefault();
                  submitPortfolioQuestion(portfolioQuestion);
                }}
              >
                <textarea
                  rows={1}
                  value={portfolioQuestion}
                  placeholder="Ask about personal projects or professional employment..."
                  aria-label="Ask about Patrick Geyer"
                  onChange={(event) => setPortfolioQuestion(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      submitPortfolioQuestion(portfolioQuestion);
                    }
                  }}
                />
                <button
                  type="submit"
                  aria-label="Send portfolio question"
                  disabled={!portfolioQuestion.trim()}
                >
                  <Send size={16} />
                </button>
              </form>
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
            </article>

            <article className="about-tile text-tile">
              <p className="tile-label">Craft</p>
              <h2>Building software in finance, cryptography, marketing.</h2>
              <p>
                I have shipped frontend, backend and cloud components for
                applications serving the marketing, finance and bitcoin
                industries.
              </p>
            </article>

            <article className="about-tile status-tile">
              <p className="tile-label">Base</p>
              <h3>London / Munich / San Salvador</h3>
              <p>Shipping across time zones with a strong bias for self-sovereign rails.</p>
            </article>

            <article className="about-tile signal-tile">
              <p className="tile-label">Signal</p>
              <h3>Open source projects</h3>
              <p>
                Some of my own projects live open source on GitHub. Feel free
                to check them out below or ask about them in the chat above.
              </p>
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
                  <div className="project-actions">
                    <a
                      className={`project-link ${project.repoPrivate ? "private-link" : ""}`}
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {project.repoPrivate ? <LockKeyhole size={16} /> : <GitHubMark />}
                      <span>{project.linkLabel}</span>
                      <ExternalLink size={15} />
                    </a>
                    {project.demo && (
                      <button
                        className="project-demo-button"
                        type="button"
                        onClick={() => setActiveDemo(project.demo ?? null)}
                      >
                        <Play size={16} />
                        <span>Demo</span>
                      </button>
                    )}
                  </div>
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

      {activeDemo && (
        <div className="demo-modal" role="dialog" aria-modal="true" aria-label={activeDemo.title}>
          <button
            className="demo-backdrop"
            type="button"
            aria-label="Close demo"
            onClick={() => setActiveDemo(null)}
          />
          <div className="demo-dialog">
            <div className="demo-header">
              <p className="tile-label">Demo</p>
              <h2>{activeDemo.title}</h2>
              <button
                className="icon-button demo-close"
                type="button"
                aria-label="Close demo"
                onClick={() => setActiveDemo(null)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="demo-player">
              {activeDemo.type === "video" ? (
                <video src={activeDemo.src} controls autoPlay playsInline />
              ) : (
                <iframe
                  src={activeDemo.src}
                  title={activeDemo.title}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </div>
      )}
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
