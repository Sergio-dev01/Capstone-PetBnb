import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "../../lib/utils";

// Parola che cambia lettera per lettera (ispirato a "Text Rotate" di 21st.dev)
export default function RotatingText({ words, interval = 2400, className, srLabel }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  const word = words[index];

  return (
    <>
      {srLabel && <span className="sr-only">{srLabel}</span>}
      <motion.span
        layout
        aria-hidden="true"
        transition={{ type: "spring", stiffness: 380, damping: 34 }}
        className={cn("relative inline-flex overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom", className)}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={word} className="inline-flex">
            {Array.from(word).map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ y: "135%" }}
                animate={{ y: 0 }}
                exit={{ y: "-135%" }}
                transition={{ type: "spring", stiffness: 420, damping: 32, delay: i * 0.028 }}
              >
                {char === " " ? " " : char}
              </motion.span>
            ))}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  );
}
