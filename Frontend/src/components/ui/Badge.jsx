import { cn } from "../../lib/utils";

const TONES = {
  neutral: "bg-cocoa/[0.06] text-cocoa",
  sun: "bg-sun-soft text-cocoa",
  sky: "bg-sky-soft text-sky-deep",
  moss: "bg-moss-soft text-moss",
  tongue: "bg-tongue/10 text-tongue",
  glass: "bg-white/90 text-cocoa shadow-sm backdrop-blur",
};

export default function Badge({ tone = "neutral", dot = false, className, children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap [&_svg]:size-3.5",
        TONES[tone],
        className,
      )}
    >
      {dot && <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />}
      {children}
    </span>
  );
}
