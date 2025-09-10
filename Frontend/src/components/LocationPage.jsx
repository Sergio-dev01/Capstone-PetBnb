import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/LocationPage.css";
import { FaMapMarkerAlt, FaEuroSign } from "react-icons/fa";

function LocationPage() {
  const [locations, setLocations] = useState([]);
  const [cityFilter, setCityFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

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

  const filteredLocations = locations.filter((loc) => {
    const matchesCity = loc.citta.toLowerCase().includes(cityFilter.toLowerCase());
    const matchesPrice = priceFilter === "" || loc.prezzoPerNotte <= parseFloat(priceFilter);
    return matchesCity && matchesPrice;
  });

  return (
    <div className="locations-page">
      <h2 className="locations-title">Locations disponibili</h2>

      <div className="filters">
        <input type="text" placeholder="Filtra per città" value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} className="filter-input" />

        <input type="number" placeholder="Prezzo massimo" value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} className="filter-input" />
      </div>

      {filteredLocations.length === 0 ? (
        <p className="no-locations">Nessuna location trovata</p>
      ) : (
        <div className="locations-grid">
          {filteredLocations.map((loc) => (
            <div key={loc.id} className="location-card">
              <Link to={`/locations/${loc.id}`} className="location-link">
                <div className="location-image">
                  <img src="../images/placeholder.jpg" alt={loc.nome} />
                </div>
                <div className="location-content">
                  <h3>{loc.nome}</h3>
                  <p className="location-city">
                    <FaMapMarkerAlt style={{ marginRight: "6px", color: "#ff6f61" }} />
                    {loc.citta}
                  </p>
                  <p className="location-desc">{loc.descrizione}</p>
                  <p className="location-price">
                    <FaEuroSign style={{ marginRight: "6px", color: "#28a745" }} />
                    {loc.prezzoPerNotte} / notte
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      <div className="back-home">
        <Link to="/welcome" className="btn-back">
          Torna alla Home
        </Link>
      </div>
    </div>
  );
}

export default LocationPage;
