import type { AnalyticsEventName } from "@/lib/analytics/events";
import type { Json } from "@/types/database";

type TrackEventInput = {
  eventName: AnalyticsEventName;
  properties?: Record<string, Json>;
  pagePath?: string;
  userId?: string;
  anonymousId?: string;
};

export async function trackEvent(input: TrackEventInput) {
  if (process.env.NODE_ENV === "development") {
    console.info("[analytics]", {
      eventName: input.eventName,
      properties: input.properties ?? {},
      pagePath: input.pagePath,
      hasUserId: Boolean(input.userId),
      hasAnonymousId: Boolean(input.anonymousId),
    });
  }

  // PRD 0 keeps persistence optional and non-blocking.
  return { ok: true };
}
