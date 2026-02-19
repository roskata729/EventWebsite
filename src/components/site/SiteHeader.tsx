import Link from "next/link";
import { signOutAction } from "@/app/auth/actions";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
import { NotificationBell } from "@/components/site/NotificationBell";
import { Container } from "@/components/ui/Container";
import { getMessages } from "@/lib/i18n";
import { getServerLocale } from "@/lib/i18n/server";
import { getBrandName } from "@/lib/site-settings";
import { getCurrentUserContext } from "@/lib/supabase/user-auth";

export async function SiteHeader() {
  const locale = await getServerLocale();
  const messages = getMessages(locale);
  const brandName = await getBrandName();
  const { supabase, user, isAdmin } = await getCurrentUserContext();
  const notificationLabelsByLocale = {
    bg: {
      ariaLabel: "Известия",
      title: "Известия",
      markAllAsRead: "Маркирай всички",
      deleteAll: "Изтрий всички",
      deleteOne: "Изтрий",
      open: "Отвори",
      empty: "Няма известия.",
      statusTitle: "Промяна по вашата",
      statusMessagePrefix: "Статусът е обновен на:",
      requestLabels: { contact: "контактна заявка", quote: "заявка за оферта" },
      statusLabels: {
        new: "Нова",
        in_review: "В обработка",
        approved: "Одобрена",
        scheduled: "Планирана",
        done: "Завършена",
        rejected: "Отказана",
      },
      dateLocale: "bg-BG",
    },
    en: {
      ariaLabel: "Notifications",
      title: "Notifications",
      markAllAsRead: "Mark all as read",
      deleteAll: "Delete all",
      deleteOne: "Delete",
      open: "Open",
      empty: "No notifications yet.",
      statusTitle: "Update for your",
      statusMessagePrefix: "Status changed to:",
      requestLabels: { contact: "contact request", quote: "quote request" },
      statusLabels: {
        new: "New",
        in_review: "In review",
        approved: "Approved",
        scheduled: "Scheduled",
        done: "Done",
        rejected: "Rejected",
      },
      dateLocale: "en-US",
    },
    ro: {
      ariaLabel: "Notificari",
      title: "Notificari",
      markAllAsRead: "Marcheaza toate",
      deleteAll: "Sterge toate",
      deleteOne: "Sterge",
      open: "Deschide",
      empty: "Nu exista notificari.",
      statusTitle: "Actualizare pentru",
      statusMessagePrefix: "Status actualizat la:",
      requestLabels: { contact: "solicitarea de contact", quote: "solicitarea de oferta" },
      statusLabels: {
        new: "Noua",
        in_review: "In analiza",
        approved: "Aprobata",
        scheduled: "Programata",
        done: "Finalizata",
        rejected: "Respinsa",
      },
      dateLocale: "ro-RO",
    },
  } as const;
  const notificationLabels = notificationLabelsByLocale[locale];

  let initialUnreadCount = 0;
  if (user) {
    const { count } = await supabase
      .from("notifications")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("is_read", false);
    initialUnreadCount = count ?? 0;
  }

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
        <div className="grid items-center gap-3 lg:grid-cols-[auto_minmax(0,1fr)_auto]">
          <Link href="/" className="font-heading text-2xl text-brand-accentSoft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft">
            {brandName}
          </Link>

          <nav className="flex min-w-0 flex-nowrap items-center gap-3 overflow-x-auto whitespace-nowrap text-[11px] uppercase tracking-[0.1em] text-brand-muted sm:text-xs lg:justify-center">
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
                  <NotificationBell initialUnreadCount={initialUnreadCount} labels={notificationLabels} />
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
                  <LanguageSwitcher locale={locale} labels={messages.header.language} />
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="whitespace-nowrap rounded-full border border-brand-accent/30 px-3 py-1 text-xs uppercase tracking-[0.12em] text-brand-muted transition hover:border-brand-accent/60 hover:text-brand-accentSoft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft">
                    {messages.header.auth.login}
                  </Link>
                  <Link href="/auth/register" className="whitespace-nowrap rounded-full border border-brand-accent/30 px-3 py-1 text-xs uppercase tracking-[0.12em] text-brand-muted transition hover:border-brand-accent/60 hover:text-brand-accentSoft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft">
                    {messages.header.auth.register}
                  </Link>
                  <LanguageSwitcher locale={locale} labels={messages.header.language} />
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
