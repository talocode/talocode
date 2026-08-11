import { useState } from 'react'
import { useAuth } from '../lib/auth'
import { useProject } from '../lib/project'
import { api } from '../lib/api'
import { useToast } from '../components/Toast'

export default function SettingsView() {
  const { user, logout } = useAuth()
  const { project, projects } = useProject()
  const { toast } = useToast()
  const [usageAlerts, setUsageAlerts] = useState(true)
  const [billingAlerts, setBillingAlerts] = useState(true)
  const [apiStatus, setApiStatus] = useState<string | null>(null)

  const checkApi = async () => {
    try {
      await api.pricing()
      setApiStatus(`OK · ${api.baseUrl}`)
      toast('API reachable', 'success')
    } catch (err) {
      setApiStatus(err instanceof Error ? err.message : 'Unreachable')
      toast('API check failed', 'error')
    }
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-foreground">Settings</h1>
        <p className="mt-0.5 text-sm text-secondary">Account and dashboard preferences.</p>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border border-border bg-panel p-5">
          <h2 className="mb-1 text-sm font-medium text-foreground">Profile</h2>
          <p className="mb-4 text-xs text-secondary">Signed-in account from Talocode Cloud.</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between rounded-lg border border-border bg-alt px-4 py-3">
              <span className="text-sm text-secondary">Name</span>
              <span className="text-sm text-foreground">{user?.name || '—'}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border bg-alt px-4 py-3">
              <span className="text-sm text-secondary">Email</span>
              <span className="text-sm text-foreground">{user?.email || '—'}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border bg-alt px-4 py-3">
              <span className="text-sm text-secondary">User ID</span>
              <code className="max-w-[50%] truncate font-mono text-xs text-muted">{user?.id || '—'}</code>
            </div>
          </div>
          <button
            type="button"
            onClick={() => void logout()}
            className="mt-4 rounded-lg border border-border px-4 py-2 text-sm text-secondary hover:bg-hover hover:text-foreground"
          >
            Sign out
          </button>
        </div>

        <div className="rounded-xl border border-border bg-panel p-5">
          <h2 className="mb-1 text-sm font-medium text-foreground">Active project</h2>
          <p className="mb-4 text-xs text-secondary">Billing and keys use the selected project.</p>
          <div className="flex items-center justify-between rounded-lg border border-border bg-alt px-4 py-3">
            <span className="text-sm text-secondary">Project</span>
            <span className="text-sm text-foreground">
              {project ? `${project.name} (${projects.length} total)` : 'None'}
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-panel p-5">
          <h2 className="mb-1 text-sm font-medium text-foreground">Notifications</h2>
          <p className="mb-4 text-xs text-secondary">Local preferences (server delivery coming later).</p>
          <div className="space-y-2">
            {[
              { key: 'usage', label: 'Usage alerts', value: usageAlerts, set: setUsageAlerts },
              { key: 'billing', label: 'Billing alerts', value: billingAlerts, set: setBillingAlerts },
            ].map((f) => (
              <div
                key={f.key}
                className="flex items-center justify-between rounded-lg border border-border bg-alt px-4 py-3"
              >
                <span className="text-sm text-secondary">{f.label}</span>
                <button
                  type="button"
                  onClick={() => f.set(!f.value)}
                  className={`relative h-5 w-9 rounded-full transition-colors ${f.value ? 'bg-foreground' : 'bg-border'}`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-surface transition-transform ${
                      f.value ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-panel p-5">
          <h2 className="mb-1 text-sm font-medium text-foreground">API connection</h2>
          <p className="mb-4 text-xs text-secondary">Base URL used by this dashboard.</p>
          <code className="block break-all rounded-lg border border-border bg-alt px-3 py-2 text-xs text-secondary">
            {api.baseUrl}
          </code>
          <button
            type="button"
            onClick={() => void checkApi()}
            className="mt-3 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-surface hover:opacity-90"
          >
            Check pricing endpoint
          </button>
          {apiStatus && <p className="mt-2 text-xs text-muted">{apiStatus}</p>}
        </div>
      </div>
    </div>
  )
}
