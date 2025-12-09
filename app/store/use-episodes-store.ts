import { create } from "zustand";
import axios from "axios";

type Episode = {
  id: number;
  name: string;
  episode: string;
  air_date: string;
};

type Store = {
  episodes: Episode[];
  page: number;
  hasMore: boolean;
  loading: boolean;
  searchTerm: string;

  setSearchTerm: (term: string) => void;
  resetEpisodes: () => void;
  fetchEpisodes: () => Promise<void>;
};

const useEpisodeStore = create<Store>((set, get) => ({
  episodes: [],
  page: 1,
  hasMore: true,
  loading: true,
  searchTerm: "",

  setSearchTerm: (term) => set({ searchTerm: term }),

  resetEpisodes: () =>
    set({
      episodes: [],
      page: 1,
      hasMore: true,
    }),

  fetchEpisodes: async () => {
    const { page, hasMore, episodes, searchTerm } = get();
    if (!hasMore) return;
    set({ loading: true });

    try {
      const query = new URLSearchParams();
      query.append("page", page.toString());
      if (searchTerm) query.append("name", searchTerm);

      const { data } = await axios.get(
        `https://rickandmortyapi.com/api/episode?${query.toString()}`
      );

      set({
        episodes: [...episodes, ...data.results],
        page: page + 1,
        hasMore: data.info.next !== null,
      });
    } catch {
      set({ hasMore: false });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useEpisodeStore;
