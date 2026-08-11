import Modal from './Modal'
import { ExternalLinkIcon } from '../icons'

const billingUrl = import.meta.env.VITE_LEMONSQUEEZY_BILLING_URL || ''
const returnUrl = import.meta.env.VITE_TALOCODE_DASHBOARD_URL || 'https://dashboard.talocode.site'

export default function PaymentMethodModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const handleOpen = () => {
    const url = billingUrl.includes('?')
      ? `${billingUrl}&return=${encodeURIComponent(returnUrl)}`
      : `${billingUrl}?return=${encodeURIComponent(returnUrl)}`
    window.open(url, '_blank', 'noopener,noreferrer')
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Payment Method">
      {billingUrl ? (
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-alt">
            <span className="text-xl">🍋</span>
          </div>
          <p className="text-sm font-medium text-foreground mb-1">Manage billing on LemonSqueezy</p>
          <p className="text-xs text-secondary mb-5">
            Your payment details are stored securely by LemonSqueezy. You&apos;ll be redirected to their hosted billing portal.
          </p>
          <button
            onClick={handleOpen}
            className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-surface transition-colors hover:opacity-90"
          >
            Open LemonSqueezy Billing
            <ExternalLinkIcon size={16} />
          </button>
        </div>
      ) : (
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-alt">
            <span className="text-xl">🍋</span>
          </div>
          <p className="text-sm font-medium text-foreground mb-1">Payment method management coming soon</p>
          <p className="text-xs text-secondary mb-5">We&apos;re integrating LemonSqueezy for secure card storage.</p>
          <button onClick={onClose} className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-secondary hover:bg-hover hover:text-foreground transition-colors">Got it</button>
        </div>
      )}
    </Modal>
  )
}
