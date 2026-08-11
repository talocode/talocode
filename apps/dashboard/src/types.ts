export type Section = 'dashboard' | 'api-keys' | 'usage' | 'billing' | 'projects' | 'settings'

export interface NavItem {
  id: Section
  label: string
}

export interface ApiKey {
  id: string
  name: string
  key: string
  masked: string
  created: string
  lastUsed: string | null
  status: 'active' | 'revoked'
}

export const SECTION_PATH: Record<Section, string> = {
  dashboard: '/',
  'api-keys': '/api-keys',
  usage: '/usage',
  billing: '/billing',
  projects: '/projects',
  settings: '/settings',
}

export function sectionFromPath(pathname: string): Section {
  const path = pathname.replace(/\/+$/, '') || '/'
  if (path === '/api-keys' || path === '/keys') return 'api-keys'
  if (path === '/usage') return 'usage'
  if (path === '/billing') return 'billing'
  if (path === '/projects') return 'projects'
  if (path === '/settings') return 'settings'
  return 'dashboard'
}
