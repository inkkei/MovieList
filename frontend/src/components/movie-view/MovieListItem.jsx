import { Link } from "react-router-dom";

export const MovieListItem = ({ movie }) => {
  const movieYear = movie.release_date ? movie.release_date.slice(0, 4) : "-";
  const moviePoster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : `https://www.prokerala.com/movies/assets/img/no-poster-available.webp`;
  return (
    <div className="movie-item">
      <div className="movie-item-image">
        <img src={moviePoster} alt="movie-poster" />
      </div>
      <div className="movie-item-content">
        <h2 className="movie-item-title">{movie.original_title}</h2>
        <ul className="movie-info">
          <li className="info-item">
            Year: <span>{movieYear}</span>
          </li>
          <li className="info-item description">
            Description: <span>{movie.overview}</span>
          </li>
        </ul>
        <div className="movie-item-buttonblock">
          <Link className="movie-item-button" to={`/movie/${movie.id}`}>
            {" "}
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};
