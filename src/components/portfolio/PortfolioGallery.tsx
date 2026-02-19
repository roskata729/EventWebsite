"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { CmsGalleryItem } from "@/lib/cms";

type PortfolioGalleryProps = {
  items: CmsGalleryItem[];
};

export function PortfolioGallery({ items }: PortfolioGalleryProps) {
  const [activeFilter, setActiveFilter] = useState("Всички");
  const [selected, setSelected] = useState<CmsGalleryItem | null>(null);

  const filters = useMemo(() => ["Всички", ...new Set(items.map((item) => item.category))], [items]);

  const filtered = useMemo(
    () => items.filter((item) => activeFilter === "Всички" || item.category === activeFilter),
    [activeFilter, items],
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
              <img src={item.imageUrl} alt={item.title} className="h-52 w-full object-cover" />
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
            <img src={selected.imageUrl} alt={selected.title} className="h-64 w-full object-cover sm:h-80" />
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
