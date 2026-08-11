import { useCallback, useEffect, useMemo, useState } from 'react'
import { api, type CloudUsageEvent } from '../lib/api'
import { useProject } from '../lib/project'
import { useToast } from '../components/Toast'

export default function UsageView() {
  const { project } = useProject()
  const { toast } = useToast()
  const [events, setEvents] = useState<CloudUsageEvent[]>([])
  const [loading, setLoading] = useState(false)

  const load = useCallback(async () => {
    if (!project) {
      setEvents([])
      return
    }
    setLoading(true)
    try {
      const list = await api.listUsage(project.id)
      setEvents(list)
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Failed to load usage', 'error')
    } finally {
      setLoading(false)
    }
  }, [project, toast])

  useEffect(() => {
    void load()
  }, [load])

  const totals = useMemo(() => {
    const credits = events.reduce((s, e) => s + (e.credits || 0), 0)
    return { credits, requests: events.length }
  }, [events])

  const byProduct = useMemo(() => {
    const map = new Map<string, { requests: number; credits: number }>()
    for (const e of events) {
      const key = e.product || 'unknown'
      const cur = map.get(key) || { requests: 0, credits: 0 }
      cur.requests += 1
      cur.credits += e.credits || 0
      map.set(key, cur)
    }
    return [...map.entries()].sort((a, b) => b[1].credits - a[1].credits)
  }, [events])

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Usage</h1>
          <p className="mt-0.5 text-sm text-secondary">
            API usage for {project?.name || 'your project'}.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void load()}
          className="rounded-lg border border-border px-3 py-1.5 text-xs text-secondary hover:bg-hover"
        >
          Refresh
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-panel p-5">
          <p className="text-xs text-secondary">Credits used</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums text-foreground">
            {loading ? '…' : totals.credits.toLocaleString()}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-panel p-5">
          <p className="text-xs text-secondary">Requests</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums text-foreground">
            {loading ? '…' : totals.requests.toLocaleString()}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-panel p-5">
          <p className="text-xs text-secondary">Products</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums text-foreground">
            {loading ? '…' : byProduct.length}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="mb-3 text-sm font-medium text-foreground">By Product</h2>
        <div className="overflow-hidden rounded-xl border border-border bg-panel">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-alt">
                <th className="px-4 py-3 text-xs font-medium text-secondary">Product</th>
                <th className="px-4 py-3 text-xs font-medium text-secondary">Requests</th>
                <th className="px-4 py-3 text-xs font-medium text-secondary">Credits</th>
              </tr>
            </thead>
            <tbody>
              {byProduct.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-4 py-10 text-center text-sm text-muted">
                    No usage yet.
                  </td>
                </tr>
              ) : (
                byProduct.map(([name, row]) => (
                  <tr key={name} className="border-b border-border last:border-0 hover:bg-alt">
                    <td className="px-4 py-3.5 font-medium text-foreground">{name}</td>
                    <td className="px-4 py-3.5 text-secondary">{row.requests}</td>
                    <td className="px-4 py-3.5 text-secondary">{row.credits}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-medium text-foreground">Recent events</h2>
        <div className="overflow-hidden rounded-xl border border-border bg-panel">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-alt">
                <th className="px-4 py-3 text-xs font-medium text-secondary">When</th>
                <th className="px-4 py-3 text-xs font-medium text-secondary">Product</th>
                <th className="px-4 py-3 text-xs font-medium text-secondary">Action</th>
                <th className="px-4 py-3 text-xs font-medium text-secondary">Credits</th>
                <th className="px-4 py-3 text-xs font-medium text-secondary">Status</th>
              </tr>
            </thead>
            <tbody>
              {events.slice(0, 50).map((e) => (
                <tr key={e.id} className="border-b border-border last:border-0 hover:bg-alt">
                  <td className="px-4 py-3 text-xs text-secondary">
                    {e.createdAt ? new Date(e.createdAt).toLocaleString() : '—'}
                  </td>
                  <td className="px-4 py-3 text-foreground">{e.product}</td>
                  <td className="px-4 py-3 text-secondary">{e.action}</td>
                  <td className="px-4 py-3 tabular-nums text-secondary">{e.credits}</td>
                  <td className="px-4 py-3 text-secondary">{e.status}</td>
                </tr>
              ))}
              {!loading && events.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-sm text-muted">
                    Usage events appear when APIs charge your wallet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
