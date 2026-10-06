import { auth } from "@/auth";
import {
  createInterviewService,
  CreateInterviewInput,
} from "@/services/interview-tracker.service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const data: CreateInterviewInput = {
      applicationId: body.applicationId,
      type: body.type,
      round: body.round,
      scheduledAt: new Date(body.scheduledAt),
      duration: body.duration,
      location: body.location,
      meetingLink: body.meetingLink,
      interviewer: body.interviewer,
      status: body.status || "SCHEDULED",
      result: body.result || "PENDING",
      feedback: body.feedback,
    };

    const interview = await createInterviewService(session.user.id, data);
    return NextResponse.json(interview, { status: 201 });
  } catch (error) {
    console.error("Create interview error:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}