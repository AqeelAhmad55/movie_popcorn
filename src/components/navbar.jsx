import { useKey } from "@/customHooks/useKey";
import React, { useEffect, useRef } from "react";

const Navbar = ({ movies, query, setQuery }) => {
  const inputEl = useRef(null);

  useKey("enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  useEffect(
    function () {
      function callback(e) {
        if (document.activeElement === inputEl.current) return;

        if (e.code === "Enter") {
          inputEl.current.focus();
          setQuery("");
        }
      }
      document.addEventListener("keydown", callback);
    },
    [setQuery]
  );
  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>Movie & Popcorn</h1>
      </div>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputEl}
      />
      {query && (
        <p className="num-results">
          Found <strong>{movies.length}</strong> results
        </p>
      )}
    </nav>
  );
};

export default Navbar;
