import { ZodError } from "zod";
import { jsonError, jsonSuccess, mapZodError } from "@/lib/api/responses";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { quoteRequestSchema } from "@/lib/validation/quote";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const validated = quoteRequestSchema.parse(payload);

    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("quote_requests")
      .insert({
        name: validated.name,
        email: validated.email,
        phone: validated.phone || null,
        event_type: validated.eventType,
        event_date: validated.eventDate || null,
        event_location: validated.eventLocation || null,
        guest_count: validated.guestCount ?? null,
        budget: validated.budget ?? null,
        service_id: validated.serviceId || null,
        message: validated.message || null,
      })
      .select("id, created_at, status")
      .single();

    if (error) {
      return jsonError("INTERNAL_ERROR", "Неуспешно изпращане на запитването за оферта.", 500);
    }

    return jsonSuccess(
      {
        message: "Запитването за оферта е изпратено успешно.",
        request: data,
      },
      201,
    );
  } catch (error) {
    if (error instanceof SyntaxError) {
      return jsonError("INVALID_JSON", "Тялото на заявката трябва да бъде валиден JSON.", 400);
    }

    if (error instanceof ZodError) {
      return jsonError("VALIDATION_ERROR", "Невалидни данни във формата за оферта.", 400, mapZodError(error));
    }

    return jsonError("INTERNAL_ERROR", "Възникна неочаквана сървърна грешка.", 500);
  }
}
