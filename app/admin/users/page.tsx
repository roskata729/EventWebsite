import type { Metadata } from "next";
import Link from "next/link";
import { requireAdminUser } from "@/lib/supabase/admin-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Admin потребители",
  description: "Преглед на потребителските профили",
  robots: { index: false, follow: false },
};

export default async function AdminUsersPage() {
  await requireAdminUser();

  const supabase = createSupabaseServerClient();
  const { data: users } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <main className="min-h-screen bg-brand-background py-16">
      <Section>
        <Container>
          <h1 className="font-heading text-heading-xl">Потребители</h1>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-brand-accent/30">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-brand-surface">
                <tr>
                  <th className="px-4 py-3">Име</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Роля</th>
                  <th className="px-4 py-3">Създаден</th>
                </tr>
              </thead>
              <tbody>
                {(users ?? []).map((item) => (
                  <tr key={item.id} className="border-t border-brand-accent/20">
                    <td className="px-4 py-3">{item.full_name ?? "Без име"}</td>
                    <td className="px-4 py-3">{item.email}</td>
                    <td className="px-4 py-3 uppercase">{item.role}</td>
                    <td className="px-4 py-3">{new Date(item.created_at).toLocaleString("bg-BG")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-sm text-brand-muted">
            За промяна на роля използвайте SQL/Supabase dashboard.
            <Link href="/admin" className="ml-2 underline">Назад</Link>
          </p>
        </Container>
      </Section>
    </main>
  );
}
