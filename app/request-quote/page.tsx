import { PageHero } from "@/components/site/PageHero";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export default function RequestQuotePage() {
  return (
    <main className="min-h-screen bg-brand-background">
      <SiteHeader />
      <PageHero
        eyebrow="Заяви оферта"
        title="Разкажете ни за вашето събитие"
        description="Споделете основните параметри и ще подготвим персонализирана оферта с концепция, бюджет и времеви план."
      />
      <Section>
        <Container className="max-w-4xl">
          <Card>
            <h2 className="font-heading text-heading-lg">Форма за запитване</h2>
            <form className="mt-6 grid gap-4 sm:grid-cols-2">
              <input className="rounded-xl border border-brand-accent/30 bg-brand-background p-3" placeholder="Име и фамилия" />
              <input className="rounded-xl border border-brand-accent/30 bg-brand-background p-3" placeholder="Имейл" />
              <select className="rounded-xl border border-brand-accent/30 bg-brand-background p-3">
                <option>Тип събитие</option>
                <option>Корпоративно събитие</option>
                <option>Сватба</option>
                <option>Частно парти</option>
                <option>Конференция</option>
                <option>Тиймбилдинг</option>
                <option>Персонализирано събитие</option>
              </select>
              <input className="rounded-xl border border-brand-accent/30 bg-brand-background p-3" placeholder="Очакван брой гости" />
              <input className="rounded-xl border border-brand-accent/30 bg-brand-background p-3" placeholder="Бюджетен диапазон" />
              <input className="rounded-xl border border-brand-accent/30 bg-brand-background p-3" placeholder="Предпочитана локация" />
              <input type="date" className="rounded-xl border border-brand-accent/30 bg-brand-background p-3" />
              <input className="rounded-xl border border-brand-accent/30 bg-brand-background p-3" placeholder="Телефон" />
              <textarea className="sm:col-span-2 min-h-36 rounded-xl border border-brand-accent/30 bg-brand-background p-3" placeholder="Опишете атмосферата, целите и важните детайли за вашето събитие" />
              <div className="sm:col-span-2">
                <Button type="submit">Изпрати запитване</Button>
              </div>
            </form>
          </Card>
        </Container>
      </Section>
      <SiteFooter />
    </main>
  );
}
