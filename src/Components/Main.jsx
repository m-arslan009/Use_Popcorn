import DisplayMovies from "./DisplayMovies";
import MovieDetail from "./MovieDetail";
import History from "./History";

export default function Main({
  dispatch,
  movies,
  selectedMovie,
  isError,
  isLoading,
  isFound,
}) {
  return (
    <div className="main-container">
      <DisplayMovies
        Movies={movies}
        dispatch={dispatch}
        isLoading={isLoading}
        isError={isError}
        isFound={isFound}
      />
      <div style={{ backgroundColor: "rgb(98, 98, 98)", borderRadius: "10px" }}>
        {!selectedMovie && <History />}
        {selectedMovie && (
          <MovieDetail selectedMovie={selectedMovie} dispatch={dispatch} />
        )}
      </div>
    </div>
  );
}
