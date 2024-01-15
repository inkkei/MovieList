import { MovieListItem } from "../components/movie-view/MovieListItem";

export const MoviesList = ({ movies }) => {
  return (
    <div className="movies">
      <div className="movies__container container">
        {movies.map((item, i) => (
          <MovieListItem key={i} movie={item} />
        ))}
      </div>
    </div>
  );
};
