"use client";
import "./main.css";

import { useEffect, useState } from "react";
import Summary from "./summary";
import MoviesWatchList from "./moviesWatchList";
import Navbar from "./navbar";
import MoviesList from "./moviesList";
import Loading from "./loading";
import SelectedMovie from "./selectedMovie";

const KEY = "31403c88";

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

export default function Main() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isOpen2, setIsOpen2] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [userRating, setUserRating] = useState("");

  const handleSelectedMovie = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };

  const handleAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
  };

  const handleDeleteWatched = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError(false);

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok) throw new Error("Something went wrong");

          const data = await res.json();

          if (data.Response === "False") throw new Error("movie not found");

          setMovies(data.Search);

          setError("");
        } catch (err) {
          console.log(err.message);
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <>
      <Navbar movies={movies} query={query} setQuery={setQuery} />
      <main className="main">
        <div className="box">
          {isLoading && <Loading />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && (
            <MoviesList movies={movies} onHandleSelect={handleSelectedMovie} />
          )}
        </div>
        <div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen2((open) => !open)}
          >
            {isOpen2 ? "-" : "+"}
          </button>
          {isOpen2 && (
            <>
              {selectedId ? (
                <SelectedMovie
                  setSelectedId={setSelectedId}
                  selectedId={selectedId}
                  KEY={KEY}
                  setUserRating={setUserRating}
                  userRating={userRating}
                  watched={watched}
                  handleAddWatched={handleAddWatched}
                />
              ) : (
                <>
                  <Summary watched={watched} userRating={userRating} />
                  <MoviesWatchList
                    watched={watched}
                    handleDeleteWatched={handleDeleteWatched}
                  />
                </>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}

const ErrorMessage = ({ message }) => {
  return <p className="error">{message}</p>;
};
