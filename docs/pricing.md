# Talocode Cloud Pricing

One API key (`TALOCODE_API_KEY`). One wallet. Every product is billed at the same credit rate.

> **ClipLoop API key migration:** `CLIPLOOP_API_KEY` is deprecated. Use `TALOCODE_API_KEY` for all hosted ClipLoop API access. See [CLOUD.md](../CLOUD.md).

## Credit System

- 1 credit = $0.01 USD
- 100 free credits on new project creation ($1.00)
- Minimum top-up: 500 credits ($5.00)

## Router Pricing

| Model | Per Request | Per 1K Input | Per 1K Output |
|-------|-------------|--------------|---------------|
| talocode/auto | 4 cr | 2 cr | 3 cr |
| talocode/fast | 2 cr | 1 cr | 2 cr |
| talocode/coding | 5 cr | 3 cr | 6 cr |

## Product Action Pricing

| Product | Action | Credits |
|---------|--------|---------|
| agent_browser | browser.check | 5 |
| agent_browser | browser.screenshot | 8 |
| agent_browser | browser.evidence | 8 |
| agent_browser | browser.trace_report | 15 |
| tera_context | context.capture | 5 |
| tera_context | context.summarize | 10 |
| talocode_reach | web.read | 3 |
| talocode_reach | search.query | 3 |
| talocode_reach | github.read | 3 |
| cliploop | brief.generate | 15 |
| cliploop | script.generate | 15 |
| cliploop | video.render | 200 |
| cliploop | campaign.create | 50 |
| cliploop | campaign.package | 400 |
| tradia | trade.import | 3 |
| tradia | performance.analyze | 20 |
| tradia | risk.report | 35 |
| codra | repo.summary | 50 |
| codra | explain | 20 |
| codra | review | 40 |
| codra | plan | 40 |
| worklane | workflow.small | 15 |
| worklane | workflow.large | 40 |
| signallane | x.analyze | 30 |
| signallane | x.content_plan | 40 |
| signallane | x.post_drafts | 40 |
| signallane | x.experiments | 30 |
| signallane | x.report | 60 |

Full pricing is available programmatically at `GET /api/v1/cloud/pricing`.
