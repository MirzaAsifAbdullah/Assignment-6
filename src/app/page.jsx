import Image from "next/image";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WorkoutCard from "@/components/WorkoutCard";

import banner from "@/assets/banner.png";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

async function getWorkouts() {
  const response = await fetch(API_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }

  return response.json();
}

export default async function Home() {
  let workouts = [];

  try {
    workouts = await getWorkouts();
  } catch {
    workouts = [];
  }

  return (
    <main className="min-h-screen bg-[#0b0c0f] text-white">
      <Navbar />

      
<section className="px-5 pb-8 pt-7 sm:px-6 md:px-8 md:pt-9">
  <div className="mx-auto max-w-[1280px]">
    <div className="overflow-hidden rounded-[8px] border border-[#202329] bg-[#101216]">
      <div className="grid items-center lg:grid-cols-[1fr_0.9fr]">
        <div className="px-6 py-9 sm:px-8 md:px-10 md:py-12">
          <p className="text-[8px] font-bold uppercase tracking-[0.22em] text-[#ccff00]">
            Workout Library
          </p>

          <h1 className="font-oswald mt-4  text-[42px] font-bold uppercase leading-[0.95] tracking-[-0.02em] sm:text-[52px] md:text-[64px]">
            Train with intent.Log 
            <br />
            every set.
          </h1>

          <p className="mt-5 max-w-[450px] text-[11px] leading-5 text-[#858992]">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it <br />
into  today's plan, and watch the week's work add up.
          </p>

          <a
            href="#library"
            className="mt-7 inline-flex rounded-[5px] bg-[#ccff00] px-5 py-3 text-[9px] font-bold uppercase tracking-[0.08em] text-black transition hover:bg-[#d8ff3d]"
          >
            Browse Workouts
          </a>
        </div>

        <div className="h-full ">
          <Image
            src={banner}
            alt="FitLog workout banner"
            className="h-full w-full object-cover"
            priority
          />
        </div>
      </div>
    </div>
  </div>
</section>



      <section
        id="library"
        className="px-5 pb-16 pt-5 sm:px-6 md:px-8"
      >
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="font-oswald mt-1 text-[28px] font-bold uppercase sm:text-[32px]">
              THE LIBRARY
              </h2>

              <p className="text-gray-600">Twelve lifts covering every major muscle group.</p>
            </div>

            <p className="hidden text-[9px] text-[#686c74] sm:block">
              {workouts.length} workouts
            </p>
          </div>

          {workouts.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {workouts.map((workout) => (
                <WorkoutCard
                  key={workout.id}
                  workout={workout}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-[8px] border border-[#202329] bg-[#111318] px-5 py-16 text-center">
              <p className="text-[11px] text-[#858992]">
                Unable to load workouts right now.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}