"use client";

import { useMemo, useState } from "react";
import { signUpWithEmailAction } from "@/app/auth/actions";
import { Button } from "@/components/ui/Button";
import type { Locale } from "@/lib/i18n";
import { getPasswordStrength } from "@/lib/security/password";

type AuthRegisterFormProps = {
  errorCode?: string;
  locale: Locale;
};

function mapRegisterError(errorCode: string | undefined, locale: Locale) {
  const errorsByLocale = {
    bg: {
      weakPassword: "Паролата трябва да е силна: поне 12 символа с разнообразие, или поне 14 символа с главни/малки букви и цифра.",
      passwordMismatch: "Паролите не съвпадат.",
      registerFailed: "Регистрацията е неуспешна. Проверете данните и опитайте отново.",
    },
    en: {
      weakPassword: "Password must be strong: at least 12 characters with complexity, or at least 14 with upper/lowercase and a digit.",
      passwordMismatch: "Passwords do not match.",
      registerFailed: "Registration failed. Check your details and try again.",
    },
    ro: {
      weakPassword: "Parola trebuie sa fie puternica: cel putin 12 caractere cu complexitate, sau cel putin 14 cu litere mari/mici si o cifra.",
      passwordMismatch: "Parolele nu coincid.",
      registerFailed: "Inregistrarea a esuat. Verificati datele si incercati din nou.",
    },
  } as const;

  const t = errorsByLocale[locale];

  if (errorCode === "weak_password") {
    return t.weakPassword;
  }

  if (errorCode === "password_mismatch") {
    return t.passwordMismatch;
  }

  if (errorCode === "register_failed") {
    return t.registerFailed;
  }

  return null;
}

function strengthClassName(strength: ReturnType<typeof getPasswordStrength>) {
  if (strength === "strong") return "text-green-300";
  if (strength === "medium") return "text-yellow-300";
  return "text-red-300";
}

export function AuthRegisterForm({ errorCode, locale }: AuthRegisterFormProps) {
  const labelsByLocale = {
    bg: {
      fullName: "Име",
      email: "Имейл",
      password: "Парола",
      confirmPassword: "Потвърди паролата",
      passwordStrength: "Сила на паролата",
      strength: { weak: "слаба", medium: "средна", strong: "силна" },
      mismatch: "Паролите не съвпадат.",
      requirement: "Изискване: силна парола - 12+ символа с висока сложност, или 14+ символа с главни/малки букви и цифра.",
      submit: "Създай акаунт",
    },
    en: {
      fullName: "Name",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm password",
      passwordStrength: "Password strength",
      strength: { weak: "weak", medium: "medium", strong: "strong" },
      mismatch: "Passwords do not match.",
      requirement: "Requirement: strong password - 12+ characters with high complexity, or 14+ characters with upper/lowercase letters and a digit.",
      submit: "Create account",
    },
    ro: {
      fullName: "Nume",
      email: "Email",
      password: "Parola",
      confirmPassword: "Confirma parola",
      passwordStrength: "Puterea parolei",
      strength: { weak: "slaba", medium: "medie", strong: "puternica" },
      mismatch: "Parolele nu coincid.",
      requirement: "Cerinta: parola puternica - 12+ caractere cu complexitate ridicata, sau 14+ caractere cu litere mari/mici si o cifra.",
      submit: "Creeaza cont",
    },
  } as const;

  const t = labelsByLocale[locale];
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const strength = useMemo(() => getPasswordStrength(password), [password]);
  const isPasswordStrong = strength === "strong";
  const passwordsMatch = password.length > 0 && password === confirmPassword;
  const canSubmit = isPasswordStrong && passwordsMatch;

  return (
    <form action={signUpWithEmailAction} className="mt-6 space-y-4" noValidate>
      {mapRegisterError(errorCode, locale) ? <p className="text-sm text-red-300">{mapRegisterError(errorCode, locale)}</p> : null}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div>
        <label htmlFor="full_name" className="mb-1 block text-sm">{t.fullName}</label>
        <input id="full_name" name="full_name" type="text" autoComplete="name" minLength={2} maxLength={120} required className="w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3" />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm">{t.email}</label>
        <input id="email" name="email" type="email" autoComplete="email" maxLength={320} required className="w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3" />
      </div>
      <div>
        <label htmlFor="password" className="mb-1 block text-sm">{t.password}</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={12}
          maxLength={128}
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3"
        />
        <p className={`mt-1 text-sm ${strengthClassName(strength)}`}>{t.passwordStrength}: {t.strength[strength]}</p>
      </div>
      <div>
        <label htmlFor="confirm_password" className="mb-1 block text-sm">{t.confirmPassword}</label>
        <input
          id="confirm_password"
          name="confirm_password"
          type="password"
          autoComplete="new-password"
          minLength={12}
          maxLength={128}
          required
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          className="w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3"
        />
        {confirmPassword.length > 0 && !passwordsMatch ? <p className="mt-1 text-sm text-red-300">{t.mismatch}</p> : null}
      </div>
      <p className="text-xs text-brand-muted">{t.requirement}</p>
      <Button type="submit" disabled={!canSubmit}>{t.submit}</Button>
    </form>
  );
}

