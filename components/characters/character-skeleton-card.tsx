export default function CharacterSkeletonCard() {
  return (
    <div
      className="
        animate-pulse rounded-xl overflow-hidden
        bg-white/70 dark:bg-black/30 
        border-2 border-green-300/50 dark:border-green-300/40
        shadow-lg dark:shadow-green-400/20
        backdrop-blur-md neon-card
        transition-all duration-300
      "
    >
      {/* Image skeleton */}
      <div className="w-full h-52 bg-green-300/30 dark:bg-green-400/20 rounded-t-xl"></div>

      <div className="px-4 py-3">
        {/* Name skeleton */}
        <div className="h-4 bg-green-300/40 dark:bg-green-400/20 rounded w-3/4 mx-auto"></div>
      </div>
    </div>
  );
}
