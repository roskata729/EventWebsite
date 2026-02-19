import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const serviceBlocks = [
  {
    title: "Корпоративни събития",
    image: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&w=1000&q=80",
    benefits: ["Брандирано изживяване", "VIP логистика", "Пълна продукция"],
  },
  {
    title: "Сватби",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
    benefits: ["Дизайн и декор", "Избор на доставчици", "Координация в деня"],
  },
  {
    title: "Частни партита",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1000&q=80",
    benefits: ["Тематична концепция", "Артисти и музика", "Гост мениджмънт"],
  },
  {
    title: "Конференции",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=80",
    benefits: ["Програма и график", "Лектори и сцена", "Техническа поддръжка"],
  },
  {
    title: "Тиймбилдинги",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80",
    benefits: ["Ангажиращи активности", "Фасилитирани сесии", "Измерим резултат"],
  },
  {
    title: "Персонализирани събития",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=80",
    benefits: ["Концепция по задание", "Уникална среда", "Пълна реализация"],
  },
];

export default function ServicesPage() {
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
            <Card key={service.title} className="overflow-hidden p-0">
              <img src={service.image} alt={service.title} className="h-56 w-full object-cover" />
              <div className="space-y-4 p-6">
                <h2 className="font-heading text-heading-lg">{service.title}</h2>
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
