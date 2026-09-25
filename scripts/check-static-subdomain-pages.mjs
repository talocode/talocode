import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const docsDir = join(__dirname, '..', 'docs')

let exitCode = 0
const results = []

function check(label, fn) {
  try {
    const ok = fn()
    results.push({ label, ok, error: null })
    if (!ok) {
      console.error(`FAIL: ${label}`)
      exitCode = 1
    } else {
      console.log(`PASS: ${label}`)
    }
  } catch (e) {
    results.push({ label, ok: false, error: e.message })
    console.error(`FAIL: ${label} — ${e.message}`)
    exitCode = 1
  }
}

function read(name) {
  const path = join(docsDir, name)
  if (!existsSync(path)) throw new Error(`File not found: ${name}`)
  return readFileSync(path, 'utf-8')
}

const cname = read('CNAME').trim()
check('docs/CNAME is talocode.site', () => cname === 'talocode.site')

check('docs/cloud.html exists', () => existsSync(join(docsDir, 'cloud.html')))
check('docs/docs.html exists', () => existsSync(join(docsDir, 'docs.html')))
check('docs/skills.html exists', () => existsSync(join(docsDir, 'skills.html')))

// These were subdomain redirect stubs. They are real pages now: the subdomains
// are separate Netlify sites reached by CNAME, so nothing in this directory
// redirects except the intentional /tcode -> /tcode.html stub.
const indexHtml = read('index.html')
check('docs/index.html is a real page, not a redirect stub', () =>
  !indexHtml.includes('window.location.replace') &&
  !indexHtml.includes('http-equiv="refresh"') &&
  indexHtml.includes('footer-links')
)
check('docs/index.html links to the Cloud dashboard and the API', () =>
  indexHtml.includes('dashboard.talocode.site') && indexHtml.includes('api.talocode.site')
)

const notFoundHtml = read('404.html')
check('docs/404.html is a real page, not a redirect stub', () =>
  !notFoundHtml.includes('window.location.replace') &&
  !notFoundHtml.includes('http-equiv="refresh"') &&
  notFoundHtml.includes('footer-links')
)
check('docs/tcode/index.html is a redirect stub to /tcode.html', () =>
  read('tcode/index.html').includes('http-equiv="refresh"')
)

const dnsMd = read('DNS_TALOCODE_SITE.md')
check('DNS docs map cloud and docs to CNAME records', () =>
  dnsMd.includes('CNAME') && dnsMd.includes('cloud') && dnsMd.includes('docs')
)
check('DNS docs say talocode.site is GitHub Pages', () =>
  dnsMd.includes('talocode.site') && dnsMd.includes('GitHub Pages')
)
check('DNS docs document the api subdomain', () => dnsMd.includes('api.talocode.site'))

const pages = ['index.html', 'cloud.html', 'api.html', 'mcp.html', 'pricing.html', '404.html', 'docs.html', 'skills.html']
for (const page of pages) {
  if (!existsSync(join(docsDir, page))) continue
  const html = read(page)
  check(`nav in ${page} has Docs link`, () => html.includes('docs.html') || html.includes('/docs'))
  check(`footer in ${page} has docs footer links`, () =>
    html.includes('footer-links') && html.includes('API Docs') && html.includes('Cloud') && html.includes('Pricing') && html.includes('Skills')
  )
}

console.log(`\n${results.filter(r => r.ok).length}/${results.length} checks passed`)
process.exit(exitCode)
