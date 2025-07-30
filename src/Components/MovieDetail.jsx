export default function MovieDetail({
  selectedMovie,
  yourRating = 0,
  dispatch,
}) {
  return (
    <div className="movie-detail">
      <button
        className="back-btn"
        onClick={() => dispatch({ type: "BACK_TO_HISTORY" })}
      >{`<-`}</button>
      <img
        src={
          selectedMovie.Poster !== "N/A" &&
          selectedMovie.Poster.startsWith("http")
            ? selectedMovie.Poster
            : "https://static.thenounproject.com/png/5018320-200.png"
        }
        alt={selectedMovie.Title}
      />
      <div className="selected_movie-info">
        <h2>{selectedMovie.Title}</h2>
        <p>Release In: {selectedMovie.Year.slice(0, 4)}</p>
        <p>Type: {selectedMovie.Type}</p>
        <p>Your Rating: {yourRating || 0}</p>
      </div>
    </div>
  );
}
