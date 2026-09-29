import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Building2, MapPin, Signpost } from "lucide-react";
import LocationCard from "./LocationCard";
import Button from "./ui/Button";
import PageHeader from "./ui/PageHeader";
import { Field, Input, Textarea, TextField } from "./ui/Field";

const DESCRIPTION_MAX = 255;

function AddLocationPage() {
  const [form, setForm] = useState({
    nome: "",
    indirizzo: "",
    citta: "",
    descrizione: "",
    prezzoPerNotte: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const token = localStorage.getItem("accessToken");
    try {
      const res = await fetch("http://localhost:3001/locations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...form, prezzoPerNotte: parseFloat(form.prezzoPerNotte) }),
      });

      if (res.ok) {
        toast.success("Location creata con successo!", { description: `${form.nome} ora è visibile ai viaggiatori.` });
        navigate("/host/locations");
      } else {
        toast.error("Errore nella creazione.", { description: "Controlla che tutti i campi siano compilati e riprova." });
      }
    } catch {
      toast.error("Errore di connessione al server");
    } finally {
      setSubmitting(false);
    }
  };

  const isComplete = form.nome && form.indirizzo && form.citta && form.descrizione && form.prezzoPerNotte;

  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 pb-8 sm:px-6 sm:pt-14">
      <PageHeader
        title="Aggiungi nuova location"
        description="Descrivi il posto che vuoi offrire: l'anteprima si aggiorna mentre scrivi."
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-14">
        <form onSubmit={handleSubmit} className="space-y-6 rounded-[2rem] bg-white p-5 shadow-soft ring-1 ring-cocoa/[0.07] sm:p-8">
          <TextField
            label="Nome"
            name="nome"
            icon={Building2}
            placeholder="Es. Casa Relax"
            value={form.nome}
            onChange={handleChange}
            required
          />

          <div className="grid gap-6 sm:grid-cols-2">
            <TextField
              label="Indirizzo"
              name="indirizzo"
              icon={Signpost}
              placeholder="Es. Via Roma 1"
              value={form.indirizzo}
              onChange={handleChange}
              required
            />
            <TextField
              label="Città"
              name="citta"
              icon={MapPin}
              placeholder="Es. Milano"
              value={form.citta}
              onChange={handleChange}
              required
            />
          </div>

          <Field
            label="Descrizione"
            htmlFor="descrizione"
            hint={`${form.descrizione.length}/${DESCRIPTION_MAX} caratteri. Racconta spazi, giardino e vicinanze.`}
          >
            <Textarea
              id="descrizione"
              name="descrizione"
              placeholder="Com'è la casa? Che spazi ha a disposizione il tuo ospite a quattro zampe?"
              value={form.descrizione}
              onChange={handleChange}
              maxLength={DESCRIPTION_MAX}
              required
            />
          </Field>

          <Field label="Prezzo per notte" htmlFor="prezzoPerNotte" className="sm:max-w-xs">
            <Input
              id="prezzoPerNotte"
              name="prezzoPerNotte"
              type="number"
              min="1"
              step="1"
              placeholder="80"
              suffix="€ / notte"
              value={form.prezzoPerNotte}
              onChange={handleChange}
              required
            />
          </Field>

          <div className="flex flex-col-reverse gap-2 border-t border-line pt-6 sm:flex-row sm:justify-end">
            <Button to="/host/locations" variant="outline" size="lg">
              Annulla
            </Button>
            <Button type="submit" size="lg" loading={submitting} disabled={!isComplete}>
              Crea location
            </Button>
          </div>
        </form>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <p className="mb-3 text-sm font-semibold text-cocoa-soft">Anteprima per i viaggiatori</p>
          <motion.div
            initial={{ opacity: 0, y: 16, rotate: -1.5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
            className="rounded-[2rem] bg-white p-3 pb-5 shadow-lift ring-1 ring-cocoa/[0.06]"
          >
            <LocationCard location={{ ...form, prezzoPerNotte: form.prezzoPerNotte || 0 }} />
          </motion.div>
        </aside>
      </div>
    </div>
  );
}

export default AddLocationPage;
