import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import FilmDetailpage from "../../pages/FilmDetailPage";
import ClientProvider from "../ClientProvider";

// Mock des données de film pour l'API
const mockFilm = {
  id: "1",
  title: "Castle in the Sky",
  director: "Hayao Miyazaki",
  release_date: "1986",
  image: "https://example.com/image.jpg",
  rt_score: "95",
  description: "A young girl with a mysterious crystal...",
};

// Mock de l'API fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock dynamique de useParams
let mockId = "1";
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: () => ({ id: mockId }),
  };
});

const renderWithRouter = (routeId = "1") => {
  mockId = routeId;
  return render(
    <MemoryRouter initialEntries={[`/film/${routeId}`]}>
      <ClientProvider>
        <FilmDetailpage />
      </ClientProvider>
    </MemoryRouter>
  );
};

describe("FilmDetailPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render film details when film exists", async () => {
    // Mock de la réponse API réussie
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockFilm,
    });

    renderWithRouter("2baf70d1-42bb-4437-b551-e5fed5a87abe");

    // Vérifier que le loading s'affiche d'abord
    expect(screen.getByText("Chargement...")).toBeInTheDocument();

    // Attendre que le contenu se charge
    await waitFor(
      () => {
        expect(screen.getByText("Castle in the Sky")).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Vérifier que le loading a disparu
    expect(screen.queryByText("Chargement...")).not.toBeInTheDocument();

    // Vérifier tous les éléments
    expect(screen.getByText("Hayao Miyazaki")).toBeInTheDocument();
    expect(screen.getByText("1986")).toBeInTheDocument();
    expect(screen.getByText(/95/)).toBeInTheDocument();
    expect(
      screen.getByText("A young girl with a mysterious crystal...")
    ).toBeInTheDocument();
  });

  it("should show loading when film does not exist", async () => {
    // Mock d'une réponse API échouée
    mockFetch.mockRejectedValueOnce(new Error("Film not found"));

    renderWithRouter("999");

    // Vérifier que le loading s'affiche
    expect(screen.getByText("Chargement...")).toBeInTheDocument();

    // Attendre un peu pour voir si le loading persiste (film non trouvé)
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Le loading devrait toujours être là si le film n'existe pas
    expect(screen.getByText("Chargement...")).toBeInTheDocument();
  });

  it("should handle loading state correctly", async () => {
    // Mock d'une réponse lente pour tester l'état de chargement
    mockFetch.mockImplementationOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                ok: true,
                json: async () => mockFilm,
              }),
            200
          )
        )
    );

    renderWithRouter("1");

    // Vérifier que le loading s'affiche initialement
    expect(screen.getByText("Chargement...")).toBeInTheDocument();

    // Attendre que le contenu apparaisse
    await waitFor(
      () => {
        expect(screen.getByText("Castle in the Sky")).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Vérifier que le loading a disparu
    expect(screen.queryByText("Chargement...")).not.toBeInTheDocument();
  });
});
