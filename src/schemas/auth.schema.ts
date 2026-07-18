import { z } from "zod";

export const registerSchema = z.object({
  email: z.email("Invalid email address").trim(),
  password: z
    .string()
    .min(8, "Password must be atleast 8 characters")
    .max(100, "Password is too big"),
});

export const loginSchema = z.object({
  email: z.email("Invalid email address").trim(),

  password: z.string().min(1, "Password is required"),
});
