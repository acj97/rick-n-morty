import { create } from "zustand";
import axios from "axios";

type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
};

type Character = {
  id: number;
  name: string;
};

type EpisodeDetailStore = {
  episode: Episode | null;
  characters: Character[];
  loading: boolean;
  fetchEpisodeDetail: (id: string | number) => Promise<void>;
};

export const useEpisodeDetailStore = create<EpisodeDetailStore>((set) => ({
  episode: null,
  characters: [],
  loading: true,

  fetchEpisodeDetail: async (id) => {
    set({ loading: true });

    try {
      const epRes = await axios.get(
        `https://rickandmortyapi.com/api/episode/${id}`
      );

      const epData = epRes.data;

      const charIds = epData.characters.map((url: string) =>
        url.split("/").pop()
      );

      let characters: Character[] = [];

      if (charIds.length > 0) {
        const charsRes = await axios.get(
          `https://rickandmortyapi.com/api/character/${charIds.join(",")}`
        );
        characters = Array.isArray(charsRes.data)
          ? charsRes.data
          : [charsRes.data];
      }

      set({
        episode: epData,
        characters,
      });
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },
}));
