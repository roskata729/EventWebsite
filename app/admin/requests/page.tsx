import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { getServerLocale } from "@/lib/i18n/server";
import { requireAdminUser } from "@/lib/supabase/admin-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { RequestsManager, type AdminRequestRow, type RequestsManagerLabels } from "./RequestsManager";

export const metadata: Metadata = {
  title: "Admin Requests",
  description: "Manage contact and quote requests",
  robots: { index: false, follow: false },
};

export default async function AdminRequestsPage() {
  const locale = await getServerLocale();
  await requireAdminUser();

  const labelsByLocale: Record<Locale, RequestsManagerLabels & { eyebrow: string; title: string; description: string; metricNew: string; metricReview: string; metricDone: string; dateLocale: string }> = {
    bg: {
      eyebrow: "Запитвания",
      title: "Управление на заявки",
      description: "Филтрирайте по тип и статус, след което обновявайте всяка заявка.",
      metricNew: "Нови",
      metricReview: "В преглед",
      metricDone: "Завършени",
      searchPlaceholder: "Търси по име, имейл, тема",
      allTypes: "Всички типове",
      typeContact: "Контакт",
      typeQuote: "Оферта",
      allStatuses: "Всички статуси",
      result: "резултат",
      results: "резултата",
      tableType: "Тип",
      tableName: "Име",
      tableEmail: "Имейл",
      tableSubjectEvent: "Тема / Събитие",
      tableCreated: "Създадено",
      tableStatus: "Статус",
      dateLocale: "bg-BG",
      statusLabels: {
        new: "Нова",
        in_review: "В преглед",
        approved: "Одобрена",
        scheduled: "Планирана",
        done: "Завършена",
        rejected: "Отказана",
      },
    },
    en: {
      eyebrow: "Request Ops",
      title: "Inquiry management",
      description: "Filter by type and status, then update each lead in-place.",
      metricNew: "New",
      metricReview: "In review",
      metricDone: "Completed",
      searchPlaceholder: "Search by name, email, subject",
      allTypes: "All types",
      typeContact: "Contact",
      typeQuote: "Quote",
      allStatuses: "All statuses",
      result: "result",
      results: "results",
      tableType: "Type",
      tableName: "Name",
      tableEmail: "Email",
      tableSubjectEvent: "Subject / Event",
      tableCreated: "Created",
      tableStatus: "Status",
      dateLocale: "en-US",
      statusLabels: {
        new: "New",
        in_review: "In review",
        approved: "Approved",
        scheduled: "Scheduled",
        done: "Done",
        rejected: "Rejected",
      },
    },
    ro: {
      eyebrow: "Solicitari",
      title: "Management solicitari",
      description: "Filtrati dupa tip si status, apoi actualizati fiecare solicitare.",
      metricNew: "Noi",
      metricReview: "In analiza",
      metricDone: "Finalizate",
      searchPlaceholder: "Cauta dupa nume, email, subiect",
      allTypes: "Toate tipurile",
      typeContact: "Contact",
      typeQuote: "Oferta",
      allStatuses: "Toate statusurile",
      result: "rezultat",
      results: "rezultate",
      tableType: "Tip",
      tableName: "Nume",
      tableEmail: "Email",
      tableSubjectEvent: "Subiect / Eveniment",
      tableCreated: "Creat",
      tableStatus: "Status",
      dateLocale: "ro-RO",
      statusLabels: {
        new: "Noua",
        in_review: "In analiza",
        approved: "Aprobata",
        scheduled: "Programata",
        done: "Finalizata",
        rejected: "Respinsa",
      },
    },
  };

  const t = labelsByLocale[locale];

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
        <p className="text-xs uppercase tracking-[0.16em] text-brand-accentSoft">{t.eyebrow}</p>
        <h1 className="mt-2 font-heading text-heading-xl">{t.title}</h1>
        <p className="mt-2 text-sm text-brand-muted">{t.description}</p>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <Metric label={t.metricNew} value={newCount} />
        <Metric label={t.metricReview} value={inReviewCount} />
        <Metric label={t.metricDone} value={doneCount} />
      </div>

      <RequestsManager initialRows={rows} labels={t} />
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

