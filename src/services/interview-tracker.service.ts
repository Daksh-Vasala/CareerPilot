import {
  createInterview,
  CreateInterviewInput,
  deleteInterview,
  getInterviewById,
  getJobApplicationsInterview,
  updateInterview,
  UpdateInterviewInput,
} from "@/repositories/interview-tracker.repository";
import { getJobApplicationById } from "@/repositories/job-application.repository";
import { NextResponse } from "next/server";

export type { CreateInterviewInput, UpdateInterviewInput };

export async function getJobApplicationsInterviewService(userId: string) {
  try {
    const res = await getJobApplicationsInterview(userId);
    return res;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      {
        status: 500,
      },
    );
  }
}

export async function createInterviewService(
  userId: string,
  data: CreateInterviewInput,
) {
  const application = await getJobApplicationById(data.applicationId, userId);

  if (!application) {
    throw new Error("Job application not found");
  }

  return createInterview(data);
}

export async function updateInterviewService(
  userId: string,
  interviewId: string,
  data: UpdateInterviewInput,
) {
  const interview = await getInterviewById(interviewId);

  if (!interview || interview.application.userId !== userId) {
    throw new Error("Interview not found or unauthorized");
  }

  return updateInterview(interviewId, data);
}

export async function deleteInterviewService(userId: string, interviewId: string) {
  const interview = await getInterviewById(interviewId);

  if (!interview || interview.application.userId !== userId) {
    throw new Error("Interview not found or unauthorized");
  }

  return deleteInterview(interviewId);
}
