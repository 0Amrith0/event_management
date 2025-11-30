import { create } from "zustand";

export const useProfileStore = create((set) => ({
  activeProfileId: null,

  setActiveProfileId: (id) => set({ activeProfileId: id }),
}));
