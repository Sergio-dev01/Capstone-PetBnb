import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/UserPage.css";
import { FaUser, FaEnvelope, FaKey, FaIdBadge, FaUserEdit, FaArrowLeft } from "react-icons/fa";

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
      <div className="user-container">
        <h2 className="user-title">Profilo Utente</h2>

        {!isEditing && (
          <>
            <ul className="list-group user-list">
              <li>
                <FaIdBadge className="me-2 text-primary" />
                <strong>ID:</strong> {user.id}
              </li>
              <li>
                <FaUser className="me-2 text-primary" />
                <strong>Username:</strong> {user.username}
              </li>
              <li>
                <FaEnvelope className="me-2 text-primary" />
                <strong>Email:</strong> {user.email}
              </li>
              <li>
                <FaUser className="me-2 text-primary" />
                <strong>Ruolo:</strong> {user.role}
              </li>
            </ul>

            <div className="user-buttons mt-4">
              <button className="btn btn-primary me-2" onClick={() => setIsEditing(true)}>
                <FaUserEdit className="me-1" />
                Modifica Profilo
              </button>
              <Link to="/welcome" className="btn btn-secondary">
                <FaArrowLeft className="me-1" />
                Torna alla Home
              </Link>
            </div>
          </>
        )}

        {isEditing && (
          <>
            <h4 className="mt-4 mb-3">
              <FaUserEdit className="me-2" />
              Modifica Profilo
            </h4>
            {successMsg && <div className="alert alert-success">{successMsg}</div>}
            {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label user-form-label">
                  <FaUser className="me-1" />
                  Username
                </label>
                <input type="text" name="username" className="form-control" value={formData.username} onChange={handleChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label user-form-label">
                  <FaEnvelope className="me-1" />
                  Email
                </label>
                <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label user-form-label">
                  <FaKey className="me-1" />
                  Nuova Password (facoltativa)
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Lascia vuoto se non vuoi cambiarla"
                />
              </div>

              <div className="user-buttons">
                <button type="submit" className="btn btn-success me-2">
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
    </div>
  );
}

export default UserPage;
