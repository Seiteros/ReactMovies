import React, { useEffect, useState } from "react";

function SortMovies({ data, setMovies }) {
  const [sortType, setSortType] = useState("title_asc");

  useEffect(() => {
    function sortArray() {
      let collator = new Intl.Collator("pl", { numeric: true, sensitivity: "base" });
      if (sortType.slice(-5) === "_desc") {
        const sort = sortType.replace("_desc", "");
        const sorted = [...data].sort((a, b) =>
          collator.compare(a[sort], b[sort]) === 0 ? collator.compare(a.title, b.title) : -collator.compare(a[sort], b[sort])
        );
        return sorted;
      } else {
        const sort = sortType.replace("_asc", "");
        const sorted = [...data].sort((a, b) =>
          collator.compare(a[sort], b[sort]) === 0 ? collator.compare(a.title, b.title) : collator.compare(a[sort], b[sort])
        );
        return sorted;
      }
    }
    setMovies(sortArray());
  }, [sortType, data, setMovies]);

  return (
    <div className="sort">
      <label htmlFor="sort"> Sortuj: </label>
      <select id="sort" onChange={(e) => setSortType(e.target.value)}>
        <option value="title_asc"> Tytuł A-Z </option>
        <option value="title_desc"> Tytuł Z-A </option>
        <option value="rating_asc"> Ocena Rosnąco </option>
        <option value="rating_desc"> Ocena Malejąco</option>
        <option value="year_asc"> Data Rosnąco</option>
        <option value="year_desc"> Data Malejąco </option>
      </select>
    </div>
  );
}

export default SortMovies;
