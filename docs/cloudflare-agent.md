# Cloudflare agent connection

Talocode agents can call Cloudflare through the remote MCP server.

```
https://mcp.cloudflare.com/mcp
```

Registered in:

- `.cursor/mcp.json`
- `.vscode/mcp.json`

The Talocode server stays beside it:

```
https://api.talocode.site/mcp
```

## What you still do once

Open this repo in Cursor or VS Code and run any Cloudflare tool. The editor asks you to approve `mcp.cloudflare.com`. Until that approval, the server is configured and not connected.

Product skills, installed in the project:

```
npx -y skills add cloudflare/skills --skill '*' --yes
```

## What this does not do

The Cloudflare account signed in for the CLI on 11 October 2026 has no zones. talocode.site is still on Namecheap, with GitHub Pages and Netlify, as written in `docs/DNS_TALOCODE_SITE.md`. This connection does not move DNS, change nameservers, or replace Netlify.
