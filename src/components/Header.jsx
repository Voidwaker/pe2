import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './../hooks/useAuth';
import '../styles/header.css';

/**
 * Header component displaying the navigation bar.
 * It adjusts based on the user's authentication status.
 *
 * @component
 * @returns {JSX.Element} The navigation bar.
 */
function Header() {
  const { authData, logout } = useAuth();
  const navigate = useNavigate();

  /**
   * Handles user logout and redirects to the homepage.
   */
  const handleLogout = () => {
    logout();
    navigate('/'); // Redirects to HomePage after logging out
  };

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

            {authData && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/my-venues">
                    My Venues
                  </Link>
                </li>

                {authData.profile?.venueManager && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/create-venue">
                      Create Venue
                    </Link>
                  </li>
                )}

                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}

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
