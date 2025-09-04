import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function LocationDetailPage() {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [bookingDates, setBookingDates] = useState({ startDate: "", endDate: "" });

  useEffect(() => {
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
    const res = await fetch("http://localhost:3001/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ locationId: parseInt(id), startDate: bookingDates.startDate, endDate: bookingDates.endDate }),
    });
    if (res.ok) alert("Prenotazione creata!");
    else alert("Errore nella prenotazione.");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!location) return <p>Nessuna location trovata.</p>;

  return (
    <div className="container mt-4">
      <h2>{location.nome}</h2>
      <p>
        <strong>Città:</strong> {location.citta}
      </p>
      <p>
        <strong>Indirizzo:</strong> {location.indirizzo}
      </p>
      <p>
        <strong>Descrizione:</strong> {location.descrizione}
      </p>
      <p>
        <strong>Prezzo per notte:</strong> €{location.prezzoPerNotte}
      </p>

      <div className="mt-3">
        <h4>Prenota ora</h4>
        <label>
          Data inizio:
          <input type="date" name="startDate" className="form-control mb-2" onChange={(e) => setBookingDates({ ...bookingDates, startDate: e.target.value })} />
        </label>
        <label>
          Data fine:
          <input type="date" name="endDate" className="form-control mb-2" onChange={(e) => setBookingDates({ ...bookingDates, endDate: e.target.value })} />
        </label>
        <button className="btn btn-primary" onClick={handleBooking}>
          Prenota
        </button>
      </div>
    </div>
  );
}
