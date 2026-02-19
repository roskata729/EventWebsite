import { ZodError, z } from "zod";
import { jsonError, jsonSuccess, mapZodError } from "@/lib/api/responses";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const eventsQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).optional(),
  category: z.string().trim().min(1).max(80).optional(),
});

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const query = eventsQuerySchema.parse({
      limit: url.searchParams.get("limit") ?? undefined,
      category: url.searchParams.get("category") ?? undefined,
    });

    const supabase = createSupabaseServerClient();
    let dbQuery = supabase
      .from("events")
      .select("id, title, slug, description, category, event_date, location, cover_image_url")
      .eq("is_published", true)
      .order("event_date", { ascending: false, nullsFirst: false });

    if (query.category) {
      dbQuery = dbQuery.eq("category", query.category);
    }

    if (query.limit) {
      dbQuery = dbQuery.limit(query.limit);
    }

    const { data, error } = await dbQuery;

    if (error) {
      return jsonError("INTERNAL_ERROR", "Неуспешно зареждане на галерията със събития.", 500);
    }

    return jsonSuccess({ events: data ?? [] });
  } catch (error) {
    if (error instanceof ZodError) {
      return jsonError("VALIDATION_ERROR", "Невалидни параметри в заявката за събития.", 400, mapZodError(error));
    }

    return jsonError("INTERNAL_ERROR", "Възникна неочаквана сървърна грешка.", 500);
  }
}
