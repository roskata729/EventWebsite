import { Container } from "@/components/ui/Container";
import { type Locale } from "@/lib/i18n";
import { getServerLocale } from "@/lib/i18n/server";

const footerByLocale: Record<Locale, { siteName: string; description: string; rights: string }> = {
  bg: {
    siteName: "Събития Колеви",
    description: "Премиум организация на корпоративни събития, сватби и частни празници с внимание към всеки детайл.",
    rights: "Всички права запазени.",
  },
  en: {
    siteName: "Sabitia Kolevi",
    description: "Premium planning for corporate events, weddings, and private celebrations with attention to every detail.",
    rights: "All rights reserved.",
  },
  ro: {
    siteName: "Sabitia Kolevi",
    description: "Organizare premium pentru evenimente corporate, nunti si petreceri private, cu atentie la fiecare detaliu.",
    rights: "Toate drepturile rezervate.",
  },
};

export async function SiteFooter() {
  const locale = await getServerLocale();
  const content = footerByLocale[locale];

  return (
    <footer className="border-t border-brand-accent/20 bg-brand-surface/80 py-10">
      <Container className="space-y-4 text-center text-sm text-brand-muted sm:text-left">
        <p className="font-heading text-xl text-brand-accentSoft">{content.siteName}</p>
        <p>{content.description}</p>
        <p>(c) {new Date().getFullYear()} {content.siteName}. {content.rights}</p>
      </Container>
    </footer>
  );
}
