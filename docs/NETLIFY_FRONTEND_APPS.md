# Netlify Frontend Apps Deployment Guide

This guide documents how to deploy the Talocode frontend apps to Netlify.

## Overview

Three standalone Vite + React + TypeScript + Tailwind apps are deployed as independent Netlify sites:

| App | Domain | Directory | Purpose |
|-----|--------|-----------|---------|
| Cloud | `dashboard.talocode.site` | `apps/cloud` | Talocode Cloud product page |
| Docs | `docs.talocode.site` | `apps/docs` | Documentation site |
| Dashboard | `dashboard.talocode.site` | `apps/dashboard` | User dashboard (key management, billing, usage) |

## Prerequisites

- Netlify account
- `talocode.site` DNS managed at Namecheap (or equivalent)
- Each app directory has its own `package.json` and `netlify.toml`

## Deploy Each App

### 1. Connect Repository to Netlify

1. Go to [netlify.com](https://netlify.com) → **Sites** → **Add new site** → **Import an existing project**
2. Connect the `talocode/talocode` GitHub repository
3. For each app, configure as follows:

### 2. Per-App Netlify Configuration

#### dashboard.talocode.site

| Setting | Value |
|---------|-------|
| Base directory | `apps/cloud` |
| Build command | `npm install && npm run build` |
| Publish directory | `apps/cloud/dist` |
| Custom domain | `dashboard.talocode.site` |

#### docs.talocode.site

| Setting | Value |
|---------|-------|
| Base directory | `apps/docs` |
| Build command | `npm install && npm run build` |
| Publish directory | `apps/docs/dist` |
| Custom domain | `docs.talocode.site` |

#### dashboard.talocode.site

| Setting | Value |
|---------|-------|
| Base directory | `apps/dashboard` |
| Build command | `npm install && npm run build` |
| Publish directory | `apps/dashboard/dist` |
| Custom domain | `dashboard.talocode.site` |

**Important:** In each site's Netlify settings, set the publish directory **relative to the repository root** (e.g., `apps/cloud/dist`), not relative to the base directory. Netlify's UI asks for the publish directory relative to the base, but the `netlify.toml` file in each app directory uses it relative to the base.

### 3. DNS Configuration

After each app is deployed, Netlify provides a default `*.netlify.app` URL (e.g., `talocode-cloud.netlify.app`). Add the corresponding custom domain in Netlify's **Domain settings**, then configure DNS at Namecheap:

1. Netlify will show the target CNAME (e.g., `talocode-cloud.netlify.app`)
2. In Namecheap → Domain List → talocode.site → Advanced DNS, add:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| CNAME | `cloud` | `{netlify-cloud-app}.netlify.app` | Automatic |
| CNAME | `docs` | `{netlify-docs-app}.netlify.app` | Automatic |
| CNAME | `dashboard` | `{netlify-dashboard-app}.netlify.app` | Automatic |

**Do NOT point these subdomains to `talocode.github.io`** (that's only for `talocode.site`).

### 4. SSL / TLS

Netlify automatically provisions and renews Let's Encrypt certificates for custom domains. Allow up to 24 hours for DNS propagation and SSL provisioning.

## Local Development

```bash
# Cloud app
cd apps/cloud && npm install && npm run dev

# Docs app
cd apps/docs && npm install && npm run dev

# Dashboard app
cd apps/dashboard && npm install && npm run dev
```

Or from the root:

```bash
npm run dev:cloud
npm run dev:docs
npm run dev:dashboard
```

## Build

```bash
# Individual apps
npm run build:cloud
npm run build:docs
npm run build:dashboard

# All frontends
npm run build:frontends
```

## Verification

```bash
node scripts/check-frontend-apps.mjs
```

## Troubleshooting

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| Build fails with module not found | Missing `node_modules` | Run `npm install` in the app directory |
| 404 on subdomain | DNS not propagated or wrong CNAME | Verify CNAME target from Netlify |
| Netlify deploy fails on base directory | Wrong publish directory path | Use `apps/{app}/dist` relative to repo root |
| SSL not ready | DNS not fully propagated | Wait up to 24h |
