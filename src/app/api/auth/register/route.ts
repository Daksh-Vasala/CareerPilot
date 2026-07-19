import { prisma } from "@/lib/prisma";
import { formatZodError } from "@/lib/zod-error";
import { registerSchema } from "@/schemas/auth.schema";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validateData = registerSchema.parse(body);

    const { fullName, email, password } = validateData;

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "User exists, please login",
        },
        {
          status: 409,
        },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        profile: {
          create: {
            fullName
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        data: {
          id: user.id,
          email: user.email,
        },
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: formatZodError(error),
        },
        { status: 400 },
      );
    }

    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
