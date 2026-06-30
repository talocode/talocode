# Talocode — Open-Source Infrastructure for AI-Native Work

Build locally with open-source tools. Scale with hosted APIs through `TALOCODE_API_KEY`.

Talocode helps developers and builders make work readable to agents and controllable by humans. Every product ships as an open-source tool you can run yourself, with a hosted API layer when you need scale.

---

## Ecosystem

| Category | Product | Description | Status |
|----------|---------|-------------|--------|
| **Backend Cloud** | [Stacklane](https://github.com/talocode/stacklane) | Backend cloud platform for AI-native apps | Experimental |
| **AI Coding** | [Codra](https://github.com/talocode/codra) | Local-first AI coding agent | Experimental |
| **Browser Automation** | [Agent Browser](https://github.com/talocode/agent-browser) | Browser validation layer for AI agents | Experimental |
| **Workflow** | [WorkLane](https://github.com/talocode/worklane) | Agent workflow and approval runtime | Planned |
| **Skills** | [Talocode Skills](https://github.com/talocode/talocode-skills) | Reusable skills for agents | Experimental |
| **Learning** | [Tera](https://github.com/talocode/tera) | Learning and context assistant | Planned |
| **Video** | [ClipLoop](https://github.com/talocode/cliploop) | Short-form promo video engine for indie apps | Experimental |
| **Trading** | [Tradia](https://github.com/talocode/tradia) | Trading performance intelligence | Planned |
| **Signals** | [SignalLane](https://github.com/talocode/signallane) | Business signal detection and routing | Planned |
| **Hosted API** | [Talocode Cloud](./CLOUD.md) | Hosted API layer with wallet credits and router | Experimental |

---

## Talocode Cloud

Talocode Cloud is the hosted API layer for the entire ecosystem. One `TALOCODE_API_KEY` gives you access to every product API with prepaid wallet billing.

```bash
# All product APIs are available under /v1/{product}/ namespaces
curl https://api.talocode.xyz/v1/router/chat/completions \
  -H "Authorization: Bearer $TALOCODE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "talocode/auto",
    "messages": [
      { "role": "user", "content": "Hello" }
    ]
  }'
```

## SDK

Package name prepared for `@talocode/sdk`. Currently available as `@stacklane/sdk`.

```ts
import { Talocode } from "@talocode/sdk";

const talocode = new Talocode({ apiKey: process.env.TALOCODE_API_KEY });
const result = await talocode.tera.writing.rewrite({ text: "Hello", style: "clear" });
```

- **Prepaid wallet** — 1 credit = $0.01 USD, 100 free credits on signup
- **Pay-per-use** — every API call deducts credits from your wallet
- **OpenAI-compatible router** — automatic provider fallback (OpenAI, OpenRouter, Gemini)
- **Top-up via Stripe** — minimum $5, instant credit

[Learn more about Talocode Cloud →](./CLOUD.md)

---

## Links

| Resource | URL |
|----------|-----|
| Website | [talocode.xyz](https://talocode.xyz) — GitHub Pages landing page |
| Source | [github.com/talocode/talocode](https://github.com/talocode/talocode) |
| Cloud Dashboard | [cloud.talocode.xyz](https://cloud.talocode.xyz) |
| API Endpoint | [api.talocode.xyz](https://api.talocode.xyz) |
| Documentation | [docs.talocode.xyz](https://docs.talocode.xyz) |
| GitHub | [github.com/talocode](https://github.com/talocode) |

---

## Status

| Status | Meaning |
|--------|---------|
| **Live** | Running in production, stable APIs |
| **Experimental** | Working but evolving — APIs may change |
| **Planned** | Not yet built, design phase |
