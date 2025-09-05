import React, { useEffect, useState } from "react";

function BookingPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
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
  }, []);

  return (
    <div className="container mt-4">
      <h2>Le mie Prenotazioni</h2>
      <ul className="list-group">
        {bookings.length === 0 ? (
          <li className="list-group-item">Nessuna prenotazione trovata</li>
        ) : (
          bookings.map((b) => (
            <li key={b.bookingId} className="list-group-item">
              <h5>{b.locationName}</h5>
              <p>
                Dal {b.startDate} al {b.endDate}
              </p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default BookingPage;
