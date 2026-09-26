import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WorkoutDetails from "@/components/WorkoutDetails";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

async function getWorkout(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Workout not found");
  }

  return response.json();
}

export default async function WorkoutPage({ params }) {
  const { id } = await params;

  try {
    const workout = await getWorkout(id);

    if (!workout) {
      notFound();
    }

    return (
      <main className="min-h-screen bg-[#0b0c0f] text-white">
        <Navbar />
        <WorkoutDetails workout={workout} />
        <Footer />
      </main>
    );
  } catch {
    notFound();
  }
}