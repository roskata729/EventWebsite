"use server";

import { redirect } from "next/navigation";
import { isRecoverableAuthError } from "@/lib/supabase/auth-errors";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseServerAuthClient } from "@/lib/supabase/server-auth";
import { getSiteUrl } from "@/lib/supabase/env";
import {
  forgotPasswordInputSchema,
  loginInputSchema,
  registerInputSchema,
  resetPasswordInputSchema,
} from "@/lib/validation/auth";

function getNextPath(raw: FormDataEntryValue | null, fallback: string) {
  const value = typeof raw === "string" ? raw : fallback;
  if (!value.startsWith("/")) {
    return fallback;
  }

  return value;
}

export async function signInWithEmailAction(formData: FormData) {
  const parsed = loginInputSchema.safeParse({
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
    honeypot: String(formData.get("website") ?? ""),
    next: String(formData.get("next") ?? ""),
  });
  const next = getNextPath(formData.get("next"), "/account");

  if (!parsed.success) {
    redirect(`/auth/login?error=invalid_credentials&next=${encodeURIComponent(next)}`);
  }

  const supabase = await createSupabaseServerAuthClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    redirect(`/auth/login?error=invalid_credentials&next=${encodeURIComponent(next)}`);
  }

  redirect(next);
}

export async function signUpWithEmailAction(formData: FormData) {
  const parsed = registerInputSchema.safeParse({
    fullName: String(formData.get("full_name") ?? ""),
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
    confirmPassword: String(formData.get("confirm_password") ?? ""),
    honeypot: String(formData.get("website") ?? ""),
  });

  if (!parsed.success) {
    const hasPasswordMismatch = parsed.error.issues.some((issue) => issue.path.includes("confirmPassword"));
    const hasWeakPassword = parsed.error.issues.some((issue) => issue.path.includes("password"));

    if (hasPasswordMismatch) {
      redirect("/auth/register?error=password_mismatch");
    }

    if (hasWeakPassword) {
      redirect("/auth/register?error=weak_password");
    }

    redirect("/auth/register?error=register_failed");
  }

  const supabase = await createSupabaseServerAuthClient();
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        full_name: parsed.data.fullName,
      },
    },
  });

  if (error) {
    redirect("/auth/register?error=register_failed");
  }

  redirect("/auth/login?message=registered");
}

export async function signOutAction() {
  const supabase = await createSupabaseServerAuthClient();
  await supabase.auth.signOut({ scope: "local" });
  redirect("/");
}

export async function requestPasswordResetAction(formData: FormData) {
  const parsed = forgotPasswordInputSchema.safeParse({
    email: String(formData.get("email") ?? ""),
    honeypot: String(formData.get("website") ?? ""),
  });

  if (!parsed.success) {
    redirect("/auth/forgot-password?status=sent");
  }

  const normalizedEmail = parsed.data.email;
  const adminSupabase = createSupabaseServerClient();

  const { data: latestRequest } = await adminSupabase
    .from("password_reset_requests")
    .select("requested_at")
    .eq("email", normalizedEmail)
    .order("requested_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (latestRequest?.requested_at) {
    const nextAllowedAt = new Date(latestRequest.requested_at).getTime() + 60 * 60 * 1000;
    if (nextAllowedAt > Date.now()) {
      redirect("/auth/forgot-password?status=rate_limited");
    }
  }

  const supabase = await createSupabaseServerAuthClient();
  await supabase.auth.resetPasswordForEmail(normalizedEmail, {
    redirectTo: `${getSiteUrl()}/auth/confirm?next=/auth/reset-password`,
  });

  await adminSupabase.from("password_reset_requests").insert({
    email: normalizedEmail,
  });

  redirect("/auth/forgot-password?status=sent");
}

export async function resetPasswordAction(formData: FormData) {
  const parsed = resetPasswordInputSchema.safeParse({
    password: String(formData.get("password") ?? ""),
    confirmPassword: String(formData.get("confirm_password") ?? ""),
    honeypot: String(formData.get("website") ?? ""),
  });

  if (!parsed.success) {
    const hasPasswordMismatch = parsed.error.issues.some((issue) => issue.path.includes("confirmPassword"));
    const hasWeakPassword = parsed.error.issues.some((issue) => issue.path.includes("password"));

    if (hasPasswordMismatch) {
      redirect("/auth/reset-password?error=password_mismatch");
    }

    if (hasWeakPassword) {
      redirect("/auth/reset-password?error=weak_password");
    }

    redirect("/auth/reset-password?error=invalid_request");
  }

  const supabase = await createSupabaseServerAuthClient();
  const { data: authData, error: authError } = await supabase.auth
    .getUser()
    .catch((caughtError) => ({ data: { user: null }, error: caughtError }));

  if (authError && !isRecoverableAuthError(authError)) {
    redirect("/auth/login?error=invalid_credentials");
  }
  const user = authData.user ?? null;

  if (!user) {
    redirect("/auth/login?error=invalid_credentials");
  }

  const { error: updateError } = await supabase.auth.updateUser({
    password: parsed.data.password,
  });

  if (updateError) {
    redirect("/auth/reset-password?error=update_failed");
  }

  redirect("/auth/login?message=password_updated");
}
