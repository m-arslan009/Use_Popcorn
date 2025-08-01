import MovieComponent from "./MovieComponent";

export default function History({ watchedHistory, dispatch }) {
  const validWatchedHistory = Array.isArray(watchedHistory)
    ? watchedHistory
    : [];

  const watchedMovies = validWatchedHistory.map((movie) => {
    return (
      <MovieComponent
        key={movie.imdbID || movie.id}
        movie={movie}
        isHistory={true}
        onClick={() => {
          dispatch({ type: "REMOVE_FROM_HISTORY", payload: movie });
        }}
      />
    );
  });

  const totalMovies = validWatchedHistory.length;
  const totalRuntime = validWatchedHistory.reduce((acc, movie) => {
    const runtime = movie.runtime || movie.Runtime || 120;
    return acc + (typeof runtime === "string" ? parseInt(runtime) : runtime);
  }, 0);

  const averageRating =
    totalMovies > 0
      ? (
          validWatchedHistory.reduce((acc, movie) => {
            const rating = movie.rating || movie.userRating || 0;
            return acc + rating;
          }, 0) / totalMovies
        ).toFixed(1)
      : 0;

  return (
    <div className="history-detail">
      <div className="history-header">
        <h2>Movies You Watched</h2>
        <div className="stats">
          <p>🗃️ {totalMovies} movies</p>
          <p>⏰ {totalRuntime} min</p>
          <p>⭐ {averageRating}</p>
        </div>
      </div>
      <div className="watched-movies-list">
        {totalMovies > 0 ? watchedMovies : <p>No movies watched yet.</p>}
      </div>
    </div>
  );
}
