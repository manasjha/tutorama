import type { ReactNode } from "react";

type PageShellProps = {
  title: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
};

export function PageShell({
  title,
  description,
  children,
  actions,
}: PageShellProps) {
  return (
    <div className="grid gap-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-text-primary">
            {title}
          </h1>
          {description ? (
            <p className="mt-2 max-w-3xl text-sm leading-6 text-text-muted">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? <div className="flex shrink-0 gap-3">{actions}</div> : null}
      </div>
      {children}
    </div>
  );
}
