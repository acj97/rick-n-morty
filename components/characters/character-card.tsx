'use client';

import useCharacterStore from '@/app/store/use-character-store';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface CharacterCardProps {
  id: number;
  name: string;
  status: string;
  image: string;
}

export default function CharacterCard({ id, name, status, image }: CharacterCardProps) {
  const { toggleFavorite, isFavorite } = useCharacterStore();
  const fav = isFavorite(id);
  const router = useRouter();

  const statusLower = status.toLowerCase();
  const statusClass =
    statusLower === "dead"
      ? "neon-dead text-red-400"
      : statusLower === "alive"
      ? "neon-alive text-green-400"
      : "neon-unknown text-yellow-300";

  return (
    <div
      key={id}
      onClick={() => router.push(`/characters/${id}`)}
      className={`
        cursor-pointer rounded-xl overflow-hidden
        border-2 neon-card neon-card-hover
        bg-white/70 dark:bg-black/40
        backdrop-blur-lg shadow-md
        transition hover:bg-white/80 hover:dark:bg-black/50
      `}
    >
      {/* Image */}
      <div className="relative">
        <span
          className={`
            absolute z-10 top-2 left-2 text-[10px] px-2 py-0.5
            rounded-sm uppercase font-bold tracking-wide
            bg-black/60 backdrop-blur
            border-2 neon-text
            ${statusClass}
          `}
        >
          {status.toUpperCase()}
        </span>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(id);
          }}
          className="cursor-pointer absolute z-20 top-2 right-2 p-1 bg-black/40 rounded-full hover:bg-black/60 transition"
        >
          <Heart
            className={`w-5 h-5 ${
              fav
                ? "fill-red-500 text-red-500 drop-shadow-[0_0_6px_red]"
                : "text-gray-300 dark:text-gray-200"
            }`}
          />
        </button>

        <Image
          src={image || '/images/default.webp'}
          alt={name}
          width={250}
          height={250}
          className={`w-full h-auto object-cover ${
            statusLower === "dead" ? "grayscale opacity-60" : ""
          }`}
          unoptimized
          priority
        />
      </div>

      {/* Name */}
      <div className="px-3 py-2 text-center">
        <p className="
          neon-text text-sm uppercase tracking-wide truncate
          text-gray-900 dark:text-white font-bold dark:font-semibold 
        ">
          {name}
        </p>
      </div>
    </div>
  );
}
