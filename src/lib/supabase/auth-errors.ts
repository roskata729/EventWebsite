type AuthLikeError = {
  code?: string;
  message?: string;
  __isAuthError?: boolean;
};

export function isRecoverableAuthError(error: unknown): boolean {
  if (!error || typeof error !== "object") {
    return false;
  }

  const authError = error as AuthLikeError;
  const code = authError.code ?? "";
  const message = authError.message ?? "";

  return (
    code === "refresh_token_not_found" ||
    message.includes("Invalid Refresh Token") ||
    message.includes("Auth session missing")
  );
}
