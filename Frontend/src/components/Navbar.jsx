import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../css/Navbar.css";

// Custom hook per leggere dati da localStorage
function useLocalStorage(key) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  });

  useEffect(() => {
    function syncStorage(event) {
      if (event.key === key) {
        try {
          setStoredValue(event.newValue ? JSON.parse(event.newValue) : null);
        } catch {
          setStoredValue(null);
        }
      }
    }
    window.addEventListener("storage", syncStorage);
    return () => window.removeEventListener("storage", syncStorage);
  }, [key]);

  return [storedValue, setStoredValue];
}

function Navbar() {
  const location = useLocation();
  const [user] = useLocalStorage("user");
  const role = user?.role || null;

  // Nascondi la navbar su Welcome, Login e Register
  if (["/", "/login", "/register"].includes(location.pathname)) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <Link to="/welcome" className="navbar-brand">
            PetBnb
          </Link>

          <Link to="/locations" className="navbar-link">
            Locations
          </Link>

          {role === "USER" && (
            <Link to="/bookings" className="navbar-link">
              Le mie Prenotazioni
            </Link>
          )}

          {role === "HOST" && (
            <>
              <Link to="/locations/add" className="navbar-link">
                + Location
              </Link>
              <Link to="/host/bookings" className="navbar-link">
                Prenotazioni Host
              </Link>
            </>
          )}

          {user && (
            <>
              <Link to="/users/me" className="navbar-link">
                Profilo
              </Link>
              <Link to="/logout" className="navbar-logout">
                Logout
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
