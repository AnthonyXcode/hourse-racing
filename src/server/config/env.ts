/**
 * API server environment config — validated at boot so the server never
 * starts with a missing or weak API key.
 */

import { z } from "zod";

const MIN_KEY_LENGTH = 32;

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  // Comma-separated so each consumer can get its own key and keys can be rotated independently
  API_KEYS: z
    .string({ required_error: "API_KEYS is required (generate one with: openssl rand -hex 32)" })
    .transform((raw) =>
      raw
        .split(",")
        .map((key) => key.trim())
        .filter(Boolean),
    )
    .pipe(
      z
        .array(z.string().min(MIN_KEY_LENGTH, `each API key must be at least ${MIN_KEY_LENGTH} characters`))
        .min(1, "API_KEYS must contain at least one key"),
    ),
});

export type Env = z.infer<typeof EnvSchema>;

export function loadEnv(source: NodeJS.ProcessEnv = process.env): Env {
  const result = EnvSchema.safeParse(source);
  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `  - ${issue.path.join(".") || "env"}: ${issue.message}`)
      .join("\n");
    throw new Error(`Invalid environment configuration:\n${issues}`);
  }
  return result.data;
}
