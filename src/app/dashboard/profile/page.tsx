import { getProfile } from "@/services/profile.service";
import ProfileForm from "./components/ProfileForm";
import { auth } from "@/auth";
// Force dynamic rendering – the page will be rendered on each request
export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = await auth();
  const profile = await getProfile(session?.user?.id ?? "");

  return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <main className="mx-auto max-w-8xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Profile</h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage your personal and professional information.
            </p>
          </div>
          <ProfileForm initialProfile={profile} />
        </main>
      </div>
  );
}
