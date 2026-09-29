import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

// Carosello a dissolvenza con zoom lento, autoplay, frecce, pallini e swipe
export default function Carousel({ slides, interval = 5000, className }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((step) => setIndex((i) => (i + step + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => go(1), interval);
    return () => clearTimeout(id);
  }, [index, paused, interval, go]);

  const slide = slides[index];

  return (
    <div
      className={cn("relative overflow-hidden rounded-[2rem] bg-cocoa", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) go(1);
            else if (info.offset.x > 60) go(-1);
          }}
        >
          <motion.img
            src={slide.src}
            alt={slide.alt}
            draggable={false}
            className="size-full object-cover"
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: interval / 1000 + 1, ease: "linear" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cocoa/80 via-cocoa/10 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 sm:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            aria-live="polite"
          >
            <h3 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{slide.title}</h3>
            <p className="mt-2 max-w-md text-white/80 sm:text-lg">{slide.text}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute right-4 bottom-4 flex items-center gap-3 sm:right-8 sm:bottom-8">
        <div className="hidden items-center gap-1.5 sm:flex">
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Vai alla slide ${i + 1}`}
              aria-current={i === index}
              className="group/dot relative h-2 overflow-hidden rounded-full bg-white/30 transition-[width] duration-300"
              style={{ width: i === index ? 36 : 8 }}
            >
              {i === index && !paused && (
                <motion.span
                  key={`progress-${index}`}
                  className="absolute inset-y-0 left-0 bg-sun"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: interval / 1000, ease: "linear" }}
                />
              )}
              {i === index && paused && <span className="absolute inset-0 bg-sun" />}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Slide precedente"
          className="grid size-11 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md transition hover:bg-white hover:text-cocoa"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Slide successiva"
          className="grid size-11 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md transition hover:bg-white hover:text-cocoa"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}
