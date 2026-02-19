import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { loadPublishedServices } from "@/lib/cms";

const fallbackServices = [
  {
    id: 1,
    name: "Корпоративни събития",
    slug: "corporate-events",
    imageUrl: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&w=1000&q=80",
    description: "Брандирани събития с безупречна продукция и гост мениджмънт.",
    benefits: ["Брандирано изживяване", "VIP логистика", "Пълна продукция"],
  },
  {
    id: 2,
    name: "Сватби",
    slug: "weddings",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
    description: "Концепция, декор и координация в деня за стилна сватба.",
    benefits: ["Дизайн и декор", "Избор на доставчици", "Координация в деня"],
  },
  {
    id: 3,
    name: "Конференции",
    slug: "conferences",
    imageUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=80",
    description: "Професионални конференции с техническа сигурност.",
    benefits: ["Програма и график", "Лектори и сцена", "Техническа поддръжка"],
  },
];

export default async function ServicesPage() {
  const serviceBlocks = await loadPublishedServices(fallbackServices);

  return (
    <main className="min-h-screen bg-brand-background">
      <SiteHeader />
      <PageHero
        eyebrow="Нашите услуги"
        title="Цялостни решения за всеки тип събитие"
        description="Открийте услугите на Събития Колеви, създадени за високо качество, стил и безпроблемна организация."
      />
      <Section>
        <Container className="grid gap-6 md:grid-cols-2">
          {serviceBlocks.map((service) => (
            <Card key={service.slug} className="overflow-hidden p-0">
              <img src={service.imageUrl} alt={service.name} className="h-56 w-full object-cover" />
              <div className="space-y-4 p-6">
                <h2 className="font-heading text-heading-lg">{service.name}</h2>
                <p className="text-sm text-brand-muted">{service.description}</p>
                <ul className="space-y-2 text-sm text-brand-muted">
                  {service.benefits.map((benefit) => (
                    <li key={benefit}>• {benefit}</li>
                  ))}
                </ul>
                <Link href="/request-quote"><Button>Заяви тази услуга</Button></Link>
              </div>
            </Card>
          ))}
        </Container>
      </Section>
      <SiteFooter />
    </main>
  );
}
