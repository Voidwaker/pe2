import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../styles/header.css';

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid"> {}
    <a className="navbar-brand" href="/">Holihub</a>
    <button 
      className="navbar-toggler" 
      type="button" 
      data-bs-toggle="collapse" 
      data-bs-target="#navbarNav" 
      aria-controls="navbarNav" 
      aria-expanded="false" 
      aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="/venues">Venues</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/login">Login / Register</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</header>
  );
}

export default Header;
