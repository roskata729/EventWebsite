import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "За нас",
  description: "Запознайте се с екипа на Събития Колеви и нашата мисия за премиум събития.",
  openGraph: { title: "За нас | Събития Колеви", description: "Екип, който създава стойностни преживявания.", url: "/about", type: "website" },
};

const team = [
  { name: "Надя Петрова", role: "Креативен директор" },
  { name: "Стефан Колев", role: "Оперативен мениджър" },
  { name: "Мила Иванова", role: "Мениджър клиентско обслужване" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-brand-background">
      <SiteHeader />
      <PageHero eyebrow="За нас" title="Екип, който създава стойностни преживявания" description="Събития Колеви съчетава естетика, стратегия и внимание към хората, за да реализира събития с истинско въздействие." />
      <Section><Container className="grid gap-6 md:grid-cols-2"><Card><h2 className="font-heading text-heading-lg">Нашата история</h2><p className="mt-3 text-brand-muted">Започнахме с идеята да предложим по-висок стандарт в организацията на събития и днес помагаме на клиенти от различни индустрии да постигат силни резултати.</p></Card><Card><h2 className="font-heading text-heading-lg">Мисия и визия</h2><p className="mt-3 text-brand-muted">Мисия: безупречна организация и запомнящи се емоции. Визия: да бъдем водеща агенция за премиум събития в региона.</p></Card></Container></Section>
      <Section className="pt-0"><Container><h2 className="mb-6 font-heading text-heading-xl">Екип</h2><div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">{team.map((member) => (<Card key={member.name}><div className="h-44 rounded-2xl bg-gradient-to-br from-brand-elevated to-brand-surface" /><h3 className="mt-4 font-heading text-heading-md">{member.name}</h3><p className="text-sm text-brand-muted">{member.role}</p></Card>))}</div></Container></Section>
      <Section className="pt-0"><Container className="grid gap-4 sm:grid-cols-3"><Card><p className="text-3xl font-semibold text-brand-accent">250+</p><p className="text-sm text-brand-muted">Реализирани събития</p></Card><Card><p className="text-3xl font-semibold text-brand-accent">96%</p><p className="text-sm text-brand-muted">Доволни клиенти</p></Card><Card><p className="text-3xl font-semibold text-brand-accent">15</p><p className="text-sm text-brand-muted">Професионални отличия</p></Card></Container></Section>
      <SiteFooter />
    </main>
  );
}
