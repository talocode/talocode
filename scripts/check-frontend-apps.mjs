import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = join(__dirname, '..')
const docsDir = join(rootDir, 'docs')

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

function fileExists(rel) {
  return existsSync(join(rootDir, rel))
}

function read(rel) {
  const path = join(rootDir, rel)
  if (!existsSync(path)) throw new Error(`File not found: ${rel}`)
  return readFileSync(path, 'utf-8')
}

// ─── App directories exist ────────────────────────────────────────────
check('apps/cloud exists', () => fileExists('apps/cloud'))
check('apps/docs exists', () => fileExists('apps/docs'))
check('apps/dashboard exists', () => fileExists('apps/dashboard'))

// ─── Each app has package.json ────────────────────────────────────────
check('apps/cloud/package.json exists', () => fileExists('apps/cloud/package.json'))
check('apps/docs/package.json exists', () => fileExists('apps/docs/package.json'))
check('apps/dashboard/package.json exists', () => fileExists('apps/dashboard/package.json'))

// ─── Each app has vite config ─────────────────────────────────────────
check('apps/cloud/vite.config.ts exists', () => fileExists('apps/cloud/vite.config.ts'))
check('apps/docs/vite.config.ts exists', () => fileExists('apps/docs/vite.config.ts'))
check('apps/dashboard/vite.config.ts exists', () => fileExists('apps/dashboard/vite.config.ts'))

// ─── Each app has build script ────────────────────────────────────────
for (const app of ['cloud', 'docs', 'dashboard']) {
  const pkg = JSON.parse(read(`apps/${app}/package.json`))
  check(`apps/${app} has build script`, () => typeof pkg.scripts?.build === 'string')
}

// ─── Each app has netlify.toml ────────────────────────────────────────
check('apps/cloud/netlify.toml exists', () => fileExists('apps/cloud/netlify.toml'))
check('apps/docs/netlify.toml exists', () => fileExists('apps/docs/netlify.toml'))
check('apps/dashboard/netlify.toml exists', () => fileExists('apps/dashboard/netlify.toml'))

// ─── Each app has index.html ──────────────────────────────────────────
check('apps/cloud/index.html exists', () => fileExists('apps/cloud/index.html'))
check('apps/docs/index.html exists', () => fileExists('apps/docs/index.html'))
check('apps/dashboard/index.html exists', () => fileExists('apps/dashboard/index.html'))

// ─── Each app has src/main.tsx and src/App.tsx ────────────────────────
check('apps/cloud/src/main.tsx exists', () => fileExists('apps/cloud/src/main.tsx'))
check('apps/cloud/src/App.tsx exists', () => fileExists('apps/cloud/src/App.tsx'))
check('apps/docs/src/main.tsx exists', () => fileExists('apps/docs/src/main.tsx'))
check('apps/docs/src/App.tsx exists', () => fileExists('apps/docs/src/App.tsx'))
check('apps/dashboard/src/main.tsx exists', () => fileExists('apps/dashboard/src/main.tsx'))
check('apps/dashboard/src/App.tsx exists', () => fileExists('apps/dashboard/src/App.tsx'))

// ─── Each app has styles.css ──────────────────────────────────────────
check('apps/cloud/src/styles.css exists', () => fileExists('apps/cloud/src/styles.css'))
check('apps/docs/src/styles.css exists', () => fileExists('apps/docs/src/styles.css'))
check('apps/dashboard/src/styles.css exists', () => fileExists('apps/dashboard/src/styles.css'))

// ─── Styles import shared theme correctly ────────────────────────────
const cloudCss = read('apps/cloud/src/styles.css')
const docsCss = read('apps/docs/src/styles.css')
const dashCss = read('apps/dashboard/src/styles.css')
check('cloud styles imports shared theme', () =>
  cloudCss.includes('../../shared/theme.css') || cloudCss.includes('../shared/theme.css')
)
check('docs styles imports shared theme', () =>
  docsCss.includes('../../shared/theme.css') || docsCss.includes('../shared/theme.css')
)
check('dashboard styles imports shared theme', () =>
  dashCss.includes('../../shared/theme.css') || dashCss.includes('../shared/theme.css')
)

// ─── No postcss or tailwind config files remain (Tailwind v4) ────────
check('no postcss.config.js in cloud', () => !fileExists('apps/cloud/postcss.config.js'))
check('no postcss.config.js in docs', () => !fileExists('apps/docs/postcss.config.js'))
check('no postcss.config.js in dashboard', () => !fileExists('apps/dashboard/postcss.config.js'))
check('no tailwind.config.js in cloud', () => !fileExists('apps/cloud/tailwind.config.js'))
check('no tailwind.config.js in docs', () => !fileExists('apps/docs/tailwind.config.js'))
check('no tailwind.config.js in dashboard', () => !fileExists('apps/dashboard/tailwind.config.js'))

// ─── Root-level checks ───────────────────────────────────────────────
check('root package.json exists', () => fileExists('package.json'))
const rootPkg = JSON.parse(read('package.json'))
check('root package.json has frontend scripts', () =>
  rootPkg.scripts?.['dev:cloud'] &&
  rootPkg.scripts?.['dev:docs'] &&
  rootPkg.scripts?.['dev:dashboard'] &&
  rootPkg.scripts?.['build:cloud'] &&
  rootPkg.scripts?.['build:docs'] &&
  rootPkg.scripts?.['build:dashboard'] &&
  rootPkg.scripts?.['build:frontends']
)

// ─── Docs checks ─────────────────────────────────────────────────────
const cname = read('docs/CNAME').trim()
check('docs/CNAME is talocode.site', () => cname === 'talocode.site')

check('docs/NETLIFY_FRONTEND_APPS.md exists', () => fileExists('docs/NETLIFY_FRONTEND_APPS.md'))

const dnsMd = read('docs/DNS_TALOCODE_SITE.md')
check('DNS docs mention dashboard.talocode.site Netlify', () => dnsMd.includes('Netlify'))
check('DNS docs mention docs.talocode.site Netlify', () => dnsMd.includes('Netlify'))
check('DNS docs mention dashboard.talocode.site Netlify', () => dnsMd.includes('dashboard'))
check('DNS docs say talocode.site GitHub Pages', () => dnsMd.includes('GitHub Pages'))

// ─── No subdomain redirect scripts remain ────────────────────────────
const indexHtml = read('docs/index.html')
const notFoundHtml = read('docs/404.html')
check('index.html has no docs.talocode.site redirect', () =>
  !indexHtml.includes('docs.talocode.site')
)
check('404.html has no docs.talocode.site redirect', () =>
  !notFoundHtml.includes('docs.talocode.site')
)

// ─── Shared theme ────────────────────────────────────────────────────
check('apps/shared/theme.css exists', () => fileExists('apps/shared/theme.css'))

const total = results.length
const passed = results.filter(r => r.ok).length

console.log(`\n${passed}/${total} checks passed`)
process.exit(exitCode)
