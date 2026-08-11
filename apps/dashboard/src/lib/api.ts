const API_BASE =
  import.meta.env.VITE_TALOCODE_BASE_URL ||
  (import.meta.env.DEV ? 'http://localhost:4000' : 'https://api.talocode.site')

export class ApiError extends Error {
  status: number
  code: string

  constructor(status: number, code: string, message: string) {
    super(message)
    this.status = status
    this.code = code
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
      ...(options?.headers || {}),
    },
  })

  let payload: { data?: T; error?: { code?: string; message?: string } } = {}
  try {
    payload = await response.json()
  } catch {
    /* empty body */
  }

  if (!response.ok) {
    throw new ApiError(
      response.status,
      payload?.error?.code || 'REQUEST_FAILED',
      payload?.error?.message || `Request failed (${response.status})`,
    )
  }

  return payload.data as T
}

export type User = {
  id: string
  email: string
  name: string
  status?: string
}

export type CloudProject = {
  id: string
  ownerId: string
  name: string
  slug: string
  balanceCredits?: number
  createdAt: string
  updatedAt: string
}

export type CloudApiKey = {
  id: string
  projectId: string
  name: string
  prefix: string
  mode: 'dev' | 'live' | string
  status: 'active' | 'revoked' | string
  lastUsedAt: string | null
  createdAt: string
  updatedAt: string
}

export type CloudWallet = {
  id: string
  projectId: string
  balanceCredits: number
  freeCreditsGranted: boolean
  createdAt: string
  updatedAt: string
}

export type CloudWalletTx = {
  id: string
  walletId: string
  type: string
  creditsDelta: number
  balanceAfter: number
  reference: string | null
  metadata: Record<string, unknown> | null
  createdAt: string
}

export type CloudUsageEvent = {
  id: string
  projectId: string
  apiKeyId: string | null
  product: string
  action: string
  credits: number
  status: string
  requestId?: string | null
  idempotencyKey?: string | null
  createdAt: string
}

export type TopupIntent = {
  topup: { id: string; amount: number; status: string; walletId?: string }
  checkoutUrl: string | null
  lemonsqueezy: { checkoutId?: string; checkoutUrl?: string } | null
  creditsPerDollar?: number
}

export const api = {
  baseUrl: API_BASE,

  me: () => request<User>('/auth/me'),
  login: (input: { email: string; password: string }) =>
    request<User>('/auth/login', { method: 'POST', body: JSON.stringify(input) }),
  register: (input: { email: string; password: string; name?: string }) =>
    request<User>('/auth/register', { method: 'POST', body: JSON.stringify(input) }),
  logout: () => request<{ ok: true }>('/auth/logout', { method: 'POST' }),

  listProjects: () => request<CloudProject[]>('/api/v1/cloud/projects'),
  createProject: (input: { name: string; slug?: string }) =>
    request<CloudProject>('/api/v1/cloud/projects', {
      method: 'POST',
      body: JSON.stringify(input),
    }),
  getProject: (id: string) => request<CloudProject & { balanceCredits: number }>(`/api/v1/cloud/projects/${id}`),

  listApiKeys: (projectId: string) =>
    request<CloudApiKey[]>(`/api/v1/cloud/projects/${projectId}/api-keys`),
  createApiKey: (projectId: string, input: { name: string; mode?: 'dev' | 'live' }) =>
    request<{ key: CloudApiKey; rawKey: string }>(`/api/v1/cloud/projects/${projectId}/api-keys`, {
      method: 'POST',
      body: JSON.stringify(input),
    }),
  revokeApiKey: (keyId: string) =>
    request<{ key: CloudApiKey }>(`/api/v1/cloud/api-keys/${keyId}/revoke`, { method: 'POST' }),

  getWallet: (projectId: string) =>
    request<{ wallet: CloudWallet; transactions: CloudWalletTx[] }>(
      `/api/v1/cloud/projects/${projectId}/wallet`,
    ),
  listTransactions: (projectId: string, limit = 50) =>
    request<CloudWalletTx[]>(
      `/api/v1/cloud/billing/transactions?projectId=${encodeURIComponent(projectId)}&limit=${limit}`,
    ),
  listUsage: (projectId: string) =>
    request<CloudUsageEvent[]>(`/api/v1/cloud/projects/${projectId}/usage`),
  usageSummary: (projectId: string) =>
    request<Array<{ product: string; action: string; total_credits: string | number; event_count: string | number }>>(
      `/api/v1/cloud/projects/${projectId}/usage/summary`,
    ),

  createTopup: (projectId: string, credits: number) =>
    request<TopupIntent>('/api/v1/cloud/billing/topup', {
      method: 'POST',
      body: JSON.stringify({ projectId, amount: credits, provider: 'lemonsqueezy' }),
    }),

  pricing: () => request<unknown>('/api/v1/cloud/pricing'),
}
