import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { href: "#api", label: "API" },
  { href: "#sdk", label: "SDK" },
  { href: "#mcp", label: "MCP" },
  { href: "#skills", label: "Skills" },
  { href: "#pricing", label: "Pricing" },
  { href: "#dns", label: "DNS" },
];

function Nav() {
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
          ["/v1/router/*", "Router chat completions"],
          ["/v1/tera/*", "Tera writing / coding"],
          ["/v1/agent-browser/*", "Browser validation"],
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

      <Pre>{`curl ${"https://api.talocode.site/v1/router/chat/completions"} \\
  -H "Authorization: Bearer $TALOCODE_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "talocode/auto",
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
        Full API available after api.talocode.site deployment.
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
        Router Chat
      </p>
      <Pre>{`const completion = await talocode.router.chat({
  model: "talocode/auto",
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
        Router Models
      </h3>

      <Table
        headers={["Model", "Credits per 1M input tokens", "Credits per 1M output tokens"]}
        rows={[
          ["talocode/auto", "25", "100"],
          ["talocode/fast", "10", "40"],
          ["talocode/coding", "40", "150"],
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
        Product Actions
      </h3>

      <Table
        headers={["Action", "Credits"]}
        rows={[
          ["Tera writing rewrite", "20"],
          ["Tera coding review", "30"],
          ["ClipLoop video generate", "50"],
          ["Skills generate profile", "80"],
          ["Skills generate repo", "100"],
          ["Skills generate docs", "100"],
          ["Skills generate text", "40"],
          ["Skills export cursor", "10"],
          ["Skills export claude", "10"],
          ["Agent Browser session", "15 / min"],
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

export default function App() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Nav />
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
