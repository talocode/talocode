import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { api, type CloudProject } from './api'
import { useAuth } from './auth'

const STORAGE_KEY = 'talocode-active-project'

type ProjectState = {
  projects: CloudProject[]
  project: CloudProject | null
  loading: boolean
  error: string | null
  setProjectId: (id: string) => void
  refresh: () => Promise<void>
  createProject: (name: string) => Promise<CloudProject>
}

const ProjectContext = createContext<ProjectState | null>(null)

export function ProjectProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [projects, setProjects] = useState<CloudProject[]>([])
  const [projectId, setProjectIdState] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(STORAGE_KEY)
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    if (!user) {
      setProjects([])
      return
    }
    setLoading(true)
    setError(null)
    try {
      const list = await api.listProjects()
      setProjects(list)
      if (list.length === 0) {
        setProjectIdState(null)
        localStorage.removeItem(STORAGE_KEY)
      } else {
        setProjectIdState((prev) => {
          const still = prev && list.some((p) => p.id === prev)
          const next = still ? prev : list[0].id
          if (next) localStorage.setItem(STORAGE_KEY, next)
          return next
        })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load projects')
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const setProjectId = useCallback((id: string) => {
    setProjectIdState(id)
    localStorage.setItem(STORAGE_KEY, id)
  }, [])

  const createProject = useCallback(async (name: string) => {
    const created = await api.createProject({ name })
    await refresh()
    setProjectId(created.id)
    return created
  }, [refresh, setProjectId])

  const project = useMemo(
    () => projects.find((p) => p.id === projectId) || projects[0] || null,
    [projects, projectId],
  )

  const value = useMemo(
    () => ({ projects, project, loading, error, setProjectId, refresh, createProject }),
    [projects, project, loading, error, setProjectId, refresh, createProject],
  )

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
}

export function useProject() {
  const ctx = useContext(ProjectContext)
  if (!ctx) throw new Error('useProject must be used within ProjectProvider')
  return ctx
}
