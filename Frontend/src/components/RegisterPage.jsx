import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "motion/react";
import { Check, House, KeyRound, Luggage, Mail, UserRound } from "lucide-react";
import AuthLayout, { FormMessage } from "./AuthLayout";
import Button from "./ui/Button";
import { TextField } from "./ui/Field";
import { AUTH_PHOTOS } from "../lib/images";
import { cn } from "../lib/utils";

const ROLES = [
  { value: "USER", title: "Viaggio con il mio pet", text: "Cerco e prenoto stay", Icon: Luggage },
  { value: "HOST", title: "Ospito animali", text: "Pubblico la mia casa", Icon: House },
];

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

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister();
  };

  const isDisabled = loading || !form.username || !form.email || !form.password;

  return (
    <AuthLayout
      title="Crea il tuo account"
      subtitle="Bastano pochi dati e sei dei nostri."
      photo={AUTH_PHOTOS.register}
      photoAlt="Carlino con un maglione su sfondo giallo"
      photoBg="bg-sun"
      aside={
        <div>
          <p className="font-display text-lg leading-snug font-bold">Viaggiatore o host?</p>
          <p className="mt-1 text-sm text-cocoa-soft">
            Da viaggiatore prenoti stay pet-friendly in tutta Italia. Da host pubblichi la tua casa e gestisci le
            prenotazioni ricevute.
          </p>
        </div>
      }
      footer={
        <>
          Hai già un account?{" "}
          <Link
            to="/login"
            className="font-semibold text-cocoa underline decoration-sun decoration-2 underline-offset-4 hover:decoration-cocoa"
          >
            Accedi
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <fieldset>
          <legend className="text-sm font-semibold">Come userai PetBnb?</legend>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {ROLES.map(({ value, title, text, Icon }) => {
              const checked = form.role === value;
              return (
                <label
                  key={value}
                  className={cn(
                    "relative cursor-pointer rounded-2xl p-4 ring-inset transition-[background-color,box-shadow] has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-cocoa",
                    checked ? "bg-sun-soft ring-2 ring-cocoa" : "bg-white ring-1 ring-cocoa/12 hover:ring-cocoa/25",
                  )}
                >
                  <input
                    type="radio"
                    name="role"
                    value={value}
                    checked={checked}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <Icon className="size-5" aria-hidden="true" />
                  <span className="mt-3 block text-sm leading-tight font-bold">{title}</span>
                  <span className="mt-0.5 block text-xs text-cocoa-soft">{text}</span>
                  {checked && (
                    <motion.span
                      layoutId="role-check"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      className="absolute top-3 right-3 grid size-5 place-items-center rounded-full bg-cocoa text-white"
                    >
                      <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                    </motion.span>
                  )}
                </label>
              );
            })}
          </div>
        </fieldset>

        <TextField
          label="Username"
          name="username"
          icon={UserRound}
          placeholder="Il tuo username"
          autoComplete="username"
          value={form.username}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          icon={Mail}
          placeholder="nome@email.com"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          icon={KeyRound}
          placeholder="Almeno 6 caratteri"
          autoComplete="new-password"
          value={form.password}
          onChange={handleChange}
        />

        <FormMessage type="error">{error}</FormMessage>
        <FormMessage type="success">{success}</FormMessage>

        <Button type="submit" size="lg" className="w-full" loading={loading} disabled={isDisabled}>
          {loading ? "Creazione account..." : "Crea account"}
        </Button>
      </form>
    </AuthLayout>
  );
}

export default RegisterPage;
