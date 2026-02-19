import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { loadPublishedServices } from "@/lib/cms";
import { getMessages } from "@/lib/i18n";
import { getServerLocale } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Услуги",
  description: "Разгледайте услугите за организация на корпоративни събития, сватби и конференции.",
  openGraph: { title: "Услуги | Събития Колеви", description: "Цялостни решения за всеки тип събитие.", url: "/services", type: "website" },
};

const fallbackServicesByLocale = {
  bg: [
    { id: 1, name: "Корпоративни събития", slug: "corporate-events", imageUrl: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&w=1000&q=80", description: "Брандирани събития с безупречна продукция и гост мениджмънт.", benefits: ["Брандирано изживяване", "VIP логистика", "Пълна продукция"] },
    { id: 2, name: "Сватби", slug: "weddings", imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80", description: "Концепция, декор и координация в деня за стилна сватба.", benefits: ["Дизайн и декор", "Избор на доставчици", "Координация в деня"] },
    { id: 3, name: "Конференции", slug: "conferences", imageUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=80", description: "Професионални конференции с техническа сигурност.", benefits: ["Програма и график", "Лектори и сцена", "Техническа поддръжка"] },
  ],
  en: [
    { id: 1, name: "Corporate events", slug: "corporate-events", imageUrl: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&w=1000&q=80", description: "Branded events with flawless production and guest management.", benefits: ["Branded experience", "VIP logistics", "Full production"] },
    { id: 2, name: "Weddings", slug: "weddings", imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80", description: "Concept, decor, and day-of coordination for a stylish wedding.", benefits: ["Design and decor", "Vendor sourcing", "Day-of coordination"] },
    { id: 3, name: "Conferences", slug: "conferences", imageUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=80", description: "Professional conferences with reliable technical delivery.", benefits: ["Program and agenda", "Speakers and stage", "Technical support"] },
  ],
  ro: [
    { id: 1, name: "Evenimente corporate", slug: "corporate-events", imageUrl: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&w=1000&q=80", description: "Evenimente de brand cu producție impecabilă și management de invitați.", benefits: ["Experiență de brand", "Logistică VIP", "Producție completă"] },
    { id: 2, name: "Nunți", slug: "weddings", imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80", description: "Concept, decor și coordonare în ziua evenimentului pentru o nuntă elegantă.", benefits: ["Design și decor", "Selecție furnizori", "Coordonare în ziua evenimentului"] },
    { id: 3, name: "Conferințe", slug: "conferences", imageUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=80", description: "Conferințe profesionale cu livrare tehnică sigură.", benefits: ["Program și agendă", "Speakeri și scenă", "Suport tehnic"] },
  ],
};

export default async function ServicesPage() {
  const locale = await getServerLocale();
  const messages = getMessages(locale).services;
  const serviceBlocks = await loadPublishedServices(fallbackServicesByLocale[locale]);

  return (
    <main className="min-h-screen bg-brand-background">
      <SiteHeader />
      <PageHero eyebrow={messages.heroEyebrow} title={messages.heroTitle} description={messages.heroDescription} />
      <Section>
        <Container className="grid gap-6 md:grid-cols-2">
          {serviceBlocks.map((service) => (
            <Card key={service.slug} className="overflow-hidden p-0">
              <div className="relative h-56 w-full">
                <Image src={service.imageUrl} alt={service.name} fill sizes="(max-width: 768px) 100vw, 50vw" loading="lazy" className="object-cover" />
              </div>
              <div className="space-y-4 p-6">
                <h2 className="font-heading text-heading-lg">{service.name}</h2>
                <p className="text-sm text-brand-muted">{service.description}</p>
                <ul className="space-y-2 text-sm text-brand-muted">{service.benefits.map((benefit) => <li key={benefit}>• {benefit}</li>)}</ul>
                <Link href="/request-quote"><Button>{messages.requestService}</Button></Link>
              </div>
            </Card>
          ))}
        </Container>
      </Section>
      <SiteFooter />
    </main>
  );
}
