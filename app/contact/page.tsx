import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/site/PageHero";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getMessages } from "@/lib/i18n";
import { getServerLocale } from "@/lib/i18n/server";
import { getCurrentUserSession } from "@/lib/supabase/user-auth";

export const metadata: Metadata = {
  title: "Контакти",
  description: "Свържете се със Събития Колеви за планиране на вашето следващо събитие.",
  openGraph: { title: "Контакти | Събития Колеви", description: "Изпратете запитване към екипа ни.", url: "/contact", type: "website" },
};

export default async function ContactPage() {
  const locale = await getServerLocale();
  const allMessages = getMessages(locale);
  const messages = allMessages.contact;
  const { user } = await getCurrentUserSession();

  if (!user) {
    redirect("/auth/login?next=/contact");
  }

  return (
    <main className="min-h-screen bg-brand-background">
      <SiteHeader />
      <PageHero eyebrow={messages.heroEyebrow} title={messages.heroTitle} description={messages.heroDescription} />
      <Section>
        <Container className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h2 className="font-heading text-heading-lg">{messages.formTitle}</h2>
            <ContactForm locale={locale} initialEmail={user.email ?? ""} lockEmail />
          </Card>
          <div className="space-y-6">
            <Card>
              <h3 className="font-heading text-heading-md">{messages.officeTitle}</h3>
              <p className="mt-3 text-sm text-brand-muted">{messages.officeAddress}</p>
              <div className="mt-4 h-64 overflow-hidden rounded-2xl border border-brand-accent/30">
                <iframe title={messages.mapTitle} src="https://maps.google.com/maps?q=Sofia&t=&z=13&ie=UTF8&iwloc=&output=embed" className="h-full w-full" />
              </div>
            </Card>
            <Card>
              <h3 className="font-heading text-heading-md">{messages.socialTitle}</h3>
              <p className="mt-3 text-sm text-brand-muted">{messages.phone}: +359 700 123 45</p>
              <p className="text-sm text-brand-muted">{messages.email}: hello@sabitiakolevi.bg</p>
              <p className="text-sm text-brand-muted">Instagram: @sabitiakolevi</p>
              <p className="text-sm text-brand-muted">{messages.linkedin}: {allMessages.siteName}</p>
            </Card>
          </div>
        </Container>
      </Section>
      <SiteFooter />
    </main>
  );
}
