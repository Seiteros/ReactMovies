import React, { useEffect, useState } from "react";
import axios from "axios";
import SortMovies from "./SortMovies";
import MoviesList from "./MoviesList";
import ReactPaginate from "react-paginate";
import FillterMovies from "./FillterMovies";

function Movies({ isPending, setIsPending, favorites }) {
  const [data, setData] = useState([]);
  const [movies, setMovies] = useState([]);
  const [currentMovies, setCurrentMovies] = useState([]);
  const [checkedMovies, setCheckedMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [moviesPerPage] = useState(4);
  const [pageRangeDisplayed, setPageRangeDisplayed] = useState(5);
  const [marginPagesDisplayed, setMarginPagesDisplayed] = useState(1);
  const pagesVisited = currentPage * moviesPerPage;
  const [filter, setFilter] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const pageCount = Math.ceil(filter ? filteredData.length / moviesPerPage : data.length / moviesPerPage);

  useEffect(() => {
    const fetchData = async () => {
      isPending
        ? await axios
            .get("http://localhost:3000/movies")
            .then((response) => {
              setData(response.data);
              setFilteredData(response.data);
            })
            .catch((err) => console.log(err))
        : console.log("załadowano");
    };
    fetchData();
    setIsPending(false);
  }, [isPending, setIsPending]);

  // Displayed movies
  useEffect(() => {
    setCurrentMovies(movies.slice(pagesVisited, pagesVisited + moviesPerPage));
  }, [movies, moviesPerPage, pagesVisited]);

  const changePage = ({ selected }) => {
    setCurrentPage(selected);
    setCheckedMovies([]);
  };

  // Responsive pagination nav
  useEffect(() => {
    reportWindowSize();
  }, []);
  function reportWindowSize() {
    if (window.innerWidth > 1400) {
      setPageRangeDisplayed(10);
      setMarginPagesDisplayed(2);
    } else if (window.innerWidth > 768) {
      setPageRangeDisplayed(6);
      setMarginPagesDisplayed(2);
    } else if (window.innerWidth > 576) {
      setPageRangeDisplayed(4);
      setMarginPagesDisplayed(1);
    } else if (window.innerWidth < 576) {
      setPageRangeDisplayed(1);
      setMarginPagesDisplayed(0);
    }
  }
  window.onresize = reportWindowSize;

  return (
    <div className="container">
      <SortMovies data={filter ? filteredData : data} setMovies={setMovies} />
      <FillterMovies data={data} favorites={favorites} filteredData={filteredData} setFilteredData={setFilteredData} setFilter={setFilter} />
      <MoviesList
        movies={currentMovies}
        isPending={isPending}
        setIsPending={setIsPending}
        checkedMovies={checkedMovies}
        setCheckedMovies={setCheckedMovies}
      />
      <ReactPaginate
        previousLabel={"Poprzednia"}
        nextLabel={"Następna"}
        pageCount={pageCount}
        pageRangeDisplayed={pageRangeDisplayed}
        marginPagesDisplayed={marginPagesDisplayed}
        onPageChange={changePage}
        containerClassName={"pagination mt-1 d-flex justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        nextClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"page-item active"}
        disabledClassName={"page-item disabled"}
      />
    </div>
  );
}

export default Movies;
