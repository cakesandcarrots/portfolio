// Navbar.jsx

import React from "react";
import { Link } from "react-router-dom";
import "../styling/Navbar.css";

function Navbar() {
  return (
    <>
      <div id="nav">
        <Link to="/">
          <svg
            id="logo-38"
            width="78"
            height="32"
            viewBox="0 0 78 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M55.5 0H77.5L58.5 32H36.5L55.5 0Z"
              className="ccustom"
              fill="#FF7A00"
            ></path>
            <path
              d="M35.5 0H51.5L32.5 32H16.5L35.5 0Z"
              className="ccompli1"
              fill="#FF9736"
            ></path>
            <path
              d="M19.5 0H31.5L12.5 32H0.5L19.5 0Z"
              className="ccompli2"
              fill="#FFBC7D"
            ></path>
          </svg>
        </Link>

        <div>
          <ul className="navitemscontainer">
            <li className="navitem">
              <Link className="anchor" to="/">Home</Link>
            </li>
            <li className="navitem">
              <Link className="anchor" to="/about">About</Link>
            </li>
            <li className="navitem">
              <Link className="anchor" to="/blogs">Blogs</Link>
            </li>
            <li className="navitem">
              <Link className="anchor" to="/contact">Contact Me</Link>
            </li>
            <li className="navitem">
              <Link className="anchor" to="/socials">Socials</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
