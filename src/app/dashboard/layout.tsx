import { auth } from "@/auth";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { getProfileByUserId } from "@/repositories/profile.repository";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  const user = await getProfileByUserId(session!.user.id);
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar image={user?.user.image ?? ""} fullName={user?.fullName ?? ""} />

        <main className="flex-1 overflow-y-auto bg-slate-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}