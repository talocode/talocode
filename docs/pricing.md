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
| webdatalane | fetch | 5 |
| webdatalane | extract | 10 |
| webdatalane | markdown | 10 |
| webdatalane | metadata | 5 |
| webdatalane | links | 5 |
| webdatalane | structured | 20 |
| webdatalane | crawl.plan | 15 |
| webdatalane | screenshot | 50 |
| invoicelane | extract | 20 |
| invoicelane | receipt.extract | 20 |
| invoicelane | invoice.extract | 30 |
| invoicelane | validate | 10 |
| invoicelane | export.csv | 5 |
| ugclane | strategy.generate | 30 |
| ugclane | competitor.analyze | 40 |
| ugclane | hooks.generate | 20 |
| ugclane | scripts.generate | 40 |
| ugclane | accounts.plan | 30 |
| ugclane | calendar.generate | 60 |
| ugclane | experiments.generate | 30 |
| ugclane | report.generate | 40 |
| ugclane | export.markdown | 5 |
| ugclane | export.json | 5 |
| crawlerlane | logs.ingest | 5 |
| crawlerlane | bots.classify | 2 |
| crawlerlane | pages.analyze | 20 |
| crawlerlane | 404.analyze | 20 |
| crawlerlane | ai_visibility.score | 30 |
| crawlerlane | report.generate | 40 |
| crawlerlane | sitemap.suggest | 20 |
| crawlerlane | robots.audit | 15 |
| crawlerlane | export.markdown | 5 |
| crawlerlane | export.json | 5 |
| opensourcelane | repo.analyze | 25 |
| opensourcelane | alternatives.find | 30 |
| opensourcelane | migration.plan | 50 |
| opensourcelane | cost.estimate | 20 |
| opensourcelane | risk.score | 30 |
| opensourcelane | brief.generate | 40 |
| opensourcelane | tools.compare | 35 |
| opensourcelane | deployment.plan | 35 |
| opensourcelane | license.audit | 20 |
| opensourcelane | export.markdown | 5 |
| opensourcelane | export.json | 5 |
| forgecad | design.generate | 60 |
| forgecad | openscad.generate | 40 |
| forgecad | bom.generate | 20 |
| forgecad | cutlist.generate | 20 |
| forgecad | assembly.plan | 25 |
| forgecad | printability.check | 25 |
| forgecad | manufacturability.check | 30 |
| forgecad | design.review | 40 |
| forgecad | material.estimate | 20 |
| forgecad | tools.detect | 5 |
| forgecad | render.openscad | 80 |
| forgecad | export.markdown | 5 |
| forgecad | export.json | 5 |

Full pricing is available programmatically at `GET /api/v1/cloud/pricing`.
