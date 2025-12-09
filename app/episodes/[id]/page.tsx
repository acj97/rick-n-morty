'use client';

import { useParams } from "next/navigation";
import { useEpisodeDetailStore } from "@/app/store/use-episode-detail-store";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function EpisodeDetailPage() {
  const { id } = useParams();

  const {
    episode,
    characters,
    loading,
    fetchEpisodeDetail
  } = useEpisodeDetailStore();

  useEffect(() => {
    if (id) fetchEpisodeDetail(id as string);
  }, [id, fetchEpisodeDetail]);

  const baseText =
    "text-gray-800 dark:text-[#C9FFEE] transition-colors";

  // Loading Skeleton
  if (loading)
    return (
      <div className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex justify-center p-4 space-y-4">
        <div
          className="p-6 rounded-xl backdrop-blur-md 
        bg-white/70 dark:bg-black/30 
        border-2 border-green-300/50 dark:border-green-300/40 
        shadow-lg animate-pulse w-full"
        >
          <div className="h-8 w-48 bg-green-300/40 dark:bg-green-400/30 rounded-lg mx-auto mb-6"></div>

          <div className="flex justify-center gap-3 mb-6">
            <div className="h-6 w-20 bg-green-300/40 dark:bg-green-400/20 rounded-full"></div>
            <div className="h-6 w-28 bg-green-300/40 dark:bg-green-400/20 rounded-full"></div>
          </div>

          <div className="h-6 w-56 bg-green-300/40 dark:bg-green-400/20 rounded mb-4"></div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-5 bg-green-300/40 dark:bg-green-400/20 rounded-md"
              />
            ))}
          </div>
        </div>
      </div>
    );

  if (!episode)
    return (
      <p className="text-center py-20 text-xl font-semibold neon-text">
        Episode not found
      </p>
    );

  return (
    <div className={`px-4 sm:px-6 lg:px-8 max-w-5xl p-4 space-y-4 mx-auto flex justify-center ${baseText} neon-text`}>
      <motion.div
        className="w-full p-6 sm:p-8 rounded-xl backdrop-blur-md
        bg-white/70 dark:bg-black/30
        border-2 border-green-300/50 dark:border-green-300/40
        shadow-lg dark:shadow-green-400/20
        transition-all duration-300 neon-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45 }}
      >
        <motion.h1
          className="text-2xl sm:text-3xl font-extrabold text-center neon-text mb-3 tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {episode.name}
        </motion.h1>

        <div className="flex flex-wrap justify-center gap-3 mb-6 text-xs sm:text-sm">
          <span className="px-3 py-1 rounded-full font-bold uppercase neon-text glow-blue
            bg-white/10 dark:bg-black/70 border border-green-400/50">
            {episode.episode}
          </span>

          <span className="px-3 py-1 rounded-full font-bold uppercase neon-text glow-purple
            bg-white/10 dark:bg-black/70 border border-blue-400/50">
            {episode.air_date}
          </span>
        </div>

        <motion.h2 className="text-base sm:text-lg font-semibold mb-3 neon-text tracking-wide">
          Characters in this Episode:
        </motion.h2>

        <motion.ul
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-xs sm:text-sm"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.03 } } }}
        >
          {characters.map((c) => (
            <motion.li
              key={c.id}
              variants={{ hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } }}
              className="cursor-pointer pl-4 list-disc text-[#065f46] dark:text-[#39FFCA]
                hover:text-[#00ffc8] dark:hover:text-[#72FFE8]
                hover:underline underline-offset-2 transition-all"
            >
              <Link href={`/characters/${c.id}`}>
                {c.name}
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
}
