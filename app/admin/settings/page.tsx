import type { Metadata } from "next";
import Link from "next/link";
import { SettingsManager } from "@/app/admin/settings/SettingsManager";
import { getServerLocale } from "@/lib/i18n/server";
import {
  BRAND_NAME_KEY,
  CONTACT_EMAIL_KEY,
  CONTACT_INSTAGRAM_KEY,
  CONTACT_LINKEDIN_KEY,
  CONTACT_PHONE_KEY,
  DEFAULT_BRAND_NAME,
  DEFAULT_CONTACT_SETTINGS,
} from "@/lib/site-settings";
import { requireAdminUser } from "@/lib/supabase/admin-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Admin Settings",
  description: "Site settings management",
  robots: { index: false, follow: false },
};

export default async function AdminSettingsPage() {
  const locale = await getServerLocale();
  await requireAdminUser();
  const supabase = createSupabaseServerClient();

  const copyByLocale = {
    bg: { eyebrow: "Настройки", title: "Настройки на сайта", back: "Назад към таблото" },
    en: { eyebrow: "Settings", title: "Site settings", back: "Back to dashboard" },
    ro: { eyebrow: "Setari", title: "Setari site", back: "Inapoi la tablou" },
  } as const;
  const t = copyByLocale[locale];

  const { data } = await supabase
    .from("app_settings")
    .select("key, value")
    .in("key", [BRAND_NAME_KEY, CONTACT_PHONE_KEY, CONTACT_EMAIL_KEY, CONTACT_INSTAGRAM_KEY, CONTACT_LINKEDIN_KEY]);

  const map = new Map((data ?? []).map((item) => [item.key, item.value?.trim() ?? ""]));

  return (
    <div>
      <div className="rounded-3xl border border-brand-accent/20 bg-brand-elevated/70 p-5">
        <p className="text-xs uppercase tracking-[0.14em] text-brand-accentSoft">{t.eyebrow}</p>
        <h1 className="mt-1 font-heading text-heading-xl">{t.title}</h1>
      </div>

      <SettingsManager
        initialValues={{
          brandName: map.get(BRAND_NAME_KEY) || DEFAULT_BRAND_NAME,
          contactPhone: map.get(CONTACT_PHONE_KEY) || DEFAULT_CONTACT_SETTINGS.phone,
          contactEmail: map.get(CONTACT_EMAIL_KEY) || DEFAULT_CONTACT_SETTINGS.email,
          contactInstagram: map.get(CONTACT_INSTAGRAM_KEY) || DEFAULT_CONTACT_SETTINGS.instagram,
          contactLinkedin: map.get(CONTACT_LINKEDIN_KEY) || DEFAULT_CONTACT_SETTINGS.linkedin,
        }}
        locale={locale}
      />

      <p className="mt-6 text-sm text-brand-muted">
        <Link href="/admin" className="underline">
          {t.back}
        </Link>
      </p>
    </div>
  );
}
