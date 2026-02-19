import { z, ZodError } from "zod";
import { jsonError, jsonSuccess, mapZodError } from "@/lib/api/responses";
import {
  BRAND_NAME_KEY,
  CONTACT_EMAIL_KEY,
  CONTACT_INSTAGRAM_KEY,
  CONTACT_LINKEDIN_KEY,
  CONTACT_PHONE_KEY,
  DEFAULT_BRAND_NAME,
  DEFAULT_CONTACT_SETTINGS,
} from "@/lib/site-settings";
import { isAdminApiRequest } from "@/lib/supabase/admin-api";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const updateSettingsSchema = z.object({
  brandName: z.string().trim().min(2).max(120),
  contactPhone: z.string().trim().min(3).max(120),
  contactEmail: z.email().trim().max(180),
  contactInstagram: z.string().trim().min(2).max(120),
  contactLinkedin: z.string().trim().min(2).max(120),
});

export async function GET() {
  try {
    const isAdmin = await isAdminApiRequest();
    if (!isAdmin) return jsonError("UNAUTHORIZED", "Admin access required.", 401);

    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("app_settings")
      .select("key, value")
      .in("key", [BRAND_NAME_KEY, CONTACT_PHONE_KEY, CONTACT_EMAIL_KEY, CONTACT_INSTAGRAM_KEY, CONTACT_LINKEDIN_KEY]);

    if (error) return jsonError("INTERNAL_ERROR", `Failed to load settings: ${error.message}`, 500);

    const map = new Map((data ?? []).map((item) => [item.key, item.value?.trim() ?? ""]));
    return jsonSuccess({
      brandName: map.get(BRAND_NAME_KEY) || DEFAULT_BRAND_NAME,
      contactPhone: map.get(CONTACT_PHONE_KEY) || DEFAULT_CONTACT_SETTINGS.phone,
      contactEmail: map.get(CONTACT_EMAIL_KEY) || DEFAULT_CONTACT_SETTINGS.email,
      contactInstagram: map.get(CONTACT_INSTAGRAM_KEY) || DEFAULT_CONTACT_SETTINGS.instagram,
      contactLinkedin: map.get(CONTACT_LINKEDIN_KEY) || DEFAULT_CONTACT_SETTINGS.linkedin,
    });
  } catch {
    return jsonError("INTERNAL_ERROR", "Unexpected server error.", 500);
  }
}

export async function PUT(request: Request) {
  try {
    const isAdmin = await isAdminApiRequest();
    if (!isAdmin) return jsonError("UNAUTHORIZED", "Admin access required.", 401);

    const body = updateSettingsSchema.parse(await request.json());
    const supabase = createSupabaseServerClient();
    const { error } = await supabase
      .from("app_settings")
      .upsert(
        [
          { key: BRAND_NAME_KEY, value: body.brandName },
          { key: CONTACT_PHONE_KEY, value: body.contactPhone },
          { key: CONTACT_EMAIL_KEY, value: body.contactEmail },
          { key: CONTACT_INSTAGRAM_KEY, value: body.contactInstagram },
          { key: CONTACT_LINKEDIN_KEY, value: body.contactLinkedin },
        ],
        { onConflict: "key" },
      );

    if (error) return jsonError("INTERNAL_ERROR", `Failed to save settings: ${error.message}`, 500);

    return jsonSuccess({
      brandName: body.brandName,
      contactPhone: body.contactPhone,
      contactEmail: body.contactEmail,
      contactInstagram: body.contactInstagram,
      contactLinkedin: body.contactLinkedin,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return jsonError("VALIDATION_ERROR", "Invalid settings payload.", 400, mapZodError(error));
    }

    return jsonError("INTERNAL_ERROR", "Unexpected server error.", 500);
  }
}
