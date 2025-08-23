import { create } from "zustand";

interface TabState {
  activeTabId: string;
  setActiveTabId: (id: string) => void;
}

export const useTabStore = create<TabState>((set) => ({
  activeTabId: "",
  setActiveTabId: (id) => set({ activeTabId: id }),
}));