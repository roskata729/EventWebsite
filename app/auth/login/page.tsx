import type { Metadata } from "next";
import Link from "next/link";
import { signInWithEmailAction } from "@/app/auth/actions";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getServerLocale } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Вход",
  description: "Вход в потребителски профил.",
  robots: { index: false, follow: false },
};

type LoginPageProps = {
  searchParams?: Promise<{ error?: string; message?: string; next?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const locale = await getServerLocale();
  const params = await searchParams;
  const next = params?.next?.startsWith("/") ? params.next : "/account";

  const copyByLocale = {
    bg: {
      title: "Вход",
      description: "Влезте в профила си, за да следите вашите запитвания.",
      registered: "Регистрацията е успешна. Може да влезете с вашите данни.",
      passwordUpdated: "Паролата е сменена успешно. Влезте с новата парола.",
      invalidCredentials: "Невалидни данни за вход.",
      email: "Имейл",
      password: "Парола",
      submit: "Вход",
      noAccount: "Нямате акаунт?",
      register: "Регистрирайте се",
      forgotPassword: "Забравена парола?",
      recover: "Възстановяване",
    },
    en: {
      title: "Login",
      description: "Sign in to your profile to track your requests.",
      registered: "Registration successful. You can now sign in.",
      passwordUpdated: "Password updated successfully. Sign in with your new password.",
      invalidCredentials: "Invalid credentials.",
      email: "Email",
      password: "Password",
      submit: "Login",
      noAccount: "No account?",
      register: "Register",
      forgotPassword: "Forgot password?",
      recover: "Recover",
    },
    ro: {
      title: "Autentificare",
      description: "Autentificati-va pentru a urmari solicitarile.",
      registered: "Inregistrarea a fost efectuata. Va puteti autentifica.",
      passwordUpdated: "Parola a fost schimbata cu succes. Autentificati-va cu parola noua.",
      invalidCredentials: "Date de autentificare invalide.",
      email: "Email",
      password: "Parola",
      submit: "Autentificare",
      noAccount: "Nu aveti cont?",
      register: "Inregistrare",
      forgotPassword: "Ati uitat parola?",
      recover: "Recuperare",
    },
  } as const;

  const t = copyByLocale[locale];
  const errorText = params?.error === "invalid_credentials" ? t.invalidCredentials : null;

  return (
    <main className="min-h-screen bg-brand-background">
      <SiteHeader />
      <Section>
        <Container className="max-w-xl">
          <Card interactive={false}>
            <h1 className="font-heading text-heading-xl">{t.title}</h1>
            <p className="mt-2 text-sm text-brand-muted">{t.description}</p>
            {params?.message === "registered" ? <p className="mt-3 text-sm text-green-300">{t.registered}</p> : null}
            {params?.message === "password_updated" ? <p className="mt-3 text-sm text-green-300">{t.passwordUpdated}</p> : null}
            {errorText ? <p className="mt-3 text-sm text-red-300">{errorText}</p> : null}
            <form action={signInWithEmailAction} className="mt-6 space-y-4" noValidate>
              <input type="hidden" name="next" value={next} />
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <div>
                <label htmlFor="email" className="mb-1 block text-sm">{t.email}</label>
                <input id="email" name="email" type="email" autoComplete="email" maxLength={320} required className="w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3" />
              </div>
              <div>
                <label htmlFor="password" className="mb-1 block text-sm">{t.password}</label>
                <input id="password" name="password" type="password" autoComplete="current-password" maxLength={128} required className="w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3" />
              </div>
              <Button type="submit">{t.submit}</Button>
            </form>
            <p className="mt-4 text-sm text-brand-muted">
              {t.noAccount} <Link href="/auth/register" className="underline">{t.register}</Link>
            </p>
            <p className="mt-2 text-sm text-brand-muted">
              {t.forgotPassword} <Link href="/auth/forgot-password" className="underline">{t.recover}</Link>
            </p>
          </Card>
        </Container>
      </Section>
      <SiteFooter />
    </main>
  );
}

