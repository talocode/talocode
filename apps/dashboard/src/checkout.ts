import { api } from './lib/api'

const checkoutUrlMap: Record<string, string> = {
  '500': import.meta.env.VITE_LEMONSQUEEZY_CHECKOUT_URL_500 || '',
  '1000': import.meta.env.VITE_LEMONSQUEEZY_CHECKOUT_URL_1000 || '',
  '2500': import.meta.env.VITE_LEMONSQUEEZY_CHECKOUT_URL_2500 || '',
  '5000': import.meta.env.VITE_LEMONSQUEEZY_CHECKOUT_URL_5000 || '',
  '10000': import.meta.env.VITE_LEMONSQUEEZY_CHECKOUT_URL_10000 || '',
  '25000': import.meta.env.VITE_LEMONSQUEEZY_CHECKOUT_URL_25000 || '',
}

export type CheckoutResult =
  | 'redirected'
  | 'not_configured'
  | 'no_project'
  | 'error'

/**
 * Starts a hosted credit checkout.
 *
 * Always navigates the browser to the provider's hosted checkout. An earlier
 * version framed the checkout URL in an overlay with an appended "?embed=1",
 * but checkout pages send frame-ancestors restrictions, so the frame rendered
 * blank. On a dark dashboard an 80% black overlay with an empty frame reads as
 * "the button did nothing".
 *
 * Navigation is also what makes the return path work: the API creates the
 * checkout with redirect_url dashboard/billing?topup=success, and the billing
 * view already handles that query param on mount.
 */
export async function startCreditCheckout(options: {
  credits: number
  projectId: string | null | undefined
}): Promise<{ result: CheckoutResult; message?: string }> {
  const { credits, projectId } = options

  if (projectId) {
    try {
      const intent = await api.createTopup(projectId, credits)
      const url = intent.checkoutUrl || intent.lemonsqueezy?.checkoutUrl
      if (url) {
        window.location.href = url
        return { result: 'redirected' }
      }
      return {
        result: 'not_configured',
        message: 'Checkout URL missing. Configure Lemon Squeezy on the API.',
      }
    } catch (err) {
      // Fall through to static pack URLs when the API lacks provider keys or is
      // unreachable. Static packs cannot attach a topup_id, so a wallet credit
      // still depends on the API webhook.
      const message = err instanceof Error ? err.message : 'Checkout failed'
      const staticUrl = checkoutUrlMap[String(credits)]
      if (!staticUrl) {
        return { result: 'error', message }
      }
      window.location.href = staticUrl
      return { result: 'redirected', message }
    }
  }

  const staticUrl = checkoutUrlMap[String(credits)]
  if (!staticUrl) {
    return {
      result: projectId ? 'not_configured' : 'no_project',
      message: projectId
        ? 'Set Lemon Squeezy env vars or use API top-up.'
        : 'Create a project before topping up.',
    }
  }
  window.location.href = staticUrl
  return { result: 'redirected' }
}
