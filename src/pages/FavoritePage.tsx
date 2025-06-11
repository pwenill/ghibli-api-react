import { useState } from "react";
import FilmList from "../components/FilmList";
import Header from "../components/Header";
import { useFavoritesStore } from "../store/store";

export default function FavoritePage() {
  const [sort, setSort] = useState("");
  const [query, setQuery] = useState("");
  const favoriteStore = useFavoritesStore();

  return (
    <>
      <Header
        queryChange={(query) => {
          setQuery(query);
        }}
        sortChange={(sort) => {
          setSort(sort);
        }}
      />
      <div className="container">
        <FilmList lists={favoriteStore.favorites} query={query} sort={sort} />
      </div>
    </>
  );
}
