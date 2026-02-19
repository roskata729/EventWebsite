import type { Metadata } from "next";
import Link from "next/link";
import { AuthRegisterForm } from "@/components/forms/AuthRegisterForm";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { getServerLocale } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Регистрация",
  description: "Създаване на потребителски профил.",
  robots: { index: false, follow: false },
};

type RegisterPageProps = {
  searchParams?: Promise<{ error?: string }>;
};

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const locale = await getServerLocale();
  const params = await searchParams;

  const copyByLocale = {
    bg: {
      title: "Регистрация",
      description: "Създайте акаунт, за да пазите история на вашите заявки.",
      alreadyAccount: "Вече имате акаунт?",
      login: "Вход",
    },
    en: {
      title: "Register",
      description: "Create an account to keep a history of your requests.",
      alreadyAccount: "Already have an account?",
      login: "Login",
    },
    ro: {
      title: "Inregistrare",
      description: "Creati un cont pentru a pastra istoricul solicitarilor.",
      alreadyAccount: "Aveti deja cont?",
      login: "Autentificare",
    },
  } as const;

  const t = copyByLocale[locale];

  return (
    <main className="min-h-screen bg-brand-background">
      <SiteHeader />
      <Section>
        <Container className="max-w-xl">
          <Card interactive={false}>
            <h1 className="font-heading text-heading-xl">{t.title}</h1>
            <p className="mt-2 text-sm text-brand-muted">{t.description}</p>
            <AuthRegisterForm errorCode={params?.error} locale={locale} />
            <p className="mt-4 text-sm text-brand-muted">
              {t.alreadyAccount} <Link href="/auth/login" className="underline">{t.login}</Link>
            </p>
          </Card>
        </Container>
      </Section>
      <SiteFooter />
    </main>
  );
}

