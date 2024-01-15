export const Search = ({ setSearchValue, searchValue, getMovieList }) => {
  const extendSearchInput = (e) => {
    e.target.classList.add("search-input-hover-change-width");
  };

  const narrowSearchInput = (e) => {
    e.target.classList.remove("search-input-hover-change-width");
  };

  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");

  if (searchInput) {
    searchInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        searchButton.click();
        narrowSearchInput(event);
      }
    });
  }
  return (
    <div className="search">
      <div className="search__container container">
        <div className="search-input-group">
          <div className="search-icon material-symbols-outlined">search</div>
          <input
            id="search-input"
            className="search-input input"
            onChange={(e) => setSearchValue(e.target.value)}
            onBlur={(e) => narrowSearchInput(e)}
            value={searchValue}
            placeholder="Search..."
            onClick={(e) => extendSearchInput(e)}
          />
          <button
            id="search-button"
            onClick={() => getMovieList(searchValue)}
            className="search-button button"
          >
            Go!
          </button>
        </div>
      </div>
    </div>
  );
};
