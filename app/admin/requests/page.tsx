import type { Metadata } from "next";
import { requireAdminUser } from "@/lib/supabase/admin-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { RequestsManager, type AdminRequestRow } from "./RequestsManager";

export const metadata: Metadata = {
  title: "Admin Requests",
  description: "Manage contact and quote requests",
  robots: { index: false, follow: false },
};

export default async function AdminRequestsPage() {
  await requireAdminUser();

  const supabase = createSupabaseServerClient();

  const [{ data: contacts }, { data: quotes }] = await Promise.all([
    supabase
      .from("contact_requests")
      .select("id, name, email, status, subject, event_date, created_at")
      .order("created_at", { ascending: false })
      .limit(100),
    supabase
      .from("quote_requests")
      .select("id, name, email, status, event_type, event_date, created_at")
      .order("created_at", { ascending: false })
      .limit(100),
  ]);

  const rows: AdminRequestRow[] = [
    ...(contacts ?? []).map((item) => ({
      id: item.id,
      type: "contact" as const,
      name: item.name,
      email: item.email,
      status: item.status,
      createdAt: item.created_at,
      subject: item.subject,
      eventDate: item.event_date,
    })),
    ...(quotes ?? []).map((item) => ({
      id: item.id,
      type: "quote" as const,
      name: item.name,
      email: item.email,
      status: item.status,
      createdAt: item.created_at,
      subject: item.event_type,
      eventDate: item.event_date,
    })),
  ].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const newCount = rows.filter((item) => item.status === "new").length;
  const inReviewCount = rows.filter((item) => item.status === "in_review").length;
  const doneCount = rows.filter((item) => item.status === "done").length;

  return (
    <div>
      <div className="rounded-3xl border border-brand-accent/20 bg-gradient-to-r from-brand-elevated to-brand-surface p-6">
        <p className="text-xs uppercase tracking-[0.16em] text-brand-accentSoft">Request Ops</p>
        <h1 className="mt-2 font-heading text-heading-xl">Inquiry management</h1>
        <p className="mt-2 text-sm text-brand-muted">Filter by type and status, then update each lead in-place.</p>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <Metric label="New" value={newCount} />
        <Metric label="In review" value={inReviewCount} />
        <Metric label="Completed" value={doneCount} />
      </div>

      <RequestsManager initialRows={rows} />
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <article className="rounded-2xl border border-brand-accent/20 bg-brand-elevated/70 p-4">
      <p className="text-xs uppercase tracking-[0.14em] text-brand-accentSoft">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </article>
  );
}