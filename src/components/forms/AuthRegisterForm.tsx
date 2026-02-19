"use client";

import { useMemo, useState } from "react";
import { signUpWithEmailAction } from "@/app/auth/actions";
import { Button } from "@/components/ui/Button";
import { getPasswordStrength } from "@/lib/security/password";

type AuthRegisterFormProps = {
  errorCode?: string;
};

function mapRegisterError(errorCode?: string) {
  if (errorCode === "weak_password") {
    return "Паролата трябва да е силна: поне 12 символа с разнообразие, или поне 14 символа с главни/малки букви и цифра.";
  }

  if (errorCode === "password_mismatch") {
    return "Паролите не съвпадат.";
  }

  if (errorCode === "register_failed") {
    return "Регистрацията е неуспешна. Проверете данните и опитайте отново.";
  }

  return null;
}

function strengthClassName(strength: ReturnType<typeof getPasswordStrength>) {
  if (strength === "strong") return "text-green-300";
  if (strength === "medium") return "text-yellow-300";
  return "text-red-300";
}

function strengthLabel(strength: ReturnType<typeof getPasswordStrength>) {
  if (strength === "strong") return "силна";
  if (strength === "medium") return "средна";
  return "слаба";
}

export function AuthRegisterForm({ errorCode }: AuthRegisterFormProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const strength = useMemo(() => getPasswordStrength(password), [password]);
  const isPasswordStrong = strength === "strong";
  const passwordsMatch = password.length > 0 && password === confirmPassword;
  const canSubmit = isPasswordStrong && passwordsMatch;

  return (
    <form action={signUpWithEmailAction} className="mt-6 space-y-4" noValidate>
      {mapRegisterError(errorCode) ? <p className="text-sm text-red-300">{mapRegisterError(errorCode)}</p> : null}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div>
        <label htmlFor="full_name" className="mb-1 block text-sm">Име</label>
        <input id="full_name" name="full_name" type="text" autoComplete="name" minLength={2} maxLength={120} required className="w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3" />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm">Имейл</label>
        <input id="email" name="email" type="email" autoComplete="email" maxLength={320} required className="w-full rounded-xl border border-brand-accent/30 bg-brand-background p-3" />
      </div>
      <div>
        <label htmlFor="password" className="mb-1 block text-sm">Парола</label>
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
        <p className={`mt-1 text-sm ${strengthClassName(strength)}`}>Сила на паролата: {strengthLabel(strength)}</p>
      </div>
      <div>
        <label htmlFor="confirm_password" className="mb-1 block text-sm">Потвърди паролата</label>
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
        {confirmPassword.length > 0 && !passwordsMatch ? <p className="mt-1 text-sm text-red-300">Паролите не съвпадат.</p> : null}
      </div>
      <p className="text-xs text-brand-muted">Изискване: силна парола - 12+ символа с висока сложност, или 14+ символа с главни/малки букви и цифра.</p>
      <Button type="submit" disabled={!canSubmit}>Създай акаунт</Button>
    </form>
  );
}
