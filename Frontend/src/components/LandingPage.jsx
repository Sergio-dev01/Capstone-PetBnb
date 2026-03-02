import { Link } from "react-router-dom";

function LandingPage() {
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
          maxWidth: "500px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "800",
            marginBottom: "1rem",
          }}
        >
          Benvenuto su{" "}
          <span style={{ background: "linear-gradient(to right, #ff6b81, #ff9472)", WebkitBackgroundClip: "text", color: "transparent" }}>PetBnb 🐾</span>
        </h1>
        <p style={{ color: "#555", fontSize: "1.1rem", marginBottom: "2rem" }}>Trova o offri ospitalità per i tuoi amici a quattro zampe!</p>

        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          <Link
            to="/register"
            style={{
              padding: "0.75rem 2rem",
              borderRadius: "1rem",
              fontWeight: "600",
              color: "white",
              textDecoration: "none",
              background: "linear-gradient(to right, #ff6b81, #ff9472)",
              boxShadow: "0 5px 15px rgba(255,107,129,0.4)",
              transition: "all 0.3s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.filter = "brightness(1.1)")}
            onMouseOut={(e) => (e.currentTarget.style.filter = "brightness(1)")}
          >
            Registrati
          </Link>

          <Link
            to="/login"
            style={{
              padding: "0.75rem 2rem",
              borderRadius: "1rem",
              fontWeight: "600",
              color: "#ff6b81",
              textDecoration: "none",
              backgroundColor: "white",
              border: "2px solid #ff6b81",
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
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
