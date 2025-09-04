import { useEffect, useState } from "react";

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
        console.log("Dati fetch bookings:", data);
        if (Array.isArray(data)) {
          setBookings(data);
        } else {
          console.error("La risposta non è un array:", data);
          setBookings([]);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="container mt-4">
      <h2>Le mie Prenotazioni</h2>
      {Array.isArray(bookings) && bookings.length > 0 ? (
        bookings.map((b) => (
          <li key={b.bookingId} className="list-group-item">
            <h5>{b.locationName}</h5>
            <p>
              Dal {b.startDate} al {b.endDate}
            </p>
          </li>
        ))
      ) : (
        <p>Nessuna prenotazione trovata.</p>
      )}
    </div>
  );
}

export default BookingPage;
