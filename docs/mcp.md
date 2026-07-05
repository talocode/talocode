# Talocode MCP

Talocode MCP exposes all Talocode Cloud product APIs through the [Model Context Protocol](https://modelcontextprotocol.io). AI coding agents (Cursor, Claude Desktop, VS Code, OpenCode, and any MCP-compatible client) can call Talocode capabilities as MCP tools using a single `TALOCODE_API_KEY`.

## Endpoint

```
https://api.talocode.site/mcp
```

## Status

**v0.1 — Working.** MCP tools are implemented for Tera, Router, Agent Browser, ClipLoop, SignalLane, WebDataLane, InvoiceLane, and UGCLane. New tools follow as product APIs ship.

## Authentication

Include your `TALOCODE_API_KEY` in every MCP request:

```
Authorization: Bearer tk_dev_xxxxxxxxxxxx
```

Or via `X-Api-Key` header:

```
X-Api-Key: tk_dev_xxxxxxxxxxxx
```

## Client Setup

### Remote HTTP (supports custom headers)

Use the `url` + `headers` config for clients that support custom HTTP headers:

```json
{
  "mcpServers": {
    "talocode": {
      "url": "https://api.talocode.site/mcp",
      "headers": {
        "Authorization": "Bearer ${TALOCODE_API_KEY}"
      }
    }
  }
}
```

### Local Bridge (stdio)

For MCP clients that do not support custom HTTP headers (most desktop clients), use the local bridge package `@talocode/mcp`:

```json
{
  "mcpServers": {
    "talocode": {
      "command": "npx",
      "args": ["@talocode/mcp"],
      "env": {
        "TALOCODE_API_KEY": "tk_live_xxxxxxxxxxxx"
      }
    }
  }
}
```

The bridge reads `TALOCODE_API_KEY` from the environment and forwards all MCP requests to `https://api.talocode.site/mcp` with the proper `Authorization` header.
```

## Available Tools

| Tool | Product | Est. Credits |
|------|---------|-------------|
| `tera_writing_rewrite` | Tera | 5 |
| `tera_writing_draft` | Tera | 10 |
| `tera_coding_explain` | Tera | 10 |
| `tera_coding_review` | Tera | 20 |
| `router_chat` | Router | Variable |
| `agent_browser_check` | Agent Browser | 5 |
| `agent_browser_screenshot` | Agent Browser | 8 |
| `agent_browser_trace_report` | Agent Browser | 15 |
| `cliploop_brief_generate` | ClipLoop | 15 |
| `cliploop_script_generate` | ClipLoop | 15 |
| `cliploop_video_render` | ClipLoop | 200 |
| `cliploop_campaign_create` | ClipLoop | 50 |
| `cliploop_campaign_package` | ClipLoop | 400 |
| `cloud_pricing` | Cloud | Free |
| `signallane_x_analyze` | SignalLane | 30 |
| `signallane_x_content_plan` | SignalLane | 40 |
| `signallane_x_post_drafts` | SignalLane | 40 |
| `signallane_x_experiments` | SignalLane | 30 |
| `signallane_x_report` | SignalLane | 60 |
| `webdatalane_fetch` | WebDataLane | 5 |
| `webdatalane_extract` | WebDataLane | 10 |
| `webdatalane_markdown` | WebDataLane | 10 |
| `webdatalane_metadata` | WebDataLane | 5 |
| `webdatalane_links` | WebDataLane | 5 |
| `webdatalane_structured` | WebDataLane | 20 |
| `webdatalane_crawl_plan` | WebDataLane | 15 |
| `webdatalane_screenshot` | WebDataLane | 50 |
| `crawlerlane_logs_ingest` | CrawlerLane | 5 |
| `crawlerlane_bots_classify` | CrawlerLane | 2 |
| `crawlerlane_pages_analyze` | CrawlerLane | 20 |
| `crawlerlane_404_analyze` | CrawlerLane | 20 |
| `crawlerlane_ai_visibility_score` | CrawlerLane | 30 |
| `crawlerlane_report_generate` | CrawlerLane | 40 |
| `crawlerlane_sitemap_suggest` | CrawlerLane | 20 |
| `crawlerlane_robots_audit` | CrawlerLane | 15 |
| `crawlerlane_export_markdown` | CrawlerLane | 5 |
| `crawlerlane_export_json` | CrawlerLane | 5 |
| `invoicelane_extract` | InvoiceLane | 20 |
| `invoicelane_extract_receipt` | InvoiceLane | 20 |
| `invoicelane_extract_invoice` | InvoiceLane | 30 |
| `invoicelane_validate` | InvoiceLane | 10 |
| `invoicelane_export_csv` | InvoiceLane | 5 |
| `ugclane_strategy_generate` | UGCLane | 30 |
| `ugclane_competitor_analyze` | UGCLane | 40 |
| `ugclane_hooks_generate` | UGCLane | 20 |
| `ugclane_scripts_generate` | UGCLane | 40 |
| `ugclane_accounts_plan` | UGCLane | 30 |
| `ugclane_calendar_generate` | UGCLane | 60 |
| `ugclane_experiments_generate` | UGCLane | 30 |
| `ugclane_report_generate` | UGCLane | 40 |
| `ugclane_export_markdown` | UGCLane | 5 |
| `ugclane_export_json` | UGCLane | 5 |

Full tool schemas and routes are available at `GET /api/v1/cloud/mcp/tools`.

## Billing

MCP tool calls are billed as standard Talocode Cloud API requests. Each tool call triggers the same credit charge as calling the underlying REST endpoint directly. Credits are deducted from your wallet.

## Security

- Talocode MCP never logs raw API keys
- Authorization headers are redacted in logs
- Never commit API keys to client config files
- Use environment variable substitution (`${TALOCODE_API_KEY}`) where supported

## Limitations (v0.1)

- Wallet balance and usage summary tools are not yet available via MCP (the underlying project-resolution endpoint is pending)
- No SSE streaming for long-running operations (all responses are synchronous JSON)
- Bridge package `@talocode/mcp` v0.1 ready but not yet published to npm

## SignalLane MCP Tools

### signallane_x_analyze

Analyze an X account for growth signals, engagement metrics, and performance trends. **30 credits.**

**Input parameters:**
- `username` (string, required) — X account username
- `period` (string, optional) — Analysis period: `7d`, `30d`, `90d` (default: `30d`)

**Example agent prompt:**
```
Analyze @elonmusk's X account for the last 30 days.
```
Calls the `signallane_x_analyze` tool with `username: "elonmusk", period: "30d"`.

### signallane_x_content_plan

Generate a weekly content strategy tailored to an X account's audience and goals. **40 credits.**

**Input parameters:**
- `username` (string, required) — X account username
- `goals` (array of strings, required) — Content goals: `engagement`, `followers`, `awareness`, `conversion`
- `topics` (array of strings, optional) — Preferred content topics

**Example agent prompt:**
```
Create a weekly content plan for @elonmusk focused on engagement and followers, covering AI, space, and tech.
```
Calls the `signallane_x_content_plan` tool with `username: "elonmusk", goals: ["engagement", "followers"], topics: ["AI", "space", "tech"]`.

### signallane_x_post_drafts

Generate optimized X post drafts with hooks, hashtags, and engagement patterns. **40 credits.**

**Input parameters:**
- `username` (string, required) — X account username
- `topic` (string, required) — Post topic
- `tone` (string, optional) — Tone: `exciting`, `professional`, `casual`, `educational`
- `count` (number, optional) — Number of drafts (default: 3, max: 10)

**Example agent prompt:**
```
Draft 5 exciting posts for @elonmusk about the new product launch.
```
Calls the `signallane_x_post_drafts` tool with `username: "elonmusk", topic: "New product launch", tone: "exciting", count: 5`.

### signallane_x_experiments

Design content experiments to test posting strategies and optimize performance. **30 credits.**

**Input parameters:**
- `username` (string, required) — X account username
- `goal` (string, required) — Experiment goal: `maximize engagement`, `maximize reach`, `improve conversion`
- `variables` (array of strings, optional) — Variables to test: `posting_time`, `content_format`, `hashtag_count`, `post_length`

**Example agent prompt:**
```
Design experiments for @elonmusk to maximize engagement by testing posting time and content format.
```
Calls the `signallane_x_experiments` tool with `username: "elonmusk", goal: "maximize engagement", variables: ["posting_time", "content_format"]`.

### signallane_x_report

Generate a comprehensive growth intelligence report. **60 credits.**

**Input parameters:**
- `username` (string, required) — X account username
- `period` (string, optional) — Report period: `30d`, `90d` (default: `30d`)
- `sections` (array of strings, optional) — Report sections: `growth`, `engagement`, `content`, `audience` (default: all)

**Example agent prompt:**
```
Generate a 90-day growth intelligence report for @elonmusk covering growth, engagement, content, and audience.
```
Calls the `signallane_x_report` tool with `username: "elonmusk", period: "90d", sections: ["growth", "engagement", "content", "audience"].

## WebDataLane MCP Tools

### webdatalane_fetch

Fetch a URL and return its HTML and text content. **5 credits.**

**Input parameters:**
- `url` (string, required) — URL to fetch

**Example agent prompt:**
```
Fetch https://example.com and show me the page content
```

### webdatalane_markdown

Convert a URL or HTML to clean markdown. **10 credits.**

**Input parameters:**
- `url` (string) — URL to convert
- `stripNavigation` (boolean) — Remove nav/footer/header elements
- `includeLinks` (boolean) — Include links (default: true)

**Example agent prompt:**
```
Turn https://example.com into clean markdown
```

### webdatalane_extract

Full extraction from a page: markdown, metadata, links, headings, images, JSON-LD, and tables. **10 credits.**

**Input parameters:**
- `url` (string) — URL to extract
- `include` (array of strings) — Fields to include

**Example agent prompt:**
```
Extract all content from https://example.com — markdown, metadata, links, and headings
```

### webdatalane_metadata

Extract page metadata: title, description, canonical URL, OpenGraph, Twitter card. **5 credits.**

**Example agent prompt:**
```
Get the metadata from https://example.com
```

### webdatalane_links

Extract all links from a page, classified as internal or external. **5 credits.**

**Example agent prompt:**
```
Find all internal links on https://example.com
```

### webdatalane_structured

Extract structured fields from a webpage using a schema. **20 credits.**

**Example agent prompt:**
```
Extract the product title and price from this page: schema is title (string), price (string).
```

### webdatalane_crawl_plan

Generate a crawl plan from a seed URL. **15 credits.**

**Example agent prompt:**
```
Plan a crawl of https://docs.example.com, max 5 pages, same domain only
```

### webdatalane_screenshot

Capture a webpage screenshot. **50 credits.** (Not available in v0.1.)

## UGCLane MCP Tools

### ugclane_strategy_generate

Generate a content strategy based on product positioning and audience. **30 credits.**

**Input parameters:**
- `product` (string, required) — Product name or description
- `audience` (string, required) — Target audience
- `positioning` (string, required) — Key positioning statement
- `platforms` (array of strings, optional) — Target platforms

**Example agent prompt:**
```
Generate a content strategy for my AI note-taking app aimed at knowledge workers, positioned as faster than typing.
```
Calls the `ugclane_strategy_generate` tool with `product: "AI note-taking app", audience: "knowledge workers", positioning: "faster than typing"`.

### ugclane_competitor_analyze

Analyze competitor content positioning and identify gaps. **40 credits.**

**Input parameters:**
- `competitors` (array of strings, required) — Competitor names
- `category` (string, required) — Product category
- `focus` (array of strings, optional) — Analysis focus areas

**Example agent prompt:**
```
Analyze Notion and Mem.ai in the note-taking category for messaging and positioning gaps.
```
Calls the `ugclane_competitor_analyze` tool with `competitors: ["notion", "mem.ai"], category: "note-taking", focus: ["messaging", "positioning"]`.

### ugclane_hooks_generate

Generate original UGC-style hooks for social posts and ad copy. **20 credits.**

**Input parameters:**
- `product` (string, required) — Product name or description
- `positioning` (string, required) — Key positioning
- `tone` (string, optional) — Tone: `bold`, `curious`, `funny`, `professional`
- `count` (number, optional) — Number of hooks (default: 3, max: 10)

**Example agent prompt:**
```
Generate 5 bold hooks for my AI note-taking app positioned as faster than typing.
```
Calls the `ugclane_hooks_generate` tool with `product: "AI note-taking app", positioning: "faster than typing", tone: "bold", count: 5`.

### ugclane_scripts_generate

Generate UGC-style scripts for short-form video content. **40 credits.**

**Input parameters:**
- `product` (string, required) — Product name or description
- `hook` (string, required) — Opening hook
- `platform` (string, optional) — Platform: `tiktok`, `reels`, `shorts`, `youtube`
- `duration` (string, optional) — Target duration: `15s`, `30s`, `60s`
- `tone` (string, optional) — Script tone

**Example agent prompt:**
```
Write a 60-second TikTok script for my AI note-taking app with the hook "Stop typing. Start thinking."
```
Calls the `ugclane_scripts_generate` tool with `product: "AI note-taking app", hook: "Stop typing. Start thinking.", platform: "tiktok", duration: "60s"`.

### ugclane_accounts_plan

Generate an account-level content plan with positioning, pillars, and posting cadence. **30 credits.**

**Input parameters:**
- `brand` (string, required) — Brand name
- `product` (string, required) — Product name or description
- `platforms` (array of strings, required) — Target platforms
- `goals` (array of strings, optional) — Content goals

### ugclane_calendar_generate

Generate a month-long content calendar. **60 credits.**

**Input parameters:**
- `brand` (string, required) — Brand name
- `product` (string, required) — Product name or description
- `month` (string, required) — Month in YYYY-MM format
- `platforms` (array of strings, required) — Target platforms
- `goals` (array of strings, optional) — Content goals

**Example agent prompt:**
```
Create an August 2026 content calendar for MyApp's AI note-taking app on Twitter and LinkedIn focused on engagement and signups.
```
Calls the `ugclane_calendar_generate` tool with `brand: "MyApp", product: "AI note-taking app", month: "2026-08", platforms: ["twitter", "linkedin"], goals: ["engagement", "signups"]`.

### ugclane_experiments_generate

Design content experiments to test hooks, formats, and posting strategies. **30 credits.**

**Input parameters:**
- `product` (string, required) — Product name or description
- `goal` (string, required) — Experiment goal
- `variables` (array of strings, optional) — Variables to test

**Example agent prompt:**
```
Design experiments for my AI note-taking app to test hook styles and post formats for maximum engagement.
```
Calls the `ugclane_experiments_generate` tool with `product: "AI note-taking app", goal: "maximize engagement", variables: ["hook_style", "post_format"]`.

### ugclane_report_generate

Generate a content performance report with strategy recommendations. **40 credits.**

**Input parameters:**
- `brand` (string, required) — Brand name
- `period` (string, optional) — Report period: `7d`, `30d`, `90d`
- `platforms` (array of strings, optional) — Platforms to include

### ugclane_export_markdown

Export UGC content plan as markdown. **5 credits.**

**Input parameters:**
- `data` (object, required) — Content data to export

### ugclane_export_json

Export UGC content data as structured JSON. **5 credits.**

**Input parameters:**
- `data` (object, required) — Content data to export

## InvoiceLane MCP Tools

### invoicelane_extract

Extract structured data from any business document text. **20 credits.**

**Input parameters:**
- `text` (string, required) — Raw document text

**Example agent prompt:**
```
Extract invoice data from this text: INVOICE #1234 Total: $45.00
```
Calls the `invoicelane_extract` tool with `text: "INVOICE #1234 Total: $45.00"`.

### invoicelane_extract_receipt

Extract structured data specifically from receipt text. **20 credits.**

**Input parameters:**
- `text` (string, required) — Raw receipt text

**Example agent prompt:**
```
Extract receipt data: RECEIPT #567 Store: QuickMart Total: $12.50
```
Calls the `invoicelane_extract_receipt` tool with `text: "RECEIPT #567 Store: QuickMart Total: $12.50"`.

### invoicelane_extract_invoice

Extract structured data specifically from invoice text. **30 credits.**

**Input parameters:**
- `text` (string, required) — Raw invoice text

**Example agent prompt:**
```
Extract invoice details: INVOICE #INV-001 from Acme Corp dated 2026-01-15 for $702.00
```
Calls the `invoicelane_extract_invoice` tool with `text: "INVOICE #INV-001 from Acme Corp dated 2026-01-15 for $702.00"`.

### invoicelane_validate

Validate extracted document data for correctness and completeness. **10 credits.**

**Input parameters:**
- `text` (string, required) — Document text to validate

**Example agent prompt:**
```
Validate this invoice text and tell me what's missing: INVOICE #123 Total: $45.00
```
Calls the `invoicelane_validate` tool with `text: "INVOICE #123 Total: $45.00"`.

### invoicelane_export_csv

Export extracted document data as CSV. **5 credits.**

**Input parameters:**
- `data` (object, required) — Document data to export

**Example agent prompt:**
```
Export this invoice data as CSV: invoice #INV-001, $45.00
```
Calls the `invoicelane_export_csv` tool with `data: { documentType: "invoice", fields: { invoiceNumber: "INV-001", total: 45.00 } }`.

