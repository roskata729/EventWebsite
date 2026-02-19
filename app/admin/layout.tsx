import type { ReactNode } from "react";
import Link from "next/link";
import { getServerLocale } from "@/lib/i18n/server";
import { requireAdminUser } from "@/lib/supabase/admin-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const locale = await getServerLocale();
  const user = await requireAdminUser();
  const supabase = createSupabaseServerClient();

  const labelsByLocale = {
    bg: {
      links: [
        { href: "/admin", label: "Преглед" },
        { href: "/admin/requests", label: "Запитвания" },
        { href: "/admin/events", label: "Събития" },
        { href: "/admin/services", label: "Услуги" },
        { href: "/admin/users", label: "Потребители" },
        { href: "/admin/settings", label: "Настройки" },
      ],
      console: "Админ конзола",
      backToSite: "Към сайта",
      newQuotes: "Нови оферти",
      draftEvents: "Чернови събития",
    },
    en: {
      links: [
        { href: "/admin", label: "Overview" },
        { href: "/admin/requests", label: "Requests" },
        { href: "/admin/events", label: "Events" },
        { href: "/admin/services", label: "Services" },
        { href: "/admin/users", label: "Users" },
        { href: "/admin/settings", label: "Settings" },
      ],
      console: "Admin Console",
      backToSite: "Back to site",
      newQuotes: "New Quotes",
      draftEvents: "Draft Events",
    },
    ro: {
      links: [
        { href: "/admin", label: "Prezentare" },
        { href: "/admin/requests", label: "Solicitari" },
        { href: "/admin/events", label: "Evenimente" },
        { href: "/admin/services", label: "Servicii" },
        { href: "/admin/users", label: "Utilizatori" },
        { href: "/admin/settings", label: "Setari" },
      ],
      console: "Consola admin",
      backToSite: "Inapoi la site",
      newQuotes: "Oferte noi",
      draftEvents: "Evenimente draft",
    },
  } as const;

  const t = labelsByLocale[locale];

  const [{ count: requestsCount }, { count: eventsCount }] = await Promise.all([
    supabase.from("quote_requests").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("events").select("*", { count: "exact", head: true }).eq("is_published", false),
  ]);

  return (
    <main className="min-h-screen bg-brand-background pb-10">
      <div className="mx-auto grid w-full max-w-[1440px] gap-6 px-4 pt-6 lg:grid-cols-[260px_1fr] lg:px-6">
        <aside className="rounded-3xl border border-brand-accent/20 bg-gradient-to-b from-brand-surface to-brand-elevated p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-brand-accentSoft">{t.console}</p>
          <p className="mt-2 truncate text-sm text-brand-muted">{user.email}</p>
          <nav className="mt-6 space-y-2">
            {t.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-xl border border-transparent px-3 py-2 text-sm text-brand-foreground/90 transition hover:border-brand-accent/40 hover:bg-brand-surface/80"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/"
            className="mt-4 block rounded-xl border border-brand-accent/35 px-3 py-2 text-sm text-brand-accentSoft transition hover:border-brand-accent/60 hover:bg-brand-surface/80"
          >
            {t.backToSite}
          </Link>
          <div className="mt-8 grid gap-3">
            <div className="rounded-2xl border border-brand-accent/20 bg-brand-surface/70 p-3">
              <p className="text-xs uppercase tracking-[0.14em] text-brand-accentSoft">{t.newQuotes}</p>
              <p className="mt-1 text-2xl font-semibold">{requestsCount ?? 0}</p>
            </div>
            <div className="rounded-2xl border border-brand-accent/20 bg-brand-surface/70 p-3">
              <p className="text-xs uppercase tracking-[0.14em] text-brand-accentSoft">{t.draftEvents}</p>
              <p className="mt-1 text-2xl font-semibold">{eventsCount ?? 0}</p>
            </div>
          </div>
        </aside>
        <section className="rounded-3xl border border-brand-accent/20 bg-brand-surface/60 p-6 backdrop-blur">{children}</section>
      </div>
    </main>
  );
}

