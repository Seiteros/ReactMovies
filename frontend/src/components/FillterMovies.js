import React, { useEffect, useState } from "react";

function FillterMovies({ data, favorites, filteredData, setFilteredData, setFilter }) {
  const [favFilter, setFavFilter] = useState(false);
  const [titleFilter, setTitleFilter] = useState(false);
  const [yearFilter, setYearFilter] = useState(false);
  const [favData, setFavData] = useState(data);
  const [titleData, setTitleData] = useState(data);
  const [yearData, setYearData] = useState(data);

  useEffect(() => {
    setFavData(data);
    setTitleData(data);
    setYearData(data);
  }, [data]);

  useEffect(() => {
    if ([favFilter, titleFilter, yearFilter].some((filter) => filter === true)) {
      setFilter(true);
      console.log("filtruje");
      let intersection = favData.filter((x) => titleData.includes(x)).filter((x) => yearData.includes(x));
      setFilteredData(intersection);
    } else {
      setFilter(false);
      setFilteredData(data);
    }
  }, [setFilter, data, setFilteredData, favFilter, titleFilter, yearFilter, favData, titleData, yearData]);

  const handelCheckedFavorites = (e) => {
    if (e.target.checked) {
      setFavData(favData.filter((movie) => favorites.includes(movie.id)));
      setFavFilter(true);
    } else {
      setFavData(data);
      setFavFilter(false);
    }
  };

  const handelTitleFilter = (e) => {
    let result = data.filter((movie) => movie.title.toLowerCase().search(e.target.value.toLowerCase()) !== -1);
    if (result.length === 0) {
      if (e.target.value.length > 0) {
        setTitleFilter(true);
        setTitleData([]);
      } else {
        setTitleFilter(false);
        setTitleData(data);
      }
    } else {
      setTitleFilter(true);
      setTitleData(result);
    }
  };

  const handelYearFilter = (e) => {
    let result = data.filter((movie) => movie.year.toString().search(e.target.value.toLowerCase()) !== -1);
    if (result.length === 0) {
      if (e.target.value.length > 0) {
        setYearFilter(true);
        setYearData([]);
      } else {
        setYearFilter(false);
        setYearData(data);
      }
    } else {
      setYearFilter(true);
      setYearData(result);
    }
  };

  return (
    <div className="container fillter">
      <div className="row p-1">
        <div className="col-auto p-0 d-flex flex-wrap">
          <div className="me-3 p-1">
            <label className="text-primary fs-4 me-2" htmlFor="title">
              Szukaj Tytułu:
            </label>
            <input className="form-control-sm fs-4" type="text" name="title" onChange={handelTitleFilter}></input>
          </div>
          <div className="me-3 p-1 d-flex align-items-center">
            <label className="text-primary fs-4 me-2" htmlFor="favorites">
              Ulubione
            </label>
            <input className="form-check-input fs-4" type="checkbox" name="favorites" onChange={handelCheckedFavorites}></input>
          </div>
          <div className="me-3 p-1 d-flex align-items-center">
            <label className="text-primary fs-4 me-2" htmlFor="year">
              Rok:
            </label>
            <input className="year fs-4" type="number" name="year" onChange={handelYearFilter}></input>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FillterMovies;
