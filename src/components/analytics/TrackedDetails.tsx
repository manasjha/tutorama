"use client";

import type { DetailsHTMLAttributes, ReactNode } from "react";

import { analyticsEvents } from "@/lib/analytics/events";
import { trackEvent } from "@/lib/analytics/track";

type TrackedDetailsProps = DetailsHTMLAttributes<HTMLDetailsElement> & {
  question: string;
  children: ReactNode;
};

export function TrackedDetails({
  children,
  onToggle,
  question,
  ...props
}: TrackedDetailsProps) {
  return (
    <details
      onToggle={(event) => {
        onToggle?.(event);
        if (event.currentTarget.open) {
          void trackEvent({
            eventName: analyticsEvents.landingFaqOpened,
            pagePath: window.location.pathname,
            properties: { faq_question: question },
          });
        }
      }}
      {...props}
    >
      {children}
    </details>
  );
}
