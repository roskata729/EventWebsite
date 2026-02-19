import type { Metadata } from "next";
import { getServerLocale } from "@/lib/i18n/server";
import { requireAdminUser } from "@/lib/supabase/admin-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { EventsManager } from "./EventsManager";

export const metadata: Metadata = {
  title: "Admin Events",
  description: "Manage events portfolio",
  robots: { index: false, follow: false },
};

export default async function AdminEventsPage() {
  const locale = await getServerLocale();
  await requireAdminUser();

  const copyByLocale = {
    bg: {
      eyebrow: "Студио събития",
      title: "Управление на събития в портфолио",
      description: "Добавяйте нови събития, публикувайте или сваляйте, и премахвайте остарели записи.",
    },
    en: {
      eyebrow: "Events Studio",
      title: "Portfolio event management",
      description: "Add new events, publish or unpublish instantly, and remove outdated entries.",
    },
    ro: {
      eyebrow: "Studio evenimente",
      title: "Administrare evenimente portofoliu",
      description: "Adaugati evenimente noi, publicati sau retrageti instant si eliminati intrarile invechite.",
    },
  } as const;

  const t = copyByLocale[locale];

  const supabase = createSupabaseServerClient();
  const { data: events } = await supabase
    .from("events")
    .select("id, title, slug, description, category, event_date, location, cover_image_url, is_published, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="rounded-3xl border border-brand-accent/20 bg-gradient-to-r from-brand-elevated to-brand-surface p-6">
        <p className="text-xs uppercase tracking-[0.16em] text-brand-accentSoft">{t.eyebrow}</p>
        <h1 className="mt-2 font-heading text-heading-xl">{t.title}</h1>
        <p className="mt-2 text-sm text-brand-muted">{t.description}</p>
      </div>
      <EventsManager initialEvents={events ?? []} locale={locale} />
    </div>
  );
}

