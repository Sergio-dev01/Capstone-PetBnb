import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function WelcomePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <div className="container mt-5 text-center">
        <h1>Errore</h1>
        <p>
          Utente non trovato. Torna al <Link to="/login">login</Link>.
        </p>
      </div>
    );
  }

  return (
    <div className="container mt-5 text-center">
      <h1>Benvenuto/a, {user.username}!</h1>
      <p className="lead mt-3">
        Ruolo: <strong>{user.role}</strong>
      </p>
      <p>Scopri le nostre locations o gestisci le tue attività.</p>

      <div className="mt-4">
        <Link to="/locations" className="btn btn-primary btn-lg me-2">
          Esplora Locations
        </Link>

        {user.role === "USER" && (
          <Link to="/bookings" className="btn btn-outline-primary btn-lg">
            Le mie Prenotazioni
          </Link>
        )}

        {user.role === "HOST" && (
          <>
            <Link to="/locations/add" className="btn btn-success btn-lg me-2">
              Aggiungi Location
            </Link>
            <Link to="/host/bookings" className="btn btn-outline-success btn-lg">
              Prenotazioni Ricevute
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default WelcomePage;
