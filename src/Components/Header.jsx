export default function Header({
  dispatch,
  resultFound = 0,
  isLoading,
  isError,
  isFound,
  searchQuery,
}) {
  const getResultText = () => {
    if (isLoading) {
      return "Searching...";
    }

    if (isError) {
      return "Error occurred";
    }

    if (isFound) {
      return "No results found";
    }

    if (resultFound === 0) {
      return searchQuery ? "No movies found" : "Showing random movies";
    }

    if (resultFound === 1) {
      return "1 movie found";
    }

    return `${resultFound} movies found`;
  };

  return (
    <header>
      <h2>🍿USEPOPCORN</h2>
      <input
        type="text"
        placeholder="Search for movies..."
        onChange={(e) =>
          dispatch({ type: "SET_SEARCH_QUERY", payload: e.target.value })
        }
      />
      <p>{getResultText()}</p>
    </header>
  );
}
