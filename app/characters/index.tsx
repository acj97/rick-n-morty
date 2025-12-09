'use client';
import { useEffect, useRef, useState } from 'react';
import useCharacterStore from '../store/use-character-store';
import Dropdown from '@/components/dropdown';
import CharacterCard from '@/components/characters/character-card';
import Input from '@/components/input';
import CharacterSkeletonCard from '@/components/characters/character-skeleton-card';
import { motion } from 'framer-motion';

export default function Characters() {
  const {
    characters,
    fetchCharacters,
    hasMore,
    loading,
    searchTerm,
    statusFilter,
    speciesFilter,
    genderFilter,
    setSearchTerm,
    setStatusFilter,
    setSpeciesFilter,
    setGenderFilter,
    resetCharacters,
  } = useCharacterStore();

  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Trigger search/filter whenever debouncedSearch or filters change
  useEffect(() => {
    resetCharacters();
    fetchCharacters();
    fetchCharacters(); // load 2 pages initially
  }, [
    debouncedSearch,
    statusFilter,
    speciesFilter,
    genderFilter,
    fetchCharacters,
    resetCharacters,
  ]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchCharacters();
        }
      },
      { rootMargin: '200px' }
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasMore, fetchCharacters, loading]);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-4">
      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 justify-center sm:justify-start w-full">

        <Input
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search by name..."
        />

        <Dropdown
          value={statusFilter}
          onChange={setStatusFilter}
          options={[
            { label: 'All Status', value: null },
            { label: 'Alive', value: 'alive' },
            { label: 'Dead', value: 'dead' },
            { label: 'Unknown', value: 'unknown' },
          ]}
        />

        <Dropdown
          value={speciesFilter}
          onChange={setSpeciesFilter}
          options={[
            { label: 'All Species', value: null },
            { label: 'Human', value: 'human' },
            { label: 'Alien', value: 'alien' },
            { label: 'Humanoid', value: 'humanoid' },
            { label: 'Robot', value: 'robot' },
            { label: 'Mythological', value: 'mythological' },
            { label: 'Disease', value: 'disease' },
            { label: 'Unknown', value: 'unknown' },
          ]}
        />

        <Dropdown
          value={genderFilter}
          onChange={setGenderFilter}
          options={[
            { label: 'All Gender', value: null },
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
            { label: 'Genderless', value: 'genderless' },
            { label: 'Unknown', value: 'unknown' },
          ]}
        />
      </div>

      {/* Loading spinner */}
      {loading && characters.length === 0 && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <CharacterSkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && characters.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center text-white neon-text">
          <p className="text-xl font-semibold">No characters found</p>
        </div>
      )}

      {/* Characters Grid */}
      {characters.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6">
          {characters.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}   // <-- animate only first time
              transition={{
                duration: 0.35,
                ease: "easeOut"
              }}
            >
              <CharacterCard
                id={item.id}
                name={item.name}
                status={item.status}
                image={item.image}
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Bottom loader */}
      <div ref={loadMoreRef} className="h-10 w-full flex justify-center items-center">
        {loading && characters.length > 0 && (
          <p className="text-gray-900 dark:text-white neon-text animate-pulse">Loading more...</p>
        )}
      </div>
    </div>
  );
}
