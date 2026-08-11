export function Shimmer({ className = '' }: { className?: string }) {
  return <div className={`animate-shimmer rounded-lg ${className}`} />
}

export function StatCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-panel p-5">
      <Shimmer className="h-3 w-20" />
      <Shimmer className="mt-3 h-7 w-32" />
      <Shimmer className="mt-2 h-3 w-24" />
    </div>
  )
}
