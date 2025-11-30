import { create } from "zustand";

export const useTimezoneStore = create((set) => ({
  activeTimezone: "",
  setActiveTimezone: (tz) => set({ activeTimezone: tz }),
}));
