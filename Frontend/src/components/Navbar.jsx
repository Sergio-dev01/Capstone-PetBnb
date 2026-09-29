import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, LogOut, Menu, Plus, UserRound, X } from "lucide-react";
import Logo from "./ui/Logo";
import Button from "./ui/Button";
import Avatar from "./ui/Avatar";
import { useStoredUser } from "../lib/useStoredUser";
import { cn } from "../lib/utils";

function isActive(pathname, to) {
  if (to === "/locations") return pathname === "/locations" || /^\/locations\/\d+$/.test(pathname);
  return pathname === to;
}

function Navbar() {
  const location = useLocation();
  const user = useStoredUser();
  const role = user?.role || null;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileRef = useRef(null);

  // Chiude i menu quando si cambia pagina
  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!profileOpen) return;
    const onPointer = (e) => !profileRef.current?.contains(e.target) && setProfileOpen(false);
    const onKey = (e) => e.key === "Escape" && setProfileOpen(false);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [profileOpen]);

  // Nascondi la navbar su Landing, Login e Register
  if (["/", "/login", "/register"].includes(location.pathname)) {
    return null;
  }

  const links = [
    { to: "/welcome", label: "Home", show: Boolean(user) },
    { to: "/locations", label: "Esplora", show: true },
    { to: "/bookings", label: "Le mie prenotazioni", show: role === "USER" },
    { to: "/host/locations", label: "Le mie location", show: role === "HOST" },
    { to: "/host/bookings", label: "Prenotazioni ricevute", show: role === "HOST" },
  ].filter((link) => link.show);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6">
      <nav
        aria-label="Principale"
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full py-2 pr-2 pl-5 ring-1 backdrop-blur-xl transition-[background-color,box-shadow] duration-300",
          scrolled ? "bg-white/85 shadow-soft ring-cocoa/10" : "bg-white/60 ring-cocoa/[0.06]",
        )}
      >
        <Logo to={user ? "/welcome" : "/"} />

        {/* Link desktop con indicatore "tubelight" */}
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const active = isActive(location.pathname, link.to);
            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative block rounded-full px-4 py-2 text-sm font-semibold no-underline transition-colors",
                    active ? "text-cocoa" : "text-cocoa-soft hover:text-cocoa",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-tubelight"
                      className="absolute inset-0 -z-10 rounded-full bg-sun-soft"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    >
                      <span className="absolute -top-2 left-1/2 h-1 w-8 -translate-x-1/2 rounded-b-full bg-sun">
                        <span className="absolute -top-1 -left-2 h-5 w-12 rounded-full bg-sun/40 blur-md" />
                      </span>
                    </motion.span>
                  )}
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          {role === "HOST" && (
            <Button to="/locations/add" size="sm" className="hidden sm:inline-flex">
              <Plus aria-hidden="true" /> Nuova location
            </Button>
          )}

          {user ? (
            <div ref={profileRef} className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen((open) => !open)}
                aria-expanded={profileOpen}
                aria-haspopup="menu"
                className="flex items-center gap-1.5 rounded-full p-1 pr-2 transition hover:bg-cocoa/[0.06]"
              >
                <Avatar name={user.username} className="size-8 text-xs" />
                <span className="sr-only">Menu account</span>
                <ChevronDown
                  className={cn("size-4 text-cocoa-soft transition-transform", profileOpen && "rotate-180")}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    role="menu"
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.97 }}
                    transition={{ duration: 0.16 }}
                    className="absolute top-full right-0 mt-3 w-64 origin-top-right rounded-3xl bg-white p-2 shadow-lift ring-1 ring-cocoa/10"
                  >
                    <div className="flex items-center gap-3 px-3 py-3">
                      <Avatar name={user.username} />
                      <div className="min-w-0">
                        <p className="truncate font-semibold">{user.username}</p>
                        <p className="truncate text-sm text-cocoa-soft">{user.email}</p>
                      </div>
                    </div>
                    <div className="my-1 h-px bg-line" />
                    <Link
                      role="menuitem"
                      to="/users/me"
                      className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold text-cocoa no-underline transition hover:bg-cocoa/[0.05]"
                    >
                      <UserRound className="size-4" aria-hidden="true" /> Profilo
                    </Link>
                    <Link
                      role="menuitem"
                      to="/logout"
                      className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold text-tongue no-underline transition hover:bg-tongue/[0.07]"
                    >
                      <LogOut className="size-4" aria-hidden="true" /> Esci
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="hidden items-center gap-1 sm:flex">
              <Button to="/login" variant="ghost" size="sm">
                Accedi
              </Button>
              <Button to="/register" size="sm">
                Registrati
              </Button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Chiudi menu" : "Apri menu"}
            className="grid size-10 place-items-center rounded-full text-cocoa transition hover:bg-cocoa/[0.06] lg:hidden"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-6xl rounded-3xl bg-white p-2 shadow-lift ring-1 ring-cocoa/10 lg:hidden"
          >
            <ul>
              {links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={cn(
                      "block rounded-2xl px-4 py-3 font-semibold no-underline transition",
                      isActive(location.pathname, link.to) ? "bg-sun-soft text-cocoa" : "text-cocoa hover:bg-cocoa/[0.05]",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            {role === "HOST" && (
              <Button to="/locations/add" className="mt-2 w-full sm:hidden">
                <Plus aria-hidden="true" /> Nuova location
              </Button>
            )}
            {!user && (
              <div className="mt-2 grid grid-cols-2 gap-2 sm:hidden">
                <Button to="/login" variant="outline">
                  Accedi
                </Button>
                <Button to="/register">Registrati</Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
