import type { Metadata } from "next";
import Link from "next/link";
import { getServerLocale } from "@/lib/i18n/server";
import { requireAdminUser } from "@/lib/supabase/admin-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Operations overview for admins",
  robots: { index: false, follow: false },
};

export default async function AdminOverviewPage() {
  const locale = await getServerLocale();
  const user = await requireAdminUser();
  const supabase = createSupabaseServerClient();

  const copyByLocale = {
    bg: {
      dashboard: "Табло",
      welcome: "Добре дошли отново",
      intro: "Централизиран контрол за запитвания, поток от събития и екипни операции.",
      stats: {
        totalRequests: "Общо запитвания",
        eventsPortfolio: "Събития в портфолио",
        publishRate: "Процент публикувани",
        openQuotes: "Нови оферти",
        contactPlusQuote: "контакт + оферта",
        published: "публикувани",
        publishedOfAll: "Публикувани / всички",
        latest5: "От последните 5 заявки",
      },
      quickActions: "Бързи действия",
      contentHealth: "Състояние на съдържанието",
      latestQuotes: "Последни заявки за оферта",
      upcomingEvents: "Предстоящи събития",
      progress: {
        eventsPublished: "Публикувани събития",
        mix: "Съотношение контакт/оферти",
        recentNew: "Нови оферти (последни)",
      },
      noLocation: "Без локация",
      published: "публикувано",
      draft: "чернова",
      dateNotSet: "Без дата",
      dateLocale: "bg-BG",
      quick: [
        { href: "/admin/requests", title: "Преглед на запитвания", description: "Обработвайте нови контактни и офертни запитвания." },
        { href: "/admin/events", title: "Управление на събития", description: "Създавайте, публикувайте и обновявайте портфолиото." },
        { href: "/admin/services", title: "Каталог услуги", description: "Обновявайте активните услуги и позиционирането." },
        { href: "/admin/users", title: "Достъп на екипа", description: "Преглеждайте профили и админ права." },
      ],
    },
    en: {
      dashboard: "Dashboard",
      welcome: "Welcome back",
      intro: "Centralized control for inquiries, event pipeline, and team operations.",
      stats: {
        totalRequests: "Total requests",
        eventsPortfolio: "Events in portfolio",
        publishRate: "Publish rate",
        openQuotes: "Open quotes",
        contactPlusQuote: "contact + quote",
        published: "published",
        publishedOfAll: "Published / all events",
        latest5: "From latest 5 requests",
      },
      quickActions: "Quick actions",
      contentHealth: "Content health",
      latestQuotes: "Latest quote requests",
      upcomingEvents: "Upcoming events",
      progress: {
        eventsPublished: "Events published",
        mix: "Contact to quote mix",
        recentNew: "Recent new quotes",
      },
      noLocation: "No location",
      published: "published",
      draft: "draft",
      dateNotSet: "Date not set",
      dateLocale: "en-US",
      quick: [
        { href: "/admin/requests", title: "Review requests", description: "Process new contact and quote inquiries." },
        { href: "/admin/events", title: "Manage events", description: "Create, publish, and curate your portfolio." },
        { href: "/admin/services", title: "Service catalog", description: "Update active services and pricing positioning." },
        { href: "/admin/users", title: "Team access", description: "Audit profiles and admin permissions." },
      ],
    },
    ro: {
      dashboard: "Tablou",
      welcome: "Bine ati revenit",
      intro: "Control centralizat pentru solicitari, fluxul de evenimente si operatiunile echipei.",
      stats: {
        totalRequests: "Solicitari totale",
        eventsPortfolio: "Evenimente in portofoliu",
        publishRate: "Rata publicare",
        openQuotes: "Oferte noi",
        contactPlusQuote: "contact + oferta",
        published: "publicate",
        publishedOfAll: "Publicate / toate evenimentele",
        latest5: "Din ultimele 5 solicitari",
      },
      quickActions: "Actiuni rapide",
      contentHealth: "Starea continutului",
      latestQuotes: "Ultimele solicitari de oferta",
      upcomingEvents: "Evenimente viitoare",
      progress: {
        eventsPublished: "Evenimente publicate",
        mix: "Raport contact/oferta",
        recentNew: "Oferte noi recente",
      },
      noLocation: "Fara locatie",
      published: "publicat",
      draft: "draft",
      dateNotSet: "Data neprecizata",
      dateLocale: "ro-RO",
      quick: [
        { href: "/admin/requests", title: "Revizuire solicitari", description: "Procesati noile solicitari de contact si oferta." },
        { href: "/admin/events", title: "Administrare evenimente", description: "Creati, publicati si gestionati portofoliul." },
        { href: "/admin/services", title: "Catalog servicii", description: "Actualizati serviciile active si pozitionarea." },
        { href: "/admin/users", title: "Acces echipa", description: "Auditati profilele si drepturile de admin." },
      ],
    },
  } as const;

  const t = copyByLocale[locale];

  const [
    { count: contactCount },
    { count: quoteCount },
    { count: eventCount },
    { count: publishedEventCount },
    { data: recentRequests },
    { data: upcomingEvents },
  ] = await Promise.all([
    supabase.from("contact_requests").select("*", { count: "exact", head: true }),
    supabase.from("quote_requests").select("*", { count: "exact", head: true }),
    supabase.from("events").select("*", { count: "exact", head: true }),
    supabase.from("events").select("*", { count: "exact", head: true }).eq("is_published", true),
    supabase
      .from("quote_requests")
      .select("id, name, event_type, created_at, status")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("events")
      .select("id, title, event_date, location, is_published")
      .order("event_date", { ascending: true, nullsFirst: false })
      .limit(5),
  ]);

  const totalRequests = (contactCount ?? 0) + (quoteCount ?? 0);
  const publishedRate = eventCount ? Math.round(((publishedEventCount ?? 0) / eventCount) * 100) : 0;

  return (
    <div>
      <div className="rounded-3xl border border-brand-accent/20 bg-gradient-to-r from-brand-elevated/90 via-brand-surface to-brand-elevated/80 p-6">
        <p className="text-xs uppercase tracking-[0.16em] text-brand-accentSoft">{t.dashboard}</p>
        <h1 className="mt-2 font-heading text-heading-xl">{t.welcome}, {user.email}</h1>
        <p className="mt-3 max-w-2xl text-sm text-brand-muted">{t.intro}</p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label={t.stats.totalRequests} value={totalRequests} detail={`${contactCount ?? 0} + ${quoteCount ?? 0} ${t.stats.contactPlusQuote}`} />
        <StatCard label={t.stats.eventsPortfolio} value={eventCount ?? 0} detail={`${publishedEventCount ?? 0} ${t.stats.published}`} />
        <StatCard label={t.stats.publishRate} value={`${publishedRate}%`} detail={t.stats.publishedOfAll} />
        <StatCard label={t.stats.openQuotes} value={recentRequests?.filter((item) => item.status === "new").length ?? 0} detail={t.stats.latest5} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <article className="rounded-3xl border border-brand-accent/20 bg-brand-elevated/60 p-5">
          <h2 className="font-heading text-heading-md">{t.quickActions}</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {t.quick.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-brand-accent/15 bg-brand-surface/80 p-4 transition hover:border-brand-accent/50 hover:bg-brand-surface"
              >
                <h3 className="font-medium">{item.title}</h3>
                <p className="mt-1 text-sm text-brand-muted">{item.description}</p>
              </Link>
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-brand-accent/20 bg-brand-elevated/60 p-5">
          <h2 className="font-heading text-heading-md">{t.contentHealth}</h2>
          <div className="mt-5 space-y-4">
            <ProgressRow label={t.progress.eventsPublished} value={publishedEventCount ?? 0} total={eventCount ?? 0} />
            <ProgressRow label={t.progress.mix} value={quoteCount ?? 0} total={totalRequests || 1} />
            <ProgressRow label={t.progress.recentNew} value={recentRequests?.filter((item) => item.status === "new").length ?? 0} total={5} />
          </div>
        </article>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <article className="rounded-3xl border border-brand-accent/20 bg-brand-elevated/60 p-5">
          <h2 className="font-heading text-heading-md">{t.latestQuotes}</h2>
          <div className="mt-4 space-y-3">
            {(recentRequests ?? []).map((item) => (
              <div key={item.id} className="rounded-2xl border border-brand-accent/15 bg-brand-surface/80 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-brand-muted">{item.event_type}</p>
                  </div>
                  <span className="rounded-full border border-brand-accent/30 px-2 py-1 text-xs uppercase tracking-[0.1em]">{item.status}</span>
                </div>
                <p className="mt-2 text-xs text-brand-muted">{new Date(item.created_at).toLocaleString(t.dateLocale)}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-brand-accent/20 bg-brand-elevated/60 p-5">
          <h2 className="font-heading text-heading-md">{t.upcomingEvents}</h2>
          <div className="mt-4 space-y-3">
            {(upcomingEvents ?? []).map((item) => (
              <div key={item.id} className="rounded-2xl border border-brand-accent/15 bg-brand-surface/80 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-brand-muted">{item.location || t.noLocation}</p>
                  </div>
                  <span
                    className={`rounded-full border px-2 py-1 text-xs uppercase tracking-[0.1em] ${
                      item.is_published ? "border-emerald-300/60 text-emerald-200" : "border-brand-accent/30 text-brand-muted"
                    }`}
                  >
                    {item.is_published ? t.published : t.draft}
                  </span>
                </div>
                <p className="mt-2 text-xs text-brand-muted">{item.event_date || t.dateNotSet}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}

function StatCard({ label, value, detail }: { label: string; value: string | number; detail: string }) {
  return (
    <article className="rounded-2xl border border-brand-accent/20 bg-brand-elevated/70 p-4">
      <p className="text-xs uppercase tracking-[0.14em] text-brand-accentSoft">{label}</p>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
      <p className="mt-2 text-sm text-brand-muted">{detail}</p>
    </article>
  );
}

function ProgressRow({ label, value, total }: { label: string; value: number; total: number }) {
  const normalizedTotal = Math.max(total, 1);
  const width = Math.max(5, Math.round((value / normalizedTotal) * 100));

  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="text-brand-muted">{label}</span>
        <span>
          {value}/{total}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-brand-surface">
        <div className="h-full rounded-full bg-gradient-to-r from-brand-accent to-brand-accentSoft" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

