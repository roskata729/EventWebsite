"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});

  function validate(formData: FormData) {
    const nextErrors: Errors = {};
    if (!String(formData.get("name") ?? "").trim()) nextErrors.name = "Моля, въведете вашето име.";
    if (!String(formData.get("email") ?? "").includes("@")) nextErrors.email = "Моля, въведете валиден имейл адрес.";
    if (!String(formData.get("message") ?? "").trim()) nextErrors.message = "Опишете с какво можем да помогнем.";
    setErrors(nextErrors);
  }

  return (
    <form
      className="mt-5 space-y-4"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        validate(new FormData(event.currentTarget));
      }}
      aria-describedby="contact-form-note"
    >
      <div>
        <label htmlFor="contact-name" className="mb-1 block text-sm">Вашето име</label>
        <input id="contact-name" name="name" aria-invalid={Boolean(errors.name)} aria-describedby="contact-name-error" className="w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft" />
        <p id="contact-name-error" className="mt-1 text-sm text-red-300" role="alert">{errors.name}</p>
      </div>
      <div>
        <label htmlFor="contact-email" className="mb-1 block text-sm">Имейл адрес</label>
        <input id="contact-email" name="email" type="email" aria-invalid={Boolean(errors.email)} aria-describedby="contact-email-error" className="w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft" />
        <p id="contact-email-error" className="mt-1 text-sm text-red-300" role="alert">{errors.email}</p>
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-1 block text-sm">С какво можем да помогнем?</label>
        <textarea id="contact-message" name="message" aria-invalid={Boolean(errors.message)} aria-describedby="contact-message-error" className="min-h-32 w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft" />
        <p id="contact-message-error" className="mt-1 text-sm text-red-300" role="alert">{errors.message}</p>
      </div>
      <p id="contact-form-note" className="text-xs text-brand-muted">Полетата са задължителни.</p>
      <Button type="submit">Изпрати съобщение</Button>
    </form>
  );
}
