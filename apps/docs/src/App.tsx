import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { href: "#api", label: "API" },
  { href: "#sdk", label: "SDK" },
  { href: "#mcp", label: "MCP" },
  { href: "#skills", label: "Skills" },
  { href: "#pricing", label: "Pricing" },
  { href: "#dns", label: "DNS" },
  { href: "?view=blog", label: "Blog" },
];

function Nav({ onNavClick }: { onNavClick?: (href: string) => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        height: "var(--nav-height)",
        backgroundColor: scrolled ? "var(--bg)" : "transparent",
        borderBottom: scrolled
          ? "1px solid var(--border)"
          : "1px solid transparent",
        transition: "background-color var(--transition), border var(--transition)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--max-width)",
          margin: "0 auto",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
        }}
      >
        <a
          href="/"
          style={{
            fontWeight: 700,
            fontSize: 18,
            color: "var(--accent)",
            textDecoration: "none",
            letterSpacing: "-0.02em",
          }}
        >
          Talocode Docs
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                if (item.href.startsWith("?")) {
                  e.preventDefault()
                  onNavClick?.(item.href)
                }
              }}
              style={{
                color: "var(--text-dim)",
                textDecoration: "none",
                fontSize: 14,
                transition: "color var(--transition)",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = "var(--text-dim)";
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://github.com/anomalyco/talocode"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "var(--text-dim)",
              textDecoration: "none",
              fontSize: 14,
              transition: "color var(--transition)",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = "var(--text-dim)";
            }}
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id?: string;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      style={{
        padding: "80px 24px",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--max-width)",
          margin: "0 auto",
        }}
      >
        {title && (
          <h2
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "var(--accent)",
              marginBottom: 32,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code
      style={{
        background: "var(--code-bg)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-sm)",
        padding: "2px 6px",
        fontSize: "0.875em",
        color: "var(--accent-dim)",
      }}
    >
      {children}
    </code>
  );
}

function Pre({ children }: { children: React.ReactNode }) {
  return (
    <pre
      style={{
        background: "var(--code-bg)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: 20,
        overflowX: "auto",
        fontSize: 13,
        lineHeight: 1.6,
        color: "var(--accent-dim)",
      }}
    >
      {children}
    </pre>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: React.ReactNode[][] }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: 14,
        }}
      >
        <thead>
          <tr style={{ borderBottom: "1px solid var(--border)" }}>
            {headers.map((h) => (
              <th
                key={h}
                style={{
                  textAlign: "left",
                  padding: "12px 16px",
                  color: "var(--text-muted)",
                  fontWeight: 600,
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              style={{
                borderBottom: "1px solid var(--border)",
                transition: "background var(--transition)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "var(--bg-hover)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  style={{
                    padding: "12px 16px",
                    color: j === 0 ? "var(--accent)" : "var(--text)",
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Hero() {
  return (
    <section
      style={{
        padding: "120px 24px 80px",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
        <h1
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: "var(--accent)",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          Talocode Documentation
        </h1>
        <p
          style={{
            fontSize: 18,
            color: "var(--text-dim)",
            maxWidth: 520,
            lineHeight: 1.6,
          }}
        >
          Guides, references, and resources for the Talocode ecosystem.
        </p>
      </div>
    </section>
  );
}

function ApiSection() {
  return (
    <Section id="api" title="API Reference">
      <p style={{ color: "var(--text-dim)", marginBottom: 24, lineHeight: 1.6 }}>
        Base URL:{" "}
        <Code>https://api.talocode.site</Code>
      </p>
      <p style={{ color: "var(--text-dim)", marginBottom: 24, lineHeight: 1.6 }}>
        Authentication:{" "}
        <Code>Authorization: Bearer $TALOCODE_API_KEY</Code>
      </p>

      <h3
        style={{
          fontSize: 16,
          fontWeight: 600,
          color: "var(--accent)",
          marginBottom: 16,
        }}
      >
        Endpoints
      </h3>

      <Table
        headers={["Namespace", "Description"]}
        rows={[
          ["/v1/tera/*", "Tera API — chat, writing, coding"],
          ["/v1/agent-browser/*", "Web Intelligence — extract & analyze"],
          ["/v1/tradia/*", "Tradia Agentic Trading OS"],
          ["/v1/cliploop/*", "ClipLoop video engine"],
          ["/v1/codra/*", "Codra coding agent"],
          ["/v1/skills/*", "Skills API"],
          ["/mcp", "MCP endpoint"],
        ]}
      />

      <h3
        style={{
          fontSize: 16,
          fontWeight: 600,
          color: "var(--accent)",
          marginTop: 40,
          marginBottom: 16,
        }}
      >
        Example Request
      </h3>

      <Pre>{`curl ${"https://api.talocode.site/v1/tera/chat/completions"} \\
  -H "Authorization: Bearer $TALOCODE_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "mistral-small-latest",
    "messages": [
      {"role": "user", "content": "Hello, Talocode!"}
    ]
  }'`}</Pre>

      <p
        style={{
          color: "var(--text-muted)",
          fontSize: 14,
          marginTop: 24,
          fontStyle: "italic",
        }}
      >
        Tera API endpoints are functional. Other products available after api.talocode.site deployment.
      </p>
    </Section>
  );
}

function SdkSection() {
  return (
    <Section id="sdk" title="SDK Quickstart">
      <p style={{ color: "var(--text-dim)", marginBottom: 24, lineHeight: 1.6 }}>
        Install the <Code>@talocode/sdk</Code> package:
      </p>

      <Pre>{`npm install @talocode/sdk`}</Pre>

      <p style={{ color: "var(--text-dim)", marginBottom: 16, marginTop: 24, lineHeight: 1.6 }}>
        Initialize with your API key:
      </p>

      <Pre>{`import Talocode from "@talocode/sdk";

const talocode = new Talocode({
  apiKey: process.env.TALOCODE_API_KEY,
});`}</Pre>

      <h3
        style={{
          fontSize: 16,
          fontWeight: 600,
          color: "var(--accent)",
          marginTop: 32,
          marginBottom: 16,
        }}
      >
        Usage Examples
      </h3>

      <p style={{ color: "var(--text-dim)", marginBottom: 8, fontWeight: 600, fontSize: 14 }}>
        Tera Chat
      </p>
      <Pre>{`const chat = await talocode.tera.chat({
  model: "mistral-small-latest",
  messages: [{ role: "user", content: "Hello!" }],
});`}</Pre>

      <p style={{ color: "var(--text-dim)", marginBottom: 8, marginTop: 16, fontWeight: 600, fontSize: 14 }}>
        Tera Rewrite
      </p>
      <Pre>{`const rewritten = await talocode.tera.writing.rewrite({
  text: "Original text here",
  tone: "professional",
});`}</Pre>

      <p style={{ color: "var(--text-dim)", marginBottom: 8, marginTop: 16, fontWeight: 600, fontSize: 14 }}>
        Tera Write Code
      </p>
      <Pre>{`const code = await talocode.tera.write({
  language: "python",
  task: "Build a REST API with FastAPI",
  generateTests: true,
});`}</Pre>

      <p style={{ color: "var(--text-dim)", marginBottom: 8, marginTop: 16, fontWeight: 600, fontSize: 14 }}>
        Agent Browser (Web Intelligence)
      </p>
      <Pre>{`const extracted = await talocode.agentBrowser.extract({
  url: "https://example.com",
});

const analysis = await talocode.agentBrowser.analyze({
  url: "https://example.com",
  analysis: ["summary", "sentiment", "entities"],
});`}</Pre>

      <p style={{ color: "var(--text-dim)", marginBottom: 8, marginTop: 16, fontWeight: 600, fontSize: 14 }}>
        Tradia Trading Agent
      </p>
      <Pre>{`import { TradiaClient } from "@talocode/tradia";

const tradia = new TradiaClient({ apiKey: process.env.TALOCODE_API_KEY });
const plan = await tradia.agent.plan({
  goal: "grow",
  accountSize: 10000,
  riskTolerance: "medium",
});
const signal = await tradia.signal.evaluate({
  signal: "BTC breakout above resistance",
  market: "BTC/USD",
});`}</Pre>

      <p style={{ color: "var(--text-dim)", marginBottom: 8, marginTop: 16, fontWeight: 600, fontSize: 14 }}>
        ClipLoop Brief
      </p>
      <Pre>{`const brief = await talocode.cliploop.generate({
  topic: "Product launch",
  duration: 60,
});`}</Pre>

      <p style={{ color: "var(--text-dim)", marginBottom: 8, marginTop: 16, fontWeight: 600, fontSize: 14 }}>
        Skills Generate
      </p>
      <Pre>{`const skill = await talocode.skills.generate.githubProfile({
  username: "octocat",
});`}</Pre>

      <p
        style={{
          color: "var(--text-muted)",
          fontSize: 14,
          marginTop: 24,
          fontStyle: "italic",
        }}
      >
        SDK is published. API backend deployment pending.
      </p>
    </Section>
  );
}

function McpSection() {
  return (
    <Section id="mcp" title="MCP Setup">
      <p style={{ color: "var(--text-dim)", marginBottom: 24, lineHeight: 1.6 }}>
        Talocode provides an MCP server at <Code>@talocode/mcp</Code> or via HTTP.
      </p>

      <p style={{ color: "var(--text-dim)", marginBottom: 8, marginTop: 16, fontWeight: 600, fontSize: 14 }}>
        Endpoint
      </p>
      <p style={{ color: "var(--text-dim)", marginBottom: 24, lineHeight: 1.6 }}>
        <Code>https://api.talocode.site/mcp</Code>
      </p>

      <p style={{ color: "var(--text-dim)", marginBottom: 8, fontWeight: 600, fontSize: 14 }}>
        Authentication
      </p>
      <p style={{ color: "var(--text-dim)", marginBottom: 24, lineHeight: 1.6 }}>
        <Code>Authorization: Bearer $TALOCODE_API_KEY</Code>
      </p>

      <h3
        style={{
          fontSize: 16,
          fontWeight: 600,
          color: "var(--accent)",
          marginTop: 32,
          marginBottom: 16,
        }}
      >
        Cursor Configuration
      </h3>

      <p style={{ color: "var(--text-dim)", marginBottom: 12, lineHeight: 1.6 }}>
        Add to <Code>.cursor/mcp.json</Code>:
      </p>

      <Pre>{`{
  "mcpServers": {
    "talocode": {
      "url": "https://api.talocode.site/mcp",
      "headers": {
        "Authorization": "Bearer $TALOCODE_API_KEY"
      }
    }
  }
}`}</Pre>

      <h3
        style={{
          fontSize: 16,
          fontWeight: 600,
          color: "var(--accent)",
          marginTop: 32,
          marginBottom: 16,
        }}
      >
        Claude Desktop Configuration
      </h3>

      <p style={{ color: "var(--text-dim)", marginBottom: 12, lineHeight: 1.6 }}>
        Add to your Claude Desktop config:
      </p>

      <Pre>{`{
  "mcpServers": {
    "talocode": {
      "command": "npx",
      "args": ["-y", "@talocode/mcp"],
      "env": {
        "TALOCODE_API_KEY": "your-key-here"
      }
    }
  }
}`}</Pre>

      <h3
        style={{
          fontSize: 16,
          fontWeight: 600,
          color: "var(--accent)",
          marginTop: 32,
          marginBottom: 16,
        }}
      >
        Bridge Mode
      </h3>

      <p style={{ color: "var(--text-dim)", lineHeight: 1.6 }}>
        For clients that do not support custom headers, use bridge mode with stdin/stdout transport:
      </p>

      <Pre>{`{
  "mcpServers": {
    "talocode": {
      "command": "npx",
      "args": ["-y", "@talocode/mcp", "--bridge"],
      "env": {
        "TALOCODE_API_KEY": "your-key-here",
        "MCP_HEADERS": "Authorization=Bearer your-key-here"
      }
    }
  }
}`}</Pre>

      <p
        style={{
          color: "var(--text-muted)",
          fontSize: 14,
          marginTop: 24,
          fontStyle: "italic",
        }}
      >
        MCP endpoint pending backend deployment.
      </p>
    </Section>
  );
}

function SkillsSection() {
  return (
    <Section id="skills" title="Skills API">
      <p style={{ color: "var(--text-dim)", marginBottom: 24, lineHeight: 1.6 }}>
        Generate installable AI skill packs from GitHub profiles, repos, docs, and text input.
        Compatible with Cursor, Claude Code, OpenCode, and Codra.
      </p>

      <Table
        headers={["Endpoint", "Price", "Description"]}
        rows={[
          [
            <code key="1" style={{ fontSize: 13, color: "var(--accent-dim)" }}>POST /v1/skills/generate/github-profile</code>,
            "80 credits",
            "Generate a skill pack from a GitHub user profile",
          ],
          [
            <code key="2" style={{ fontSize: 13, color: "var(--accent-dim)" }}>POST /v1/skills/generate/github-repo</code>,
            "100 credits",
            "Generate a skill pack from a GitHub repository",
          ],
          [
            <code key="3" style={{ fontSize: 13, color: "var(--accent-dim)" }}>POST /v1/skills/generate/docs</code>,
            "100 credits",
            "Generate a skill pack from documentation URLs",
          ],
          [
            <code key="4" style={{ fontSize: 13, color: "var(--accent-dim)" }}>POST /v1/skills/generate/text</code>,
            "40 credits",
            "Generate a skill pack from plain text input",
          ],
          [
            <code key="5" style={{ fontSize: 13, color: "var(--accent-dim)" }}>POST /v1/skills/export/cursor</code>,
            "10 credits",
            "Export a skill pack for Cursor (.cursor/rules/)",
          ],
          [
            <code key="6" style={{ fontSize: 13, color: "var(--accent-dim)" }}>POST /v1/skills/export/claude</code>,
            "10 credits",
            "Export a skill pack for Claude Code (CLAUDE.md)",
          ],
          [
            <code key="7" style={{ fontSize: 13, color: "var(--accent-dim)" }}>GET /v1/skills/health</code>,
            "Free",
            "Health check endpoint",
          ],
        ]}
      />
    </Section>
  );
}

function PricingSection() {
  return (
    <Section id="pricing" title="Pricing">
      <p style={{ color: "var(--text-dim)", marginBottom: 24, lineHeight: 1.6 }}>
        Talocode uses a credit system. <strong style={{ color: "var(--accent)" }}>1 credit = $0.01</strong>.
        100 free credits on sign-up. Minimum $5 top-up.
      </p>

      <h3
        style={{
          fontSize: 16,
          fontWeight: 600,
          color: "var(--accent)",
          marginBottom: 16,
        }}
      >
        Product Actions
      </h3>

      <Table
        headers={["Action", "Credits"]}
        rows={[
          ["Tera chat completions", "3"],
          ["Tera writing rewrite", "5"],
          ["Tera writing draft", "10"],
          ["Tera coding explain", "10"],
          ["Tera coding review", "20"],
          ["Tera coding write", "20"],
          ["Web Intelligence extract", "15"],
          ["Web Intelligence analyze", "25"],
          ["Tradia trade propose", "20"],
          ["Tradia signal evaluate", "15"],
          ["Tradia portfolio report", "25"],
          ["ClipLoop video generate", "50"],
          ["Skills generate profile", "80"],
          ["Skills generate repo", "100"],
          ["Skills generate docs", "100"],
          ["Skills generate text", "40"],
          ["Skills export cursor", "10"],
          ["Skills export claude", "10"],
        ]}
      />

      <p style={{ marginTop: 32 }}>
        <a
          href="https://talocode.site/pricing"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "var(--accent)",
            textDecoration: "underline",
            fontSize: 14,
          }}
        >
          View full pricing details →
        </a>
      </p>
    </Section>
  );
}

function DnsSection() {
  return (
    <Section id="dns" title="DNS & Deployment">
      <p style={{ color: "var(--text-dim)", marginBottom: 24, lineHeight: 1.6 }}>
        Talocode domain architecture:
      </p>

      <Table
        headers={["Domain", "Host"]}
        rows={[
          ["talocode.site", "GitHub Pages"],
          ["cloud.talocode.site", "Netlify"],
          ["docs.talocode.site", "Netlify"],
          ["dashboard.talocode.site", "Netlify"],
          ["api.talocode.site", "Backend host"],
        ]}
      />
    </Section>
  );
}

function SecuritySection() {
  return (
    <Section title="Security">
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            padding: 20,
          }}
        >
          <p style={{ color: "var(--text)", lineHeight: 1.6 }}>
            <strong style={{ color: "var(--accent)" }}>Keep API keys secret.</strong>{" "}
            Always use environment variables, never hard-code keys in your source code.
          </p>
        </div>
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            padding: 20,
          }}
        >
          <p style={{ color: "var(--text)", lineHeight: 1.6 }}>
            <strong style={{ color: "var(--accent)" }}>Never commit keys to repos.</strong>{" "}
            Add <Code>.env</Code> to <Code>.gitignore</Code> and use CI/CD secrets for deployment.
          </p>
        </div>
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            padding: 20,
          }}
        >
          <p style={{ color: "var(--text)", lineHeight: 1.6 }}>
            <strong style={{ color: "var(--accent)" }}>Rotate keys if compromised.</strong>{" "}
            Generate a new key from the Cloud dashboard and update your applications immediately.
          </p>
        </div>
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            padding: 20,
          }}
        >
          <p style={{ color: "var(--text)", lineHeight: 1.6 }}>
            <strong style={{ color: "var(--accent)" }}>Key format:</strong>{" "}
            <Code>tk_{"{prefix}"}_{"{random}"}</Code>
          </p>
        </div>
      </div>
    </Section>
  );
}

function FooterSection() {
  const links = [
    { href: "https://github.com/anomalyco/talocode", label: "GitHub" },
    { href: "https://cloud.talocode.site", label: "Cloud" },
    { href: "https://dashboard.talocode.site", label: "Dashboard" },
    { href: "#api", label: "API" },
    { href: "#pricing", label: "Pricing" },
    { href: "#skills", label: "Skills" },
  ];

  return (
    <footer
      style={{
        padding: "48px 24px",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--max-width)",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
        }}
      >
        <span style={{ color: "var(--text-muted)", fontSize: 13 }}>
          &copy; {new Date().getFullYear()} Talocode
        </span>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              style={{
                color: "var(--text-dim)",
                textDecoration: "none",
                fontSize: 13,
                transition: "color var(--transition)",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = "var(--text-dim)";
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

const BLOG_POSTS = [
  {
    slug: "intro-cliploop",
    title: "Introducing ClipLoop: Turn a Sentence Into a Video",
    date: "2026-07-08",
    author: "Talocode Team",
    tags: ["cliploop", "video", "release"],
    excerpt: "ClipLoop is a prompt-to-video engine that turns a natural language description into a structured brief, a scene-by-sceen script, and a rendered video — all from your terminal or JavaScript code.",
    body: `
## What is ClipLoop?

Most video creation tools make you jump between five different apps to get a finished piece of content. ClipLoop is different — it's a **single prompt-to-video pipeline**.

Describe what you want in natural language, and ClipLoop handles the rest:

1. **Brief** — Analyzes your prompt and produces a structured content plan: hook, structure, tone, target audience
2. **Script** — Turns the brief into a scene-by-scene video script with visuals, narration, and timing
3. **Render** — Submits the script to a render engine and returns a downloadable video

## Quick Start

\`\`\`bash
npm install @talocode/cliploop

# Generate a brief
cliploop brief --prompt "explain quantum computing in 60 seconds" --channel youtube

# Generate a script
cliploop script --brief-id brief_abc123 --style educational

# Submit for render
cliploop render --script-id script_def456 --format landscape
\`\`\`

## Use in Code

\`\`\`typescript
import { generateBrief, generateScript, submitRender } from '@talocode/cliploop'

const brief = await generateBrief({
  prompt: 'explain quantum computing in 60 seconds',
  channel: 'youtube',
  duration: 60,
})

const script = await generateScript({
  briefId: brief.id,
  style: 'educational',
})

const render = await submitRender({
  scriptId: script.id,
  format: 'landscape',
})
\`\`\`

## Why It Matters

Video is the most engaging content format, but producing it at scale is expensive and slow. ClipLoop makes video generation **programmable** — you can integrate it into your product, automate your content pipeline, or generate campaign packages with a single command.

The engine works locally with Mistral AI or via the Talocode Cloud API.

[View on GitHub](https://github.com/talocode/stacklane) · [npm](https://www.npmjs.com/package/@talocode/cliploop)
`,
  },
  {
    slug: "intro-tradia",
    title: "Tradia Agentic Trading OS: Your Trading Dashboard in the Terminal",
    date: "2026-07-08",
    author: "Talocode Team",
    tags: ["tradia", "trading", "release"],
    excerpt: "Tradia gives traders a structured workflow — propose trades with risk analysis, journal outcomes, analyze performance, and share accountability — all from the command line.",
    body: `
## Why Tradia?

Every trader hits the same wall: you take a trade, forget why, and repeat the same mistake. Tradia codifies your process so every decision is planned, reviewed, and learned from.

| Without Tradia | With Tradia |
|----------------|-------------|
| Gut-feel entries | Structured proposals with invalidation criteria |
| No trade journal | Journals with lessons and discipline scores |
| No strategy validation | Backtest equity curves and win rates |
| No accountability | Public updates explaining your trades |

## Quick Start

\`\`\`bash
npm install @talocode/tradia

# Propose a trade
tradia propose --symbol XAUUSD --market forex --strategy liquidity_sweep --balance 500 --risk 0.5 --entry 2365.5 --stop 2372 --target 2350

# Journal the result
tradia journal --file trade-result.json

# Analyze performance
tradia performance --file trades.json
\`\`\`

## Use in Code

\`\`\`typescript
import { TradiaClient } from '@talocode/tradia'

const tradia = new TradiaClient()

const proposal = await tradia.trade.propose({
  market: 'forex',
  symbol: 'XAUUSD',
  accountBalance: 500,
  riskPercent: 0.5,
  strategy: 'liquidity_sweep',
  entry: 2365.5,
  stopLoss: 2372,
  takeProfit: 2350,
})
\`\`\`

## What's Included

- **Risk Engine** — Position sizing, drawdown, exposure limits, revenge trading detection
- **Backtest Simulation** — Equity curves, Monte Carlo, strategy comparison
- **Accountability Cards** — Public-facing trade explanations
- **API Server** — REST API for hosted usage
- **MCP Tools** — Integrate with Cursor, Claude, OpenCode

[View on GitHub](https://github.com/talocode/tradia) · [npm](https://www.npmjs.com/package/@talocode/tradia)

**⚠️ Not financial advice. Human review required before acting on any trade.**
`,
  },
  {
    slug: "open-source-ai-infrastructure",
    title: "Building Open-Source Infrastructure for AI-Native Work",
    date: "2026-07-07",
    author: "Abdulmuiz Adeyemo",
    tags: ["talocode", "open-source", "vision"],
    excerpt: "Talocode is building open-source tools that developers trust, backed by a hosted API platform. Here's the philosophy and what we've shipped so far.",
    body: `
## The Philosophy

When we started Talocode, we had one principle: **build open-source tools people trust, sell the hosted power behind them.**

Every Talocode product ships as an open-source package first. You can \`npm install\` it, run it locally, inspect the code, and never touch our servers. When you need scale — cloud rendering, team collaboration, managed infrastructure — that's what the Talocode Cloud API is for.

## What We've Shipped

| Product | Package | What It Does |
|---------|---------|-------------|
| **Tera** | \`@talocode/sdk\` | Chat, writing, code generation |
| **ClipLoop** | \`@talocode/cliploop\` | Prompt-to-video engine |
| **Tradia** | \`@talocode/tradia\` | Agentic trading intelligence |
| **WorkLane** | \`@talocode/worklane\` | AI coworker platform for teams |
| **Codra** | \`@talocode/sdk\` | Code review and planning |

## What's Next

- **Netlify deployment** for api.talocode.site, cloud, docs, and dashboard (pending credit reset)
- **Agent Browser API** — Web Intelligence for extract and analyze
- **Next-gen ClipLoop** — HyperFrames-powered rendering
- **Tradia v0.2** — Multi-strategy backtesting, Telegram integration

All open-source. All MIT licensed. All built in public.

[GitHub](https://github.com/talocode) · [Docs](https://docs.talocode.site) · [npm](https://www.npmjs.com/search?q=%40talocode)
`,
  },
]

function BlogCard({ post, onRead }: { post: typeof BLOG_POSTS[0]; onRead: () => void }) {
  return (
    <article
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: 24,
        cursor: "pointer",
        transition: "border-color var(--transition), transform var(--transition)",
      }}
      onClick={onRead}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--accent)"
        e.currentTarget.style.transform = "translateY(-2px)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)"
        e.currentTarget.style.transform = "none"
      }}
    >
      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        {post.tags.map((t) => (
          <span key={t} style={{
            fontSize: 11,
            fontWeight: 600,
            color: "var(--accent)",
            background: "var(--code-bg)",
            padding: "2px 8px",
            borderRadius: "var(--radius-sm)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}>{t}</span>
        ))}
      </div>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--accent)", marginBottom: 8, lineHeight: 1.3 }}>
        {post.title}
      </h3>
      <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 12 }}>
        {post.date} · {post.author}
      </p>
      <p style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.6 }}>
        {post.excerpt}
      </p>
    </article>
  )
}

function BlogHero() {
  return (
    <section style={{ padding: "120px 24px 60px", borderBottom: "1px solid var(--border)" }}>
      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
        <h1 style={{ fontSize: 48, fontWeight: 800, color: "var(--accent)", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 16 }}>
          Talocode Blog
        </h1>
        <p style={{ fontSize: 18, color: "var(--text-dim)", maxWidth: 520, lineHeight: 1.6 }}>
          Updates, releases, and stories from the Talocode team.
        </p>
      </div>
    </section>
  )
}

function BlogPostPage({ post, onBack }: { post: typeof BLOG_POSTS[0]; onBack: () => void }) {
  const htmlBody = post.body
    .replace(/^## (.+)$/gm, '<h3 style="font-size:20px;font-weight:700;color:var(--accent);margin-top:32px;margin-bottom:16px">$1</h3>')
    .replace(/^### (.+)$/gm, '<h4 style="font-size:16px;font-weight:600;color:var(--accent);margin-top:24px;margin-bottom:12px">$1</h4>')
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:var(--accent)">$1</strong>')
    .replace(/`(.+?)`/g, '<code style="background:var(--code-bg);border:1px solid var(--border);border-radius:var(--radius-sm);padding:2px 6px;font-size:0.875em;color:var(--accent-dim)">$1</code>')
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre style="background:var(--code-bg);border:1px solid var(--border);border-radius:var(--radius);padding:20px;overflow-x:auto;font-size:13px;line-height:1.6;color:var(--accent-dim)">$2</pre>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" style="color:var(--accent);text-decoration:underline" target="_blank" rel="noopener">$1</a>')
    .replace(/\|(.+)\|/g, (m) => {
      if (m.includes("---")) return ""
      const cells = m.split("|").filter(Boolean).map((c: string) => c.trim())
      if (cells.length < 2) return m
      return `<tr>${cells.map((c: string) => `<td style="padding:8px 12px;color:var(--text);border-bottom:1px solid var(--border);font-size:14px">${c}</td>`).join("")}</tr>`
    })
    .replace(/\n\n/g, '</p><p style="color:var(--text-dim);line-height:1.6;margin-bottom:16px">')
    .replace(/<pre/g, '</p><pre')
    .replace(/<\/pre>/g, '</pre><p style="color:var(--text-dim);line-height:1.6;margin-bottom:16px">')
    .replace(/<\/?p[^>]*>/g, "")

  return (
    <section style={{ padding: "60px 24px 80px" }}>
      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            color: "var(--accent)",
            cursor: "pointer",
            fontSize: 14,
            padding: 0,
            marginBottom: 24,
            fontFamily: "inherit",
          }}
        >
          ← Back to blog
        </button>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: "var(--accent)", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 12 }}>
          {post.title}
        </h1>
        <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 32 }}>
          {post.date} · {post.author}
        </p>
        <div style={{ color: "var(--text-dim)", lineHeight: 1.8, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: htmlBody }} />
      </div>
    </section>
  )
}

function BlogPage({ onBack }: { onBack: () => void }) {
  const [selectedPost, setSelectedPost] = useState<typeof BLOG_POSTS[0] | null>(null)

  if (selectedPost) {
    return <BlogPostPage post={selectedPost} onBack={() => setSelectedPost(null)} />
  }

  return (
    <>
      <BlogHero />
      <section style={{ padding: "40px 24px 80px" }}>
        <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>
          {BLOG_POSTS.map((post) => (
            <BlogCard key={post.slug} post={post} onRead={() => setSelectedPost(post)} />
          ))}
        </div>
      </section>
    </>
  )
}

export default function App() {
  const [view, setView] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      return params.get("view") || "docs"
    }
    return "docs"
  })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const current = params.get("view") || "docs"
    if (current !== view) {
      const newParams = view === "docs" ? "" : `?view=${view}`
      window.history.replaceState(null, "", newParams || "/")
    }
  }, [view])

  const handleNavClick = (href: string) => {
    if (href.startsWith("?")) {
      const param = href.replace("?", "")
      setView(new URLSearchParams(param).get("view") || "docs")
    }
  }

  if (view === "blog") {
    return (
      <div style={{ minHeight: "100vh" }}>
        <Nav onNavClick={handleNavClick} />
        <main>
          <BlogPage onBack={() => setView("docs")} />
        </main>
        <FooterSection />
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      <Nav onNavClick={handleNavClick} />
      <main>
        <Hero />
        <ApiSection />
        <SdkSection />
        <McpSection />
        <SkillsSection />
        <PricingSection />
        <DnsSection />
        <SecuritySection />
      </main>
      <FooterSection />
    </div>
  );
}
