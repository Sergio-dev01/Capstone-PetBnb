import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

      const data = await resp.json();
      localStorage.setItem("accessToken", data.accessToken);

      const parts = data.accessToken.split(".");
      if (parts.length !== 3) throw new Error("Token JWT non valido");

      const payload = parts[1];
      const decoded = JSON.parse(atob(payload));
      const role = decoded.role;

      if (role === "USER") {
        navigate("/bookings");
      } else if (role === "HOST") {
        navigate("/host/bookings");
      } else {
        navigate("/");
      }
    } catch (error) {
      alert("Errore durante il login");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Login</h2>
      <input type="email" placeholder="Email" className="form-control my-2" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" className="form-control my-2" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="btn btn-primary" onClick={handleLogin} disabled={loading}>
        {loading ? "Caricamento..." : "Accedi"}
      </button>
    </div>
  );
}

export default LoginPage;
