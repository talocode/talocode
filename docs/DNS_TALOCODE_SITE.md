# DNS Setup Guide — talocode.site

This guide documents how to set up DNS for **talocode.site** at Namecheap.

## Quick Reference

| Record | Type | Value | TTL |
|--------|------|-------|-----|
| `@` (root) | A | `185.199.108.153` | Automatic |
| `@` (root) | A | `185.199.109.153` | Automatic |
| `@` (root) | A | `185.199.110.153` | Automatic |
| `@` (root) | A | `185.199.111.153` | Automatic |
| `www` | CNAME | `talocode.github.io` | Automatic |
| `api` | CNAME | `talocode-cloud-api.netlify.app` | Automatic |
| `cloud` | CNAME | `talocode-cloud.netlify.app` | Automatic |
| `docs` | CNAME | `talocode-docs.netlify.app` | Automatic |
| `dashboard` | CNAME | `talocode-dashboard.netlify.app` | Automatic |

> Use the actual Netlify site hostnames from your Netlify dashboard after linking sites.

## Step-by-Step (Namecheap)

1. Log in to [Namecheap](https://www.namecheap.com)
2. Go to **Domain List** → **talocode.site** → **Manage**
3. Under **Advanced DNS**, add the records above

## Subdomain Architecture

| Subdomain | Hosting | Type |
|-----------|---------|------|
| talocode.site | GitHub Pages | Static brand site |
| api.talocode.site | Netlify Functions | Stacklane API |
| dashboard.talocode.site | Netlify | Vite + React app |
| docs.talocode.site | Netlify | Vite + React app |
| dashboard.talocode.site | Netlify | Vite + React app |

### Deployment guides

- API: [`Stacklane/docs/NETLIFY_API_DEPLOY.md`](https://github.com/talocode/Stacklane/blob/main/docs/NETLIFY_API_DEPLOY.md)
- Frontends: [`docs/NETLIFY_FRONTENDS_DEPLOY.md`](./NETLIFY_FRONTENDS_DEPLOY.md)

## SSL / TLS

Netlify and GitHub Pages auto-provision Let's Encrypt certificates. Allow up to 24 hours for DNS propagation.

## Verification

```bash
dig +short talocode.site
curl -I https://talocode.site
curl https://api.talocode.site/api/v1/cloud/health
```

## Rollback / Legacy Alias

The old domain **talocode.xyz** is retained as a legacy alias. If DNS for talocode.site fails, temporarily point talocode.xyz to the same targets or redirect to talocode.site.