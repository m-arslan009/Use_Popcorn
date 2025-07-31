import { useState } from "react";

const ratingStars = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
};

export default function Star({
  maxSize = 10,
  size = "24",
  color = "yellow",
  message = [],
  rating,
  onMovieRating,
}) {
  const [tempRating, setTempRating] = useState(0);

  function handleRating(index) {
    onMovieRating(index);
  }
  return (
    <div style={ratingStars} className="rating-container">
      <div>
        {Array.from({ length: maxSize }, (_, index) => (
          <Stars
            key={index}
            onRating={() => handleRating(index + 1)}
            onMouseOver={() => setTempRating(index + 1)}
            onMouseLeave={() => setTempRating(0)}
            fill={tempRating ? tempRating >= index + 1 : rating >= index + 1}
            size={size}
            color={color}
          />
        ))}
      </div>

      <h2
        style={{
          margin: 0,
          padding: 0,
          marginLeft: "20px",
        }}
      >
        {message.length === maxSize
          ? message[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </h2>
    </div>
  );
}

function Stars({
  style,
  onRating,
  fill,
  onMouseOver,
  onMouseLeave,
  size,
  color,
}) {
  return (
    <span
      role="button"
      onClick={onRating}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseLeave}
      style={{ ...style, cursor: "pointer" }}
    >
      {fill ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={color}
          viewBox="0 0 24 24"
          width={size}
          height={size}
        >
          <path d="M12 .587l3.668 7.431L24 9.748l-6 5.851 1.417 8.267L12 18.896l-7.417 4.97L6 15.599 0 9.748l8.332-1.73z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke={color}
          strokeWidth="2"
          viewBox="0 0 24 24"
          width={size}
          height={size}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      )}
    </span>
  );
}
