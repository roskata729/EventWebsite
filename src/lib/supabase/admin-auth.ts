import { redirect } from "next/navigation";
import { createSupabaseServerAuthClient } from "@/lib/supabase/server-auth";
import { isAdminSession } from "@/lib/supabase/roles";

export async function requireAdminUser() {
  const supabase = await createSupabaseServerAuthClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!(await isAdminSession(supabase, user))) {
    redirect("/");
  }

  return user!;
}
