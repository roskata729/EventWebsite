import Link from "next/link";
import { signOutAction } from "@/app/auth/actions";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
import { Container } from "@/components/ui/Container";
import { getMessages } from "@/lib/i18n";
import { getServerLocale } from "@/lib/i18n/server";
import { getCurrentUserContext } from "@/lib/supabase/user-auth";

export async function SiteHeader() {
  const locale = await getServerLocale();
  const messages = getMessages(locale);
  const { user, isAdmin } = await getCurrentUserContext();

  const links = [
    { href: "/", label: messages.header.nav.home },
    { href: "/services", label: messages.header.nav.services },
    { href: "/portfolio", label: messages.header.nav.portfolio },
    { href: "/about", label: messages.header.nav.about },
    { href: "/contact", label: messages.header.nav.contact },
    { href: "/request-quote", label: messages.header.nav.requestQuote },
  ];

  return (
    <header className="sticky top-0 z-20 border-b border-brand-accent/20 bg-brand-background/95 backdrop-blur">
      <Container className="flex flex-wrap items-center justify-between gap-4 py-4">
        <Link href="/" className="font-heading text-2xl text-brand-accentSoft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft">
          {messages.siteName}
        </Link>
        <nav className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.12em] text-brand-muted sm:text-sm">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-brand-accentSoft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft">
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link href="/account" className="transition hover:text-brand-accentSoft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft">
                {messages.header.auth.profile}
              </Link>
              {isAdmin ? (
                <Link href="/admin" className="transition hover:text-brand-accentSoft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft">
                  Admin
                </Link>
              ) : null}
              <form action={signOutAction}>
                <button type="submit" className="transition hover:text-brand-accentSoft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft">
                  {messages.header.auth.signOut}
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="transition hover:text-brand-accentSoft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft">
                {messages.header.auth.login}
              </Link>
              <Link href="/auth/register" className="transition hover:text-brand-accentSoft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft">
                {messages.header.auth.register}
              </Link>
            </>
          )}
          <LanguageSwitcher locale={locale} labels={messages.header.language} />
        </nav>
      </Container>
    </header>
  );
}
