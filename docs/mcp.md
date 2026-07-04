# Talocode MCP

Talocode MCP exposes all Talocode Cloud product APIs through the [Model Context Protocol](https://modelcontextprotocol.io). AI coding agents (Cursor, Claude Desktop, VS Code, OpenCode, and any MCP-compatible client) can call Talocode capabilities as MCP tools using a single `TALOCODE_API_KEY`.

## Endpoint

```
https://api.talocode.site/mcp
```

## Status

**v0.1 — Working.** MCP tools are implemented for Tera, Router, Agent Browser, ClipLoop, and SignalLane. New tools follow as product APIs ship.

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
Calls the `signallane_x_report` tool with `username: "elonmusk", period: "90d", sections: ["growth", "engagement", "content", "audience"]`.
