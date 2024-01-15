import { Link } from "react-router-dom";

export const MovieGridItem = ({ movie, index }) => {
  const moviePoster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : `https://www.prokerala.com/movies/assets/img/no-poster-available.webp`;

  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="movie-grid-item" key={index}>
        <div className="movie-grid-item-image">
          <img src={moviePoster} alt="movie-poster" />
        </div>
        <div className="movie-grid-item-title">
          <h3>{movie.original_title}</h3>
        </div>
      </div>
    </Link>
  );
};
