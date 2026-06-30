# Talocode Cloud API

Base URL: `https://api.talocode.xyz` (set `TALOCODE_BASE_URL` env var to override)

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
| `/v1/cliploop/` | ClipLoop (video generation) | `POST /v1/cliploop/brief/generate` |
| `/v1/codra/` | Codra (AI coding) | `POST /v1/codra/repo-summary` |
| `/v1/tradia/` | Tradia (trading intelligence) | _planned_ |
| `/v1/signallane/` | SignalLane (business signals) | _planned_ |
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
