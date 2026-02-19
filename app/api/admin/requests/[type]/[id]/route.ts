import { z, ZodError } from "zod";
import { jsonError, jsonSuccess, mapZodError } from "@/lib/api/responses";
import { buildStatusNotificationContent } from "@/lib/notifications/request-status";
import { isAdminApiRequest } from "@/lib/supabase/admin-api";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const paramsSchema = z.object({
  type: z.enum(["contact", "quote"]),
  id: z.string().uuid(),
});

const bodySchema = z.object({
  status: z.string().trim().min(2).max(32),
});

export async function PATCH(request: Request, context: { params: Promise<{ type: string; id: string }> }) {
  try {
    const isAdmin = await isAdminApiRequest();
    if (!isAdmin) {
      return jsonError("UNAUTHORIZED", "Admin access required.", 401);
    }

    const params = paramsSchema.parse(await context.params);
    const body = bodySchema.parse(await request.json());

    const table = params.type === "contact" ? "contact_requests" : "quote_requests";
    const supabase = createSupabaseServerClient();

    const { data, error } = await supabase
      .from(table)
      .update({ status: body.status })
      .eq("id", params.id)
      .select("id, status, user_id")
      .maybeSingle();

    if (error) {
      return jsonError("INTERNAL_ERROR", `Failed to update request status: ${error.message}`, 500);
    }

    if (!data) {
      return jsonError("VALIDATION_ERROR", "Request not found.", 404);
    }
    const content = buildStatusNotificationContent(params.type, data.status);

    if (data.user_id) {
      const { error: notificationError } = await supabase.from("notifications").insert({
        user_id: data.user_id,
        title: content.title,
        message: content.message,
        target_url: "/account",
        metadata: {
          requestType: params.type,
          requestId: data.id,
          status: data.status,
        },
      });

      if (notificationError) {
        return jsonError(
          "INTERNAL_ERROR",
          `Failed to create notification: ${notificationError.message}`,
          500,
        );
      }
    }

    return jsonSuccess({ request: data });
  } catch (error) {
    if (error instanceof ZodError) {
      return jsonError("VALIDATION_ERROR", "Invalid request update payload.", 400, mapZodError(error));
    }

    return jsonError("INTERNAL_ERROR", "Unexpected server error.", 500);
  }
}
