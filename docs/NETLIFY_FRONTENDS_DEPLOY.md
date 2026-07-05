# Netlify Frontend Apps Deployment Guide

Deploy Talocode frontend apps (Cloud, Docs, Dashboard) to Netlify.

## Architecture

Each app is a separate **Netlify site** from the `talocode/talocode` repo. Use the `base` directory in each app's `netlify.toml`.

| Site | Domain | Base directory | Config |
|------|--------|----------------|--------|
| `talocode-cloud` | cloud.talocode.site | `apps/cloud` | `apps/cloud/netlify.toml` |
| `talocode-docs` | docs.talocode.site | `apps/docs` | `apps/docs/netlify.toml` |
| `talocode-dashboard` | dashboard.talocode.site | `apps/dashboard` | `apps/dashboard/netlify.toml` |

## Prerequisites

- Netlify account
- `NETLIFY_AUTH_TOKEN` for CLI deploys
- DNS access for `talocode.site` at Namecheap

## Deploy Each App

### Option A: Netlify UI

1. Netlify → **Add new site** → **Import from Git**
2. Connect `github.com/talocode/talocode`
3. Set base directory to the app folder (e.g. `apps/cloud`)
4. Netlify reads `netlify.toml` from that directory
5. Add custom domain (e.g. `cloud.talocode.site`)

### Option B: Netlify CLI

```bash
export NETLIFY_AUTH_TOKEN="your-token"

# Cloud app
cd apps/cloud
netlify link
netlify deploy --prod

# Docs app
cd ../docs
netlify link
netlify deploy --prod

# Dashboard app
cd ../dashboard
netlify link
netlify deploy --prod
```

## Environment Variables

Set per site in Netlify → Site settings → Environment variables:

| Variable | Value |
|----------|-------|
| `VITE_TALOCODE_BASE_URL` | `https://api.talocode.site` |
| `VITE_TALOCODE_WEB_URL` | `https://talocode.site` |
| `VITE_TALOCODE_CLOUD_URL` | `https://cloud.talocode.site` |
| `VITE_TALOCODE_DOCS_URL` | `https://docs.talocode.site` |
| `VITE_TALOCODE_DASHBOARD_URL` | `https://dashboard.talocode.site` |

## DNS (Namecheap)

| Type | Host | Value |
|------|------|-------|
| CNAME | `cloud` | `talocode-cloud.netlify.app` |
| CNAME | `docs` | `talocode-docs.netlify.app` |
| CNAME | `dashboard` | `talocode-dashboard.netlify.app` |

Use the actual Netlify site URLs from your dashboard after linking.

## Verify Deployment

```bash
node scripts/smoke-netlify-frontends.mjs https://cloud.talocode.site
node scripts/smoke-netlify-frontends.mjs https://docs.talocode.site
node scripts/smoke-netlify-frontends.mjs https://dashboard.talocode.site
```

## Rollback

1. Netlify → **Deploys** → last good deploy → **Publish deploy**
2. Re-run smoke script for the affected subdomain