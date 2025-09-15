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
      if (event.key === key || event.type === "userChanged") {
        try {
          const item = window.localStorage.getItem(key);
          setStoredValue(item ? JSON.parse(item) : null);
        } catch {
          setStoredValue(null);
        }
      }
    }

    window.addEventListener("storage", syncStorage);
    window.addEventListener("userChanged", syncStorage); // 👈 Aggiunto

    return () => {
      window.removeEventListener("storage", syncStorage);
      window.removeEventListener("userChanged", syncStorage);
    };
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
                Aggiungi Location
              </Link>
              <Link to="/host/bookings" className="navbar-link">
                Prenotazioni Ricevute
              </Link>
              <Link to="/host/locations" className="navbar-link">
                Le mie Location
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
