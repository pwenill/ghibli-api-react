import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import FilmList from "../FilmList";

// Mock du store
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

const renderWithRouter = (component: any) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};
const filmsTests = [
  {
    id: "2baf70d1-42bb-4437-b551-e5fed5a87abe",
    title: "Castle in the Sky",
    image:
      "https://image.tmdb.org/t/p/w600_and_h900_bestv2/npOnzAbLh6VOIu3naU5QaEcTepo.jpg",

    producer: "Isao Takahata",
    release_date: "1986",
  },
  {
    id: "12cfb892-aac0-4c5b-94af-521852e46d6a",
    title: "Grave of the Fireflies",
    image:
      "https://image.tmdb.org/t/p/w600_and_h900_bestv2/qG3RYlIVpTYclR9TYIsy8p7m7AT.jpg",
    producer: "Toru Hara",
    release_date: "1988",
  },
];

describe("FilmList", () => {
  it("should render all films when not on favorite page", () => {
    renderWithRouter(<FilmList lists={filmsTests} query="" sort="date" />);
    expect(screen.getByText("Castle in the Sky")).toBeInTheDocument();
    expect(screen.getByText("Grave of the Fireflies")).toBeInTheDocument();
  });

  it('should show "no favorites" message when favorite page is empty', () => {
    renderWithRouter(<FilmList lists={[]} query="" sort="date" />);
    expect(
      screen.getByText("Aucun film en favori pour le moment.")
    ).toBeInTheDocument();
  });
});
