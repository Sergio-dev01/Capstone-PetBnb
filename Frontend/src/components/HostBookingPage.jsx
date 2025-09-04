import { useEffect, useState } from "react";

function HostBookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    fetch("http://localhost:3001/bookings/host", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setBookings)
      .catch(console.error);
  }, []);

  return (
    <div className="container mt-4">
      <h2>Prenotazioni ricevute (Host)</h2>
      {bookings.length === 0 && <p>Nessuna prenotazione trovata.</p>}
      <ul className="list-group">
        {bookings.map((b) => (
          <li key={b.bookingId} className="list-group-item">
            <h5>{b.locationName}</h5>
            <p>
              Dal {b.startDate} al {b.endDate}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HostBookingsPage;
