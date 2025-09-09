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
    <div className="container mt-4">
      <h2>Le mie Prenotazioni</h2>

      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

      <ul className="list-group">
        {bookings.length === 0 ? (
          <li className="list-group-item">Nessuna prenotazione trovata</li>
        ) : (
          bookings.map((b) => (
            <li key={b.bookingId} className="list-group-item">
              <h5>{b.locationName}</h5>

              {editingBookingId === b.bookingId ? (
                <>
                  <div className="mb-2">
                    <label className="form-label">Dal:</label>
                    <input type="date" name="startDate" value={editFormData.startDate} onChange={handleChange} className="form-control" />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Al:</label>
                    <input type="date" name="endDate" value={editFormData.endDate} onChange={handleChange} className="form-control" />
                  </div>
                  <div className="d-flex gap-2">
                    <button className="btn btn-success btn-sm" onClick={() => handleUpdate(b.bookingId)}>
                      Salva
                    </button>
                    <button className="btn btn-secondary btn-sm" onClick={handleCancelEdit}>
                      Annulla
                    </button>
                    <button className="btn btn-danger btn-sm ms-auto" onClick={() => handleDelete(b.bookingId)}>
                      Elimina
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p>
                    Dal {b.startDate} al {b.endDate}
                  </p>
                  <div className="d-flex gap-2">
                    <button className="btn btn-primary btn-sm" onClick={() => handleEditClick(b)}>
                      Modifica
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(b.bookingId)}>
                      Elimina
                    </button>
                  </div>
                </>
              )}
            </li>
          ))
        )}
      </ul>

      <div className="text-center">
        <Link to="/welcome" className="btn btn-secondary mt-3">
          Torna alla Home
        </Link>
      </div>
    </div>
  );
}

export default BookingPage;
