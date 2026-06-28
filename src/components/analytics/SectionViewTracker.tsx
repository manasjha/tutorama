"use client";

import { useEffect, useRef } from "react";

import type { AnalyticsEventName } from "@/lib/analytics/events";
import { trackEvent } from "@/lib/analytics/track";
import type { Json } from "@/types/database";

type SectionViewTrackerProps = {
  eventName: AnalyticsEventName;
  properties?: Record<string, Json>;
};

export function SectionViewTracker({
  eventName,
  properties,
}: SectionViewTrackerProps) {
  const markerRef = useRef<HTMLSpanElement | null>(null);
  const trackedRef = useRef(false);

  useEffect(() => {
    const marker = markerRef.current;

    if (!marker || trackedRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !trackedRef.current) {
          trackedRef.current = true;
          void trackEvent({
            eventName,
            pagePath: window.location.pathname,
            properties,
          });
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(marker);

    return () => observer.disconnect();
  }, [eventName, properties]);

  return <span ref={markerRef} className="sr-only" aria-hidden="true" />;
}
