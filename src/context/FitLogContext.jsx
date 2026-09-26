"use client";

import { createContext, useContext, useEffect, useState } from "react";

const FitLogContext = createContext();

export function FitLogProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog-plan");
      const storedSaved = localStorage.getItem("fitlog-saved");

      if (storedPlan) {
        setPlan(JSON.parse(storedPlan));
      }

      if (storedSaved) {
        setSaved(JSON.parse(storedSaved));
      }
    } catch {
      setPlan([]);
      setSaved([]);
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan, hydrated]);

  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved, hydrated]);

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 2500);

    return () => clearTimeout(timer);
  }, [toast]);

  const showToast = (message) => {
    setToast(message);
  };

  const addToPlan = (workout) => {
    const exists = plan.some(
      (item) => String(item.id) === String(workout.id)
    );

    if (exists) {
      showToast("Already added to today's plan");
      return;
    }

    setPlan((current) => [
      ...current,
      {
        ...workout,
        done: false,
      },
    ]);

    showToast("Added to today's plan");
  };

  const removeFromPlan = (id) => {
    setPlan((current) =>
      current.filter((item) => String(item.id) !== String(id))
    );

    showToast("Removed from today's plan");
  };

  const markAsDone = (id) => {
    const workout = plan.find(
      (item) => String(item.id) === String(id)
    );

    setPlan((current) =>
      current.map((item) =>
        String(item.id) === String(id)
          ? { ...item, done: !item.done }
          : item
      )
    );

    showToast(workout?.done ? "Marked as active" : "Workout completed");
  };

  const saveWorkout = (workout) => {
    const exists = saved.some(
      (item) => String(item.id) === String(workout.id)
    );

    if (exists) {
      showToast("Already saved");
      return;
    }

    setSaved((current) => [...current, workout]);

    showToast("Saved for later");
  };

  const removeSaved = (id) => {
    setSaved((current) =>
      current.filter((item) => String(item.id) !== String(id))
    );

    showToast("Removed from saved");
  };

  const isInPlan = (id) => {
    return plan.some(
      (item) => String(item.id) === String(id)
    );
  };

  const isSaved = (id) => {
    return saved.some(
      (item) => String(item.id) === String(id)
    );
  };

  return (
    <FitLogContext.Provider
      value={{
        plan,
        saved,
        planCount: plan.length,
        savedCount: saved.length,
        addToPlan,
        removeFromPlan,
        markAsDone,
        saveWorkout,
        removeSaved,
        isInPlan,
        isSaved,
        showToast,
      }}
    >
      {children}

      {toast && (
        <div className="fixed bottom-5 right-5 z-[100] rounded-[6px] border border-[#30352a] bg-[#141711] px-4 py-3 text-[10px] font-medium text-white shadow-2xl">
          <span className="mr-2 text-[#ccff00]">✓</span>
          {toast}
        </div>
      )}
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  const context = useContext(FitLogContext);

  if (!context) {
    throw new Error("useFitLog must be used inside FitLogProvider");
  }

  return context;
}