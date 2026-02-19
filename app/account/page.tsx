import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { type Locale } from "@/lib/i18n";
import { getServerLocale } from "@/lib/i18n/server";
import { isAdminSession } from "@/lib/supabase/roles";
import { requireAuthenticatedUser } from "@/lib/supabase/user-auth";

export const metadata: Metadata = {
  title: "Моят профил",
  description: "Потребителски профил и история на заявки.",
  robots: { index: false, follow: false },
};

const accountByLocale: Record<
  Locale,
  {
    title: string;
    email: string;
    name: string;
    role: string;
    noName: string;
    toAdmin: string;
    contactTitle: string;
    quoteTitle: string;
    status: string;
    subject: string;
    eventType: string;
    noSubject: string;
    noRecords: string;
    dateLocale: string;
  }
> = {
  bg: {
    title: "Моят профил",
    email: "Имейл",
    name: "Име",
    role: "Роля",
    noName: "Не е зададено",
    toAdmin: "Към админ панел",
    contactTitle: "Последни контактни запитвания",
    quoteTitle: "Последни запитвания за оферта",
    status: "Статус",
    subject: "Тема",
    eventType: "Тип събитие",
    noSubject: "Без тема",
    noRecords: "Няма записи.",
    dateLocale: "bg-BG",
  },
  en: {
    title: "My profile",
    email: "Email",
    name: "Name",
    role: "Role",
    noName: "Not set",
    toAdmin: "Go to admin panel",
    contactTitle: "Latest contact requests",
    quoteTitle: "Latest quote requests",
    status: "Status",
    subject: "Subject",
    eventType: "Event type",
    noSubject: "No subject",
    noRecords: "No records.",
    dateLocale: "en-US",
  },
  ro: {
    title: "Profilul meu",
    email: "Email",
    name: "Nume",
    role: "Rol",
    noName: "Nesetat",
    toAdmin: "Panou admin",
    contactTitle: "Ultimele solicitari contact",
    quoteTitle: "Ultimele solicitari oferta",
    status: "Status",
    subject: "Subiect",
    eventType: "Tip eveniment",
    noSubject: "Fara subiect",
    noRecords: "Nu exista inregistrari.",
    dateLocale: "ro-RO",
  },
};

export default async function AccountPage() {
  const locale = await getServerLocale();
  const t = accountByLocale[locale];
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
            <h1 className="font-heading text-heading-xl">{t.title}</h1>
            <p className="mt-2 text-sm text-brand-muted">{t.email}: {user.email}</p>
            <p className="text-sm text-brand-muted">{t.name}: {profile?.full_name ?? t.noName}</p>
            <p className="text-sm text-brand-muted">{t.role}: {profile?.role ?? (isAdmin ? "admin" : "user")}</p>
            {isAdmin ? <Link href="/admin" className="mt-3 inline-block text-sm underline">{t.toAdmin}</Link> : null}
          </Card>

          <Card>
            <h2 className="font-heading text-heading-md">{t.contactTitle}</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {(contactRequests ?? []).map((item) => (
                <li key={item.id} className="rounded-lg border border-brand-accent/20 p-3">
                  <p>{t.status}: {item.status}</p>
                  <p>{t.subject}: {item.subject ?? t.noSubject}</p>
                  <p className="text-brand-muted">{new Date(item.created_at).toLocaleString(t.dateLocale)}</p>
                </li>
              ))}
              {(contactRequests ?? []).length === 0 ? <li className="text-brand-muted">{t.noRecords}</li> : null}
            </ul>
          </Card>

          <Card>
            <h2 className="font-heading text-heading-md">{t.quoteTitle}</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {(quoteRequests ?? []).map((item) => (
                <li key={item.id} className="rounded-lg border border-brand-accent/20 p-3">
                  <p>{t.status}: {item.status}</p>
                  <p>{t.eventType}: {item.event_type}</p>
                  <p className="text-brand-muted">{new Date(item.created_at).toLocaleString(t.dateLocale)}</p>
                </li>
              ))}
              {(quoteRequests ?? []).length === 0 ? <li className="text-brand-muted">{t.noRecords}</li> : null}
            </ul>
          </Card>
        </Container>
      </Section>
      <SiteFooter />
    </main>
  );
}
