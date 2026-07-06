# Talocode Cloud

Talocode Cloud is the hosted API layer for the Talocode ecosystem. A single `TALOCODE_API_KEY` unlocks access to every product API with unified prepaid billing.

## Authentication

Include your API key in every request:

```
Authorization: Bearer tk_dev_xxxxxxxxxxxx
```

Keys are generated per project from the [Cloud Dashboard](https://cloud.talocode.site).

## Wallet and Credits

- **1 credit = $0.01 USD**
- New projects receive **100 free credits** ($1.00)
- **Minimum top-up**: 500 credits ($5.00)
- Credits never expire
- Usage is deducted per-request based on the action pricing

## Billing Model

Pay-per-use, prepaid wallet. No monthly subscriptions. No surprise bills.

1. Top up your wallet via Stripe
2. Use any product API
3. Credits are deducted automatically
4. Insufficient credits returns HTTP 402 with `required` and `available` values

## OpenAI-Compatible Router

The router at `POST /v1/chat/completions` provides an OpenAI-compatible chat completion endpoint that routes requests through multiple AI providers with automatic fallback.

### Supported Providers

| Provider | Flagship Models | Best For |
|----------|----------------|----------|
| [OpenAI](https://platform.openai.com) | GPT-5.4, GPT-5.4-mini, o3 | General purpose, tool use, ecosystem breadth |
| [Anthropic](https://docs.anthropic.com/en/docs) | Claude Opus 4.8, Sonnet 4.6, Haiku 4.5 | Coding, long-form reasoning, agentic workflows |
| [Google Gemini](https://ai.google.dev) | Gemini 3.1 Pro, 3.5 Flash, 2.5 Flash-Lite | Multimodal, long context, best price-performance |
| [xAI Grok](https://x.ai/api) | Grok 4.3, Grok Build 0.1 | Coding, large context, real-time data |
| [DeepSeek](https://platform.deepseek.com) | DeepSeek V4 Pro, V4 Flash | Ultra-low cost, OpenAI-compatible, cache discounts |
| [Mistral](https://mistral.ai) | Mistral Large 3, Mistral Small 4 | EU data residency, efficient open-weight models |
| [Meta Llama](https://llama.meta.com) | Llama 4 Maverick, Llama 4 Scout | Self-hosting, open-weight, 10M context (Scout) |
| [Cohere](https://cohere.com) | Command A, Command R+ | Enterprise RAG, embeddings, classification |
| [Perplexity](https://docs.perplexity.ai) | Sonar Pro | Real-time, citation-grounded answers |
| [Together](https://together.ai) | Llama 4, DeepSeek, Mistral (hosted) | Multi-model platform, fast inference |
| [Groq](https://groq.com) | Llama 4, DeepSeek R1, Mixtral | Ultra-low latency inference |

### Models

| Model | Fallback Order | Use Case |
|-------|---------------|----------|
| `talocode/auto` | openrouter → openai → anthropic → gemini → grok → deepseek | General purpose, automatic best choice |
| `talocode/fast` | groq → gemini → mistral → deepseek | Low-latency, simple tasks |
| `talocode/coding` | openrouter → anthropic → openai → grok | Code generation and reasoning |

### Pricing per Model

| Model | Per Request | Per 1K Input Tokens | Per 1K Output Tokens |
|-------|-------------|---------------------|----------------------|
| talocode/auto | 4 credits | 2 credits | 3 credits |
| talocode/fast | 2 credits | 1 credit | 2 credits |
| talocode/coding | 5 credits | 3 credits | 6 credits |

## Product APIs

Every Talocode product exposes its API through Talocode Cloud with the same authentication and billing.

| Product | Example Action | Credits |
|---------|---------------|---------|
| Agent Browser | `browser.check` | 5 |
| Agent Browser | `browser.screenshot` | 8 |
| Agent Browser | `browser.evidence` | 8 |
| Tera Context | `context.capture` | 5 |
| ClipLoop | `brief.generate` | 15 |
| ClipLoop | `script.generate` | 15 |
| ClipLoop | `video.render` | 200 |
| ClipLoop | `campaign.create` | 50 |
| ClipLoop | `campaign.package` | 400 |
| Codra | `repo.summary` | 50 |
| Codra | `explain` | 20 |
| Codra | `review` | 40 |
| Codra | `plan` | 40 |
| Tradia | `performance.analyze` | 20 |
| Skills | `generate.github_profile` | 80 |
| Skills | `generate.github_repo` | 100 |
| Skills | `generate.docs` | 100 |
| Skills | `generate.text` | 40 |
| Skills | `export.cursor` | 10 |
| Skills | `export.claude` | 10 |
| WebDataLane | `fetch` | 5 |
| WebDataLane | `extract` | 10 |
| WebDataLane | `markdown` | 10 |
| WebDataLane | `metadata` | 5 |
| WebDataLane | `links` | 5 |
| WebDataLane | `structured` | 20 |
| WebDataLane | `crawl.plan` | 15 |
| WebDataLane | `screenshot` | 50 |
| InvoiceLane | `extract` | 20 |
| InvoiceLane | `receipt.extract` | 20 |
| InvoiceLane | `invoice.extract` | 30 |
| InvoiceLane | `validate` | 10 |
| InvoiceLane | `export.csv` | 5 |
| UGCLane | `strategy.generate` | 30 |
| UGCLane | `competitor.analyze` | 40 |
| UGCLane | `hooks.generate` | 20 |
| UGCLane | `scripts.generate` | 40 |
| UGCLane | `accounts.plan` | 30 |
| UGCLane | `calendar.generate` | 60 |
| UGCLane | `experiments.generate` | 30 |
| UGCLane | `report.generate` | 40 |
| UGCLane | `export.markdown` | 5 |
| UGCLane | `export.json` | 5 |
| CrawlerLane | `logs.ingest` | 5 |
| CrawlerLane | `bots.classify` | 2 |
| CrawlerLane | `pages.analyze` | 20 |
| CrawlerLane | `404.analyze` | 20 |
| CrawlerLane | `ai_visibility.score` | 30 |
| CrawlerLane | `report.generate` | 40 |
| CrawlerLane | `sitemap.suggest` | 20 |
| CrawlerLane | `robots.audit` | 15 |
| CrawlerLane | `export.markdown` | 5 |
| CrawlerLane | `export.json` | 5 |

Full pricing is available at `GET /api/v1/cloud/pricing`.

## MCP (Model Context Protocol)

Talocode MCP exposes all product APIs through the Model Context Protocol at:

```
POST https://api.talocode.site/mcp
```

Auth: `Authorization: Bearer $TALOCODE_API_KEY`

Two connection modes:
- **Direct HTTP** — For clients supporting custom headers: point to `POST /mcp` with `Authorization: Bearer $TALOCODE_API_KEY`
- **Local Bridge** — For clients that cannot send custom headers: use `npx @talocode/mcp` as a local proxy

See [MCP docs](./docs/mcp.md).

## Base URL

```
TALOCODE_BASE_URL=https://api.talocode.site
```

## SDK

Official SDK: `@talocode/sdk` (currently available as `@stacklane/sdk`).

Talocode Cloud gives every Talocode product one programmable API surface. Use `TALOCODE_API_KEY` to call Tera, ClipLoop, Agent Browser, Codra, Tradia, SignalLane, WorkLane, InvoiceLane, UGCLane, and future hosted services.

```ts
import { Talocode } from "@talocode/sdk";

const talocode = new Talocode({ apiKey: process.env.TALOCODE_API_KEY });

await talocode.tera.writing.rewrite({ text: "Hello", style: "clear" });
await talocode.router.chat({ model: "talocode/auto", messages: [{ role: "user", content: "Hi" }] });
await talocode.agentBrowser.check({ url: "https://example.com", screenshot: true });
await talocode.cliploop.brief({ prompt: "Weekly promo", channel: "twitter" });
await talocode.cliploop.script({ briefId: "brief_xxx", style: "storytelling" });
await talocode.cliploop.render({ scriptId: "script_xxx", format: "portrait" });
await talocode.cliploop.campaign.create({ name: "Q3 Promo", platform: "tiktok" });
await talocode.cliploop.campaign.package({ campaignId: "camp_xxx" });
await talocode.codra.repoSummary({ files: [{ path: "src/main.ts", content: "..." }] });
await talocode.codra.explain({ language: "typescript", code: "const x = 1", level: "beginner" });
await talocode.codra.review({ language: "typescript", code: "function f() {}", focus: ["bugs"] });
await talocode.codra.plan({ task: "Add auth", constraints: ["no secrets"] });
await talocode.skills.generate.githubProfile({ username: "octocat", target: "cursor" });
await talocode.skills.generate.githubRepo({ repoUrl: "https://github.com/talocode/codra", target: "cursor" });
await talocode.skills.generate.docs({ url: "https://docs.example.com/api", target: "cursor" });
await talocode.skills.generate.text({ name: "my-project", content: "...", target: "cursor" });
await talocode.webdatalane.markdown({ url: "https://example.com" });
await talocode.webdatalane.extract({ url: "https://example.com", include: ["metadata", "links", "headings"] });
await talocode.webdatalane.metadata({ url: "https://example.com" });
await talocode.webdatalane.links({ url: "https://example.com", internalOnly: true });
await talocode.webdatalane.structured({ url: "https://example.com", schema: { title: "string", price: "string" } });
await talocode.webdatalane.crawl.plan({ url: "https://example.com", maxPages: 10 });
await talocode.crawlerlane.bots.classify({ userAgent: "ChatGPT-User" });
await talocode.crawlerlane.report.generate({ domain: "talocode.site", logs: [] });
await talocode.opensourcelane.alternatives.find({ replace: "Jira", teamSize: 6 });
await talocode.opensourcelane.migration.plan({ from: "Jira", to: "hudy9x/namviek", teamSize: 6 });
await talocode.forgecad.design.generate({ projectType: "enclosure", description: "Arduino enclosure", dimensions: { length: 120, width: 80, height: 40, unit: "mm" }, material: "PETG" });
await talocode.invoicelane.extract({ text: "INVOICE #1234 dated 2026-01-15..." });
await talocode.invoicelane.invoice.extract({ text: "INVOICE #1234..." });
await talocode.invoicelane.receipt.extract({ text: "RECEIPT from Store..." });
await talocode.invoicelane.validate({ text: "INVOICE #1234..." });
await talocode.invoicelane.export.csv({ data: {...} });
await talocode.ugclane.hooks.generate({ product: "AI note-taking app", positioning: "faster than typing", tone: "bold", count: 5 });
await talocode.ugclane.scripts.generate({ product: "AI note-taking app", hook: "Stop typing. Start thinking.", platform: "tiktok", duration: "60s" });
await talocode.ugclane.accounts.plan({ brand: "MyApp", product: "AI note-taking app", platforms: ["twitter", "linkedin"] });
await talocode.ugclane.calendar.generate({ brand: "MyApp", product: "AI note-taking app", month: "2026-08", platforms: ["twitter", "linkedin"] });
await talocode.ugclane.experiments.generate({ product: "AI note-taking app", goal: "maximize engagement", variables: ["hook_style"] });
```

### API Key Migration

| Product | Old Key | New Key | Status |
|---------|---------|---------|--------|
| ClipLoop | `CLIPLOOP_API_KEY` | `TALOCODE_API_KEY` | `CLIPLOOP_API_KEY` deprecated — use `TALOCODE_API_KEY` |
| Codra | — | `TALOCODE_API_KEY` | Standard — new hosted API |
| UGCLane | — | `TALOCODE_API_KEY` | Standard |
| All others | — | `TALOCODE_API_KEY` | Standard |

See the [SDK docs](https://github.com/talocode/stacklane/blob/main/docs/TALOCODE_SDK.md) for full usage.

## API Namespaces

Every product has a namespaced route under `/v1/{product}/`. Legacy non-namespaced routes continue to work for backward compatibility.

| Product | Namespace | Example |
|---------|-----------|---------|
| Router | `/v1/router/` | `POST /v1/router/chat/completions` |
| Tera | `/v1/tera/` | `POST /v1/tera/writing/rewrite` |
| Agent Browser | `/v1/agent-browser/` | `POST /v1/agent-browser/browser/check` |
| ClipLoop | `/v1/cliploop/` | `POST /v1/cliploop/brief/generate` |
| Codra | `/v1/codra/` | `POST /v1/codra/repo-summary` |
| Skills | `/v1/skills/` | `POST /v1/skills/generate/github-profile` |
| SignalLane | `/v1/signallane/` | `POST /v1/signallane/x/analyze` |
| WebDataLane | `/v1/webdatalane/` | `POST /v1/webdatalane/markdown` |
| CrawlerLane | `/v1/crawlerlane/` | `POST /v1/crawlerlane/report/generate` |
| OpenSourceLane | `/v1/opensourcelane/` | `POST /v1/opensourcelane/alternatives/find` |
| ForgeCAD | `/v1/forgecad/` | `POST /v1/forgecad/design/generate` |
| UGCLane | `/v1/ugclane/` | `POST /v1/ugclane/hooks/generate` |
| InvoiceLane | `/v1/invoicelane/` | `POST /v1/invoicelane/extract` |

## Endpoints

| Method | Path (Legacy) | Path (Namespaced) | Auth | Description |
|--------|---------------|-------------------|------|-------------|
| GET | `/v1/models` | `/v1/router/models` | None | List available models |
| POST | `/v1/chat/completions` | `/v1/router/chat/completions` | API Key | Chat completion with provider routing |
| POST | `/api/v1/cloud/usage/charge` | — | API Key | Charge credits for an action |
| GET | `/api/v1/cloud/pricing` | — | None | List full pricing catalog |
| GET | `/api/v1/cloud/projects/{id}/wallet` | — | Session | Wallet balance |
| GET | `/api/v1/cloud/projects/{id}/usage` | — | Session | Usage history |
| POST | `/v1/skills/generate/github-profile` | — | API Key | Generate skill from GitHub profile |
| POST | `/v1/skills/generate/github-repo` | — | API Key | Generate skill from GitHub repo |
| POST | `/v1/skills/generate/docs` | — | API Key | Generate skill from docs URL |
| POST | `/v1/skills/generate/text` | — | API Key | Generate skill from text |
| POST | `/v1/skills/export/cursor` | — | API Key | Export skill for Cursor |
| POST | `/v1/skills/export/claude` | — | API Key | Export skill for Claude Code |
| GET | `/v1/skills/health` | — | API Key | Skills API health |

## Status

Talocode Cloud is **experimental**. APIs are working but may evolve. Backward compatibility will be maintained where possible.
