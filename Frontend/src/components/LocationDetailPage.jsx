import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import { ArrowLeft, Building2, MapPin, PawPrint, SearchX } from "lucide-react";
import Button from "./ui/Button";
import Badge from "./ui/Badge";
import Avatar from "./ui/Avatar";
import Skeleton from "./ui/Skeleton";
import EmptyState from "./ui/EmptyState";
import DateRangePicker from "./ui/DateRangePicker";
import { stayGallery } from "../lib/images";
import { formatDate, formatPrice, nightsBetween, pluralNights, toISODate } from "../lib/format";
import { cn } from "../lib/utils";

function DateBox({ label, value, active }) {
  return (
    <div className={cn("rounded-2xl px-4 py-3 transition-colors", active ? "bg-sun-soft" : "bg-canvas")}>
      <p className="text-xs font-semibold text-cocoa-soft">{label}</p>
      <p className={cn("mt-0.5 font-semibold", !value && "text-cocoa-soft/70")}>{value || "Scegli"}</p>
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6" aria-busy="true">
      <Skeleton className="h-9 w-28 rounded-full" />
      <Skeleton className="mt-8 h-12 w-2/3 max-w-md" />
      <Skeleton className="mt-3 h-5 w-48" />
      <Skeleton className="mt-8 h-[260px] rounded-[2rem] sm:h-[440px]" />
    </div>
  );
}

export default function LocationDetailPage() {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [bookingDates, setBookingDates] = useState({ startDate: "", endDate: "" });
  const [range, setRange] = useState();
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const token = localStorage.getItem("accessToken");

    fetch(`http://localhost:3001/locations/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore nel recupero location");
        return res.json();
      })
      .then(setLocation)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const nights = nightsBetween(range?.from, range?.to);

  const handleRangeChange = (next) => {
    setRange(next);
    setBookingDates({ startDate: toISODate(next?.from), endDate: toISODate(next?.to) });
  };

  const handleBooking = async () => {
    if (!bookingDates.startDate || !bookingDates.endDate || nights < 1) {
      toast.error("Scegli le date di arrivo e di partenza dal calendario.");
      return;
    }

    const token = localStorage.getItem("accessToken");
    setSubmitting(true);
    try {
      const res = await fetch("http://localhost:3001/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          locationId: parseInt(id),
          startDate: bookingDates.startDate,
          endDate: bookingDates.endDate,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Errore nella prenotazione.");
      }

      toast.success("Prenotazione creata!", {
        description: `${location.nome}, ${pluralNights(nights)}.`,
        action: { label: "Vedi prenotazioni", onClick: () => navigate("/bookings") },
      });
      handleRangeChange(undefined);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <DetailSkeleton />;

  if (error || !location) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24">
        <EmptyState
          icon={SearchX}
          title={error ? "Non riusciamo a caricare questa location" : "Nessuna location trovata."}
          description={error ? "Controlla di aver effettuato l'accesso e riprova." : undefined}
          action={
            <Button to="/locations" variant="outline">
              Torna alle location
            </Button>
          }
        />
      </div>
    );
  }

  const gallery = stayGallery(location);

  return (
    <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
      <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="-ml-3">
        <ArrowLeft aria-hidden="true" /> Torna indietro
      </Button>

      {/* TITOLO */}
      <header className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-4xl leading-[1] font-extrabold tracking-[-0.035em] sm:text-6xl">{location.nome}</h1>
          <p className="mt-3 flex items-center gap-1.5 text-lg text-cocoa-soft">
            <MapPin className="size-5" aria-hidden="true" />
            {location.indirizzo}, {location.citta}
          </p>
        </div>
        <Badge tone="sun" className="self-start px-3 py-1.5 text-sm sm:self-auto">
          <PawPrint aria-hidden="true" /> Pet-friendly
        </Badge>
      </header>

      {/* GALLERIA */}
      <div className="mt-8 grid h-[280px] grid-cols-3 grid-rows-2 gap-2 overflow-hidden rounded-[2rem] sm:h-[460px]">
        {gallery.map((src, i) => (
          <motion.div
            key={src}
            className={cn("overflow-hidden bg-sky-soft", i === 0 ? "col-span-3 row-span-2 md:col-span-2" : "hidden md:block")}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={src} alt={i === 0 ? location.nome : ""} className="size-full object-cover" />
          </motion.div>
        ))}
      </div>

      {/* CONTENUTO */}
      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_400px] lg:gap-16">
        <div>
          {location.host?.username && (
            <>
              <div className="flex items-center gap-4">
                <Avatar name={location.host.username} className="size-14 text-lg" />
                <div>
                  <p className="text-lg font-bold">Ospitato da {location.host.username}</p>
                  <p className="text-cocoa-soft">Host su PetBnb</p>
                </div>
              </div>
              <hr className="my-8 border-line" />
            </>
          )}

          <h2 className="text-2xl font-extrabold tracking-tight">La struttura</h2>
          <p className="mt-3 max-w-prose text-lg leading-relaxed text-cocoa-soft">{location.descrizione}</p>

          <hr className="my-8 border-line" />

          <h2 className="text-2xl font-extrabold tracking-tight">Dove si trova</h2>
          <div className="mt-4 flex items-center gap-4 rounded-3xl bg-sky-soft p-5">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white text-sky-deep">
              <MapPin className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-semibold">{location.indirizzo}</p>
              <p className="text-cocoa-soft">{location.citta}</p>
            </div>
          </div>
        </div>

        {/* PRENOTAZIONE */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[2rem] bg-white p-5 shadow-lift ring-1 ring-cocoa/[0.08] sm:p-6">
            <p className="flex items-baseline gap-1.5">
              <span className="font-display text-3xl font-extrabold tracking-tight">{formatPrice(location.prezzoPerNotte)}</span>
              <span className="text-cocoa-soft">a notte</span>
            </p>

            {user?.role !== "HOST" ? (
              <>
                <div className="mt-5 grid grid-cols-2 gap-2">
                  <DateBox label="Arrivo" value={range?.from && formatDate(range.from, "EEE d MMM")} active={!range?.from} />
                  <DateBox
                    label="Partenza"
                    value={range?.to && nights > 0 && formatDate(range.to, "EEE d MMM")}
                    active={range?.from && !(range?.to && nights > 0)}
                  />
                </div>

                <div className="mt-3 flex justify-center">
                  <DateRangePicker value={range} onChange={handleRangeChange} />
                </div>

                <AnimatePresence initial={false}>
                  {nights > 0 && (
                    <motion.dl
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="flex justify-between pt-2 text-cocoa-soft">
                        <dt>
                          {formatPrice(location.prezzoPerNotte)} × {pluralNights(nights)}
                        </dt>
                        <dd>{formatPrice(location.prezzoPerNotte * nights)}</dd>
                      </div>
                      <div className="mt-3 flex justify-between border-t border-line pt-3 text-lg font-bold">
                        <dt>Totale</dt>
                        <dd>{formatPrice(location.prezzoPerNotte * nights)}</dd>
                      </div>
                    </motion.dl>
                  )}
                </AnimatePresence>

                <Button size="lg" className="mt-5 w-full" onClick={handleBooking} loading={submitting}>
                  {nights > 0 ? "Prenota ora" : "Scegli le date"}
                </Button>
                <p className="mt-3 text-center text-sm text-cocoa-soft">
                  Puoi modificare o cancellare la prenotazione dalla tua area.
                </p>
              </>
            ) : (
              <div className="mt-5 flex gap-3 rounded-2xl bg-canvas p-4 text-sm text-cocoa-soft">
                <Building2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                Stai visualizzando la location come host: le prenotazioni sono riservate ai viaggiatori.
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
