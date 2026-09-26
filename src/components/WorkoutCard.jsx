import Link from "next/link";

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block overflow-hidden rounded-[8px] border border-[#202329] bg-[#111318] transition-all duration-300 hover:-translate-y-1 hover:border-[#343a27] hover:shadow-xl"
    >
      <div className="overflow-hidden">
        <img
          src={workout.image}
          alt={workout.name}
          className="aspect-[1.25/1] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="p-4">
        <div className="mb-3 flex flex-wrap gap-1.5">
          {workout.muscleGroups?.slice(0, 3).map((muscle) => (
            <span
              key={muscle}
              className="rounded-full bg-[#1a2700] px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.06em] text-[#ccff00]"
            >
              {muscle}
            </span>
          ))}
        </div>

        <h3 className="font-oswald text-[20px] font-semibold uppercase leading-tight text-white">
          {workout.name}
        </h3>

        <p className="mt-2 text-[9px] text-[#686c74]">
          {workout.equipment || "No equipment"}
        </p>

        <div className="mt-4 grid grid-cols-3 border-t border-[#202329] pt-3">
          <div>
            <p className="text-[7px] uppercase tracking-[0.08em] text-[#555961]">
              Duration
            </p>

            <p className="mt-1 text-[9px] font-medium text-[#b8bbc1]">
              {workout.duration ? `${workout.duration} min` : "-"}
            </p>
          </div>

          <div>
            <p className="text-[7px] uppercase tracking-[0.08em] text-[#555961]">
              Calories
            </p>

            <p className="mt-1 text-[9px] font-medium text-[#b8bbc1]">
              {workout.caloriesBurned ? `${workout.caloriesBurned} kcal` : "-"}
            </p>
          </div>

          <div>
            <p className="text-[7px] uppercase tracking-[0.08em] text-[#555961]">
              Rating
            </p>

            <p className="mt-1 text-[9px] font-medium text-[#ccff00]">
              ★ {workout.rating || "-"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
