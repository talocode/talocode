# ReplyLane Cloud API

X reply opportunity and algorithm risk intelligence for strategic engagement.

**Base URL:** `https://api.talocode.site`  
**Namespace:** `/v1/replylane/*`  
**Auth:** `Authorization: Bearer $TALOCODE_API_KEY`

> Human-in-the-loop only. ReplyLane drafts for human posting — not auto-reply bots.

## Endpoints

| Method | Path | Credits |
|--------|------|---------|
| GET | `/v1/replylane/health` | — |
| POST | `/v1/replylane/opportunity/score` | 15 |
| POST | `/v1/replylane/targets/rank` | 25 |
| POST | `/v1/replylane/replies/draft` | 30 |
| POST | `/v1/replylane/replies/risk` | 20 |
| POST | `/v1/replylane/posts/grok-check` | 20 |
| POST | `/v1/replylane/activity/audit` | 35 |
| POST | `/v1/replylane/feeds/migrate` | 40 |
| POST | `/v1/replylane/export/markdown` | 5 |
| POST | `/v1/replylane/export/json` | 5 |

## SDK

```ts
import { Talocode } from '@talocode/sdk'

const talocode = new Talocode({ apiKey: process.env.TALOCODE_API_KEY })

const score = await talocode.replylane.opportunity.score({
  tweetText: 'We tested reply timing across 50 accounts.',
  authorHandle: 'builder',
  authorFollowers: 8000,
  yourFollowers: 800,
  ageMinutes: 5,
})
```

## Standalone package

```bash
npm install @talocode/replylane
replylane opportunity --text "..." --author builder --followers 8000 --your-followers 800
```

## Limitations

- Heuristic scores — not guaranteed reach or followers
- Grok compatibility is an approximation, not official X ranking
- No auto-posting — X requires approval for AI reply bots