# CrawlerLane Cloud API

AI crawler intelligence for websites you own.

**Base URL:** `https://api.talocode.site`  
**Namespace:** `/v1/crawlerlane/*`  
**Auth:** `Authorization: Bearer $TALOCODE_API_KEY`

> CrawlerLane is not spyware. Only analyze logs from domains you own. Bot classification is heuristic — not guaranteed identity.

## Endpoints

| Method | Path | Credits |
|--------|------|---------|
| GET | `/v1/crawlerlane/health` | — |
| POST | `/v1/crawlerlane/logs/ingest` | 5 |
| POST | `/v1/crawlerlane/bots/classify` | 2 |
| POST | `/v1/crawlerlane/pages/analyze` | 20 |
| POST | `/v1/crawlerlane/404/analyze` | 20 |
| POST | `/v1/crawlerlane/ai-visibility/score` | 30 |
| POST | `/v1/crawlerlane/report/generate` | 40 |
| POST | `/v1/crawlerlane/sitemap/suggest` | 20 |
| POST | `/v1/crawlerlane/robots/audit` | 15 |
| POST | `/v1/crawlerlane/export/markdown` | 5 |
| POST | `/v1/crawlerlane/export/json` | 5 |

## SDK

```ts
import { Talocode } from '@talocode/sdk'

const talocode = new Talocode({ apiKey: process.env.TALOCODE_API_KEY })

await talocode.crawlerlane.bots.classify({ userAgent: 'ChatGPT-User' })
await talocode.crawlerlane.report.generate({ domain: 'talocode.site', logs })
```

## Standalone package

```bash
npm install @talocode/crawlerlane
npx crawlerlane classify --user-agent "ChatGPT-User"
```

## Privacy

- Redact or hash IP addresses before sending logs
- Do not submit logs from sites you do not own
- Do not use CrawlerLane to bypass robots.txt or rate limits