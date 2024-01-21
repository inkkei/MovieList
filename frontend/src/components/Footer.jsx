import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useContext } from "react";

export const Footer = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="footer">
      <div className="footer__container container">
        <ul className="footer__content">
          <li className="footer-item">
            <Link to={"/about"}>About</Link>
          </li>
          <li className="footer-item">
            <a href="mailto: imgnlenn@gmail.com"> Contact </a>
          </li>
          {user && (
            <li className="footer-item">
              <Link to={"/lists"}>Lists</Link>
            </li>
          )}
          <li className="footer-item">
            <Link to={"/Info"}>Info</Link>
          </li>
        </ul>
        <div className="footer__copy">
          <p>Created by Demyd Zabrodskyi © 2023</p>
        </div>
      </div>
    </div>
  );
};
