import type { Metadata } from "next";
import { PortfolioGallery } from "@/components/portfolio/PortfolioGallery";
import { PageHero } from "@/components/site/PageHero";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { loadPublishedGallery } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Портфолио",
  description: "Разгледайте подбрани реализирани събития в портфолиото на Събития Колеви.",
  openGraph: { title: "Портфолио | Събития Колеви", description: "Подбрани събития с визуални акценти.", url: "/portfolio", type: "website" },
};

const fallbackGallery = [
  { id: 1, title: "Луксозна гала вечеря", category: "Корпоративни", description: "Корпоративна гала с впечатляващо осветление и сценография по бранд насоки.", imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80" },
  { id: 2, title: "Градинска сватба", category: "Сватби", description: "Романтична церемония на открито с флорални арки и вечерна светлинна концепция.", imageUrl: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1000&q=80" },
  { id: 3, title: "Премиерно частно парти", category: "Частни", description: "Енергично събитие с тематични зони, музика на живо и персонализиран декор.", imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80" },
];

export default async function PortfolioPage() {
  const items = await loadPublishedGallery(fallbackGallery);
  return (
    <main className="min-h-screen bg-brand-background">
      <SiteHeader />
      <PageHero eyebrow="Портфолио" title="Подбрани събития на Събития Колеви" description="Филтрирайте по категория и разгледайте реализирани проекти с визуални акценти и кратки описания." />
      <Section><Container><PortfolioGallery items={items} /></Container></Section>
      <SiteFooter />
    </main>
  );
}
