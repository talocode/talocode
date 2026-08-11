import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { XIcon } from '../icons'

type ToastType = 'success' | 'error' | 'info'
interface Toast { id: number; message: string; type: ToastType }
interface ToastContextValue { toast: (message: string, type?: ToastType) => void }

const ToastContext = createContext<ToastContextValue>({ toast: () => {} })
let nextId = 0

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const addToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = nextId++
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500)
  }, [])
  const remove = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id))

  const colors: Record<ToastType, string> = {
    success: 'border-border bg-panel text-foreground',
    error: 'border-red-500/30 bg-red-500/10 text-red-400',
    info: 'border-border bg-panel text-foreground',
  }

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-60 flex flex-col gap-2 max-w-sm">
        {toasts.map((t) => (
          <div key={t.id} className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-sm shadow-lg animate-fade-in ${colors[t.type]}`}>
            <span className="flex-1">{t.message}</span>
            <button onClick={() => remove(t.id)} className="shrink-0 opacity-60 hover:opacity-100"><XIcon size={14} /></button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() { return useContext(ToastContext) }
