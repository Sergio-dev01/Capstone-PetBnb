import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

function WelcomePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  if (!user) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h1>Errore</h1>
        <p>
          Utente non trovato. Torna al <Link to="/login">login</Link>.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #ffc0cb, #ffb347)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow background */}
      <div
        style={{
          position: "absolute",
          width: "35rem",
          height: "35rem",
          backgroundColor: "rgba(255,255,255,0.15)",
          borderRadius: "50%",
          filter: "blur(8rem)",
          top: "-15rem",
          left: "-15rem",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "35rem",
          height: "35rem",
          backgroundColor: "rgba(255,200,0,0.15)",
          borderRadius: "50%",
          filter: "blur(8rem)",
          bottom: "-15rem",
          right: "-15rem",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          position: "relative",
          maxWidth: "900px",
          width: "100%",
          backgroundColor: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(10px)",
          borderRadius: "2rem",
          padding: "3rem",
          boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "800",
            marginBottom: "0.5rem",
          }}
        >
          Benvenuto/a,{" "}
          <span
            style={{
              background: "linear-gradient(to right, #ff6b81, #ff9472)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            {user.username}!
          </span>
        </h1>

        <p style={{ fontSize: "1.1rem", color: "#555", marginBottom: "2rem" }}>
          Ruolo: <strong>{user.role}</strong>
        </p>

        <p style={{ fontSize: "1rem", marginBottom: "2rem" }}>
          <FaMapMarkerAlt style={{ color: "#ff6b81", marginRight: "0.5rem" }} />
          Scopri le nostre locations o gestisci le tue attività
        </p>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "3rem",
          }}
        >
          <Link
            to="/locations"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1.5rem",
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
            <FaMapMarkerAlt /> Esplora Locations
          </Link>

          {user.role === "USER" && (
            <Link
              to="/bookings"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.5rem",
                borderRadius: "1rem",
                fontWeight: "600",
                color: "#ff6b81",
                backgroundColor: "white",
                border: "2px solid #ff6b81",
                textDecoration: "none",
                transition: "all 0.3s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#ff6b81";
                e.currentTarget.style.color = "white";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "white";
                e.currentTarget.style.color = "#ff6b81";
              }}
            >
              <FaCalendarAlt /> Le mie Prenotazioni
            </Link>
          )}

          {user.role === "HOST" && (
            <>
              <Link
                to="/locations/add"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "1rem",
                  fontWeight: "600",
                  color: "white",
                  background: "linear-gradient(to right, #6bcf6b, #3cb371)",
                  textDecoration: "none",
                  boxShadow: "0 5px 15px rgba(60,179,113,0.4)",
                  transition: "all 0.3s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.filter = "brightness(1.1)")}
                onMouseOut={(e) => (e.currentTarget.style.filter = "brightness(1)")}
              >
                <FaUsers /> Aggiungi Location
              </Link>
              <Link
                to="/host/bookings"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "1rem",
                  fontWeight: "600",
                  color: "#3cb371",
                  backgroundColor: "white",
                  border: "2px solid #3cb371",
                  textDecoration: "none",
                  transition: "all 0.3s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#3cb371";
                  e.currentTarget.style.color = "white";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                  e.currentTarget.style.color = "#3cb371";
                }}
              >
                <FaCalendarAlt /> Prenotazioni Ricevute
              </Link>
            </>
          )}
        </div>

        {/* Carousel - funzionante senza warning */}
        <div>
          <h3
            style={{
              marginBottom: "1rem",
              fontWeight: "700",
              color: "#ff6b81",
            }}
          >
            Scopri PetBnB 🐾
          </h3>
          <div
            style={{
              position: "relative",
              borderRadius: "1.5rem",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            }}
          >
            <div className="carousel slide" id="welcomeCarousel">
              <div className="carousel-inner">
                {[
                  {
                    src: "https://plus.unsplash.com/premium_photo-1683133813802-7f3f128e87d1?q=80&w=1738",
                    title: "Viaggia con il tuo pet",
                    desc: "Le migliori locations pet-friendly in Italia",
                  },
                  {
                    src: "https://images.unsplash.com/photo-1638890177649-073e0e82ee5c?q=80&w=1746",
                    title: "Come a casa",
                    desc: "Comfort e sicurezza per te e il tuo animale",
                  },
                  {
                    src: "https://images.unsplash.com/photo-1709790533896-4399cb90ba3d?q=80&w=1740",
                    title: "Diventa host!",
                    desc: "Condividi la tua casa con altri amanti degli animali",
                  },
                ].map((item, i) => (
                  <div key={i} className={`carousel-item ${i === 0 ? "active" : ""}`}>
                    <img src={item.src} className="d-block w-100" alt={item.title} />
                    <div
                      className="carousel-caption d-none d-md-block"
                      style={{
                        backgroundColor: "rgba(0,0,0,0.35)",
                        borderRadius: "1rem",
                        padding: "0.5rem 1rem",
                      }}
                    >
                      <h5>{item.title}</h5>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default WelcomePage;
