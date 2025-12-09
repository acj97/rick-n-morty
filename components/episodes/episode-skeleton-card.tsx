export default function EpisodeSkeletonCard() {
  return (
    <div
      className="
        animate-pulse rounded-xl overflow-hidden
        bg-white/70 dark:bg-black/30
        border-2 border-green-300/50 dark:border-green-300/40
        shadow-lg dark:shadow-green-400/20
        backdrop-blur-md neon-card
        transition-all duration-300
        p-4 text-center
      "
    >
      {/* Episode Title Placeholder */}
      <div className="h-5 bg-green-300/40 dark:bg-green-400/20 rounded w-3/4 mx-auto mb-4"></div>

      {/* Episode Code Placeholder */}
      <div className="h-4 bg-green-300/40 dark:bg-green-400/20 rounded w-1/2 mx-auto mb-3"></div>

      {/* Air Date Placeholder */}
      <div className="h-4 bg-green-300/40 dark:bg-green-400/20 rounded w-2/5 mx-auto"></div>
    </div>
  );
}
