import Link from "next/link";
import type { ReactNode } from "react";

import { Card } from "./Card";

type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  children?: ReactNode;
};

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
  children,
}: EmptyStateProps) {
  return (
    <Card className="text-center">
      <div className="mx-auto grid max-w-xl gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold text-text-primary">
            {title}
          </h2>
          <p className="mt-2 text-sm leading-6 text-text-muted">{description}</p>
        </div>
        {actionLabel && actionHref ? (
          <div>
            <Link
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-trust-blue px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-trust-blue/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-trust-blue"
              href={actionHref}
            >
              {actionLabel}
            </Link>
          </div>
        ) : null}
        {children}
      </div>
    </Card>
  );
}
