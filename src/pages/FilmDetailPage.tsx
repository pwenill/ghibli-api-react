"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export default function FilmDetailpage() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ["films"],
    queryFn: () =>
      fetch("https://ghibliapi.vercel.app/films").then((res) => {
        return res.json();
      }),
  });

  if (isLoading) return "Loading...";

  const findFilm = data.find((x: any) => x.id == id);

  if (!findFilm) return "Film not existing";

  return (
    <div className="container">
      <div className="film-detail-content">
        <div className="film-detail-image">
          <img
            src={findFilm.image || "/placeholder.svg"}
            alt={findFilm.title}
          />
        </div>

        <div className="film-detail-info">
          <h1>{findFilm.title}</h1>
          {findFilm.original_title !== findFilm.title && (
            <h2 className="original-title">{findFilm.original_title}</h2>
          )}

          <div className="film-detail-meta">
            <div className="meta-item">
              <span className="meta-label">Réalisateur :</span>
              <span className="meta-value">{findFilm.director}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Producteur :</span>
              <span className="meta-value">{findFilm.producer}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Année :</span>
              <span className="meta-value">{findFilm.release_date}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Score :</span>
              <span className="meta-value score">{findFilm.rt_score}/100</span>
            </div>
          </div>

          <div className="film-detail-description">
            <h2>Synopsis</h2>
            <p>{findFilm.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
