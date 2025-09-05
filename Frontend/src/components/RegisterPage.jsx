import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="container mt-4">
      <h2>Registrazione</h2>
      <input name="username" placeholder="Username" className="form-control my-2" onChange={handleChange} />
      <input name="email" placeholder="Email" className="form-control my-2" onChange={handleChange} />
      <input name="password" placeholder="Password" type="password" className="form-control my-2" onChange={handleChange} />
      <h6>Sei un Host o un User?</h6>
      <select name="role" className="form-control my-2" onChange={handleChange}>
        <option value="USER">User</option>
        <option value="HOST">Host</option>
      </select>
      <button className="btn btn-success" onClick={handleRegister}>
        Registrati
      </button>
      <button className="btn btn-secondary" onClick={handleBackToWelcome}>
        Torna alla Welcome Page
      </button>
    </div>
  );
}

export default RegisterPage;
