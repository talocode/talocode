import type { Section, NavItem } from '../types'
import { useTheme } from '../theme'
import {
  DashboardIcon, ApiKeysIcon, UsageIcon, BillingIcon, ProjectsIcon, SettingsIcon,
} from '../icons'
import type { ReactNode } from 'react'
import { useAuth } from '../lib/auth'
import { useProject } from '../lib/project'

const iconMap: Record<Section, (p: { size?: number }) => ReactNode> = {
  dashboard: DashboardIcon,
  'api-keys': ApiKeysIcon,
  usage: UsageIcon,
  billing: BillingIcon,
  projects: ProjectsIcon,
  settings: SettingsIcon,
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'api-keys', label: 'API Keys' },
  { id: 'usage', label: 'Usage' },
  { id: 'billing', label: 'Billing' },
  { id: 'projects', label: 'Projects' },
  { id: 'settings', label: 'Settings' },
]

export default function Sidebar({
  active,
  onNavigate,
  onClose,
}: {
  active: Section
  onNavigate: (id: Section) => void
  onClose?: () => void
}) {
  const { theme, toggle } = useTheme()
  const { user, logout } = useAuth()
  const { project, projects, setProjectId } = useProject()

  return (
    <nav className="flex h-full flex-col bg-panel">
      <div className="flex items-center gap-3 px-4 pt-5 pb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-[10px] border border-border">
          <span className="text-xs font-semibold text-foreground">T</span>
        </div>
        <span className="text-sm font-medium text-foreground">Talocode</span>
      </div>

      {projects.length > 0 && (
        <div className="px-3 pb-3">
          <label className="mb-1 block text-[10px] font-medium uppercase tracking-wide text-muted">
            Project
          </label>
          <select
            value={project?.id || ''}
            onChange={(e) => setProjectId(e.target.value)}
            className="w-full rounded-lg border border-border bg-alt px-2 py-2 text-xs text-foreground outline-none"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="flex-1 space-y-0.5 px-2">
        {navItems.map((item) => {
          const Icon = iconMap[item.id]
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id)
                onClose?.()
              }}
              className={`flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm transition-colors ${
                isActive
                  ? 'bg-hover text-foreground'
                  : 'text-secondary hover:bg-hover hover:text-foreground'
              }`}
            >
              <Icon size={18} />
              {item.label}
            </button>
          )
        })}
      </div>

      <div className="space-y-1 border-t border-border px-2 py-3">
        {user && (
          <div className="px-3 py-1">
            <p className="truncate text-xs font-medium text-foreground">{user.name || user.email}</p>
            <p className="truncate text-[11px] text-muted">{user.email}</p>
          </div>
        )}
        <button
          onClick={toggle}
          className="flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm text-secondary transition-colors hover:bg-hover hover:text-foreground"
        >
          <span className="text-sm">{theme === 'dark' ? '☀' : '☾'}</span>
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button
          onClick={() => void logout()}
          className="flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm text-secondary transition-colors hover:bg-hover hover:text-foreground"
        >
          Sign out
        </button>
        <p className="px-3 text-xs text-muted">v0.2.0</p>
      </div>
    </nav>
  )
}
