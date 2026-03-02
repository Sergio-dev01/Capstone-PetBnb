import { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaArrowLeft } from "react-icons/fa";
import "../css/HostLocationsPage.css";

function AddLocationPage() {
  const [form, setForm] = useState({
    nome: "",
    indirizzo: "",
    citta: "",
    descrizione: "",
    prezzoPerNotte: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("accessToken");
    const res = await fetch("http://localhost:3001/locations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...form, prezzoPerNotte: parseFloat(form.prezzoPerNotte) }),
    });

    if (res.ok) {
      alert("Location creata con successo!");
    } else {
      alert("Errore nella creazione.");
    }
  };

  return (
    <div className="add-location-page">
      <div className="location-card">
        <h2 className="location-title">Aggiungi Nuova Location</h2>

        <input name="nome" placeholder="Nome" className="form-input" onChange={handleChange} />
        <input name="indirizzo" placeholder="Indirizzo" className="form-input" onChange={handleChange} />
        <input name="citta" placeholder="Città" className="form-input" onChange={handleChange} />
        <textarea name="descrizione" placeholder="Descrizione" className="form-input textarea" onChange={handleChange} />
        <input name="prezzoPerNotte" placeholder="Prezzo per notte" type="number" className="form-input" onChange={handleChange} />

        <div className="form-buttons">
          <button className="btn btn-success" onClick={handleSubmit}>
            <FaPlus /> Crea
          </button>
          <Link to="/welcome" className="btn btn-secondary">
            <FaArrowLeft /> Torna alla Welcome
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AddLocationPage;
