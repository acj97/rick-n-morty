import { create } from 'zustand';
import axios from 'axios';

type Character = {
  id: number;
  name: string;
  image: string;
  status: string;
};

type Store = {
  characters: Character[];
  favorites: number[];
  page: number;
  hasMore: boolean;
  loading: boolean;
  searchTerm: string;
  statusFilter: string | null;
  speciesFilter: string | null;
  genderFilter: string | null;

  setSearchTerm: (term: string) => void;
  setStatusFilter: (status: string | null) => void;
  setSpeciesFilter: (species: string | null) => void;
  setGenderFilter: (gender: string | null) => void;

  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;

  resetCharacters: () => void;
  fetchCharacters: () => Promise<void>;
};

const useCharacterStore = create<Store>((set, get) => ({
  characters: [],
  favorites: typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("favorites") || "[]")
    : [],
  page: 1,
  hasMore: true,
  loading: true,
  searchTerm: "",
  statusFilter: null,
  speciesFilter: null,
  genderFilter: null,

  setSearchTerm: (term) => set({ searchTerm: term }),
  setStatusFilter: (status) => set({ statusFilter: status }),
  setSpeciesFilter: (species) => set({ speciesFilter: species }),
  setGenderFilter: (gender) => set({ genderFilter: gender }),

  toggleFavorite: (id) => {
    const { favorites } = get();
    const newFavs = favorites.includes(id)
      ? favorites.filter(f => f !== id)
      : [...favorites, id];

    localStorage.setItem("favorites", JSON.stringify(newFavs));
    set({ favorites: newFavs });
  },

  isFavorite: (id) => get().favorites.includes(id),

  resetCharacters: () =>
    set({
      characters: [],
      page: 1,
      hasMore: true,
    }),

  fetchCharacters: async () => {
    const {
      page,
      hasMore,
      characters,
      searchTerm,
      statusFilter,
      speciesFilter,
      genderFilter,
    } = get();

    if (!hasMore) return;
    set({ loading: true });

    try {
      const query = new URLSearchParams();
      query.append("page", page.toString());

      if (searchTerm) query.append("name", searchTerm);
      if (statusFilter) query.append("status", statusFilter);
      if (speciesFilter) query.append("species", speciesFilter);
      if (genderFilter) query.append("gender", genderFilter);

      const res = await axios.get(
        `https://rickandmortyapi.com/api/character?${query.toString()}`
      );

      set({
        characters: [...characters, ...res.data.results],
        page: page + 1,
        hasMore: res.data.info.next !== null,
      });
    } catch (error) {
      console.error("Fetch Error:", error);
      set({ hasMore: false });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useCharacterStore;
