"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import logo from "@/assets/logo.png";
import { useFitLog } from "@/context/FitLogContext";
import { useEffect, useMemo, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { planCount, savedCount } = useFitLog();

  const isWorkout = pathname === "/";
  const isMyPlan = pathname === "/my-plan";

  return (
    <header className="sticky top-0 z-50 border-b border-gray-700 bg-[#0b0c0f] py-2">
      <div className="mx-auto max-w-[1280px] px-5 md:px-7">
        <div className="relative flex h-[52px] items-center justify-between">
          <Link
            href="/"
            className="flex items-center transition-opacity hover:opacity-80"
          >
            <Image
              src={logo}
              alt="FitLog"
              width={50}
              height={20}
              priority
              className="h-auto object-contain"
            />

            <span className="ml-2 font-bold uppercase text-[#ccff00]">
              FITLOG
            </span>
          </Link>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
            <Link
              href="/"
              className={`rounded-full px-4 py-1.5 text-[9px] font-medium transition ${
                isWorkout
                  ? "bg-[#182600] text-[#ccff00]"
                  : "text-[#858992] hover:text-white"
              }`}
            >
              Workouts
            </Link>

            <Link
              href="/my-plan"
              className={`rounded-full px-4 py-1.5 text-[9px] font-medium transition ${
                isMyPlan
                  ? "bg-[#182600] text-[#ccff00]"
                  : "text-[#858992] hover:text-white"
              }`}
            >
              My Plan
            </Link>
          </nav>

          <div className="flex items-center gap-3.5">
          <Link
  href="/my-plan"
  className="flex items-center gap-1.5 text-[9px] text-white transition hover:text-[#ccff00]"
>
  <span>Plan</span>

  <span className="flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-[#ccff00] px-1 text-[8px] font-bold leading-none text-black">
    {planCount}
  </span>
</Link>

<Link
  href="/my-plan?tab=saved"
  className="flex items-center gap-1.5 text-[9px] text-[#858992] transition hover:text-white"
>
  <span>Saved</span>

  <span className="flex h-[15px] min-w-[15px] items-center justify-center rounded-full border border-[#3a3d43] px-1 text-[8px] leading-none text-[#a0a3aa]">
    {savedCount}
  </span>
</Link>

           
          </div>
        </div>

        <div className="flex h-[40px] items-center justify-center md:hidden">
          <nav className="flex items-center gap-1">
            <Link
              href="/"
              className={`rounded-full px-4 py-1.5 text-[9px] ${
                isWorkout
                  ? "bg-[#182600] text-[#ccff00]"
                  : "text-[#858992]"
              }`}
            >
              Workouts
            </Link>

            <Link
              href="/my-plan"
              className={`rounded-full px-4 py-1.5 text-[9px] ${
                isMyPlan
                  ? "bg-[#182600] text-[#ccff00]"
                  : "text-[#858992]"
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