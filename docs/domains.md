# Talocode Domains

## DNS Configuration

GitHub Pages hosts `talocode.xyz` from the `talocode/talocode` repository.

### Apex Domain (talocode.xyz)

Configured via GitHub Pages with `CNAME` file. Point the apex to GitHub Pages IPs:

```
A 185.199.108.153
A 185.199.109.153
A 185.199.110.153
A 185.199.111.153
```

### www Subdomain

```
CNAME www → talocode.xyz
```

### Future Subdomains

| Domain | Service | DNS Record |
|--------|---------|------------|
| cloud.talocode.xyz | Cloud dashboard | CNAME cloud → talocode.github.io (or Vercel/Netlify) |
| api.talocode.xyz | API endpoint | CNAME api → talocode.github.io (or server IP) |
| docs.talocode.xyz | Documentation site | CNAME docs → talocode.github.io (or Vercel/Netlify) |

## Current Setup

| Domain | Status | Hosting |
|--------|--------|---------|
| talocode.xyz | Live — landing page | GitHub Pages (this repo, `docs/` folder) |
| cloud.talocode.xyz | Reserved — not yet deployed | Pending cloud dashboard deployment |
| api.talocode.xyz | Reserved — not yet deployed | Pending API server deployment |
| docs.talocode.xyz | Reserved — not yet deployed | Pending docs site deployment |

All infrastructure is managed and pointed to Talocode-controlled services.
