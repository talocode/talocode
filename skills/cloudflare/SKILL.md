---
name: cloudflare
description: Use Cloudflare for Talocode infrastructure. Trigger on Cloudflare, Workers, Wrangler, cf CLI, DNS, or mcp.cloudflare.com.
---

# Cloudflare

Remote MCP: https://mcp.cloudflare.com/mcp

Cursor reads `.cursor/mcp.json`. VS Code reads `.vscode/mcp.json`. Both already name this server `cloudflare`. The first Cloudflare tool use opens OAuth. A `cf auth login` on another machine does not finish that login.

Install the product skills:

```
npx -y skills add cloudflare/skills --skill '*' --yes
```

Use the `cf` CLI unless the project has a Wrangler configuration file (`wrangler.toml`, `wrangler.json`, or `wrangler.jsonc`). If that file exists, use Wrangler and do not run `cf dev`, `cf build`, or `cf deploy`.

Do not move talocode.site, teraai.chat, or any Netlify hostname onto Cloudflare unless that change is asked for. DNS for talocode.site is documented in `docs/DNS_TALOCODE_SITE.md` and stays at Namecheap.
