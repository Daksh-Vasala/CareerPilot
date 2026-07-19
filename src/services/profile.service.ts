import { getProfileByUserId, updateProfile } from "@/repositories/profile.repository";
import { ProfileInput } from "@/schemas/profile.schema";

export async function getProfile(userId: string){
  return await getProfileByUserId(userId);
}

export async function editProfile(userId: string, data:ProfileInput){
  const profile = await getProfileByUserId(userId)
  if(!profile){
    throw new Error("Profile not found");
  }

  return updateProfile(userId, data);

}