import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import HomePage from "../../pages/HomePage";
import ClientProvider from "../ClientProvider";

// Mock du store Zustand
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

// Fonction utilitaire pour tester avec React Router
const renderWithRouter = (component: any) => {
  return render(
    <ClientProvider>
      <BrowserRouter>{component}</BrowserRouter>
    </ClientProvider>
  );
};

describe("HomePage", () => {
  it("should render FilmList component", () => {
    renderWithRouter(<HomePage />);
    expect(screen.getByText("Castle in the Sky")).toBeInTheDocument();
  });
});
