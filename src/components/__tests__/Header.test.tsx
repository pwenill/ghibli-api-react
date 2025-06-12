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

describe("Favorites Store", () => {
  let store: ReturnType<typeof useFavoritesStore.getState>;

  const movie1 = {
    id: "1",
    title: "My Neighbor Totoro",
    year: "1988",
    image: "totoro.jpg",
    producer: "Hayao Miyazaki",
  };

  const movie2 = {
    id: "2",
    title: "Spirited Away",
    year: "2001",
    image: "spirited.jpg",
    producer: "Hayao Miyazaki",
  };

  beforeEach(() => {
    store = useFavoritesStore.getState();
    useFavoritesStore.setState({ favorites: [] });
  });

  it("should add a movie to favorites", () => {
    useFavoritesStore.getState().addToFavorites(movie1);
    const favorites = useFavoritesStore.getState().favorites;
    expect(favorites).toHaveLength(1);
    expect(favorites[0]).toEqual(movie1);
  });

  it("should not add duplicate movies", () => {
    store.addToFavorites(movie1);
    store.addToFavorites(movie1);
    expect(store.favorites).toHaveLength(1);
  });

  it("should remove a movie from favorites", () => {
    useFavoritesStore.getState().addToFavorites(movie1);
    useFavoritesStore.getState().removeFromFavorites(movie1.id);
    const favorites = useFavoritesStore.getState().favorites;
    expect(favorites).toHaveLength(0);
  });

  it("should return true if movie is in favorites", () => {
    store.addToFavorites(movie2);
    expect(store.isFavorite(movie2.id)).toBe(true);
  });

  it("should return false if movie is not in favorites", () => {
    expect(store.isFavorite("999")).toBe(false);
  });

  it("should clear all favorites", () => {
    store.addToFavorites(movie1);
    store.addToFavorites(movie2);

    let favorites = useFavoritesStore.getState().favorites;
    expect(favorites).toHaveLength(2); // ✅ maintenant correct

    store.clearFavorites();
    favorites = useFavoritesStore.getState().favorites;
    expect(favorites).toHaveLength(0);
  });
});
