"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/Button";

type LoginSubmitButtonProps = {
  children: string;
  loadingText: string;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  disabled?: boolean;
};

export function LoginSubmitButton({
  children,
  disabled = false,
  loadingText,
  variant = "primary",
}: LoginSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      className="w-full"
      disabled={disabled || pending}
      type="submit"
      variant={variant}
    >
      {pending ? loadingText : children}
    </Button>
  );
}
