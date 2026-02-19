export type PasswordStrength = "weak" | "medium" | "strong";

const MIN_STRONG_PASSWORD_LENGTH = 12;
const ALT_MIN_STRONG_PASSWORD_LENGTH = 14;

function normalizeString(value: string) {
  return value.normalize("NFKC").trim();
}

function hasLowercase(value: string) {
  return /[a-z]/.test(value);
}

function hasUppercase(value: string) {
  return /[A-Z]/.test(value);
}

function hasDigit(value: string) {
  return /\d/.test(value);
}

function hasSpecial(value: string) {
  return /[^A-Za-z0-9]/.test(value);
}

export function getPasswordStrength(password: string): PasswordStrength {
  const normalized = normalizeString(password);
  const hasLower = hasLowercase(normalized);
  const hasUpper = hasUppercase(normalized);
  const hasNum = hasDigit(normalized);
  const hasSpec = hasSpecial(normalized);
  const checks = [hasLower, hasUpper, hasNum, hasSpec];
  const passedChecks = checks.filter(Boolean).length;

  const longAlphaNumericStrong = normalized.length >= ALT_MIN_STRONG_PASSWORD_LENGTH && hasLower && hasUpper && hasNum;
  const complexStrong = normalized.length >= MIN_STRONG_PASSWORD_LENGTH && passedChecks === 4;

  if (complexStrong || longAlphaNumericStrong) {
    return "strong";
  }

  if (normalized.length >= 10 && passedChecks >= 3) {
    return "medium";
  }

  return "weak";
}

export function isStrongPassword(password: string) {
  return getPasswordStrength(password) === "strong";
}
