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
  // Define your initial state here
  movies: [],
  selectedMovie: null,
  searchQuery: "",
  isLoading: false,
  isError: null,
  isFound: false,
  isAdded: false,
  watchedHistory: JSON.parse(localStorage.getItem("watchedHistory")) || [],
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_MOVIES":
      return { ...state, movies: action.payload };
    case "SELECT_MOVIE":
      return { ...state, selectedMovie: action.payload };
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, isError: action.payload };
    case "SET_NOT_FOUND":
      return { ...state, isFound: action.payload };
    case "RETRY_FETCH":
      return {
        ...state,
        isError: false,
        isFound: false,
        isLoading: true,
      };
    case "SET_SELECTED_MOVIE":
      return { ...state, selectedMovie: action.payload };
    case "BACK_TO_HISTORY":
      return { ...state, selectedMovie: null };
    case "ADD_TO_WATCHED_HISTORY":
      return {
        ...state,
        selectedMovie: null,
        watchedHistory: [...state.watchedHistory, action.payload],
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function App() {
  const [
    { movies, selectedMovie, searchQuery, isLoading, isError, isFound },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        // Reset states
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
          console.log(data);
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

  useEffect(() => {});

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
      />
    </>
  );
}

export default App;
