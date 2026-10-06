import { auth } from "@/auth";
import { createInterviewSchema } from "@/schemas/interview.schema";
import { createInterviewService } from "@/services/interview-tracker.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session!.user.id) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const body = await req.json();

    const parsed = await createInterviewSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Invalid interview date",
          errors: parsed.error.flatten().fieldErrors,
        },
        {
          status: 401,
        },
      );
    }

    const interview = await createInterviewService(
      session!.user.id,
      parsed.data,
    );

    return NextResponse.json(
      {
        success: true,
        message: "Interview created successfully",
        data: interview,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error",
        error,
      },
      {
        status: 500,
      },
    );
  }
}
