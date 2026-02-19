import Link from "next/link";
import { requireAdminUser } from "@/lib/supabase/admin-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export default async function AdminServicesPage() {
  await requireAdminUser();
  const supabase = createSupabaseServerClient();
  const { data: services } = await supabase.from("services").select("id, name, slug, is_active").order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-brand-background py-16">
      <Section>
        <Container>
          <div className="flex items-center justify-between gap-4">
            <h1 className="font-heading text-heading-xl">Услуги</h1>
            <a href={`${process.env.CMS_BASE_URL ?? "#"}/admin/content-manager/collectionType/api::service.service`} className="text-sm text-brand-accentSoft underline" target="_blank" rel="noreferrer">Отвори CMS за CRUD</a>
          </div>
          <ul className="mt-6 space-y-3">
            {(services ?? []).map((service) => (
              <li key={service.id} className="rounded-xl border border-brand-accent/30 p-4">
                <p className="font-medium">{service.name}</p>
                <p className="text-sm text-brand-muted">/{service.slug}</p>
                <p className="text-xs uppercase tracking-[0.14em] text-brand-accentSoft">{service.is_active ? "active" : "inactive"}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-brand-muted">
            Публикуваните услуги се зареждат на публичната страница от CMS API.
            <Link href="/admin" className="ml-2 underline">Назад</Link>
          </p>
        </Container>
      </Section>
    </main>
  );
}
