import type { SupabaseClient, User } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/types";

export function hasAdminMetadata(user: User | null) {
  if (!user) {
    return false;
  }

  const appRole = user.app_metadata?.role;
  const userRole = user.user_metadata?.role;

  return appRole === "admin" || userRole === "admin";
}

export async function isAdminSession(supabase: SupabaseClient<Database>, user: User | null) {
  if (!user) {
    return false;
  }

  if (hasAdminMetadata(user)) {
    return true;
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();

  return profile?.role === "admin";
}
