import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/footer.css";

/**
 * Footer Component
 *
 * A responsive footer using Bootstrap.
 *
 * @component
 * @returns {JSX.Element} The rendered Footer component.
 */
const Footer = () => {
  return (
    <footer className="footer bg-dark text-light py-3 mt-auto shadow-lg">
      <div className="container text-center">
        <p className="mb-1">© {new Date().getFullYear()} Holihub. All rights reserved.</p>
        <a href="mailto:support@holihub.com" className="footer-link text-info">Contact Us</a>
      </div>
    </footer>
  );
};

export default Footer;
