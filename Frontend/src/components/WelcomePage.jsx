import { Link } from "react-router-dom";

function WelcomePage() {
  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">Benvenuto su PetBnb 🐾</h1>
      <p className="lead">Trova o offri ospitalità per i tuoi amici a quattro zampe!</p>
      <div className="mt-4">
        <Link to="/register" className="btn btn-outline-primary mx-2">
          Registrati
        </Link>
        <Link to="/login" className="btn btn-primary mx-2">
          Login
        </Link>
      </div>
    </div>
  );
}

export default WelcomePage;
