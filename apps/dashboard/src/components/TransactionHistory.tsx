import { useMemo, useState } from 'react'
import type { CloudWalletTx } from '../lib/api'

const statusStyles: Record<string, string> = {
  grant: 'bg-hover text-foreground',
  topup: 'bg-hover text-foreground',
  usage: 'bg-alt text-secondary',
  refund: 'bg-hover text-foreground',
  completed: 'bg-hover text-foreground',
  pending: 'bg-yellow-500/10 text-yellow-400',
  failed: 'bg-red-500/10 text-red-400',
}

function describe(t: CloudWalletTx): string {
  if (t.reference) return t.reference
  const product = (t.metadata as { product?: string } | null)?.product
  const action = (t.metadata as { action?: string } | null)?.action
  if (product && action) return `${product} · ${action}`
  return t.type
}

export default function TransactionHistory({ transactions = [] }: { transactions?: CloudWalletTx[] }) {
  const [filter, setFilter] = useState<'all' | 'topup' | 'usage' | 'grant'>('all')

  const filtered = useMemo(() => {
    if (filter === 'all') return transactions
    return transactions.filter((t) => t.type === filter)
  }, [transactions, filter])

  return (
    <div className="rounded-xl border border-border bg-panel p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-medium text-foreground">Transaction History</h2>
        <div className="-mr-1 flex gap-1 overflow-x-auto pr-1">
          {(['all', 'topup', 'usage', 'grant'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium ${
                filter === f ? 'bg-foreground text-surface' : 'text-secondary hover:bg-hover hover:text-foreground'
              }`}
            >
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-border px-4 py-8 text-center text-sm text-muted">
          No transactions yet. Top up your wallet to get started.
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-alt">
                <th className="px-4 py-2.5 text-xs font-medium text-secondary">Date</th>
                <th className="px-4 py-2.5 text-xs font-medium text-secondary">Description</th>
                <th className="px-4 py-2.5 text-right text-xs font-medium text-secondary">Credits</th>
                <th className="hidden px-4 py-2.5 text-right text-xs font-medium text-secondary sm:table-cell">
                  Balance
                </th>
                <th className="px-4 py-2.5 text-right text-xs font-medium text-secondary">Type</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id} className="border-b border-border transition-colors last:border-0 hover:bg-alt">
                  <td className="px-4 py-3 text-xs text-secondary">
                    {t.createdAt ? new Date(t.createdAt).toLocaleString() : '—'}
                  </td>
                  <td className="max-w-[140px] truncate px-4 py-3 text-sm text-foreground sm:max-w-none">
                    {describe(t)}
                  </td>
                  <td
                    className={`px-4 py-3 text-right text-sm font-medium tabular-nums ${
                      t.creditsDelta >= 0 ? 'text-foreground' : 'text-secondary'
                    }`}
                  >
                    {t.creditsDelta > 0 ? '+' : ''}
                    {t.creditsDelta.toLocaleString()}
                  </td>
                  <td className="hidden px-4 py-3 text-right text-sm tabular-nums text-secondary sm:table-cell">
                    {t.balanceAfter.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                        statusStyles[t.type] || 'bg-alt text-secondary'
                      }`}
                    >
                      {t.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
