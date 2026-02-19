import { z, ZodError } from "zod";
import { jsonError, jsonSuccess, mapZodError } from "@/lib/api/responses";
import { isAdminApiRequest } from "@/lib/supabase/admin-api";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const createEventSchema = z.object({
  title: z.string().trim().min(3).max(140),
  slug: z.string().trim().min(3).max(160).regex(/^[a-z0-9-]+$/),
  description: z.string().trim().max(2000).optional(),
  category: z.string().trim().max(80).optional(),
  eventDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  location: z.string().trim().max(180).optional(),
  coverImageUrl: z.string().trim().url(),
  isPublished: z.boolean().optional(),
});

export async function POST(request: Request) {
  try {
    const isAdmin = await isAdminApiRequest();
    if (!isAdmin) {
      return jsonError("UNAUTHORIZED", "Admin access required.", 401);
    }

    const body = createEventSchema.parse(await request.json());
    const supabase = createSupabaseServerClient();

    const { data, error } = await supabase
      .from("events")
      .insert({
        title: body.title,
        slug: body.slug,
        description: body.description || null,
        category: body.category || null,
        event_date: body.eventDate || null,
        location: body.location || null,
        cover_image_url: body.coverImageUrl,
        is_published: body.isPublished ?? false,
      })
      .select("id, title, slug, category, event_date, location, cover_image_url, is_published, created_at")
      .single();

    if (error) {
      return jsonError("INTERNAL_ERROR", `Failed to create event: ${error.message}`, 500);
    }

    return jsonSuccess({ event: data }, 201);
  } catch (error) {
    if (error instanceof ZodError) {
      return jsonError("VALIDATION_ERROR", "Invalid event data.", 400, mapZodError(error));
    }

    return jsonError("INTERNAL_ERROR", "Unexpected server error.", 500);
  }
}
