# OpenSourceLane Cloud API

Open-source software intelligence for discovering SaaS alternatives, scoring adoption risk, and planning migrations.

**Base URL:** `https://api.talocode.site`  
**Namespace:** `/v1/opensourcelane/*`  
**Auth:** `Authorization: Bearer $TALOCODE_API_KEY`

> Not legal or financial advice. Risk scores are heuristic — not security audits.

## Endpoints

| Method | Path | Credits |
|--------|------|---------|
| GET | `/v1/opensourcelane/health` | — |
| POST | `/v1/opensourcelane/repo/analyze` | 25 |
| POST | `/v1/opensourcelane/alternatives/find` | 30 |
| POST | `/v1/opensourcelane/migration/plan` | 50 |
| POST | `/v1/opensourcelane/cost/estimate` | 20 |
| POST | `/v1/opensourcelane/risk/score` | 30 |
| POST | `/v1/opensourcelane/brief/generate` | 40 |
| POST | `/v1/opensourcelane/tools/compare` | 35 |
| POST | `/v1/opensourcelane/deployment/plan` | 35 |
| POST | `/v1/opensourcelane/license/audit` | 20 |
| POST | `/v1/opensourcelane/export/markdown` | 5 |
| POST | `/v1/opensourcelane/export/json` | 5 |

## SDK

```ts
import { Talocode } from '@talocode/sdk'

const talocode = new Talocode({ apiKey: process.env.TALOCODE_API_KEY })

await talocode.opensourcelane.alternatives.find({ replace: 'Jira', teamSize: 6 })
await talocode.opensourcelane.migration.plan({ from: 'Jira', to: 'hudy9x/namviek', teamSize: 6 })
```

## Standalone package

```bash
npm install @talocode/opensourcelane
npx opensourcelane alternatives --replace Jira --team-size 6
```

## Boundaries

- Do not treat risk scores as security guarantees
- Cost estimates are projections only
- License audits are informational — consult legal counsel
- Do not scrape private repositories