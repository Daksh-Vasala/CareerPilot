import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { analyzeResume } from "@/services/resume-analysis.service";
import { getResume } from "@/services/resume.service";

export async function POST() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const resume = await getResume(session.user.id);

    await analyzeResume(resume!.id);

    return NextResponse.json(
      {
        success: true,
        message: "Resume analyzed successfully.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Resume analysis failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to analyze resume.",
      },
      { status: 500 },
    );
  }
}
