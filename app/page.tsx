import Link from "next/link";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { loadPublishedEvents, loadPublishedServices } from "@/lib/cms";

const fallbackServices = [
  {
    id: 1,
    name: "Корпоративни събития",
    slug: "corporate-events",
    description: "Индивидуална концепция, професионална координация и впечатляваща атмосфера.",
    imageUrl: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&w=1000&q=80",
    benefits: [],
  },
  {
    id: 2,
    name: "Сватби",
    slug: "weddings",
    description: "Стилни сватбени преживявания с внимание към всеки детайл.",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
    benefits: [],
  },
  {
    id: 3,
    name: "Частни партита",
    slug: "private-parties",
    description: "Тематични концепции за лични поводи и празници.",
    imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1000&q=80",
    benefits: [],
  },
  {
    id: 4,
    name: "Конференции",
    slug: "conferences",
    description: "Пълна организация на бизнес форуми и професионални срещи.",
    imageUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=80",
    benefits: [],
  },
];

const fallbackEvents = [
  {
    id: 1,
    title: "Гала вечер",
    slug: "gala-evening",
    category: "Корпоративни",
    description: "Луксозно събитие с премиум сценография.",
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=920&q=80",
  },
  {
    id: 2,
    title: "Сватбен уикенд",
    slug: "wedding-weekend",
    category: "Сватби",
    description: "Уикенд концепция за незабравима сватба.",
    imageUrl: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=940&q=80",
  },
  {
    id: 3,
    title: "VIP launch",
    slug: "vip-launch",
    category: "Частни",
    description: "Премиерно събитие с персонално изживяване.",
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=960&q=80",
  },
];

const testimonials = [
  "“Екипът на Събития Колеви превърна нашата годишна гала в незабравимо преживяване.” — Меридиан Груп",
  "“Всяка част от сватбения ни уикенд беше стилна, лична и спокойна за нас.” — Елена и Виктор",
  "“Перфектна организация, ясна комуникация и безупречно изпълнение.” — Axis Tech",
];

export default async function Home() {
  const [services, events] = await Promise.all([
    loadPublishedServices(fallbackServices),
    loadPublishedEvents(fallbackEvents),
  ]);

  return (
    <main className="min-h-screen bg-brand-background">
      <SiteHeader />
      <Section className="bg-gradient-to-b from-brand-background to-brand-surface">
        <Container className="text-center">
          <p className="text-xs uppercase tracking-[0.24em] text-brand-accentSoft">Премиум организация на събития</p>
          <h1 className="mt-4 font-heading text-display-lg md:text-display-xl">Създаваме събития с характер и стил.</h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm text-brand-muted sm:text-base">В Събития Колеви обединяваме креативност, опит и прецизност, за да превърнем всяка идея в преживяване.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/request-quote"><Button>Заяви оферта</Button></Link>
            <Link href="/portfolio"><Button className="border-brand-accent/40 bg-brand-surface text-brand-accentSoft">Виж портфолио</Button></Link>
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <h2 className="mb-6 font-heading text-heading-xl">Услуги</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.slice(0, 4).map((service) => (
              <Card key={service.slug}>
                <h3 className="font-heading text-heading-md">{service.name}</h3>
                <p className="mt-3 text-sm text-brand-muted">{service.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <h2 className="mb-6 font-heading text-heading-xl">Избрана галерия</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {events.slice(0, 3).map((event) => (
              <img key={event.id} src={event.imageUrl} alt={event.title} className="h-56 w-full rounded-2xl object-cover" />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <h2 className="mb-6 font-heading text-heading-xl">Отзиви</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((quote) => (
              <Card key={quote}><p className="text-sm text-brand-muted">{quote}</p></Card>
            ))}
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </main>
  );
}
