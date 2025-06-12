import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import ClientProvider from "../components/ClientProvider";

// Mock Zustand store
vi.mock("../../store/store", () => {
  return {
    useFavoritesStore: () => ({
      favorites: [],
      addToFavorites: vi.fn(),
      removeFromFavorites: vi.fn(),
      isFavorite: vi.fn().mockReturnValue(false),
      clearFavorites: vi.fn(),
    }),
  };
});

// Mock global fetch pour simuler l'API Ghibli
beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            id: "2baf70d1-42bb-4437-b551-e5fed5a87abe",
            title: "Castle in the Sky",
            description: "The orphan Sheeta...",
            director: "Hayao Miyazaki",
            release_date: "1986",
          },
        ]),
    })
  ) as typeof fetch;
});

// Fonction utilitaire pour rendre avec le router
const renderWithRouter = (component: React.ReactNode) => {
  return render(
    <ClientProvider>
      <BrowserRouter>{component}</BrowserRouter>
    </ClientProvider>
  );
};

describe("HomePage", () => {
  it("should render FilmList component with film data", async () => {
    renderWithRouter(<HomePage />);

    // Attendre que le film soit chargé et affiché
    await waitFor(() => {
      expect(screen.getByText("Castle in the Sky")).toBeInTheDocument();
    });
  });
});
