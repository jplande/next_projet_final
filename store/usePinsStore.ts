import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type JobCardData } from "@/composants/jobs/JobCard";

type PinsState = {
  pins: JobCardData[];
  addPin: (p: JobCardData) => void;
  removePin: (p: JobCardData) => void;
};

export const usePinsStore = create<PinsState>()(
  persist(
    (set) => ({
      pins: [],
      addPin: (p) =>
        set((state) => ({
          pins: state.pins.some((pin) => pin.uid === p.uid)
            ? state.pins
            : [...state.pins, p],
        })),
      removePin: (p) =>
        set((state) => ({
          pins: state.pins.filter((pin) => pin.uid !== p.uid),
        })),
    }),
    {
      name: "pins-storage",
    },
  ),
);
