import { create } from "zustand";

type InteractionState = {
  activeId: number | null;
  setActiveId: (id: number | null) => void;
};
const useInteractionStore = create<InteractionState>((set) => ({
  activeId: null,
  setActiveId: (id) => set({ activeId: id }),
}));

export default useInteractionStore;
