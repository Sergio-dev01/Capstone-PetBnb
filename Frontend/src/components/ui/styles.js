import { cn } from "../../lib/utils";

const BUTTON_BASE =
  "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap font-semibold no-underline transition-[background-color,box-shadow,color,transform] duration-200 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cocoa [&_svg]:size-[1.1em] [&_svg]:shrink-0";

const BUTTON_VARIANTS = {
  // Giallo del logo con un leggero "bordo inferiore": effetto tasto/giocattolo
  primary: "bg-sun text-cocoa shadow-[inset_0_-3px_0_rgb(31_8_2/0.16)] hover:bg-sun-deep",
  dark: "bg-cocoa text-white shadow-[inset_0_-3px_0_rgb(0_0_0/0.35)] hover:bg-cocoa/90",
  outline: "bg-white text-cocoa ring-1 ring-inset ring-cocoa/12 hover:bg-canvas hover:ring-cocoa/25",
  ghost: "text-cocoa hover:bg-cocoa/[0.06]",
  danger: "bg-white text-tongue ring-1 ring-inset ring-tongue/25 hover:bg-tongue hover:text-white hover:ring-tongue",
  dangerSolid: "bg-tongue text-white shadow-[inset_0_-3px_0_rgb(0_0_0/0.2)] hover:bg-tongue/90",
};

const BUTTON_SIZES = {
  sm: "h-9 rounded-full px-4 text-sm",
  md: "h-11 rounded-full px-5 text-[0.95rem]",
  lg: "h-13 rounded-full px-7 text-base",
  icon: "size-10 rounded-full",
  iconSm: "size-9 rounded-full",
};

export function buttonVariants({ variant = "primary", size = "md", className } = {}) {
  return cn(BUTTON_BASE, BUTTON_VARIANTS[variant], BUTTON_SIZES[size], className);
}

export const inputBase =
  "h-12 w-full rounded-2xl bg-white px-4 text-[0.95rem] text-cocoa ring-1 ring-inset ring-cocoa/12 transition-[box-shadow,background-color] duration-200 placeholder:text-cocoa-soft/60 hover:ring-cocoa/25 focus:outline-none focus:ring-2 focus:ring-cocoa aria-[invalid=true]:ring-tongue/60 disabled:opacity-60";
