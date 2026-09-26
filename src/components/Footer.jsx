import Image from "next/image";

import logo from "@/assets/logo.png";

export default function Footer() {
  return (
   <footer className="border-t border-[#01060e] bg-black">
  <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-5 py-7 text-[9px] sm:flex-row sm:items-center sm:justify-between md:px-8">
    <div className="flex items-center">
      <Image
        src={logo}
        alt="FitLog"
        width={50}
        height={20}
        className="h-auto object-contain"
      />
      <p className="ml-2 text-[#d4ff00] font-bold uppercase">FITLOG</p>
    </div>

    <p className="text-white">
      © 2026 FitLog — Workout Library. Train hard, log honest.
    </p>
  </div>
</footer>

  );
}