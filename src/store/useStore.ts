import { create } from "zustand";

interface StoreState {
  user: { email: string } | null;
  setUser: (user: { email: string }) => void;
}

export const useStore = create<StoreState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));