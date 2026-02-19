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
      <Container className="py-4">
        <div className="grid items-center gap-3 lg:grid-cols-[auto_1fr_auto]">
          <Link href="/" className="font-heading text-2xl text-brand-accentSoft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft">
            {messages.siteName}
          </Link>

          <nav className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2 text-xs uppercase tracking-[0.12em] text-brand-muted sm:text-sm lg:justify-end">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-brand-accentSoft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="justify-self-start rounded-xl border border-brand-accent/25 bg-brand-surface/40 px-3 py-2 lg:justify-self-end">
            <div className="flex flex-nowrap items-center gap-2">
              {user ? (
                <>
                  <Link href="/account" className="whitespace-nowrap rounded-full border border-brand-accent/30 px-3 py-1 text-xs uppercase tracking-[0.12em] text-brand-muted transition hover:border-brand-accent/60 hover:text-brand-accentSoft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft">
                    {messages.header.auth.profile}
                  </Link>
                  {isAdmin ? (
                    <Link href="/admin" className="whitespace-nowrap rounded-full border border-brand-accent/30 px-3 py-1 text-xs uppercase tracking-[0.12em] text-brand-muted transition hover:border-brand-accent/60 hover:text-brand-accentSoft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft">
                      Admin
                    </Link>
                  ) : null}
                  <form action={signOutAction}>
                    <button type="submit" className="whitespace-nowrap rounded-full border border-brand-accent/30 px-3 py-1 text-xs uppercase tracking-[0.12em] text-brand-muted transition hover:border-brand-accent/60 hover:text-brand-accentSoft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft">
                      {messages.header.auth.signOut}
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="whitespace-nowrap rounded-full border border-brand-accent/30 px-3 py-1 text-xs uppercase tracking-[0.12em] text-brand-muted transition hover:border-brand-accent/60 hover:text-brand-accentSoft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft">
                    {messages.header.auth.login}
                  </Link>
                  <Link href="/auth/register" className="whitespace-nowrap rounded-full border border-brand-accent/30 px-3 py-1 text-xs uppercase tracking-[0.12em] text-brand-muted transition hover:border-brand-accent/60 hover:text-brand-accentSoft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft">
                    {messages.header.auth.register}
                  </Link>
                </>
              )}
            </div>

            <div className="mt-2 flex justify-center">
              <div className="rounded-full border border-brand-accent/25 bg-brand-surface/70 p-1">
                <LanguageSwitcher locale={locale} labels={messages.header.language} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
