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
  const filteredList = lists.filter((film) =>
    film.title.toLowerCase().includes(query.toLowerCase())
  );

  const sortedList = [...filteredList].sort((a, b) => {
    switch (sort) {
      case "date":
        return parseInt(a.release_date) - parseInt(b.release_date);
      case "title":
        return a.title.localeCompare(b.title);
      case "score":
        return parseFloat(b.rt_score) - parseFloat(a.rt_score);
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
      {sortedList.length == 0 ? (
        <p>Aucun film en favori pour le moment.</p>
      ) : (
        sortedList.map((film) => (
          <FilmCard
            key={film.id}
            title={film.title}
            producer={film.producer}
            id={film.id}
            year={film.release_date}
            image={film.image}
          />
        ))
      )}
    </div>
  );
}
