import { cn } from "../../lib/utils";

export default function Skeleton({ className }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-shimmer rounded-2xl bg-[linear-gradient(90deg,rgb(31_8_2/0.05)_25%,rgb(31_8_2/0.09)_50%,rgb(31_8_2/0.05)_75%)] bg-[length:200%_100%]",
        className,
      )}
    />
  );
}
