import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import { AtSign, Hash, KeyRound, Mail, PawPrint, ShieldCheck, UserRound, UserRoundPen } from "lucide-react";
import Button from "./ui/Button";
import Badge from "./ui/Badge";
import Avatar from "./ui/Avatar";
import Skeleton from "./ui/Skeleton";
import EmptyState from "./ui/EmptyState";
import { TextField } from "./ui/Field";
import { FormMessage } from "./AuthLayout";

const ROLE_LABEL = { USER: "Viaggiatore", HOST: "Host" };

// Motivo a zampe per la copertina del profilo
const PAW_PATTERN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Cg fill='%231f0802' fill-opacity='0.07'%3E%3Ccircle cx='22' cy='20' r='4'/%3E%3Ccircle cx='32' cy='16' r='4'/%3E%3Ccircle cx='42' cy='20' r='4'/%3E%3Cpath d='M32 26c-7 0-12 7-12 12 0 4 3 6 6 6 2 0 4-1 6-1s4 1 6 1c3 0 6-2 6-6 0-5-5-12-12-12z'/%3E%3C/g%3E%3C/svg%3E\")";

function InfoRow({ icon: Icon, label, children }) {
  return (
    <div className="flex items-center gap-4 py-4">
      <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-canvas text-cocoa-soft">
        <Icon className="size-[1.1rem]" aria-hidden="true" />
      </span>
      <dt className="w-24 shrink-0 text-sm font-medium text-cocoa-soft">{label}</dt>
      <dd className="min-w-0 truncate font-semibold">{children}</dd>
    </div>
  );
}

function UserPage() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) return;
    fetch("http://localhost:3001/users/me", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => (res.ok ? res.json() : Promise.reject("Errore nel recupero utente")))
      .then((data) => {
        setUser(data);
        setFormData({ username: data.username || "", email: data.email || "", password: "" });
      })
      .catch((err) => console.error(err));
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSaving(true);
    try {
      const res = await fetch("http://localhost:3001/users/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          ...(formData.username && { username: formData.username }),
          ...(formData.email && { email: formData.email }),
          ...(formData.password && { password: formData.password }),
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Errore aggiornamento profilo");
      }
      const updated = await res.json();
      setUser(updated);
      setFormData((prev) => ({ ...prev, password: "" }));
      setIsEditing(false);
      toast.success("Profilo aggiornato con successo!");

      // Tiene allineati navbar e saluto con i nuovi dati
      const stored = JSON.parse(localStorage.getItem("user") || "null");
      if (stored) {
        localStorage.setItem("user", JSON.stringify({ ...stored, username: updated.username, email: updated.email }));
        window.dispatchEvent(new Event("userChanged"));
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({ username: user.username, email: user.email, password: "" });
    setIsEditing(false);
    setErrorMsg("");
  };

  if (!token) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24">
        <EmptyState
          icon={UserRound}
          title="Accedi per vedere il profilo"
          description="Il profilo è disponibile solo dopo il login."
          action={<Button to="/login">Vai al login</Button>}
        />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl px-4 pt-10 sm:px-6 sm:pt-14" aria-busy="true">
        <span className="sr-only">Caricamento in corso...</span>
        <Skeleton className="h-44 rounded-[2rem]" />
        <Skeleton className="mt-4 h-72 rounded-[2rem]" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pt-10 pb-8 sm:px-6 sm:pt-14">
      <div className="overflow-hidden rounded-[2rem] bg-white shadow-soft ring-1 ring-cocoa/[0.07]">
        {/* COPERTINA */}
        <div className="relative h-36 bg-sun sm:h-44" style={{ backgroundImage: PAW_PATTERN }}>
          <PawPrint className="absolute right-6 bottom-4 size-16 -rotate-12 text-cocoa/10" aria-hidden="true" />
        </div>

        <div className="px-5 pb-6 sm:px-8 sm:pb-8">
          <div className="flex items-end justify-between gap-4">
            <motion.div
              className="relative z-10 -mt-12"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              <Avatar name={user.username} className="size-24 text-3xl ring-[6px] ring-white" />
            </motion.div>
            <Badge tone={user.role === "HOST" ? "sun" : "sky"} className="px-3 py-1.5 text-sm">
              <ShieldCheck aria-hidden="true" /> {ROLE_LABEL[user.role] || user.role}
            </Badge>
          </div>
          <h1 className="mt-4 text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl">{user.username}</h1>
          <p className="text-cocoa-soft">{user.email}</p>

          <AnimatePresence mode="wait" initial={false}>
            {!isEditing ? (
              <motion.div
                key="view"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <dl className="mt-8 divide-y divide-line border-y border-line">
                  <InfoRow icon={Hash} label="ID">
                    {user.id}
                  </InfoRow>
                  <InfoRow icon={AtSign} label="Username">
                    {user.username}
                  </InfoRow>
                  <InfoRow icon={Mail} label="Email">
                    {user.email}
                  </InfoRow>
                  <InfoRow icon={ShieldCheck} label="Ruolo">
                    {user.role}
                  </InfoRow>
                </dl>

                <div className="mt-8 flex flex-wrap gap-2">
                  <Button variant="dark" onClick={() => setIsEditing(true)}>
                    <UserRoundPen aria-hidden="true" /> Modifica profilo
                  </Button>
                  <Button to="/welcome" variant="outline">
                    Torna alla home
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="edit"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="mt-8 space-y-5 border-t border-line pt-8"
              >
                <h2 className="text-xl font-extrabold tracking-tight">Modifica profilo</h2>

                <TextField
                  label="Username"
                  name="username"
                  icon={UserRound}
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="username"
                  required
                />
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  icon={Mail}
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
                <TextField
                  label="Nuova password"
                  name="password"
                  type="password"
                  icon={KeyRound}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Lascia vuoto se non vuoi cambiarla"
                  hint="Almeno 6 caratteri."
                  autoComplete="new-password"
                />

                <FormMessage type="error">{errorMsg}</FormMessage>

                <div className="flex flex-wrap gap-2 pt-2">
                  <Button type="submit" loading={saving}>
                    Salva modifiche
                  </Button>
                  <Button variant="outline" onClick={handleCancel}>
                    Annulla
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
