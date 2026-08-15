# Talocode Products

## Stacklane

Backend cloud platform for AI-native applications. Provides authentication, project management, API key generation, prepaid wallet billing, usage metering, and a PostgreSQL-powered backend. Stacklane is the engine behind Talocode Cloud.

- **Status**: Experimental
- **Repo**: [github.com/talocode/stacklane](https://github.com/talocode/stacklane)
- **Python Packages**: `talocode` (unified cloud client on PyPI)

## Codra

Local-first AI coding agent that works with your codebase. Codra understands your project structure, runs terminal commands, edits files, and helps you ship faster. It runs entirely on your machine with no cloud dependency.

- **Status**: Experimental
- **Repo**: [github.com/talocode/codra](https://github.com/talocode/codra)

## SearchLane

Web search, news, and research context for agents.

- **Status**: Live
- **Repo**: [github.com/talocode/searchlane](https://github.com/talocode/searchlane)
- **Packages**: `@talocode/searchlane` (npm), `talocode-searchlane` (PyPI)

## XSearchLane

Realtime X posts, users, threads, and research for agents.

- **Status**: Live
- **Repo**: [github.com/talocode/xsearchlane](https://github.com/talocode/xsearchlane)
- **Packages**: `@talocode/xsearchlane` (npm), `talocode-xsearchlane` (PyPI)

## ContextLane

Context ingestion, retrieval, and knowledge records for persistent agents.

- **Status**: Experimental
- **Repo**: [github.com/talocode/contextlane](https://github.com/talocode/contextlane)
- **Package**: `contextlane` (PyPI)

## MemoryLane

Persistent memory primitives for agent workflows.

- **Status**: Experimental
- **Repo**: [github.com/talocode/memorylane](https://github.com/talocode/memorylane)

## GateLane

Agent tool control plane for policy, access, and execution gates.

- **Status**: Experimental
- **Repo**: [github.com/talocode/gatelane](https://github.com/talocode/gatelane)

## ScreenLane

Screen-aware control and visual interaction workflows.

- **Status**: Experimental
- **Repo**: [github.com/talocode/screenlane](https://github.com/talocode/screenlane)

## VerifyLane

Code and content verification for secrets, security issues, and quality markers.

- **Status**: Planned
- **Repo**: [github.com/talocode/verifylane](https://github.com/talocode/verifylane)

## TraceLane

Trace records and evidence trails for agent execution.

- **Status**: Planned
- **Repo**: [github.com/talocode/tracelane](https://github.com/talocode/tracelane)

## HandoffLane

Structured handoff records between agents and human operators.

- **Status**: Planned
- **Repo**: [github.com/talocode/handofflane](https://github.com/talocode/handofflane)

## StyleLane

Style and brand consistency checks for generated output.

- **Status**: Planned
- **Repo**: [github.com/talocode/stylelane](https://github.com/talocode/stylelane)

## SpendCaps

Spend controls and budget guardrails for agent actions.

- **Status**: Planned
- **Repo**: [github.com/talocode/spendcaps](https://github.com/talocode/spendcaps)

## PolicyLane

Policy evaluation, authorization checks, and safe action gates.

- **Status**: Planned
- **Repo**: [github.com/talocode/policylane](https://github.com/talocode/policylane)

## EvalLane

Evaluation suites and scoring for agent and model output.

- **Status**: Planned
- **Repo**: [github.com/talocode/evallane](https://github.com/talocode/evallane)

## PromptLane

Prompt management and repeatable instruction workflows.

- **Status**: Planned
- **Repo**: [github.com/talocode/promptlane](https://github.com/talocode/promptlane)

## RetryLane

Safe retry policies and recovery workflows for agent operations.

- **Status**: Planned
- **Repo**: [github.com/talocode/retrylane](https://github.com/talocode/retrylane)

## Agent Browser / Web Intelligence

Browser validation and web intelligence layer for AI agents. Agent Browser lets agents check web pages, take screenshots, extract structured content, analyze page content with AI, collect evidence, and run trace reports. Exposes a REST API and MCP server.

- **Status**: Experimental (extract + analyze in v0.2.0)
- **Repo**: [github.com/talocode/agent-browser](https://github.com/talocode/agent-browser)
- **Endpoints**: `check`, `screenshot`, `evidence`, `extract`, `analyze`, `trace-report`

## WorkLane

Agent workflow and approval runtime. WorkLane orchestrates multi-step agent tasks with human-in-the-loop approval gates. Planned for hosted execution through Talocode Cloud.

- **Status**: Planned
- **Repo**: [github.com/talocode/worklane](https://github.com/talocode/worklane)

## BotLane

Telegram bridge for Grok/xAI-powered bots. BotLane connects a Grok bot to Telegram for 1:1 and group chat, with session memory and an allowlist. Ships as npm + PyPI packages with a CLI, SDK, MCP server, and HTTP API under `/v1/botlane/*`.

- **Status**: Experimental
- **Repo**: [github.com/talocode/botlane](https://github.com/talocode/botlane)
- **npm**: [npmjs.com/package/@talocode/botlane](https://www.npmjs.com/package/@talocode/botlane)
- **PyPI**: [pypi.org/project/talocode-botlane](https://pypi.org/project/talocode-botlane)
- **API**: `/v1/botlane/*` (`health`, `chat`, `send`, `history`, `reset`)

## Talocode Skills

Reusable skill definitions for AI agents. Skills are structured capability modules that agents can discover, install, and run. Built on the Skills SDK.

- **Status**: Experimental
- **Repo**: [github.com/talocode/talocode-skills](https://github.com/talocode/talocode-skills)

## Tera

Learning and context assistant. Tera captures web content, summarizes it, and builds a personal knowledge base. Designed as a browser extension and API service.

- **Status**: Planned
- **Repo**: [github.com/talocode/tera](https://github.com/talocode/tera)

## ClipLoop

Short-form promo video engine for indie developers. Generate product demo videos, social media promos, and app store previews from templates. API-driven with Remotion rendering.

- **Status**: Experimental
- **Repo**: [github.com/talocode/cliploop](https://github.com/talocode/cliploop)

## Tradia

Agentic trading intelligence for trade proposals, risk checks, journals, performance reports and public accountability updates.

- **Status**: Experimental
- **Repo**: [github.com/talocode/tradia](https://github.com/talocode/tradia)
- **Packages**: `@talocode/tradia` (npm), `tradia` (PyPI)

## SignalLane

X growth intelligence — account analytics, content experiments, and growth strategy for indie builders.

- **Status**: Planned
- **Repo**: [github.com/talocode/signallane](https://github.com/talocode/signallane)

## MessageLane

Consent-aware SMS campaign operations for agents and teams. Import consented contacts, create campaigns, dispatch through approved gateways, and retain delivery records through a TypeScript SDK, CLI, HTTP API, MCP server, and Python SDK.

- **Status**: Experimental
- **Repo**: [github.com/talocode/messagelane](https://github.com/talocode/messagelane)
- **Packages**: `@talocode/messagelane` (npm), `talocode-messagelane` (PyPI)

## WebDataLane

Web extraction API. Turn webpages into clean markdown, metadata, links, and structured data through one API. Includes URL fetch, markdown conversion, metadata extraction, link discovery, structured data extraction, and crawl planning. Local helpers work without an API key.

- **Status**: Experimental
- **Repo**: [github.com/talocode/webdatalane](https://github.com/talocode/webdatalane)

## GeoLane

AI visibility and citation-readiness audits for websites.

- **Status**: Experimental
- **Repo**: [github.com/talocode/geolane](https://github.com/talocode/geolane)

## InvoiceLane

Invoice/receipt extraction API. Turn receipts, invoices and business documents into clean structured data through one API.

- **Status**: Planned
- **Repo**: [github.com/talocode/invoicelane](https://github.com/talocode/invoicelane)

## CrawlerLane

AI crawler intelligence API for founders, builders and websites. Analyze access logs from sites you own to understand what AI assistants, search engines and crawlers are doing — bot traffic ratios, missing pages, AI visibility scores, and weekly reports. Open-source local usage works without Talocode Cloud; hosted API is billed with credits.

- **Status**: Experimental
- **Repo**: [github.com/talocode/crawlerlane](https://github.com/talocode/crawlerlane)
- **Package**: `@talocode/crawlerlane`

## ForgeCAD

Local-first CAD workflow API. Generate parametric OpenSCAD scripts, BOMs, cut lists, printability checks, and engineering design reports. Open-source local usage works without Talocode Cloud; hosted API is billed with credits.

- **Status**: Experimental
- **Repo**: [github.com/talocode/forgecad](https://github.com/talocode/forgecad)
- **Package**: `@talocode/forgecad`

## OpenSourceLane

Open-source software intelligence API. Find alternatives to expensive SaaS tools, score adoption risk, estimate cost savings, and generate migration plans. Open-source local usage works without Talocode Cloud; hosted API is billed with credits.

- **Status**: Experimental
- **Repo**: [github.com/talocode/opensourcelane](https://github.com/talocode/opensourcelane)
- **Package**: `@talocode/opensourcelane`

## ReplyLane

X reply opportunity and algorithm risk intelligence API. Score reply opportunities, draft strategic replies, detect deboost risk, check Grok compatibility, and plan Communities migration. Human-in-the-loop only.

- **Status**: Experimental
- **Repo**: [github.com/talocode/replylane](https://github.com/talocode/replylane)
- **Package**: `@talocode/replylane`

## UGCLane

Programmable UGC workflow API for original hooks, scripts, calendars and experiments.

- **Status**: Experimental
- **Repo**: [github.com/talocode/ugclane](https://github.com/talocode/ugclane)

## Talocode Cloud

Hosted API layer for the entire ecosystem. One API key gives access to every product with unified prepaid billing. Includes an OpenAI-compatible provider router.

- **Status**: Experimental
- **Docs**: [CLOUD.md](./CLOUD.md)

## Python SDK Packages

Python clients for every Talocode product, published on PyPI.

| Package | Install | What It Does |
|---------|---------|-------------|
| `talocode` | `pip install talocode` | Unified cloud client — Tera, Agent Browser, Skills, SearchLane, billing |
| `tradia` | `pip install tradia` | Trading intelligence — agent plans, risk, journal, performance, backtest |
| `contextlane` | `pip install contextlane` | Context management — loaders, chunker, extractor, search, memory |
| `talocode-devtool` | `pip install talocode-devtool` | 64 developer utilities — base64, JWT, UUID, JSON, hash, URL, cron, etc. |
| `talocode-tera` | `pip install talocode-tera` | Tera API — chat, writing.rewrite, writing.draft, coding.explain, coding.review |
| `talocode-codra` | `pip install talocode-codra` | Codra API — repo.summary, explain, review, plan |
