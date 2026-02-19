import type { Metadata } from "next";
import { UpcomingEventsSection } from "@/components/portfolio/UpcomingEventsSection";
import { PageHero } from "@/components/site/PageHero";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { getMessages } from "@/lib/i18n";
import { getServerLocale } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Upcoming Events",
  description: "All upcoming published events in one place.",
  openGraph: {
    title: "Upcoming Events",
    description: "All upcoming published events in one place.",
    url: "/portfolio",
    type: "website",
  },
};

export default async function PortfolioPage() {
  const locale = await getServerLocale();
  const messages = getMessages(locale).portfolio;

  return (
    <main className="min-h-screen bg-brand-background">
      <SiteHeader />
      <PageHero eyebrow={messages.heroEyebrow} title={messages.heroTitle} description={messages.heroDescription} />

      <UpcomingEventsSection locale={locale} showCalendar />

      <SiteFooter />
    </main>
  );
}
