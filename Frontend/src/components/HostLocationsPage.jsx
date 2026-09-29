import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { CircleAlert, Plus } from "lucide-react";
import LocationCard, { LocationCardSkeleton } from "./LocationCard";
import Button from "./ui/Button";
import PageHeader from "./ui/PageHeader";

function HostLocationsPage() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    fetch("http://localhost:3001/locations/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore durante il recupero delle location");
        return res.json();
      })
      .then((data) => {
        setLocations(data);
      })
      .catch((err) => setErrorMsg(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 pb-8 sm:px-6 sm:pt-14">
      <PageHeader
        title="Le mie location"
        description={
          loading || errorMsg
            ? "Gli annunci che hai pubblicato su PetBnb."
            : locations.length === 0
              ? "Non hai ancora creato nessuna location."
              : `${locations.length} ${locations.length === 1 ? "annuncio pubblicato" : "annunci pubblicati"}.`
        }
        actions={
          <Button to="/locations/add">
            <Plus aria-hidden="true" /> Nuova location
          </Button>
        }
      />

      {errorMsg && (
        <p role="alert" className="mt-8 flex items-center gap-2 rounded-2xl bg-tongue/10 px-4 py-3 font-medium text-tongue">
          <CircleAlert className="size-4 shrink-0" aria-hidden="true" /> {errorMsg}
        </p>
      )}

      <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 3 }, (_, i) => (
              <li key={i}>
                <LocationCardSkeleton />
              </li>
            ))
          : locations.map((loc, i) => (
              <motion.li
                key={loc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: Math.min(i, 8) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <LocationCard location={loc} to={`/locations/${loc.id}`} />
              </motion.li>
            ))}

        {!loading && !errorMsg && (
          <li>
            <Link
              to="/locations/add"
              className="group flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-cocoa/15 text-cocoa no-underline transition hover:border-cocoa/40 hover:bg-white"
            >
              <span className="grid size-14 place-items-center rounded-full bg-sun shadow-[inset_0_-3px_0_rgb(31_8_2/0.16)] transition-transform duration-300 group-hover:rotate-90">
                <Plus className="size-6" aria-hidden="true" />
              </span>
              <span className="font-display text-lg font-bold">Aggiungi una location</span>
              <span className="text-sm text-cocoa-soft">Ci vogliono pochi minuti</span>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default HostLocationsPage;
