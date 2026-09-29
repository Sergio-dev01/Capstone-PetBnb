import { Link } from "react-router-dom";
import { MapPin, PawPrint } from "lucide-react";
import Badge from "./ui/Badge";
import { stayImage } from "../lib/images";
import { formatPrice } from "../lib/format";
import { cn } from "../lib/utils";

export default function LocationCard({ location, to, imageSrc, className }) {
  const content = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-sky-soft">
        <img
          src={imageSrc || stayImage(location, { width: 800 })}
          alt={location.nome || "Anteprima location"}
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.05]"
        />
        <Badge tone="glass" className="absolute top-3 left-3">
          <PawPrint aria-hidden="true" /> Pet-friendly
        </Badge>
      </div>

      <div className="mt-3.5 flex items-start justify-between gap-4 px-1">
        <div className="min-w-0">
          <h3 className="truncate text-lg leading-snug font-bold tracking-tight">{location.nome || "Nome della location"}</h3>
          <p className="mt-0.5 flex items-center gap-1 text-sm text-cocoa-soft">
            <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
            <span className="truncate">{location.citta || "Città"}</span>
          </p>
        </div>
        <p className="shrink-0 text-right leading-tight">
          <span className="font-display text-lg font-bold">{formatPrice(location.prezzoPerNotte)}</span>
          <span className="block text-xs text-cocoa-soft">a notte</span>
        </p>
      </div>

      {location.descrizione && <p className="mt-2 line-clamp-2 px-1 text-sm text-cocoa-soft">{location.descrizione}</p>}
    </>
  );

  if (!to) return <div className={cn("group", className)}>{content}</div>;

  return (
    <Link to={to} className={cn("group block rounded-3xl text-cocoa no-underline", className)}>
      {content}
    </Link>
  );
}

export function LocationCardSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="aspect-[4/3] animate-shimmer rounded-3xl bg-[linear-gradient(90deg,rgb(31_8_2/0.05)_25%,rgb(31_8_2/0.09)_50%,rgb(31_8_2/0.05)_75%)] bg-[length:200%_100%]" />
      <div className="mt-4 h-4 w-2/3 rounded-full bg-cocoa/[0.07]" />
      <div className="mt-2 h-3 w-1/3 rounded-full bg-cocoa/[0.05]" />
    </div>
  );
}
