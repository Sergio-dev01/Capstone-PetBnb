// src/components/Footer.js
import React from "react";
import { Link } from "react-router-dom";
import "../css/MyFooter.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaGithub, FaPaw } from "react-icons/fa";

function MyFooter() {
  return (
    <footer className="footer bg-dark text-light py-5 mt-auto">
      <div className="container">
        <div className="row gy-4">
          <div className="col-md-4 text-center">
            <div className="d-flex align-items-center mb-3 justify-content-center">
              <span>
                <img src="./public/Petbnb.png" alt="" />
              </span>
              <span className="footer-brand">PetBnB</span>
            </div>
            <p className="footer-description">Viaggia senza pensieri insieme al tuo fedele amico a quattro zampe. 🐾</p>
          </div>

          <div className="col-md-4 text-center ">
            <h6 className="footer-title">Link Utili</h6>
            <ul className="list-unstyled footer-links">
              <li>
                <Link to="/about" className="footer-link">
                  Chi siamo
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">
                  Contattaci
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="footer-link">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/faq" className="footer-link">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-4 text-center ">
            <h6 className="footer-title">Seguici</h6>
            <div className="d-flex gap-3 justify-content-center">
              <a href="https://facebook.com" className="footer-icon" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://instagram.com" className="footer-icon" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://twitter.com" className="footer-icon" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="https://github.com" className="footer-icon" aria-label="GitHub">
                <FaGithub />
              </a>
            </div>
          </div>
        </div>

        <hr className="footer-divider mt-5 mb-3" />
        <div className="text-center small text-muted">© {new Date().getFullYear()} PetBnB. Tutti i diritti riservati.</div>
      </div>
    </footer>
  );
}

export default MyFooter;
