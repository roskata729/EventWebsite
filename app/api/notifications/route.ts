import { z, ZodError } from "zod";
import { jsonError, jsonSuccess, mapZodError } from "@/lib/api/responses";
import { isRecoverableAuthError } from "@/lib/supabase/auth-errors";
import { createSupabaseServerAuthClient } from "@/lib/supabase/server-auth";

const patchSchema = z
  .object({
    id: z.string().uuid().optional(),
    markAll: z.boolean().optional(),
  })
  .refine((value) => value.markAll || value.id, {
    message: "Either id or markAll must be provided.",
  });

const deleteSchema = z
  .object({
    id: z.string().uuid().optional(),
    deleteAll: z.boolean().optional(),
  })
  .refine((value) => value.deleteAll || value.id, {
    message: "Either id or deleteAll must be provided.",
  });

async function requireApiUser() {
  const supabase = await createSupabaseServerAuthClient();
  const { data, error } = await supabase.auth
    .getUser()
    .catch((caughtError) => ({ data: { user: null }, error: caughtError }));

  if (error && !isRecoverableAuthError(error)) {
    return { error: jsonError("INTERNAL_ERROR", "Failed to read user session.", 500) };
  }

  const user = data.user ?? null;
  if (!user) {
    return { error: jsonError("UNAUTHORIZED", "Authentication required.", 401) };
  }

  return { supabase, user };
}

export async function GET() {
  const auth = await requireApiUser();
  if ("error" in auth) {
    return auth.error;
  }

  const { supabase, user } = auth;
  const [{ data: notifications, error: notificationsError }, { count, error: countError }] = await Promise.all([
    supabase
      .from("notifications")
      .select("id, title, message, target_url, is_read, created_at, metadata")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(20),
    supabase
      .from("notifications")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("is_read", false),
  ]);

  if (notificationsError || countError) {
    return jsonError(
      "INTERNAL_ERROR",
      notificationsError?.message ?? countError?.message ?? "Failed to load notifications.",
      500,
    );
  }

  return jsonSuccess({
    notifications: notifications ?? [],
    unreadCount: count ?? 0,
  });
}

export async function PATCH(request: Request) {
  try {
    const auth = await requireApiUser();
    if ("error" in auth) {
      return auth.error;
    }

    const { supabase, user } = auth;
    const body = patchSchema.parse(await request.json());

    if (body.markAll) {
      const { error } = await supabase
        .from("notifications")
        .update({ is_read: true })
        .eq("user_id", user.id)
        .eq("is_read", false);

      if (error) {
        return jsonError("INTERNAL_ERROR", `Failed to mark notifications as read: ${error.message}`, 500);
      }

      return jsonSuccess({ marked: "all" });
    }

    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", body.id!)
      .eq("user_id", user.id);

    if (error) {
      return jsonError("INTERNAL_ERROR", `Failed to mark notification as read: ${error.message}`, 500);
    }

    return jsonSuccess({ marked: body.id });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return jsonError("INVALID_JSON", "Request body must be valid JSON.", 400);
    }

    if (error instanceof ZodError) {
      return jsonError("VALIDATION_ERROR", "Invalid notification patch payload.", 400, mapZodError(error));
    }

    return jsonError("INTERNAL_ERROR", "Unexpected server error.", 500);
  }
}

export async function DELETE(request: Request) {
  try {
    const auth = await requireApiUser();
    if ("error" in auth) {
      return auth.error;
    }

    const { supabase, user } = auth;
    const body = deleteSchema.parse(await request.json());

    if (body.deleteAll) {
      const { error } = await supabase.from("notifications").delete().eq("user_id", user.id);
      if (error) {
        return jsonError("INTERNAL_ERROR", `Failed to delete notifications: ${error.message}`, 500);
      }

      return jsonSuccess({ deleted: "all" });
    }

    const { data: deletedRows, error } = await supabase
      .from("notifications")
      .delete()
      .eq("id", body.id!)
      .eq("user_id", user.id)
      .select("id");

    if (error) {
      return jsonError("INTERNAL_ERROR", `Failed to delete notification: ${error.message}`, 500);
    }

    if (!deletedRows || deletedRows.length === 0) {
      return jsonError("VALIDATION_ERROR", "Notification not found or cannot be deleted.", 404);
    }

    return jsonSuccess({ deleted: body.id });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return jsonError("INVALID_JSON", "Request body must be valid JSON.", 400);
    }

    if (error instanceof ZodError) {
      return jsonError("VALIDATION_ERROR", "Invalid notification delete payload.", 400, mapZodError(error));
    }

    return jsonError("INTERNAL_ERROR", "Unexpected server error.", 500);
  }
}
