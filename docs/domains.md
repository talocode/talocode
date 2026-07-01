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

| Subdomain | Purpose | Plan |
|-----------|---------|------|
| api.talocode.site | API endpoint | Point to Stacklane API hosting provider |
| docs.talocode.site | Documentation site | CNAME or redirect to talocode.site/docs |
| cloud.talocode.site | Cloud dashboard | Point to dashboard hosting provider |

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
