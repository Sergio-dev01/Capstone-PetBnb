import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserPage() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:3001/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore nel recupero utente");
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setFormData({
          username: data.username || "",
          email: data.email || "",
          password: "",
        });
      })
      .catch((err) => console.error("Errore:", err));
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const response = await fetch("http://localhost:3001/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...(formData.username && { username: formData.username }),
          ...(formData.email && { email: formData.email }),
          ...(formData.password && { password: formData.password }),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Errore durante l'aggiornamento del profilo");
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setFormData((prev) => ({ ...prev, password: "" }));
      setSuccessMsg("Profilo aggiornato con successo!");
      setIsEditing(false);
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  const handleCancel = () => {
    setFormData({
      username: user.username,
      email: user.email,
      password: "",
    });
    setIsEditing(false);
    setErrorMsg("");
    setSuccessMsg("");
  };

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

      {!isEditing && (
        <>
          <ul className="list-group mb-4">
            <li className="list-group-item">
              <strong>ID:</strong> {user.id}
            </li>
            <li className="list-group-item">
              <strong>Username:</strong> {user.username}
            </li>
            <li className="list-group-item">
              <strong>Email:</strong> {user.email}
            </li>
            <li className="list-group-item">
              <strong>Ruolo:</strong> {user.role}
            </li>
          </ul>

          <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
            Modifica Profilo
          </button>

          <Link to="/welcome" className="btn btn-secondary ms-2">
            Torna alla Home
          </Link>
        </>
      )}

      {isEditing && (
        <>
          <h4 className="mt-4">Modifica Profilo</h4>
          {successMsg && <div className="alert alert-success">{successMsg}</div>}
          {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input type="text" name="username" className="form-control" value={formData.username} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Nuova Password (facoltativa)</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                placeholder="Lascia vuoto se non vuoi cambiarla"
              />
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-success">
                Salva modifiche
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                Annulla
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default UserPage;
