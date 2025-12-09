"use client";
import { useEffect, useRef, useState } from "react";

import Input from "@/components/input";
import EpisodeCard from "@/components/episodes/episode-card";

import useEpisodeStore from "../store/use-episodes-store";
import EpisodeSkeletonCard from "@/components/episodes/episode-skeleton-card";

export default function Episodes() {
  const {
    episodes,
    fetchEpisodes,
    hasMore,
    loading,
    searchTerm,
    setSearchTerm,
    resetEpisodes,
  } = useEpisodeStore();

  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch initial + on search change
  useEffect(() => {
    resetEpisodes();
    fetchEpisodes();
    fetchEpisodes(); // preload additional page
  }, [debouncedSearch]);

  // Infinite scroll
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchEpisodes();
        }
      },
      { rootMargin: "200px" }
    );

    if (loadMoreRef.current) obs.observe(loadMoreRef.current);
    return () => obs.disconnect();
  }, [hasMore, loading]);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-4 text-white">

      {/* Search */}
      <Input
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search episodes..."
      />

      {/* Initial Loading */}
      {loading && episodes.length === 0 && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <EpisodeSkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && episodes.length === 0 && (
        <div className="text-center py-20">
          <p className="text-xl font-semibold text-black dark:text-white neon-text">No episodes found</p>
        </div>
      )}

      {/* Episode Grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
        {episodes.map((ep) => (
          <EpisodeCard
            key={ep.id}
            id={ep.id}
            name={ep.name}
            episode={ep.episode}
            air_date={ep.air_date}
          />
        ))}
      </div>

      {/* Infinite scroll loader */}
      <div ref={loadMoreRef} className="h-12 flex justify-center items-center">
        {loading && episodes.length > 0 && (
          <p className="animate-pulse text-gray-400">Loading more...</p>
        )}
      </div>
    </div>
  );
}
