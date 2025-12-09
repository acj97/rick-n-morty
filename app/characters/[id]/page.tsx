'use client';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
import { useCharacterDetailStore } from '@/app/store/use-character-detail-store';
import { motion } from "framer-motion";
import Link from 'next/link';

export default function CharacterDetailPage() {
  const { id } = useParams();

  const {
    character,
    episodes,
    loading,
    fetchCharacterDetail,
  } = useCharacterDetailStore();

  useEffect(() => {
    if (id) fetchCharacterDetail(id as string);
  }, [id, fetchCharacterDetail]);

  // Loading State
  if (loading)
    return (
      <div className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex justify-center p-4 space-y-4">
        <div
          className="p-6 sm:p-8 rounded-xl backdrop-blur-md 
          bg-white/70 dark:bg-black/30 
          border-2 border-green-300/50 dark:border-green-300/40 
          shadow-lg animate-pulse w-full"
        >
          <div className="h-8 w-48 bg-green-300/40 dark:bg-green-400/30 rounded-lg mx-auto mb-6"></div>

          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">

            <div className="w-40 h-40 sm:w-60 sm:h-60 bg-green-300/30 dark:bg-green-400/20 rounded-xl"></div>

            <div className="space-y-4 flex-1 w-full">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-5 w-3/4 bg-green-300/40 dark:bg-green-400/20 rounded"></div>
              ))}

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-5 bg-green-300/40 dark:bg-green-400/20 rounded-md"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );


  if (!character)
    return (
      <p className="text-center py-20 font-bold text-lg sm:text-xl text-gray-800 dark:text-[#C9FFEE] neon-text">
        Character not found 😢
      </p>
    );

  const status = character.status.toLowerCase();
  const statusClass =
    status === "dead"
      ? "text-red-400 glow-red"
      : status === "alive"
      ? "text-[#39FFCA] glow-green"
      : "text-yellow-300 glow-yellow";

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-5xl p-4 space-y-4 mx-auto flex justify-center text-gray-800 dark:text-[#C9FFEE] neon-text">
      <motion.div
        className="p-6 sm:p-8 rounded-xl backdrop-blur-md 
        bg-white/70 dark:bg-black/30 
        border-2 border-neon border-green-300/50 dark:border-green-300/40 
        shadow-lg dark:shadow-green-400/20 w-full neon-card"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >

        {/* Title */}
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 text-center glow-green"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {character.name}
        </motion.h1>

        {/* Main section */}
        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">

          {/* Image */}
          <motion.div
            className="relative w-40 h-40 sm:w-60 sm:h-60 shrink-0"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Image
              src={character.image}
              alt={character.name}
              fill
              className="object-cover rounded-xl
              border border-green-400/40 shadow-md dark:shadow-green-400/50"
              priority
              unoptimized
            />
          </motion.div>

          {/* Details */}
          <motion.div
            className="space-y-3 text-base sm:text-lg w-full"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.2 }
              }
            }}
          >

            <motion.p variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}>
              <span className="font-bold">Status:</span>{" "}
              <span className={`${statusClass} font-bold`}>{character.status}</span>
            </motion.p>

            <motion.p variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}>
              <span className="font-bold">Species:</span> {character.species}
            </motion.p>

            <motion.p variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}>
              <span className="font-bold">Gender:</span> {character.gender}
            </motion.p>

            <motion.p variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}>
              <span className="font-bold">Origin:</span> {character.origin.name}
            </motion.p>

            <motion.p variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}>
              <span className="font-bold">Location:</span> {character.location.name}
            </motion.p>

            {/* Episodes */}
            <motion.p
              className="font-extrabold pt-3 glow-green text-base sm:text-lg"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            >
              Appeared In Episodes:
            </motion.p>

            <motion.ul
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-xs sm:text-sm"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.03 } } }}
            >
              {episodes.map(ep => (
                <motion.li
                  key={ep.id}
                  className="cursor-pointer pl-4 lg:list-disc text-[#065f46] dark:text-[#39FFCA]
                  hover:text-[#00ffc8] dark:hover:text-[#72FFE8]
                  hover:underline underline-offset-2 transition-all"
                  variants={{ hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } }}
                >
                  <Link href={`/episodes/${ep.id}`}>
                    {ep.name}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

          </motion.div>
        </div>

      </motion.div>

    </div>
  );
}
