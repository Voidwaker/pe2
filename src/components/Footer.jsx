import React from "react";
import "../styles/footer.css";

/**
 * Footer Component
 *
 * A stylish and minimal footer with animated hover effects.
 *
 * @component
 * @returns {JSX.Element} The rendered Footer component.
 */
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">© {new Date().getFullYear()} Holihub. All rights reserved.</p>
        <a href="mailto:support@holihub.com" className="footer-link">Contact Us</a>
      </div>
    </footer>
  );
};

export default Footer;
