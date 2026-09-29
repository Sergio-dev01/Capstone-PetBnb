import { PawPrint } from "lucide-react";
import { cn } from "../../lib/utils";

export default function EmptyState({ icon: Icon = PawPrint, title, description, action, className }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-3xl border border-dashed border-cocoa/15 bg-white/70 px-6 py-14 text-center",
        className,
      )}
    >
      <div className="grid size-14 place-items-center rounded-2xl bg-sun-soft text-cocoa">
        <Icon className="size-6" aria-hidden="true" />
      </div>
      <h2 className="mt-5 text-xl font-bold tracking-tight">{title}</h2>
      {description && <p className="mt-1.5 max-w-sm text-cocoa-soft">{description}</p>}
      {action && <div className="mt-6 flex flex-wrap justify-center gap-2">{action}</div>}
    </div>
  );
}
