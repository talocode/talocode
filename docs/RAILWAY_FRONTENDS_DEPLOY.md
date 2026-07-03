# Railway Frontend Apps Deployment Guide

This guide documents how to deploy the Talocode frontend apps (Cloud, Docs, Dashboard) to Railway.

## Architecture

Each frontend app is a separate **Railway service** deployed from the same `talocode/talocode` repo.
Railway's **Root Directory** setting tells each service which subdirectory to use.

| Service | Domain | Root Directory | Build | Start |
|---------|--------|----------------|-------|-------|
| `talocode-cloud` | cloud.talocode.site | `apps/cloud` | `npm install && npm run build` | `npm start` |
| `talocode-docs` | docs.talocode.site | `apps/docs` | `npm install && npm run build` | `npm start` |
| `talocode-dashboard` | dashboard.talocode.site | `apps/dashboard` | `npm install && npm run build` | `npm start` |

## Prerequisites

- Railway account with billing enabled
- Access to `talocode.site` DNS at Namecheap
- The `main` branch pushed to `github.com/talocode/talocode`

## Deploy Each App

### Step 1: Create Railway Project

1. Go to [railway.app](https://railway.app) → **Dashboard** → **New Project**
2. Select **Deploy from GitHub repo**
3. Connect `github.com/talocode/talocode`

### Step 2: Configure Service

For each app, configure the Railway service:

1. In the project, click **New** → **Service** → **Add a service**
2. Select the connected repo
3. Go to **Settings** → **General** → **Root Directory**
4. Set to the app's directory (e.g., `apps/cloud`)
5. Set **Build Command**: `npm install && npm run build`
6. Set **Start Command**: `npm start`
7. Railway auto-injects `PORT` environment variable

### Step 3: Set Environment Variables

All three apps use Vite environment variables (prefixed with `VITE_`).

| Variable | Value | Required |
|----------|-------|----------|
| `VITE_TALOCODE_BASE_URL` | `https://api.talocode.site` | Yes |
| `VITE_TALOCODE_WEB_URL` | `https://talocode.site` | Yes |
| `VITE_TALOCODE_CLOUD_URL` | `https://cloud.talocode.site` | Yes |
| `VITE_TALOCODE_DOCS_URL` | `https://docs.talocode.site` | Yes |
| `VITE_TALOCODE_DASHBOARD_URL` | `https://dashboard.talocode.site` | Yes |

Set these in Railway's **Variables** tab for each service.

### Step 4: Add Custom Domain

After deployment, Railway provides a URL like `talocode-cloud.up.railway.app`.

1. Go to **Settings** → **Domains** → **Custom Domain**
2. Add the domain for the service (e.g., `cloud.talocode.site`)
3. Railway will prompt for DNS configuration

### Step 5: DNS (Namecheap)

For each subdomain, add a CNAME record in Namecheap:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| CNAME | `cloud` | `{railway-cloud-service}.railway.app` | Automatic |
| CNAME | `docs` | `{railway-docs-service}.railway.app` | Automatic |
| CNAME | `dashboard` | `{railway-dashboard-service}.railway.app` | Automatic |

> **Important:** Remove any existing URL Redirect or CNAME records for these subdomains pointing to GitHub Pages or Netlify.

## Verify Deployment

```bash
# Cloud app
curl -I https://cloud.talocode.site
# Expected: 200 OK, served by Railway

# Docs app
curl -I https://docs.talocode.site
# Expected: 200 OK

# Dashboard app
curl -I https://dashboard.talocode.site
# Expected: 200 OK
```

## Rollback Plan

1. **Revert DNS**: Point the subdomain back to the previous hosting or remove the CNAME.
2. **Redeploy previous version**: In Railway → **Deployments** → select last good deployment → **Redeploy**.
3. **Pin deployment**: If stability is critical, pin to a specific deployment.

## Local Testing

```bash
# Cloud
cd apps/cloud
npm install
npm run dev           # dev server with HMR
npm run build && npm start   # production build + serve

# Docs
cd apps/docs
npm install
npm run dev
npm run build && npm start

# Dashboard
cd apps/dashboard
npm install
npm run dev
npm run build && npm start
```

## Troubleshooting

| Problem | Cause | Fix |
|---------|-------|-----|
| 404 on subdomain | DNS not propagated or wrong CNAME | Verify Railway service domain settings |
| App crashes on start | Missing `PORT` or build incomplete | Check Railway logs |
| Blank page | VITE_* env vars not set | Set `VITE_TALOCODE_BASE_URL` and others |
| Build fails | Missing `node_modules` | Ensure `npm install` runs before `npm run build` |
| `serve` not found | Missing `serve` dependency | Add `"serve": "^14.2.0"` to devDependencies |
