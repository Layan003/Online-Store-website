import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/Navbar.css";

export default function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <section className="relative shadow-md flex justify-between items-center z-10">
      <div>LOGO</div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="nav-hamburger"
      >
        {isExpanded ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        )}
      </button>
      <ul
        className={
          isExpanded
            ? "nav-items expanded p-3 shadow-md"
            : "nav-items flex gap-8"
        }
      >
        <li className="py-3">
          <Link to="/">Home</Link>
        </li>
        <li className="py-3">
          <Link to="/">Products</Link>
        </li>
        <li className="py-3">
          <Link to="/">Login</Link>
        </li>
        <li className="py-3">
          <Link to="/">Sign Up</Link>
        </li>
        <li className="py-3 icon-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          <div className="bg-red-500 cart-count text-sm flex justify-center items-center p-2 font-bold text-white absolute t-0 r-0">
            3
          </div>
        </li>
      </ul>
    </section>
  );
}
