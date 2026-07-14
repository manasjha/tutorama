import Link from "next/link";

import { cn } from "@/lib/utils/cn";

type LandingWordmarkProps = {
  className?: string;
  href?: string;
  tone?: "navy" | "white";
};

export function LandingWordmark({
  className,
  href = "/",
  tone = "navy",
}: LandingWordmarkProps) {
  const wordmark = (
    <span
      className={cn(
        "relative inline-flex items-center font-heading text-2xl font-bold leading-none",
        tone === "white" ? "text-white" : "text-[#1B2A4A]",
        className,
      )}
    >
      Tutorama
      <span
        aria-hidden="true"
        className={cn(
          "absolute -bottom-1 left-[54%] h-0.5 w-9 -translate-x-1/2 rounded-full",
          tone === "white" ? "bg-[#F5D76E]" : "bg-[#7ECBD9]",
        )}
      />
    </span>
  );

  return (
    <Link aria-label="Tutorama home" className="inline-flex" href={href}>
      {wordmark}
    </Link>
  );
}
