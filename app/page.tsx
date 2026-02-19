import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-brand-background to-brand-surface">
      <Section>
        <Container className="text-center">
          <p className="mb-4 font-body text-xs uppercase tracking-[0.28em] text-brand-accentSoft">
            Събития Колеви • Премиум организация на събития
          </p>
          <h1 className="font-heading text-display-lg text-brand-foreground md:text-display-xl">
            Създаваме елегантни събития с незабравимо присъствие.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-brand-muted md:text-lg">
            Доверете се на Събития Колеви за изискано планиране, стилна визия и безупречна
            реализация на корпоративни и лични поводи.
          </p>
          <div className="mt-10 flex justify-center">
            <Button>Заяви консултация</Button>
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <h2 className="font-heading text-heading-md text-brand-accent">Премиум концепция</h2>
              <p className="mt-3 text-sm text-brand-muted">
                Всяко събитие получава индивидуална идея, вдъхновена от вашата марка и стил.
              </p>
            </Card>
            <Card>
              <h2 className="font-heading text-heading-md text-brand-accent">Прецизна организация</h2>
              <p className="mt-3 text-sm text-brand-muted">
                Координираме всеки детайл — от локацията до програмата — за безпроблемно
                преживяване.
              </p>
            </Card>
            <Card>
              <h2 className="font-heading text-heading-md text-brand-accent">Впечатляващ резултат</h2>
              <p className="mt-3 text-sm text-brand-muted">
                Съчетавайки естетика и професионализъм, превръщаме всяка идея в запомнящо се
                събитие.
              </p>
            </Card>
          </div>
        </Container>
      </Section>
    </main>
  );
}
