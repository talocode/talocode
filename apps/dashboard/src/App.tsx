import { useCallback, useEffect, useState } from 'react'
import type { Section } from './types'
import { SECTION_PATH, sectionFromPath } from './types'
import { ThemeProvider, useTheme } from './theme'
import { NavProvider } from './nav'
import { ToastProvider } from './components/Toast'
import { AuthProvider, useAuth } from './lib/auth'
import { ProjectProvider } from './lib/project'
import Sidebar from './components/Sidebar'
import AuthView from './views/Auth'
import DashboardView from './views/Dashboard'
import ApiKeysView from './views/ApiKeys'
import UsageView from './views/Usage'
import BillingView from './views/Billing'
import ProjectsView from './views/Projects'
import SettingsView from './views/Settings'
import { MenuIcon } from './icons'

const sectionLabels: Record<Section, string> = {
  dashboard: 'Dashboard',
  'api-keys': 'API Keys',
  usage: 'Usage',
  billing: 'Billing',
  projects: 'Projects',
  settings: 'Settings',
}

function Layout() {
  const [activeSection, setActiveSection] = useState<Section>(() =>
    typeof window !== 'undefined' ? sectionFromPath(window.location.pathname) : 'dashboard',
  )
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { theme, toggle } = useTheme()
  const { user, loading } = useAuth()

  const navigate = useCallback((section: Section) => {
    setActiveSection(section)
    const path = SECTION_PATH[section]
    const search = window.location.search
    window.history.pushState({}, '', `${path}${search}`)
  }, [])

  useEffect(() => {
    const onPop = () => setActiveSection(sectionFromPath(window.location.pathname))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  // Deep-link: /billing?topup=success etc.
  useEffect(() => {
    setActiveSection(sectionFromPath(window.location.pathname))
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface text-secondary">
        <p className="text-sm">Loading…</p>
      </div>
    )
  }

  if (!user) {
    return <AuthView />
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'api-keys':
        return <ApiKeysView />
      case 'usage':
        return <UsageView />
      case 'billing':
        return <BillingView />
      case 'projects':
        return <ProjectsView />
      case 'settings':
        return <SettingsView />
      default:
        return <DashboardView />
    }
  }

  return (
    <NavProvider value={{ navigate }}>
      <div className="flex min-h-screen bg-surface text-foreground">
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-border bg-panel transition-transform duration-200 lg:hidden ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Sidebar active={activeSection} onNavigate={navigate} onClose={() => setSidebarOpen(false)} />
        </div>

        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-60">
          <Sidebar active={activeSection} onNavigate={navigate} />
        </div>

        <div className="flex flex-1 flex-col lg:pl-60">
          <header className="sticky top-0 z-30 border-b border-border bg-surface/80 backdrop-blur-md">
            <div className="flex items-center justify-between px-4 py-3 lg:px-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="flex h-8 w-8 items-center justify-center rounded-[8px] text-secondary transition-colors hover:bg-hover hover:text-foreground lg:hidden"
                >
                  <MenuIcon size={18} />
                </button>
                <h1 className="text-sm font-medium text-foreground">{sectionLabels[activeSection]}</h1>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggle}
                  className="flex h-8 w-8 items-center justify-center rounded-[8px] text-secondary transition-colors hover:bg-hover hover:text-foreground"
                >
                  <span className="text-sm">{theme === 'dark' ? '☀' : '☾'}</span>
                </button>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 lg:px-8">
            <div className="mx-auto max-w-5xl">{renderContent()}</div>
          </main>
        </div>
      </div>
    </NavProvider>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <ProjectProvider>
            <Layout />
          </ProjectProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}
