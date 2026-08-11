import { useCallback, useEffect, useState } from 'react'
import Modal from '../components/Modal'
import TransactionHistory from '../components/TransactionHistory'
import { CheckIcon, PlusIcon } from '../icons'
import { startCreditCheckout } from '../checkout'
import { useToast } from '../components/Toast'
import { api, type CloudWallet, type CloudWalletTx } from '../lib/api'
import { useProject } from '../lib/project'

const billingUrl = import.meta.env.VITE_LEMONSQUEEZY_BILLING_URL || ''
const returnUrl = import.meta.env.VITE_TALOCODE_DASHBOARD_URL || 'https://dashboard.talocode.site'
const presets = [500, 1000, 2500, 5000, 10000, 25000]

export default function BillingView() {
  const { project } = useProject()
  const { toast } = useToast()
  const [wallet, setWallet] = useState<CloudWallet | null>(null)
  const [transactions, setTransactions] = useState<CloudWalletTx[]>([])
  const [loading, setLoading] = useState(false)
  const [showTopUp, setShowTopUp] = useState(false)
  const [showAutoRecharge, setShowAutoRecharge] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [processing, setProcessing] = useState(false)
  const [autoThreshold, setAutoThreshold] = useState('')
  const [autoAmount, setAutoAmount] = useState('')
  const [autoEnabled, setAutoEnabled] = useState(false)

  const load = useCallback(async () => {
    if (!project) {
      setWallet(null)
      setTransactions([])
      return
    }
    setLoading(true)
    try {
      const data = await api.getWallet(project.id)
      setWallet(data.wallet)
      setTransactions(data.transactions)
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Failed to load wallet', 'error')
    } finally {
      setLoading(false)
    }
  }, [project, toast])

  useEffect(() => {
    void load()
  }, [load])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const topup = params.get('topup')
    if (topup === 'success') {
      toast('Payment received. Credits appear after webhook confirmation (usually a few seconds).', 'success')
      void load()
      params.delete('topup')
      const next = `${window.location.pathname}${params.toString() ? `?${params}` : ''}`
      window.history.replaceState({}, '', next)
    } else if (topup === 'cancel') {
      toast('Checkout cancelled.', 'info')
      params.delete('topup')
      const next = `${window.location.pathname}${params.toString() ? `?${params}` : ''}`
      window.history.replaceState({}, '', next)
    }
  }, [load, toast])

  const handleOpenBillingPortal = () => {
    if (!billingUrl) {
      toast('Billing portal URL is not configured yet.', 'info')
      return
    }
    const url = billingUrl.includes('?')
      ? `${billingUrl}&return=${encodeURIComponent(returnUrl)}`
      : `${billingUrl}?return=${encodeURIComponent(returnUrl)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const total = selectedAmount ?? 0

  const handleProceed = async () => {
    if (total <= 0) return
    setProcessing(true)
    const { result, message } = await startCreditCheckout({
      credits: total,
      projectId: project?.id,
      embed: true,
    })
    setProcessing(false)
    if (result === 'no_project') {
      toast('Create a project before topping up.', 'error')
      return
    }
    if (result === 'not_configured') {
      toast(message || 'Lemon Squeezy is not configured on the API.', 'error')
      return
    }
    if (result === 'error') {
      toast(message || 'Could not start checkout.', 'error')
      return
    }
    if (message) toast(message, 'info')
    setShowTopUp(false)
    setSelectedAmount(null)
  }

  const handleTopUpDone = () => {
    setSelectedAmount(null)
    setShowTopUp(false)
  }

  const balance = wallet?.balanceCredits ?? project?.balanceCredits ?? 0

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Billing</h1>
          <p className="mt-0.5 text-sm text-secondary">
            Prepaid wallet · 1 credit = $0.01 · minimum top-up 500 credits ($5)
          </p>
        </div>
        <button
          type="button"
          onClick={() => void load()}
          className="rounded-lg border border-border px-3 py-1.5 text-xs text-secondary hover:bg-hover hover:text-foreground"
        >
          Refresh
        </button>
      </div>

      <div className="mb-6">
        <div className="rounded-xl border border-border bg-panel p-5">
          <h2 className="mb-4 text-sm font-medium text-foreground">
            Wallet{project ? ` · ${project.name}` : ''}
          </h2>
          <div className="rounded-lg border border-border bg-alt p-5">
            <p className="text-xs text-secondary">Current Balance</p>
            <p className="mt-1 text-3xl font-semibold text-foreground tabular-nums">
              {loading ? '…' : `${balance.toLocaleString()} credits`}
            </p>
            <p className="mt-1 text-xs text-muted">
              ≈ ${((balance * 0.01) || 0).toFixed(2)} USD
              {wallet?.freeCreditsGranted ? ' · free grant applied' : ''}
            </p>
          </div>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button
              onClick={() => setShowTopUp(true)}
              disabled={!project}
              className="w-full sm:w-auto rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-surface hover:opacity-90 disabled:opacity-40"
            >
              Top Up
            </button>
            <button
              onClick={() => setShowAutoRecharge(true)}
              className="w-full sm:w-auto rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-secondary hover:bg-hover hover:text-foreground"
            >
              {autoEnabled ? 'Auto-recharge active' : 'Auto-recharge'}
            </button>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="rounded-xl border border-border bg-panel p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-medium text-foreground">Payment Method</h2>
            <button
              onClick={handleOpenBillingPortal}
              className="rounded-lg border border-border px-3 py-1.5 text-xs text-secondary hover:bg-hover hover:text-foreground"
            >
              Manage
            </button>
          </div>
          <div className="flex flex-col items-start gap-4 rounded-lg border border-dashed border-border px-4 py-4 sm:flex-row sm:items-center">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-alt text-secondary">
              <PlusIcon size={18} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">Hosted checkout</p>
              <p className="text-xs text-muted">
                Card payments run through Lemon Squeezy. Credits are added after the order webhook.
              </p>
            </div>
          </div>
        </div>
      </div>

      <TransactionHistory transactions={transactions} />

      <Modal open={showTopUp} onClose={handleTopUpDone} title="Top Up Wallet">
        <div className="mb-4">
          <label className="mb-1.5 block text-xs font-medium text-secondary">Credit pack</label>
          <div className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {presets.map((amt) => (
              <button
                key={amt}
                onClick={() => setSelectedAmount(amt)}
                className={`rounded-lg border px-3 py-2 text-sm ${
                  selectedAmount === amt
                    ? 'border-foreground bg-foreground text-surface'
                    : 'border-border bg-alt text-secondary hover:bg-hover'
                }`}
              >
                {amt.toLocaleString()}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted">Secure Lemon Squeezy checkout. Wallet updates after payment confirmation.</p>
        </div>
        <div className="mb-4 rounded-lg border border-border bg-alt p-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-secondary">Total due</span>
            <span className="font-medium tabular-nums text-foreground">
              {total > 0 ? `$${(total / 100).toFixed(2)}` : '$—'}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={handleTopUpDone}
            className="order-2 flex-1 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-secondary hover:bg-hover sm:order-1"
          >
            Cancel
          </button>
          <button
            onClick={() => void handleProceed()}
            disabled={total <= 0 || processing || !project}
            className="order-1 flex-1 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-surface hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 sm:order-2"
          >
            {processing ? 'Opening checkout…' : 'Proceed to Payment'}
          </button>
        </div>
      </Modal>

      <Modal open={showAutoRecharge} onClose={() => setShowAutoRecharge(false)} title="Auto-recharge">
        {autoEnabled ? (
          <div>
            <div className="mb-4 rounded-lg border border-border bg-alt p-4 text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-hover">
                <CheckIcon size={20} />
              </div>
              <p className="text-sm font-medium text-foreground">Preference saved locally</p>
              <p className="mt-1 text-xs text-secondary">
                Recharge {Number(autoAmount).toLocaleString()} credits when below{' '}
                {Number(autoThreshold).toLocaleString()}. Server-side auto-recharge ships in a later release.
              </p>
            </div>
            <button
              onClick={() => setShowAutoRecharge(false)}
              className="w-full rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-surface"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-secondary">Trigger when balance below</label>
              <input
                type="number"
                value={autoThreshold}
                onChange={(e) => setAutoThreshold(e.target.value)}
                placeholder="e.g. 500"
                className="w-full rounded-lg border border-border bg-alt px-3 py-2.5 text-sm text-foreground outline-none focus:border-border-light"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-secondary">Recharge amount</label>
              <input
                type="number"
                value={autoAmount}
                onChange={(e) => setAutoAmount(e.target.value)}
                placeholder="e.g. 2000"
                className="w-full rounded-lg border border-border bg-alt px-3 py-2.5 text-sm text-foreground outline-none focus:border-border-light"
              />
            </div>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <button
                onClick={() => setShowAutoRecharge(false)}
                className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-secondary"
              >
                Cancel
              </button>
              <button
                onClick={() => setAutoEnabled(true)}
                disabled={!autoThreshold || !autoAmount}
                className="flex-1 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-surface disabled:opacity-40"
              >
                Save preference
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
