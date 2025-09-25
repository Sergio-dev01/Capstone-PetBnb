import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const resp = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!resp.ok) {
        alert("Credenziali errate");
        setLoading(false);
        return;
      }

      // Salva il token e i dati utente nel localStorage direttamente da login
      const data = await resp.json();
      localStorage.setItem("accessToken", data.accessToken);

      const parts = data.accessToken.split(".");
      if (parts.length !== 3) throw new Error("Token JWT non valido");

      const payload = parts[1];
      const decoded = JSON.parse(atob(payload));
      const role = decoded.role;
      const userId = decoded.sub;
      const userEmail = decoded.email;
      const username = decoded.username;

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: userId,
          email: userEmail,
          role: role,
          username: username,
        })
      );

      // ✅ Notifica la Navbar che l'utente è cambiato
      window.dispatchEvent(new Event("userChanged"));

      // ✅ Naviga verso la pagina principale
      navigate("/welcome");
    } catch (error) {
      alert("Errore durante il login");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1 className="login-title">
          Benvenuto su <span className="highlight">PetBnb 🐾</span>
        </h1>
        <p className="subtitle">Accedi per continuare</p>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="login-input" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="login-input" />
        <button className="login-button" onClick={handleLogin} disabled={loading}>
          {loading ? "Caricamento..." : "Accedi"}
        </button>
        <p className="forgot-password">
          <a href="/forgot-password">Password dimenticata?</a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
