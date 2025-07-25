import DisplayMovies from "./DisplayMovies";

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
      <h1>Movie Detail</h1>
    </div>
  );
}
