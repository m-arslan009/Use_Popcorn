export default function MovieComponent({ movie, onClick, isHistory = false }) {
  const isLPath = movie.Poster && movie.Poster.startsWith("http");
  return (
    <div className="movie-component" onClick={!isHistory && onClick}>
      <img
        src={
          isLPath
            ? movie.Poster
            : "https://static.thenounproject.com/png/5018320-200.png"
        }
        alt={movie.Title}
      />
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <p>🕒 {movie.Year}</p>
      </div>
      {isHistory && (
        <button className="remove-btn" onClick={isHistory && onClick}>
          X
        </button>
      )}
    </div>
  );
}
