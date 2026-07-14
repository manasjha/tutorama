import { TrackedLink } from "@/components/analytics/TrackedLink";
import { analyticsEvents } from "@/lib/analytics/events";

import { LandingWordmark } from "./LandingWordmark";

type LandingFooterProps = {
  loginHref: string;
};

export function LandingFooter({ loginHref }: LandingFooterProps) {
  return (
    <footer className="bg-[#1B2A4A] py-10 text-white sm:py-12">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:grid-cols-[1fr_auto] sm:px-6 sm:items-start">
        <div>
          <LandingWordmark href="/" tone="white" />
          <p className="mt-5 max-w-xl text-sm leading-6 text-white/75">
            Tutorama helps parents in HSR find and continue with the right home
            tutor for their child.
          </p>
          <p className="mt-4 text-sm font-semibold text-white">
            Live in HSR, Bengaluru
          </p>
        </div>
        <div className="grid gap-3 text-sm text-white/78">
          <a className="hover:text-white" href="tel:+919650120598">
            Phone/WhatsApp: +91 9650120598
          </a>
          <a className="hover:text-white" href="mailto:info@tutorama.in">
            Email: info@tutorama.in
          </a>
          <TrackedLink
            className="font-semibold text-[#F5D76E] hover:text-white"
            eventName={analyticsEvents.landingFooterCtaClicked}
            href={loginHref}
            properties={{
              cta_location: "footer",
              cta_text: "Log In",
            }}
          >
            Log In
          </TrackedLink>
        </div>
      </div>
    </footer>
  );
}
