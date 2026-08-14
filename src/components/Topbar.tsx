"use client";
import getInitials from "@/lib/utils/getInitials";
import { Bell, Search, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Profile = {
  image: string | null;
  fullName: string;
};

export default function Topbar({ image, fullName }: Profile) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200 bg-white px-3 sm:px-6">
      {/* Left side - Mobile menu trigger (optional, for future use) */}
      <div className="flex items-center gap-3 lg:hidden">
        <button className="rounded-lg p-1.5 transition hover:bg-slate-100 lg:hidden">
          <Menu className="h-5 w-5 text-slate-600" />
        </button>
      </div>

      {/* Search - Desktop */}
      <div className="hidden flex-1 max-w-md md:block">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search resources..."
            className="w-full rounded-full border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Search - Mobile (toggleable) */}
      <div
        className={`flex-1 transition-all duration-300 md:hidden ${isSearchOpen ? "max-w-full" : "max-w-0 overflow-hidden"}`}
      >
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-full border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
            autoFocus={isSearchOpen}
          />
        </div>
      </div>

      {/* Right side */}
      <div
        className={`flex items-center gap-2 sm:gap-5 ${isSearchOpen ? "ml-2" : "ml-auto"}`}
      >
        {/* Mobile search toggle */}
        <button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="rounded-full p-2 transition hover:bg-slate-100 md:hidden"
          aria-label="Toggle search"
        >
          <Search className="h-5 w-5 text-slate-600" />
        </button>

        <button className="relative rounded-full p-2 transition hover:bg-slate-100">
          <Bell className="h-5 w-5 text-slate-600" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-slate-800">{fullName}</p>
            <p className="text-xs text-slate-500">Free Plan</p>
          </div>
          <Link href="/dashboard/profile">
            {image ? (
              <Image
                src={image}
                alt={`${fullName} avatar`}
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover ring-2 ring-slate-100 transition hover:ring-indigo-200"
                width={40}
                height={40}
              />
            ) : (
              <div className="flex h-full w-full rounded-full p-2 items-center justify-center bg-indigo-100 text-2xl font-semibold text-indigo-700">
                <span className="text-sm">{getInitials(fullName)}</span>
              </div>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
