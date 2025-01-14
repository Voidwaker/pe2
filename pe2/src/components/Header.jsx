import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './../styles/header.css';

function Header() {
  const isLoggedIn = true; 
  const isManager = true; 

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {}
        <Link className="navbar-brand" to="/">
          Holihub
        </Link>

        {}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {}
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            {}
            <li className="nav-item">
              <Link className="nav-link" to="/venues">
                Venues
              </Link>
            </li>

            {}
            {isLoggedIn && (
              <>
                {}
                <li className="nav-item">
                  <Link className="nav-link" to="/bookings">
                    My Bookings
                  </Link>
                </li>

                {}
                {isManager && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/my-venues">
                      My Venues
                    </Link>
                  </li>
                )}

                {}
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>

                {}
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={() => console.log('Logout')} 
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

            {}
            {!isLoggedIn && (
              <>
                {}
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login / Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
