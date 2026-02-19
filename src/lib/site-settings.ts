import { cache } from "react";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const BRAND_NAME_KEY = "brand_name";
export const DEFAULT_BRAND_NAME = "Събития Колеви";
export const CONTACT_PHONE_KEY = "contact_phone";
export const CONTACT_EMAIL_KEY = "contact_email";
export const CONTACT_INSTAGRAM_KEY = "contact_instagram";
export const CONTACT_LINKEDIN_KEY = "contact_linkedin";

export const DEFAULT_CONTACT_SETTINGS = {
  phone: "+359 700 123 45",
  email: "hello@sabitiakolevi.bg",
  instagram: "@sabitiakolevi",
  linkedin: "ТЕСТ",
} as const;

function normalizeBrandName(value: string | null | undefined) {
  const trimmed = value?.trim() ?? "";
  return trimmed.length > 0 ? trimmed : DEFAULT_BRAND_NAME;
}

export const getBrandName = cache(async () => {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase
    .from("app_settings")
    .select("value")
    .eq("key", BRAND_NAME_KEY)
    .maybeSingle();

  return normalizeBrandName(data?.value);
});

export const getContactSettings = cache(async () => {
  const supabase = createSupabaseServerClient();
  const keys = [CONTACT_PHONE_KEY, CONTACT_EMAIL_KEY, CONTACT_INSTAGRAM_KEY, CONTACT_LINKEDIN_KEY];
  const { data } = await supabase
    .from("app_settings")
    .select("key, value")
    .in("key", keys);

  const map = new Map((data ?? []).map((item) => [item.key, item.value?.trim() ?? ""]));

  return {
    phone: map.get(CONTACT_PHONE_KEY) || DEFAULT_CONTACT_SETTINGS.phone,
    email: map.get(CONTACT_EMAIL_KEY) || DEFAULT_CONTACT_SETTINGS.email,
    instagram: map.get(CONTACT_INSTAGRAM_KEY) || DEFAULT_CONTACT_SETTINGS.instagram,
    linkedin: map.get(CONTACT_LINKEDIN_KEY) || DEFAULT_CONTACT_SETTINGS.linkedin,
  };
});
