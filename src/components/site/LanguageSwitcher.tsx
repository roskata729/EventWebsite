"use client";

import { useRouter } from "next/navigation";
import { localeCookieName, locales, type Locale } from "@/lib/i18n";

type LanguageSwitcherLabels = {
  label: string;
  bg: string;
  en: string;
  ro: string;
};

type LanguageSwitcherProps = {
  locale: Locale;
  labels: LanguageSwitcherLabels;
};

export function LanguageSwitcher({ locale, labels }: LanguageSwitcherProps) {
  const router = useRouter();

  const localeLabels: Record<Locale, string> = {
    bg: labels.bg,
    en: labels.en,
    ro: labels.ro,
  };

  function setLocale(nextLocale: Locale) {
    if (nextLocale === locale) {
      return;
    }
    document.cookie = `${localeCookieName}=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  }

  return (
    <div className="flex items-center gap-1">
      <span className="sr-only">{labels.label}</span>
      {locales.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-[0.08em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft ${
            locale === code ? "bg-brand-accent/20 text-brand-accentSoft" : "text-brand-foreground/80 hover:bg-brand-elevated hover:text-brand-accentSoft"
          }`}
          aria-pressed={locale === code}
          aria-label={`${labels.label}: ${localeLabels[code]}`}
        >
          {localeLabels[code]}
        </button>
      ))}
    </div>
  );
}
