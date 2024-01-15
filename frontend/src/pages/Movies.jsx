import { MoviesList } from "./MoviesList";
import { MoviesGrid } from "./MoviesGrid";
import { Search } from "../components/Search";
import { SearchWarning } from "../components/SearchWarning";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../components/UserContext";
import { api_key } from "../config/api";
import { WarningAlert } from "../components/WarningAlert";

export const Movies = () => {
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState([]);
  const [gridView, setGridView] = useState(true);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}`)
      .then((response) => response.json())
      .then((response) => response.results)
      .then((results) => setMovies(results));
  }, []);

  const getMovieList = (title) => {
    if (title.trim().length > 0) {
      setMovies([]);
      setLoading(true);
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${title}`
      )
        .then((res) => res.json())
        .then((json) => json.results)
        .then((results) =>
          results.filter((item) => item.original_language === "en")
        )
        .then((data) => data.sort((a, b) => a.vote_count < b.vote_count))
        .then((data) => setMovies(data))
        .finally(() => setLoading(false));
    }
  };

  return (
    <>
      {user ? (
        <Search
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          getMovieList={getMovieList}
        />
      ) : (
        <SearchWarning />
      )}
      <div className="change-view">
        <button
          onClick={() => {
            setGridView(!gridView);
          }}
        >
          {gridView ? "List View" : "Grid View"}
        </button>
      </div>
      {movies.length !== 0 ? (
        gridView ? (
          <MoviesGrid movies={movies} />
        ) : (
          <MoviesList movies={movies} />
        )
      ) : (
        <WarningAlert
          warningTitle={"Not Found"}
          warningText={"Try to search another movie"}
        />
      )}
    </>
  );
};
