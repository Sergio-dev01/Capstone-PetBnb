import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { TriangleAlert } from "lucide-react";
import Button from "./Button";

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Conferma",
  cancelLabel = "Annulla",
  loading = false,
  onConfirm,
  onClose,
}) {
  const titleId = useId();
  const descId = useId();
  const cancelRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  // Mantiene il testo visibile durante l'animazione di chiusura
  const lastDescription = useRef(description);
  if (open) lastDescription.current = description;

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onCloseRef.current();
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    cancelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <div key="confirm-dialog" className="fixed inset-0 z-[100] grid place-items-center p-4">
          <motion.div
            className="absolute inset-0 bg-cocoa/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-lift"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
          >
            <div className="grid size-12 place-items-center rounded-2xl bg-tongue/10 text-tongue">
              <TriangleAlert className="size-6" aria-hidden="true" />
            </div>
            <h2 id={titleId} className="mt-4 text-xl font-bold tracking-tight">
              {title}
            </h2>
            <p id={descId} className="mt-1.5 text-cocoa-soft">
              {lastDescription.current}
            </p>
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button ref={cancelRef} variant="outline" onClick={onClose}>
                {cancelLabel}
              </Button>
              <Button variant="dangerSolid" onClick={onConfirm} loading={loading}>
                {confirmLabel}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
