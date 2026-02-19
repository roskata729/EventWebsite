import { ZodError } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseServerAuthClient } from "@/lib/supabase/server-auth";
import { contactRequestSchema } from "@/lib/validation/contact";
import { jsonError, jsonSuccess, mapZodError } from "@/lib/api/responses";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const validated = contactRequestSchema.parse(payload);

    const authSupabase = await createSupabaseServerAuthClient();
    const {
      data: { user },
    } = await authSupabase.auth.getUser();

    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("contact_requests")
      .insert({
        user_id: user?.id ?? null,
        name: validated.name,
        email: validated.email,
        phone: validated.phone || null,
        company: validated.company || null,
        subject: validated.subject || null,
        message: validated.message,
        event_date: validated.eventDate || null,
      })
      .select("id, created_at, status")
      .single();

    if (error) {
      return jsonError("INTERNAL_ERROR", "Неуспешно изпращане на запитването за контакт.", 500);
    }

    return jsonSuccess(
      {
        message: "Запитването за контакт е изпратено успешно.",
        request: data,
      },
      201,
    );
  } catch (error) {
    if (error instanceof SyntaxError) {
      return jsonError("INVALID_JSON", "Тялото на заявката трябва да бъде валиден JSON.", 400);
    }

    if (error instanceof ZodError) {
      return jsonError("VALIDATION_ERROR", "Невалидни данни във формата за контакт.", 400, mapZodError(error));
    }

    return jsonError("INTERNAL_ERROR", "Възникна неочаквана сървърна грешка.", 500);
  }
}
