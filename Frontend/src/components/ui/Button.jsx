import { Link } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { buttonVariants } from "./styles";

// Bottone unico per tutta l'app: con `to` diventa un <Link> del router
export default function Button({ to, variant, size, className, loading = false, disabled, children, type = "button", ...props }) {
  const classes = buttonVariants({ variant, size, className });

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled || loading} aria-busy={loading || undefined} {...props}>
      {loading && <LoaderCircle className="animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
}
