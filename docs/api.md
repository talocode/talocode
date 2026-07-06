# Talocode Cloud API

Base URL: `https://api.talocode.site` (set `TALOCODE_BASE_URL` env var to override)

## SDK

Official SDK: `@talocode/sdk` (currently available as `@stacklane/sdk`).

One API key (`TALOCODE_API_KEY`). One base URL (`TALOCODE_BASE_URL`). Every Talocode product is programmable through Talocode Cloud.

```ts
import { Talocode } from "@talocode/sdk";

const talocode = new Talocode({
  apiKey: process.env.TALOCODE_API_KEY,
});

// Tera — writing and coding capabilities
const result = await talocode.tera.writing.rewrite({ text: "Hello world", style: "clear" });

// ClipLoop — video generation
const brief = await talocode.cliploop.brief({ prompt: "Weekly promo", channel: "twitter" });
const script = await talocode.cliploop.script({ briefId: brief.data.briefId, style: "storytelling" });
const render = await talocode.cliploop.render({ scriptId: script.data.scriptId, format: "portrait" });
const campaign = await talocode.cliploop.campaign.create({ name: "Q3 Promo", platform: "tiktok" });
const packaged = await talocode.cliploop.campaign.package({ campaignId: campaign.data.campaignId });

// Agent Browser — website validation
const check = await talocode.agentBrowser.check({ url: "https://example.com", screenshot: true });

// Router — chat completions
const chat = await talocode.router.chat({ model: "talocode/auto", messages: [{ role: "user", content: "Hi" }] });

// Codra — hosted coding capabilities
const summary = await talocode.codra.repoSummary({ files: [{ path: "src/main.ts", content: "..." }] });
const explain = await talocode.codra.explain({ language: "typescript", code: "const x = 1", level: "beginner" });
const review = await talocode.codra.review({ language: "typescript", code: "function f() {}", focus: ["bugs"] });
const plan = await talocode.codra.plan({ task: "Add auth", constraints: ["no secrets"] });
```

```ts
// WebDataLane — web extraction
const page = await talocode.webdatalane.markdown({ url: "https://example.com" });
const meta = await talocode.webdatalane.metadata({ url: "https://example.com" });
const links = await talocode.webdatalane.links({ url: "https://example.com", internalOnly: true });
const structured = await talocode.webdatalane.structured({
  url: "https://example.com",
  schema: { title: "string", price: "string" },
  hints: { title: ["h1"], price: [".price"] }
});
const plan = await talocode.webdatalane.crawl.plan({ url: "https://example.com", maxPages: 10 });
```

### API Key Migration

ClipLoop previously used `CLIPLOOP_API_KEY`. This is now **deprecated** in favor of `TALOCODE_API_KEY`. The old key still works as a fallback but will be removed in a future release.

See [TALOCODE_SDK.md](https://github.com/talocode/stacklane/blob/main/docs/TALOCODE_SDK.md) for full SDK docs.

## Authentication

All API requests require a `TALOCODE_API_KEY` sent via the `Authorization` header:

```
Authorization: Bearer tk_dev_xxxxxxxxxxxx
```

## API Namespaces

Each product is available under its own namespace at `/v1/{product}/`. Legacy non-namespaced routes remain supported.

| Namespace | Product | Example |
|-----------|---------|---------|
| `/v1/router/` | Router (chat completions) | `POST /v1/router/chat/completions` |
| `/v1/tera/` | Tera (writing/coding capabilities) | `POST /v1/tera/writing/rewrite` |
| `/v1/agent-browser/` | Agent Browser | `POST /v1/agent-browser/browser/check` |
| `/v1/cliploop/` | ClipLoop (video generation) | `POST /v1/cliploop/brief/generate`, `POST /v1/cliploop/script/generate`, `POST /v1/cliploop/video/render`, `POST /v1/cliploop/campaign/create`, `POST /v1/cliploop/campaign/package` |
| `/v1/codra/` | Codra (AI coding) | `POST /v1/codra/repo-summary` |
| `/v1/tradia/` | Tradia (trading intelligence) | _planned_ |
| `/v1/signallane/` | SignalLane (X growth intelligence) | `POST /v1/signallane/x/analyze`, `POST /v1/signallane/x/content-plan`, `POST /v1/signallane/x/post-drafts`, `POST /v1/signallane/x/experiments`, `POST /v1/signallane/x/report` |
| `/v1/webdatalane/` | WebDataLane (web extraction) | `POST /v1/webdatalane/fetch`, `POST /v1/webdatalane/markdown`, `POST /v1/webdatalane/metadata`, `POST /v1/webdatalane/links`, `POST /v1/webdatalane/extract`, `POST /v1/webdatalane/structured`, `POST /v1/webdatalane/crawl/plan`, `POST /v1/webdatalane/screenshot` |
| `/v1/crawlerlane/` | CrawlerLane (AI crawler intelligence) | `POST /v1/crawlerlane/logs/ingest`, `POST /v1/crawlerlane/bots/classify`, `POST /v1/crawlerlane/pages/analyze`, `POST /v1/crawlerlane/404/analyze`, `POST /v1/crawlerlane/ai-visibility/score`, `POST /v1/crawlerlane/report/generate`, `POST /v1/crawlerlane/sitemap/suggest`, `POST /v1/crawlerlane/robots/audit`, `POST /v1/crawlerlane/export/markdown`, `POST /v1/crawlerlane/export/json` |
| `/v1/opensourcelane/` | OpenSourceLane (OSS intelligence) | `POST /v1/opensourcelane/repo/analyze`, `POST /v1/opensourcelane/alternatives/find`, `POST /v1/opensourcelane/migration/plan`, `POST /v1/opensourcelane/cost/estimate`, `POST /v1/opensourcelane/risk/score`, `POST /v1/opensourcelane/brief/generate`, `POST /v1/opensourcelane/tools/compare`, `POST /v1/opensourcelane/deployment/plan`, `POST /v1/opensourcelane/license/audit`, `POST /v1/opensourcelane/export/markdown`, `POST /v1/opensourcelane/export/json` |
| `/v1/invoicelane/` | InvoiceLane (invoice/receipt extraction) | `POST /v1/invoicelane/extract`, `POST /v1/invoicelane/receipt/extract`, `POST /v1/invoicelane/invoice/extract`, `POST /v1/invoicelane/validate`, `POST /v1/invoicelane/export/csv` |
| `/v1/ugclane/` | UGCLane (UGC workflow API) | `POST /v1/ugclane/strategy/generate`, `POST /v1/ugclane/competitor/analyze`, `POST /v1/ugclane/hooks/generate`, `POST /v1/ugclane/scripts/generate`, `POST /v1/ugclane/accounts/plan`, `POST /v1/ugclane/calendar/generate`, `POST /v1/ugclane/experiments/generate`, `POST /v1/ugclane/report/generate`, `POST /v1/ugclane/export/markdown`, `POST /v1/ugclane/export/json` |
| `/v1/worklane/` | WorkLane (agent workflows) | _planned_ |

## Chat Completions

```
POST /v1/chat/completions
POST /v1/router/chat/completions   (namespaced)
```

OpenAI-compatible chat completion endpoint with automatic provider routing.

### Request Body

```json
{
  "model": "talocode/auto",
  "messages": [
    { "role": "user", "content": "Hello" }
  ],
  "max_tokens": 4096,
  "temperature": 0.7
}
```

### Response

```json
{
  "id": "chatcmpl_xxx",
  "object": "chat.completion",
  "created": 1700000000,
  "model": "talocode/auto",
  "provider": "openai",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Hello! How can I help you today?"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 20,
    "total_tokens": 30
  }
}
```

The `provider` field indicates which AI provider served the request.

## Models

```
GET /v1/models
```

Returns the list of available router models.

## Charge Credits

```
POST /api/v1/cloud/usage/charge
```

Charge credits from the project wallet for a specific product action.

### Request Body

```json
{
  "product": "agent_browser",
  "action": "browser.check",
  "requestId": "my-unique-id"
}
```

### Success Response

```json
{
  "data": {
    "ok": true,
    "remainingCredits": 98
  }
}
```

### Insufficient Credits (402)

```json
{
  "data": {
    "ok": false,
    "error": "insufficient_credits",
    "required": 5,
    "available": 2
  }
}
```

## Pricing

```
GET /api/v1/cloud/pricing
```

Returns the full pricing catalog with all products, actions, and credit costs.

## MCP (Model Context Protocol)

Talocode MCP exposes all Talocode Cloud product APIs as MCP tools.

```
POST /mcp
```

See [MCP docs](./mcp.md) for tools, client setup, and configuration.

## Router Health

```
GET /api/v1/cloud/router/health
```

## Configured Providers

```
GET /api/v1/cloud/router/providers
```

## Codra API

Codra Cloud API provides hosted coding capabilities: repo analysis, code explanation, code review, and implementation planning. Local Codra remains open-source and local-first.

### Repo Summary

```
POST /v1/codra/repo-summary
```

Analyze a repository structure and get architecture insights, risks, and next steps.

```json
{
  "files": [
    { "path": "src/index.ts", "content": "..." }
  ],
  "focus": ["architecture", "risks", "next_steps"]
}
```

### Explain Code

```
POST /v1/codra/explain
```

Explain a code snippet at beginner, intermediate, or expert level.

```json
{
  "language": "typescript",
  "code": "const x = 1;",
  "level": "beginner"
}
```

### Review Code

```
POST /v1/codra/review
```

Review code for bugs, types, security, or performance issues.

```json
{
  "language": "typescript",
  "code": "function bad(x) { return x }",
  "focus": ["bugs", "types"]
}
```

### Plan Implementation

```
POST /v1/codra/plan
```

Generate an implementation plan from a task description.

```json
{
  "task": "Add Stripe topups",
  "context": "We use Stripe for payments",
  "constraints": ["do not break auth"]
}
```

## SignalLane — X Growth Intelligence

SignalLane provides X growth intelligence for builders: account analytics, content strategy, post drafting, experiments, and full growth reports.

### Health Check

```
GET /v1/signallane/health
```

Returns the health status of the SignalLane API.

```
HTTP 200
{"status": "ok"}
```

### Analyze Account

```
POST /v1/signallane/x/analyze
```

Analyze an X account for growth signals, engagement metrics, and performance trends. Costs 30 credits.

```json
{
  "username": "elonmusk",
  "period": "30d"
}
```

```bash
curl https://api.talocode.site/v1/signallane/x/analyze \
  -H "Authorization: Bearer $TALOCODE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"username": "elonmusk", "period": "30d"}'
```

```json
{
  "data": {
    "username": "elonmusk",
    "period": "30d",
    "followerGrowth": 2.4,
    "engagementRate": 3.8,
    "topPosts": [],
    "growthSignals": []
  }
}
```

### Content Plan

```
POST /v1/signallane/x/content-plan
```

Generate a weekly content strategy tailored to an X account's audience and goals. Costs 40 credits.

```json
{
  "username": "elonmusk",
  "goals": ["engagement", "followers"],
  "topics": ["AI", "space", "tech"]
}
```

```bash
curl https://api.talocode.site/v1/signallane/x/content-plan \
  -H "Authorization: Bearer $TALOCODE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"username": "elonmusk", "goals": ["engagement", "followers"], "topics": ["AI", "space", "tech"]}'
```

```json
{
  "data": {
    "plan": [
      {"day": "Monday", "topic": "AI breakthrough", "format": "thread", "bestTime": "12:00 UTC"},
      {"day": "Wednesday", "topic": "Space update", "format": "poll", "bestTime": "15:00 UTC"},
      {"day": "Friday", "topic": "Tech forecast", "format": "video", "bestTime": "18:00 UTC"}
    ]
  }
}
```

### Post Drafts

```
POST /v1/signallane/x/post-drafts
```

Generate optimized X post drafts with hooks, hashtags, and engagement patterns. Costs 40 credits.

```json
{
  "username": "elonmusk",
  "topic": "New product launch",
  "tone": "exciting",
  "count": 5
}
```

```bash
curl https://api.talocode.site/v1/signallane/x/post-drafts \
  -H "Authorization: Bearer $TALOCODE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"username": "elonmusk", "topic": "New product launch", "tone": "exciting", "count": 5}'
```

```json
{
  "data": {
    "drafts": [
      {"content": "Excited to announce...", "hookStrength": 0.92, "format": "text", "predictedEngagement": "high"},
      {"content": "We've been working on...", "hookStrength": 0.88, "format": "image", "predictedEngagement": "high"}
    ]
  }
}
```

### Experiments

```
POST /v1/signallane/x/experiments
```

Design content experiments to test posting strategies and optimize performance. Costs 30 credits.

```json
{
  "username": "elonmusk",
  "goal": "maximize engagement",
  "variables": ["posting_time", "content_format"]
}
```

```bash
curl https://api.talocode.site/v1/signallane/x/experiments \
  -H "Authorization: Bearer $TALOCODE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"username": "elonmusk", "goal": "maximize engagement", "variables": ["posting_time", "content_format"]}'
```

```json
{
  "data": {
    "experiments": [
      {"variable": "posting_time", "control": "12:00 UTC", "variant": "18:00 UTC", "duration": "7d"},
      {"variable": "content_format", "control": "text", "variant": "image", "duration": "7d"}
    ]
  }
}
```

### Full Report

```
POST /v1/signallane/x/report
```

Generate a comprehensive growth intelligence report with insights across growth, engagement, content performance, and audience analysis. Costs 60 credits.

```json
{
  "username": "elonmusk",
  "period": "90d",
  "sections": ["growth", "engagement", "content", "audience"]
}
```

```bash
curl https://api.talocode.site/v1/signallane/x/report \
  -H "Authorization: Bearer $TALOCODE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"username": "elonmusk", "period": "90d", "sections": ["growth", "engagement", "content", "audience"]}'
```

```json
{
  "data": {
    "username": "elonmusk",
    "period": "90d",
    "growth": {"followerChange": 125000, "growthRate": 3.2},
    "engagement": {"avgLikes": 45000, "avgRetweets": 8200, "engagementRate": 4.1},
    "content": {"bestPerforming": "", "worstPerforming": "", "recommendations": []},
    "audience": {"demographics": {}, "activeHours": [], "interests": []}
  }
}
```

## InvoiceLane — Invoice/Receipt Extraction

InvoiceLane turns receipts, invoices, and business documents into clean structured data through a single API. **v0.1 supports text-based extraction only** (OCR and PDF parsing are planned for a future release).

### Health Check

```
GET /v1/invoicelane/health
```

Returns the health status of the InvoiceLane API.

```
HTTP 200
{"status": "ok"}
```

### Extract (General)

```
POST /v1/invoicelane/extract
```

Extract structured data from any business document text. Costs 20 credits.

```json
{
  "text": "INVOICE #INV-2026-001\nDate: 2026-01-15\nVendor: Acme Corp\nItems:\n  - Widget A x2 $10.00\n  - Widget B x1 $25.00\nTotal: $45.00"
}
```

```bash
curl https://api.talocode.site/v1/invoicelane/extract \
  -H "Authorization: Bearer $TALOCODE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"text": "INVOICE #INV-2026-001\nDate: 2026-01-15\nTotal: $45.00"}'
```

```json
{
  "data": {
    "documentType": "invoice",
    "confidence": 0.95,
    "fields": {
      "invoiceNumber": "INV-2026-001",
      "date": "2026-01-15",
      "vendor": "Acme Corp",
      "lineItems": [
        {"description": "Widget A", "quantity": 2, "unitPrice": 10.00, "total": 20.00},
        {"description": "Widget B", "quantity": 1, "unitPrice": 25.00, "total": 25.00}
      ],
      "total": 45.00,
      "currency": "USD"
    }
  }
}
```

### Receipt Extraction

```
POST /v1/invoicelane/receipt/extract
```

Extract structured data specifically from receipt text. Costs 20 credits.

```json
{
  "text": "RECEIPT #1234\nStore: QuickMart\nDate: 2026-02-01\nItem: Milk $3.50\nItem: Bread $2.00\nTotal: $5.50"
}
```

```bash
curl https://api.talocode.site/v1/invoicelane/receipt/extract \
  -H "Authorization: Bearer $TALOCODE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"text": "RECEIPT #1234\nStore: QuickMart\nTotal: $5.50"}'
```

```json
{
  "data": {
    "documentType": "receipt",
    "confidence": 0.94,
    "fields": {
      "receiptNumber": "1234",
      "storeName": "QuickMart",
      "date": "2026-02-01",
      "lineItems": [
        {"item": "Milk", "price": 3.50},
        {"item": "Bread", "price": 2.00}
      ],
      "total": 5.50,
      "currency": "USD"
    }
  }
}
```

### Invoice Extraction

```
POST /v1/invoicelane/invoice/extract
```

Extract structured data specifically from invoice text. Costs 30 credits.

```json
{
  "text": "INVOICE #INV-2026-002\nDate: 2026-03-01\nFrom: MegaCorp\nTo: Client Inc.\nItems:\n  - Consulting $150.00\n  - Software License $500.00\nSubtotal: $650.00\nTax: $52.00\nTotal: $702.00"
}
```

```bash
curl https://api.talocode.site/v1/invoicelane/invoice/extract \
  -H "Authorization: Bearer $TALOCODE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"text": "INVOICE #INV-2026-002\nFrom: MegaCorp\nTotal: $702.00"}'
```

```json
{
  "data": {
    "documentType": "invoice",
    "confidence": 0.97,
    "fields": {
      "invoiceNumber": "INV-2026-002",
      "date": "2026-03-01",
      "vendor": "MegaCorp",
      "customer": "Client Inc.",
      "lineItems": [
        {"description": "Consulting", "amount": 150.00},
        {"description": "Software License", "amount": 500.00}
      ],
      "subtotal": 650.00,
      "tax": 52.00,
      "total": 702.00,
      "currency": "USD"
    }
  }
}
```

### Validate

```
POST /v1/invoicelane/validate
```

Validate extracted document data for correctness and completeness. Costs 10 credits.

```json
{
  "text": "INVOICE #INV-2026-001\nTotal: $45.00"
}
```

```bash
curl https://api.talocode.site/v1/invoicelane/validate \
  -H "Authorization: Bearer $TALOCODE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"text": "INVOICE #INV-2026-001\nTotal: $45.00"}'
```

```json
{
  "data": {
    "valid": true,
    "issues": [],
    "fieldsPresent": ["invoiceNumber", "total"],
    "fieldsMissing": ["date", "vendor", "lineItems"],
    "recommendations": ["Add date and vendor information for a complete record"]
  }
}
```

### Export CSV

```
POST /v1/invoicelane/export/csv
```

Export extracted document data as CSV. Costs 5 credits.

```json
{
  "data": {
    "documentType": "invoice",
    "fields": {
      "invoiceNumber": "INV-2026-001",
      "date": "2026-01-15",
      "total": 45.00
    }
  }
}
```

```bash
curl https://api.talocode.site/v1/invoicelane/export/csv \
  -H "Authorization: Bearer $TALOCODE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"data": {"documentType": "invoice", "fields": {"invoiceNumber": "INV-2026-001", "total": 45.00}}}'
```

```json
{
  "data": {
    "csv": "documentType,invoiceNumber,date,total\ninvoice,INV-2026-001,2026-01-15,45.00"
  }
}
```

### SDK Example

```ts
import { Talocode } from "@talocode/sdk";

const talocode = new Talocode({ apiKey: process.env.TALOCODE_API_KEY });

// Extract invoice data
const result = await talocode.invoicelane.invoice.extract({
  text: "INVOICE #1234 dated 2026-01-15 Total: $45.00"
});
```

## UGCLane — UGC Workflow API

UGCLane is a programmable UGC workflow API that turns product positioning into original hooks, scripts, captions, calendars, and content experiments through one API.

Base URL: `https://api.talocode.site` (set `TALOCODE_BASE_URL` env var to override)

Authentication uses the same `TALOCODE_API_KEY` as all other Talocode Cloud products (`Authorization: Bearer tk_dev_xxxxxxxxxxxx`).

### Generate Content Strategy

```
POST /v1/ugclane/strategy/generate
```

Generate a content strategy based on product positioning and audience. Costs 30 credits.

```json
{
  "product": "AI note-taking app",
  "audience": "knowledge workers",
  "positioning": "faster than typing",
  "platforms": ["twitter", "linkedin"]
}
```

```bash
curl https://api.talocode.site/v1/ugclane/strategy/generate \
  -H "Authorization: Bearer $TALOCODE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"product": "AI note-taking app", "audience": "knowledge workers", "positioning": "faster than typing"}'
```

```json
{
  "data": {
    "strategy": [
      {"theme": "speed", "angles": ["save hours", "instant recall"], "platforms": ["twitter", "linkedin"]}
    ]
  }
}
```

### Analyze Competitors

```
POST /v1/ugclane/competitor/analyze
```

Analyze competitor content positioning and identify gaps. Costs 40 credits.

```json
{
  "competitors": ["notion", "mem.ai"],
  "category": "note-taking",
  "focus": ["messaging", "hooks", "positioning"]
}
```

```bash
curl https://api.talocode.site/v1/ugclane/competitor/analyze \
  -H "Authorization: Bearer $TALOCODE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"competitors": ["notion"], "category": "note-taking"}'
```

```json
{
  "data": {
    "gaps": [],
    "opportunities": [],
    "competitorHooks": []
  }
}
```

### Generate Hooks

```
POST /v1/ugclane/hooks/generate
```

Generate original UGC-style hooks for social posts and ad copy. Costs 20 credits.

```json
{
  "product": "AI note-taking app",
  "positioning": "faster than typing",
  "tone": "bold",
  "count": 5
}
```

```bash
curl https://api.talocode.site/v1/ugclane/hooks/generate \
  -H "Authorization: Bearer $TALOCODE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"product": "AI note-taking app", "positioning": "faster than typing", "tone": "bold", "count": 5}'
```

```json
{
  "data": {
    "hooks": [
      {"hook": "Stop typing. Start thinking.", "strength": 0.95, "format": "one-liner"}
    ]
  }
}
```

### Generate Scripts

```
POST /v1/ugclane/scripts/generate
```

Generate UGC-style scripts for short-form video content. Costs 40 credits.

```json
{
  "product": "AI note-taking app",
  "hook": "Stop typing. Start thinking.",
  "platform": "tiktok",
  "duration": "60s",
  "tone": "storytelling"
}
```

```bash
curl https://api.talocode.site/v1/ugclane/scripts/generate \
  -H "Authorization: Bearer $TALOCODE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"product": "AI note-taking app", "hook": "Stop typing. Start thinking.", "platform": "tiktok", "duration": "60s"}'
```

```json
{
  "data": {
    "script": {"hook": "...", "body": "...", "cta": "...", "estimatedDuration": "60s"}
  }
}
```

### Plan Accounts

```
POST /v1/ugclane/accounts/plan
```

Generate an account-level content plan with positioning, pillars, and posting cadence. Costs 30 credits.

```json
{
  "brand": "MyApp",
  "product": "AI note-taking app",
  "platforms": ["twitter", "linkedin", "tiktok"],
  "goals": ["awareness", "conversion"]
}
```

```bash
curl https://api.talocode.site/v1/ugclane/accounts/plan \
  -H "Authorization: Bearer $TALOCODE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"brand": "MyApp", "product": "AI note-taking app", "platforms": ["twitter", "linkedin"]}'
```

```json
{
  "data": {
    "positioning": "",
    "contentPillars": [],
    "cadence": {"twitter": "3x daily", "linkedin": "1x daily"}
  }
}
```

### Generate Calendar

```
POST /v1/ugclane/calendar/generate
```

Generate a month-long content calendar. Costs 60 credits.

```json
{
  "brand": "MyApp",
  "product": "AI note-taking app",
  "month": "2026-08",
  "platforms": ["twitter", "linkedin"],
  "goals": ["engagement", "signups"]
}
```

```bash
curl https://api.talocode.site/v1/ugclane/calendar/generate \
  -H "Authorization: Bearer $TALOCODE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"brand": "MyApp", "product": "AI note-taking app", "month": "2026-08", "platforms": ["twitter", "linkedin"]}'
```

```json
{
  "data": {
    "month": "2026-08",
    "weeks": [
      {"week": 1, "posts": [{"day": "Mon", "platform": "twitter", "content": "", "hook": ""}]}
    ]
  }
}
```

### Generate Experiments

```
POST /v1/ugclane/experiments/generate
```

Design content experiments to test hooks, formats, and posting strategies. Costs 30 credits.

```json
{
  "product": "AI note-taking app",
  "goal": "maximize engagement",
  "variables": ["hook_style", "post_format"]
}
```

```bash
curl https://api.talocode.site/v1/ugclane/experiments/generate \
  -H "Authorization: Bearer $TALOCODE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"product": "AI note-taking app", "goal": "maximize engagement", "variables": ["hook_style", "post_format"]}'
```

```json
{
  "data": {
    "experiments": [
      {"variable": "hook_style", "control": "question", "variant": "statistic"}
    ]
  }
}
```

### Generate Report

```
POST /v1/ugclane/report/generate
```

Generate a content performance report with strategy recommendations. Costs 40 credits.

```json
{
  "brand": "MyApp",
  "period": "30d",
  "platforms": ["twitter", "linkedin"]
}
```

```bash
curl https://api.talocode.site/v1/ugclane/report/generate \
  -H "Authorization: Bearer $TALOCODE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"brand": "MyApp", "period": "30d", "platforms": ["twitter", "linkedin"]}'
```

```json
{
  "data": {
    "performance": {},
    "recommendations": []
  }
}
```

### Export Markdown

```
POST /v1/ugclane/export/markdown
```

Export UGC content plan as markdown. Costs 5 credits.

```json
{
  "data": {
    "calendar": {"month": "2026-08", "weeks": []}
  }
}
```

```bash
curl https://api.talocode.site/v1/ugclane/export/markdown \
  -H "Authorization: Bearer $TALOCODE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"data": {"calendar": {"month": "2026-08"}}}'
```

```json
{
  "data": {
    "markdown": "# Content Calendar — 2026-08\n\n"
  }
}
```

### Export JSON

```
POST /v1/ugclane/export/json
```

Export UGC content data as structured JSON. Costs 5 credits.

```json
{
  "data": {
    "calendar": {"month": "2026-08", "weeks": []}
  }
}
```

```bash
curl https://api.talocode.site/v1/ugclane/export/json \
  -H "Authorization: Bearer $TALOCODE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"data": {"calendar": {"month": "2026-08"}}}'
```

```json
{
  "data": {
    "json": {"month": "2026-08", "weeks": []}
  }
}
```

### SDK Example

```ts
import { Talocode } from "@talocode/sdk";

const talocode = new Talocode({ apiKey: process.env.TALOCODE_API_KEY });

const hooks = await talocode.ugclane.hooks.generate({
  product: "AI note-taking app",
  positioning: "faster than typing",
  tone: "bold",
  count: 5
});

const calendar = await talocode.ugclane.calendar.generate({
  brand: "MyApp",
  product: "AI note-taking app",
  month: "2026-08",
  platforms: ["twitter", "linkedin"]
});
```

### Safety Boundaries

UGCLane is designed to help creators and marketers generate original content ideas and plans. It is not designed for:

- **No spam automation** — Do not use UGCLane to auto-generate and mass-post spam content
- **No posting automation** — UGCLane generates ideas and scripts; human review is required before publishing
- **No login automation** — Do not use UGCLane to automate login or session management for any platform
- **No engagement bots** — Do not use UGCLane to create bots that artificially inflate engagement
- **No private scraping** — Do not use UGCLane to scrape or extract non-public data from platforms
- **No copying competitor content** — UGCLane generates original content; do not use it to plagiarize or closely mimic competitors
- **No platform bypass** — Do not use UGCLane to circumvent platform terms of service, rate limits, or content policies

UGCLane follows the spirit of ethical content creation, not the letter of what might technically work.

### Limitations (v0.1)

- **Text-based only** — OCR and PDF/image parsing are not yet supported. Provide raw document text as input.
- **English-language documents** — Multi-language support is planned.
- **Simple documents** — Complex multi-page documents with tables may have reduced accuracy.
- **No document upload** — Submit document text directly via the request body.
