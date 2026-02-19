"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { getMessages, type Locale } from "@/lib/i18n";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

type ContactFormProps = {
  locale: Locale;
};

export function ContactForm({ locale }: ContactFormProps) {
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const messages = getMessages(locale).contactForm;

  function validate(formData: FormData) {
    const nextErrors: Errors = {};
    if (!String(formData.get("name") ?? "").trim()) nextErrors.name = messages.requiredName;
    if (!String(formData.get("email") ?? "").includes("@")) nextErrors.email = messages.invalidEmail;
    if (String(formData.get("message") ?? "").trim().length < 10) nextErrors.message = messages.shortMessage;
    return nextErrors;
  }

  return (
    <form
      className="mt-5 space-y-4"
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

        const payload = {
          name: String(formData.get("name") ?? "").trim(),
          email: String(formData.get("email") ?? "").trim(),
          phone: String(formData.get("phone") ?? "").trim(),
          company: String(formData.get("company") ?? "").trim(),
          subject: String(formData.get("subject") ?? "").trim(),
          message: String(formData.get("message") ?? "").trim(),
          eventDate: String(formData.get("eventDate") ?? "").trim(),
        };

        setIsSubmitting(true);
        try {
          const response = await fetch("/api/contact", {
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
          setErrors({});
        } catch (error) {
          const message = error instanceof Error ? error.message : messages.sendError;
          setSubmitError(message);
        } finally {
          setIsSubmitting(false);
        }
      }}
      aria-describedby="contact-form-note"
    >
      <div>
        <label htmlFor="contact-name" className="mb-1 block text-sm">{messages.name}</label>
        <input id="contact-name" name="name" aria-invalid={Boolean(errors.name)} aria-describedby="contact-name-error" className="w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft" />
        <p id="contact-name-error" className="mt-1 text-sm text-red-300" role="alert">{errors.name}</p>
      </div>
      <div>
        <label htmlFor="contact-email" className="mb-1 block text-sm">{messages.email}</label>
        <input id="contact-email" name="email" type="email" aria-invalid={Boolean(errors.email)} aria-describedby="contact-email-error" className="w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft" />
        <p id="contact-email-error" className="mt-1 text-sm text-red-300" role="alert">{errors.email}</p>
      </div>
      <div>
        <label htmlFor="contact-phone" className="mb-1 block text-sm">{messages.phone}</label>
        <input id="contact-phone" name="phone" className="w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft" />
      </div>
      <div>
        <label htmlFor="contact-company" className="mb-1 block text-sm">{messages.company}</label>
        <input id="contact-company" name="company" className="w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft" />
      </div>
      <div>
        <label htmlFor="contact-subject" className="mb-1 block text-sm">{messages.subject}</label>
        <input id="contact-subject" name="subject" className="w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft" />
      </div>
      <div>
        <label htmlFor="contact-event-date" className="mb-1 block text-sm">{messages.eventDate}</label>
        <input id="contact-event-date" name="eventDate" type="date" className="w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft" />
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-1 block text-sm">{messages.message}</label>
        <textarea id="contact-message" name="message" aria-invalid={Boolean(errors.message)} aria-describedby="contact-message-error" className="min-h-32 w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft" />
        <p id="contact-message-error" className="mt-1 text-sm text-red-300" role="alert">{errors.message}</p>
      </div>
      <p id="contact-form-note" className="text-xs text-brand-muted">{messages.requiredNote}</p>
      <Button type="submit" disabled={isSubmitting}>{isSubmitting ? messages.submitting : messages.submit}</Button>
      {submitMessage ? <p className="text-sm text-green-300" role="status">{submitMessage}</p> : null}
      {submitError ? <p className="text-sm text-red-300" role="alert">{submitError}</p> : null}
    </form>
  );
}
