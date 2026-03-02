import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaEuroSign } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

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
        if (!res.ok) throw new Error("Errore nella risposta dal server");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setLocations(data);
        else setLocations([]);
      })
      .catch(() => setLocations([]));
  }, []);

  const filteredLocations = locations.filter((loc) => {
    const matchesCity = loc.citta.toLowerCase().includes(cityFilter.toLowerCase());
    const matchesPrice = priceFilter === "" || loc.prezzoPerNotte <= parseFloat(priceFilter);
    return matchesCity && matchesPrice;
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "2rem",
        background: "linear-gradient(to bottom right, #ffe4e1, #fff7e6)",
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          textAlign: "center",
          fontSize: "2.2rem",
          marginBottom: "2rem",
          fontWeight: "700",
          background: "linear-gradient(to right, #ff6b81, #ff9472)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        Locations disponibili
      </motion.h2>

      {/* Filtri */}
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Filtra per città"
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          style={{
            padding: "0.6rem 1rem",
            borderRadius: "1rem",
            border: "1px solid #ccc",
            minWidth: "200px",
          }}
        />
        <input
          type="number"
          placeholder="Prezzo massimo"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          style={{
            padding: "0.6rem 1rem",
            borderRadius: "1rem",
            border: "1px solid #ccc",
            minWidth: "150px",
          }}
        />
      </div>

      {/* Griglia locations */}
      {filteredLocations.length === 0 ? (
        <p style={{ textAlign: "center", color: "#555", fontSize: "1.1rem" }}>Nessuna location trovata</p>
      ) : (
        <div className="locations-grid">
          {filteredLocations.map((loc) => (
            <motion.div
              key={loc.id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              style={{
                backgroundColor: "rgba(255,255,255,0.9)",
                borderRadius: "1.5rem",
                overflow: "hidden",
                boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                cursor: "pointer",
              }}
            >
              <Link to={`/locations/${loc.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div style={{ height: "180px", overflow: "hidden" }}>
                  <img src="../images/placeholder.jpg" alt={loc.nome} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: "1rem" }}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "0.5rem" }}>{loc.nome}</h3>
                  <p style={{ display: "flex", alignItems: "center", color: "#ff6b81", marginBottom: "0.5rem" }}>
                    <FaMapMarkerAlt style={{ marginRight: "0.5rem" }} /> {loc.citta}
                  </p>
                  <p style={{ color: "#555", fontSize: "0.95rem", marginBottom: "0.5rem" }}>{loc.descrizione}</p>
                  <p style={{ display: "flex", alignItems: "center", color: "#28a745", fontWeight: "600" }}>
                    <FaEuroSign style={{ marginRight: "0.5rem" }} /> {loc.prezzoPerNotte} / notte
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      {/* Pulsante torna home */}
      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <Link
          to="/welcome"
          style={{
            padding: "0.7rem 1.5rem",
            borderRadius: "1rem",
            fontWeight: "600",
            color: "white",
            background: "linear-gradient(to right, #ff6b81, #ff9472)",
            textDecoration: "none",
            boxShadow: "0 5px 15px rgba(255,107,129,0.4)",
            transition: "all 0.3s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.filter = "brightness(1.1)")}
          onMouseOut={(e) => (e.currentTarget.style.filter = "brightness(1)")}
        >
          Torna alla Home
        </Link>
      </div>

      {/* Stili responsive */}
      <style>
        {`
          .locations-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 2rem;
          }
          @media (max-width: 1024px) {
            .locations-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (max-width: 640px) {
            .locations-grid {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>
    </div>
  );
}

export default LocationPage;
