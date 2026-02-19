import { createSupabaseServerAuthClient } from "@/lib/supabase/server-auth";
import { isAdminSession } from "@/lib/supabase/roles";

export async function isAdminApiRequest() {
  const authClient = await createSupabaseServerAuthClient();
  const { data, error } = await authClient.auth.getUser();

  if (error) {
    return false;
  }

  return isAdminSession(authClient, data.user ?? null);
}
