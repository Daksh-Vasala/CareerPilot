import { auth } from "@/auth";
import {
  deleteInterviewService,
  updateInterviewService,
  UpdateInterviewInput,
} from "@/services/interview-tracker.service";
import { NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const data: UpdateInterviewInput = {
      type: body.type,
      round: body.round,
      scheduledAt: body.scheduledAt ? new Date(body.scheduledAt) : undefined,
      duration: body.duration,
      location: body.location,
      meetingLink: body.meetingLink,
      interviewer: body.interviewer,
      status: body.status,
      result: body.result,
      feedback: body.feedback,
    };

    const interview = await updateInterviewService(session.user.id, id, data);
    return NextResponse.json(interview);
  } catch (error) {
    console.error("Update interview error:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await deleteInterviewService(session.user.id, id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete interview error:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}