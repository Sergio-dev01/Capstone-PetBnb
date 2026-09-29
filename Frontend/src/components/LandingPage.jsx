import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { BellRing, Check, PawPrint } from "lucide-react";
import Logo from "./ui/Logo";
import Button from "./ui/Button";
import RotatingText from "./ui/RotatingText";
import Marquee from "./ui/Marquee";
import PawCollage from "./PawCollage";
import { PET_PHOTOS, stayImage } from "../lib/images";

const PET_NAMES = ["Luna.", "Otto.", "Briciola.", "Pepe.", "Maya.", "Rocky."];
const CITIES = ["Milano", "Roma", "Torino", "Bolzano", "Napoli", "Firenze", "Bologna", "Venezia", "Genova", "Verona", "Bari", "Palermo"];

const STEPS = [
  {
    title: "Cerca",
    text: "Filtra per città e budget: trovi solo posti dove il tuo animale è il benvenuto.",
  },
  {
    title: "Prenota",
    text: "Scegli le date dal calendario e conferma. Puoi modificarle o cancellarle quando vuoi dalla tua area.",
  },
  {
    title: "Parti",
    text: "Arrivi, ti sistemi, e il tuo amico ha già un posto sul divano.",
  },
];

const HOST_PERKS = [
  "Decidi tu il prezzo per notte",
  "Pubblichi una nuova location in pochi minuti",
  "Vedi tutte le prenotazioni ricevute in un unico posto",
];

const heroItem = {
  hidden: { opacity: 0, y: 18 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] } }),
};

function LandingPage() {
  return (
    <div className="overflow-x-clip">
      {/* HEADER */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 pt-5 sm:px-6">
        <Logo />
        <nav aria-label="Accesso" className="flex items-center gap-1">
          <Link
            to="/locations"
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-cocoa-soft no-underline transition hover:text-cocoa md:block"
          >
            Esplora le location
          </Link>
          <Button to="/login" variant="ghost" size="sm">
            Accedi
          </Button>
          <Button to="/register" size="sm">
            Registrati
          </Button>
        </nav>
      </header>

      {/* HERO */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pt-12 pb-20 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pt-16 lg:pb-28">
        <div>
          <motion.h1
            variants={heroItem}
            initial="hidden"
            animate="show"
            custom={0}
            className="text-[clamp(3.1rem,8vw,6rem)] leading-[0.92] font-extrabold tracking-[-0.045em]"
          >
            Una casa
            <br />
            anche per
            <br />
            <RotatingText words={PET_NAMES} srLabel="il tuo animale." />
          </motion.h1>

          <motion.p
            variants={heroItem}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-7 max-w-[34rem] text-lg leading-relaxed text-cocoa-soft sm:text-xl"
          >
            Trova o offri ospitalità sicura e amorevole per i tuoi amici a quattro zampe. Stay pet-friendly in tutta
            Italia, con host che amano gli animali quanto te.
          </motion.p>

          <motion.div
            variants={heroItem}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Button to="/register" size="lg">
              Crea un account gratis
            </Button>
            <Button to="/login" variant="outline" size="lg">
              Ho già un account
            </Button>
          </motion.div>

          <motion.div
            variants={heroItem}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-10 flex items-center gap-4"
          >
            <div className="flex -space-x-3">
              {[PET_PHOTOS.gingerCat, PET_PHOTOS.beagle, PET_PHOTOS.pug, PET_PHOTOS.mintCat].map((src) => (
                <img
                  key={src}
                  src={src.replace("w=600", "w=96")}
                  alt=""
                  className="size-10 rounded-full object-cover ring-[3px] ring-canvas"
                />
              ))}
            </div>
            <p className="text-sm leading-snug text-cocoa-soft">
              Più di <span className="font-semibold text-cocoa">1000 pet lovers</span>
              <br />
              già nella community
            </p>
          </motion.div>
        </div>

        <PawCollage />
      </section>

      {/* CITTÀ */}
      <section aria-label="Città" className="border-y border-cocoa/10 bg-sun py-5">
        <Marquee duration={45} gap="2.5rem">
          {CITIES.map((city, i) => (
            <span key={city} className="flex items-center gap-10 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {city}
              <PawPrint className="size-6 text-cocoa/40" style={{ rotate: `${i % 2 ? 18 : -18}deg` }} aria-hidden="true" />
            </span>
          ))}
        </Marquee>
      </section>

      {/* COME FUNZIONA */}
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-24 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:py-32">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <h2 className="text-4xl leading-[1.02] font-extrabold tracking-[-0.035em] sm:text-5xl">
            Tre passi
            <br />e siete in viaggio
          </h2>
          <p className="mt-5 max-w-sm text-lg text-cocoa-soft">
            Niente telefonate per chiedere se gli animali sono ammessi: qui lo sono sempre.
          </p>
        </div>

        <ol className="divide-y divide-cocoa/10 border-y border-cocoa/10">
          {STEPS.map((step, i) => (
            <li key={step.title} className="grid grid-cols-[auto_1fr] gap-6 py-8 sm:gap-10 sm:py-10">
              <span className="grid size-14 place-items-center rounded-full bg-sun font-display text-2xl font-extrabold shadow-[inset_0_-3px_0_rgb(31_8_2/0.16)]">
                {i + 1}
              </span>
              <div>
                <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">{step.title}</h3>
                <p className="mt-2 max-w-md text-lg text-cocoa-soft">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* HOST */}
      <section className="px-3 sm:px-6">
        <div className="mx-auto grid max-w-6xl items-center gap-12 overflow-hidden rounded-[2.5rem] bg-cocoa px-6 py-14 text-white sm:px-12 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div>
            <h2 className="text-4xl leading-[1.02] font-extrabold tracking-[-0.035em] sm:text-5xl">
              Hai spazio per un ospite a quattro zampe?
            </h2>
            <p className="mt-5 max-w-md text-lg text-white/70">
              Condividi la tua casa con altri amanti degli animali e ricevi prenotazioni da chi viaggia con il proprio pet.
            </p>
            <ul className="mt-8 space-y-3">
              {HOST_PERKS.map((perk) => (
                <li key={perk} className="flex items-center gap-3 text-white/90">
                  <span className="grid size-6 place-items-center rounded-full bg-sun text-cocoa">
                    <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>
            <Button to="/register" size="lg" className="mt-10">
              Diventa host
            </Button>
          </div>

          <div className="relative">
            <img
              src={stayImage(6, { width: 1000 })}
              alt="Soggiorno luminoso con poltrona gialla"
              className="aspect-[4/3] w-full rounded-[2rem] object-cover"
              loading="lazy"
            />
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ type: "spring", stiffness: 220, damping: 22, delay: 0.2 }}
              className="absolute -bottom-6 left-4 flex max-w-[calc(100%-2rem)] items-center gap-3 rounded-2xl bg-white p-3 pr-5 text-cocoa shadow-lift sm:left-8"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-sun-soft">
                <BellRing className="size-5" aria-hidden="true" />
              </span>
              <span className="min-w-0 text-sm leading-snug">
                <span className="block font-semibold">Nuova prenotazione</span>
                <span className="block truncate text-cocoa-soft">Loft Urbano, 3 notti</span>
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA FINALE */}
      <section className="px-3 pt-24 sm:px-6">
        {/* La foto ha lo stesso azzurro del pannello: gli animali restano ai lati, il testo al centro */}
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-sky">
          <img
            src="/images/landingPage.jpg"
            alt=""
            className="absolute inset-y-0 left-0 hidden h-full w-[270px] object-cover object-left lg:block"
            loading="lazy"
          />
          <img
            src="/images/landingPage.jpg"
            alt=""
            className="absolute inset-y-0 right-0 hidden h-full w-[270px] object-cover object-right lg:block"
            loading="lazy"
          />
          <div className="relative mx-auto flex max-w-lg flex-col items-center px-6 pt-16 pb-8 text-center lg:py-24">
            <h2 className="text-4xl leading-[1.02] font-extrabold tracking-[-0.035em] sm:text-5xl">
              Il prossimo viaggio lo fate insieme.
            </h2>
            <p className="mt-4 text-lg text-cocoa/70">Registrarsi è gratis e richiede meno di un minuto.</p>
            <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
              <Button to="/register" variant="dark" size="lg">
                Registrati
              </Button>
              <Button to="/locations" variant="outline" size="lg" className="ring-0">
                Guarda le location
              </Button>
            </div>
          </div>
          <img
            src="/images/landingPage.jpg"
            alt="Cani e gatti che guardano verso la camera"
            className="h-64 w-full object-cover object-right sm:h-80 lg:hidden"
            loading="lazy"
          />
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
