"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  FileText,
  Briefcase,
  ClipboardList,
  Map,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { signOut } from "next-auth/react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Profile", href: "/dashboard/profile", icon: User },
  {
    label: "Resume Analyzer",
    href: "/dashboard/resume-analyzer",
    icon: FileText,
  },
  {
    label: "Job Applications",
    href: "/dashboard/job-applications",
    icon: Briefcase,
  },
  {
    label: "Interview Tracker",
    href: "/dashboard/interview-tracker",
    icon: ClipboardList,
  },
  { label: "AI Roadmap", href: "/dashboard/ai-roadmap", icon: Map },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [loggingOut, setLoggingOut] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(href + "/");

  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      await signOut({
        callbackUrl: "/login",
      });
    } finally {
      setLoggingOut(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const SidebarContent = () => (
    <>
      {/* Brand */}
      <div className="px-6 pt-6 pb-5">
        <h1 className="text-xl font-bold text-indigo-600 leading-tight">
          CareerPilot
        </h1>
        <p className="mt-0.5 text-xs text-slate-500">AI Career Navigator</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3">
        <ul className="space-y-1">
          {navItems.map(({ label, href, icon: Icon }) => {
            const active =
              href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(href);

            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={closeMobileMenu}
                  className={`relative flex items-center gap-4 rounded-xl px-4 py-3 text-[15px] transition-all duration-200 ${
                    active
                      ? "bg-[#F5F3FF] font-semibold text-[#5B4BFF]"
                      : "font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${
                      active ? "text-[#5B4BFF]" : "text-slate-500"
                    }`}
                  />
                  <span>{label}</span>

                  {active && (
                    <span className="absolute right-0 top-2 bottom-2 w-1 rounded-l-full bg-[#5B4BFF]" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom: Settings + Logout */}
      <div className="border-t border-slate-200 p-3 space-y-1">
        <Link
          href="/dashboard/settings"
          onClick={closeMobileMenu}
          className={[
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
            isActive("/dashboard/settings")
              ? "bg-indigo-50 text-indigo-600 font-medium"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
          ].join(" ")}
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-60"
        >
          <LogOut className="h-4 w-4" />
          <span>{loggingOut ? "Logging out..." : "Logout"}</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={toggleMobileMenu}
        className="fixed top-4 left-4 z-50 rounded-lg bg-white p-2 shadow-lg transition-all duration-200 hover:bg-slate-50 lg:hidden"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6 text-slate-700" />
        ) : (
          <Menu className="h-6 w-6 text-slate-700" />
        )}
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden min-h-screen w-64 flex-col border-r border-slate-200 bg-white lg:flex">
        {/*eslint-disable-next-line react-hooks/static-components*/}
        <SidebarContent />
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
        className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden"
        onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 min-h-screen w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 ease-in-out lg:hidden
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="mt-14">
          {/*eslint-disable-next-line react-hooks/static-components*/}
          <SidebarContent />
        </div>
      </aside>
    </>
  );
}