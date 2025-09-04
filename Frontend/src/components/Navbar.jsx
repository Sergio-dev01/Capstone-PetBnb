// src/components/Navbar.jsx
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  // Nascondi navbar nelle pagine Welcome, Login, Register
  if (location.pathname === "/" || location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  return (
    <nav className="navbar navbar-expand navbar-light bg-light mb-3">
      <div className="container">
        <Link to="/" className="navbar-brand">
          PetBnb
        </Link>

        <Link to="/users/me" className="nav-link">
          Profilo
        </Link>
        <Link to="/locations" className="nav-link">
          Locations
        </Link>
        <Link to="/bookings" className="nav-link">
          Le mie Prenotazioni
        </Link>
        <Link to="/host/bookings" className="nav-link">
          Prenotazioni Host
        </Link>
        <Link to="/locations/add" className="nav-link">
          + Location
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
