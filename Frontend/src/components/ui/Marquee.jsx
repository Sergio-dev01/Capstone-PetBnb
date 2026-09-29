import { cn } from "../../lib/utils";

// Nastro infinito: il contenuto è duplicato e trasla di esattamente una copia
export default function Marquee({ children, duration = 40, gap = "3rem", className }) {
  return (
    <div
      className={cn("group flex overflow-hidden", className)}
      style={{ "--gap": gap, "--duration": `${duration}s`, gap: "var(--gap)" }}
    >
      {[0, 1].map((copy) => (
        <div
          key={copy}
          aria-hidden={copy === 1 || undefined}
          className="flex shrink-0 animate-marquee items-center group-hover:[animation-play-state:paused]"
          style={{ gap: "var(--gap)" }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
