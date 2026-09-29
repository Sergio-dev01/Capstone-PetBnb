import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import { CalendarDays, CalendarX2, CircleAlert, Moon, Pencil, Trash2 } from "lucide-react";
import Button from "./ui/Button";
import Badge from "./ui/Badge";
import PageHeader from "./ui/PageHeader";
import EmptyState from "./ui/EmptyState";
import Skeleton from "./ui/Skeleton";
import SegmentedControl from "./ui/SegmentedControl";
import ConfirmDialog from "./ui/ConfirmDialog";
import DateRangePicker from "./ui/DateRangePicker";
import { stayImage } from "../lib/images";
import {
  STATUS_LABEL,
  bookingStatus,
  formatRange,
  fromISODate,
  nightsBetween,
  pluralNights,
  toISODate,
} from "../lib/format";

const STATUS_TONE = { upcoming: "sky", ongoing: "moss", past: "neutral" };

function BookingPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBookingId, setEditingBookingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ startDate: "", endDate: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [filter, setFilter] = useState("all");
  const [pendingDelete, setPendingDelete] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchBookings = () => {
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("http://localhost:3001/bookings/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBookings(data);
        } else {
          setBookings([]);
        }
      })
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  };

  const handleEditClick = (booking) => {
    setEditingBookingId(booking.bookingId);
    setEditFormData({
      startDate: booking.startDate,
      endDate: booking.endDate,
    });
    setErrorMsg("");
  };

  const handleCancelEdit = () => {
    setEditingBookingId(null);
    setEditFormData({ startDate: "", endDate: "" });
  };

  const handleRangeChange = (range) => {
    setEditFormData({ startDate: toISODate(range?.from), endDate: toISODate(range?.to) });
  };

  const handleUpdate = async (bookingId) => {
    setSaving(true);
    try {
      const response = await fetch(`http://localhost:3001/bookings/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editFormData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Errore durante l'aggiornamento");
      }

      setEditingBookingId(null);
      toast.success("Date aggiornate");
      fetchBookings();
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (bookingId) => {
    setDeleting(true);
    try {
      const response = await fetch(`http://localhost:3001/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Errore durante la cancellazione");
      }

      toast.success("Prenotazione cancellata");
      fetchBookings();
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setDeleting(false);
      setPendingDelete(null);
      setEditingBookingId(null);
    }
  };

  const withStatus = bookings
    .map((b) => ({ ...b, status: bookingStatus(b.startDate, b.endDate) }))
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
  const active = withStatus.filter((b) => b.status !== "past");
  const past = withStatus.filter((b) => b.status === "past").reverse();
  const visible = filter === "upcoming" ? active : filter === "past" ? past : [...active, ...past];

  return (
    <div className="mx-auto max-w-4xl px-4 pt-10 pb-8 sm:px-6 sm:pt-14">
      <PageHeader
        title="Le mie prenotazioni"
        description={
          active.length > 0
            ? `${active.length} ${active.length === 1 ? "soggiorno in arrivo" : "soggiorni in arrivo"}.`
            : "Tutti i tuoi soggiorni, passati e futuri."
        }
      />

      {bookings.length > 0 && (
        <SegmentedControl
          className="mt-8"
          label="Filtra prenotazioni"
          value={filter}
          onChange={setFilter}
          options={[
            { value: "all", label: "Tutte", count: withStatus.length },
            { value: "upcoming", label: "In arrivo", count: active.length },
            { value: "past", label: "Concluse", count: past.length },
          ]}
        />
      )}

      <AnimatePresence>
        {errorMsg && (
          <motion.p
            role="alert"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 flex items-center gap-2 rounded-2xl bg-tongue/10 px-4 py-3 font-medium text-tongue"
          >
            <CircleAlert className="size-4 shrink-0" aria-hidden="true" /> {errorMsg}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="mt-8">
        {loading ? (
          <div className="space-y-4">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-36 rounded-3xl" />
            ))}
          </div>
        ) : visible.length === 0 ? (
          <EmptyState
            icon={CalendarX2}
            title={bookings.length === 0 ? "Nessuna prenotazione trovata" : "Niente da mostrare qui"}
            description={
              bookings.length === 0
                ? "Quando prenoti una location, la trovi qui con date e dettagli."
                : "Non ci sono prenotazioni in questa sezione."
            }
            action={bookings.length === 0 && <Button to="/locations">Esplora le location</Button>}
          />
        ) : (
          <motion.ul layout className="space-y-4">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((b) => {
                const isEditing = editingBookingId === b.bookingId;
                const editRange = {
                  from: fromISODate(editFormData.startDate),
                  to: fromISODate(editFormData.endDate),
                };
                const editNights = nightsBetween(editFormData.startDate, editFormData.endDate);

                return (
                  <motion.li
                    key={b.bookingId}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-cocoa/[0.07]"
                  >
                    <div className="flex flex-col gap-4 p-3 sm:flex-row sm:items-center sm:p-4">
                      <Link to={`/locations/${b.locationId}`} className="shrink-0">
                        <img
                          src={stayImage(b.locationId, { width: 400 })}
                          alt=""
                          className="h-40 w-full rounded-2xl object-cover sm:h-28 sm:w-40"
                          loading="lazy"
                        />
                      </Link>

                      <div className="min-w-0 flex-1 px-1 sm:px-0">
                        <Badge tone={STATUS_TONE[b.status]} dot>
                          {STATUS_LABEL[b.status]}
                        </Badge>
                        <h2 className="mt-2 truncate text-xl font-bold tracking-tight">
                          <Link to={`/locations/${b.locationId}`} className="text-cocoa no-underline hover:underline">
                            {b.locationName}
                          </Link>
                        </h2>
                        <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-cocoa-soft">
                          <span className="inline-flex items-center gap-1.5">
                            <CalendarDays className="size-4" aria-hidden="true" />
                            {formatRange(b.startDate, b.endDate)}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Moon className="size-4" aria-hidden="true" />
                            {pluralNights(nightsBetween(b.startDate, b.endDate))}
                          </span>
                        </p>
                      </div>

                      {!isEditing && (
                        <div className="flex gap-2 px-1 pb-1 sm:px-0 sm:pb-0">
                          <Button variant="outline" size="sm" onClick={() => handleEditClick(b)} className="flex-1 sm:flex-none">
                            <Pencil aria-hidden="true" /> Modifica
                          </Button>
                          <Button
                            variant="danger"
                            size="iconSm"
                            onClick={() => setPendingDelete(b)}
                            aria-label={`Elimina la prenotazione per ${b.locationName}`}
                          >
                            <Trash2 aria-hidden="true" />
                          </Button>
                        </div>
                      )}
                    </div>

                    <AnimatePresence initial={false}>
                      {isEditing && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <div className="mx-3 mb-3 flex flex-col gap-6 rounded-2xl bg-canvas p-4 sm:mx-4 sm:mb-4 md:flex-row md:items-start md:p-6">
                            <DateRangePicker value={editRange} onChange={handleRangeChange} className="self-center md:self-auto" />
                            <div className="flex-1">
                              <h3 className="text-lg font-bold">Cambia le date</h3>
                              <p className="mt-1 text-cocoa-soft">
                                {editNights > 0
                                  ? `Date selezionate: ${formatRange(editFormData.startDate, editFormData.endDate)}, ${pluralNights(editNights)}.`
                                  : "Seleziona sul calendario il giorno di arrivo e quello di partenza."}
                              </p>
                              <div className="mt-6 flex flex-wrap gap-2">
                                <Button
                                  onClick={() => handleUpdate(b.bookingId)}
                                  loading={saving}
                                  disabled={editNights < 1}
                                >
                                  Salva
                                </Button>
                                <Button variant="outline" onClick={handleCancelEdit}>
                                  Annulla
                                </Button>
                                <Button variant="danger" onClick={() => setPendingDelete(b)} className="sm:ml-auto">
                                  <Trash2 aria-hidden="true" /> Elimina
                                </Button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </motion.ul>
        )}
      </div>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Cancellare la prenotazione?"
        description={
          pendingDelete
            ? `Il soggiorno a ${pendingDelete.locationName} (${formatRange(pendingDelete.startDate, pendingDelete.endDate)}) verrà cancellato. L'operazione non si può annullare.`
            : ""
        }
        confirmLabel="Cancella prenotazione"
        cancelLabel="Mantieni"
        loading={deleting}
        onConfirm={() => handleDelete(pendingDelete.bookingId)}
        onClose={() => setPendingDelete(null)}
      />
    </div>
  );
}

export default BookingPage;
