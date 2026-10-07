"use server";

export type ContactState = { status: "idle" | "success" | "error" };

const LIMITS = { firstName: 256, lastName: 256, email: 256, phone: 256, message: 5000 };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContact(_prev: ContactState, form: FormData): Promise<ContactState> {
  const fields = Object.entries(LIMITS).map(([name, max]) => [String(form.get(name) ?? "").trim(), max] as const);
  const isValid = fields.every(([value, max]) => value.length > 0 && value.length <= max);
  if (!isValid || !EMAIL.test(String(form.get("email")).trim())) return { status: "error" };

  // ponytail: validated but not delivered anywhere yet. Wire an email provider (e.g. Resend) and
  // rate limiting once the business inbox is known; until then the success state is cosmetic.
  return { status: "success" };
}
