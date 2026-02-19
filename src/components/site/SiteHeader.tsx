import Link from "next/link";
import { signOutAction } from "@/app/auth/actions";
import { getCurrentUserContext } from "@/lib/supabase/user-auth";
import { Container } from "@/components/ui/Container";

const links = [
  { href: "/", label: "Начало" },
  { href: "/services", label: "Услуги" },
  { href: "/portfolio", label: "Портфолио" },
  { href: "/about", label: "За нас" },
  { href: "/contact", label: "Контакти" },
  { href: "/request-quote", label: "Заяви оферта" },
];

export async function SiteHeader() {
  const { user, isAdmin } = await getCurrentUserContext();

  return (
    <header className="sticky top-0 z-20 border-b border-brand-accent/20 bg-brand-background/95 backdrop-blur">
      <Container className="flex flex-wrap items-center justify-between gap-4 py-4">
        <Link href="/" className="font-heading text-2xl text-brand-accentSoft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft">
          Събития Колеви
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
                Профил
              </Link>
              {isAdmin ? (
                <Link href="/admin" className="transition hover:text-brand-accentSoft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft">
                  Admin
                </Link>
              ) : null}
              <form action={signOutAction}>
                <button type="submit" className="transition hover:text-brand-accentSoft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft">
                  Изход
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="transition hover:text-brand-accentSoft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft">
                Вход
              </Link>
              <Link href="/auth/register" className="transition hover:text-brand-accentSoft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft">
                Регистрация
              </Link>
            </>
          )}
        </nav>
      </Container>
    </header>
  );
}
