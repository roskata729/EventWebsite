import { ZodError } from "zod";
import { jsonError, jsonSuccess, mapZodError } from "@/lib/api/responses";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseServerAuthClient } from "@/lib/supabase/server-auth";
import { quoteRequestSchema } from "@/lib/validation/quote";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const validated = quoteRequestSchema.parse(payload);

    const authSupabase = await createSupabaseServerAuthClient();
    const {
      data: { user },
    } = await authSupabase.auth.getUser();

    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("quote_requests")
      .insert({
        user_id: user?.id ?? null,
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
      console.error("[POST /api/quote] Supabase insert failed", {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });

      return jsonError(
        "INTERNAL_ERROR",
        `Неуспешно изпращане на запитването за оферта: ${error.message}`,
        500,
      );
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

    if (error instanceof Error) {
      console.error("[POST /api/quote] Unexpected error", error);

      if (error.message.includes("SUPABASE_SERVICE_ROLE_KEY")) {
        return jsonError(
          "INTERNAL_ERROR",
          "Липсва SUPABASE_SERVICE_ROLE_KEY в server env променливите.",
          500,
        );
      }

      if (error.message.includes("NEXT_PUBLIC_SUPABASE_URL")) {
        return jsonError(
          "INTERNAL_ERROR",
          "Липсва NEXT_PUBLIC_SUPABASE_URL в env променливите.",
          500,
        );
      }
    }

    return jsonError("INTERNAL_ERROR", "Възникна неочаквана сървърна грешка.", 500);
  }
}
