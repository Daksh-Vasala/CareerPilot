import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

import { updateJobApplicationSchema } from "@/schemas/job-application.schema";

import {
  updateJobApplicationService,
  deleteJobApplicationService,
} from "@/services/job-application.service";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const { id } = await params;

    const body = await request.json();

    const validationResult = updateJobApplicationSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request data",
          errors: validationResult.error.flatten(),
        },
        { status: 400 },
      );
    }

    const application = await updateJobApplicationService(
      id,
      session.user.id,
      validationResult.data,
    );

    return NextResponse.json(
      {
        success: true,
        message: "Job application updated successfully",
        data: application,
      },
      { status: 200 },
    );
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Job application not found"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Job application not found",
        },
        { status: 404 },
      );
    }

    console.error("Update job application error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update job application",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const { id } = await params;

    await deleteJobApplicationService(id, session.user.id);

    return NextResponse.json(
      {
        success: true,
        message: "Job application deleted successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Job application not found"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Job application not found",
        },
        { status: 404 },
      );
    }

    console.error("Delete job application error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete job application",
      },
      { status: 500 },
    );
  }
}
