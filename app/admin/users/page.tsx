import type { Metadata } from "next";
import Link from "next/link";
import { getServerLocale } from "@/lib/i18n/server";
import { requireAdminUser } from "@/lib/supabase/admin-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Admin Users",
  description: "User and role overview",
  robots: { index: false, follow: false },
};

export default async function AdminUsersPage() {
  const locale = await getServerLocale();
  await requireAdminUser();

  const copyByLocale = {
    bg: {
      eyebrow: "Потребители",
      title: "Екип и роли",
      name: "Име",
      email: "Имейл",
      role: "Роля",
      created: "Създаден",
      noName: "Без име",
      roleChanges: "Промените на роли се правят през Supabase dashboard/SQL.",
      back: "Назад към таблото",
      dateLocale: "bg-BG",
    },
    en: {
      eyebrow: "Users",
      title: "Team and roles",
      name: "Name",
      email: "Email",
      role: "Role",
      created: "Created",
      noName: "No name",
      roleChanges: "Role changes are handled in Supabase dashboard/SQL.",
      back: "Back to dashboard",
      dateLocale: "en-US",
    },
    ro: {
      eyebrow: "Utilizatori",
      title: "Echipa si roluri",
      name: "Nume",
      email: "Email",
      role: "Rol",
      created: "Creat",
      noName: "Fara nume",
      roleChanges: "Modificarile de rol se fac din Supabase dashboard/SQL.",
      back: "Inapoi la tablou",
      dateLocale: "ro-RO",
    },
  } as const;

  const t = copyByLocale[locale];

  const supabase = createSupabaseServerClient();
  const { data: users } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <div>
      <div className="rounded-3xl border border-brand-accent/20 bg-brand-elevated/70 p-5">
        <p className="text-xs uppercase tracking-[0.14em] text-brand-accentSoft">{t.eyebrow}</p>
        <h1 className="mt-1 font-heading text-heading-xl">{t.title}</h1>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-brand-accent/30">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-brand-surface">
            <tr>
              <th className="px-4 py-3">{t.name}</th>
              <th className="px-4 py-3">{t.email}</th>
              <th className="px-4 py-3">{t.role}</th>
              <th className="px-4 py-3">{t.created}</th>
            </tr>
          </thead>
          <tbody>
            {(users ?? []).map((item) => (
              <tr key={item.id} className="border-t border-brand-accent/20">
                <td className="px-4 py-3">{item.full_name ?? t.noName}</td>
                <td className="px-4 py-3">{item.email}</td>
                <td className="px-4 py-3 uppercase">{item.role}</td>
                <td className="px-4 py-3">{new Date(item.created_at).toLocaleString(t.dateLocale)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-sm text-brand-muted">
        {t.roleChanges}
        <Link href="/admin" className="ml-2 underline">
          {t.back}
        </Link>
      </p>
    </div>
  );
}

