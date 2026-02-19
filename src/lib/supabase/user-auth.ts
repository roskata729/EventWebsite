import { redirect } from "next/navigation";
import { isRecoverableAuthError } from "@/lib/supabase/auth-errors";
import { createSupabaseServerAuthClient } from "@/lib/supabase/server-auth";
import { isAdminSession } from "@/lib/supabase/roles";

export async function getCurrentUserSession() {
  const supabase = await createSupabaseServerAuthClient();
  const { data, error } = await supabase.auth
    .getUser()
    .catch((caughtError) => ({ data: { user: null }, error: caughtError }));

  if (error && !isRecoverableAuthError(error)) {
    throw error;
  }

  const user = data.user ?? null;

  return { supabase, user };
}

export async function requireAuthenticatedUser() {
  const { supabase, user } = await getCurrentUserSession();

  if (!user) {
    redirect("/auth/login?next=/account");
  }

  return { supabase, user: user! };
}

export async function getCurrentUserContext() {
  const { supabase, user } = await getCurrentUserSession();
  const isAdmin = await isAdminSession(supabase, user);

  return { supabase, user, isAdmin };
}
