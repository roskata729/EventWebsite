import { UpcomingEventsShowcase } from "@/components/portfolio/UpcomingEventsShowcase";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { Locale } from "@/lib/i18n";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type UpcomingEventsSectionProps = {
  locale: Locale;
  showCalendar?: boolean;
  sectionClassName?: string;
};

const uiByLocale = {
  bg: {
    upcoming: "Предстоящи събития",
    empty: "Все още няма публикувани предстоящи събития.",
    general: "Общи",
    dateTbd: "Дата не е зададена",
    noDescription: "Няма описание",
    calendarTitle: "Календар на събитията",
    calendarSubtitle: "Преглед на публикуваните дати по месеци.",
    noEventsThisMonth: "Няма публикувани събития през този месец.",
  },
  en: {
    upcoming: "Upcoming events",
    empty: "No upcoming published events yet.",
    general: "General",
    dateTbd: "Date TBD",
    noDescription: "No description",
    calendarTitle: "Events calendar",
    calendarSubtitle: "Browse all published dates month by month.",
    noEventsThisMonth: "No published events in this month.",
  },
  ro: {
    upcoming: "Evenimente viitoare",
    empty: "Nu exista inca evenimente publicate in perioada urmatoare.",
    general: "General",
    dateTbd: "Data neprecizata",
    noDescription: "Fara descriere",
    calendarTitle: "Calendarul evenimentelor",
    calendarSubtitle: "Toate datele publicate, grupate pe luni.",
    noEventsThisMonth: "Nu exista evenimente publicate in aceasta luna.",
  },
} as const;

export async function UpcomingEventsSection({
  locale,
  showCalendar = true,
  sectionClassName,
}: UpcomingEventsSectionProps) {
  const supabase = createSupabaseServerClient();
  const today = new Date().toISOString().slice(0, 10);

  const { data: events } = await supabase
    .from("events")
    .select("id, title, slug, description, category, event_date, location, cover_image_url")
    .eq("is_published", true)
    .gte("event_date", today)
    .order("event_date", { ascending: true });

  return (
    <Section className={sectionClassName}>
      <Container>
        <UpcomingEventsShowcase events={events ?? []} ui={uiByLocale[locale]} locale={locale} showCalendar={showCalendar} />
      </Container>
    </Section>
  );
}
