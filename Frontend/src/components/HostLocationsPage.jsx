import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/HostLocationsPage.css";

function HostLocationsPage() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    fetch("http://localhost:3001/locations/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore durante il recupero delle location");
        return res.json();
      })
      .then((data) => {
        setLocations(data);
      })
      .catch((err) => setErrorMsg(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="container mt-4">Caricamento...</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Le mie Location</h2>

      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

      {locations.length === 0 ? (
        <div className="alert alert-info">Non hai ancora creato nessuna location.</div>
      ) : (
        <div className="location-grid">
          {locations.map((loc) => (
            <div key={loc.id} className="location-card">
              <img src="/images/placeholder.jpg" alt={loc.nome} className="location-image" />
              <div className="location-details">
                <h5>{loc.nome}</h5>
                <p className="text-muted">{loc.citta}</p>
                <p className="location-description">{loc.descrizione}</p>
                <p>
                  <strong>€{loc.prezzoPerNotte}</strong> / notte
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-4">
        <Link to="/locations/add" className="btn btn-success me-2">
          Aggiungi Nuova Location
        </Link>
        <Link to="/welcome" className="btn btn-secondary">
          Torna alla Home
        </Link>
      </div>
    </div>
  );
}

export default HostLocationsPage;
