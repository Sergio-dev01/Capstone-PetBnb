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
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
        background: "linear-gradient(to bottom right, #ffc0cb, #ffb347)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow background effect */}
      <div
        style={{
          position: "absolute",
          width: "30rem",
          height: "30rem",
          backgroundColor: "rgba(255,255,255,0.2)",
          borderRadius: "50%",
          filter: "blur(6rem)",
          top: "-10rem",
          left: "-10rem",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "30rem",
          height: "30rem",
          backgroundColor: "rgba(255,200,0,0.2)",
          borderRadius: "50%",
          filter: "blur(6rem)",
          bottom: "-10rem",
          right: "-10rem",
        }}
      />

      <div
        style={{
          position: "relative",
          backgroundColor: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(10px)",
          padding: "3rem 2rem",
          borderRadius: "2rem",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          maxWidth: "450px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "800",
            marginBottom: "0.5rem",
          }}
        >
          Registrati a{" "}
          <span style={{ background: "linear-gradient(to right, #ff6b81, #ff9472)", WebkitBackgroundClip: "text", color: "transparent" }}>PetBnb 🐾</span>
        </h1>
        <p style={{ color: "#555", fontSize: "1.05rem", marginBottom: "2rem" }}>Compila i campi per registrarti</p>

        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
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
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
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
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
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

        <h6 style={{ marginBottom: "0.5rem", color: "#555" }}>Sei un Host o un User?</h6>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "0.75rem 1rem",
            borderRadius: "1rem",
            border: "1px solid #ddd",
            marginBottom: "2rem",
            transition: "all 0.3s",
            backgroundColor: "white",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#ff6b81")}
          onBlur={(e) => (e.target.style.borderColor = "#ddd")}
        >
          <option value="USER">User</option>
          <option value="HOST">Host</option>
        </select>

        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          <button
            onClick={handleRegister}
            style={{
              padding: "0.75rem 2rem",
              borderRadius: "1rem",
              fontWeight: "600",
              color: "white",
              border: "none",
              background: "linear-gradient(to right, #ff6b81, #ff9472)",
              boxShadow: "0 5px 15px rgba(255,107,129,0.4)",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.filter = "brightness(1.1)")}
            onMouseOut={(e) => (e.currentTarget.style.filter = "brightness(1)")}
          >
            Registrati
          </button>

          <button
            onClick={handleBackToWelcome}
            style={{
              padding: "0.75rem 2rem",
              borderRadius: "1rem",
              fontWeight: "600",
              color: "#ff6b81",
              border: "2px solid #ff6b81",
              backgroundColor: "white",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = "white";
              e.currentTarget.style.backgroundColor = "#ff6b81";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = "#ff6b81";
              e.currentTarget.style.backgroundColor = "white";
            }}
          >
            Torna alla Welcome Page
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
