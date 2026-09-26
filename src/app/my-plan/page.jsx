"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useFitLog } from "@/context/FitLogContext";

export default function MyPlan() {
  const { plan, saved, removeFromPlan, markAsDone, removeSaved } = useFitLog();

  const searchParams = useSearchParams();

  const requestedTab = searchParams.get("tab") === "saved" ? "saved" : "plan";

  const [activeTab, setActiveTab] = useState(requestedTab);

  useEffect(() => {
    setActiveTab(requestedTab);
  }, [requestedTab]);

  const [sortBy, setSortBy] = useState("duration");

  const completedCount = plan.filter((item) => item.done).length;

  const totalCalories = plan.reduce(
    (total, item) => total + Number(item.caloriesBurned || 0),
    0,
  );

  const totalDuration = plan.reduce(
    (total, item) => total + Number(item.duration || 0),
    0,
  );

  const currentItems = useMemo(() => {
    const items = activeTab === "plan" ? [...plan] : [...saved];

    return items.sort((a, b) => {
      if (sortBy === "calories") {
        return Number(b.caloriesBurned || 0) - Number(a.caloriesBurned || 0);
      }

      if (sortBy === "rating") {
        return Number(b.rating || 0) - Number(a.rating || 0);
      }

      return Number(a.duration || 0) - Number(b.duration || 0);
    });
  }, [activeTab, plan, saved, sortBy]);

  return (
    <main className="flex min-h-screen flex-col bg-[#0b0c0f] text-white">
      <Navbar />

      <section className="flex-1 px-5 pb-16 pt-10 sm:px-6 md:px-8 md:pt-11">
        <div className="mx-auto max-w-[1120px]">
          <div>
            <h1 className="font-oswald text-[28px] font-bold uppercase leading-none sm:text-[32px]">
              My Plan
            </h1>

            <p className="mt-2 text-[9px] leading-4 text-[#858992]">
              Cap of five lifts for today. Finish them, then load more.
            </p>
          </div>

          <div className="mt-6 overflow-hidden rounded-[9px] border border-[#202329] bg-[#15181e]">
            <div className="grid grid-cols-3">
              <div className="border-r border-[#202329] px-5 py-6 sm:px-6">
                <p className="text-[8px] text-[#777b83]">Exercises</p>

                <p className="font-oswald mt-2 text-[30px] font-bold leading-none text-[#ccff00]">
                  {plan.length}
                </p>
              </div>

              <div className="border-r border-[#202329] px-5 py-6 sm:px-6">
                <p className="text-[8px] text-[#777b83]">Minutes</p>

                <p className="font-oswald mt-2 text-[30px] font-bold leading-none text-white">
                  {totalDuration}
                </p>
              </div>

              <div className="px-5 py-6 sm:px-6">
                <p className="text-[8px] text-[#777b83]">Calories</p>

                <p className="font-oswald mt-2 text-[30px] font-bold leading-none text-white">
                  {totalCalories}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="flex h-[30px] rounded-[6px] border border-[#202329] bg-[#15181e] p-[3px]">
              <button
                onClick={() => setActiveTab("plan")}
                className={`rounded-[4px] px-4 text-[8px] font-medium transition ${
                  activeTab === "plan"
                    ? "bg-[#242830] text-white shadow-sm"
                    : "text-[#777b83] hover:text-white"
                }`}
              >
                Today's Plan
              </button>

              <button
                onClick={() => setActiveTab("saved")}
                className={`rounded-[4px] px-4 text-[8px] font-medium transition ${
                  activeTab === "saved"
                    ? "bg-[#242830] text-white shadow-sm"
                    : "text-[#777b83] hover:text-white"
                }`}
              >
                Saved
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden text-[8px] text-[#777b83] sm:block">
                Sort By
              </span>

              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="h-[30px] rounded-[6px] border border-[#202329] bg-[#15181e] px-3 text-[8px] text-[#c5c7cb] outline-none transition focus:border-[#3d432f]"
              >
                <option value="duration">Duration</option>

                <option value="calories">Calories</option>

                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          <div className="mt-5 min-h-[350px]">
            {currentItems.length === 0 ? (
              <div className="flex min-h-[350px] flex-col items-center justify-center rounded-[9px] border border-dashed border-[#25282e] bg-[#0d0f12] px-5 text-center">
                <h2 className="font-oswald text-[16px] font-bold uppercase">
                  Nothing here yet
                </h2>

                <p className="mt-2 text-[8px] leading-4 text-[#777b83]">
                  Browse the library and add a lift to get today moving.
                </p>

                <Link
                  href="/"
                  className="mt-5 rounded-full bg-[#ccff00] px-5 py-2.5 text-[8px] font-bold text-black transition hover:bg-[#d8ff3d] hover:shadow-[0_0_18px_rgba(204,255,0,0.15)]"
                >
                  Go to workouts
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {currentItems.map((workout) => (
                  <div
                    key={workout.id}
                    className="flex min-h-[105px] items-center gap-4 rounded-[10px] border border-[#202329] bg-[#15181e] px-4 py-3 transition hover:border-[#2d3239] sm:min-h-[112px] sm:px-5"
                  >
                    <Link
                      href={`/workout/${workout.id}`}
                      className="h-[78px] w-[125px] shrink-0 overflow-hidden rounded-[6px] sm:h-[82px] sm:w-[135px]"
                    >
                      <img
                        src={workout.image}
                        alt={workout.name}
                        className="h-full w-full object-cover transition duration-300 hover:scale-105"
                      />
                    </Link>

                    <div className="min-w-0 flex-1">
                      <h2
                        className={`font-oswald truncate text-[14px] font-bold uppercase leading-tight sm:text-[15px] ${
                          workout.done
                            ? "text-[#777b83] line-through"
                            : "text-white"
                        }`}
                      >
                        {workout.name}
                      </h2>

                      <p className="mt-1 truncate text-[9px] text-[#777b83] sm:text-[10px]">
                        {workout.equipment || "No equipment"}
                      </p>

                      <div className="mt-2.5 flex flex-wrap items-center gap-3">
                        <span className="flex items-center gap-1.5 text-[9px] text-[#c4c6ca]">
                          <span className="text-[#ccff00]">◷</span>
                          {workout.duration || "-"} min
                        </span>

                        <span className="flex items-center gap-1.5 text-[9px] text-[#c4c6ca]">
                          <span className="text-[#ccff00]">♨</span>
                          {workout.caloriesBurned || "-"} kcal
                        </span>

                        <span className="flex items-center gap-1.5 text-[9px] text-[#c4c6ca]">
                          <span className="text-[#ccff00]">★</span>
                          {workout.rating || "-"}
                        </span>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-2.5">
                      <Link
                        href={`/workout/${workout.id}`}
                        className="hidden h-[32px] items-center justify-center rounded-full border border-[#30343b] px-4 text-[8px] text-[#c7c9ce] transition hover:border-[#ccff00] hover:text-[#ccff00] sm:flex"
                      >
                        View Details
                      </Link>

                      {activeTab === "plan" && (
                        <button
                          onClick={() => markAsDone(workout.id)}
                          className={`hidden h-[32px] items-center justify-center rounded-full px-4 text-[8px] font-bold transition sm:flex ${
                            workout.done
                              ? "bg-[#263300] text-[#ccff00]"
                              : "bg-[#ccff00] text-black hover:bg-[#d8ff3d]"
                          }`}
                        >
                          <span className="mr-1.5">✓</span>

                          {workout.done ? "Mark Active" : "Mark as Done"}
                        </button>
                      )}

                      <button
                        onClick={() =>
                          activeTab === "plan"
                            ? removeFromPlan(workout.id)
                            : removeSaved(workout.id)
                        }
                        aria-label="Remove workout"
                        className="flex h-[30px] w-[30px] items-center justify-center rounded-full text-[14px] text-[#686c74] transition hover:bg-[#202329] hover:text-white"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {activeTab === "plan" && currentItems.length > 0 && (
            <p className="mt-4 text-center text-[7px] text-[#555961]">
              {completedCount} of {plan.length} workouts completed
            </p>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
