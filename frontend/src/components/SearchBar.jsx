import React from "react";
import searchIcon from "../assets/icons/search.png";

const SearchBar = () => {
  return (
    <div className="searchbar">
      <img src={searchIcon} alt="Search" className="search-icon" />
      <input type="text" placeholder="Search..." className="search-input" />
    </div>
  );
};

export default SearchBar;
