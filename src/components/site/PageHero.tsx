import { HeroMotion } from "@/components/motion/HeroMotion";
import { Container } from "@/components/ui/Container";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="border-b border-brand-accent/20 bg-gradient-to-b from-brand-background to-brand-surface py-16 sm:py-20">
      <Container className="text-center">
        <HeroMotion>
          <p className="text-xs uppercase tracking-[0.28em] text-brand-accentSoft">{eyebrow}</p>
          <h1 className="mt-4 font-heading text-display-lg text-brand-foreground md:text-display-xl">{title}</h1>
          <p className="mx-auto mt-6 max-w-3xl text-sm text-brand-muted sm:text-base">{description}</p>
        </HeroMotion>
      </Container>
    </section>
  );
}
