import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/WelcomePage.css";

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
    <div className="container welcome-container text-center">
      <h1 className="welcome-title">Benvenuto/a, {user.username}!</h1>
      <p className="lead mt-3 role-description">
        Ruolo: <strong>{user.role}</strong>
      </p>
      <p className="mt-4">Scopri le nostre locations o gestisci le tue attività.</p>

      <div className="button-group mt-5">
        <Link to="/locations" className="btn btn-outline-primary btn-lg me-3">
          Esplora Locations
        </Link>

        {user.role === "USER" && (
          <Link to="/bookings" className="btn btn-outline-primary btn-lg">
            Le mie Prenotazioni
          </Link>
        )}

        {user.role === "HOST" && (
          <>
            <Link to="/locations/add" className="btn btn-success btn-lg me-3">
              Aggiungi Location
            </Link>
            <Link to="/host/bookings" className="btn btn-outline-success btn-lg">
              Prenotazioni Ricevute
            </Link>
          </>
        )}
      </div>
      <div className="mt-5">
        <h3 className="mb-4">Scopri PetBnB 🐾</h3>

        <div id="welcomeCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
          <div className="carousel-inner rounded shadow">
            <div className="carousel-item active">
              <img
                src="https://plus.unsplash.com/premium_photo-1683133813802-7f3f128e87d1?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="d-block w-100"
                alt="Cucciolo felice"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Viaggia con il tuo pet</h5>
                <p>Le migliori locations pet-friendly in Italia</p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1638890177649-073e0e82ee5c?q=80&w=1746&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="d-block w-100"
                alt="Casa accogliente"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Come a casa</h5>
                <p>Comfort e sicurezza per te e il tuo animale</p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1709790533896-4399cb90ba3d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="d-block w-100"
                alt="Ospite e animale"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Diventa host!</h5>
                <p>Condividi la tua casa con altri amanti degli animali</p>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#welcomeCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Precedente</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#welcomeCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Successivo</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
