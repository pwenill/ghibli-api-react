import { Star } from "lucide-react";
import { Link } from "react-router";
import { useFavoritesStore } from "../store/store";
import clsx from "clsx";

interface Props {
  image: string;
  title: string;
  year: string;
  id: string;
  producer: string;
}

export default function FilmCard(data: Props) {
  const favorite = useFavoritesStore();
  return (
    <div className="movie-card">
      <div className="movie-card-image">
        <img src={data.image} />
        <button
          className={clsx(
            "favorite-button",
            favorite.isFavorite(data.id) && "active"
          )}
          onClick={() => {
            if (favorite.isFavorite(data.id)) {
              favorite.removeFromFavorites(data.id);
            } else {
              favorite.addToFavorites(data);
            }
          }}
        >
          <Star size={18} />
        </button>
      </div>
      <div className="movie-info">
        <h3>{data.title}</h3>
        <p>
          <b>Réalisateur</b> : {data.producer}
        </p>
        <p>
          <b>Années</b> : {data.year}
        </p>
        <Link to={`/films/${data.id}`} className="details-link">
          Voir plus
        </Link>
      </div>
    </div>
  );
}
