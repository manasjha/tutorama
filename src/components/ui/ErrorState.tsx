import { Card } from "./Card";

type ErrorStateProps = {
  title?: string;
  message?: string;
};

export function ErrorState({
  title = "Something went wrong",
  message = "Please try again.",
}: ErrorStateProps) {
  return (
    <Card className="border-error/20 bg-error/5">
      <h2 className="font-heading text-lg font-semibold text-error">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-text-primary">{message}</p>
    </Card>
  );
}
