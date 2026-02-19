"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { getMessages, type Locale } from "@/lib/i18n";

type Errors = Partial<Record<"name" | "email" | "eventType", string>>;

type QuoteFormProps = {
  locale: Locale;
};

export function QuoteForm({ locale }: QuoteFormProps) {
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const messages = getMessages(locale).quoteForm;

  function validate(formData: FormData) {
    const nextErrors: Errors = {};
    if (!String(formData.get("name") ?? "").trim()) nextErrors.name = messages.requiredName;
    if (!String(formData.get("email") ?? "").includes("@")) nextErrors.email = messages.invalidEmail;
    if (!String(formData.get("eventType") ?? "")) nextErrors.eventType = messages.requiredEventType;
    return nextErrors;
  }

  return (
    <form
      className="mt-6 grid gap-4 sm:grid-cols-2"
      noValidate
      onSubmit={async (event) => {
        event.preventDefault();
        setSubmitMessage(null);
        setSubmitError(null);

        const form = event.currentTarget;
        const formData = new FormData(form);
        const nextErrors = validate(formData);
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) {
          return;
        }

        const guestCountRaw = String(formData.get("guests") ?? "").trim();
        const budgetRaw = String(formData.get("budget") ?? "").trim();

        const payload = {
          name: String(formData.get("name") ?? "").trim(),
          email: String(formData.get("email") ?? "").trim(),
          phone: String(formData.get("phone") ?? "").trim(),
          eventType: String(formData.get("eventType") ?? "").trim(),
          eventDate: String(formData.get("date") ?? "").trim(),
          eventLocation: String(formData.get("location") ?? "").trim(),
          guestCount: guestCountRaw ? Number(guestCountRaw) : undefined,
          budget: budgetRaw ? Number(budgetRaw) : undefined,
          message: String(formData.get("message") ?? "").trim(),
        };

        setIsSubmitting(true);
        try {
          const response = await fetch("/api/quote", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          const result = await response.json();
          if (!response.ok || !result?.success) {
            throw new Error(result?.error?.message ?? messages.sendError);
          }

          setSubmitMessage(result?.data?.message ?? messages.sendSuccess);
          form.reset();
        } catch (error) {
          const message = error instanceof Error ? error.message : messages.sendError;
          setSubmitError(message);
        } finally {
          setIsSubmitting(false);
        }
      }}
    >
      <div>
        <label htmlFor="quote-name" className="mb-1 block text-sm">{messages.name}</label>
        <input id="quote-name" name="name" aria-invalid={Boolean(errors.name)} aria-describedby="quote-name-error" className="w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft" />
        <p id="quote-name-error" className="mt-1 text-sm text-red-300" role="alert">{errors.name}</p>
      </div>
      <div>
        <label htmlFor="quote-email" className="mb-1 block text-sm">{messages.email}</label>
        <input id="quote-email" name="email" type="email" aria-invalid={Boolean(errors.email)} aria-describedby="quote-email-error" className="w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft" />
        <p id="quote-email-error" className="mt-1 text-sm text-red-300" role="alert">{errors.email}</p>
      </div>
      <div>
        <label htmlFor="quote-event-type" className="mb-1 block text-sm">{messages.eventType}</label>
        <select id="quote-event-type" name="eventType" defaultValue="" aria-invalid={Boolean(errors.eventType)} aria-describedby="quote-type-error" className="w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft">
          <option value="" disabled>{messages.selectEventType}</option>
          {messages.eventTypes.map((eventType) => (
            <option key={eventType}>{eventType}</option>
          ))}
        </select>
        <p id="quote-type-error" className="mt-1 text-sm text-red-300" role="alert">{errors.eventType}</p>
      </div>
      <div><label htmlFor="quote-guests" className="mb-1 block text-sm">{messages.guests}</label><input id="quote-guests" name="guests" className="w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft" /></div>
      <div><label htmlFor="quote-budget" className="mb-1 block text-sm">{messages.budget}</label><input id="quote-budget" name="budget" className="w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft" /></div>
      <div><label htmlFor="quote-location" className="mb-1 block text-sm">{messages.location}</label><input id="quote-location" name="location" className="w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft" /></div>
      <div><label htmlFor="quote-date" className="mb-1 block text-sm">{messages.date}</label><input id="quote-date" name="date" type="date" className="w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft" /></div>
      <div><label htmlFor="quote-phone" className="mb-1 block text-sm">{messages.phone}</label><input id="quote-phone" name="phone" className="w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft" /></div>
      <div className="sm:col-span-2">
        <label htmlFor="quote-message" className="mb-1 block text-sm">{messages.details}</label>
        <textarea id="quote-message" name="message" className="min-h-36 w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft" />
      </div>
      <div className="sm:col-span-2">
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? messages.submitting : messages.submit}</Button>
        {submitMessage ? <p className="mt-3 text-sm text-green-300" role="status">{submitMessage}</p> : null}
        {submitError ? <p className="mt-3 text-sm text-red-300" role="alert">{submitError}</p> : null}
      </div>
    </form>
  );
}
