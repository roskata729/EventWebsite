"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getMessages, type Locale } from "@/lib/i18n";
import type { CmsGalleryItem } from "@/lib/cms";

type PortfolioGalleryProps = {
  items: CmsGalleryItem[];
  locale: Locale;
};

export function PortfolioGallery({ items, locale }: PortfolioGalleryProps) {
  const messages = getMessages(locale).portfolio;
  const [activeFilter, setActiveFilter] = useState(messages.all);
  const [selected, setSelected] = useState<CmsGalleryItem | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const filters = useMemo(() => [messages.all, ...new Set(items.map((item) => item.category))], [items, messages.all]);
  const filtered = useMemo(() => items.filter((item) => activeFilter === messages.all || item.category === activeFilter), [activeFilter, items, messages.all]);

  useEffect(() => {
    setActiveFilter(messages.all);
  }, [messages.all]);

  useEffect(() => {
    if (!selected) return;
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selected]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => (
          <Button key={filter} variant={activeFilter === filter ? "primary" : "secondary"} onClick={() => setActiveFilter(filter)} type="button">
            {filter}
          </Button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <Card key={item.id} className="overflow-hidden p-0">
            <button type="button" onClick={() => setSelected(item)} className="w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft">
              <div className="relative h-52 w-full">
                <Image src={item.imageUrl} alt={item.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" loading="lazy" className="object-cover" />
              </div>
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
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-brand-background/90 p-4" onClick={() => setSelected(null)}>
          <div role="dialog" aria-modal="true" aria-label={selected.title} className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-brand-accent/40 bg-brand-surface" onClick={(event) => event.stopPropagation()}>
            <button ref={closeButtonRef} onClick={() => setSelected(null)} className="absolute right-4 top-4 rounded-full bg-brand-background px-3 py-1 text-xs uppercase tracking-[0.14em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft">
              {messages.close}
            </button>
            <div className="relative h-64 w-full sm:h-80">
              <Image src={selected.imageUrl} alt={selected.title} fill sizes="(max-width: 768px) 100vw, 768px" loading="lazy" className="object-cover" />
            </div>
            <div className="space-y-3 p-6"><p className="text-xs uppercase tracking-[0.14em] text-brand-accentSoft">{selected.category}</p><h3 className="font-heading text-heading-lg">{selected.title}</h3><p className="text-brand-muted">{selected.description}</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
