import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { KeyRound, Mail, PawPrint } from "lucide-react";
import AuthLayout, { FormMessage } from "./AuthLayout";
import Button from "./ui/Button";
import { TextField } from "./ui/Field";
import { AUTH_PHOTOS } from "../lib/images";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  const isDisabled = loading || !email || !password;

  return (
    <AuthLayout
      title="Bentornato"
      subtitle="Accedi per gestire viaggi e prenotazioni."
      photo={AUTH_PHOTOS.login}
      photoAlt="Bulldog francese con una felpa gialla"
      photoBg="bg-sky"
      aside={
        <div className="flex gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-sun">
            <PawPrint className="size-5" aria-hidden="true" />
          </span>
          <div>
            <p className="font-display text-lg leading-snug font-bold">Viaggia senza pensieri</p>
            <p className="mt-1 text-sm text-cocoa-soft">
              Ogni location su PetBnb accetta animali: niente sorprese all'arrivo, per te e per il tuo amico.
            </p>
          </div>
        </div>
      }
      footer={
        <>
          Non hai un account?{" "}
          <Link
            to="/register"
            className="font-semibold text-cocoa underline decoration-sun decoration-2 underline-offset-4 hover:decoration-cocoa"
          >
            Registrati
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <TextField
          label="Email"
          type="email"
          icon={Mail}
          placeholder="nome@email.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={error ? true : undefined}
        />

        <div className="space-y-2">
          <TextField
            label="Password"
            type="password"
            icon={KeyRound}
            placeholder="La tua password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={error ? true : undefined}
          />
          <div className="text-right">
            <Link to="/forgot-password" className="text-sm font-medium text-cocoa-soft no-underline hover:text-cocoa">
              Password dimenticata?
            </Link>
          </div>
        </div>

        <FormMessage type="error">{error}</FormMessage>

        <Button type="submit" size="lg" className="w-full" loading={loading} disabled={isDisabled}>
          {loading ? "Accesso..." : "Accedi"}
        </Button>
      </form>
    </AuthLayout>
  );
}

export default LoginPage;
