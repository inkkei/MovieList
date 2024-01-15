import { MovieGridItem } from "../components/movie-view/MovieGridItem";

export const MoviesGrid = ({ movies }) => {
  const arrayChunk = (arr, n) => {
    const array = arr.slice();
    const chunks = [];
    while (array.length) chunks.push(array.splice(0, n));
    return chunks;
  };

  return (
    <div className="grid__container container">
      {arrayChunk(movies, 3).map((row, i) => (
        <div key={i} className="movies-grid-row">
          {row.map((item, i) => (
            <MovieGridItem key={i} movie={item} index={i} />
          ))}
        </div>
      ))}
    </div>
  );
};
