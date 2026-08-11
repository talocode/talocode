import { useCallback, useEffect, useState } from 'react'
import Modal from '../components/Modal'
import { PlusIcon, CopyIcon, CheckIcon, TrashIcon } from '../icons'
import { api, type CloudApiKey } from '../lib/api'
import { useProject } from '../lib/project'
import { useToast } from '../components/Toast'

export default function ApiKeysView() {
  const { project, projects, loading: projectsLoading } = useProject()
  const { toast } = useToast()
  const [keys, setKeys] = useState<CloudApiKey[]>([])
  const [loading, setLoading] = useState(false)
  const [showCreate, setShowCreate] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')
  const [mode, setMode] = useState<'dev' | 'live'>('live')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [createdRawKey, setCreatedRawKey] = useState<string | null>(null)

  const load = useCallback(async () => {
    if (!project) {
      setKeys([])
      return
    }
    setLoading(true)
    try {
      const list = await api.listApiKeys(project.id)
      setKeys(list)
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Failed to load API keys', 'error')
    } finally {
      setLoading(false)
    }
  }, [project, toast])

  useEffect(() => {
    void load()
  }, [load])

  const handleCreate = async () => {
    if (!project) {
      toast('Create a project first', 'error')
      return
    }
    const name = newKeyName.trim() || 'My Key'
    try {
      const result = await api.createApiKey(project.id, { name, mode })
      setCreatedRawKey(result.rawKey)
      setNewKeyName('')
      setShowCreate(false)
      await load()
      toast('API key created', 'success')
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Failed to create key', 'error')
    }
  }

  const handleRevoke = async (id: string) => {
    if (!confirm('Revoke this API key? Applications using it will stop working.')) return
    try {
      await api.revokeApiKey(id)
      await load()
      toast('Key revoked', 'success')
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Failed to revoke key', 'error')
    }
  }

  const handleCopy = async (value: string, id: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch {
      toast('Could not copy to clipboard', 'error')
    }
  }

  const activeKeys = keys.filter((k) => k.status === 'active')
  const revokedKeys = keys.filter((k) => k.status === 'revoked')

  const btnClass =
    'rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-surface transition-colors hover:opacity-90 active:scale-[0.98]'
  const btnSecondary =
    'rounded-lg border border-border px-4 py-2 text-sm font-medium text-secondary hover:bg-hover hover:text-foreground transition-colors'

  if (!projectsLoading && projects.length === 0) {
    return (
      <div className="animate-fade-in rounded-xl border border-border bg-panel p-8 text-center">
        <h2 className="text-sm font-medium text-foreground">Create a project first</h2>
        <p className="mt-1 text-xs text-secondary">API keys belong to a cloud project.</p>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground">API Keys</h1>
            <p className="mt-0.5 text-sm text-secondary">
              Keys for {project?.name || 'your project'}. Send as{' '}
              <code className="rounded bg-alt px-1 text-xs">Authorization: Bearer …</code> or{' '}
              <code className="rounded bg-alt px-1 text-xs">X-Api-Key</code>.
            </p>
          </div>
          <button
            onClick={() => {
              setCreatedRawKey(null)
              setShowCreate(true)
            }}
            className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-surface transition-colors hover:opacity-90"
          >
            <PlusIcon size={16} />
            Create key
          </button>
          <button
            onClick={() => {
              setCreatedRawKey(null)
              setShowCreate(true)
            }}
            className="sm:hidden rounded-lg bg-foreground px-3 py-2 text-sm font-medium text-surface"
          >
            <PlusIcon size={16} />
          </button>
        </div>
      </div>

      <div className="mb-8">
        <div className="mb-3 flex items-center">
          <h2 className="text-sm font-medium text-foreground">Active keys</h2>
          <span className="ml-2 rounded-full bg-hover px-2 py-0.5 text-xs text-secondary">{activeKeys.length}</span>
        </div>
        <div className="overflow-hidden rounded-xl border border-border bg-panel">
          {loading ? (
            <p className="px-4 py-8 text-center text-sm text-muted">Loading…</p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-alt">
                  <th className="px-4 py-3 font-medium text-secondary text-xs">Name</th>
                  <th className="px-4 py-3 font-medium text-secondary text-xs hidden sm:table-cell">Prefix</th>
                  <th className="px-4 py-3 font-medium text-secondary text-xs hidden md:table-cell">Mode</th>
                  <th className="px-4 py-3 font-medium text-secondary text-xs hidden md:table-cell">Created</th>
                  <th className="px-4 py-3 font-medium text-secondary text-xs hidden md:table-cell">Last used</th>
                  <th className="px-4 py-3 font-medium text-secondary text-xs">Actions</th>
                </tr>
              </thead>
              <tbody>
                {activeKeys.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-sm text-muted">
                      No active API keys. Create one to call Talocode APIs.
                    </td>
                  </tr>
                ) : (
                  activeKeys.map((k) => (
                    <tr key={k.id} className="border-b border-border transition-colors hover:bg-alt last:border-0">
                      <td className="px-4 py-3.5 font-medium text-foreground">{k.name}</td>
                      <td className="px-4 py-3.5 hidden sm:table-cell">
                        <code className="rounded-md bg-alt px-2 py-1 font-mono text-xs text-secondary">
                          {k.prefix}…
                        </code>
                      </td>
                      <td className="px-4 py-3.5 text-secondary hidden md:table-cell">{k.mode}</td>
                      <td className="px-4 py-3.5 text-secondary hidden md:table-cell">
                        {k.createdAt ? new Date(k.createdAt).toLocaleDateString() : '—'}
                      </td>
                      <td className="px-4 py-3.5 text-secondary hidden md:table-cell">
                        {k.lastUsedAt ? new Date(k.lastUsedAt).toLocaleString() : '—'}
                      </td>
                      <td className="px-4 py-3.5">
                        <button
                          onClick={() => handleRevoke(k.id)}
                          className="rounded-md p-1.5 text-muted hover:bg-red-500/10 hover:text-red-400 transition-colors"
                          title="Revoke key"
                        >
                          <TrashIcon size={15} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {revokedKeys.length > 0 && (
        <div className="mb-6 opacity-60">
          <h2 className="mb-3 text-sm font-medium text-muted">Revoked ({revokedKeys.length})</h2>
          <div className="rounded-xl border border-border bg-panel px-4 py-3 text-xs text-muted">
            {revokedKeys.map((k) => k.name).join(' · ')}
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-muted">
        Secrets are only shown once at creation. Stored values are hashed; prefixes help you identify keys.
      </p>

      <Modal
        open={showCreate || !!createdRawKey}
        onClose={() => {
          setShowCreate(false)
          setCreatedRawKey(null)
        }}
        title={createdRawKey ? 'Save your API key' : 'Create API key'}
      >
        {createdRawKey ? (
          <div>
            <div className="mb-4 rounded-lg border border-border bg-alt p-3">
              <p className="text-sm font-medium text-foreground">Key created</p>
              <p className="mt-1 text-xs text-secondary">Copy it now — you will not see the full secret again.</p>
            </div>
            <div className="mb-4 flex items-center gap-2 rounded-lg border border-border bg-alt px-3 py-2.5">
              <code className="flex-1 break-all font-mono text-sm text-foreground">{createdRawKey}</code>
              <button
                onClick={() => handleCopy(createdRawKey, 'created')}
                className="shrink-0 rounded-md p-1.5 text-secondary hover:bg-hover"
              >
                {copiedId === 'created' ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
              </button>
            </div>
            <button onClick={() => setCreatedRawKey(null)} className="w-full rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-surface">
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <label htmlFor="key-name" className="mb-1.5 block text-xs font-medium text-secondary">
                Name
              </label>
              <input
                id="key-name"
                type="text"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                placeholder="e.g. Production"
                className="w-full rounded-lg border border-border bg-alt px-3 py-2.5 text-sm text-foreground placeholder-muted outline-none focus:border-border-light"
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && void handleCreate()}
              />
            </div>
            <div className="mb-4">
              <label className="mb-1.5 block text-xs font-medium text-secondary">Mode</label>
              <div className="flex gap-2">
                {(['live', 'dev'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    className={`rounded-lg border px-3 py-2 text-sm ${
                      mode === m ? 'border-foreground bg-foreground text-surface' : 'border-border text-secondary'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setShowCreate(false)} className={btnSecondary}>
                Cancel
              </button>
              <button onClick={() => void handleCreate()} className={btnClass}>
                Create
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
