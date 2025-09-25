import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/LocationDetailPage.css";

export default function LocationDetailPage() {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [bookingDates, setBookingDates] = useState({ startDate: "", endDate: "" });
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const token = localStorage.getItem("accessToken");

    fetch(`http://localhost:3001/locations/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore nel recupero location");
        return res.json();
      })
      .then(setLocation)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleBooking = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const res = await fetch("http://localhost:3001/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          locationId: parseInt(id),
          startDate: bookingDates.startDate,
          endDate: bookingDates.endDate,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Errore nella prenotazione.");
      }

      alert("Prenotazione creata!");
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!location) return <p>Nessuna location trovata.</p>;

  return (
    <div className="container mt-5">
      <div className="location-detail-card">
        <div className="location-image-wrapper">
          <img src={location.immagineUrl ? `/images/${location.immagineUrl}` : "/images/placeholder.jpg"} alt={location.nome} className="location-image" />
        </div>
        <div className="location-info">
          <h2 className="location-title">{location.nome}</h2>
          <p>
            <strong>Città:</strong> {location.citta}
          </p>
          <p>
            <strong>Indirizzo:</strong> {location.indirizzo}
          </p>
          <p className="location-description">{location.descrizione}</p>
          <p className="location-price">
            <strong>Prezzo per notte:</strong> €{location.prezzoPerNotte}
          </p>
        </div>
        {user?.role !== "HOST" && (
          <div className="location-booking">
            <h3>Prenota ora</h3>
            <label>
              Data inizio:
              <input
                type="date"
                name="startDate"
                className="form-control"
                value={bookingDates.startDate}
                onChange={(e) => setBookingDates({ ...bookingDates, startDate: e.target.value })}
              />
            </label>
            <label>
              Data fine:
              <input
                type="date"
                name="endDate"
                className="form-control"
                value={bookingDates.endDate}
                onChange={(e) => setBookingDates({ ...bookingDates, endDate: e.target.value })}
              />
            </label>
            <button className="btn btn-primary booking-btn" onClick={handleBooking}>
              Prenota
            </button>
            <button className="back-button" onClick={() => navigate(-1)}>
              Torna indietro
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
