import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import FavoritePage from "./pages/FavoritePage";
import "./index.css";
import Navbar from "./components/Navbar";
import ClientProvider from "./components/ClientProvider";
import FilmDetailpage from "./pages/FilmDetailPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClientProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritePage />} />
          <Route path="/films/:id" element={<FilmDetailpage />} />
        </Routes>
      </BrowserRouter>
    </ClientProvider>
  </StrictMode>
);
