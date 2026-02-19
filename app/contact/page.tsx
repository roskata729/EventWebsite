import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/site/PageHero";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Контакти",
  description: "Свържете се със Събития Колеви за планиране на вашето следващо събитие.",
  openGraph: { title: "Контакти | Събития Колеви", description: "Изпратете запитване към екипа ни.", url: "/contact", type: "website" },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-brand-background">
      <SiteHeader />
      <PageHero eyebrow="Контакти" title="Нека планираме вашето следващо събитие" description="Изпратете запитване и екипът на Събития Колеви ще ви предложи подходящ формат, визия и план за реализация." />
      <Section>
        <Container className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h2 className="font-heading text-heading-lg">Форма за контакт</h2>
            <ContactForm />
          </Card>
          <div className="space-y-6">
            <Card>
              <h3 className="font-heading text-heading-md">Нашият офис</h3>
              <p className="mt-3 text-sm text-brand-muted">пл. Събития 12, София, България</p>
              <div className="mt-4 h-64 overflow-hidden rounded-2xl border border-brand-accent/30">
                <iframe title="Карта на Събития Колеви" src="https://maps.google.com/maps?q=Sofia&t=&z=13&ie=UTF8&iwloc=&output=embed" className="h-full w-full" />
              </div>
            </Card>
            <Card>
              <h3 className="font-heading text-heading-md">Социални мрежи и връзка</h3>
              <p className="mt-3 text-sm text-brand-muted">Телефон: +359 700 123 45</p>
              <p className="text-sm text-brand-muted">Имейл: hello@sabitiakolevi.bg</p>
              <p className="text-sm text-brand-muted">Instagram: @sabitiakolevi</p>
              <p className="text-sm text-brand-muted">LinkedIn: Събития Колеви</p>
            </Card>
          </div>
        </Container>
      </Section>
      <SiteFooter />
    </main>
  );
}
