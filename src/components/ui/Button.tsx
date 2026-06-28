import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  isLoading?: boolean;
  children: ReactNode;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-trust-blue text-white shadow-sm hover:bg-trust-blue/90 focus-visible:outline-trust-blue",
  secondary:
    "border border-trust-blue bg-white text-trust-blue hover:bg-trust-blue/5 focus-visible:outline-trust-blue",
  ghost:
    "bg-transparent text-text-primary hover:bg-border-soft/60 focus-visible:outline-trust-blue",
  danger:
    "bg-error text-white hover:bg-error/90 focus-visible:outline-error",
};

export function Button({
  variant = "primary",
  isLoading = false,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        variantClasses[variant],
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}
