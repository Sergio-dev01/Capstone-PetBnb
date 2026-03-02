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
        }),
      );

      window.dispatchEvent(new Event("userChanged"));
      navigate("/welcome");
    } catch (error) {
      alert("Errore durante il login");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="login-page"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #ffc0cb, #ffb347)",
        padding: "1rem",
      }}
    >
      <div
        className="login-box"
        style={{
          backgroundColor: "rgba(255,255,255,0.9)",
          padding: "2rem",
          borderRadius: "2rem",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h1 className="login-title" style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "0.5rem" }}>
          Benvenuto su{" "}
          <span className="highlight" style={{ color: "#ff6b81" }}>
            PetBnb 🐾
          </span>
        </h1>
        <p className="subtitle" style={{ color: "#555", marginBottom: "1.5rem" }}>
          Accedi per continuare
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "0.75rem 1rem",
            borderRadius: "1rem",
            border: "1px solid #ddd",
            marginBottom: "1rem",
            transition: "all 0.3s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#ff6b81")}
          onBlur={(e) => (e.target.style.borderColor = "#ddd")}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "0.75rem 1rem",
            borderRadius: "1rem",
            border: "1px solid #ddd",
            marginBottom: "1.5rem",
            transition: "all 0.3s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#ff6b81")}
          onBlur={(e) => (e.target.style.borderColor = "#ddd")}
        />

        <button
          className="login-button"
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "0.75rem",
            borderRadius: "1rem",
            border: "none",
            fontWeight: "600",
            color: "white",
            background: "linear-gradient(to right, #ff6b81, #ff9472)",
            cursor: "pointer",
            transition: "all 0.3s",
            marginBottom: "1rem",
          }}
          onMouseOver={(e) => (e.currentTarget.style.filter = "brightness(1.1)")}
          onMouseOut={(e) => (e.currentTarget.style.filter = "brightness(1)")}
        >
          {loading ? "Caricamento..." : "Accedi"}
        </button>

        <p className="forgot-password" style={{ fontSize: "0.9rem", color: "#555" }}>
          <a href="/forgot-password" style={{ color: "#ff6b81", textDecoration: "underline" }}>
            Password dimenticata?
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
