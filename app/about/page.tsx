import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getMessages } from "@/lib/i18n";
import { getServerLocale } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "За нас",
  description: "Запознайте се с екипа на Събития Колеви и нашата мисия за премиум събития.",
  openGraph: { title: "За нас | Събития Колеви", description: "Екип, който създава стойностни преживявания.", url: "/about", type: "website" },
};

const teamByLocale = {
  bg: [
    { name: "Надя Петрова", role: "Креативен директор" },
    { name: "Стефан Колев", role: "Оперативен мениджър" },
    { name: "Мила Иванова", role: "Мениджър клиентско обслужване" },
  ],
  en: [
    { name: "Nadia Petrova", role: "Creative Director" },
    { name: "Stefan Kolev", role: "Operations Manager" },
    { name: "Mila Ivanova", role: "Client Service Manager" },
  ],
  ro: [
    { name: "Nadia Petrova", role: "Director de creație" },
    { name: "Stefan Kolev", role: "Manager operațional" },
    { name: "Mila Ivanova", role: "Manager relații clienți" },
  ],
} as const;

export default async function AboutPage() {
  const locale = await getServerLocale();
  const messages = getMessages(locale).about;
  const team = teamByLocale[locale];

  return (
    <main className="min-h-screen bg-brand-background">
      <SiteHeader />
      <PageHero eyebrow={messages.heroEyebrow} title={messages.heroTitle} description={messages.heroDescription} />
      <Section><Container className="grid gap-6 md:grid-cols-2"><Card><h2 className="font-heading text-heading-lg">{messages.storyTitle}</h2><p className="mt-3 text-brand-muted">{messages.storyText}</p></Card><Card><h2 className="font-heading text-heading-lg">{messages.missionTitle}</h2><p className="mt-3 text-brand-muted">{messages.missionText}</p></Card></Container></Section>
      <Section className="pt-0"><Container><h2 className="mb-6 font-heading text-heading-xl">{messages.teamTitle}</h2><div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">{team.map((member) => (<Card key={member.name}><div className="h-44 rounded-2xl bg-gradient-to-br from-brand-elevated to-brand-surface" /><h3 className="mt-4 font-heading text-heading-md">{member.name}</h3><p className="text-sm text-brand-muted">{member.role}</p></Card>))}</div></Container></Section>
      <Section className="pt-0"><Container className="grid gap-4 sm:grid-cols-3"><Card><p className="text-3xl font-semibold text-brand-accent">250+</p><p className="text-sm text-brand-muted">{messages.statsEvents}</p></Card><Card><p className="text-3xl font-semibold text-brand-accent">96%</p><p className="text-sm text-brand-muted">{messages.statsClients}</p></Card><Card><p className="text-3xl font-semibold text-brand-accent">15</p><p className="text-sm text-brand-muted">{messages.statsAwards}</p></Card></Container></Section>
      <SiteFooter />
    </main>
  );
}
