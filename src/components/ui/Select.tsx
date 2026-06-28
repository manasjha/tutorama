import type { SelectHTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  helperText?: string;
  error?: string;
};

export function Select({
  label,
  helperText,
  error,
  className,
  id,
  children,
  ...props
}: SelectProps) {
  const selectId = id ?? props.name;

  return (
    <label className="grid gap-2 text-sm font-medium text-text-primary" htmlFor={selectId}>
      <span>{label}</span>
      <select
        id={selectId}
        className={cn(
          "min-h-11 rounded-xl border border-border-soft bg-white px-3 py-2 text-sm text-text-primary outline-none transition focus:border-trust-blue focus:ring-4 focus:ring-trust-blue/10",
          error && "border-error focus:border-error focus:ring-error/10",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {helperText ? <span className="text-xs text-text-muted">{helperText}</span> : null}
      {error ? <span className="text-xs text-error">{error}</span> : null}
    </label>
  );
}
