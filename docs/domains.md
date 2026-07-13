# Talocode DNS — talocode.site

## Primary Domain

The primary Talocode domain is now **talocode.site**.

### Apex Domain (talocode.site)

| Record | Target | Status |
|--------|--------|--------|
| A (root) | `185.199.108.153` | Pending DNS |
| A (root) | `185.199.109.153` | Pending DNS |
| A (root) | `185.199.110.153` | Pending DNS |
| A (root) | `185.199.111.153` | Pending DNS |
| CNAME www | `talocode.github.io` | Pending DNS |

### Subdomains

| Subdomain | Purpose | Hosting |
|-----------|---------|---------|
| talocode.site | Main site / homepage | GitHub Pages (A records to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`) |
| api.talocode.site | API endpoint | Netlify |
| docs.talocode.site | Documentation site | Netlify |
| dashboard.talocode.site | Cloud dashboard | Netlify |
| stacklane.talocode.site | Stacklane platform | Netlify |
| dashboard.talocode.site | Dashboard | Netlify |

## Legacy Aliases (Future)

The following .xyz domains are retained as legacy aliases for backward compatibility:

- talocode.xyz
- api.talocode.xyz
- docs.talocode.xyz
- cloud.talocode.xyz

These may be redirected to the .site equivalents in a future phase.

## SSL

- Let's Encrypt (auto via Namecheap/GitHub Pages) automates SSL.
- Allow up to 24 hours for DNS propagation and SSL provisioning.
