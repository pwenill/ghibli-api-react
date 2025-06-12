import { useQuery } from "@tanstack/react-query";
import FilmList from "../components/FilmList";
import Header from "../components/Header";
import { useState } from "react";

export default function HomePage() {
  const [sort, setSort] = useState("");
  const [query, setQuery] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["films"],
    queryFn: () =>
      fetch("https://ghibliapi.vercel.app/films").then((res) => {
        return res.json();
      }),
  });

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
      {!isLoading && <FilmList lists={data} query={query} sort={sort} />}
    </>
  );
}
