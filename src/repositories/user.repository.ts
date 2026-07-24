import { prisma } from "@/lib/prisma";

export function getUserById(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export function updateUserImage(
  id: string,
  data: {
    image: string;
    imagePublicId: string;
  },
) {
  return prisma.user.update({
    where: { id },
    data,
  });
}
