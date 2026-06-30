# Talocode Cloud

Talocode Cloud is the hosted API layer for the Talocode ecosystem. A single `TALOCODE_API_KEY` unlocks access to every product API with unified prepaid billing.

## Authentication

Include your API key in every request:

```
Authorization: Bearer tk_dev_xxxxxxxxxxxx
```

Keys are generated per project from the [Cloud Dashboard](https://cloud.talocode.xyz).

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
| talocode/auto | 2 credits | 1 credit | 2 credits |
| talocode/fast | 1 credit | 1 credit | 1 credit |
| talocode/coding | 3 credits | 2 credits | 4 credits |

## Product APIs

Every Talocode product exposes its API through Talocode Cloud with the same authentication and billing.

| Product | Example Action | Credits |
|---------|---------------|---------|
| Agent Browser | `browser.check` | 2 |
| Agent Browser | `browser.screenshot` | 3 |
| Agent Browser | `browser.evidence` | 3 |
| Tera Context | `context.capture` | 2 |
| ClipLoop | `brief.generate` | 10 |
| Tradia | `performance.analyze` | 15 |

Full pricing is available at `GET /api/v1/cloud/pricing`.

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/v1/models` | None | List available models |
| POST | `/v1/chat/completions` | API Key | Chat completion with provider routing |
| POST | `/api/v1/cloud/usage/charge` | API Key | Charge credits for an action |
| GET | `/api/v1/cloud/pricing` | None | List full pricing catalog |
| GET | `/api/v1/cloud/projects/{id}/wallet` | Session | Wallet balance |
| GET | `/api/v1/cloud/projects/{id}/usage` | Session | Usage history |

## Status

Talocode Cloud is **experimental**. APIs are working but may evolve. Backward compatibility will be maintained where possible.
