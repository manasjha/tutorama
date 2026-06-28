type LoadingStateProps = {
  message?: string;
};

export function LoadingState({ message = "Loading..." }: LoadingStateProps) {
  return (
    <div className="flex items-center gap-3 text-sm text-text-muted">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-border-soft border-t-trust-blue" />
      <span>{message}</span>
    </div>
  );
}
