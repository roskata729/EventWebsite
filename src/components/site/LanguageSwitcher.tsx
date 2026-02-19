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
    <div className="relative">
      <label htmlFor="language-switcher" className="sr-only">
        {labels.label}
      </label>
      <select
        id="language-switcher"
        value={locale}
        onChange={(event) => setLocale(event.target.value as Locale)}
        className="w-14 appearance-none rounded-full border border-brand-accent/30 bg-brand-surface/70 px-2 py-1 text-center text-[11px] font-semibold tracking-[0.08em] text-brand-accentSoft transition hover:border-brand-accent/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft"
        aria-label={labels.label}
      >
        {locales.map((code) => (
          <option key={code} value={code}>
            {localeLabels[code]}
          </option>
        ))}
      </select>
    </div>
  );
}
