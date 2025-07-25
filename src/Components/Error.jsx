export default function Error({ message, onRetry }) {
  const defaultMessage = "Something went wrong. Please try again later.";

  return (
    <div className="error">
      <p>{message || defaultMessage}</p>
      {onRetry && (
        <button onClick={onRetry} className="retry-button">
          Try Again
        </button>
      )}
    </div>
  );
}
