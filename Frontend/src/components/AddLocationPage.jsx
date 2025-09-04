import { useState } from "react";

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
    <div className="container mt-4">
      <h2>Aggiungi Location</h2>
      <input name="nome" placeholder="Nome" className="form-control my-2" onChange={handleChange} />
      <input name="indirizzo" placeholder="Indirizzo" className="form-control my-2" onChange={handleChange} />
      <input name="citta" placeholder="Città" className="form-control my-2" onChange={handleChange} />
      <textarea name="descrizione" placeholder="Descrizione" className="form-control my-2" onChange={handleChange} />
      <input name="prezzoPerNotte" placeholder="Prezzo per notte" className="form-control my-2" type="number" onChange={handleChange} />
      <button className="btn btn-success" onClick={handleSubmit}>
        Crea
      </button>
    </div>
  );
}

export default AddLocationPage;
