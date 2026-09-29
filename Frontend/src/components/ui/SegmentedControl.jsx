import { useId } from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

// Tab a pillola con indicatore animato che scivola sull'opzione attiva
export default function SegmentedControl({ options, value, onChange, className, label }) {
  const layoutId = useId();

  return (
    <div role="tablist" aria-label={label} className={cn("inline-flex rounded-full bg-cocoa/[0.06] p-1", className)}>
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors",
              active ? "text-cocoa" : "text-cocoa-soft hover:text-cocoa",
            )}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-white shadow-soft"
                transition={{ type: "spring", stiffness: 500, damping: 38 }}
              />
            )}
            <span className="relative flex items-center gap-2">
              {option.label}
              {option.count !== undefined && (
                <span className={cn("rounded-full px-1.5 text-xs tabular-nums", active ? "bg-sun" : "bg-cocoa/[0.08]")}>
                  {option.count}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
