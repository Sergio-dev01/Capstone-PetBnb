import { cn, initials } from "../../lib/utils";

const PALETTE = ["bg-sun text-cocoa", "bg-sky text-cocoa", "bg-cocoa text-sun", "bg-tongue text-white", "bg-sun-soft text-cocoa"];

function paletteFor(name = "") {
  let hash = 0;
  for (const char of name) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return PALETTE[hash % PALETTE.length];
}

export default function Avatar({ name, className }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-grid size-10 shrink-0 place-items-center rounded-full font-display text-sm font-bold select-none",
        paletteFor(name),
        className,
      )}
    >
      {initials(name)}
    </span>
  );
}
