import { PortfolioGallery } from "@/components/portfolio/PortfolioGallery";
import { PageHero } from "@/components/site/PageHero";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-brand-background">
      <SiteHeader />
      <PageHero
        eyebrow="Портфолио"
        title="Подбрани събития на Събития Колеви"
        description="Филтрирайте по категория и разгледайте реализирани проекти с визуални акценти и кратки описания."
      />
      <Section>
        <Container>
          <PortfolioGallery />
        </Container>
      </Section>
      <SiteFooter />
    </main>
  );
}
