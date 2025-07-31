import { useState } from "react";
import Rating from "./Rating";

export default function MovieDetail({ selectedMovie, dispatch }) {
  const [rating, setRating] = useState(0);
  const [movie, setMovie] = useState(selectedMovie || {});

  function handleRatingChange(newRating) {
    setRating(newRating);
  }

  function handleAddMovie() {
    setMovie((prev) => ({ ...prev, rating: rating }));
    localStorage.setItem(
      "watchedHistory",
      JSON.stringify([
        ...JSON.parse(localStorage.getItem("watchedHistory") || []),
        movie,
      ])
    );
    dispatch({ type: "ADD_TO_WATCHED_HISTORY", payload: movie });
  }

  return (
    <>
      <div className="movie-detail">
        <button
          className="back-btn"
          onClick={() => dispatch({ type: "BACK_TO_HISTORY" })}
        >{`⬅`}</button>
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
          <p>Your Rating: {rating || 0}</p>
        </div>
      </div>
      <div className="rating-container">
        <Rating rating={rating} onMovieRating={handleRatingChange} />
        {rating ? (
          <button className="add-btn" onClick={handleAddMovie}>
            Add to Watched History
          </button>
        ) : null}
      </div>
    </>
  );
}
