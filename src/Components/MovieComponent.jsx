export default function MovieComponent({ movie, onClick }) {
  const isLPath = movie.Poster && movie.Poster.startsWith("http");
  console.log(isLPath);
  return (
    <div className="movie-component" onClick={onClick}>
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
    </div>
  );
}
