import { api } from './lib/api'

const checkoutUrlMap: Record<string, string> = {
  '500': import.meta.env.VITE_LEMONSQUEEZY_CHECKOUT_URL_500 || '',
  '1000': import.meta.env.VITE_LEMONSQUEEZY_CHECKOUT_URL_1000 || '',
  '2500': import.meta.env.VITE_LEMONSQUEEZY_CHECKOUT_URL_2500 || '',
  '5000': import.meta.env.VITE_LEMONSQUEEZY_CHECKOUT_URL_5000 || '',
  '10000': import.meta.env.VITE_LEMONSQUEEZY_CHECKOUT_URL_10000 || '',
  '25000': import.meta.env.VITE_LEMONSQUEEZY_CHECKOUT_URL_25000 || '',
}

function openCheckoutOverlay(url: string) {
  const embedUrl = (() => {
    try {
      const u = new URL(url)
      u.searchParams.set('embed', '1')
      return u.toString()
    } catch {
      return url
    }
  })()

  const overlay = document.createElement('div')
  overlay.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    z-index: 2147483647; background: rgba(0,0,0,0.8);
    display: flex; align-items: center; justify-content: center;
  `

  const iframe = document.createElement('iframe')
  iframe.style.cssText = `width: 100%; height: 100%; border: none; background: transparent;`
  iframe.src = embedUrl
  iframe.allow = 'payment'

  const closeBtn = document.createElement('button')
  closeBtn.type = 'button'
  closeBtn.setAttribute('aria-label', 'Close checkout')
  closeBtn.textContent = '×'
  closeBtn.style.cssText = `
    position: fixed; top: 16px; right: 16px; z-index: 2147483648;
    width: 36px; height: 36px; border-radius: 50%;
    border: none; background: rgba(255,255,255,0.15);
    color: #fff; font-size: 22px; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
  `
  closeBtn.onclick = () => overlay.remove()

  overlay.appendChild(iframe)
  overlay.appendChild(closeBtn)
  document.body.appendChild(overlay)
}

export type CheckoutResult =
  | 'opened'
  | 'redirected'
  | 'not_configured'
  | 'no_project'
  | 'error'

/**
 * Prefer API-created Lemon Squeezy checkout (tracks topup_id for webhooks).
 * Falls back to static pack URLs from env when API is not configured.
 */
export async function startCreditCheckout(options: {
  credits: number
  projectId: string | null | undefined
  embed?: boolean
}): Promise<{ result: CheckoutResult; message?: string }> {
  const { credits, projectId, embed = true } = options

  if (projectId) {
    try {
      const intent = await api.createTopup(projectId, credits)
      const url = intent.checkoutUrl || intent.lemonsqueezy?.checkoutUrl
      if (url) {
        if (embed) {
          openCheckoutOverlay(url)
          return { result: 'opened' }
        }
        window.location.href = url
        return { result: 'redirected' }
      }
      return {
        result: 'not_configured',
        message: 'Checkout URL missing. Configure Lemon Squeezy on the API.',
      }
    } catch (err) {
      // Fall through to static URLs when API lacks LS keys (dev) or is unreachable
      const message = err instanceof Error ? err.message : 'Checkout failed'
      const staticUrl = checkoutUrlMap[String(credits)]
      if (!staticUrl) {
        return { result: 'error', message }
      }
      // Static packs cannot attach topup_id — only use as last resort
      if (embed) {
        openCheckoutOverlay(staticUrl)
        return {
          result: 'opened',
          message: `${message} Opened static checkout (wallet credit needs API webhook + topup).`,
        }
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
  if (embed) {
    openCheckoutOverlay(staticUrl)
    return { result: 'opened' }
  }
  window.location.href = staticUrl
  return { result: 'redirected' }
}
