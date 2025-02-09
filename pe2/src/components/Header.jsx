import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './../hooks/useAuth';  // Vi antar at du har en custom hook for auth

function Header() {
  const { authData, logout } = useAuth(); // Får authData og logout-funksjonen fra custom hooken

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Holihub</Link>

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

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/venues">Venues</Link>
            </li>

            {/* Vist kun hvis bruker er logget inn */}
            {authData && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/bookings">
                    My Bookings
                  </Link>
                </li>

                {/* Vist kun for venue manager */}
                {authData.profile?.venueManager && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/create-venue">
                      Create Venue
                    </Link>
                  </li>
                )}

                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={logout}>
                    Logout
                  </button>
                </li>
              </>
            )}

            {/* Vist kun hvis bruker ikke er logget inn */}
            {!authData && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
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
