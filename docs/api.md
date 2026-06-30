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
| `/v1/codra/` | Codra (AI coding) | _planned_ |
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

## Router Health

```
GET /api/v1/cloud/router/health
```

## Configured Providers

```
GET /api/v1/cloud/router/providers
```
