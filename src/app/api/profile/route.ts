import { auth } from "@/auth";
import { profileSchema } from "@/schemas/profile.schema";
import { editProfile } from "@/services/profile.service";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const result = profileSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: result.error.issues,
        },
        {
          status: 400,
        },
      );
    }

    const updatedProfile = await editProfile(session.user.id, result.data);
    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Internal Server error",
      },
      {
        status: 500,
      },
    );
  }
}
