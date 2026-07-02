const products = [
  {
    name: "Tera",
    desc: "Writing and coding capabilities via REST API. Rewrite, draft, explain, and review content and code.",
    status: "pending",
  },
  {
    name: "Codra",
    desc: "Hosted AI coding agent API for repo analysis, code explanation, review, and plan generation.",
    status: "pending",
  },
  {
    name: "Agent Browser",
    desc: "Browser validation layer for AI agents. Programmatic browser control and assertion API.",
    status: "pending",
  },
  {
    name: "ClipLoop",
    desc: "Short-form promo video engine. Generate product videos from templates via API.",
    status: "pending",
  },
  {
    name: "Skills",
    desc: "Generate installable AI skill packs (SKILL.md) from GitHub profiles, repos, docs, and text input.",
    status: "pending",
  },
  {
    name: "Router",
    desc: "OpenAI-compatible chat completions with multi-provider fallback and usage metering.",
    status: "pending",
  },
  {
    name: "Tradia",
    desc: "Trading signal infrastructure. Coming soon.",
    status: "soon",
  },
  {
    name: "SignalLane",
    desc: "Real-time signal processing pipeline. Coming soon.",
    status: "soon",
  },
  {
    name: "WorkLane",
    desc: "Agentic workflow orchestration layer. Coming soon.",
    status: "soon",
  },
];

const quickstartCode = `import { Talocode } from "@talocode/sdk";

const talo = new Talocode({
  apiKey: process.env.TALOCODE_API_KEY,
});

const result = await talo.tera.writing.rewrite({
  text: "The quick brown fox jumps over the lazy dog.",
  tone: "formal",
});

console.log(result.text);`;

const mcpConfig = `{
  "mcpServers": {
    "talocode": {
      "url": "https://api.talocode.site/mcp",
      "headers": {
        "Authorization": "Bearer $TALOCODE_API_KEY"
      }
    }
  }
}`;

function Nav() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-14 border-b flex items-center px-6"
      style={{
        backgroundColor: "#0a0a0a",
        borderColor: "#222222",
      }}
    >
      <div
        className="mx-auto flex w-full items-center justify-between"
        style={{ maxWidth: "960px" }}
      >
        <span className="text-sm font-semibold tracking-tight text-white">
          Talocode Cloud
        </span>
        <div className="flex items-center gap-6 text-sm" style={{ color: "#888888" }}>
          <a href="#products" className="transition-colors hover:text-white">
            Products
          </a>
          <a href="#pricing" className="transition-colors hover:text-white">
            Pricing
          </a>
          <a href="#quickstart" className="transition-colors hover:text-white">
            Quickstart
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section
      className="flex min-h-[80vh] flex-col items-center justify-center px-6 pt-14 text-center"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <div style={{ maxWidth: "640px" }}>
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-white sm:text-6xl">
          Talocode Cloud
        </h1>
        <p
          className="mb-3 text-lg sm:text-xl"
          style={{ color: "#888888" }}
        >
          One API key for all Talocode product APIs.
        </p>
        <p className="mb-8 text-sm leading-relaxed" style={{ color: "#666666" }}>
          REST APIs, SDK, and MCP for Router, Tera, Codra, Agent Browser, ClipLoop, and Skills.
          Unified billing, one endpoint, developer-first tooling.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://docs.talocode.site"
            className="inline-flex h-10 items-center rounded-[10px] px-5 text-sm font-medium text-[#0a0a0a] transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#ffffff" }}
          >
            Docs
          </a>
          <span
            className="inline-flex h-10 cursor-not-allowed items-center rounded-[10px] border px-5 text-sm font-medium opacity-50"
            style={{
              borderColor: "#222222",
              color: "#888888",
            }}
            title="Coming soon"
          >
            Dashboard
          </span>
          <a
            href="https://github.com/talocode"
            className="inline-flex h-10 items-center rounded-[10px] border px-5 text-sm font-medium transition-colors hover:bg-[#1e1e1e]"
            style={{
              borderColor: "#222222",
              color: "#e5e5e5",
            }}
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

function ApiDetails() {
  return (
    <section
      className="border-y px-6 py-16"
      style={{
        backgroundColor: "#111111",
        borderColor: "#222222",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "640px" }}>
        <h2 className="mb-6 text-2xl font-semibold text-white">
          API Reference
        </h2>
        <div className="mb-6 space-y-3 text-sm leading-relaxed">
          <div>
            <span className="font-medium text-white">Base URL:</span>{" "}
            <code
              className="rounded px-2 py-0.5 text-sm"
              style={{
                backgroundColor: "#0d0d0d",
                color: "#60a5fa",
                border: "1px solid #222222",
              }}
            >
              https://api.talocode.site
            </code>
          </div>
          <div>
            <span className="font-medium text-white">Auth:</span>{" "}
            <code
              className="rounded px-2 py-0.5 text-sm"
              style={{
                backgroundColor: "#0d0d0d",
                color: "#4ade80",
                border: "1px solid #222222",
              }}
            >
              Authorization: Bearer $TALOCODE_API_KEY
            </code>
          </div>
          <div className="pt-2">
            <span className="font-medium text-white">Namespaced APIs:</span>
          </div>
          <ul className="ml-4 space-y-1" style={{ color: "#888888" }}>
            {[
              "/v1/router/*",
              "/v1/tera/*",
              "/v1/agent-browser/*",
              "/v1/cliploop/*",
              "/v1/codra/*",
              "/v1/skills/*",
            ].map((endpoint) => (
              <li key={endpoint} className="font-mono text-sm">
                {endpoint}
              </li>
            ))}
          </ul>
        </div>
        <div
          className="rounded-[10px] border p-4 text-sm"
          style={{
            backgroundColor: "#161616",
            borderColor: "#2a2a2a",
            color: "#facc15",
          }}
        >
          API deployment pending. Endpoints are not yet live.
        </div>
      </div>
    </section>
  );
}

function Products() {
  return (
    <section
      id="products"
      className="px-6 py-16"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <div className="mx-auto" style={{ maxWidth: "960px" }}>
        <h2 className="mb-8 text-2xl font-semibold text-white">Products</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div
              key={p.name}
              className="rounded-[10px] border p-5 transition-colors"
              style={{
                backgroundColor: "#161616",
                borderColor: p.status === "soon" ? "#1a1a1a" : "#222222",
                opacity: p.status === "soon" ? 0.5 : 1,
              }}
            >
              <div className="mb-1.5 flex items-center justify-between">
                <h3
                  className="text-base font-semibold"
                  style={{
                    color: p.status === "soon" ? "#666666" : "#ffffff",
                  }}
                >
                  {p.name}
                </h3>
                {p.status === "soon" && (
                  <span
                    className="rounded-[8px] px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider"
                    style={{
                      backgroundColor: "#111111",
                      color: "#666666",
                      border: "1px solid #222222",
                    }}
                  >
                    Soon
                  </span>
                )}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#888888" }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSnapshot() {
  return (
    <section
      id="pricing"
      className="border-y px-6 py-16"
      style={{
        backgroundColor: "#111111",
        borderColor: "#222222",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "640px" }}>
        <h2 className="mb-6 text-2xl font-semibold text-white">Pricing</h2>
        <div className="space-y-3 text-sm leading-relaxed" style={{ color: "#888888" }}>
          <p>
            <span className="text-white">1 credit = $0.01 USD</span> — pay per use,
            no subscriptions.
          </p>
          <p>
            <span className="text-white">100 free credits</span> on signup to try
            every API.
          </p>
          <p>
            <span className="text-white">Minimum top-up:</span> 500 credits ($5).
          </p>
          <p>
            Credits never expire. Use any product, any endpoint. One wallet for
            the entire platform.
          </p>
        </div>
        <a
          href="https://docs.talocode.site/pricing"
          className="mt-6 inline-flex h-10 items-center rounded-[10px] border px-5 text-sm font-medium transition-colors hover:bg-[#1e1e1e]"
          style={{
            borderColor: "#222222",
            color: "#e5e5e5",
          }}
        >
          Full pricing &rarr;
        </a>
      </div>
    </section>
  );
}

function SdkQuickstart() {
  return (
    <section
      id="quickstart"
      className="px-6 py-16"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <div className="mx-auto" style={{ maxWidth: "640px" }}>
        <h2 className="mb-2 text-2xl font-semibold text-white">
          SDK Quickstart
        </h2>
        <p className="mb-6 text-sm" style={{ color: "#888888" }}>
          <code className="text-white">@talocode/sdk</code> &mdash; TypeScript
          SDK for all Talocode APIs.
        </p>
        <pre
          className="overflow-x-auto rounded-[10px] border p-4 text-sm leading-relaxed"
          style={{
            backgroundColor: "#0d0d0d",
            borderColor: "#222222",
            color: "#e5e5e5",
          }}
        >
          <code>{quickstartCode}</code>
        </pre>
        <p className="mt-4 text-sm" style={{ color: "#facc15" }}>
          SDK is available. API backend deployment pending.
        </p>
      </div>
    </section>
  );
}

function McpQuickstart() {
  return (
    <section
      className="border-y px-6 py-16"
      style={{
        backgroundColor: "#111111",
        borderColor: "#222222",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "640px" }}>
        <h2 className="mb-2 text-2xl font-semibold text-white">
          MCP Quickstart
        </h2>
        <p className="mb-6 text-sm" style={{ color: "#888888" }}>
          <code className="text-white">@talocode/mcp</code> &mdash; Model Context
          Protocol server for AI agent integration.
        </p>
        <div className="mb-3 space-y-1 text-sm" style={{ color: "#888888" }}>
          <p>
            <span className="text-white">Endpoint:</span>{" "}
            <code
              className="rounded px-1.5 py-0.5"
              style={{
                backgroundColor: "#0d0d0d",
                color: "#60a5fa",
                border: "1px solid #222222",
              }}
            >
              https://api.talocode.site/mcp
            </code>
          </p>
          <p>
            <span className="text-white">Auth:</span>{" "}
            <code
              className="rounded px-1.5 py-0.5"
              style={{
                backgroundColor: "#0d0d0d",
                color: "#4ade80",
                border: "1px solid #222222",
              }}
            >
              Bearer $TALOCODE_API_KEY
            </code>
          </p>
        </div>
        <pre
          className="overflow-x-auto rounded-[10px] border p-4 text-sm leading-relaxed"
          style={{
            backgroundColor: "#0d0d0d",
            borderColor: "#222222",
            color: "#e5e5e5",
          }}
        >
          <code>{mcpConfig}</code>
        </pre>
        <p className="mt-4 text-sm" style={{ color: "#facc15" }}>
          MCP endpoint pending backend deployment.
        </p>
      </div>
    </section>
  );
}

function StatusSection() {
  return (
    <section
      className="px-6 py-16"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <div className="mx-auto" style={{ maxWidth: "640px" }}>
        <div
          className="rounded-[10px] border p-6"
          style={{
            backgroundColor: "#161616",
            borderColor: "#222222",
          }}
        >
          <h2 className="mb-4 text-lg font-semibold text-white">
            Deployment Status
          </h2>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <span
                className="inline-block h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: "#facc15" }}
              />
              <span style={{ color: "#888888" }}>
                <span className="text-white">Cloud Dashboard</span> &mdash; Backend API
                deployment pending
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span
                className="inline-block h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: "#888888" }}
              />
              <span style={{ color: "#666666" }}>
                <span style={{ color: "#888888" }}>Wallet / Top-ups</span> &mdash; Coming
                next
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span
                className="inline-block h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: "#888888" }}
              />
              <span style={{ color: "#666666" }}>
                <span style={{ color: "#888888" }}>Full API availability</span> &mdash;
                After api.talocode.site deployment
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const links = [
    { label: "GitHub", href: "https://github.com/talocode" },
    { label: "Docs", href: "https://docs.talocode.site" },
    { label: "Dashboard", href: "https://dashboard.talocode.site" },
    { label: "Pricing", href: "https://docs.talocode.site/pricing" },
    { label: "API", href: "https://api.talocode.site" },
  ];

  return (
    <footer
      className="border-t px-6 py-8"
      style={{
        backgroundColor: "#111111",
        borderColor: "#222222",
      }}
    >
      <div
        className="mx-auto flex flex-col items-center gap-4 sm:flex-row sm:justify-between"
        style={{ maxWidth: "960px" }}
      >
        <span className="text-sm font-semibold text-white">Talocode Cloud</span>
        <div className="flex flex-wrap items-center gap-5 text-sm" style={{ color: "#888888" }}>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-white"
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
    <div style={{ backgroundColor: "#0a0a0a", minHeight: "100vh" }}>
      <Nav />
      <main>
        <Hero />
        <ApiDetails />
        <Products />
        <PricingSnapshot />
        <SdkQuickstart />
        <McpQuickstart />
        <StatusSection />
      </main>
      <Footer />
    </div>
  );
}
