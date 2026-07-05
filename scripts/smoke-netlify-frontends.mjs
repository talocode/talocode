#!/usr/bin/env node

/**
 * Smoke test for Netlify-deployed Talocode frontend apps.
 *
 * Usage:
 *   node scripts/smoke-netlify-frontends.mjs <base_url>
 */

const BASE_URL = process.argv[2]
if (!BASE_URL) {
  console.error('Usage: node scripts/smoke-netlify-frontends.mjs <base_url>')
  console.error('Example: node scripts/smoke-netlify-frontends.mjs https://cloud.talocode.site')
  process.exit(1)
}

let pass = 0
let fail = 0

async function smoke(label, fn) {
  try {
    const ok = await fn()
    if (ok) {
      console.log(`  PASS: ${label}`)
      pass++
    } else {
      console.log(`  FAIL: ${label} — unexpected response`)
      fail++
    }
  } catch (e) {
    console.log(`  FAIL: ${label} — ${e.message}`)
    fail++
  }
}

async function main() {
  console.log(`\n=== Netlify Frontend Smoke Tests ===`)
  console.log(`Base URL: ${BASE_URL}\n`)

  await smoke('GET / returns 200', async () => {
    const res = await fetch(BASE_URL, { signal: AbortSignal.timeout(10000) })
    return res.status === 200
  })

  await smoke('Content-Type is HTML', async () => {
    const res = await fetch(BASE_URL, { signal: AbortSignal.timeout(10000) })
    return (res.headers.get('content-type') || '').includes('text/html')
  })

  await smoke('Page has <div id="root">', async () => {
    const res = await fetch(BASE_URL, { signal: AbortSignal.timeout(10000) })
    const html = await res.text()
    return html.includes('id="root"')
  })

  await smoke('GET /some/random/path returns HTML (SPA fallback)', async () => {
    const res = await fetch(`${BASE_URL}/some/random/path`, { signal: AbortSignal.timeout(10000) })
    const html = await res.text()
    return res.status === 200 && html.includes('id="root"')
  })

  const total = pass + fail
  console.log(`\n=== Results: ${pass}/${total} passed, ${fail} failed ===`)
  process.exit(fail > 0 ? 1 : 0)
}

main().catch((e) => {
  console.error(`\nSmoke tests crashed: ${e.message}`)
  process.exit(1)
})