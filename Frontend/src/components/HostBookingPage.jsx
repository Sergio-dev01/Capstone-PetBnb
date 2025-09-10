import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaUserAlt, FaHome } from "react-icons/fa";

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
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold">📦 Prenotazioni Ricevute</h2>
        <p className="text-muted">Ecco tutte le prenotazioni per le tue location</p>
      </div>

      {bookings.length === 0 ? (
        <div className="alert alert-info text-center">Nessuna prenotazione trovata.</div>
      ) : (
        <div className="row">
          {bookings.map((b) => (
            <div key={b.bookingId} className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100 border  shadow-lg bg-light-subtle">
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title text-primary mb-3">
                    <FaHome className="me-2" />
                    {b.locationName}
                  </h5>

                  <div className="mb-2">
                    <FaCalendarAlt className="me-2 text-secondary" />
                    <span className="badge bg-light text-dark me-2">
                      Dal: <strong>{b.startDate}</strong>
                    </span>
                    <span className="badge bg-light text-dark">
                      Al: <strong>{b.endDate}</strong>
                    </span>
                  </div>

                  <div className="mt-3">
                    <FaUserAlt className="me-2 text-secondary" />
                    <strong>Ospite:</strong> {b.username}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-4">
        <Link to="/welcome" className="btn btn-outline-secondary">
          Torna alla Home
        </Link>
      </div>
    </div>
  );
}

export default HostBookingsPage;
