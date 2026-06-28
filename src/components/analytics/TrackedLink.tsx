"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";

import type { AnalyticsEventName } from "@/lib/analytics/events";
import { trackEvent } from "@/lib/analytics/track";
import type { Json } from "@/types/database";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  eventName: AnalyticsEventName;
  properties?: Record<string, Json>;
};

export function TrackedLink({
  eventName,
  href,
  onClick,
  properties,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      href={href}
      onClick={(event) => {
        onClick?.(event);
        void trackEvent({
          eventName,
          pagePath: window.location.pathname,
          properties,
        });
      }}
      {...props}
    />
  );
}
