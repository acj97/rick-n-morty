"use client";

import { useRouter } from "next/navigation";

interface EpisodeCardProps {
  id: number;
  name: string;
  episode: string;
  air_date: string;
}

export default function EpisodeCard({ id, name, episode, air_date }: EpisodeCardProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/episodes/${id}`)}
      className={`
        cursor-pointer rounded-xl overflow-hidden
        border-2 neon-card neon-card-hover
        bg-white/70 dark:bg-black/40
        backdrop-blur-lg shadow-md
        transition hover:bg-white/80 hover:dark:bg-black/50
        p-4 flex flex-col gap-2
      `}
    >
      {/* Episode Name */}
      <p
        className="
          neon-text text-center text-sm uppercase tracking-wide truncate
          text-gray-900 dark:text-white font-bold
        "
      >
        {name}
      </p>

      {/* Code + Air Date */}
      <div className="flex flex-wrap justify-center gap-2 text-[10px]">
        {/* Episode Code */}
        <span
          className="
            px-2 py-0.5 rounded-full uppercase font-semibold tracking-wide
            bg-black/10 dark:bg-black/40
            border border-gray-300 dark:border-white/20
            text-gray-800 dark:text-green-300 neon-text
          "
        >
          {episode}
        </span>

        {/* Air Date */}
        <span
          className="
            px-2 py-0.5 rounded-full uppercase font-semibold tracking-wide
            bg-black/10 dark:bg-black/40
            border border-gray-300 dark:border-white/20
            text-gray-800 dark:text-blue-300 neon-text
          "
        >
          {air_date}
        </span>
      </div>
    </div>
  );
}
