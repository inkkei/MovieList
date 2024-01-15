import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WarningAlert } from "../components/WarningAlert";
import { UserContext } from "../components/UserContext";
import { api_key } from "../config/api";
import axios from "axios";

export const DetailMovie = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);

  const [movieDetail, setMovieDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const [lists, setLists] = useState([]);

  const addToList = async (listTitle) => {
    const movie = { movieId: id, userId: user.uid, list: listTitle };
    try {
      await axios.post(
        "https://checkyourmovielist.onrender.com/addToList",
        movie
      );
    } catch (error) {
      console.log(error);
    }
  };
  const deleteFromList = async (listTitle) => {
    const movie = { movieId: id, userId: user?.uid, list: listTitle };
    try {
      await axios.delete(
        "https://checkyourmovielist.onrender.com/deleteFromList",
        movie
      );
    } catch (error) {
      console.log(error);
    }

    setLists(lists.filter((item) => item !== listTitle));
  };

  const checkList = async () => {
    const movie = { movieId: id, userId: user?.uid };
    try {
      const response = await axios.post(
        "https://checkyourmovielist.onrender.com/checkLists",
        movie
      );
      console.log(response.data);

      /* if (response.data.length > 0) {
        response.data.map((item) =>
          setLists((current) => [...current, item.list])
        );
      } */
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkList();
    const api = `https://api.themoviedb.org/3/movie/${id}?&api_key=${api_key}`;
    setLoading(true);

    fetch(api)
      .then((res) => res.json())
      .then((json) => setMovieDetail(json))
      .finally(() => setLoading(false));
  }, [user]);

  const title = movieDetail.original_title ? movieDetail.original_title : "-";
  const date = movieDetail.release_date ? movieDetail.release_date : "-";
  const moviePoster = movieDetail.poster_path
    ? `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`
    : `https://www.prokerala.com/movies/assets/img/no-poster-available.webp`;

  const genres = movieDetail.genres
    ? movieDetail.genres.map((item) => item.name).join(", ")
    : " - ";
  const countries = movieDetail.production_countries
    ? movieDetail.production_countries.map((item) => item.name).join(", ")
    : " - ";
  const tagline = movieDetail.tagline ? movieDetail.tagline : " - ";
  const averageRating = movieDetail.vote_average
    ? movieDetail.vote_average.toFixed(2)
    : "-";
  const imdb_link = movieDetail.imdb_id
    ? `https://www.imdb.com/title/${movieDetail.imdb_id}`
    : "#";
  const countRating = movieDetail.vote_count ? movieDetail.vote_count : "-";
  const overview = movieDetail.overview ? movieDetail.overview : "-";
  const budget = movieDetail.budget
    ? new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "USD",
      }).format(movieDetail.budget)
    : "-";

  const clickButtonAction = (e) => {
    if (lists.includes(e.target.id)) {
      deleteFromList(e.target.id);
      setLists(lists.filter((item) => item !== e.target.id));
    } else {
      addToList(e.target.id);
      setLists((current) => [...current, e.target.id]);
    }
  };

  return loading ? (
    <WarningAlert warningTitle={"Loading..."} warningText={"Please wait...`"} />
  ) : (
    <div className="detail-movie__container">
      <div className="detail-movie-image">
        <img src={moviePoster} alt="movie-poster" />
      </div>
      <div className="detail-movie-content">
        <h2 className="detail-movie-title">{title}</h2>

        <ul className="detail-movie-info">
          <li className="detail-movie-info-item">
            Release Date: <span>{date}</span>
          </li>

          <li className="detail-movie-info-item">
            Genres: <span>{genres}</span>
          </li>

          <li className="detail-movie-info-item">
            Tagline: <span>{tagline}</span>
          </li>

          <li className="detail-movie-info-item">
            Rating:
            <span>
              {averageRating} ({countRating})
            </span>
          </li>

          <li className="detail-movie-info-item">
            Country: <span>{countries}</span>
          </li>

          <li className="detail-movie-info-item">
            Budget: <span>{budget}</span>
          </li>

          <li className="detail-movie-info-item">
            <a href={imdb_link} target="_blank" rel="noreferrer">
              IMDb Page
            </a>
          </li>

          <li className="detail-movie-description">{overview}</li>
        </ul>
      </div>
      <div className="detail-movie-actions">
        {user && (
          <ul>
            <li id="favourite" onClick={(e) => clickButtonAction(e)}>
              {lists.includes("favourite")
                ? "Delete from Favourite"
                : "Add to Favourite"}
            </li>

            <li id="later" onClick={(e) => clickButtonAction(e)}>
              {lists.includes("later") ? "Delete from Later" : "Add to Later"}
            </li>

            <li id="watched" onClick={(e) => clickButtonAction(e)}>
              {lists.includes("watched")
                ? "Delete from Watched"
                : "Add to Watched"}
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};
