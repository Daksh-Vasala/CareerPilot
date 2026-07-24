import { deleteProfileImage, updloadProfileImage } from "@/lib/upload";
import {
  getProfileByUserId,
  updateProfile,
} from "@/repositories/profile.repository";
import { getUserById, updateUserImage } from "@/repositories/user.repository";
import { ProfileInput } from "@/schemas/profile.schema";

export interface ProfileFormData {
  id: string;
  userId: string;
  email: string;
  fullName: string;
  phone: string;
  bio: string;
  college: string;
  degree: string;
  graduationYear: number;
  linkedin: string;
  github: string;
  portfolio: string;
  createdAt: Date;
  updatedAt: Date;
}
export async function getProfile(userId: string):Promise<ProfileFormData | null> {
  const profile = await getProfileByUserId(userId);

  if (!profile) return null

  return {
    id: profile.id,
    userId: profile.userId,
    email: profile.user.email,

    fullName: profile.fullName ?? "",
    phone: profile.phone ?? "",
    bio: profile.bio ?? "",
    college: profile.college ?? "",
    degree: profile.degree ?? "",
    graduationYear: profile.graduationYear ?? new Date().getFullYear(),

    github: profile.github ?? "",
    linkedin: profile.linkedin ?? "",
    portfolio: profile.portfolio ?? "",

    createdAt: profile.createdAt,
    updatedAt: profile.updatedAt,
  };
}

export async function editProfile(userId: string, data: ProfileInput) {
  const profile = await getProfileByUserId(userId);
  if (!profile) {
    throw new Error("Profile not found");
  }

  return updateProfile(userId, data);
}

export async function saveProfileImage(userId: string, file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const uploaded = await updloadProfileImage(buffer);

  const existingUser = await getUserById(userId);

  if (existingUser?.imagePublicId) {
    await deleteProfileImage(existingUser.imagePublicId);
  }

  return updateUserImage(userId, {
    image: uploaded.secure_url,
    imagePublicId: uploaded.public_id,
  });
}
