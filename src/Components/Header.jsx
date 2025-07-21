export default function Header({ totalResults = 0 }) {
  return (
    <header>
      <h2>🍿USEPOPCORN</h2>
      <input type="text" placeholder="Search for movies..." />
      <p>Total {totalResults} Result Found</p>
    </header>
  );
}
