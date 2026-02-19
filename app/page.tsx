import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroMotion } from "@/components/motion/HeroMotion";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getMessages } from "@/lib/i18n";
import { getServerLocale } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Home",
  description: "Premium event organization in Sofia for corporate formats, weddings, and private occasions.",
  openGraph: {
    title: "Events Kolevi | Home",
    description: "We create events with character and style.",
    url: "/",
    type: "website",
  },
};

const servicesByLocale = {
  bg: [
    {
      slug: "corporate-events",
      name: "Корпоративни събития",
      description: "Планиране и изпълнение на фирмени събития с ясна концепция и прецизна организация.",
      imageUrl: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&w=1000&q=80",
    },
    {
      slug: "weddings",
      name: "Сватби",
      description: "Цялостна организация на сватбения ден с внимание към атмосфера, стил и детайл.",
      imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
    },
    {
      slug: "private-parties",
      name: "Частни поводи",
      description: "Рождени дни, юбилеи и персонални празненства с индивидуален подход.",
      imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1000&q=80",
    },
  ],
  en: [
    {
      slug: "corporate-events",
      name: "Corporate events",
      description: "Planning and production for business events with clear concept and seamless execution.",
      imageUrl: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&w=1000&q=80",
    },
    {
      slug: "weddings",
      name: "Weddings",
      description: "End-to-end wedding planning with attention to mood, aesthetics, and details.",
      imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
    },
    {
      slug: "private-parties",
      name: "Private occasions",
      description: "Birthdays, anniversaries, and personal celebrations tailored to your style.",
      imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1000&q=80",
    },
  ],
  ro: [
    {
      slug: "corporate-events",
      name: "Evenimente corporate",
      description: "Planificare și execuție pentru evenimente de business, cu concept clar și organizare impecabilă.",
      imageUrl: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&w=1000&q=80",
    },
    {
      slug: "weddings",
      name: "Nunți",
      description: "Organizare completă a nunții, cu atenție la atmosferă, estetică și detalii.",
      imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
    },
    {
      slug: "private-parties",
      name: "Evenimente private",
      description: "Aniversări și petreceri personalizate, adaptate stilului și preferințelor tale.",
      imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1000&q=80",
    },
  ],
};

export default async function Home() {
  const locale = await getServerLocale();
  const messages = getMessages(locale);
  const services = servicesByLocale[locale];

  return (
    <main className="min-h-screen bg-brand-background">
      <SiteHeader />

      <Section className="bg-gradient-to-b from-brand-background to-brand-surface">
        <Container className="text-center">
          <HeroMotion>
            <p className="text-xs uppercase tracking-[0.24em] text-brand-accentSoft">{messages.home.eyebrow}</p>
            <h1 className="mt-4 font-heading text-display-lg md:text-display-xl">{messages.home.title}</h1>
            <p className="mx-auto mt-5 max-w-2xl text-sm text-brand-muted sm:text-base">{messages.home.description}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/request-quote">
                <Button>{messages.home.ctaQuote}</Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="secondary">{messages.home.ctaPortfolio}</Button>
              </Link>
            </div>
          </HeroMotion>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <h2 className="mb-6 font-heading text-heading-xl">{messages.home.servicesTitle}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Card key={service.slug} className="overflow-hidden p-0">
                <div className="relative h-52 w-full">
                  <Image
                    src={service.imageUrl}
                    alt={service.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-heading-md">{service.name}</h3>
                  <p className="mt-3 text-sm text-brand-muted">{service.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <h2 className="mb-6 font-heading text-heading-xl">{messages.home.testimonialsTitle}</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {messages.home.testimonials.map((item) => (
              <Card key={item}>
                <p className="text-sm leading-relaxed text-brand-muted">{item}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </main>
  );
}
