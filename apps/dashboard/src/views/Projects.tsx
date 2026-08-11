import { useState } from 'react'
import { PlusIcon } from '../icons'
import Modal from '../components/Modal'
import { useProject } from '../lib/project'
import { useToast } from '../components/Toast'

const btnClass =
  'rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-surface transition-colors hover:opacity-90 active:scale-[0.98]'
const btnSecondary =
  'rounded-lg border border-border px-4 py-2 text-sm font-medium text-secondary hover:bg-hover hover:text-foreground transition-colors'

export default function ProjectsView() {
  const { projects, project, setProjectId, createProject, loading, refresh } = useProject()
  const { toast } = useToast()
  const [showCreate, setShowCreate] = useState(false)
  const [projectName, setProjectName] = useState('')
  const [creating, setCreating] = useState(false)

  const handleCreate = async () => {
    if (!projectName.trim()) return
    setCreating(true)
    try {
      await createProject(projectName.trim())
      setProjectName('')
      setShowCreate(false)
      toast('Project created with free starting credits', 'success')
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Failed to create project', 'error')
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Projects</h1>
            <p className="mt-0.5 text-sm text-secondary">
              Cloud projects hold API keys, wallet balance, and usage for Talocode APIs.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => void refresh()}
              className="hidden rounded-lg border border-border px-3 py-2 text-xs text-secondary hover:bg-hover sm:inline-flex"
            >
              Refresh
            </button>
            <button
              onClick={() => setShowCreate(true)}
              className="hidden items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-surface hover:opacity-90 sm:inline-flex"
            >
              <PlusIcon size={16} />
              New Project
            </button>
            <button onClick={() => setShowCreate(true)} className="rounded-lg bg-foreground p-2 text-surface sm:hidden">
              <PlusIcon size={16} />
            </button>
          </div>
        </div>
      </div>

      {loading && projects.length === 0 ? (
        <p className="text-sm text-muted">Loading projects…</p>
      ) : projects.length === 0 ? (
        <div className="rounded-xl border border-border bg-panel p-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-alt">
            <span className="text-lg text-muted">+</span>
          </div>
          <h3 className="text-sm font-medium text-foreground">No projects yet</h3>
          <p className="mt-1 text-xs text-secondary">Create your first project to get free credits and API keys.</p>
          <button onClick={() => setShowCreate(true)} className={`${btnClass} mt-4`}>
            Create project
          </button>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {projects.map((p) => {
            const active = project?.id === p.id
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setProjectId(p.id)}
                className={`rounded-xl border p-5 text-left transition-colors ${
                  active ? 'border-foreground bg-panel' : 'border-border bg-panel hover:bg-hover'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium text-foreground">{p.name}</p>
                    <p className="mt-0.5 font-mono text-xs text-muted">{p.slug}</p>
                  </div>
                  {active && (
                    <span className="rounded-full bg-hover px-2 py-0.5 text-[10px] font-medium text-secondary">
                      Active
                    </span>
                  )}
                </div>
                <p className="mt-3 text-xs text-secondary">
                  {(p.balanceCredits ?? 0).toLocaleString()} credits
                </p>
                <p className="mt-1 text-[11px] text-muted">
                  Created {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : '—'}
                </p>
              </button>
            )
          })}
        </div>
      )}

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Create Project">
        <div className="mb-4">
          <label htmlFor="project-name" className="mb-1.5 block text-xs font-medium text-secondary">
            Project Name
          </label>
          <input
            id="project-name"
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="e.g. Production"
            className="w-full rounded-lg border border-border bg-alt px-3 py-2.5 text-sm text-foreground placeholder-muted outline-none focus:border-border-light"
            autoFocus
            onKeyDown={(e) => e.key === 'Enter' && void handleCreate()}
          />
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setShowCreate(false)} className={btnSecondary}>
            Cancel
          </button>
          <button
            onClick={() => void handleCreate()}
            disabled={!projectName.trim() || creating}
            className={btnClass + ' disabled:cursor-not-allowed disabled:opacity-40'}
          >
            {creating ? 'Creating…' : 'Create'}
          </button>
        </div>
      </Modal>
    </div>
  )
}
