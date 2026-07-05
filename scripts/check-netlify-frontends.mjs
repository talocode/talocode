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

console.log('=== Netlify Frontend Apps Readiness Check ===\n')

for (const app of APPS) {
  const appDir = resolve(root, 'apps', app)
  console.log(`\n--- apps/${app} ---`)

  if (existsSync(appDir)) ok(`apps/${app} directory exists`)
  else {
    nok(`apps/${app} directory exists`, 'not found')
    continue
  }

  for (const file of REQUIRED_FILES) {
    const fpath = resolve(appDir, file)
    if (existsSync(fpath)) ok(`apps/${app}/${file} exists`)
    else nok(`apps/${app}/${file}`, 'not found')
  }

  const pkgPath = resolve(appDir, 'package.json')
  if (existsSync(pkgPath)) {
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))
    if (pkg.scripts?.build) ok(`apps/${app} has "build" script`)
    else nok(`apps/${app} "build" script`, 'missing')
  }

  const envExamplePath = resolve(appDir, '.env.netlify.example')
  if (existsSync(envExamplePath)) {
    const envContent = readFileSync(envExamplePath, 'utf-8')
    if (envContent.includes('VITE_TALOCODE_BASE_URL')) ok(`apps/${app} has .env.netlify.example with VITE_TALOCODE_BASE_URL`)
    else nok(`apps/${app} .env.netlify.example missing VITE_TALOCODE_BASE_URL`, 'check file')
  } else {
    nok(`apps/${app} .env.netlify.example`, 'not found')
  }
}

console.log('\n--- Root ---')
if (existsSync(resolve(root, 'docs/NETLIFY_FRONTENDS_DEPLOY.md'))) ok('docs/NETLIFY_FRONTENDS_DEPLOY.md exists')
else nok('docs/NETLIFY_FRONTENDS_DEPLOY.md', 'not found')

if (existsSync(resolve(root, 'scripts/smoke-netlify-frontends.mjs'))) ok('scripts/smoke-netlify-frontends.mjs exists')
else nok('scripts/smoke-netlify-frontends.mjs', 'not found')

const total = pass + fail
console.log(`\n=== Results: ${pass}/${total} passed, ${fail} failed ===`)
process.exit(fail > 0 ? 1 : 0)