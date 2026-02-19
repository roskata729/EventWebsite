import type { Metadata } from "next";
import { requireAdminUser } from "@/lib/supabase/admin-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { EventsManager } from "./EventsManager";

export const metadata: Metadata = {
  title: "Admin Events",
  description: "Manage events portfolio",
  robots: { index: false, follow: false },
};

export default async function AdminEventsPage() {
  await requireAdminUser();

  const supabase = createSupabaseServerClient();
  const { data: events } = await supabase
    .from("events")
    .select("id, title, slug, description, category, event_date, location, cover_image_url, is_published, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="rounded-3xl border border-brand-accent/20 bg-gradient-to-r from-brand-elevated to-brand-surface p-6">
        <p className="text-xs uppercase tracking-[0.16em] text-brand-accentSoft">Events Studio</p>
        <h1 className="mt-2 font-heading text-heading-xl">Portfolio event management</h1>
        <p className="mt-2 text-sm text-brand-muted">Add new events, publish or unpublish instantly, and remove outdated entries.</p>
      </div>
      <EventsManager initialEvents={events ?? []} />
    </div>
  );
}