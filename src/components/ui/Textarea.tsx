import type { TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  helperText?: string;
  error?: string;
};

export function Textarea({
  label,
  helperText,
  error,
  className,
  id,
  ...props
}: TextareaProps) {
  const textareaId = id ?? props.name;

  return (
    <label className="grid gap-2 text-sm font-medium text-text-primary" htmlFor={textareaId}>
      <span>{label}</span>
      <textarea
        id={textareaId}
        className={cn(
          "min-h-28 rounded-xl border border-border-soft bg-white px-3 py-2 text-sm text-text-primary outline-none transition placeholder:text-text-muted focus:border-trust-blue focus:ring-4 focus:ring-trust-blue/10",
          error && "border-error focus:border-error focus:ring-error/10",
          className,
        )}
        {...props}
      />
      {helperText ? <span className="text-xs text-text-muted">{helperText}</span> : null}
      {error ? <span className="text-xs text-error">{error}</span> : null}
    </label>
  );
}
