import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/RegisterPage.css";

function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "USER",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("Registrazione avvenuta con successo!");
        navigate("/login");
      } else {
        const errorData = await res.json();
        alert(errorData.error || "Errore durante la registrazione.");
      }
    } catch (err) {
      alert("Errore di rete o del server.");
      console.error(err);
    }
  };

  const handleBackToWelcome = () => {
    navigate("/");
  };

  return (
    <div className="register-page">
      <div className="register-box">
        <h1 className="register-title">
          Registrati a <span className="highlight">PetBnb 🐾</span>
        </h1>
        <p className="subtitle">Compila i campi per registrarti</p>

        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} className="register-input" />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="register-input" />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="register-input" />
        <h6 className="role-label">Sei un Host o un User?</h6>
        <select name="role" value={form.role} onChange={handleChange} className="register-input">
          <option value="USER">User</option>
          <option value="HOST">Host</option>
        </select>

        <div className="button-group">
          <button className="btn btn-primary" onClick={handleRegister}>
            Registrati
          </button>
          <button className="btn btn-secondary" onClick={handleBackToWelcome}>
            Torna alla Welcome Page
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
