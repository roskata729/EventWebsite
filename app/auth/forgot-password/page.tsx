import type { Metadata } from "next";
import Link from "next/link";
import { requestPasswordResetAction } from "@/app/auth/actions";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getServerLocale } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Забравена парола",
  description: "Изпращане на линк за смяна на парола.",
  robots: { index: false, follow: false },
};

type ForgotPasswordPageProps = {
  searchParams?: Promise<{ status?: string }>;
};

export default async function ForgotPasswordPage({ searchParams }: ForgotPasswordPageProps) {
  const locale = await getServerLocale();
  const params = await searchParams;

  const copyByLocale = {
    bg: {
      title: "Забравена парола",
      description: "Въведете имейла си и ще получите линк за смяна на паролата.",
      rateLimited: "Може да заявите нов линк веднъж на 1 час за този имейл.",
      sent: "Ако имейлът съществува, изпратихме линк за смяна на паролата.",
      email: "Имейл",
      submit: "Изпрати линк",
      backTo: "Обратно към",
      login: "вход",
    },
    en: {
      title: "Forgot password",
      description: "Enter your email and we will send you a reset link.",
      rateLimited: "You can request a new link once per hour for this email.",
      sent: "If the email exists, we sent a password reset link.",
      email: "Email",
      submit: "Send link",
      backTo: "Back to",
      login: "login",
    },
    ro: {
      title: "Parola uitata",
      description: "Introduceti emailul si veti primi un link pentru resetarea parolei.",
      rateLimited: "Puteti solicita un nou link o data pe ora pentru acest email.",
      sent: "Daca emailul exista, am trimis un link pentru resetarea parolei.",
      email: "Email",
      submit: "Trimite link",
      backTo: "Inapoi la",
      login: "autentificare",
    },
  } as const;

  const t = copyByLocale[locale];

  const status =
    params?.status === "rate_limited"
      ? { tone: "error", text: t.rateLimited }
      : params?.status === "sent"
        ? { tone: "success", text: t.sent }
        : null;

  return (
    <main className="min-h-screen bg-brand-background">
      <SiteHeader />
      <Section>
        <Container className="max-w-xl">
          <Card>
            <h1 className="font-heading text-heading-xl">{t.title}</h1>
            <p className="mt-2 text-sm text-brand-muted">{t.description}</p>
            {status ? (
              <p className={`mt-3 text-sm ${status.tone === "success" ? "text-green-300" : "text-red-300"}`}>{status.text}</p>
            ) : null}
            <form action={requestPasswordResetAction} className="mt-6 space-y-4" noValidate>
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <div>
                <label htmlFor="email" className="mb-1 block text-sm">{t.email}</label>
                <input id="email" name="email" type="email" autoComplete="email" maxLength={320} required className="w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3" />
              </div>
              <Button type="submit">{t.submit}</Button>
            </form>
            <p className="mt-4 text-sm text-brand-muted">
              {t.backTo} <Link href="/auth/login" className="underline">{t.login}</Link>.
            </p>
          </Card>
        </Container>
      </Section>
      <SiteFooter />
    </main>
  );
}

