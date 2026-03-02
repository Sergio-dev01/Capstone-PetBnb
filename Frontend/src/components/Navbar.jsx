import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

function useLocalStorage(key) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
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
    window.addEventListener("userChanged", syncStorage);
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
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        backdropFilter: "blur(15px)",
        backgroundColor: "rgba(255,255,255,0.7)",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        padding: "0.8rem 2rem",
        borderRadius: "1.5rem",
        margin: "1rem",
        display: "flex",
        justifyContent: "center",
        position: "sticky",
        top: "0",
        zIndex: 1000,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
        <Link
          to="/welcome"
          style={{
            fontWeight: "700",
            fontSize: "1.5rem",
            color: "#ff6b81",
            textDecoration: "none",
          }}
        >
          PetBnb
        </Link>

        <Link
          to="/locations"
          style={{
            textDecoration: "none",
            color: "#555",
            fontWeight: "500",
            padding: "0.4rem 0.8rem",
            borderRadius: "0.8rem",
            transition: "all 0.3s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "rgba(255,107,129,0.1)")}
          onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
        >
          Locations
        </Link>

        {role === "USER" && (
          <Link
            to="/bookings"
            style={{
              textDecoration: "none",
              color: "#555",
              fontWeight: "500",
              padding: "0.4rem 0.8rem",
              borderRadius: "0.8rem",
              transition: "all 0.3s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "rgba(255,107,129,0.1)")}
            onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
          >
            Le mie Prenotazioni
          </Link>
        )}

        {role === "HOST" && (
          <>
            <Link
              to="/locations/add"
              style={{
                textDecoration: "none",
                color: "#28a745",
                fontWeight: "500",
                padding: "0.4rem 0.8rem",
                borderRadius: "0.8rem",
                transition: "all 0.3s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = "rgba(40,167,69,0.1)")}
              onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
            >
              Aggiungi Location
            </Link>
            <Link
              to="/host/bookings"
              style={{
                textDecoration: "none",
                color: "#28a745",
                fontWeight: "500",
                padding: "0.4rem 0.8rem",
                borderRadius: "0.8rem",
                transition: "all 0.3s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = "rgba(40,167,69,0.1)")}
              onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
            >
              Prenotazioni Ricevute
            </Link>
            <Link
              to="/host/locations"
              style={{
                textDecoration: "none",
                color: "#28a745",
                fontWeight: "500",
                padding: "0.4rem 0.8rem",
                borderRadius: "0.8rem",
                transition: "all 0.3s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = "rgba(40,167,69,0.1)")}
              onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
            >
              Le mie Location
            </Link>
          </>
        )}

        {user && (
          <>
            <Link
              to="/users/me"
              style={{
                textDecoration: "none",
                color: "#555",
                fontWeight: "500",
                padding: "0.4rem 0.8rem",
                borderRadius: "0.8rem",
                transition: "all 0.3s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = "rgba(255,107,129,0.1)")}
              onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
            >
              Profilo
            </Link>
            <Link
              to="/logout"
              style={{
                textDecoration: "none",
                color: "white",
                fontWeight: "500",
                padding: "0.4rem 0.8rem",
                borderRadius: "0.8rem",
                background: "linear-gradient(to right, #ff6b81, #ff9472)",
                transition: "all 0.3s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.filter = "brightness(1.1)")}
              onMouseOut={(e) => (e.currentTarget.style.filter = "brightness(1)")}
            >
              Logout
            </Link>
          </>
        )}
      </div>
    </motion.nav>
  );
}

export default Navbar;
