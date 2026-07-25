import ProfileField from "@/components/ProfileField";
import { ProfileFormData } from "@/types/profile.types";
import { Calendar, GraduationCap, User } from "lucide-react";
import ProfileAvatar from "./ProfileAvatar";

const ProfileSidebar = ({
  initialProfile,
}: {
  initialProfile: ProfileFormData;
}) => {
  console.log(initialProfile)
  return (
    <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col items-center text-center">
        <div className="h-24 w-24 overflow-hidden rounded-full ring-4 ring-slate-100 bg-indigo-100 flex items-center justify-center">
          <ProfileAvatar
            image={initialProfile.image}
            fullName={initialProfile.fullName}
          />
        </div>
        <h2 className="mt-4 text-lg font-semibold">
          {initialProfile.fullName}
        </h2>
        <p className="text-sm text-slate-500">{initialProfile.email}</p>

        <div className="mt-5 w-full">
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="text-slate-500">Profile Completion</span>
            <span className="font-semibold text-indigo-600">85%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-indigo-600"
              style={{ width: "85%" }}
            />
          </div>
        </div>
      </div>

      <div className="my-6 h-px bg-slate-100" />

      <ul className="space-y-3 text-sm text-slate-600">
        <li className="flex items-center gap-3">
          <GraduationCap className="h-4 w-4 text-slate-400" />
          <ProfileField label="College" value={initialProfile.college} />
        </li>
        <li className="flex items-center gap-3">
          <User className="h-4 w-4 text-slate-400" />
          <ProfileField label="Degree" value={initialProfile.degree} />
        </li>
        <li className="flex items-center gap-3">
          <Calendar className="h-4 w-4 text-slate-400" />
          <ProfileField label="Degree" value={initialProfile.graduationYear} />
        </li>
      </ul>
    </aside>
  );
};

export default ProfileSidebar;
