import type { Metadata } from "next";
import Link from "next/link";
import { requireAdminUser } from "@/lib/supabase/admin-auth";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Admin",
  description: "Административен панел",
  robots: { index: false, follow: false },
};

const adminLinks = [
  { href: "/admin/requests", title: "Запитвания", description: "Преглед на contact и quote заявки" },
  { href: "/admin/events", title: "Събития", description: "Управление на списък със събития" },
  { href: "/admin/services", title: "Услуги", description: "Управление на каталога с услуги" },
  { href: "/admin/users", title: "Потребители", description: "Преглед на профили и роли" },
];

export default async function AdminOverviewPage() {
  const user = await requireAdminUser();

  return (
    <main className="min-h-screen bg-brand-background py-16">
      <Section>
        <Container>
          <p className="text-xs uppercase tracking-[0.14em] text-brand-accentSoft">Admin panel</p>
          <h1 className="mt-3 font-heading text-heading-xl">Здравей, {user.email}</h1>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {adminLinks.map((item) => (
              <Link key={item.href} href={item.href}>
                <Card>
                  <h2 className="font-heading text-heading-md">{item.title}</h2>
                  <p className="mt-2 text-sm text-brand-muted">{item.description}</p>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
