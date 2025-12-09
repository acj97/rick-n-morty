import { create } from 'zustand';
import axios from 'axios';

type CharacterDetail = {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: { name: string };
  location: { name: string };
  image: string;
  episode: string[];
};

type Episode = {
  id: number;
  name: string;
};

type CharacterDetailStore = {
  character: CharacterDetail | null;
  episodes: Episode[];
  loading: boolean;

  fetchCharacterDetail: (id: string | number) => Promise<void>;
};

export const useCharacterDetailStore = create<CharacterDetailStore>((set) => ({
  character: null,
  episodes: [],
  loading: true,

  fetchCharacterDetail: async (id) => {
    set({ loading: true });

    try {
      const res = await axios.get(
        `https://rickandmortyapi.com/api/character/${id}`
      );
      const charData = res.data;

      let episodes: Episode[] = [];

      const episodeIds = charData.episode.map((url: string) =>
        url.split('/').pop()
      );

      if (episodeIds.length > 0) {
        const episodesRes = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodeIds.join(',')}`
        );
        episodes = Array.isArray(episodesRes.data)
          ? episodesRes.data
          : [episodesRes.data];
      }

      set({
        character: charData,
        episodes,
      });
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },
}));
