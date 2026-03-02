import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaKey, FaIdBadge, FaUserEdit, FaArrowLeft } from "react-icons/fa";
import "../css/UserPage.css";

function UserPage() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) return;
    fetch("http://localhost:3001/users/me", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => (res.ok ? res.json() : Promise.reject("Errore nel recupero utente")))
      .then((data) => {
        setUser(data);
        setFormData({ username: data.username || "", email: data.email || "", password: "" });
      })
      .catch((err) => console.error(err));
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
      const res = await fetch("http://localhost:3001/users/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          ...(formData.username && { username: formData.username }),
          ...(formData.email && { email: formData.email }),
          ...(formData.password && { password: formData.password }),
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Errore aggiornamento profilo");
      }
      const updated = await res.json();
      setUser(updated);
      setFormData((prev) => ({ ...prev, password: "" }));
      setSuccessMsg("Profilo aggiornato con successo!");
      setIsEditing(false);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  const handleCancel = () => {
    setFormData({ username: user.username, email: user.email, password: "" });
    setIsEditing(false);
    setErrorMsg("");
    setSuccessMsg("");
  };

  if (!user) return <p className="loading">Caricamento in corso...</p>;

  return (
    <div className="user-page">
      <div className="user-card">
        <h2 className="user-title">Profilo Utente</h2>

        {!isEditing ? (
          <>
            <ul className="user-list">
              <li>
                <FaIdBadge /> <strong>ID:</strong> {user.id}
              </li>
              <li>
                <FaUser /> <strong>Username:</strong> {user.username}
              </li>
              <li>
                <FaEnvelope /> <strong>Email:</strong> {user.email}
              </li>
              <li>
                <FaUser /> <strong>Ruolo:</strong> {user.role}
                <span className={`role-badge ${user.role.toLowerCase()}`}>{user.role}</span>
              </li>
            </ul>

            <div className="user-buttons">
              <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                <FaUserEdit /> Modifica Profilo
              </button>
              <Link to="/welcome" className="btn btn-secondary">
                <FaArrowLeft /> Torna alla Home
              </Link>
            </div>
          </>
        ) : (
          <>
            <h3 className="edit-title">
              <FaUserEdit /> Modifica Profilo
            </h3>
            {successMsg && <div className="alert alert-success">{successMsg}</div>}
            {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

            <form className="edit-form" onSubmit={handleSubmit}>
              <label>
                <FaUser /> Username
              </label>
              <input type="text" name="username" value={formData.username} onChange={handleChange} required />

              <label>
                <FaEnvelope /> Email
              </label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />

              <label>
                <FaKey /> Nuova Password (facoltativa)
              </label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Lascia vuoto se non vuoi cambiarla" />

              <div className="user-buttons">
                <button type="submit" className="btn btn-success">
                  <FaUserEdit /> Salva Modifiche
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                  Annulla
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default UserPage;
