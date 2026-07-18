import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/schemas/auth.schema";

const authConfig = {
  providers: [
    Credentials({
      name: "Credentials",

      async authorize(credentials) {
        // 1. Validate input
        const validatedFields = loginSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;

        // 2. Find user
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user || !user.password) {
          return null;
        }

        // 3. Compare password
        const isPasswordCorrect = await bcrypt.compare(
          password,
          user.password
        );

        if (!isPasswordCorrect) {
          return null;
        }

        // 4. Return user
        return {
          id: user.id,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
} satisfies NextAuthConfig;

export default authConfig;