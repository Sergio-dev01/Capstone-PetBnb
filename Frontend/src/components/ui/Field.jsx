import { useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "../../lib/utils";
import { inputBase } from "./styles";

export function Field({ label, hint, error, htmlFor, className, children }) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label htmlFor={htmlFor} className="block text-sm font-semibold text-cocoa">
          {label}
        </label>
      )}
      {children}
      {error ? (
        <p className="text-sm font-medium text-tongue">{error}</p>
      ) : (
        hint && <p className="text-sm text-cocoa-soft">{hint}</p>
      )}
    </div>
  );
}

export function Input({ icon: Icon, suffix, className, type = "text", ...props }) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="relative">
      {Icon && (
        <Icon
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-4 size-[1.1rem] -translate-y-1/2 text-cocoa-soft"
        />
      )}
      <input
        type={isPassword && visible ? "text" : type}
        className={cn(inputBase, Icon && "pl-11", (suffix || isPassword) && "pr-12", className)}
        {...props}
      />
      {isPassword ? (
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Nascondi password" : "Mostra password"}
          className="absolute top-1/2 right-2 grid size-9 -translate-y-1/2 place-items-center rounded-full text-cocoa-soft transition hover:bg-cocoa/[0.06] hover:text-cocoa"
        >
          {visible ? <EyeOff className="size-[1.1rem]" /> : <Eye className="size-[1.1rem]" />}
        </button>
      ) : (
        suffix && (
          <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-sm font-medium text-cocoa-soft">
            {suffix}
          </span>
        )
      )}
    </div>
  );
}

export function Textarea({ className, ...props }) {
  return <textarea className={cn(inputBase, "h-auto min-h-32 resize-y py-3 leading-relaxed", className)} {...props} />;
}

// Campo con label collegata automaticamente all'input
export function TextField({ label, hint, error, id, ...inputProps }) {
  const autoId = useId();
  const fieldId = id || autoId;
  return (
    <Field label={label} hint={hint} error={error} htmlFor={fieldId}>
      <Input id={fieldId} aria-invalid={error ? true : undefined} {...inputProps} />
    </Field>
  );
}
