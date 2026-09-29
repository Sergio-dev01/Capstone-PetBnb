import { cn } from "../../lib/utils";

export default function PageHeader({ title, description, actions, className }) {
  return (
    <header className={cn("flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="max-w-2xl">
        <h1 className="text-4xl leading-[1.05] font-extrabold tracking-[-0.03em] sm:text-5xl">{title}</h1>
        {description && <p className="mt-3 text-lg text-cocoa-soft">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
    </header>
  );
}
