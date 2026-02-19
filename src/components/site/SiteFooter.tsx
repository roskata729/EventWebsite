import { Container } from "@/components/ui/Container";

export function SiteFooter() {
  return (
    <footer className="border-t border-brand-accent/20 bg-brand-surface/80 py-10">
      <Container className="space-y-4 text-center text-sm text-brand-muted sm:text-left">
        <p className="font-heading text-xl text-brand-accentSoft">Събития Колеви</p>
        <p>Премиум организация на корпоративни събития, сватби и частни празници с внимание към всеки детайл.</p>
        <p>© {new Date().getFullYear()} Събития Колеви. Всички права запазени.</p>
      </Container>
    </footer>
  );
}
