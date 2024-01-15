import { Link } from "react-router-dom";

export const SearchWarning = () => {
  return (
    <div className="seearch-warning__container container">
      <Link to={"/account"}>
        <button>Please Log In To Use Search</button>
      </Link>
    </div>
  );
};
