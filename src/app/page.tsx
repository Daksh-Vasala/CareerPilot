"use client";

import { useState } from "react";
import {
  Rocket,
  Menu,
  X,
  ArrowRight,
  PlayCircle,
  CheckCircle2,
  ScanText,
  KanbanSquare,
  CalendarDays,
  Compass,
  Lightbulb,
  Brain,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "AI Tools", href: "#ai-tools" },
];

const features = [
  {
    icon: ScanText,
    title: "AI Resume Analyzer",
    body: "Instantly score and optimize your resume against specific job descriptions to beat the ATS.",
  },
  {
    icon: KanbanSquare,
    title: "Job Application Tracker",
    body: "Keep all your applications in one place. Automatically parse job details from URLs.",
  },
  {
    icon: CalendarDays,
    title: "Interview Tracker",
    body: "Log notes, track rounds, and prepare with AI-generated questions tailored to the role.",
  },
  {
    icon: Compass,
    title: "AI Career Roadmap",
    body: "Get personalized recommendations for skills to learn and roles to target based on your profile.",
  },
];

const steps = [
  {
    num: "01",
    title: "Build Your Profile",
    body: "Connect LinkedIn or upload your resume to establish your baseline skills and experience.",
  },
  {
    num: "02",
    title: "Analyze & Apply",
    body: "Tailor your resume for specific roles and track your applications in our kanban board.",
  },
  {
    num: "03",
    title: "Prepare & Grow",
    body: "Ace the interview and identify skill gaps to secure your desired compensation.",
  },
];

const footerCols = [
  {
    title: "Product",
    links: ["Resume Analyzer", "Job Applications", "Interview Tracker", "AI Roadmap"],
  },
];

export default function CareerPilotLanding() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-900 antialiased">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
          <a href="#top" className="flex min-w-0 items-center gap-2.5">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-indigo-600 text-white shadow-sm shadow-indigo-600/20">
              <Rocket className="size-5" />
            </span>
            <span className="truncate text-lg font-extrabold tracking-tight">CareerPilot</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/login"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-indigo-600/20 transition-transform hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 shrink-0 place-items-center rounded-lg border border-gray-200 text-slate-700 md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-gray-200 bg-white px-5 pb-5 pt-3 md:hidden">
            <nav className="flex flex-col">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-3 text-sm font-medium text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="mt-3 flex flex-col gap-2">
              <a
                href="#top"
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-center text-sm font-semibold text-slate-700"
              >
                Login
              </a>
              <a
                href="#top"
                className="rounded-lg bg-indigo-600 px-4 py-2.5 text-center text-sm font-semibold text-white"
              >
                Get Started
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section
        id="top"
        className="relative overflow-hidden bg-[radial-gradient(120%_90%_at_85%_0%,rgba(99,102,241,0.14),transparent_60%),radial-gradient(90%_80%_at_0%_10%,rgba(139,92,246,0.10),transparent_65%)]"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-16 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-600 shadow-sm">
              <Sparkles className="size-3.5" />
              AI-Powered Career Management
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Take control of your{" "}
              <span className="bg-linear-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
                career with AI
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Your personal career operating system. Analyze your resume against job descriptions,
              track applications automatically, and get AI-driven roadmaps to your next role.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#top"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm shadow-indigo-600/20 transition-transform hover:-translate-y-0.5"
              >
                Get Started Free
                <ArrowRight className="size-4" />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition-colors hover:bg-indigo-50"
              >
                <PlayCircle className="size-4" />
                See How It Works
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <div className="flex items-center">
                {["JS", "AL"].map((i) => (
                  <span
                    key={i}
                    className="-mr-2 grid size-9 place-items-center rounded-full border-2 border-white bg-indigo-100 text-xs font-bold text-indigo-600"
                  >
                    {i}
                  </span>
                ))}
                <span className="grid size-9 place-items-center rounded-full border-2 border-white bg-indigo-600 text-[10px] font-bold text-white">
                  +2k
                </span>
              </div>
              <p className="min-w-0 text-sm text-slate-500">
                Trusted by professionals at top tech companies.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm shadow-gray-900/5 sm:p-7">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-indigo-100" />
              <span className="size-2.5 rounded-full bg-indigo-200" />
              <span className="size-2.5 rounded-full bg-indigo-500" />
            </div>

            <div className="mt-6 rounded-xl bg-indigo-50 p-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-indigo-600">
                <CheckCircle2 className="size-4" />
                ATS Score
              </div>
              <p className="mt-3 text-5xl font-extrabold tracking-tight">94%</p>
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-indigo-100">
                <div className="h-full w-[94%] rounded-full bg-indigo-600" />
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {["Keywords matched", "Formatting clean"].map((t) => (
                <div
                  key={t}
                  className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium"
                >
                  <CheckCircle2 className="size-4 shrink-0 text-indigo-600" />
                  <span className="truncate">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
            Everything you need to manage your job search
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
            Your entire career journey, connected.
          </h2>
          <p className="mt-4 max-w-2xl text-slate-600">
            Powerful tools designed to help you land your next role and manage your professional
            growth.
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <article
                key={f.title}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-sm hover:shadow-gray-900/5"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
                  <f.icon className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
          <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
            From application to career growth.
          </h2>
          <p className="mt-4 max-w-2xl text-slate-600">
            A streamlined process to help you achieve your career goals.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <article
                key={s.num}
                className="rounded-xl border border-gray-200 bg-white p-7 shadow-sm"
              >
                <span className="text-4xl font-extrabold text-indigo-200">{s.num}</span>
                <h3 className="mt-4 text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-14 grid items-center gap-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm shadow-gray-900/5 lg:grid-cols-2 lg:p-10">
            <div>
              <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                One workspace for your career.
              </h3>
              <div className="mt-6 rounded-xl border border-gray-200 bg-indigo-50 p-5">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-indigo-600">
                  <Lightbulb className="size-4" />
                  AI Recommendation
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Update your resume summary to better align with Senior React Developer roles.
                </p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {["Applied", "Interviewing", "Offer"].map((col, i) => (
                <div key={col} className="rounded-xl bg-indigo-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
                    {col}
                  </p>
                  <div className="mt-3 space-y-2">
                    {Array.from({ length: 3 - i }).map((_, j) => (
                      <div key={j} className="h-10 rounded-lg border border-gray-200 bg-white" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI tools */}
      <section id="ai-tools" className="border-t border-gray-200 bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              AI that understands your career.
            </h2>
            <p className="mt-4 max-w-xl text-slate-600">
              Stop guessing what skills you need. Our AI analyzes job market trends and your profile
              to give actionable insights.
            </p>
            <a
              href="#top"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm shadow-indigo-600/20 transition-transform hover:-translate-y-0.5"
            >
              Explore AI Career Tools
              <ArrowRight className="size-4" />
            </a>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm shadow-gray-900/5 sm:p-8">
            <span className="grid size-11 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
              <Brain className="size-5" />
            </span>
            <h3 className="mt-5 text-xl font-bold">Skill Gap Analysis</h3>
            <p className="mt-2 text-sm text-slate-600">
              Based on your target roles (Senior DevOps Engineer), consider adding these skills:
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Docker", "AWS", "Kubernetes"].map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-gray-200 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600"
                >
                  {s}
                </span>
              ))}
            </div>
            <p className="mt-6 rounded-xl bg-indigo-50 p-4 text-sm leading-relaxed text-slate-600">
              Adding AWS to your profile could increase your target salary range by 15%.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center lg:py-28">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Ready to take control of your career?
          </h2>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="#top"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm shadow-indigo-600/20 transition-transform hover:-translate-y-0.5"
            >
              Get Started Free
              <ArrowRight className="size-4" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition-colors hover:bg-indigo-50"
            >
              See How It Works
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:px-8">
          <div>
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-indigo-600 text-white">
                <Rocket className="size-5" />
              </span>
              <span className="truncate text-lg font-extrabold">CareerPilot</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-slate-500">
              © 2026 CareerPilot AI.
            </p>
          </div>

          {footerCols.map((col) => (
            <nav key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#top"
                      className="text-sm text-slate-600 transition-colors hover:text-indigo-600"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </footer>
    </div>
  );
}
