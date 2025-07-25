export default function MovieComponent({ movie }) {
  return (
    <div className="movie-component">
      <img src={movie.Poster} alt={movie.Title} />
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <p>🕒 {movie.Year}</p>
      </div>
    </div>
  );
}
