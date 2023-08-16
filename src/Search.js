/* eslint-disable jsx-a11y/aria-role */
import React from "react";

const Search = ({ search, setSearch }) => {
  return (
    <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="searchForm">Search</label>
      <input
        type="text"
        id="Search"
        role="Searchbox"
        placeholder="Search Item"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

export default Search;
