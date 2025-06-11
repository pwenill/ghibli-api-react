import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Movie {
  image: string;
  title: string;
  year: string;
  id: string;
  producer: string;
}

interface FavoritesState {
  favorites: Movie[];
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movieId: string) => void;
  isFavorite: (movieId: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addToFavorites: (movie: Movie) => {
        const { favorites } = get();
        if (!favorites.find((fav) => fav.id === movie.id)) {
          set({ favorites: [...favorites, movie] });
        }
      },

      removeFromFavorites: (movieId: string) => {
        const { favorites } = get();
        set({ favorites: favorites.filter((fav) => fav.id !== movieId) });
      },

      isFavorite: (movieId: string) => {
        const { favorites } = get();
        return favorites.some((fav) => fav.id === movieId);
      },

      clearFavorites: () => {
        set({ favorites: [] });
      },
    }),
    {
      name: "ghibli-favorites",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
