import { useEffect, useState } from "react";

function UserPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    fetch("http://localhost:3001/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Errore nel recupero utente");
        }
        return res.json();
      })
      .then(setUser)
      .catch((err) => console.error("Errore:", err));
  }, []);

  if (!user) {
    return (
      <div className="container mt-4">
        <h2>Profilo Utente</h2>
        <p>Caricamento in corso...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Profilo Utente</h2>
      <ul className="list-group">
        <li className="list-group-item">
          <strong>Username:</strong> {user.username}
        </li>
        <li className="list-group-item">
          <strong>Email:</strong> {user.email}
        </li>
        <li className="list-group-item">
          <strong>Ruolo:</strong> {user.role}
        </li>
        <li className="list-group-item">
          <strong>ID:</strong> {user.id}
        </li>
      </ul>
    </div>
  );
}

export default UserPage;
