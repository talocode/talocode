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

## Step-by-Step (Namecheap)

1. Log in to [Namecheap](https://www.namecheap.com)
2. Go to **Domain List** → **talocode.site** → **Manage**
3. Under **Nameservers**, ensure they use Namecheap's BasicDNS (or set your own)
4. Under **Advanced DNS**, add the following records:

### Root A Records

Add four A records pointing to GitHub Pages IPs:

| Type | Host | Value |
|------|------|-------|
| A Record | `@` | `185.199.108.153` |
| A Record | `@` | `185.199.109.153` |
| A Record | `@` | `185.199.110.153` |
| A Record | `@` | `185.199.111.153` |

### www CNAME

| Type | Host | Value |
|------|------|-------|
| CNAME Record | `www` | `talocode.github.io` |

## Subdomain Architecture

### talocode.site — GitHub Pages

The apex domain `talocode.site` is served via GitHub Pages from the `docs/` directory. This remains the public brand and home site. **Do not remove this setup.**

### cloud.talocode.site — Netlify (Vite App)

The `cloud.talocode.site` subdomain will be served as a standalone Vite + React app deployed to **Netlify**.

DNS: When Netlify provides the deployment target, add a CNAME record:
- `cloud` CNAME → `{netlify-app}.netlify.app`

Full instructions in [`docs/NETLIFY_FRONTEND_APPS.md`](./NETLIFY_FRONTEND_APPS.md).

### docs.talocode.site — Netlify (Vite App)

The `docs.talocode.site` subdomain will be served as a standalone Vite + React app deployed to **Netlify**.

DNS: When Netlify provides the deployment target, add a CNAME record:
- `docs` CNAME → `{netlify-app}.netlify.app`

Full instructions in [`docs/NETLIFY_FRONTEND_APPS.md`](./NETLIFY_FRONTEND_APPS.md).

### dashboard.talocode.site — Netlify (Vite App)

The `dashboard.talocode.site` subdomain will be served as a standalone Vite + React app deployed to **Netlify**.

DNS: When Netlify provides the deployment target, add a CNAME record:
- `dashboard` CNAME → `{netlify-app}.netlify.app`

Full instructions in [`docs/NETLIFY_FRONTEND_APPS.md`](./NETLIFY_FRONTEND_APPS.md).

### api.talocode.site — Backend Host

**Target:** Stacklane API hosting provider (NOT GitHub Pages, NOT Netlify frontend).

api.talocode.site must NOT point to GitHub Pages because it needs a backend server.

Options:
- CNAME to the hosting provider's endpoint (e.g., Railway, Render, Fly.io)
- Or A record pointing to a VPS IP

### Summary Table

| Subdomain | Hosting | Type |
|-----------|---------|------|
| talocode.site | GitHub Pages | Static brand site |
| cloud.talocode.site | Netlify | Vite + React app |
| docs.talocode.site | Netlify | Vite + React app |
| dashboard.talocode.site | Netlify | Vite + React app |
| api.talocode.site | Backend host | API server |

## SSL / TLS

- **GitHub Pages** automatically provisions Let's Encrypt certificates for custom domains.
- **Other providers** typically auto-provision via Let's Encrypt as well.
- Allow **up to 24 hours** for DNS propagation and SSL certificate provisioning.

## Verification

After DNS propagation:

```bash
dig +short talocode.site
# Should return 185.199.108.153 (and the other three IPs)

curl -I https://talocode.site
# Should return 200 OK with GitHub Pages headers
```

## Rollback / Legacy Alias

The old domain **talocode.xyz** is retained as a legacy/future alias. If DNS for talocode.site fails, you can:

1. Temporarily update the talocode.xyz DNS to point to the same GitHub Pages deployment
2. Or set up a redirect from talocode.xyz to talocode.site

## Troubleshooting

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| SSL not ready | DNS not fully propagated | Wait up to 24h |
| www redirect loop | Missing CNAME for www | Ensure CNAME www → talocode.github.io |
| GitHub Pages 404 | Custom domain not set in repo settings | Add talocode.site in Settings → Pages → Custom domain |
| Subdomain not resolving | No DNS record for subdomain | Add the appropriate CNAME or A record |

## Resources

- [GitHub Pages Custom Domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Namecheap DNS Management](https://www.namecheap.com/support/knowledgebase/category.aspx/10/dns/)
