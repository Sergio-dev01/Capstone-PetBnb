import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "USER",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    if (!form.username || !form.email || !form.password) {
      setError("Compila tutti i campi");
      return;
    }

    if (!isValidEmail(form.email)) {
      setError("Email non valida");
      return;
    }

    if (form.password.length < 6) {
      setError("La password deve contenere almeno 6 caratteri");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.error || "Errore durante la registrazione");
        setLoading(false);
        return;
      }

      setSuccess("Registrazione completata! Reindirizzamento...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError("Errore di connessione al server");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = loading || !form.username || !form.email || !form.password;

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-white to-pink-100"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.25),transparent_40%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.25),transparent_40%)]"></div>

      {/* Card */}
      <div className="relative w-full max-w-md backdrop-blur-xl bg-white/60 border border-white/40 shadow-2xl rounded-3xl p-10">
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-center tracking-tight">
          Registrati a <span className="bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">PetBnb 🐾</span>
        </h1>

        <p className="text-center text-gray-500 mt-2">Crea il tuo account</p>

        <div className="mt-4 w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-indigo-500 to-pink-500"></div>

        {/* ===== FORM ===== */}
        <div className="mt-10">
          <div className="space-y-6">
            {/* USERNAME */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Username</label>
              <input
                name="username"
                placeholder="Il tuo username"
                value={form.username}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border bg-white/70 backdrop-blur transition
                  focus:outline-none focus:ring-2
                  ${error ? "border-red-300 focus:ring-red-400" : "border-gray-200 focus:ring-indigo-400"}`}
              />
            </div>

            {/* EMAIL */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Email</label>
              <input
                name="email"
                type="email"
                placeholder="nome@email.com"
                value={form.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border bg-white/70 backdrop-blur transition
                  focus:outline-none focus:ring-2
                  ${error ? "border-red-300 focus:ring-red-400" : "border-gray-200 focus:ring-indigo-400"}`}
              />
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Almeno 6 caratteri"
                value={form.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border bg-white/70 backdrop-blur transition
                  focus:outline-none focus:ring-2
                  ${error ? "border-red-300 focus:ring-red-400" : "border-gray-200 focus:ring-indigo-400"}`}
              />
            </div>

            {/* ROLE */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Sei un Host o un User?</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/70 backdrop-blur focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              >
                <option value="USER">User</option>
                <option value="HOST">Host</option>
              </select>
            </div>

            {/* ERROR */}
            {error && <p className="text-sm text-red-500 text-center animate-pulse">{error}</p>}

            {/* SUCCESS */}
            {success && <p className="text-sm text-green-600 text-center">{success}</p>}

            {/* BUTTON */}
            <button
              onClick={handleRegister}
              disabled={isDisabled}
              className="w-full py-3 rounded-xl font-semibold text-white
                bg-gradient-to-r from-indigo-600 to-pink-500
                shadow-lg transition-all duration-300
                hover:shadow-xl hover:scale-[1.02]
                active:scale-[0.98]
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex justify-center items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Creazione account...
                </span>
              ) : (
                "Registrati"
              )}
            </button>
          </div>
        </div>

        {/* LINKS */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Hai già un account?{" "}
          <Link to="/login" className="font-semibold text-indigo-600 hover:text-pink-500 transition">
            Accedi
          </Link>
        </p>

        <div className="text-center mt-3">
          <button onClick={() => navigate("/")} className="text-sm text-gray-400 hover:text-gray-600 transition">
            ← Torna alla Welcome Page
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
