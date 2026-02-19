import type { Metadata } from "next";
import Link from "next/link";
import { getServerLocale } from "@/lib/i18n/server";
import { requireAdminUser } from "@/lib/supabase/admin-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Admin Services",
  description: "Service catalog overview",
  robots: { index: false, follow: false },
};

export default async function AdminServicesPage() {
  const locale = await getServerLocale();
  await requireAdminUser();
  const supabase = createSupabaseServerClient();

  const copyByLocale = {
    bg: {
      eyebrow: "Услуги",
      title: "Каталог услуги",
      openCms: "Отвори CMS CRUD",
      active: "активна",
      inactive: "неактивна",
      synced: "Услугите се синхронизират от CMS.",
      back: "Назад към таблото",
    },
    en: {
      eyebrow: "Services",
      title: "Service catalog",
      openCms: "Open CMS CRUD",
      active: "active",
      inactive: "inactive",
      synced: "Services are synced from CMS.",
      back: "Back to dashboard",
    },
    ro: {
      eyebrow: "Servicii",
      title: "Catalog servicii",
      openCms: "Deschide CMS CRUD",
      active: "activ",
      inactive: "inactiv",
      synced: "Serviciile sunt sincronizate din CMS.",
      back: "Inapoi la tablou",
    },
  } as const;

  const t = copyByLocale[locale];

  const { data: services } = await supabase
    .from("services")
    .select("id, name, slug, is_active")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-brand-accent/20 bg-brand-elevated/70 p-5">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-brand-accentSoft">{t.eyebrow}</p>
          <h1 className="mt-1 font-heading text-heading-xl">{t.title}</h1>
        </div>
        <a
          href={`${process.env.CMS_BASE_URL ?? "#"}/admin/content-manager/collectionType/api::service.service`}
          className="rounded-full border border-brand-accent/30 px-4 py-2 text-sm text-brand-accentSoft"
          target="_blank"
          rel="noreferrer"
        >
          {t.openCms}
        </a>
      </div>

      <ul className="mt-6 grid gap-3 md:grid-cols-2">
        {(services ?? []).map((service) => (
          <li key={service.id} className="rounded-2xl border border-brand-accent/25 bg-brand-surface/70 p-4">
            <p className="font-medium">{service.name}</p>
            <p className="text-sm text-brand-muted">/{service.slug}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.12em] text-brand-accentSoft">{service.is_active ? t.active : t.inactive}</p>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-sm text-brand-muted">
        {t.synced}
        <Link href="/admin" className="ml-2 underline">
          {t.back}
        </Link>
      </p>
    </div>
  );
}

