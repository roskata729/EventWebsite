import type { Metadata } from "next";
import Link from "next/link";
import { requireAuthenticatedUser } from "@/lib/supabase/user-auth";
import { isAdminSession } from "@/lib/supabase/roles";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Моят профил",
  description: "Потребителски профил и история на заявки.",
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const { supabase, user } = await requireAuthenticatedUser();
  const isAdmin = await isAdminSession(supabase, user);

  const [{ data: contactRequests }, { data: quoteRequests }, { data: profile }] = await Promise.all([
    supabase
      .from("contact_requests")
      .select("id, status, created_at, subject")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10),
    supabase
      .from("quote_requests")
      .select("id, status, created_at, event_type")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10),
    supabase.from("profiles").select("full_name, role").eq("id", user.id).maybeSingle(),
  ]);

  return (
    <main className="min-h-screen bg-brand-background">
      <SiteHeader />
      <Section>
        <Container className="space-y-6">
          <Card>
            <h1 className="font-heading text-heading-xl">Моят профил</h1>
            <p className="mt-2 text-sm text-brand-muted">Имейл: {user.email}</p>
            <p className="text-sm text-brand-muted">Име: {profile?.full_name ?? "Не е зададено"}</p>
            <p className="text-sm text-brand-muted">Роля: {profile?.role ?? (isAdmin ? "admin" : "user")}</p>
            {isAdmin ? <Link href="/admin" className="mt-3 inline-block text-sm underline">Към админ панел</Link> : null}
          </Card>

          <Card>
            <h2 className="font-heading text-heading-md">Последни contact заявки</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {(contactRequests ?? []).map((item) => (
                <li key={item.id} className="rounded-lg border border-brand-accent/20 p-3">
                  <p>Статус: {item.status}</p>
                  <p>Тема: {item.subject ?? "Без тема"}</p>
                  <p className="text-brand-muted">{new Date(item.created_at).toLocaleString("bg-BG")}</p>
                </li>
              ))}
              {(contactRequests ?? []).length === 0 ? <li className="text-brand-muted">Няма записи.</li> : null}
            </ul>
          </Card>

          <Card>
            <h2 className="font-heading text-heading-md">Последни quote заявки</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {(quoteRequests ?? []).map((item) => (
                <li key={item.id} className="rounded-lg border border-brand-accent/20 p-3">
                  <p>Статус: {item.status}</p>
                  <p>Тип събитие: {item.event_type}</p>
                  <p className="text-brand-muted">{new Date(item.created_at).toLocaleString("bg-BG")}</p>
                </li>
              ))}
              {(quoteRequests ?? []).length === 0 ? <li className="text-brand-muted">Няма записи.</li> : null}
            </ul>
          </Card>
        </Container>
      </Section>
      <SiteFooter />
    </main>
  );
}
