import { Link } from "react-router-dom";
import "../css/LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="hero-content">
        <h1>
          Benvenuto su <span className="highlight">PetBnb 🐾</span>
        </h1>
        <p>Trova o offri ospitalità per i tuoi amici a quattro zampe!</p>
        <div className="btn-group">
          <Link to="/register" className="btn btn-primary">
            Registrati
          </Link>
          <Link to="/login" className="btn btn-secondary">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
