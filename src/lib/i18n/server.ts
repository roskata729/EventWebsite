import { cookies } from "next/headers";
import { defaultLocale, isLocale, type Locale, localeCookieName } from "@/lib/i18n";

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const value = cookieStore.get(localeCookieName)?.value;
  if (value && isLocale(value)) {
    return value;
  }
  return defaultLocale;
}
