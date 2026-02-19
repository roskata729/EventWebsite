import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getMessages } from "@/lib/i18n";
import { getServerLocale } from "@/lib/i18n/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function resolveImageUrl(rawUrl: string) {
  try {
    const url = new URL(rawUrl);
    if ((url.hostname === "www.google.com" || url.hostname === "google.com") && url.pathname === "/imgres") {
      return url.searchParams.get("imgurl") ?? "";
    }
    return rawUrl;
  } catch {
    return "";
  }
}

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

  const supabase = createSupabaseServerClient();
  const today = new Date().toISOString().slice(0, 10);

  const { data: events } = await supabase
    .from("events")
    .select("id, title, slug, description, category, event_date, location, cover_image_url")
    .eq("is_published", true)
    .gte("event_date", today)
    .order("event_date", { ascending: true });

  return (
    <main className="min-h-screen bg-brand-background">
      <SiteHeader />
      <PageHero eyebrow={messages.heroEyebrow} title={messages.heroTitle} description={messages.heroDescription} />

      <Section>
        <Container>
          <h2 className="mb-6 font-heading text-heading-xl">Upcoming events</h2>

          {!events || events.length === 0 ? (
            <Card>
              <p className="text-sm text-brand-muted">No upcoming published events yet.</p>
            </Card>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <Card key={event.id} className="overflow-hidden p-0">
                  <div className="relative h-52 w-full">
                    {resolveImageUrl(event.cover_image_url) ? (
                      // Dynamic external URLs can be from arbitrary hosts, so render as native img to avoid next/image host crashes.
                      <img
                        src={resolveImageUrl(event.cover_image_url)}
                        alt={event.title}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-brand-elevated" />
                    )}
                  </div>
                  <div className="space-y-2 p-5">
                    <p className="text-xs uppercase tracking-[0.14em] text-brand-accentSoft">{event.category ?? "General"}</p>
                    <h3 className="font-heading text-heading-md">{event.title}</h3>
                    <p className="text-xs text-brand-muted">{event.event_date ?? "Date TBD"}{event.location ? ` - ${event.location}` : ""}</p>
                    <p className="text-sm text-brand-muted">{event.description ?? "No description"}</p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Container>
      </Section>

      <SiteFooter />
    </main>
  );
}
