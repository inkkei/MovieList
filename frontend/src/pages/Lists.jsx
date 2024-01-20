import { useEffect, useState, useContext } from "react";
import { UserContext } from "../components/UserContext";
import { MoviesList } from "./MoviesList";
import { api_key } from "../config/api";
import { WarningAlert } from "../components/WarningAlert";

export const Lists = () => {
  const { user } = useContext(UserContext);
  const [showedMovies, setShowedMovies] = useState([]);
  const [selectedList, setSelectedList] = useState("favourite");

  const getAllMoviesInList = async (listTitle) => {
    const body = { list: listTitle, userId: user?.uid };
    setShowedMovies([]);
    const response = await fetch(
      "https://checkyourmovielist.onrender.com/api/movies//getAll",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();

    json.map((item) =>
      fetch(
        `https://api.themoviedb.org/3/movie/${item.movieId}?&api_key=${api_key}`
      )
        .then((res) => res.json())
        .then((json) => setShowedMovies((current) => [...current, json]))
    );
  };

  useEffect(() => {
    getAllMoviesInList(selectedList);
  }, [user, selectedList]);

  const selectList = (ev) => {
    setSelectedList(ev.target.id);
  };

  let menuItems = document.querySelectorAll(".lp__menu-item");
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("lp__menu-item")) {
      for (let i = 0; i < menuItems.length; i++) {
        menuItems[i].classList.remove("lp__menu-item-active");
      }
      event.target.classList.add("lp__menu-item-active");
    }
  });

  return (
    <div className="listpage__container">
      <div className="lp__header">
        <ul className="lp__menu-items">
          <li
            id="favourite"
            className="lp__menu-item lp__menu-item-active"
            onClick={selectList}
          >
            Favourites
          </li>
          <li id="later" className="lp__menu-item" onClick={selectList}>
            Watch Later
          </li>
          <li id="watched" className="lp__menu-item" onClick={selectList}>
            Watched
          </li>
        </ul>
      </div>
      {showedMovies.length > 0 ? (
        <MoviesList movies={showedMovies} />
      ) : (
        <WarningAlert
          warningTitle={"This list is empty"}
          warningText={"Add movies here"}
        />
      )}
    </div>
  );
};
