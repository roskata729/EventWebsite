import { redirect } from "next/navigation";
import { isRecoverableAuthError } from "@/lib/supabase/auth-errors";
import { createSupabaseServerAuthClient } from "@/lib/supabase/server-auth";
import { isAdminSession } from "@/lib/supabase/roles";

export async function requireAdminUser() {
  const supabase = await createSupabaseServerAuthClient();
  const { data, error } = await supabase.auth
    .getUser()
    .catch((caughtError) => ({ data: { user: null }, error: caughtError }));
  if (error && !isRecoverableAuthError(error)) {
    throw error;
  }
  const user = data.user ?? null;

  if (!(await isAdminSession(supabase, user))) {
    redirect("/");
  }

  return user!;
}
