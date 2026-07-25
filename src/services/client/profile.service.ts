import { ProfileFormData } from "@/types/profile.types";
import { cookies } from "next/headers";

// Helper to get the base URL for server-side fetch
function getBaseUrl() {
  // In production (Vercel) use VERCEL_URL, otherwise fallback to localhost
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  // For local development, use NEXT_PUBLIC_BASE_URL or default
  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
}

export async function getProfile(): Promise<ProfileFormData> {
  const base = getBaseUrl();

  const cookieStore = await cookies();

  const res = await fetch(`${base}/api/profile`, {
    method: "GET",
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  // if (!res.ok) {
  //   throw new Error(`Failed to fetch profile: ${res.status}`);
  // }

  const result = await res.json();

  // Map API response to the form shape (same as original)
  return {
    id: result.id ?? "",
    userId: result.userId ?? "",
    image: result.image ?? "",
    email: result.email ?? "",
    fullName: result.profile.fullName ?? "",
    phone: result.profile.phone ?? "",
    bio: result.profile.bio ?? "",
    college: result.profile.college ?? "",
    degree: result.profile.degree ?? "",
    graduationYear: result.profile.graduationYear?.toString() ?? "",
    linkedin: result.profile.linkedin ?? "",
    github: result.profile.github ?? "",
    portfolio: result.profile.portfolio ?? "",
    
  createdAt: result.profile.createdAt ?? "",
  updatedAt: result.profile.updatedAt ?? "",
  };
}

export async function uploadProfileImage(formData: FormData) {
  const res = await fetch("/api/profile/image", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to upload profile image");
  }

  return res.json();
}
