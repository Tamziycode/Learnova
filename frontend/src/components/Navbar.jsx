import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import cartIcon from "../assets/icons/cart.png";

const Navbar = () => {
  return (
    <>
      <header>
        <nav className="navbar">
          <ul
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              listStyleType: "none",
            }}
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Courses">Courses</Link>
            </li>
            <li>
              <Link to="/Signup">Signup</Link>
            </li>
            <li>
              <Link to="/Signin">Signin</Link>
            </li>
            <li>
              <Link to="/Cart">
                <img className="carticon" src={cartIcon} alt="CartIcon" />
              </Link>
            </li>
            <li>
              <Link to="/Dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/About">About</Link>
            </li>
            <SearchBar />
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
