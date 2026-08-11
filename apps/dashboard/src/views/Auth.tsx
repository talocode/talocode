import { useState, type FormEvent } from 'react'
import { useAuth } from '../lib/auth'
import { ApiError } from '../lib/api'

export default function AuthView() {
  const { login, register } = useAuth()
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      if (mode === 'signin') {
        await login(email.trim(), password)
      } else {
        await register(email.trim(), password, name.trim() || undefined)
      }
    } catch (err) {
      setError(err instanceof ApiError || err instanceof Error ? err.message : 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-panel p-8 shadow-xl">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-sm font-semibold">
            T
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Talocode Cloud</p>
            <p className="text-xs text-muted">dashboard.talocode.site</p>
          </div>
        </div>

        <h1 className="text-xl font-semibold text-foreground">
          {mode === 'signin' ? 'Sign in' : 'Create account'}
        </h1>
        <p className="mt-1 text-sm text-secondary">
          Manage API keys, prepaid credits, and usage for Talocode product APIs.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          {mode === 'signup' && (
            <div>
              <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-secondary">
                Name
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-border bg-alt px-3 py-2.5 text-sm text-foreground outline-none focus:border-border-light"
                placeholder="Your name"
                autoComplete="name"
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-secondary">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-border bg-alt px-3 py-2.5 text-sm text-foreground outline-none focus:border-border-light"
              placeholder="you@company.com"
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-secondary">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-border bg-alt px-3 py-2.5 text-sm text-foreground outline-none focus:border-border-light"
              placeholder="At least 8 characters"
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
            />
          </div>

          {error && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-surface hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-secondary">
          {mode === 'signin' ? (
            <>
              No account?{' '}
              <button type="button" className="text-foreground underline-offset-2 hover:underline" onClick={() => setMode('signup')}>
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button type="button" className="text-foreground underline-offset-2 hover:underline" onClick={() => setMode('signin')}>
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
