import Link from "next/link";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const services = ["Корпоративни събития", "Сватби", "Частни партита", "Конференции"];
const testimonials = [
  "“Екипът на Събития Колеви превърна нашата годишна гала в незабравимо преживяване.” — Меридиан Груп",
  "“Всяка част от сватбения ни уикенд беше стилна, лична и спокойна за нас.” — Елена и Виктор",
  "“Перфектна организация, ясна комуникация и безупречно изпълнение.” — Axis Tech",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-background">
      <SiteHeader />

      <Section className="bg-gradient-to-b from-brand-background to-brand-surface">
        <Container className="text-center">
          <p className="text-xs uppercase tracking-[0.24em] text-brand-accentSoft">Премиум организация на събития</p>
          <h1 className="mt-4 font-heading text-display-lg md:text-display-xl">Създаваме събития с характер и стил.</h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm text-brand-muted sm:text-base">
            В Събития Колеви обединяваме креативност, опит и прецизност, за да превърнем всяка идея в преживяване, което остава в паметта.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/request-quote"><Button>Заяви оферта</Button></Link>
            <Link href="/portfolio"><Button className="border-brand-accent/40 bg-brand-surface text-brand-accentSoft">Виж портфолио</Button></Link>
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-8 md:grid-cols-2">
          <Card>
            <h2 className="font-heading text-heading-lg text-brand-accentSoft">Кои сме ние</h2>
            <p className="mt-3 text-brand-muted">Планираме и реализираме събития от първата идея до финалния акорд с ясна структура и без компромис в качеството.</p>
          </Card>
          <Card>
            <h2 className="font-heading text-heading-lg text-brand-accentSoft">Защо ни избират</h2>
            <p className="mt-3 text-brand-muted">Работим с доверени партньори, следваме стриктни срокове и осигуряваме спокойствие за вас и вашите гости.</p>
          </Card>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <h2 className="mb-6 font-heading text-heading-xl">Услуги</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <Card key={service}>
                <h3 className="font-heading text-heading-md">{service}</h3>
                <p className="mt-3 text-sm text-brand-muted">Индивидуална концепция, професионална координация и впечатляваща атмосфера.</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <h2 className="mb-6 font-heading text-heading-xl">Избрана галерия</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <img
                key={item}
                src={`https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=${900 + item * 20}&q=80`}
                alt={`Събитие ${item}`}
                className="h-56 w-full rounded-2xl object-cover"
              />
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

      <Section className="pt-0">
        <Container className="grid gap-6 md:grid-cols-3">
          {[
            "Опитен екип с внимание към детайла",
            "Креативни решения според вашите цели",
            "Структурирано планиране и безупречно изпълнение",
          ].map((reason) => (
            <Card key={reason}><p className="font-medium">{reason}</p></Card>
          ))}
        </Container>
      </Section>

      <Section className="pt-0">
        <Container className="rounded-3xl border border-brand-accent/40 bg-brand-surface p-8 text-center">
          <h2 className="font-heading text-heading-xl">Готови ли сте за следващото си запомнящо се събитие?</h2>
          <p className="mt-3 text-brand-muted">Свържете се с нас и ще изготвим персонализирана концепция за вашия повод.</p>
          <div className="mt-6"><Link href="/contact"><Button>Свържи се с екипа</Button></Link></div>
        </Container>
      </Section>

      <SiteFooter />
    </main>
  );
}
