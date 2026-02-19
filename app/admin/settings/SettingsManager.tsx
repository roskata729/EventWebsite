"use client";

import { FormEvent, useState } from "react";

type SettingsManagerProps = {
  initialValues: {
    brandName: string;
    contactPhone: string;
    contactEmail: string;
    contactInstagram: string;
    contactLinkedin: string;
  };
  locale: "bg" | "en" | "ro";
};

const copyByLocale = {
  bg: {
    brandLabel: "Име на бранд",
    brandPlaceholder: "Събития Колеви",
    phoneLabel: "Телефон",
    phonePlaceholder: "+359 700 123 45",
    emailLabel: "Имейл",
    emailPlaceholder: "hello@sabitiakolevi.bg",
    instagramLabel: "Инстаграм",
    instagramPlaceholder: "@sabitiakolevi",
    linkedinLabel: "LinkedIn",
    linkedinPlaceholder: "ТЕСТ",
    save: "Запази",
    saving: "Запис...",
    success: "Настройките са запазени.",
    error: "Неуспешно запазване.",
    help: "Тези стойности се показват в контактната секция на сайта.",
  },
  en: {
    brandLabel: "Brand name",
    brandPlaceholder: "Sabitia Kolevi",
    phoneLabel: "Phone",
    phonePlaceholder: "+359 700 123 45",
    emailLabel: "Email",
    emailPlaceholder: "hello@sabitiakolevi.bg",
    instagramLabel: "Instagram",
    instagramPlaceholder: "@sabitiakolevi",
    linkedinLabel: "LinkedIn",
    linkedinPlaceholder: "TEST",
    save: "Save",
    saving: "Saving...",
    success: "Settings saved successfully.",
    error: "Failed to save settings.",
    help: "These values are shown in the contact section of the site.",
  },
  ro: {
    brandLabel: "Nume brand",
    brandPlaceholder: "Sabitia Kolevi",
    phoneLabel: "Telefon",
    phonePlaceholder: "+359 700 123 45",
    emailLabel: "Email",
    emailPlaceholder: "hello@sabitiakolevi.bg",
    instagramLabel: "Instagram",
    instagramPlaceholder: "@sabitiakolevi",
    linkedinLabel: "LinkedIn",
    linkedinPlaceholder: "TEST",
    save: "Salveaza",
    saving: "Se salveaza...",
    success: "Setarile au fost salvate.",
    error: "Salvarea a esuat.",
    help: "Aceste valori apar in sectiunea de contact a site-ului.",
  },
} as const;

export function SettingsManager({ initialValues, locale }: SettingsManagerProps) {
  const t = copyByLocale[locale];
  const [brandName, setBrandName] = useState(initialValues.brandName);
  const [contactPhone, setContactPhone] = useState(initialValues.contactPhone);
  const [contactEmail, setContactEmail] = useState(initialValues.contactEmail);
  const [contactInstagram, setContactInstagram] = useState(initialValues.contactInstagram);
  const [contactLinkedin, setContactLinkedin] = useState(initialValues.contactLinkedin);
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("saving");

    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brandName, contactPhone, contactEmail, contactInstagram, contactLinkedin }),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={onSubmit} className="mt-5 space-y-4 rounded-2xl border border-brand-accent/20 bg-brand-elevated/60 p-5">
      <label htmlFor="brand-name" className="block text-sm text-brand-muted">{t.brandLabel}</label>
      <input id="brand-name" value={brandName} onChange={(event) => setBrandName(event.target.value)} placeholder={t.brandPlaceholder} maxLength={120} className="w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3" />

      <label htmlFor="contact-phone" className="block text-sm text-brand-muted">{t.phoneLabel}</label>
      <input id="contact-phone" value={contactPhone} onChange={(event) => setContactPhone(event.target.value)} placeholder={t.phonePlaceholder} maxLength={120} className="w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3" />

      <label htmlFor="contact-email" className="block text-sm text-brand-muted">{t.emailLabel}</label>
      <input id="contact-email" type="email" value={contactEmail} onChange={(event) => setContactEmail(event.target.value)} placeholder={t.emailPlaceholder} maxLength={180} className="w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3" />

      <label htmlFor="contact-instagram" className="block text-sm text-brand-muted">{t.instagramLabel}</label>
      <input id="contact-instagram" value={contactInstagram} onChange={(event) => setContactInstagram(event.target.value)} placeholder={t.instagramPlaceholder} maxLength={120} className="w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3" />

      <label htmlFor="contact-linkedin" className="block text-sm text-brand-muted">{t.linkedinLabel}</label>
      <input id="contact-linkedin" value={contactLinkedin} onChange={(event) => setContactLinkedin(event.target.value)} placeholder={t.linkedinPlaceholder} maxLength={120} className="w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3" />

      <p className="text-xs text-brand-muted">{t.help}</p>
      <button type="submit" disabled={status === "saving"} className="rounded-xl border border-brand-accent/40 bg-brand-surface px-4 py-2 text-sm text-brand-foreground transition hover:border-brand-accent disabled:opacity-70">
        {status === "saving" ? t.saving : t.save}
      </button>
      {status === "success" ? <p className="text-sm text-green-300">{t.success}</p> : null}
      {status === "error" ? <p className="text-sm text-red-300">{t.error}</p> : null}
    </form>
  );
}
