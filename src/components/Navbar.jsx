"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/assets/logo.png";
import { useFitLog } from "@/context/FitLogContext";

export default function Navbar() {
  const pathname = usePathname();
  const { planCount, savedCount } = useFitLog();

  const isWorkout = pathname === "/";
  const isMyPlan = pathname === "/my-plan";
  const isSaved = pathname === "/my-plan?tab=saved";

  return (
    <header className="sticky top-0 z-50 border-b border-[#24262b] bg-[#0b0c0f]/95 backdrop-blur-md">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-[68px] items-center justify-between">
          <Link
            href="/"
            className="group flex shrink-0 items-center transition-opacity duration-200 hover:opacity-90"
          >
            <Image
              src={logo}
              alt="FitLog"
              width={44}
              height={24}
              priority
              className="h-auto w-[44px] object-contain"
            />

            <span className="ml-2.5 text-[15px] font-extrabold uppercase tracking-[0.08em] text-[#ccff00]">
              FITLOG
            </span>
          </Link>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center rounded-full border border-[#24272d] bg-[#111318] p-1 md:flex">
            <Link
              href="/"
              className={`rounded-full px-5 py-2 text-[11px] font-medium transition-all duration-200 ${
                isWorkout
                  ? "bg-[#182600] text-[#ccff00] shadow-[0_0_14px_rgba(204,255,0,0.08)]"
                  : "text-[#858992] hover:bg-[#181a1f] hover:text-white"
              }`}
            >
              Workouts
            </Link>

            <Link
              href="/my-plan"
              className={`rounded-full px-5 py-2 text-[11px] font-medium transition-all duration-200 ${
                isMyPlan
                  ? "bg-[#182600] text-[#ccff00] shadow-[0_0_14px_rgba(204,255,0,0.08)]"
                  : "text-[#858992] hover:bg-[#181a1f] hover:text-white"
              }`}
            >
              My Plan
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/my-plan"
              className={`flex items-center gap-2 rounded-full px-2.5 py-1.5 text-[10px] font-medium transition-all duration-200 sm:px-3 ${
                isMyPlan
                  ? "text-[#ccff00]"
                  : "text-white hover:bg-[#17191e] hover:text-[#ccff00]"
              }`}
            >
              <span>Plan</span>

              <span className="flex h-[19px] min-w-[19px] items-center justify-center rounded-full bg-[#ccff00] px-1.5 text-[9px] font-bold leading-none text-black">
                {planCount}
              </span>
            </Link>

            <Link
              href="/my-plan?tab=saved"
              className="flex items-center gap-2 rounded-full px-2.5 py-1.5 text-[10px] font-medium text-[#858992] transition-all duration-200 hover:bg-[#17191e] hover:text-white sm:px-3"
            >
              <span>Saved</span>

              <span className="flex h-[19px] min-w-[19px] items-center justify-center rounded-full border border-[#3a3d43] px-1.5 text-[9px] leading-none text-[#a0a3aa]">
                {savedCount}
              </span>
            </Link>
          </div>
        </div>

        <div className="flex h-[44px] items-center justify-center md:hidden">
          <nav className="flex items-center rounded-full border border-[#24272d] bg-[#111318] p-1">
            <Link
              href="/"
              className={`rounded-full px-6 py-2 text-[10px] font-medium transition-all duration-200 ${
                isWorkout
                  ? "bg-[#182600] text-[#ccff00]"
                  : "text-[#858992] hover:text-white"
              }`}
            >
              Workouts
            </Link>

            <Link
              href="/my-plan"
              className={`rounded-full px-6 py-2 text-[10px] font-medium transition-all duration-200 ${
                isMyPlan
                  ? "bg-[#182600] text-[#ccff00]"
                  : "text-[#858992] hover:text-white"
              }`}
            >
              My Plan
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
