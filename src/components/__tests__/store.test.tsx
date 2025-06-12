import { describe, it, expect, beforeEach, vi } from "vitest";
import { useFavoritesStore } from "../../store/store";

// Mock de localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
globalThis.localStorage = localStorageMock;

describe("Favorites Zustand Store", () => {
  const movie1 = {
    id: "1",
    title: "Castle in the Sky",
    year: "1986",
    image: "castle.jpg",
    producer: "Hayao Miyazaki",
  };

  const movie2 = {
    id: "2",
    title: "My Neighbor Totoro",
    year: "1988",
    image: "totoro.jpg",
    producer: "Hayao Miyazaki",
  };

  const movie3 = {
    id: "3",
    title: "Princess Mononoke",
    year: "1997",
    image: "mononoke.jpg",
    producer: "Hayao Miyazaki",
  };

  beforeEach(() => {
    // Reset le store avant chaque test
    useFavoritesStore.setState({ favorites: [] });
  });

  describe("Favorites management", () => {
    it("should add a movie to favorites", () => {
      useFavoritesStore.getState().addToFavorites(movie1);
      const favorites = useFavoritesStore.getState().favorites;
      expect(favorites).toHaveLength(1);
      expect(favorites[0]).toEqual(movie1);
    });

    it("should not add duplicate movies", () => {
      useFavoritesStore.getState().addToFavorites(movie1);
      useFavoritesStore.getState().addToFavorites(movie1);
      const favorites = useFavoritesStore.getState().favorites;
      expect(favorites).toHaveLength(1);
    });

    it("should remove a movie from favorites", () => {
      useFavoritesStore.getState().addToFavorites(movie2);
      useFavoritesStore.getState().removeFromFavorites(movie2.id);
      const favorites = useFavoritesStore.getState().favorites;
      expect(favorites).toHaveLength(0);
    });

    it("should handle multiple favorites", () => {
      const store = useFavoritesStore.getState();
      store.addToFavorites(movie1);
      store.addToFavorites(movie2);
      const favorites = useFavoritesStore.getState().favorites;
      expect(favorites).toHaveLength(2);
      expect(favorites).toEqual(expect.arrayContaining([movie1, movie2]));
    });

    it("should correctly report if a movie is favorite", () => {
      useFavoritesStore.getState().addToFavorites(movie3);
      const isFav = useFavoritesStore.getState().isFavorite(movie3.id);
      expect(isFav).toBe(true);
    });

    it("should correctly report if a movie is not favorite", () => {
      const isFav = useFavoritesStore.getState().isFavorite("unknown-id");
      expect(isFav).toBe(false);
    });

    it("should clear all favorites", () => {
      const store = useFavoritesStore.getState();
      store.addToFavorites(movie1);
      store.addToFavorites(movie2);
      store.clearFavorites();
      const favorites = useFavoritesStore.getState().favorites;
      expect(favorites).toHaveLength(0);
    });
  });
});
