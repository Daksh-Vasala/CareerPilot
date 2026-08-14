import { NextRequest, NextResponse } from "next/server";
import { createJobApplicationSchema } from "@/schemas/job-application.schema";
import { createJobApplicationService } from "@/services/job-application.service";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const body = await request.json();

    const validationResult =
      createJobApplicationSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request data",
          errors: validationResult.error.flatten(),
        },
        { status: 400 }
      );
    }

    const jobApplication =
      await createJobApplicationService({
        ...validationResult.data,
        userId: session.user.id,
      });

    return NextResponse.json(
      {
        success: true,
        message: "Job application created successfully",
        data: jobApplication,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Create job application error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create job application",
      },
      { status: 500 }
    );
  }
}