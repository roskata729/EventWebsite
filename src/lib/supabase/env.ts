function getEnvVariable(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Липсваща променлива на средата: ${name}`);
  }

  return value;
}

export function getSupabaseUrl() {
  return getEnvVariable("NEXT_PUBLIC_SUPABASE_URL");
}

export function getSupabaseAnonKey() {
  return getEnvVariable("NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

export function getSupabaseServiceRoleKey() {
  return getEnvVariable("SUPABASE_SERVICE_ROLE_KEY");
}
