"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type PortfolioItem = {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
};

const items: PortfolioItem[] = [
  {
    id: 1,
    title: "Луксозна гала вечеря",
    category: "Корпоративни",
    description: "Корпоративна гала с впечатляващо осветление и сценография по бранд насоки.",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 2,
    title: "Градинска сватба",
    category: "Сватби",
    description: "Романтична церемония на открито с флорални арки и вечерна светлинна концепция.",
    image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 3,
    title: "Премиерно частно парти",
    category: "Частни",
    description: "Енергично събитие с тематични зони, музика на живо и персонализиран декор.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 4,
    title: "Лидерска конференция",
    category: "Конференции",
    description: "Двудневна конференция с панелни дискусии, мрежови сесии и технологична поддръжка.",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 5,
    title: "Крайбрежен тиймбилдинг",
    category: "Тиймбилдинг",
    description: "Програма с екипни активности, работилници и вечерна социална част.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 6,
    title: "Персонализирано преживяване",
    category: "Персонализирани",
    description: "Интерактивно събитие, изградено около историята и целите на клиента.",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=80",
  },
];

const filters = ["Всички", "Корпоративни", "Сватби", "Частни", "Конференции", "Тиймбилдинг", "Персонализирани"];

export function PortfolioGallery() {
  const [activeFilter, setActiveFilter] = useState("Всички");
  const [selected, setSelected] = useState<PortfolioItem | null>(null);

  const filtered = useMemo(
    () => items.filter((item) => activeFilter === "Всички" || item.category === activeFilter),
    [activeFilter],
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => (
          <Button
            key={filter}
            className={activeFilter === filter ? "" : "border-brand-accent/40 bg-brand-surface text-brand-accentSoft"}
            onClick={() => setActiveFilter(filter)}
            type="button"
          >
            {filter}
          </Button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <Card key={item.id} className="overflow-hidden p-0">
            <button type="button" onClick={() => setSelected(item)} className="w-full text-left">
              <img src={item.image} alt={item.title} className="h-52 w-full object-cover" />
              <div className="space-y-2 p-5">
                <p className="text-xs uppercase tracking-[0.14em] text-brand-accentSoft">{item.category}</p>
                <h3 className="font-heading text-heading-md">{item.title}</h3>
                <p className="text-sm text-brand-muted">{item.description}</p>
              </div>
            </button>
          </Card>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-brand-background/90 p-4">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-brand-accent/40 bg-brand-surface">
            <button
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 rounded-full bg-brand-background px-3 py-1 text-xs uppercase tracking-[0.14em]"
            >
              Затвори
            </button>
            <img src={selected.image} alt={selected.title} className="h-64 w-full object-cover sm:h-80" />
            <div className="space-y-3 p-6">
              <p className="text-xs uppercase tracking-[0.14em] text-brand-accentSoft">{selected.category}</p>
              <h3 className="font-heading text-heading-lg">{selected.title}</h3>
              <p className="text-brand-muted">{selected.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
