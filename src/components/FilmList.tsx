import FilmCard from "./FilmCard";

export default function FilmList({
  lists,
  query,
  sort,
}: {
  lists: any[];
  query: string;
  sort: string;
}) {
  // 1. Filtrage insensible à la casse par titre
  const filteredList = lists.filter((film) =>
    film.title.toLowerCase().includes(query.toLowerCase())
  );

  // 2. Tri selon le critère
  const sortedList = [...filteredList].sort((a, b) => {
    switch (sort) {
      case "date":
        return parseInt(a.release_date) - parseInt(b.release_date); // chronologique
      case "title":
        return a.title.localeCompare(b.title); // alphabétique
      case "score":
        return parseFloat(b.rt_score) - parseFloat(a.rt_score); // score décroissant
      default:
        return 0;
    }
  });

  return (
    <div
      className="movie-grid"
      style={{
        padding: "50px",
      }}
    >
      {sortedList.map((film) => (
        <FilmCard
          key={film.id}
          title={film.title}
          producer={film.producer}
          id={film.id}
          year={film.release_date}
          image={film.image}
        />
      ))}
    </div>
  );
}
