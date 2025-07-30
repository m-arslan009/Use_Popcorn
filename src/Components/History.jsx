import MovieComponent from "./MovieComponent";

export default function MovieDetail({ watchedHistory }) {
  const watchedMovies =
    watchedHistory?.map((m) => {
      return <MovieComponent key={m.id} movie={m} />;
    }) || [];
  return (
    <div className="history-detail">
      <div className="history-header">
        <h2>History</h2>
        <div>
          <p>🗃️: {watchedMovies.length}</p>
          <p>
            ⏰: {watchedMovies.reduce((acc, movie) => acc + movie.runtime, 0)}{" "}
          </p>
          <p>
            ⭐:{" "}
            {watchedMovies.length > 0
              ? (
                  watchedMovies.reduce((acc, movie) => acc + movie.rating, 0) /
                  watchedMovies.length
                ).toFixed(1)
              : 0}
          </p>
        </div>
      </div>
      {watchedMovies.length > 0 ? watchedMovies : <p>No movies watched yet.</p>}
    </div>
  );
}
