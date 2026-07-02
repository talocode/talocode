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

const indexHtml = read('index.html')
check('docs/index.html has docs.talocode.site redirect', () =>
  indexHtml.includes("docs.talocode.site") && indexHtml.includes("window.location.replace")
)
check('docs/index.html has cloud.talocode.site redirect', () =>
  indexHtml.includes("cloud.talocode.site") && indexHtml.includes("window.location.replace")
)

const notFoundHtml = read('404.html')
check('docs/404.html has docs.talocode.site redirect', () =>
  notFoundHtml.includes("docs.talocode.site") && notFoundHtml.includes("window.location.replace")
)
check('docs/404.html has cloud.talocode.site redirect', () =>
  notFoundHtml.includes("cloud.talocode.site") && notFoundHtml.includes("window.location.replace")
)

const dnsMd = read('DNS_TALOCODE_SITE.md')
check('DNS docs mention docs URL Redirect', () => dnsMd.includes('URL Redirect') && dnsMd.includes('docs'))
check('DNS docs mention cloud URL Redirect', () => dnsMd.includes('URL Redirect') && dnsMd.includes('cloud'))
check('DNS docs say api.talocode.site NOT GitHub Pages', () =>
  dnsMd.includes('api.talocode.site') && dnsMd.includes('NOT GitHub Pages')
)

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
