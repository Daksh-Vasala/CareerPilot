import { signOut } from "@/auth";

export default async function DashboardPage() {

  return (
    <main className="p-8">
      <h1>Dashboard</h1>

      <form
        action={async () => {
          "use server";

          await signOut({
            redirectTo: "/login",
          });
        }}
      >
        <button
          className="mt-4 rounded bg-red-500 px-4 py-2 text-white"
        >
          Logout
        </button>
      </form>
    </main>
  );
}