"use client";

import { useForm } from "react-hook-form";
import {
  User,
  GraduationCap,
  Link2,
  Calendar,
  ChevronDown,
} from "lucide-react";
import { useEffect, useState } from "react";
import ProfileField from "@/components/ProfileField";
import { toast } from "sonner";

type ProfileForm = {
  email: string;
  fullName: string;
  phone: string;
  bio: string;
  college: string;
  degree: string;
  graduationYear: string;
  linkedin: string;
  github: string;
  portfolio: string;
};

export default function ProfilePage() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isDirty },
  } = useForm<ProfileForm>({
    defaultValues: {
      email: "",
      fullName: "",
      phone: "",
      bio: "",
      college: "",
      degree: "",
      graduationYear: "",
      linkedin: "",
      github: "",
      portfolio: "",
    },
  });

  const [initialProfile, setInitialProfile] = useState<ProfileForm | null>(null);
  // eslint-disable-next-line react-hooks/incompatible-library
  const profile = watch();
  const bio = watch("bio") || "";

  const onSubmit = async (data: ProfileForm) => {
    try {
      await fetch("/api/profile", {
        method: "PATCH",
        headers:{
          "Content-type": "application/json"
        },
        body: JSON.stringify(data)
      })
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Error in updating profile: ", error)
      toast.error("Profile failed to update");
    }
    console.log("Saved:", data);
  };

  

  useEffect(() => {
    async function getProfile() {
      const res = await fetch("/api/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();
      const profile = {
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
      }
      console.log(profile);
      setInitialProfile(profile)
      reset(profile);
    }

    getProfile();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto max-w-6xl px-6 py-8 pb-28">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Profile</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your personal and professional information.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr]"
        >
          {/* Left card */}
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="h-24 w-24 overflow-hidden rounded-full ring-4 ring-slate-100">
                <img
                  src="https://i.pravatar.cc/160?img=12"
                  alt="Alex Rivera"
                  className="h-full w-full object-cover"
                />
              </div>
              <h2 className="mt-4 text-lg font-semibold">{initialProfile?.fullName}</h2>
              <p className="text-sm text-slate-500">{initialProfile?.email}</p>

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
                <ProfileField label="College" value={initialProfile?.college} />
              </li>
              <li className="flex items-center gap-3">
                <User className="h-4 w-4 text-slate-400" />
                <ProfileField label="Degree" value={initialProfile?.degree} />
              </li>
              <li className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-slate-400" />
                <ProfileField label="Degree" value={initialProfile?.graduationYear} />
              </li>
            </ul>
          </aside>

          {/* Right column */}
          <div className="space-y-6">
            {/* Personal Info */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-2">
                <User className="h-5 w-5 text-indigo-600" />
                <h3 className="text-base font-semibold">
                  Personal Information
                </h3>
              </div>
              <div className="h-px bg-slate-100" />

              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                <Field label="Full Name">
                  <input {...register("fullName")} className="input" />
                </Field>
                <Field label="Phone Number">
                  <input {...register("phone")} className="input" />
                  <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                    {/* <AlertCircle className="h-3 w-3" />
                    Verification required */}
                  </p>
                </Field>
              </div>

              <div className="mt-5">
                <Field label="Bio">
                  <textarea
                    {...register("bio")}
                    rows={4}
                    maxLength={500}
                    className="input resize-none"
                  />
                  <p className="mt-1 text-xs text-slate-400">
                    Brief description for your profile. {bio.length}/500
                    characters
                  </p>
                </Field>
              </div>
            </section>

            {/* Education */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-indigo-600" />
                <h3 className="text-base font-semibold">Education</h3>
              </div>
              <div className="h-px bg-slate-100" />

              <div className="mt-5 space-y-5">
                <Field label="College / University">
                  <input {...register("college")} className="input" />
                </Field>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <Field label="Degree">
                    <input {...register("degree")} className="input" />
                  </Field>
                  <Field label="Graduation Year">
                    <div className="relative">
                      <select
                        {...register("graduationYear")}
                        className="input appearance-none pr-9"
                      >
                        <option>2024</option>
                        <option>2025</option>
                        <option>2026</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    </div>
                  </Field>
                </div>
              </div>
            </section>

            {/* Professional Links */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-2">
                <Link2 className="h-5 w-5 text-indigo-600" />
                <h3 className="text-base font-semibold">Professional Links</h3>
              </div>
              <div className="h-px bg-slate-100" />

              <div className="mt-5 space-y-5">
                <Field label="LinkedIn Profile">
                  <div className="input flex items-center gap-1 p-0">
                    <span className="pl-3 text-sm text-slate-400">
                      linkedin.com/in/
                    </span>
                    <input
                      {...register("linkedin")}
                      className="w-full bg-transparent py-2 pr-3 text-sm outline-none"
                    />
                  </div>
                </Field>
                <Field label="GitHub Profile">
                  <div className="input flex items-center gap-1 p-0">
                    <span className="pl-3 text-sm text-slate-400">
                      github.com/
                    </span>
                    <input
                      {...register("github")}
                      className="w-full bg-transparent py-2 pr-3 text-sm outline-none"
                    />
                  </div>
                </Field>
                <Field label="Portfolio Website">
                  <input
                    {...register("portfolio")}
                    placeholder="https://"
                    className="input"
                  />
                </Field>
              </div>
            </section>
          </div>

          {/* Sticky footer */}
          {isDirty && (
            <div className="fixed bottom-0 right-0 z-20 border-t border-slate-200 bg-white/90 backdrop-blur lg:col-span-2">
              <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
                <p className="text-sm text-slate-600">
                  You have unsaved changes.
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => reset()}
                    className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    disabled={!isDirty}
                    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700 disabled:opacity-70"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      </main>

      <style jsx>{`
        .input {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid rgb(226 232 240);
          background-color: rgb(248 250 252);
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          outline: none;
        }
        .input:focus {
          border-color: rgb(129 140 248);
          background-color: white;
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-slate-500">
        {label}
      </span>
      {children}
    </label>
  );
}
