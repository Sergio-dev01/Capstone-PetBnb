import { useRef } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

// Card-link con un alone di luce che segue il cursore (ispirato a "Spotlight Card" di 21st.dev)
export default function SpotlightCard({ to, glow = "rgb(255 193 7 / 0.22)", className, children }) {
  const ref = useRef(null);

  function handleMove(event) {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }

  return (
    <Link
      ref={ref}
      to={to}
      onMouseMove={handleMove}
      className={cn(
        "group relative isolate flex overflow-hidden rounded-3xl no-underline transition-[box-shadow,transform] duration-300 ease-out-soft hover:-translate-y-0.5 hover:shadow-lift",
        className,
      )}
    >
      {children}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${glow}, transparent 65%)` }}
      />
    </Link>
  );
}
