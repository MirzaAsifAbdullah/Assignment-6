
import Image from "next/image";
import logo from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="border-t border-[#01060e] bg-black">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-center gap-3 px-5 py-7 text-center sm:flex-row sm:justify-between sm:gap-4 sm:text-left md:px-8">
        <div className="flex items-center justify-center">
          <Image
            src={logo}
            alt="FitLog"
            width={30}
            height={10}
            className="h-auto w-[30px] object-contain"
          />

          <p className="ml-2 text-sm font-bold uppercase text-gray-600">
            FITLOG
          </p>
        </div>

        <p className="text-[9px] leading-4 text-gray-600 sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}

