import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from '../nav'
import { KeyIcon } from '../icons'
import { api, type CloudApiKey, type CloudWalletTx } from '../lib/api'
import { useProject } from '../lib/project'

export default function DashboardView() {
  const navigate = useNavigate()
  const { project, projects, loading: projectsLoading } = useProject()
  const [keys, setKeys] = useState<CloudApiKey[]>([])
  const [tx, setTx] = useState<CloudWalletTx[]>([])
  const [balance, setBalance] = useState(0)

  const load = useCallback(async () => {
    if (!project) {
      setKeys([])
      setTx([])
      setBalance(0)
      return
    }
    try {
      const [keyList, wallet] = await Promise.all([
        api.listApiKeys(project.id),
        api.getWallet(project.id),
      ])
      setKeys(keyList)
      setBalance(wallet.wallet.balanceCredits)
      setTx(wallet.transactions.slice(0, 8))
    } catch {
      setBalance(project.balanceCredits ?? 0)
    }
  }, [project])

  useEffect(() => {
    void load()
  }, [load])

  const activeKeys = keys.filter((k) => k.status === 'active').length

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
        <p className="mt-0.5 text-sm text-secondary">
          {project ? `Overview · ${project.name}` : 'Overview of your Talocode Cloud account.'}
        </p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-panel p-5">
          <p className="text-xs text-secondary">Wallet Balance</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums text-foreground">
            {balance.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-muted">credits</p>
        </div>
        <div className="rounded-xl border border-border bg-panel p-5">
          <p className="text-xs text-secondary">Active API Keys</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums text-foreground">{activeKeys}</p>
          <p className="mt-1 text-xs text-muted">{keys.length} total</p>
        </div>
        <div className="rounded-xl border border-border bg-panel p-5">
          <p className="text-xs text-secondary">Projects</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums text-foreground">
            {projectsLoading ? '…' : projects.length}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-panel p-5">
          <p className="text-xs text-secondary">Recent txs</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums text-foreground">{tx.length}</p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="mb-3 text-sm font-medium text-foreground">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <button
            onClick={() => navigate('api-keys')}
            className="flex items-center gap-3 rounded-xl border border-border bg-panel p-4 text-left transition-colors hover:bg-hover"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-alt">
              <KeyIcon size={18} />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Create API Key</p>
              <p className="text-xs text-muted">Generate a secret for your apps</p>
            </div>
          </button>
          <button
            onClick={() => navigate('billing')}
            className="flex items-center gap-3 rounded-xl border border-border bg-panel p-4 text-left transition-colors hover:bg-hover"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-alt">
              <span className="text-sm text-secondary">$</span>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Top Up Wallet</p>
              <p className="text-xs text-muted">Add credits via Lemon Squeezy</p>
            </div>
          </button>
          <button
            onClick={() => navigate('projects')}
            className="flex items-center gap-3 rounded-xl border border-border bg-panel p-4 text-left transition-colors hover:bg-hover"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-alt">
              <span className="text-sm text-secondary">+</span>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Create Project</p>
              <p className="text-xs text-muted">Organize keys and usage</p>
            </div>
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-panel p-5">
        <h2 className="mb-3 text-sm font-medium text-foreground">Recent activity</h2>
        {tx.length === 0 ? (
          <div className="rounded-lg border border-border bg-alt px-4 py-8 text-center">
            <p className="text-sm text-muted">No recent activity.</p>
            <p className="mt-1 text-xs text-muted">Top up or call an API to see wallet movements here.</p>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {tx.map((t) => (
              <li key={t.id} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <p className="text-foreground">{t.reference || t.type}</p>
                  <p className="text-xs text-muted">
                    {t.createdAt ? new Date(t.createdAt).toLocaleString() : ''}
                  </p>
                </div>
                <span className="tabular-nums text-secondary">
                  {t.creditsDelta > 0 ? '+' : ''}
                  {t.creditsDelta}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
