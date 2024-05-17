import React, { useState } from "react";

const Navbar = ({ movies, query, setQuery }) => {
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