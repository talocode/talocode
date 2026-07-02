import { useState } from 'react'

type Section = 'home' | 'api-keys' | 'billing' | 'usage' | 'projects' | 'settings'

interface NavItem {
  id: Section
  label: string
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'api-keys', label: 'API Keys' },
  { id: 'billing', label: 'Billing / Wallet' },
  { id: 'usage', label: 'Usage' },
  { id: 'projects', label: 'Projects' },
  { id: 'settings', label: 'Settings' },
]

const sectionLabels: Record<Section, string> = {
  home: 'Home',
  'api-keys': 'API Keys',
  billing: 'Billing / Wallet',
  usage: 'Usage',
  projects: 'Projects',
  settings: 'Settings',
}

const navIcons: Record<Section, string> = {
  home: '⌂',
  'api-keys': '🔑',
  billing: '💳',
  usage: '📊',
  projects: '📁',
  settings: '⚙',
}

function PendingBanner() {
  return (
    <div className="mb-6 flex items-center gap-2 rounded-[10px] border border-[#2a2a2a] bg-[#111111] px-4 py-3 text-sm text-[#fb923c]">
      <span className="text-base leading-none">⚠</span>
      <span>Backend API deployment pending. Full dashboard requires api.talocode.site live deployment.</span>
    </div>
  )
}

function ComingSoonBadge() {
  return (
    <span className="ml-2 rounded bg-[#1e1e1e] px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider text-[#888888]">
      Coming soon
    </span>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[10px] border border-[#222222] bg-[#161616] p-5">
      <p className="text-sm text-[#888888]">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-[#e5e5e5]">{value}</p>
    </div>
  )
}

function HomeView() {
  return (
    <div>
      <PendingBanner />
      <div className="rounded-[10px] border border-[#222222] bg-[#161616] p-6">
        <h2 className="text-xl font-semibold text-white">Talocode Dashboard Preview</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#888888]">
          This is a UI preview of the Talocode Cloud dashboard. No real authentication, API keys,
          or backend services are connected. The full dashboard will be available once the Talocode
          API platform is deployed to api.talocode.site.
        </p>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Wallet Balance" value="— credits" />
        <StatCard label="Active API Keys" value="0 of 5" />
        <StatCard label="Projects" value="0" />
        <StatCard label="Current Month Usage" value="— credits" />
      </div>
      <div className="mt-6 rounded-[10px] border border-[#222222] bg-[#161616] p-6">
        <h3 className="mb-3 text-sm font-medium text-[#888888] uppercase tracking-wider">Quick Links</h3>
        <div className="flex flex-wrap gap-3">
          {['Cloud Docs', 'API Reference', 'GitHub'].map((link) => (
            <span
              key={link}
              className="cursor-default rounded-[8px] border border-[#222222] bg-[#111111] px-4 py-2 text-sm text-[#888888]"
            >
              {link}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function ApiKeysView() {
  return (
    <div>
      <PendingBanner />
      <div className="rounded-[10px] border border-[#222222] bg-[#161616] p-6">
        <h2 className="text-xl font-semibold text-white">API Keys</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#888888]">
          API keys will be managed here. Each key grants access to Talocode Cloud APIs. You&apos;ll be
          able to create, revoke, and rotate keys once the backend is deployed.
        </p>
      </div>
      <div className="mt-4 rounded-[10px] border border-[#222222] bg-[#161616] p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[#888888]">Example key format</p>
            <p className="mt-1 font-mono text-sm text-[#888888]">tk_live_••••••••••••••••••••</p>
          </div>
          <button
            disabled
            className="cursor-not-allowed rounded-[8px] border border-[#222222] bg-[#111111] px-4 py-2 text-sm text-[#666666]"
          >
            Generate API Key
            <ComingSoonBadge />
          </button>
        </div>
      </div>
      <div className="mt-4 overflow-x-auto rounded-[10px] border border-[#222222] bg-[#161616]">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#222222] text-[#888888]">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Key</th>
              <th className="px-5 py-3 font-medium">Created</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} className="px-5 py-10 text-center text-[#666666]">
                No API keys yet. They will appear here after backend deployment.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-[#666666]">
        API key management available after backend deployment.
      </p>
    </div>
  )
}

function BillingView() {
  return (
    <div>
      <PendingBanner />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-[10px] border border-[#222222] bg-[#161616] p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold text-white">Billing / Wallet</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#888888]">
            Manage your Talocode Cloud wallet, view credits, and top up your balance.
          </p>
          <div className="mt-5 rounded-[8px] border border-[#222222] bg-[#111111] p-5">
            <p className="text-sm text-[#888888]">Wallet Balance</p>
            <p className="mt-1 text-3xl font-semibold text-white">— credits</p>
            <p className="mt-1 text-xs text-[#666666]">Pending — requires live backend</p>
          </div>
          <button
            disabled
            className="mt-4 cursor-not-allowed rounded-[8px] border border-[#222222] bg-[#111111] px-5 py-2.5 text-sm text-[#666666]"
          >
            Top Up
            <ComingSoonBadge />
          </button>
        </div>
        <div className="rounded-[10px] border border-[#222222] bg-[#161616] p-6">
          <h3 className="text-sm font-medium text-[#888888] uppercase tracking-wider">Payment Method</h3>
          <p className="mt-3 text-sm leading-relaxed text-[#666666]">
            Stripe integration: stripe top-ups coming next.
          </p>
          <p className="mt-2 text-xs text-[#666666]">
            Billing available after api.talocode.site deployment.
          </p>
        </div>
      </div>
      <div className="mt-4 rounded-[10px] border border-[#222222] bg-[#161616] p-6">
        <h3 className="mb-3 text-sm font-medium text-[#888888] uppercase tracking-wider">Recent Transactions</h3>
        <div className="rounded-[8px] border border-[#222222] bg-[#111111] px-4 py-8 text-center text-sm text-[#666666]">
          No transactions yet. Transaction history will appear here after backend deployment.
        </div>
      </div>
    </div>
  )
}

function UsageView() {
  return (
    <div>
      <PendingBanner />
      <div className="rounded-[10px] border border-[#222222] bg-[#161616] p-6">
        <h2 className="text-xl font-semibold text-white">Usage</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#888888]">
          Track your API usage across all Talocode products.
        </p>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Current Period" value="—" />
        <StatCard label="API Calls" value="—" />
        <StatCard label="Credits Used" value="—" />
      </div>
      <div className="mt-4 overflow-x-auto rounded-[10px] border border-[#222222] bg-[#161616]">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#222222] text-[#888888]">
              <th className="px-5 py-3 font-medium">Product</th>
              <th className="px-5 py-3 font-medium">Requests</th>
              <th className="px-5 py-3 font-medium">Credits</th>
              <th className="px-5 py-3 font-medium">Period</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4} className="px-5 py-10 text-center text-[#666666]">
                No usage data yet. Usage tracking available after backend deployment.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-[#666666]">
        Usage tracking available after backend deployment.
      </p>
    </div>
  )
}

function ProjectsView() {
  return (
    <div>
      <PendingBanner />
      <div className="flex items-center justify-between rounded-[10px] border border-[#222222] bg-[#161616] p-6">
        <div>
          <h2 className="text-xl font-semibold text-white">Projects</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#888888]">
            Organize your work into projects. Each project can have its own API keys, usage tracking,
            and team members.
          </p>
        </div>
        <button
          disabled
          className="cursor-not-allowed rounded-[8px] border border-[#222222] bg-[#111111] px-4 py-2 text-sm text-[#666666]"
        >
          Create Project
          <ComingSoonBadge />
        </button>
      </div>
      <div className="mt-4 rounded-[10px] border border-[#222222] bg-[#161616] px-6 py-12 text-center">
        <p className="text-[#888888]">No projects yet.</p>
        <p className="mt-1 text-sm text-[#666666]">
          Projects available after backend deployment.
        </p>
      </div>
    </div>
  )
}

function SettingsView() {
  const sections = [
    { title: 'Profile Settings', desc: 'Update your name, email, and personal information.' },
    { title: 'Notification Preferences', desc: 'Configure email and in-app notifications.' },
    { title: 'API Key Rotation', desc: 'Set automatic key rotation policies.' },
    { title: 'Team Management', desc: 'Invite team members and manage permissions.' },
  ]

  return (
    <div>
      <PendingBanner />
      <div className="rounded-[10px] border border-[#222222] bg-[#161616] p-6">
        <h2 className="text-xl font-semibold text-white">Settings</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#888888]">
          Manage your account settings and preferences.
        </p>
      </div>
      <div className="mt-4 space-y-3">
        {sections.map((s) => (
          <div
            key={s.title}
            className="rounded-[10px] border border-[#222222] bg-[#161616] p-5 opacity-60"
          >
            <h3 className="text-sm font-medium text-white">{s.title}</h3>
            <p className="mt-1 text-sm text-[#888888]">{s.desc}</p>
            <p className="mt-2 text-xs text-[#666666]">Available after backend deployment.</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-[#666666]">
        Settings available after backend deployment.
      </p>
    </div>
  )
}

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('home')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const closeSidebar = () => setSidebarOpen(false)

  const renderContent = () => {
    switch (activeSection) {
      case 'api-keys':
        return <ApiKeysView />
      case 'billing':
        return <BillingView />
      case 'usage':
        return <UsageView />
      case 'projects':
        return <ProjectsView />
      case 'settings':
        return <SettingsView />
      default:
        return <HomeView />
    }
  }

  const sidebar = (
    <nav className="flex h-full flex-col bg-[#111111]">
      <div className="flex items-center justify-between border-b border-[#222222] px-5 py-4 lg:hidden">
        <span className="text-sm font-semibold text-white">Navigation</span>
        <button
          onClick={closeSidebar}
          className="rounded-[8px] border border-[#222222] px-2 py-1 text-sm text-[#888888] hover:bg-[#1e1e1e]"
        >
          ✕
        </button>
      </div>
      <div className="flex-1 space-y-0.5 px-3 py-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveSection(item.id)
              closeSidebar()
            }}
            className={`flex w-full items-center gap-3 rounded-[8px] px-3 py-2.5 text-left text-sm transition-colors duration-150 ${
              activeSection === item.id
                ? 'bg-[#1e1e1e] text-white'
                : 'text-[#888888] hover:bg-[#1e1e1e] hover:text-[#e5e5e5]'
            }`}
          >
            <span className="w-5 text-center text-base">{navIcons[item.id]}</span>
            {item.label}
          </button>
        ))}
      </div>
      <div className="border-t border-[#222222] px-5 py-4">
        <p className="text-sm font-semibold text-white">Talocode</p>
        <p className="mt-0.5 text-xs text-[#666666]">v0.1.0 · Preview</p>
      </div>
    </nav>
  )

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0a] text-[#e5e5e5]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Mobile sidebar drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-[#222222] bg-[#111111] transition-transform duration-200 lg:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebar}
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-56 lg:flex-col">
        <div className="flex flex-1 flex-col border-r border-[#222222] bg-[#111111]">
          {sidebar}
        </div>
      </div>

      {/* Main area */}
      <div className="flex flex-1 flex-col lg:pl-56">
        {/* Top bar */}
        <header className="sticky top-0 z-30 border-b border-[#222222] bg-[#0a0a0a]/90 backdrop-blur-sm">
          <div className="flex items-center justify-between px-4 py-3 lg:px-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="rounded-[8px] border border-[#222222] px-2 py-1 text-sm text-[#888888] hover:bg-[#1e1e1e] lg:hidden"
              >
                ☰
              </button>
              <h1 className="text-base font-semibold text-white">
                {sectionLabels[activeSection]}
              </h1>
            </div>
            <span className="inline-flex items-center rounded-full border border-[#2a2a2a] bg-[#111111] px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-[#fb923c]">
              Preview Mode — Backend API deployment pending
            </span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 px-4 py-6 lg:px-6">
          <div className="mx-auto max-w-5xl">{renderContent()}</div>
        </main>

        {/* Footer */}
        <footer className="border-t border-[#222222] bg-[#111111] px-4 py-4 lg:px-6">
          <p className="text-center text-xs text-[#666666]">
            Talocode — Open-source infrastructure for AI-native work.
          </p>
        </footer>
      </div>
    </div>
  )
}
