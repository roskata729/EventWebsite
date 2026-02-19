import type { Metadata } from "next";
import Link from "next/link";
import { requestPasswordResetAction } from "@/app/auth/actions";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Забравена парола",
  description: "Изпращане на линк за смяна на парола.",
  robots: { index: false, follow: false },
};

type ForgotPasswordPageProps = {
  searchParams?: Promise<{ status?: string }>;
};

function mapStatus(status?: string) {
  if (status === "rate_limited") {
    return { tone: "error", text: "Може да заявите нов линк веднъж на 1 час за този имейл." };
  }

  if (status === "sent") {
    return { tone: "success", text: "Ако имейлът съществува, изпратихме линк за смяна на паролата." };
  }

  return null;
}

export default async function ForgotPasswordPage({ searchParams }: ForgotPasswordPageProps) {
  const params = await searchParams;
  const status = mapStatus(params?.status);

  return (
    <main className="min-h-screen bg-brand-background">
      <SiteHeader />
      <Section>
        <Container className="max-w-xl">
          <Card>
            <h1 className="font-heading text-heading-xl">Забравена парола</h1>
            <p className="mt-2 text-sm text-brand-muted">Въведете имейла си и ще получите линк за смяна на паролата.</p>
            {status ? (
              <p className={`mt-3 text-sm ${status.tone === "success" ? "text-green-300" : "text-red-300"}`}>{status.text}</p>
            ) : null}
            <form action={requestPasswordResetAction} className="mt-6 space-y-4" noValidate>
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <div>
                <label htmlFor="email" className="mb-1 block text-sm">Имейл</label>
                <input id="email" name="email" type="email" autoComplete="email" maxLength={320} required className="w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3" />
              </div>
              <Button type="submit">Изпрати линк</Button>
            </form>
            <p className="mt-4 text-sm text-brand-muted">
              Обратно към <Link href="/auth/login" className="underline">вход</Link>.
            </p>
          </Card>
        </Container>
      </Section>
      <SiteFooter />
    </main>
  );
}
