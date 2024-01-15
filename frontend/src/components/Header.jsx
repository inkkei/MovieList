import { UserContext } from "./UserContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="header">
      <div className="header__container container">
        <h1 className="header__title title-full">Check Your Movie List</h1>
        <h1 className="header__title title-short">CYML</h1>
        <nav className="header__menu">
          <ul className="header__menu-items">
            <li className="menu-item">
              <Link to={"/"}>Home</Link>
            </li>
            {user && (
              <li className="menu-item">
                <Link to={"/lists"}>Lists</Link>
              </li>
            )}
            <li className="menu-item">
              <Link to={"/about"}>About</Link>
            </li>
            <li className="menu-item">
              <Link to={"/account"}>Account</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
