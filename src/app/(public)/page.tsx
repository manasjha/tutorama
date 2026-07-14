import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { LandingFaqSection } from "@/components/landing/LandingFaqSection";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingHero } from "@/components/landing/LandingHero";
import { LearningArtifactsSection } from "@/components/landing/LearningArtifactsSection";
import { ParentExpectationsSection } from "@/components/landing/ParentExpectationsSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { SubjectsSection } from "@/components/landing/SubjectsSection";
import { TutorPairingSection } from "@/components/landing/TutorPairingSection";
import { TutorQualitySection } from "@/components/landing/TutorQualitySection";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { analyticsEvents } from "@/lib/analytics/events";
import { trackEvent } from "@/lib/analytics/track";

const loginHref = "/login";

export default async function Home() {
  await trackEvent({
    eventName: analyticsEvents.landingPageViewed,
    pagePath: "/",
  });

  return (
    <PublicLayout variant="landing">
      <LandingHero loginHref={loginHref} />
      <HowItWorksSection />
      <SubjectsSection />
      <TutorPairingSection />
      <TutorQualitySection />
      <LearningArtifactsSection />
      <PricingSection loginHref={loginHref} />
      <ParentExpectationsSection loginHref={loginHref} />
      <LandingFaqSection />
      <LandingFooter loginHref={loginHref} />
    </PublicLayout>
  );
}
