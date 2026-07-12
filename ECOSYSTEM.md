# Talocode Ecosystem

Talocode products are organized into layers that build on each other. All products are open-source and designed to work together through Talocode Cloud.

## Layer 1: Developer Tools

Tools developers use directly on their machines.

| Product | What It Does |
|---------|-------------|
| [Codra](https://github.com/talocode/codra) | Local-first AI coding agent that works with your editor and project context |
| [Talocode Skills](https://github.com/talocode/talocode-skills) | Reusable capability modules that agents can discover and run |
| [Tera](https://github.com/talocode/tera) | Learning and context assistant that captures and summarizes information |

## Layer 2: Automation and Validation

Tools that make agent behavior observable, testable, and safe.

| Product | What It Does |
|---------|-------------|
| [Agent Browser](https://github.com/talocode/agent-browser) | Browser validation layer — run checks, take screenshots, collect evidence for agent-driven browser interactions |
| [WorkLane](https://github.com/talocode/worklane) | Agent workflow and approval runtime — human-in-the-loop for critical agent actions |

## Layer 3: Application Services

Specialized services for specific domains.

| Product | What It Does |
|---------|-------------|
| [ClipLoop](https://github.com/talocode/cliploop) | Short-form promo video engine — generate product videos from templates for indie devs |
| [Tradia](https://github.com/talocode/tradia) | Trading performance intelligence — import trades, analyze behavior, generate risk reports |
| [SignalLane](https://github.com/talocode/signallane) | X growth intelligence — account analytics, content experiments, and growth strategy for indie builders |
| [WebDataLane](https://github.com/talocode/webdatalane) | Web extraction API — turn webpages into markdown, metadata, links, and structured data |
| [InvoiceLane](https://github.com/talocode/invoicelane) | Invoice/receipt extraction API that turns business documents into structured data without OCR lock-in |
| [UGCLane](https://github.com/talocode/ugclane) | UGC workflow API — turn product positioning into original hooks, scripts, calendars and experiments |

## Layer 4: Infrastructure

The backbone that connects everything.

| Product | What It Does |
|---------|-------------|
| [Stacklane](https://github.com/talocode/stacklane) | Backend cloud platform that powers all Talocode Cloud APIs — built on PostgreSQL, provides auth, billing, project management, and usage metering |
| [Talocode Cloud](./CLOUD.md) | Hosted API layer — `TALOCODE_API_KEY`, prepaid wallet, unified billing, provider routing |

## How It Fits Together

```
                    Talocode Cloud (cloud.talocode.site)
                    ┌─────────────────────────────────┐
                    │  Auth (TALOCODE_API_KEY)         │
                    │  Wallet / Credits / Billing      │
                    │  OpenAI-compatible Router         │
                    │  Usage Metering                   │
                    └──────────┬──────────────────────┘
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                    │
     ┌────▼────┐        ┌─────▼─────┐        ┌─────▼─────┐
     │ Codra   │        │ Agent     │        │ WorkLane  │
     │ Skills  │        │ Browser   │        │           │
     └────┬────┘        └─────┬─────┘        └─────┬─────┘
          │                   │                    │
      ┌────▼────┐        ┌─────▼─────┐        ┌─────▼─────┐
      │ Tera    │        │ ClipLoop  │        │ Tradia    │
      │         │        │ WebData-  │        │ SignalLane│
      │         │        │ Lane      │        │           │
      └─────────┘        └───────────┘        └─────┬─────┘
                                                    │
                                              ┌─────▼─────┐
                                               │InvoiceLane│
                                               ├───────────┤
                                               │  UGCLane  │
                                               └───────────┘

                    Stacklane (backend platform)
              PostgreSQL | Auth | Billing | Project Management
```

## Python SDK

Every Talocode Cloud API is also available as a Python package on PyPI:

| pip install | Package | Product Access |
|-------------|---------|---------------|
| `pip install talocode` | `talocode` | Unified cloud client — all Talocode Cloud APIs |
| `pip install tradia` | `tradia` | Tradia SDK + CLI |
| `pip install contextlane` | `contextlane` | Context management CLI + SDK |
| `pip install talocode-devtool` | `talocode-devtool` | 64 developer utility CLI tools |
| `pip install talocode-tera` | `talocode-tera` | Tera API Python client |
| `pip install talocode-codra` | `talocode-codra` | Codra API Python client |

```python
from talocode import TalocodeClient

talocode = TalocodeClient()
chat = talocode.tera.chat(model="mistral-small-latest", messages=[...])
extracted = talocode.agent_browser.extract(url="https://example.com")
```

All Python packages support `TALOCODE_API_KEY` and `TALOCODE_BASE_URL` environment variables.

## Open Source

Every product in the ecosystem is open-source. You can run them independently, self-host the full stack, or use Talocode Cloud for convenience. There is no vendor lock-in.
