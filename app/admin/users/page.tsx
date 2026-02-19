import type { Metadata } from "next";
import Link from "next/link";
import { requireAdminUser } from "@/lib/supabase/admin-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Admin Users",
  description: "User and role overview",
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
    <div>
      <div className="rounded-3xl border border-brand-accent/20 bg-brand-elevated/70 p-5">
        <p className="text-xs uppercase tracking-[0.14em] text-brand-accentSoft">Users</p>
        <h1 className="mt-1 font-heading text-heading-xl">Team and roles</h1>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-brand-accent/30">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-brand-surface">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {(users ?? []).map((item) => (
              <tr key={item.id} className="border-t border-brand-accent/20">
                <td className="px-4 py-3">{item.full_name ?? "No name"}</td>
                <td className="px-4 py-3">{item.email}</td>
                <td className="px-4 py-3 uppercase">{item.role}</td>
                <td className="px-4 py-3">{new Date(item.created_at).toLocaleString("en-US")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-sm text-brand-muted">
        Role changes are handled in Supabase dashboard/SQL.
        <Link href="/admin" className="ml-2 underline">
          Back to dashboard
        </Link>
      </p>
    </div>
  );
}