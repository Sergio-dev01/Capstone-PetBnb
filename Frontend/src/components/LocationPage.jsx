import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaEuroSign, FaPaw } from "react-icons/fa";
import "../css/LocationPage.css";

function LocationPage() {
  const [locations, setLocations] = useState([]);
  const [cityFilter, setCityFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    fetch("http://localhost:3001/locations", {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject("Errore server")))
      .then((data) => (Array.isArray(data) ? setLocations(data) : setLocations([])))
      .catch((err) => {
        console.error(err);
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

      {/* FILTRI MODERNI */}
      <div className="filters">
        <div className="filter-group">
          <FaMapMarkerAlt className="filter-icon" />
          <input type="text" placeholder="Filtra per città" value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} className="filter-input" />
        </div>
        <div className="filter-group">
          <FaEuroSign className="filter-icon" />
          <input type="number" placeholder="Prezzo massimo" value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} className="filter-input" />
        </div>
      </div>

      {/* GRID CARDS */}
      {filteredLocations.length === 0 ? (
        <p className="no-locations">Nessuna location trovata</p>
      ) : (
        <div className="locations-grid">
          {filteredLocations.map((loc) => (
            <div key={loc.id} className="location-card">
              <Link to={`/locations/${loc.id}`} className="location-link">
                <div className="location-image">
                  <img src="/images/placeholder.jpg" alt={loc.nome} />
                  <span className="pet-badge">
                    <FaPaw /> Pet-friendly
                  </span>
                </div>
                <div className="location-content">
                  <h3>{loc.nome}</h3>
                  <p className="location-city">
                    <FaMapMarkerAlt className="icon" /> {loc.citta}
                  </p>
                  <p className="location-desc">{loc.descrizione}</p>
                  <p className="location-price">
                    <FaEuroSign className="icon" /> {loc.prezzoPerNotte} / notte
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* BACK BUTTON */}
      <div className="back-home">
        <Link to="/welcome" className="btn-back">
          Torna alla Home
        </Link>
      </div>
    </div>
  );
}

export default LocationPage;
