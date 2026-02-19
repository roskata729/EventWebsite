import type { Metadata } from "next";
import Link from "next/link";
import { AuthRegisterForm } from "@/components/forms/AuthRegisterForm";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Регистрация",
  description: "Създаване на потребителски профил.",
  robots: { index: false, follow: false },
};

type RegisterPageProps = {
  searchParams?: Promise<{ error?: string }>;
};

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const params = await searchParams;

  return (
    <main className="min-h-screen bg-brand-background">
      <SiteHeader />
      <Section>
        <Container className="max-w-xl">
          <Card>
            <h1 className="font-heading text-heading-xl">Регистрация</h1>
            <p className="mt-2 text-sm text-brand-muted">Създайте акаунт, за да пазите история на вашите заявки.</p>
            <AuthRegisterForm errorCode={params?.error} />
            <p className="mt-4 text-sm text-brand-muted">
              Вече имате акаунт? <Link href="/auth/login" className="underline">Вход</Link>
            </p>
          </Card>
        </Container>
      </Section>
      <SiteFooter />
    </main>
  );
}
