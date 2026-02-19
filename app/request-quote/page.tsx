import type { Metadata } from "next";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { PageHero } from "@/components/site/PageHero";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Заяви оферта",
  description: "Споделете детайлите за вашето събитие и ще подготвим персонализирана оферта.",
  openGraph: { title: "Заяви оферта | Събития Колеви", description: "Персонализирана оферта с концепция, бюджет и времеви план.", url: "/request-quote", type: "website" },
};

export default function RequestQuotePage() {
  return (
    <main className="min-h-screen bg-brand-background">
      <SiteHeader />
      <PageHero eyebrow="Заяви оферта" title="Разкажете ни за вашето събитие" description="Споделете основните параметри и ще подготвим персонализирана оферта с концепция, бюджет и времеви план." />
      <Section><Container className="max-w-4xl"><Card><h2 className="font-heading text-heading-lg">Форма за запитване</h2><QuoteForm /></Card></Container></Section>
      <SiteFooter />
    </main>
  );
}
