import MovieComponent from "./MovieComponent";
import Loading from "./Loading";
import Error from "./Error";

export default function DisplayMovies({
  Movies,
  dispatch,
  isLoading,
  isError,
  isFound,
}) {
  const moviesList = Movies?.map((movie) => {
    return (
      <MovieComponent
        key={movie.imdbID}
        movie={movie}
        onClick={() => dispatch({ type: "SET_SELECTED_MOVIE", payload: movie })}
      />
    );
  });

  const handleRetry = () => {
    dispatch({ type: "SET_ERROR", payload: false });
    dispatch({ type: "SET_NOT_FOUND", payload: false });
  };

  return (
    <div className="movies-container">
      {isLoading && <Loading />}

      {isError && !isLoading && (
        <Error
          message="Failed to fetch movies. Please check your internet connection or try again later."
          onRetry={handleRetry}
        />
      )}

      {isFound && !isLoading && !isError && (
        <div className="not-found">
          <p>
            🎬 No movies found for your search. Try searching for different
            keywords!
          </p>
        </div>
      )}

      {!isLoading &&
        !isError &&
        !isFound &&
        moviesList &&
        moviesList.length > 0 && (
          <div className="movies-list">{moviesList}</div>
        )}

      {!isLoading &&
        !isError &&
        !isFound &&
        (!moviesList || moviesList.length === 0) && (
          <div className="no-movies">
            <p>No movies to display. Try searching for your favorite movies!</p>
          </div>
        )}
    </div>
  );
}
