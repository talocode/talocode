import type { ReactNode } from 'react'
import { XIcon } from '../icons'

export default function Modal({
  open, onClose, title, children,
}: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg rounded-xl border border-border bg-panel shadow-2xl animate-fade-in">
        <div className="flex items-center justify-between px-5 py-4">
          <h2 className="text-sm font-medium text-foreground">{title}</h2>
          <button onClick={onClose} className="rounded-md p-1 text-secondary hover:bg-hover hover:text-foreground transition-colors">
            <XIcon size={16} />
          </button>
        </div>
        <div className="px-5 pb-5">{children}</div>
      </div>
    </div>
  )
}
