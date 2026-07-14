import { cn } from "@/lib/utils/cn";

type LandingSectionHeadingProps = {
  align?: "left" | "center";
  eyebrow?: string;
  title: string;
  body?: string;
  className?: string;
};

export function LandingSectionHeading({
  align = "left",
  body,
  className,
  eyebrow,
  title,
}: LandingSectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="font-heading text-sm font-semibold text-[#7BC67E]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-heading text-3xl font-bold leading-tight text-[#1B2A4A] sm:text-4xl">
        {title}
      </h2>
      {body ? (
        <p className="mt-3 text-sm leading-6 text-[#667085] sm:text-base sm:leading-7">
          {body}
        </p>
      ) : null}
    </div>
  );
}
