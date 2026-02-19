import type { Metadata } from "next";
import Link from "next/link";
import { resetPasswordAction } from "@/app/auth/actions";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Нова парола",
  description: "Задаване на нова парола.",
  robots: { index: false, follow: false },
};

type ResetPasswordPageProps = {
  searchParams?: Promise<{ error?: string }>;
};

function mapError(error?: string) {
  if (error === "weak_password") {
    return "Паролата трябва да е силна.";
  }

  if (error === "password_mismatch") {
    return "Паролите не съвпадат.";
  }

  if (error === "update_failed") {
    return "Неуспешна смяна на парола. Опитайте отново.";
  }

  if (error === "invalid_request") {
    return "Невалидна заявка.";
  }

  return null;
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const params = await searchParams;

  return (
    <main className="min-h-screen bg-brand-background">
      <SiteHeader />
      <Section>
        <Container className="max-w-xl">
          <Card>
            <h1 className="font-heading text-heading-xl">Задай нова парола</h1>
            <p className="mt-2 text-sm text-brand-muted">Използвайте силна парола и потвърждение.</p>
            {mapError(params?.error) ? <p className="mt-3 text-sm text-red-300">{mapError(params?.error)}</p> : null}
            <form action={resetPasswordAction} className="mt-6 space-y-4" noValidate>
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <div>
                <label htmlFor="password" className="mb-1 block text-sm">Нова парола</label>
                <input id="password" name="password" type="password" autoComplete="new-password" minLength={12} maxLength={128} required className="w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3" />
              </div>
              <div>
                <label htmlFor="confirm_password" className="mb-1 block text-sm">Потвърди паролата</label>
                <input id="confirm_password" name="confirm_password" type="password" autoComplete="new-password" minLength={12} maxLength={128} required className="w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3" />
              </div>
              <Button type="submit">Запази нова парола</Button>
            </form>
            <p className="mt-4 text-sm text-brand-muted">
              Нямате достъп? <Link href="/auth/forgot-password" className="underline">Заявете нов линк</Link>.
            </p>
          </Card>
        </Container>
      </Section>
      <SiteFooter />
    </main>
  );
}
