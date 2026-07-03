#!/usr/bin/env node

import { existsSync, readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

let pass = 0
let fail = 0

function ok(label) { console.log(`  PASS: ${label}`); pass++ }
function nok(label, msg) { console.log(`  FAIL: ${label} — ${msg}`); fail++ }

const APPS = ['cloud', 'docs', 'dashboard']
const REQUIRED_FILES = ['package.json', 'index.html', 'vite.config.ts', 'tsconfig.json', 'netlify.toml', 'src/main.tsx', 'src/App.tsx', 'src/styles.css']

console.log('=== Railway Frontend Apps Readiness Check ===\n')

for (const app of APPS) {
  const appDir = resolve(root, 'apps', app)
  console.log(`\n--- apps/${app} ---`)

  // App directory exists
  if (existsSync(appDir)) {
    ok(`apps/${app} directory exists`)
  } else {
    nok(`apps/${app} directory exists`, 'not found')
    continue
  }

  // Required files
  for (const file of REQUIRED_FILES) {
    const fpath = resolve(appDir, file)
    if (existsSync(fpath)) {
      ok(`apps/${app}/${file} exists`)
    } else {
      nok(`apps/${app}/${file}`, 'not found')
    }
  }

  // Package scripts
  const pkgPath = resolve(appDir, 'package.json')
  if (existsSync(pkgPath)) {
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))
    if (pkg.scripts?.build) ok(`apps/${app} has "build" script`)
    else nok(`apps/${app} "build" script`, 'missing')

    if (pkg.scripts?.start) ok(`apps/${app} has "start" script`)
    else nok(`apps/${app} "start" script`, 'missing')

    if (pkg.scripts?.dev) ok(`apps/${app} has "dev" script`)
    else nok(`apps/${app} "dev" script`, 'missing')

    // Check for serve dependency
    const hasServe = pkg.devDependencies?.serve || pkg.dependencies?.serve
    if (hasServe) ok(`apps/${app} has "serve" dependency`)
    else nok(`apps/${app} "serve" dependency`, 'missing (required for Railway start)')
  }

  // Check for vite config
  const vitePath = resolve(appDir, 'vite.config.ts')
  if (existsSync(vitePath)) {
    const viteContent = readFileSync(vitePath, 'utf-8')
    if (viteContent.includes('@vitejs/plugin-react')) ok(`apps/${app} vite config has React plugin`)
    else nok(`apps/${app} vite config missing React plugin`, 'check vite.config.ts')
  }

  // Check for Railway env example
  const envExamplePath = resolve(appDir, '.env.railway.example')
  if (existsSync(envExamplePath)) {
    const envContent = readFileSync(envExamplePath, 'utf-8')
    if (envContent.includes('VITE_TALOCODE_BASE_URL')) ok(`apps/${app} has .env.railway.example with VITE_TALOCODE_BASE_URL`)
    else nok(`apps/${app} .env.railway.example missing VITE_TALOCODE_BASE_URL`, 'check file')
  } else {
    nok(`apps/${app} .env.railway.example`, 'not found (provides Railway env template)')
  }
}

// Root-level checks
console.log('\n--- Root ---')

const rootPkgPath = resolve(root, 'package.json')
if (existsSync(rootPkgPath)) {
  const rootPkg = JSON.parse(readFileSync(rootPkgPath, 'utf-8'))
  const hasBuildScripts = ['build:cloud', 'build:docs', 'build:dashboard']
    .every(s => rootPkg.scripts?.[s])
  if (hasBuildScripts) ok('root package.json has build:* scripts for all apps')
  else nok('root package.json build:* scripts', 'missing one or more')
} else {
  nok('root package.json', 'not found')
}

// Docs
const docsDir = resolve(root, 'docs')
if (existsSync(docsDir)) {
  if (existsSync(resolve(docsDir, 'RAILWAY_FRONTENDS_DEPLOY.md'))) ok('docs/RAILWAY_FRONTENDS_DEPLOY.md exists')
  else nok('docs/RAILWAY_FRONTENDS_DEPLOY.md', 'not found')

  if (existsSync(resolve(docsDir, 'CNAME'))) {
    const cname = readFileSync(resolve(docsDir, 'CNAME'), 'utf-8').trim()
    if (cname === 'talocode.site') ok('docs/CNAME is talocode.site')
    else nok('docs/CNAME', `expected talocode.site, got ${cname}`)
  }
} else {
  nok('docs/ directory', 'not found')
}

// Scripts
const scriptsDir = resolve(root, 'scripts')
if (existsSync(scriptsDir)) {
  if (existsSync(resolve(scriptsDir, 'check-railway-frontends.mjs'))) ok('scripts/check-railway-frontends.mjs exists')
  if (existsSync(resolve(scriptsDir, 'smoke-railway-frontends.mjs'))) ok('scripts/smoke-railway-frontends.mjs exists')
}

const total = pass + fail
console.log(`\n=== Results: ${pass}/${total} passed, ${fail} failed ===`)
process.exit(fail > 0 ? 1 : 0)
