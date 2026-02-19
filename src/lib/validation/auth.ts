import { z } from "zod";
import { isStrongPassword } from "@/lib/security/password";

const MAX_PASSWORD_LENGTH = 128;

function normalizeString(value: unknown) {
  return typeof value === "string" ? value.normalize("NFKC").trim() : "";
}

const emailField = z
  .string()
  .transform((value) => normalizeString(value).toLowerCase())
  .pipe(z.email().max(320));

const passwordField = z
  .string()
  .max(MAX_PASSWORD_LENGTH)
  .refine((value) => value.length > 0, "Паролата е задължителна.");

const honeypotField = z
  .string()
  .transform((value) => normalizeString(value))
  .pipe(z.string().max(0))
  .optional()
  .default("");

export const loginInputSchema = z.object({
  email: emailField,
  password: passwordField,
  honeypot: honeypotField,
  next: z
    .string()
    .transform((value) => normalizeString(value))
    .optional(),
});

export const registerInputSchema = z
  .object({
    fullName: z
      .string()
      .transform((value) => normalizeString(value))
      .pipe(z.string().min(2).max(120)),
    email: emailField,
    password: passwordField.refine(isStrongPassword, "Паролата трябва да е силна."),
    confirmPassword: z
      .string()
      .max(MAX_PASSWORD_LENGTH)
      .transform((value) => normalizeString(value)),
    honeypot: honeypotField,
  })
  .superRefine((value, context) => {
    if (value.password !== value.confirmPassword) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Паролите не съвпадат.",
      });
    }
  });

export const forgotPasswordInputSchema = z.object({
  email: emailField,
  honeypot: honeypotField,
});

export const resetPasswordInputSchema = z
  .object({
    password: passwordField.refine(isStrongPassword, "Паролата трябва да е силна."),
    confirmPassword: z
      .string()
      .max(MAX_PASSWORD_LENGTH)
      .transform((value) => normalizeString(value)),
    honeypot: honeypotField,
  })
  .superRefine((value, context) => {
    if (value.password !== value.confirmPassword) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Паролите не съвпадат.",
      });
    }
  });
