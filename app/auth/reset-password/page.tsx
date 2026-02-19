import type { Metadata } from "next";
import Link from "next/link";
import { resetPasswordAction } from "@/app/auth/actions";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getServerLocale } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Нова парола",
  description: "Задаване на нова парола.",
  robots: { index: false, follow: false },
};

type ResetPasswordPageProps = {
  searchParams?: Promise<{ error?: string }>;
};

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const locale = await getServerLocale();
  const params = await searchParams;

  const copyByLocale = {
    bg: {
      title: "Задай нова парола",
      description: "Използвайте силна парола и потвърждение.",
      errors: {
        weak_password: "Паролата трябва да е силна.",
        password_mismatch: "Паролите не съвпадат.",
        update_failed: "Неуспешна смяна на парола. Опитайте отново.",
        invalid_request: "Невалидна заявка.",
      },
      password: "Нова парола",
      confirmPassword: "Потвърди паролата",
      submit: "Запази нова парола",
      noAccess: "Нямате достъп?",
      requestNew: "Заявете нов линк",
    },
    en: {
      title: "Set new password",
      description: "Use a strong password and confirmation.",
      errors: {
        weak_password: "Password must be strong.",
        password_mismatch: "Passwords do not match.",
        update_failed: "Password update failed. Please try again.",
        invalid_request: "Invalid request.",
      },
      password: "New password",
      confirmPassword: "Confirm password",
      submit: "Save new password",
      noAccess: "No access?",
      requestNew: "Request a new link",
    },
    ro: {
      title: "Seteaza o parola noua",
      description: "Folositi o parola puternica si confirmare.",
      errors: {
        weak_password: "Parola trebuie sa fie puternica.",
        password_mismatch: "Parolele nu coincid.",
        update_failed: "Actualizarea parolei a esuat. Incercati din nou.",
        invalid_request: "Cerere invalida.",
      },
      password: "Parola noua",
      confirmPassword: "Confirma parola",
      submit: "Salveaza parola noua",
      noAccess: "Nu aveti acces?",
      requestNew: "Solicitati un link nou",
    },
  } as const;

  const t = copyByLocale[locale];
  const error = params?.error ? t.errors[params.error as keyof typeof t.errors] : null;

  return (
    <main className="min-h-screen bg-brand-background">
      <SiteHeader />
      <Section>
        <Container className="max-w-xl">
          <Card>
            <h1 className="font-heading text-heading-xl">{t.title}</h1>
            <p className="mt-2 text-sm text-brand-muted">{t.description}</p>
            {error ? <p className="mt-3 text-sm text-red-300">{error}</p> : null}
            <form action={resetPasswordAction} className="mt-6 space-y-4" noValidate>
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <div>
                <label htmlFor="password" className="mb-1 block text-sm">{t.password}</label>
                <input id="password" name="password" type="password" autoComplete="new-password" minLength={12} maxLength={128} required className="w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3" />
              </div>
              <div>
                <label htmlFor="confirm_password" className="mb-1 block text-sm">{t.confirmPassword}</label>
                <input id="confirm_password" name="confirm_password" type="password" autoComplete="new-password" minLength={12} maxLength={128} required className="w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3" />
              </div>
              <Button type="submit">{t.submit}</Button>
            </form>
            <p className="mt-4 text-sm text-brand-muted">
              {t.noAccess} <Link href="/auth/forgot-password" className="underline">{t.requestNew}</Link>.
            </p>
          </Card>
        </Container>
      </Section>
      <SiteFooter />
    </main>
  );
}

