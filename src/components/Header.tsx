import clsx from "clsx";
import { useEffect, useState } from "react";

export default function Header({
  sortChange,
  queryChange,
}: {
  sortChange: (sort: string) => void;
  queryChange: (query: string) => void;
}) {
  const [sort, setSort] = useState("date");
  const [query, setQuery] = useState("");

  const sorts = [
    {
      title: "Par date",
      id: "date",
    },
    {
      title: "Par titre",
      id: "title",
    },
    {
      title: "Par score",
      id: "score",
    },
  ];

  useEffect(() => {
    sortChange(sort);
    queryChange(query);
  }, [sort, query]);

  return (
    <header className="header">
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Rechercher un film..."
          onChange={(e) => setQuery(e.currentTarget.value)}
        />
      </div>
      <div className="sort-container">
        {sorts.map((s) => {
          return (
            <button
              className={clsx("sort-button", s.id == sort && "active")}
              key={s.id}
              onClick={() => {
                setSort(s.id);
              }}
            >
              {s.title}
            </button>
          );
        })}
      </div>
    </header>
  );
}
