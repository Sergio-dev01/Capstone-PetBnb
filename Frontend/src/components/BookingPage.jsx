import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/BookingPage.css";

function BookingPage() {
  const [bookings, setBookings] = useState([]);
  const [editingBookingId, setEditingBookingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ startDate: "", endDate: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    if (!token) return;

    fetch("http://localhost:3001/bookings/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBookings(data);
        } else {
          setBookings([]);
        }
      })
      .catch(() => setBookings([]));
  };

  const handleEditClick = (booking) => {
    setEditingBookingId(booking.bookingId);
    setEditFormData({
      startDate: booking.startDate,
      endDate: booking.endDate,
    });
    setErrorMsg("");
  };

  const handleCancelEdit = () => {
    setEditingBookingId(null);
    setEditFormData({ startDate: "", endDate: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (bookingId) => {
    try {
      const response = await fetch(`http://localhost:3001/bookings/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editFormData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Errore durante l'aggiornamento");
      }

      setEditingBookingId(null);
      fetchBookings();
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  const handleDelete = async (bookingId) => {
    if (!window.confirm("Sei sicuro di voler cancellare questa prenotazione?")) return;

    try {
      const response = await fetch(`http://localhost:3001/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Errore durante la cancellazione");
      }

      fetchBookings();
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="booking-page">
      <h2>Le mie Prenotazioni</h2>

      {errorMsg && <div className="alert">{errorMsg}</div>}

      {bookings.length === 0 ? (
        <p className="no-bookings">Nessuna prenotazione trovata</p>
      ) : (
        <div className="bookings-grid">
          {bookings.map((b) => (
            <div key={b.bookingId} className="booking-card">
              <h4>{b.locationName}</h4>

              {editingBookingId === b.bookingId ? (
                <div className="edit-form">
                  <label>Dal:</label>
                  <input type="date" name="startDate" value={editFormData.startDate} onChange={handleChange} />
                  <label>Al:</label>
                  <input type="date" name="endDate" value={editFormData.endDate} onChange={handleChange} />
                  <div className="buttons-row">
                    <button className="btn btn-success" onClick={() => handleUpdate(b.bookingId)}>
                      Salva
                    </button>
                    <button className="btn btn-secondary" onClick={handleCancelEdit}>
                      Annulla
                    </button>
                    <button className="btn btn-danger ms-auto" onClick={() => handleDelete(b.bookingId)}>
                      Elimina
                    </button>
                  </div>
                </div>
              ) : (
                <div className="booking-info">
                  <p>
                    Dal {b.startDate} al {b.endDate}
                  </p>
                  <div className="buttons-row">
                    <button className="btn btn-primary" onClick={() => handleEditClick(b)}>
                      Modifica
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDelete(b.bookingId)}>
                      Elimina
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="back-home">
        <Link to="/welcome" className="btn btn-warning">
          Torna alla Home
        </Link>
      </div>
    </div>
  );
}

export default BookingPage;
