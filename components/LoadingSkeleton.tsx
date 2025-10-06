export function TournamentSkeleton() {
  return (
    <div className="animate-pulse bg-gradient-to-br from-gray-900 to-gray-950 rounded-3xl border border-amber-500/30 p-6">
      <div className="flex gap-6">
        <div className="w-2/5 h-64 bg-gray-800 rounded-2xl" />
        <div className="flex-1 space-y-4">
          <div className="h-8 bg-gray-800 rounded w-3/4" />
          <div className="h-4 bg-gray-800 rounded w-full" />
          <div className="h-4 bg-gray-800 rounded w-5/6" />
          <div className="grid grid-cols-2 gap-4 mt-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-800 rounded" />
            ))}
          </div>
          <div className="h-16 bg-gray-800 rounded mt-4" />
          <div className="h-12 bg-gray-800 rounded mt-4" />
        </div>
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="relative h-[500px] bg-gray-900 animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
    </div>
  );
}
