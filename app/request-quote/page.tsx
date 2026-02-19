import type { Metadata } from "next";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { PageHero } from "@/components/site/PageHero";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getMessages } from "@/lib/i18n";
import { getServerLocale } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Заяви оферта",
  description: "Споделете детайлите за вашето събитие и ще подготвим персонализирана оферта.",
  openGraph: { title: "Заяви оферта | Събития Колеви", description: "Персонализирана оферта с концепция, бюджет и времеви план.", url: "/request-quote", type: "website" },
};

export default async function RequestQuotePage() {
  const locale = await getServerLocale();
  const messages = getMessages(locale).requestQuote;

  return (
    <main className="min-h-screen bg-brand-background">
      <SiteHeader />
      <PageHero eyebrow={messages.heroEyebrow} title={messages.heroTitle} description={messages.heroDescription} />
      <Section><Container className="max-w-4xl"><Card><h2 className="font-heading text-heading-lg">{messages.formTitle}</h2><QuoteForm locale={locale} /></Card></Container></Section>
      <SiteFooter />
    </main>
  );
}
