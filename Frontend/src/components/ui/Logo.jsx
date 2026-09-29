import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

export default function Logo({ to = "/", className, light = false }) {
  return (
    <Link
      to={to}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full font-display text-xl font-extrabold tracking-tight no-underline",
        light ? "text-white" : "text-cocoa",
        className,
      )}
    >
      <img
        src="/petbnb-mark.png"
        alt=""
        className="size-8 transition-transform duration-300 ease-out group-hover:-rotate-12"
      />
      PetBnb
    </Link>
  );
}
