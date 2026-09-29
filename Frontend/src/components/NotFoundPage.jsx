import { motion } from "motion/react";
import Button from "./ui/Button";
import { useStoredUser } from "../lib/useStoredUser";

function NotFoundPage() {
  const user = useStoredUser();

  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-6 py-24 text-center">
      <p
        aria-hidden="true"
        className="flex items-center font-display text-[7rem] leading-none font-extrabold tracking-tight sm:text-[9rem]"
      >
        4
        <motion.img
          src="/petbnb-mark.png"
          alt=""
          className="mx-1 size-24 sm:size-32"
          animate={{ rotate: [0, -14, 10, -6, 0] }}
          transition={{ duration: 1.4, delay: 0.3, ease: "easeInOut" }}
        />
        4
      </p>
      <h1 className="mt-6 text-3xl font-extrabold tracking-tight">Questa pagina è scappata</h1>
      <p className="mt-2 text-lg text-cocoa-soft">Il link potrebbe essere sbagliato, oppure la pagina non esiste più.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        <Button to={user ? "/welcome" : "/"}>Torna alla home</Button>
        <Button to="/locations" variant="outline">
          Esplora le location
        </Button>
      </div>
    </section>
  );
}

export default NotFoundPage;
