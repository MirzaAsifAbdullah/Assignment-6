"use client";

import { useFitLog } from "@/context/FitLogContext";

export default function WorkoutDetails({ workout }) {
  const { addToPlan, saveWorkout, isInPlan, isSaved } = useFitLog();

  const planAdded = isInPlan(workout.id);
  const saved = isSaved(workout.id);

  return (
    <main className="min-h-[calc(100vh-52px)] bg-[#0b0c0f] px-5 pb-16 pt-9 text-white sm:px-6 md:px-8">
      <div className="mx-auto max-w-[916px]">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-[41px]">
          <div className="overflow-hidden rounded-[9px] border border-[#202329] bg-[#111318]">
            <img
              src={workout.image}
              alt={workout.name}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            <h1 className="font-oswald text-[30px] font-bold uppercase leading-[1.05] tracking-[-0.02em] sm:text-[34px]">
              {workout.name}
            </h1>

            <p className="mt-2.5 max-w-[440px] text-[11px] leading-[1.55] text-[#858992]">
              {workout.description}
            </p>

            <div className="mt-3.5 flex flex-wrap gap-2">
              {workout.muscleGroups?.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full bg-[#ccff00] px-3 py-1 text-[8px] font-bold uppercase text-black"
                >
                  {muscle}
                </span>
              ))}
            </div>

            <div className="mt-5 overflow-hidden rounded-[8px] border border-[#202329] bg-[#15181e]">
              <div className="flex min-h-[36px] items-center justify-between border-b border-[#202329] px-4">
                <span className="text-[8px] font-semibold uppercase tracking-[0.08em] text-[#8a8e96]">
                  Equipment
                </span>

                <span className="text-[9px] text-[#f1f1f2]">
                  {workout.equipment || "None"}
                </span>
              </div>

              <div className="flex min-h-[36px] items-center justify-between border-b border-[#202329] px-4">
                <span className="text-[8px] font-semibold uppercase tracking-[0.08em] text-[#8a8e96]">
                  Difficulty
                </span>

                <span className="text-[9px] text-[#f1f1f2]">
                  {workout.difficulty || "-"}
                </span>
              </div>

              <div className="flex min-h-[36px] items-center justify-between border-b border-[#202329] px-4">
                <span className="text-[8px] font-semibold uppercase tracking-[0.08em] text-[#8a8e96]">
                  Sets
                </span>

                <span className="text-[9px] text-[#f1f1f2]">
                  {workout.sets || "-"}
                </span>
              </div>

              <div className="flex min-h-[36px] items-center justify-between border-b border-[#202329] px-4">
                <span className="text-[8px] font-semibold uppercase tracking-[0.08em] text-[#8a8e96]">
                  Reps
                </span>

                <span className="text-[9px] text-[#f1f1f2]">
                  {workout.reps || "-"}
                </span>
              </div>

              <div className="flex min-h-[36px] items-center justify-between border-b border-[#202329] px-4">
                <span className="text-[8px] font-semibold uppercase tracking-[0.08em] text-[#8a8e96]">
                  Duration
                </span>

                <span className="text-[9px] text-[#f1f1f2]">
                  {workout.duration ? `${workout.duration} min` : "-"}
                </span>
              </div>

              <div className="flex min-h-[36px] items-center justify-between border-b border-[#202329] px-4">
                <span className="text-[8px] font-semibold uppercase tracking-[0.08em] text-[#8a8e96]">
                  Calories
                </span>

                <span className="text-[9px] text-[#f1f1f2]">
                  {workout.caloriesBurned
                    ? `${workout.caloriesBurned} kcal`
                    : "-"}
                </span>
              </div>

              <div className="flex min-h-[36px] items-center justify-between px-4">
                <span className="text-[8px] font-semibold uppercase tracking-[0.08em] text-[#8a8e96]">
                  Rating
                </span>

                <span className="text-[9px] font-semibold text-[#ccff00]">
                  {workout.rating ? `★ ${workout.rating}` : "-"}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="font-oswald text-[14px] font-bold uppercase tracking-[0.03em]">
                Instructions
              </h2>

              <div className="mt-3 space-y-3">
                {workout.instructions?.map((instruction, index) => (
                  <div key={index} className="flex gap-3">
                    <span className="shrink-0 text-[9px] font-medium text-[#9da0a7]">
                      {index + 1}.
                    </span>

                    <p className="text-[9px] leading-[1.65] text-[#a0a3aa]">
                      {instruction}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => addToPlan(workout)}
                disabled={planAdded}
                className={`flex min-h-[34px] items-center justify-center rounded-[6px] px-4 text-[8px] font-bold transition ${
                  planAdded
                    ? "cursor-not-allowed bg-[#273300] text-[#ccff00]"
                    : "bg-[#ccff00] text-black hover:bg-[#d8ff3d]"
                }`}
              >
                <span className="mr-2 text-[10px]">
                  {planAdded ? "✓" : "▣"}
                </span>

                {planAdded ? "Added to today's plan" : "Add to today's plan"}
              </button>

              <button
                onClick={() => saveWorkout(workout)}
                disabled={saved}
                className={`flex min-h-[34px] items-center justify-center rounded-[6px] border px-4 text-[8px] font-medium transition ${
                  saved
                    ? "border-[#ccff00] bg-[#182600] text-[#ccff00]"
                    : "border-[#363940] text-[#d0d2d6] hover:border-[#ccff00] hover:text-[#ccff00]"
                }`}
              >
                <span className="mr-2 text-[10px]">{saved ? "✓" : "▢"}</span>

                {saved ? "Saved for later" : "Save for later"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
