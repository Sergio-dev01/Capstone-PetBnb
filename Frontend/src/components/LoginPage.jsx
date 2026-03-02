import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Inserisci email e password");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Email non valida");
      return;
    }

    setLoading(true);

    try {
      const resp = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!resp.ok) {
        setError("Credenziali non corrette");
        setLoading(false);
        return;
      }

      const data = await resp.json();
      localStorage.setItem("accessToken", data.accessToken);

      const decoded = JSON.parse(atob(data.accessToken.split(".")[1]));

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: decoded.sub,
          email: decoded.email,
          role: decoded.role,
          username: decoded.username,
        }),
      );

      window.dispatchEvent(new Event("userChanged"));
      navigate("/welcome");
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Errore di connessione al server");
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = loading || !email || !password;

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-white to-pink-100"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.25),transparent_40%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.25),transparent_40%)]"></div>

      {/* Card */}
      <div className="relative w-full max-w-md backdrop-blur-xl bg-white/60 border border-white/40 shadow-2xl rounded-3xl p-10">
        <h1 className="text-3xl font-extrabold text-center tracking-tight">
          Benvenuto su <span className="bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">PetBnb 🐾</span>
        </h1>

        <p className="text-center text-gray-500 mt-2">Accedi per continuare</p>

        <div className="mt-4 w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-indigo-500 to-pink-500"></div>

        {/* FORM */}
        <div className="mt-8 space-y-4">
          {/* EMAIL */}
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border bg-white/70 backdrop-blur transition
                focus:outline-none focus:ring-2
                ${error ? "border-red-300 focus:ring-red-400" : "border-gray-200 focus:ring-indigo-400"}`}
            />
          </div>

          {/* PASSWORD */}
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border bg-white/70 backdrop-blur transition
                focus:outline-none focus:ring-2
                ${error ? "border-red-300 focus:ring-red-400" : "border-gray-200 focus:ring-indigo-400"}`}
            />
          </div>

          {/* ERROR MESSAGE */}
          {error && <p className="text-sm text-red-500 text-center animate-pulse">{error}</p>}

          {/* BUTTON */}
          <button
            onClick={handleLogin}
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
                Accesso...
              </span>
            ) : (
              "Accedi"
            )}
          </button>
        </div>

        {/* LINKS */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <Link to="/forgot-password" className="hover:text-indigo-600">
            Password dimenticata?
          </Link>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Non hai un account?{" "}
          <Link to="/register" className="font-semibold text-indigo-600 hover:text-pink-500">
            Registrati
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
