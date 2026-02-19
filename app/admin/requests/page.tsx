import { requireAdminUser } from "@/lib/supabase/admin-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

type RequestRow = {
  id: string;
  type: "contact" | "quote";
  name: string;
  email: string;
  status: string;
  createdAt: string;
};

export default async function AdminRequestsPage() {
  await requireAdminUser();

  const supabase = createSupabaseServerClient();

  const [{ data: contacts }, { data: quotes }] = await Promise.all([
    supabase.from("contact_requests").select("id, name, email, status, created_at").order("created_at", { ascending: false }).limit(50),
    supabase.from("quote_requests").select("id, name, email, status, created_at").order("created_at", { ascending: false }).limit(50),
  ]);

  const rows: RequestRow[] = [
    ...(contacts ?? []).map((item) => ({
      id: item.id,
      type: "contact" as const,
      name: item.name,
      email: item.email,
      status: item.status,
      createdAt: item.created_at,
    })),
    ...(quotes ?? []).map((item) => ({
      id: item.id,
      type: "quote" as const,
      name: item.name,
      email: item.email,
      status: item.status,
      createdAt: item.created_at,
    })),
  ].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <main className="min-h-screen bg-brand-background py-16">
      <Section>
        <Container>
          <h1 className="font-heading text-heading-xl">Последни запитвания</h1>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-brand-accent/30">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-brand-surface">
                <tr>
                  <th className="px-4 py-3">Тип</th>
                  <th className="px-4 py-3">Име</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Статус</th>
                  <th className="px-4 py-3">Създадено</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={`${row.type}-${row.id}`} className="border-t border-brand-accent/20">
                    <td className="px-4 py-3 uppercase">{row.type}</td>
                    <td className="px-4 py-3">{row.name}</td>
                    <td className="px-4 py-3">{row.email}</td>
                    <td className="px-4 py-3">{row.status}</td>
                    <td className="px-4 py-3">{new Date(row.createdAt).toLocaleString("bg-BG")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>
    </main>
  );
}
