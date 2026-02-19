"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

type Errors = Partial<Record<"name" | "email" | "eventType", string>>;

export function QuoteForm() {
  const [errors, setErrors] = useState<Errors>({});

  return (
    <form
      className="mt-6 grid gap-4 sm:grid-cols-2"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const nextErrors: Errors = {};
        if (!String(formData.get("name") ?? "").trim()) nextErrors.name = "Името е задължително.";
        if (!String(formData.get("email") ?? "").includes("@")) nextErrors.email = "Въведете валиден имейл.";
        if (!String(formData.get("eventType") ?? "")) nextErrors.eventType = "Изберете тип събитие.";
        setErrors(nextErrors);
      }}
    >
      <div>
        <label htmlFor="quote-name" className="mb-1 block text-sm">Име и фамилия</label>
        <input id="quote-name" name="name" aria-invalid={Boolean(errors.name)} aria-describedby="quote-name-error" className="w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft" />
        <p id="quote-name-error" className="mt-1 text-sm text-red-300" role="alert">{errors.name}</p>
      </div>
      <div>
        <label htmlFor="quote-email" className="mb-1 block text-sm">Имейл</label>
        <input id="quote-email" name="email" type="email" aria-invalid={Boolean(errors.email)} aria-describedby="quote-email-error" className="w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft" />
        <p id="quote-email-error" className="mt-1 text-sm text-red-300" role="alert">{errors.email}</p>
      </div>
      <div>
        <label htmlFor="quote-event-type" className="mb-1 block text-sm">Тип събитие</label>
        <select id="quote-event-type" name="eventType" defaultValue="" aria-invalid={Boolean(errors.eventType)} aria-describedby="quote-type-error" className="w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft">
          <option value="" disabled>Изберете тип събитие</option>
          <option>Корпоративно събитие</option>
          <option>Сватба</option>
          <option>Частно парти</option>
          <option>Конференция</option>
          <option>Тиймбилдинг</option>
          <option>Персонализирано събитие</option>
        </select>
        <p id="quote-type-error" className="mt-1 text-sm text-red-300" role="alert">{errors.eventType}</p>
      </div>
      <div><label htmlFor="quote-guests" className="mb-1 block text-sm">Очакван брой гости</label><input id="quote-guests" name="guests" className="w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft" /></div>
      <div><label htmlFor="quote-budget" className="mb-1 block text-sm">Бюджетен диапазон</label><input id="quote-budget" name="budget" className="w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft" /></div>
      <div><label htmlFor="quote-location" className="mb-1 block text-sm">Предпочитана локация</label><input id="quote-location" name="location" className="w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft" /></div>
      <div><label htmlFor="quote-date" className="mb-1 block text-sm">Дата</label><input id="quote-date" name="date" type="date" className="w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft" /></div>
      <div><label htmlFor="quote-phone" className="mb-1 block text-sm">Телефон</label><input id="quote-phone" name="phone" className="w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft" /></div>
      <div className="sm:col-span-2">
        <label htmlFor="quote-message" className="mb-1 block text-sm">Детайли</label>
        <textarea id="quote-message" name="message" className="min-h-36 w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft" />
      </div>
      <div className="sm:col-span-2">
        <Button type="submit">Изпрати запитване</Button>
      </div>
    </form>
  );
}
