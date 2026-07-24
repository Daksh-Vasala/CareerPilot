import { auth } from "@/auth";
import { saveProfileImage } from "@/services/profile.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const formData = await req.formData();

    const image = formData.get("image");

    if (!(image instanceof File)) {
      return NextResponse.json(
        { message: "Image is required" },
        { status: 400 },
      );
    }

    const updatedUser = await saveProfileImage(session.user.id, image);

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to upload profile image" },
      { status: 500 },
    );
  }
}
