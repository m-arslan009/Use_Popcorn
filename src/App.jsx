import { useEffect, useReducer } from "react";
import "./App.css";
import Header from "./Components/Header";
import Main from "./Components/Main";

const KEY = import.meta.env.VITE_OMDB_API_KEY;

const randomMovies = [
  "Batman",
  "Avatar",
  "Inception",
  "The Matrix",
  "Interstellar",
  "The Godfather",
  "Pulp Fiction",
  "The Dark Knight",
  "Forrest Gump",
  "Fight Club",
];

const initialState = {
  movies: [],
  selectedMovie: null,
  searchQuery: "",
  isLoading: false,
  isError: null,
  isFound: false,
  isAdded: false,
  watchedHistory: (() => {
    try {
      const stored = localStorage.getItem("watchedHistory");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error parsing watchedHistory from localStorage:", error);
      return [];
    }
  })(),
};

function reducer(state, action) {
  // Ensure watchedHistory is always an array in the state
  const safeState = {
    ...state,
    watchedHistory: Array.isArray(state.watchedHistory)
      ? state.watchedHistory
      : [],
  };

  switch (action.type) {
    case "SET_MOVIES":
      return { ...safeState, movies: action.payload };
    case "SELECT_MOVIE":
      return { ...safeState, selectedMovie: action.payload };
    case "SET_SEARCH_QUERY":
      return { ...safeState, searchQuery: action.payload };
    case "SET_LOADING":
      return { ...safeState, isLoading: action.payload };
    case "SET_ERROR":
      return { ...safeState, isError: action.payload };
    case "SET_NOT_FOUND":
      return { ...safeState, isFound: action.payload };
    case "RETRY_FETCH":
      return {
        ...safeState,
        isError: false,
        isFound: false,
        isLoading: true,
      };
    case "SET_SELECTED_MOVIE":
      return { ...safeState, selectedMovie: action.payload };
    case "BACK_TO_HISTORY":
      return { ...safeState, selectedMovie: null };
    case "ADD_TO_WATCHED_HISTORY": {
      // Ensure watchedHistory is always an array
      const currentHistory = Array.isArray(safeState.watchedHistory)
        ? safeState.watchedHistory
        : [];

      // Simply add the new movie without checking for duplicates
      const newWatchedHistory = [...currentHistory, action.payload];

      // Update localStorage
      try {
        localStorage.setItem(
          "watchedHistory",
          JSON.stringify(newWatchedHistory)
        );
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }

      return {
        ...safeState,
        watchedHistory: newWatchedHistory,
        selectedMovie: null,
      };
    }

    case "REMOVE_FROM_HISTORY": {
      // Ensure watchedHistory is always an array
      const currentHistory = Array.isArray(safeState.watchedHistory)
        ? safeState.watchedHistory
        : [];
      // Filter out the movie to be removed
      const newWatchedHistory = currentHistory.filter(
        (movie) =>
          movie.imdbID !== action.payload.imdbID &&
          movie.id !== action.payload.id
      );

      // Update localStorage
      try {
        localStorage.setItem(
          "watchedHistory",
          JSON.stringify(newWatchedHistory)
        );
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
      return {
        ...safeState,
        watchedHistory: newWatchedHistory,
      };
    }

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function App() {
  const [
    {
      movies,
      selectedMovie,
      searchQuery,
      isLoading,
      isError,
      isFound,
      watchedHistory,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        dispatch({ type: "SET_ERROR", payload: false });
        dispatch({ type: "SET_NOT_FOUND", payload: false });

        const searchTerm =
          searchQuery?.trim() ||
          randomMovies[Math.floor(Math.random() * randomMovies.length)];

        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${searchTerm}`,
          {
            signal: controller.signal,
          }
        );

        if (!res.ok) {
          throw new Error(`HTTP Error: ${res.status}`);
        }

        const data = await res.json();

        if (data.Response === "False") {
          if (data.Error === "Movie not found!") {
            dispatch({ type: "SET_NOT_FOUND", payload: true });
            dispatch({ type: "SET_MOVIES", payload: [] });
          } else {
            dispatch({ type: "SET_ERROR", payload: true });
          }
        } else {
          dispatch({ type: "SET_MOVIES", payload: data.Search });
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Fetch error:", error);
          dispatch({ type: "SET_ERROR", payload: true });
        }
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    }
    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [searchQuery]);

  return (
    <>
      <Header
        dispatch={dispatch}
        resultFound={movies.length}
        isLoading={isLoading}
        isError={isError}
        isFound={isFound}
        searchQuery={searchQuery}
      />
      <Main
        dispatch={dispatch}
        movies={movies}
        selectedMovie={selectedMovie}
        isLoading={isLoading}
        isError={isError}
        isFound={isFound}
        watchedHistory={watchedHistory}
      />
    </>
  );
}

export default App;
