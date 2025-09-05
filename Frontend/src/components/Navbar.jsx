import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

// Custom hook semplice per leggere dati da localStorage
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
    // Se vuoi sincronizzare anche quando cambia localStorage da altre tab
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
    <nav className="navbar navbar-expand navbar-light bg-light mb-3">
      <div className="container">
        <Link to="/welcome" className="navbar-brand">
          PetBnb
        </Link>
        <Link to="/locations" className="nav-link">
          Locations
        </Link>

        {role === "USER" && (
          <Link to="/bookings" className="nav-link">
            Le mie Prenotazioni
          </Link>
        )}

        {role === "HOST" && (
          <>
            <Link to="/locations/add" className="nav-link">
              + Location
            </Link>
            <Link to="/host/bookings" className="nav-link">
              Prenotazioni Host
            </Link>
          </>
        )}
        <Link to="/users/me" className="nav-link">
          Profilo
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
