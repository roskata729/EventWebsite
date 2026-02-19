import type { Metadata } from "next";
import Link from "next/link";
import { signInWithEmailAction } from "@/app/auth/actions";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Вход",
  description: "Вход в потребителски профил.",
  robots: { index: false, follow: false },
};

type LoginPageProps = {
  searchParams?: Promise<{ error?: string; message?: string; next?: string }>;
};

function mapError(error?: string) {
  if (error === "invalid_credentials") {
    return "Невалидни данни за вход.";
  }

  return null;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const next = params?.next?.startsWith("/") ? params.next : "/account";

  return (
    <main className="min-h-screen bg-brand-background">
      <SiteHeader />
      <Section>
        <Container className="max-w-xl">
          <Card>
            <h1 className="font-heading text-heading-xl">Вход</h1>
            <p className="mt-2 text-sm text-brand-muted">Влезте в профила си, за да следите вашите запитвания.</p>
            {params?.message === "registered" ? (
              <p className="mt-3 text-sm text-green-300">Регистрацията е успешна. Може да влезете с вашите данни.</p>
            ) : null}
            {params?.message === "password_updated" ? (
              <p className="mt-3 text-sm text-green-300">Паролата е сменена успешно. Влезте с новата парола.</p>
            ) : null}
            {mapError(params?.error) ? <p className="mt-3 text-sm text-red-300">{mapError(params?.error)}</p> : null}
            <form action={signInWithEmailAction} className="mt-6 space-y-4" noValidate>
              <input type="hidden" name="next" value={next} />
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <div>
                <label htmlFor="email" className="mb-1 block text-sm">Имейл</label>
                <input id="email" name="email" type="email" autoComplete="email" maxLength={320} required className="w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3" />
              </div>
              <div>
                <label htmlFor="password" className="mb-1 block text-sm">Парола</label>
                <input id="password" name="password" type="password" autoComplete="current-password" maxLength={128} required className="w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3" />
              </div>
              <Button type="submit">Вход</Button>
            </form>
            <p className="mt-4 text-sm text-brand-muted">
              Нямате акаунт? <Link href="/auth/register" className="underline">Регистрирайте се</Link>
            </p>
            <p className="mt-2 text-sm text-brand-muted">
              Забравена парола? <Link href="/auth/forgot-password" className="underline">Възстановяване</Link>
            </p>
          </Card>
        </Container>
      </Section>
      <SiteFooter />
    </main>
  );
}
