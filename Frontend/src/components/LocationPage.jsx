import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Euro, KeyRound, MapPin, SearchX, X } from "lucide-react";
import LocationCard, { LocationCardSkeleton } from "./LocationCard";
import Button from "./ui/Button";
import EmptyState from "./ui/EmptyState";
import { cn } from "../lib/utils";

function LocationPage() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cityFilter, setCityFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("http://localhost:3001/locations", {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject("Errore server")))
      .then((data) => (Array.isArray(data) ? setLocations(data) : setLocations([])))
      .catch((err) => {
        console.error(err);
        setLocations([]);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const filteredLocations = locations.filter((loc) => {
    const matchesCity = loc.citta.toLowerCase().includes(cityFilter.toLowerCase());
    const matchesPrice = priceFilter === "" || loc.prezzoPerNotte <= parseFloat(priceFilter);
    return matchesCity && matchesPrice;
  });

  // Città uniche senza distinzione di maiuscole ("Bari" e "bari" diventano un solo chip)
  const cities = useMemo(() => {
    const byKey = new Map();
    for (const loc of locations) {
      const name = loc.citta?.trim();
      if (!name) continue;
      const key = name.toLowerCase();
      if (!byKey.has(key)) byKey.set(key, name.charAt(0).toUpperCase() + name.slice(1));
    }
    return [...byKey.values()].sort((a, b) => a.localeCompare(b, "it"));
  }, [locations]);
  const hasFilters = cityFilter !== "" || priceFilter !== "";

  const resetFilters = () => {
    setCityFilter("");
    setPriceFilter("");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 pb-8 sm:px-6 sm:pt-14">
      <header className="max-w-2xl">
        <h1 className="text-5xl leading-[0.95] font-extrabold tracking-[-0.04em] sm:text-6xl">
          Trova un posto
          <br />
          per voi due
        </h1>
        <p className="mt-4 text-lg text-cocoa-soft">Locations disponibili in tutta Italia, tutte pet-friendly.</p>
      </header>

      {/* RICERCA */}
      <div className="mt-10 flex flex-col gap-2 rounded-[1.75rem] bg-white p-2 shadow-soft ring-1 ring-cocoa/[0.08] sm:flex-row sm:items-center sm:rounded-full">
        <label className="flex flex-1 items-center gap-3 rounded-full px-5 py-3 transition focus-within:bg-canvas">
          <MapPin className="size-5 shrink-0 text-cocoa-soft" aria-hidden="true" />
          <span className="sr-only">Filtra per città</span>
          <input
            type="text"
            placeholder="Dove andate?"
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="w-full bg-transparent text-[0.95rem] font-medium placeholder:text-cocoa-soft/70 focus:outline-none"
          />
        </label>
        <span className="hidden h-8 w-px bg-line sm:block" aria-hidden="true" />
        <label className="flex items-center gap-3 rounded-full px-5 py-3 transition focus-within:bg-canvas sm:w-64">
          <Euro className="size-5 shrink-0 text-cocoa-soft" aria-hidden="true" />
          <span className="sr-only">Prezzo massimo per notte</span>
          <input
            type="number"
            min="0"
            placeholder="Prezzo massimo"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="w-full bg-transparent text-[0.95rem] font-medium placeholder:text-cocoa-soft/70 focus:outline-none"
          />
        </label>
        <AnimatePresence initial={false}>
          {hasFilters && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <Button variant="dark" onClick={resetFilters} className="w-full sm:w-auto">
                <X aria-hidden="true" /> Azzera
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CITTÀ RAPIDE */}
      {cities.length > 1 && (
        <div className="mt-5 flex flex-wrap gap-2" aria-label="Città disponibili">
          {cities.map((city) => {
            const active = cityFilter.toLowerCase() === city.toLowerCase();
            return (
              <button
                key={city}
                type="button"
                onClick={() => setCityFilter(active ? "" : city)}
                aria-pressed={active}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition",
                  active ? "bg-cocoa text-white" : "bg-white text-cocoa ring-1 ring-cocoa/10 hover:ring-cocoa/30",
                )}
              >
                {city}
              </button>
            );
          })}
        </div>
      )}

      {/* RISULTATI */}
      <div className="mt-10">
        {!loading && token && locations.length > 0 && (
          <p className="mb-5 text-sm font-medium text-cocoa-soft" aria-live="polite">
            {filteredLocations.length === 1 ? "1 location trovata" : `${filteredLocations.length} location trovate`}
          </p>
        )}

        {loading ? (
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => (
              <LocationCardSkeleton key={i} />
            ))}
          </div>
        ) : !token ? (
          <EmptyState
            icon={KeyRound}
            title="Accedi per vedere le location"
            description="Le location sono visibili ai membri della community. Registrarsi è gratis."
            action={
              <>
                <Button to="/login">Accedi</Button>
                <Button to="/register" variant="outline">
                  Crea un account
                </Button>
              </>
            }
          />
        ) : filteredLocations.length === 0 ? (
          <EmptyState
            icon={SearchX}
            title="Nessuna location trovata"
            description={hasFilters ? "Prova un'altra città o alza il prezzo massimo." : "Non ci sono ancora location pubblicate."}
            action={hasFilters && <Button onClick={resetFilters}>Azzera i filtri</Button>}
          />
        ) : (
          <motion.ul layout className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredLocations.map((loc, i) => (
                <motion.li
                  key={loc.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: Math.min(i, 8) * 0.05, ease: [0.22, 1, 0.36, 1] } }}
                  exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
                >
                  <LocationCard location={loc} to={`/locations/${loc.id}`} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </div>
    </div>
  );
}

export default LocationPage;
