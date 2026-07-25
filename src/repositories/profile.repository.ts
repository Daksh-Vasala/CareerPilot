import { prisma } from "@/lib/prisma";
import { ProfileInput } from "@/schemas/profile.schema";

export function getProfileByUserId(userId: string) {
  return prisma.profile.findUnique({
    where: {
      userId,
    },
    include: {
      user: {
        select: {
          email: true,
          image: true
        }
      }
    }
  });
  
}

export async function updateProfile(
  userId: string,
  data: ProfileInput,
) {
  return prisma.profile.update({
    where: {
      userId,
    },
    data,
  });
}
