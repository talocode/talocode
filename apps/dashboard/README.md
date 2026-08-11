# Talocode Dashboard

Vite + React + TypeScript + Tailwind dashboard for **Talocode Cloud**.

**Live:** [dashboard.talocode.site](https://dashboard.talocode.site)

## Features

- Sign up / sign in (session cookie against Stacklane API)
- Cloud projects with free starting credits
- API key create / revoke (`tk_live_…` / `tk_dev_…`)
- Prepaid wallet + transaction history
- **Lemon Squeezy** credit top-ups (API checkout + webhook credit)
- Usage by product and recent charge events
- Dark / light theme

## Scripts

```bash
npm run dev      # Start dev server
npm run build    # Type-check and build for production
npm run preview  # Preview production build
```

## Environment

Copy from `.env.netlify.example` for Netlify.

| Variable | Purpose |
|----------|---------|
| `VITE_TALOCODE_BASE_URL` | API base (default `https://api.talocode.site`) |
| `VITE_TALOCODE_DASHBOARD_URL` | This app’s public URL |
| `VITE_LEMONSQUEEZY_CHECKOUT_URL_*` | Optional static pack URLs (fallback only) |
| `VITE_LEMONSQUEEZY_BILLING_URL` | Optional customer portal |

Production top-ups should go through the API:

```
POST /api/v1/cloud/billing/topup
{ "projectId", "amount": 500, "provider": "lemonsqueezy" }
```

API must set `LEMONSQUEEZY_*` and allow CORS origin `https://dashboard.talocode.site` (see Stacklane `WEB_ORIGIN` / `WEB_ORIGINS`).

Webhook:

```
POST https://api.talocode.site/api/v1/cloud/billing/lemonsqueezy/webhook
```

## Local development

Run Stacklane API on port 4000, then:

```bash
cd apps/dashboard
echo 'VITE_TALOCODE_BASE_URL=http://localhost:4000' > .env
npm run dev
```

Sign up creates a user in the control-plane database. Create a project, then create API keys and top up credits.
