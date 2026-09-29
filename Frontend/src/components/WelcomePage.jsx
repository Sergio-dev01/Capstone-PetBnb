import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Building2, CalendarDays, Compass, Inbox, Plus, UserRound } from "lucide-react";
import Button from "./ui/Button";
import Badge from "./ui/Badge";
import EmptyState from "./ui/EmptyState";
import SpotlightCard from "./ui/SpotlightCard";
import Carousel from "./ui/Carousel";
import { PET_PHOTOS, WELCOME_SLIDES } from "../lib/images";
import { bookingStatus, formatRange } from "../lib/format";

const ROLE_LABEL = { USER: "Viaggiatore", HOST: "Host" };

const bento = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.15 + i * 0.07, ease: [0.22, 1, 0.36, 1] } }),
};

function CardIcon({ Icon, className }) {
  return (
    <span className={`relative grid size-12 place-items-center rounded-2xl ${className}`}>
      <Icon className="size-5" aria-hidden="true" />
    </span>
  );
}

function WelcomePage() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Prenotazioni per la card riepilogo: le proprie (USER) o quelle ricevute (HOST)
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!user || !token) return;
    const endpoint = user.role === "HOST" ? "bookings/host" : "bookings/me";
    fetch(`http://localhost:3001/${endpoint}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setBookings(Array.isArray(data) ? data : []))
      .catch(() => setBookings([]));
  }, [user]);

  if (!user) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24">
        <EmptyState
          icon={UserRound}
          title="Accedi per continuare"
          description="Non abbiamo trovato una sessione attiva su questo dispositivo."
          action={<Button to="/login">Vai al login</Button>}
        />
      </div>
    );
  }

  const isHost = user.role === "HOST";
  const upcoming = (bookings || [])
    .filter((b) => bookingStatus(b.startDate, b.endDate) !== "past")
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
  const nextStay = upcoming[0];

  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 pb-8 sm:px-6 sm:pt-14">
      {/* SALUTO */}
      <section className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <motion.div variants={bento} initial="hidden" animate="show" custom={0}>
          <Badge tone="sun" className="mb-5">
            Registrato come {ROLE_LABEL[user.role] || user.role}
          </Badge>
          <h1 className="text-5xl leading-[0.95] font-extrabold tracking-[-0.04em] sm:text-7xl">
            Ciao, {user.username}
          </h1>
          <p className="mt-4 max-w-lg text-lg text-cocoa-soft">
            {isHost
              ? "Da qui gestisci le tue location e tieni d'occhio le prenotazioni in arrivo."
              : "Trova o gestisci locations pet-friendly in tutta Italia."}
          </p>
        </motion.div>
        <motion.img
          src={PET_PHOTOS.golden.replace("w=900", "w=240")}
          alt=""
          className="hidden size-28 rounded-full object-cover ring-[6px] ring-cocoa sm:block"
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.3 }}
        />
      </section>

      {/* AZIONI */}
      <section aria-label="Cosa vuoi fare" className="mt-10 grid gap-4 md:grid-cols-3">
        <motion.div variants={bento} initial="hidden" animate="show" custom={1} className="md:col-span-2 md:row-span-2">
          <SpotlightCard to="/locations" className="h-full min-h-[320px] bg-cocoa" glow="rgb(255 193 7 / 0.3)">
            <img
              src={PET_PHOTOS.friends}
              alt=""
              className="absolute inset-0 size-full object-cover opacity-75 transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cocoa via-cocoa/30 to-transparent" />
            <div className="relative mt-auto p-7 sm:p-9">
              <CardIcon Icon={Compass} className="bg-sun text-cocoa" />
              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Esplora le location</h2>
              <p className="mt-2 max-w-md text-white/75">Scopri i migliori luoghi pet-friendly per te e il tuo amico.</p>
            </div>
          </SpotlightCard>
        </motion.div>

        {isHost ? (
          <>
            <motion.div variants={bento} initial="hidden" animate="show" custom={2}>
              <SpotlightCard to="/locations/add" className="h-full min-h-[200px] flex-col bg-sun p-7" glow="rgb(255 255 255 / 0.45)">
                <CardIcon Icon={Plus} className="bg-cocoa text-sun" />
                <h2 className="relative mt-auto pt-6 text-2xl font-extrabold tracking-tight text-cocoa">Aggiungi location</h2>
                <p className="relative mt-1 text-cocoa/70">Pubblica la tua struttura e condividi la tua casa pet-friendly.</p>
              </SpotlightCard>
            </motion.div>
            <motion.div variants={bento} initial="hidden" animate="show" custom={3}>
              <SpotlightCard to="/host/bookings" className="h-full min-h-[200px] flex-col bg-white p-7 ring-1 ring-cocoa/10">
                <CardIcon Icon={Inbox} className="bg-sky-soft text-sky-deep" />
                <h2 className="relative mt-auto pt-6 text-2xl font-extrabold tracking-tight text-cocoa">Prenotazioni ricevute</h2>
                <p className="relative mt-1 text-cocoa-soft">
                  {bookings === null
                    ? "Controlla le richieste dei tuoi ospiti in tempo reale."
                    : upcoming.length > 0
                      ? `${upcoming.length} ${upcoming.length === 1 ? "soggiorno in arrivo" : "soggiorni in arrivo"}. Il prossimo: ${nextStay.locationName}.`
                      : "Nessun soggiorno in arrivo al momento."}
                </p>
              </SpotlightCard>
            </motion.div>
            <motion.div variants={bento} initial="hidden" animate="show" custom={4} className="md:col-span-3">
              <SpotlightCard
                to="/host/locations"
                className="items-center gap-5 bg-white p-6 ring-1 ring-cocoa/10 sm:p-7"
                glow="rgb(169 218 248 / 0.45)"
              >
                <CardIcon Icon={Building2} className="bg-sun-soft text-cocoa" />
                <div className="relative">
                  <h2 className="text-2xl font-extrabold tracking-tight text-cocoa">Le mie location</h2>
                  <p className="mt-1 text-cocoa-soft">Rivedi gli annunci che hai pubblicato e come appaiono agli ospiti.</p>
                </div>
              </SpotlightCard>
            </motion.div>
          </>
        ) : (
          <>
            <motion.div variants={bento} initial="hidden" animate="show" custom={2}>
              <SpotlightCard to="/bookings" className="h-full min-h-[200px] flex-col bg-sun p-7" glow="rgb(255 255 255 / 0.45)">
                <CardIcon Icon={CalendarDays} className="bg-cocoa text-sun" />
                <h2 className="relative mt-auto pt-6 text-2xl font-extrabold tracking-tight text-cocoa">Le mie prenotazioni</h2>
                <p className="relative mt-1 text-cocoa/70">
                  {nextStay
                    ? `Prossimo soggiorno: ${nextStay.locationName}, ${formatRange(nextStay.startDate, nextStay.endDate)}.`
                    : "Gestisci e controlla i tuoi soggiorni in modo semplice."}
                </p>
              </SpotlightCard>
            </motion.div>
            <motion.div variants={bento} initial="hidden" animate="show" custom={3}>
              <SpotlightCard
                to="/users/me"
                className="h-full min-h-[200px] flex-col bg-white p-7 ring-1 ring-cocoa/10"
                glow="rgb(169 218 248 / 0.45)"
              >
                <CardIcon Icon={UserRound} className="bg-sky-soft text-sky-deep" />
                <h2 className="relative mt-auto pt-6 text-2xl font-extrabold tracking-tight text-cocoa">Il tuo profilo</h2>
                <p className="relative mt-1 text-cocoa-soft">Aggiorna username, email e password.</p>
              </SpotlightCard>
            </motion.div>
          </>
        )}
      </section>

      {/* CAROSELLO */}
      <section className="mt-24">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Scopri PetBnb</h2>
        <Carousel slides={WELCOME_SLIDES} className="mt-6 aspect-[4/5] sm:aspect-[16/8]" />
      </section>
    </div>
  );
}

export default WelcomePage;
