import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, CircleAlert, CircleCheck } from "lucide-react";
import Logo from "./ui/Logo";
import { cn } from "../lib/utils";

// Struttura condivisa da Login e Register: form a sinistra, foto a destra
export default function AuthLayout({ title, subtitle, photo, photoAlt, photoBg, aside, children, footer }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1fr_1.05fr]">
      <div className="flex flex-col px-5 py-5 sm:px-10">
        <div className="flex items-center justify-between">
          <Logo />
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-cocoa-soft no-underline transition hover:bg-cocoa/[0.05] hover:text-cocoa"
          >
            <ArrowLeft className="size-4" aria-hidden="true" /> Home
          </Link>
        </div>

        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-12">
          <h1 className="text-4xl leading-tight font-extrabold tracking-[-0.03em] sm:text-[2.75rem]">{title}</h1>
          <p className="mt-2 text-lg text-cocoa-soft">{subtitle}</p>
          <div className="mt-9">{children}</div>
          {footer && <div className="mt-8 text-center text-sm text-cocoa-soft">{footer}</div>}
        </div>
      </div>

      <div className="relative hidden p-3 lg:block">
        <div className={cn("relative h-full overflow-hidden rounded-[2rem]", photoBg)}>
          <motion.img
            src={photo}
            alt={photoAlt}
            className="absolute inset-0 size-full object-cover"
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-cocoa/45 to-transparent" />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-8 bottom-8 left-8 max-w-md rounded-3xl bg-white/85 p-6 shadow-lift backdrop-blur-xl"
          >
            {aside}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function FormMessage({ type = "error", children }) {
  const Icon = type === "error" ? CircleAlert : CircleCheck;
  return (
    <AnimatePresence initial={false}>
      {children && (
        <motion.div
          key={String(children)}
          role={type === "error" ? "alert" : "status"}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto", x: type === "error" ? [0, -6, 6, -3, 3, 0] : 0 }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.35 }}
          className="overflow-hidden"
        >
          <p
            className={cn(
              "flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium",
              type === "error" ? "bg-tongue/10 text-tongue" : "bg-moss-soft text-moss",
            )}
          >
            <Icon className="size-4 shrink-0" aria-hidden="true" />
            {children}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
