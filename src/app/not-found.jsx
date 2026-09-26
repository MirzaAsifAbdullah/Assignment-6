import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0b0c0f] px-5 text-white">
      <div className="text-center">
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#ccff00]">
          FitLog
        </p>

        <h1 className="font-oswald mt-3 text-7xl font-bold uppercase">404</h1>

        <p className="mt-3 text-[11px] text-[#858992]">
          The workout you're looking for doesn't exist.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-[5px] bg-[#ccff00] px-5 py-3 text-[9px] font-bold uppercase text-black transition hover:bg-[#d8ff3d]"
        >
          Go to workouts
        </Link>
      </div>
    </main>
  );
}
