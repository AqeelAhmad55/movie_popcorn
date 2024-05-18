"use client";
import "./main.css";

import { useEffect, useState } from "react";
import Summary from "./summary";
import MoviesWatchList from "./moviesWatchList";
import Navbar from "./navbar";
import MoviesList from "./moviesList";
import Loading from "./loading";
import SelectedMovie from "./selectedMovie";
import { useLocalStorageState } from "@/customHooks/useLocalStorageState";
import { useFetch } from "@/customHooks/useFetch";

export default function Main() {
  const [isOpen2, setIsOpen2] = useState(true);
  const [query, setQuery] = useState("");
  const { movies, isLoading, error, KEY } = useFetch(query);
  const [selectedId, setSelectedId] = useState(null);
  const [userRating, setUserRating] = useState("");
  const [watched, setWatched] = useLocalStorageState([], "watched");

  const handleSelectedMovie = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };

  const handleAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
  };

  const handleDeleteWatched = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

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
