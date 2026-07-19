import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().min(4, "Full name should be atleast 4 characters"),
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
