"use client";

import { FormEvent, useState, useTransition } from "react";

export type AdminEvent = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category: string | null;
  event_date: string | null;
  location: string | null;
  cover_image_url: string;
  is_published: boolean;
  created_at: string;
};

type EventsManagerProps = {
  initialEvents: AdminEvent[];
};

const emptyForm = {
  title: "",
  slug: "",
  category: "",
  location: "",
  eventDate: "",
  coverImageUrl: "",
  description: "",
  isPublished: false,
};

export function EventsManager({ initialEvents }: EventsManagerProps) {
  const [events, setEvents] = useState(initialEvents);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    startTransition(async () => {
      const response = await fetch("/api/admin/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          slug: form.slug,
          category: form.category || undefined,
          location: form.location || undefined,
          eventDate: form.eventDate || undefined,
          coverImageUrl: form.coverImageUrl,
          description: form.description || undefined,
          isPublished: form.isPublished,
        }),
      });

      const payload = (await response.json()) as { success?: boolean; data?: { event?: AdminEvent }; error?: { message?: string } };

      if (!response.ok || !payload.success || !payload.data?.event) {
        setError(payload.error?.message ?? "Failed to create event.");
        return;
      }

      const createdEvent = payload.data.event;
      setEvents((previousEvents) => [createdEvent, ...previousEvents]);
      setForm(emptyForm);
    });
  };

  const togglePublished = (item: AdminEvent) => {
    const nextValue = !item.is_published;
    setEvents((previousEvents) =>
      previousEvents.map((event) => (event.id === item.id ? { ...event, is_published: nextValue } : event)),
    );

    startTransition(async () => {
      const response = await fetch(`/api/admin/events/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: nextValue }),
      });

      if (!response.ok) {
        setEvents((previousEvents) =>
          previousEvents.map((event) => (event.id === item.id ? { ...event, is_published: item.is_published } : event)),
        );
      }
    });
  };

  const deleteEvent = (item: AdminEvent) => {
    setEvents((previousEvents) => previousEvents.filter((event) => event.id !== item.id));

    startTransition(async () => {
      const response = await fetch(`/api/admin/events/${item.id}`, { method: "DELETE" });
      if (!response.ok) {
        setEvents((previousEvents) => [item, ...previousEvents]);
      }
    });
  };

  return (
    <div className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_1.45fr]">
      <form onSubmit={onSubmit} className="space-y-3 rounded-3xl border border-brand-accent/30 bg-brand-surface/80 p-5">
        <h2 className="font-heading text-heading-md">Add event</h2>
        <input
          required
          value={form.title}
          onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
          placeholder="Event title"
          className="w-full rounded-xl border border-brand-accent/20 bg-brand-elevated px-3 py-2 text-sm"
        />
        <input
          required
          value={form.slug}
          onChange={(event) => setForm((prev) => ({ ...prev, slug: event.target.value.toLowerCase().replaceAll(" ", "-") }))}
          placeholder="event-slug"
          className="w-full rounded-xl border border-brand-accent/20 bg-brand-elevated px-3 py-2 text-sm"
        />
        <div className="grid gap-3 md:grid-cols-2">
          <input
            value={form.category}
            onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
            placeholder="Category"
            className="w-full rounded-xl border border-brand-accent/20 bg-brand-elevated px-3 py-2 text-sm"
          />
          <input
            value={form.location}
            onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value }))}
            placeholder="Location"
            className="w-full rounded-xl border border-brand-accent/20 bg-brand-elevated px-3 py-2 text-sm"
          />
        </div>
        <input
          type="date"
          value={form.eventDate}
          onChange={(event) => setForm((prev) => ({ ...prev, eventDate: event.target.value }))}
          className="w-full rounded-xl border border-brand-accent/20 bg-brand-elevated px-3 py-2 text-sm"
        />
        <input
          required
          value={form.coverImageUrl}
          onChange={(event) => setForm((prev) => ({ ...prev, coverImageUrl: event.target.value }))}
          placeholder="https://.../cover.jpg"
          className="w-full rounded-xl border border-brand-accent/20 bg-brand-elevated px-3 py-2 text-sm"
        />
        <textarea
          value={form.description}
          onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
          placeholder="Description"
          rows={4}
          className="w-full rounded-xl border border-brand-accent/20 bg-brand-elevated px-3 py-2 text-sm"
        />
        <label className="flex items-center gap-2 text-sm text-brand-muted">
          <input
            type="checkbox"
            checked={form.isPublished}
            onChange={(event) => setForm((prev) => ({ ...prev, isPublished: event.target.checked }))}
          />
          Publish immediately
        </label>
        {error ? <p className="text-sm text-red-300">{error}</p> : null}
        <button
          disabled={isPending}
          className="rounded-full border border-brand-accent bg-brand-accent px-5 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-brand-background disabled:opacity-60"
          type="submit"
        >
          {isPending ? "Saving..." : "Create event"}
        </button>
      </form>

      <div className="space-y-3">
        {events.map((event) => (
          <article
            key={event.id}
            className="rounded-2xl border border-brand-accent/20 bg-gradient-to-br from-brand-surface/95 to-brand-elevated/90 p-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-heading text-2xl">{event.title}</h3>
                <p className="text-xs uppercase tracking-[0.14em] text-brand-accentSoft">/{event.slug}</p>
                <p className="mt-1 text-sm text-brand-muted">
                  {[event.category, event.location, event.event_date].filter(Boolean).join(" - ") || "No metadata"}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => togglePublished(event)}
                  disabled={isPending}
                  className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.1em] ${
                    event.is_published
                      ? "border-emerald-300/60 bg-emerald-400/15 text-emerald-200"
                      : "border-brand-accent/30 bg-brand-elevated text-brand-muted"
                  }`}
                >
                  {event.is_published ? "Published" : "Draft"}
                </button>
                <button
                  onClick={() => deleteEvent(event)}
                  disabled={isPending}
                  className="rounded-full border border-red-300/40 bg-red-500/10 px-3 py-1 text-xs uppercase tracking-[0.1em] text-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

