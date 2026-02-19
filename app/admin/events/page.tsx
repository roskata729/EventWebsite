import Link from "next/link";
import { requireAdminUser } from "@/lib/supabase/admin-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export default async function AdminEventsPage() {
  await requireAdminUser();
  const supabase = createSupabaseServerClient();
  const { data: events } = await supabase.from("events").select("id, title, slug, is_published").order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-brand-background py-16">
      <Section>
        <Container>
          <div className="flex items-center justify-between gap-4">
            <h1 className="font-heading text-heading-xl">Събития</h1>
            <a href={`${process.env.CMS_BASE_URL ?? "#"}/admin/content-manager/collectionType/api::event.event`} className="text-sm text-brand-accentSoft underline" target="_blank" rel="noreferrer">Отвори CMS за CRUD</a>
          </div>
          <ul className="mt-6 space-y-3">
            {(events ?? []).map((event) => (
              <li key={event.id} className="rounded-xl border border-brand-accent/30 p-4">
                <p className="font-medium">{event.title}</p>
                <p className="text-sm text-brand-muted">/{event.slug}</p>
                <p className="text-xs uppercase tracking-[0.14em] text-brand-accentSoft">{event.is_published ? "published" : "draft"}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-brand-muted">
            CRUD редакцията е централизирана в CMS, за да синхронизира публичното съдържание.
            <Link href="/admin" className="ml-2 underline">Назад</Link>
          </p>
        </Container>
      </Section>
    </main>
  );
}
