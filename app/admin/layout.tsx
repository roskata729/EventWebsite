import type { ReactNode } from "react";
import Link from "next/link";
import { requireAdminUser } from "@/lib/supabase/admin-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/requests", label: "Requests" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/users", label: "Users" },
];

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await requireAdminUser();
  const supabase = createSupabaseServerClient();

  const [{ count: requestsCount }, { count: eventsCount }] = await Promise.all([
    supabase.from("quote_requests").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("events").select("*", { count: "exact", head: true }).eq("is_published", false),
  ]);

  return (
    <main className="min-h-screen bg-brand-background pb-10">
      <div className="mx-auto grid w-full max-w-[1440px] gap-6 px-4 pt-6 lg:grid-cols-[260px_1fr] lg:px-6">
        <aside className="rounded-3xl border border-brand-accent/20 bg-gradient-to-b from-brand-surface to-brand-elevated p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-brand-accentSoft">Admin Console</p>
          <p className="mt-2 truncate text-sm text-brand-muted">{user.email}</p>
          <nav className="mt-6 space-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-xl border border-transparent px-3 py-2 text-sm text-brand-foreground/90 transition hover:border-brand-accent/40 hover:bg-brand-surface/80"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-8 grid gap-3">
            <div className="rounded-2xl border border-brand-accent/20 bg-brand-surface/70 p-3">
              <p className="text-xs uppercase tracking-[0.14em] text-brand-accentSoft">New Quotes</p>
              <p className="mt-1 text-2xl font-semibold">{requestsCount ?? 0}</p>
            </div>
            <div className="rounded-2xl border border-brand-accent/20 bg-brand-surface/70 p-3">
              <p className="text-xs uppercase tracking-[0.14em] text-brand-accentSoft">Draft Events</p>
              <p className="mt-1 text-2xl font-semibold">{eventsCount ?? 0}</p>
            </div>
          </div>
        </aside>
        <section className="rounded-3xl border border-brand-accent/20 bg-brand-surface/60 p-6 backdrop-blur">{children}</section>
      </div>
    </main>
  );
}
