import React, { useState } from "react";

const MoviesList = ({ movies, onHandleSelect }) => {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div>
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && (
        <ul className="list">
          {movies?.map((movie) => (
            <li
              key={movie.imdbID}
              onClick={() => onHandleSelect(movie.imdbID)}
              className=" cursor-pointer hover:bg-[var(--color-background-100)]"
            >
              <img src={movie.Poster} alt={`${movie.Title} poster`} />
              <h3>{movie.Title}</h3>
              <div>
                <p>
                  <span>🗓</span>
                  <span>{movie.Year}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MoviesList;
