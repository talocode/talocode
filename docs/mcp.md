# Talocode MCP

Talocode MCP exposes all Talocode Cloud product APIs through the [Model Context Protocol](https://modelcontextprotocol.io). AI coding agents (Cursor, Claude Desktop, VS Code, OpenCode, and any MCP-compatible client) can call Talocode capabilities as MCP tools using a single `TALOCODE_API_KEY`.

## Endpoint

```
https://api.talocode.xyz/mcp
```

## Status

**v0.1 — Working.** MCP tools are implemented for Tera, Router, Agent Browser, and ClipLoop. New tools follow as product APIs ship.

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

### Cursor

```json
{
  "mcpServers": {
    "talocode": {
      "url": "https://api.talocode.xyz/mcp",
      "headers": {
        "Authorization": "Bearer ${TALOCODE_API_KEY}"
      }
    }
  }
}
```

### Claude Desktop

```json
{
  "mcpServers": {
    "talocode": {
      "url": "https://api.talocode.xyz/mcp",
      "headers": {
        "Authorization": "Bearer ${TALOCODE_API_KEY}"
      }
    }
  }
}
```

### VS Code

```json
{
  "mcpServers": {
    "talocode": {
      "url": "https://api.talocode.xyz/mcp",
      "headers": {
        "Authorization": "Bearer ${TALOCODE_API_KEY}"
      }
    }
  }
}
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
- Bridge package (`npx @talocode/mcp`) not yet published for clients without header support
