import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function LocationPage() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    fetch("http://localhost:3001/locations", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Errore nella risposta dal server");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Dati ricevuti:", data);
        if (Array.isArray(data)) {
          setLocations(data);
        } else {
          console.error("Risposta API non è un array:", data);
          setLocations([]);
        }
      })
      .catch((error) => {
        console.error("Errore fetch:", error);
        setLocations([]);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2>Locations</h2>
      <div className="text-center">
        <ul className="list-group">
          {locations.length === 0 ? (
            <li className="list-group-item">Nessuna location trovata</li>
          ) : (
            locations.map((loc) => (
              <li key={loc.id} className="list-group-item">
                <Link to={`/locations/${loc.id}`} className="text-decoration-none">
                  <h5>
                    {loc.nome} - {loc.citta}
                  </h5>
                  <p>
                    {loc.descrizione} — €{loc.prezzoPerNotte}
                  </p>
                </Link>
              </li>
            ))
          )}
        </ul>
        <Link to="/welcome" className="btn btn-secondary mt-3">
          Torna alla Home
        </Link>
      </div>
    </div>
  );
}
