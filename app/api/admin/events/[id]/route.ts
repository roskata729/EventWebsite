import { z, ZodError } from "zod";
import { jsonError, jsonSuccess, mapZodError } from "@/lib/api/responses";
import { isAdminApiRequest } from "@/lib/supabase/admin-api";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const paramsSchema = z.object({
  id: z.string().uuid(),
});

const updateEventSchema = z.object({
  title: z.string().trim().min(3).max(140).optional(),
  slug: z.string().trim().min(3).max(160).regex(/^[a-z0-9-]+$/).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  category: z.string().trim().max(80).nullable().optional(),
  eventDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable().optional(),
  location: z.string().trim().max(180).nullable().optional(),
  coverImageUrl: z.string().trim().url().optional(),
  isPublished: z.boolean().optional(),
});

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const isAdmin = await isAdminApiRequest();
    if (!isAdmin) {
      return jsonError("UNAUTHORIZED", "Admin access required.", 401);
    }

    const params = paramsSchema.parse(await context.params);
    const body = updateEventSchema.parse(await request.json());
    const supabase = createSupabaseServerClient();

    const updates: Record<string, string | boolean | null> = {};

    if (body.title !== undefined) {
      updates.title = body.title;
    }
    if (body.slug !== undefined) {
      updates.slug = body.slug;
    }
    if (body.description !== undefined) {
      updates.description = body.description;
    }
    if (body.category !== undefined) {
      updates.category = body.category;
    }
    if (body.eventDate !== undefined) {
      updates.event_date = body.eventDate;
    }
    if (body.location !== undefined) {
      updates.location = body.location;
    }
    if (body.coverImageUrl !== undefined) {
      updates.cover_image_url = body.coverImageUrl;
    }
    if (body.isPublished !== undefined) {
      updates.is_published = body.isPublished;
    }

    const { data, error } = await supabase
      .from("events")
      .update(updates)
      .eq("id", params.id)
      .select("id, title, slug, category, event_date, location, cover_image_url, is_published, created_at")
      .maybeSingle();

    if (error) {
      return jsonError("INTERNAL_ERROR", `Failed to update event: ${error.message}`, 500);
    }

    if (!data) {
      return jsonError("VALIDATION_ERROR", "Event not found.", 404);
    }

    return jsonSuccess({ event: data });
  } catch (error) {
    if (error instanceof ZodError) {
      return jsonError("VALIDATION_ERROR", "Invalid event update payload.", 400, mapZodError(error));
    }

    return jsonError("INTERNAL_ERROR", "Unexpected server error.", 500);
  }
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const isAdmin = await isAdminApiRequest();
    if (!isAdmin) {
      return jsonError("UNAUTHORIZED", "Admin access required.", 401);
    }

    const params = paramsSchema.parse(await context.params);
    const supabase = createSupabaseServerClient();

    const { error } = await supabase.from("events").delete().eq("id", params.id);

    if (error) {
      return jsonError("INTERNAL_ERROR", `Failed to delete event: ${error.message}`, 500);
    }

    return jsonSuccess({ id: params.id });
  } catch (error) {
    if (error instanceof ZodError) {
      return jsonError("VALIDATION_ERROR", "Invalid event id.", 400, mapZodError(error));
    }

    return jsonError("INTERNAL_ERROR", "Unexpected server error.", 500);
  }
}
