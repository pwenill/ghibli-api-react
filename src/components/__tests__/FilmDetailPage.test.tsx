import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import FilmDetailpage from "../../pages/FilmDetailPage";
import ClientProvider from "../ClientProvider";

// Helper pour rendre le composant avec router
const renderWithRouter = (routeId = "1") => {
  return render(
    <MemoryRouter initialEntries={[`/film/${routeId}`]}>
      <ClientProvider>
        <FilmDetailpage />
      </ClientProvider>
    </MemoryRouter>
  );
};

describe("FilmDetailPage", () => {
  it("should render film details when film exists", () => {
    renderWithRouter("2baf70d1-42bb-4437-b551-e5fed5a87abe");
    expect(screen.getByText("Castle in the Sky")).toBeInTheDocument();
    expect(screen.getByText("Hayao Miyazaki")).toBeInTheDocument();
    expect(screen.getByText("1986")).toBeInTheDocument();
    expect(screen.getByText("95/100")).toBeInTheDocument();
    expect(
      screen.getByText("A young girl with a mysterious crystal...")
    ).toBeInTheDocument();
  });

  it("should show loading when film does not exist", () => {
    renderWithRouter("999");
    expect(screen.getByText("Chargement...")).toBeInTheDocument();
  });
});
