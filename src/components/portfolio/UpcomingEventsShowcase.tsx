"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Card } from "@/components/ui/Card";
import { AnimatePresence, motion } from "framer-motion";

type PortfolioEvent = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category: string | null;
  event_date: string | null;
  location: string | null;
  cover_image_url: string | null;
};

type ShowcaseUi = {
  upcoming: string;
  empty: string;
  general: string;
  dateTbd: string;
  noDescription: string;
  calendarTitle: string;
  calendarSubtitle: string;
  noEventsThisMonth: string;
};

type UpcomingEventsShowcaseProps = {
  events: PortfolioEvent[];
  ui: ShowcaseUi;
  locale: "bg" | "en" | "ro";
  showCalendar?: boolean;
};

const ROTATION_MS = 10000;
const VISIBLE_CARDS = 3;
const DESCRIPTION_LIMIT = 120;
const SLIDE_ANIMATION_MS = 650;
const WEEKDAY_KEYS = [1, 2, 3, 4, 5, 6, 0] as const;

const TAG_STYLE_VARIANTS = [
  "border-brand-accent/50 bg-brand-accent/15 text-brand-accentSoft",
  "border-emerald-300/40 bg-emerald-300/15 text-emerald-100",
  "border-sky-300/40 bg-sky-300/15 text-sky-100",
  "border-rose-300/40 bg-rose-300/15 text-rose-100",
  "border-amber-200/50 bg-amber-200/20 text-amber-100",
] as const;

function resolveImageUrl(rawUrl: string | null) {
  if (!rawUrl) return "";

  try {
    const url = new URL(rawUrl);
    if ((url.hostname === "www.google.com" || url.hostname === "google.com") && url.pathname === "/imgres") {
      return url.searchParams.get("imgurl") ?? "";
    }
    return rawUrl;
  } catch {
    return "";
  }
}

function getLocaleTag(locale: "bg" | "en" | "ro") {
  if (locale === "bg") return "bg-BG";
  if (locale === "ro") return "ro-RO";
  return "en-US";
}

function normalizeDate(rawDate: string | null) {
  if (!rawDate) return null;
  const parsed = new Date(`${rawDate}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed;
}

function getCategoryStyle(category: string | null) {
  const key = (category ?? "general").toLowerCase();
  let hash = 0;
  for (let index = 0; index < key.length; index += 1) {
    hash = (hash << 5) - hash + key.charCodeAt(index);
    hash |= 0;
  }
  const variantIndex = Math.abs(hash) % TAG_STYLE_VARIANTS.length;
  return TAG_STYLE_VARIANTS[variantIndex];
}

function getCategoryDotStyle(category: string | null) {
  const token = getCategoryStyle(category);
  if (token.includes("emerald")) return "bg-emerald-300";
  if (token.includes("sky")) return "bg-sky-300";
  if (token.includes("rose")) return "bg-rose-300";
  if (token.includes("amber")) return "bg-amber-200";
  return "bg-brand-accent";
}

function truncateText(value: string, limit: number) {
  if (value.length <= limit) return value;
  return `${value.slice(0, limit).trimEnd()}...`;
}

export function UpcomingEventsShowcase({ events, ui, locale, showCalendar = true }: UpcomingEventsShowcaseProps) {
  const localeTag = getLocaleTag(locale);
  const hasEvents = events.length > 0;
  const hasCarousel = events.length > VISIBLE_CARDS;
  const [startIndex, setStartIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);
  const [isSliding, setIsSliding] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<PortfolioEvent | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const firstEventDate = useMemo(() => {
    const firstWithDate = events.find((item) => item.event_date);
    const parsed = normalizeDate(firstWithDate?.event_date ?? null);
    return parsed ?? new Date();
  }, [events]);

  const [calendarMonth, setCalendarMonth] = useState(
    new Date(firstEventDate.getFullYear(), firstEventDate.getMonth(), 1),
  );

  useEffect(() => {
    setCalendarMonth(new Date(firstEventDate.getFullYear(), firstEventDate.getMonth(), 1));
  }, [firstEventDate]);

  useEffect(() => {
    if (!hasCarousel || selectedEvent) return undefined;

    const timer = window.setInterval(() => {
      if (isSliding) return;
      setSlideDirection(1);
      setIsSliding(true);
      setStartIndex((previous) => (previous + 1) % events.length);
    }, ROTATION_MS);

    return () => window.clearInterval(timer);
  }, [events.length, hasCarousel, isSliding, selectedEvent]);

  useEffect(() => {
    if (!isSliding) return undefined;
    const timer = window.setTimeout(() => setIsSliding(false), SLIDE_ANIMATION_MS);
    return () => window.clearTimeout(timer);
  }, [isSliding]);

  useEffect(() => {
    if (!hasCarousel) {
      setStartIndex(0);
      return;
    }
    if (startIndex >= events.length) setStartIndex(0);
  }, [events.length, hasCarousel, startIndex]);

  useEffect(() => {
    if (!selectedEvent) return;

    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedEvent(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedEvent]);

  const visibleEvents = useMemo(() => {
    if (!hasCarousel) return events;
    return Array.from({ length: VISIBLE_CARDS }, (_, offset) => events[(startIndex + offset) % events.length]);
  }, [events, hasCarousel, startIndex]);

  const eventsByDate = useMemo(() => {
    const map = new Map<string, PortfolioEvent[]>();
    for (const item of events) {
      if (!item.event_date) continue;
      const current = map.get(item.event_date) ?? [];
      current.push(item);
      map.set(item.event_date, current);
    }
    return map;
  }, [events]);

  const monthTitle = useMemo(
    () => new Intl.DateTimeFormat(localeTag, { month: "long", year: "numeric" }).format(calendarMonth),
    [calendarMonth, localeTag],
  );

  const weekdayNames = useMemo(
    () =>
      WEEKDAY_KEYS.map((weekday) =>
        new Intl.DateTimeFormat(localeTag, { weekday: "short" }).format(new Date(2024, 0, weekday + 1)),
      ),
    [localeTag],
  );

  const daysInMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 0).getDate();
  const firstWeekday = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), 1).getDay();
  const leadingSlots = (firstWeekday + 6) % 7;
  const dayCells = Array.from({ length: leadingSlots + daysInMonth }, (_, cellIndex) => {
    const dayOfMonth = cellIndex - leadingSlots + 1;
    if (dayOfMonth <= 0) return null;

    const isoDate = `${calendarMonth.getFullYear()}-${String(calendarMonth.getMonth() + 1).padStart(2, "0")}-${String(dayOfMonth).padStart(2, "0")}`;
    const dayEvents = eventsByDate.get(isoDate) ?? [];

    return {
      isoDate,
      dayOfMonth,
      dayEvents,
    };
  });

  const monthEvents = useMemo(() => {
    const monthPrefix = `${calendarMonth.getFullYear()}-${String(calendarMonth.getMonth() + 1).padStart(2, "0")}-`;
    return events.filter((item) => item.event_date?.startsWith(monthPrefix));
  }, [calendarMonth, events]);

  const shiftMonth = (step: number) => {
    setCalendarMonth((current) => new Date(current.getFullYear(), current.getMonth() + step, 1));
  };

  const previousSlide = () => {
    if (isSliding) return;
    setSlideDirection(-1);
    setIsSliding(true);
    setStartIndex((current) => (current - 1 + events.length) % events.length);
  };

  const nextSlide = () => {
    if (isSliding) return;
    setSlideDirection(1);
    setIsSliding(true);
    setStartIndex((current) => (current + 1) % events.length);
  };

  const renderEventCard = (event: PortfolioEvent) => {
    const fullDescription = event.description ?? ui.noDescription;
    const previewDescription = truncateText(fullDescription, DESCRIPTION_LIMIT);

    return (
      <Card interactive={false} className="h-[32rem] overflow-hidden p-0 transition hover:border-brand-accent/70">
        <button
          type="button"
          className="flex h-full w-full cursor-pointer flex-col text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft"
          onClick={() => setSelectedEvent(event)}
          aria-label={event.title}
        >
          <div className="relative h-52 w-full">
            {resolveImageUrl(event.cover_image_url) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={resolveImageUrl(event.cover_image_url)}
                alt={event.title}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-brand-elevated" />
            )}
          </div>
          <div className="flex min-h-0 flex-1 flex-col p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-brand-accentSoft">{event.category ?? ui.general}</p>
            <h3
              className="mt-2 min-h-[3.9rem] overflow-hidden font-heading text-heading-md"
              style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}
            >
              {event.title}
            </h3>
            <p className="mt-2 min-h-[1.25rem] text-xs text-brand-muted">
              {event.event_date ?? ui.dateTbd}
              {event.location ? ` - ${event.location}` : ""}
            </p>
            <p
              className="mt-2 max-h-[4.5rem] overflow-hidden break-words text-sm leading-6 text-brand-muted"
              style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", wordBreak: "break-word" }}
            >
              {previewDescription}
            </p>
          </div>
        </button>
      </Card>
    );
  };

  return (
    <div className="space-y-8">
      {showCalendar ? (
        <Card interactive={false} className="p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="font-heading text-heading-md">{ui.calendarTitle}</h2>
              <p className="text-sm text-brand-muted">{ui.calendarSubtitle}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => shiftMonth(-1)}
                className="rounded-full border border-brand-accent/40 bg-brand-elevated px-3 py-1 text-sm text-brand-foreground transition hover:border-brand-accent"
                aria-label="Previous month"
              >
                {"<"}
              </button>
              <button
                type="button"
                onClick={() => shiftMonth(1)}
                className="rounded-full border border-brand-accent/40 bg-brand-elevated px-3 py-1 text-sm text-brand-foreground transition hover:border-brand-accent"
                aria-label="Next month"
              >
                {">"}
              </button>
            </div>
          </div>

          <div className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-brand-accentSoft">{monthTitle}</div>

          <div className="grid grid-cols-7 gap-2">
            {weekdayNames.map((dayName) => (
              <div key={dayName} className="pb-1 text-center text-[11px] uppercase tracking-[0.08em] text-brand-muted">
                {dayName}
              </div>
            ))}

            {dayCells.map((dayCell, index) => (
              <div
                key={dayCell?.isoDate ?? `empty-${index}`}
                className="min-h-16 rounded-xl border border-brand-accent/20 bg-brand-background/60 p-2"
              >
                {dayCell ? (
                  <>
                    <p className="text-xs text-brand-foreground">{dayCell.dayOfMonth}</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {dayCell.dayEvents.slice(0, 2).map((event) => (
                        <span
                          key={event.id}
                          title={event.title}
                          className={`inline-block h-2 w-2 rounded-full ${getCategoryDotStyle(event.category)}`}
                        />
                      ))}
                      {dayCell.dayEvents.length > 2 ? (
                        <span className="text-[10px] leading-none text-brand-muted">+{dayCell.dayEvents.length - 2}</span>
                      ) : null}
                    </div>
                  </>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2">
            {monthEvents.length === 0 ? (
              <p className="text-sm text-brand-muted">{ui.noEventsThisMonth}</p>
            ) : (
              monthEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-brand-accent/20 bg-brand-background/40 px-3 py-2"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-brand-foreground">{event.title}</p>
                    <p className="text-xs text-brand-muted">{event.location ?? ui.general}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full border px-2 py-0.5 text-[11px] ${getCategoryStyle(event.category)}`}>
                      {event.category ?? ui.general}
                    </span>
                    <span className="text-xs text-brand-muted">{event.event_date ?? ui.dateTbd}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      ) : null}

      <div className="flex items-center justify-between gap-3">
        <h2 className="font-heading text-heading-xl">{ui.upcoming}</h2>
      </div>

      {!hasEvents ? (
        <Card>
          <p className="text-sm text-brand-muted">{ui.empty}</p>
        </Card>
      ) : (
        <div className="relative">
          {hasCarousel ? (
            <>
              <button
                type="button"
                onClick={previousSlide}
                disabled={isSliding}
                className="absolute -left-5 top-1/2 z-10 -translate-y-1/2 rounded-full border border-brand-accent/40 bg-brand-surface/95 px-3 py-2 text-sm text-brand-foreground shadow-premium transition hover:border-brand-accent sm:-left-7 lg:-left-10"
                aria-label="Previous events"
              >
                {"<"}
              </button>
              <button
                type="button"
                onClick={nextSlide}
                disabled={isSliding}
                className="absolute -right-5 top-1/2 z-10 -translate-y-1/2 rounded-full border border-brand-accent/40 bg-brand-surface/95 px-3 py-2 text-sm text-brand-foreground shadow-premium transition hover:border-brand-accent sm:-right-7 lg:-right-10"
                aria-label="Next events"
              >
                {">"}
              </button>
            </>
          ) : null}

          <div className="overflow-hidden">
            <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${hasCarousel ? "px-10" : ""}`}>
              {hasCarousel
                ? Array.from({ length: VISIBLE_CARDS }, (_, slotIndex) => {
                    const event = visibleEvents[slotIndex];
                    if (!event) return <div key={`slot-${slotIndex}`} className="h-[32rem]" />;

                    return (
                      <div key={`slot-${slotIndex}`} className="h-full">
                        <AnimatePresence initial={false} mode="wait" custom={slideDirection}>
                          <motion.div
                            key={event.id}
                            custom={slideDirection}
                            initial={{ opacity: 0, x: slideDirection > 0 ? 120 : -120 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: slideDirection > 0 ? -120 : 120 }}
                            transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
                          >
                            {renderEventCard(event)}
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    );
                  })
                : visibleEvents.map((event) => <div key={event.id}>{renderEventCard(event)}</div>)}
            </div>
          </div>
        </div>
      )}

      <AnimatePresence>
        {selectedEvent ? (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-brand-background/65 p-4 backdrop-blur-sm"
            onClick={() => setSelectedEvent(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={selectedEvent.title}
              className="relative flex h-[88vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-brand-accent/50 bg-brand-surface shadow-premium"
              onClick={(event) => event.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.56, ease: "easeOut" }}
            >
              <div className="relative h-[42vh] min-h-56 w-full">
                {resolveImageUrl(selectedEvent.cover_image_url) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={resolveImageUrl(selectedEvent.cover_image_url)}
                    alt={selectedEvent.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-brand-elevated" />
                )}
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setSelectedEvent(null)}
                  aria-label="Close"
                  className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-accent/50 bg-brand-background/85 text-2xl leading-none text-brand-foreground backdrop-blur"
                >
                  X
                </button>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto p-6">
                <p className="text-xs uppercase tracking-[0.14em] text-brand-accentSoft">{selectedEvent.category ?? ui.general}</p>
                <h3 className="font-heading text-heading-lg">{selectedEvent.title}</h3>
                <p className="text-xs text-brand-muted">
                  {selectedEvent.event_date ?? ui.dateTbd}
                  {selectedEvent.location ? ` - ${selectedEvent.location}` : ""}
                </p>
                <p className="whitespace-pre-wrap pr-1 text-brand-muted">
                  {selectedEvent.description ?? ui.noDescription}
                </p>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

