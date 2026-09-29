import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Unisce classi Tailwind risolvendo i conflitti (stesso pattern di shadcn/ui)
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function initials(name = "") {
  const parts = name.trim().split(/[\s._-]+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}
