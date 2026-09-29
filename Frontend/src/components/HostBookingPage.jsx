import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { CalendarDays, Inbox } from "lucide-react";
import Avatar from "./ui/Avatar";
import Badge from "./ui/Badge";
import Button from "./ui/Button";
import PageHeader from "./ui/PageHeader";
import EmptyState from "./ui/EmptyState";
import Skeleton from "./ui/Skeleton";
import { STATUS_LABEL, bookingStatus, formatRange, nightsBetween, pluralNights } from "../lib/format";

const STATUS_TONE = { upcoming: "sky", ongoing: "moss", past: "neutral" };

function Stat({ label, value, className }) {
  return (
    <div className={`rounded-3xl p-5 sm:p-6 ${className}`}>
      <p className="font-display text-4xl font-extrabold tracking-tight tabular-nums sm:text-5xl">{value}</p>
      <p className="mt-1 text-sm font-medium opacity-75">{label}</p>
    </div>
  );
}

function HostBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("http://localhost:3001/bookings/host", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setBookings(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Prima i soggiorni futuri (dal più vicino), poi quelli conclusi (dal più recente)
  const all = bookings
    .map((b) => ({ ...b, status: bookingStatus(b.startDate, b.endDate), nights: nightsBetween(b.startDate, b.endDate) }))
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
  const active = all.filter((b) => b.status !== "past");
  const rows = [...active, ...all.filter((b) => b.status === "past").reverse()];
  const upcomingCount = active.length;
  const guestCount = new Set(rows.map((b) => b.username)).size;

  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 pb-8 sm:px-6 sm:pt-14">
      <PageHeader title="Prenotazioni ricevute" description="Ecco tutte le prenotazioni per le tue location." />

      {loading ? (
        <div className="mt-10 space-y-3">
          <Skeleton className="h-28 rounded-3xl" />
          <Skeleton className="h-64 rounded-3xl" />
        </div>
      ) : bookings.length === 0 ? (
        <EmptyState
          className="mt-10"
          icon={Inbox}
          title="Nessuna prenotazione trovata."
          description="Quando un viaggiatore prenota una delle tue location, la vedi qui."
          action={
            <Button to="/host/locations" variant="outline">
              Vai alle tue location
            </Button>
          }
        />
      ) : (
        <>
          <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
            <Stat label="Prenotazioni totali" value={rows.length} className="bg-cocoa text-white" />
            <Stat label="In arrivo o in corso" value={upcomingCount} className="bg-sun text-cocoa" />
            <Stat label="Ospiti diversi" value={guestCount} className="bg-sky text-cocoa" />
          </div>

          <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-cocoa/[0.07]">
            <div className="hidden grid-cols-[1.2fr_1.4fr_1.3fr_0.6fr_0.8fr] gap-4 border-b border-line px-6 py-4 text-sm font-semibold text-cocoa-soft md:grid">
              <span>Ospite</span>
              <span>Location</span>
              <span>Date</span>
              <span>Notti</span>
              <span className="text-right">Stato</span>
            </div>
            <ul className="divide-y divide-line">
              {rows.map((b, i) => (
                <motion.li
                  key={b.bookingId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(i, 10) * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-1 px-5 py-4 transition-colors hover:bg-canvas md:grid-cols-[1.2fr_1.4fr_1.3fr_0.6fr_0.8fr] md:px-6"
                >
                  <div className="row-span-2 flex items-center gap-3 md:row-span-1">
                    <Avatar name={b.username} />
                    <span className="hidden font-semibold md:inline">{b.username}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold md:hidden">{b.username}</p>
                    <Link
                      to={`/locations/${b.locationId}`}
                      className="block truncate text-sm text-cocoa-soft no-underline hover:text-cocoa md:text-base md:font-medium md:text-cocoa"
                    >
                      {b.locationName}
                    </Link>
                  </div>
                  <p className="col-start-2 flex items-center gap-1.5 text-sm text-cocoa-soft md:col-start-auto md:text-base md:text-cocoa">
                    <CalendarDays className="size-4 md:hidden" aria-hidden="true" />
                    {formatRange(b.startDate, b.endDate)}
                    <span className="md:hidden">, {pluralNights(b.nights)}</span>
                  </p>
                  <p className="hidden tabular-nums md:block">{b.nights}</p>
                  <div className="col-start-3 row-span-2 row-start-1 text-right md:col-start-auto md:row-span-1 md:row-start-auto">
                    <Badge tone={STATUS_TONE[b.status]} dot>
                      {STATUS_LABEL[b.status]}
                    </Badge>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default HostBookingsPage;
