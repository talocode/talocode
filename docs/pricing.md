# Talocode Cloud Pricing

## Credit System

- 1 credit = $0.01 USD
- 100 free credits on new project creation ($1.00)
- Minimum top-up: 500 credits ($5.00)

## Router Pricing

| Model | Per Request | Per 1K Input | Per 1K Output |
|-------|-------------|--------------|---------------|
| talocode/auto | 2 cr | 1 cr | 2 cr |
| talocode/fast | 1 cr | 1 cr | 1 cr |
| talocode/coding | 3 cr | 2 cr | 4 cr |

## Product Action Pricing

| Product | Action | Credits |
|---------|--------|---------|
| agent_browser | browser.check | 2 |
| agent_browser | browser.screenshot | 3 |
| agent_browser | browser.evidence | 3 |
| agent_browser | browser.trace_report | 5 |
| tera_context | context.capture | 2 |
| tera_context | context.summarize | 5 |
| talocode_reach | web.read | 2 |
| talocode_reach | search.query | 2 |
| talocode_reach | github.read | 2 |
| cliploop | brief.generate | 10 |
| cliploop | script.generate | 10 |
| cliploop | video.render | 150 |
| tradia | trade.import | 2 |
| tradia | performance.analyze | 15 |
| tradia | risk.report | 25 |
| codra | task.small | 25 |
| codra | task.large | 100 |
| worklane | workflow.small | 10 |
| worklane | workflow.large | 25 |

Full pricing is available programmatically at `GET /api/v1/cloud/pricing`.
