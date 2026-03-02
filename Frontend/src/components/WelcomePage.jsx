import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers } from "react-icons/fa";
import "../css/WelcomePage.css";

function WelcomePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-3xl font-bold mb-4">Utente non trovato</h1>
          <Link to="/login" className="text-indigo-600 underline">
            Torna al login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="welcome-page">
      {/* HERO */}
      <section className="hero-section text-center">
        <div className="hero-overlay">
          <h1 className="hero-title">
            Benvenuto, <span>{user.username}</span> 🐾
          </h1>
          <p className="hero-role">
            Registrato come <strong>{user.role}</strong>
          </p>
          <p className="hero-subtitle">Trova o gestisci locations pet-friendly in tutta Italia.</p>
        </div>
      </section>

      {/* ACTION CARDS */}
      <section className="actions-section container text-center">
        <div className="actions-grid">
          <Link to="/locations" className="action-card primary">
            <FaMapMarkerAlt className="action-icon" />
            <h3>Esplora Locations</h3>
            <p>Scopri i migliori luoghi pet-friendly per te e il tuo amico.</p>
          </Link>

          {user.role === "USER" && (
            <Link to="/bookings" className="action-card secondary">
              <FaCalendarAlt className="action-icon" />
              <h3>Le mie Prenotazioni</h3>
              <p>Gestisci e controlla i tuoi soggiorni in modo semplice.</p>
            </Link>
          )}

          {user.role === "HOST" && (
            <>
              <Link to="/locations/add" className="action-card success">
                <FaUsers className="action-icon" />
                <h3>Aggiungi Location</h3>
                <p>Pubblica la tua struttura e condividi la tua casa pet-friendly.</p>
              </Link>

              <Link to="/host/bookings" className="action-card secondary">
                <FaCalendarAlt className="action-icon" />
                <h3>Prenotazioni Ricevute</h3>
                <p>Controlla le richieste dei tuoi ospiti in tempo reale.</p>
              </Link>
            </>
          )}
        </div>
      </section>

      {/* CAROUSEL */}
      <section className="carousel-section container">
        <h2 className="carousel-title">Scopri PetBnB 🐾</h2>
        <div id="welcomeCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
          <div className="carousel-inner rounded-3xl shadow-lg overflow-hidden">
            <div className="carousel-item active">
              <img
                src="https://plus.unsplash.com/premium_photo-1683133813802-7f3f128e87d1?q=80&w=1738&auto=format&fit=crop"
                className="d-block w-100"
                alt="Cucciolo felice"
              />
              <div className="carousel-caption">
                <h5>Viaggia con il tuo pet</h5>
                <p>Le migliori locations pet-friendly in Italia.</p>
              </div>
            </div>

            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1638890177649-073e0e82ee5c?q=80&w=1746&auto=format&fit=crop"
                className="d-block w-100"
                alt="Casa accogliente"
              />
              <div className="carousel-caption">
                <h5>Come a casa</h5>
                <p>Comfort e sicurezza per te e il tuo animale.</p>
              </div>
            </div>

            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1709790533896-4399cb90ba3d?q=80&w=1740&auto=format&fit=crop"
                className="d-block w-100"
                alt="Diventa host"
              />
              <div className="carousel-caption">
                <h5>Diventa Host</h5>
                <p>Condividi la tua casa con altri amanti degli animali.</p>
              </div>
            </div>
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#welcomeCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
            <span className="visually-hidden">Precedente</span>
          </button>

          <button className="carousel-control-next" type="button" data-bs-target="#welcomeCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon"></span>
            <span className="visually-hidden">Successivo</span>
          </button>
        </div>
      </section>
    </div>
  );
}

export default WelcomePage;
