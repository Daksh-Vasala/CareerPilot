import { getProfile } from "@/services/profile.service";
import ProfileForm from "./components/ProfileForm";
import { auth } from "@/auth";
// Force dynamic rendering – the page will be rendered on each request
export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = await auth();
  const profile = await getProfile(session?.user?.id ?? "");

  return (
    <div className="mx-auto max-w-8xl space-y-6 text-slate-900">
      <header className="flex items-start gap-3">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="mt-0.5 text-sm text-slate-500">
            Manage your personal and professional information.
          </p>
        </div>
      </header>
      <ProfileForm initialProfile={profile} />
    </div>
  );
}
