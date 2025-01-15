import { create } from 'zustand';

interface MeteoStore {
  selectedCategory: string | null;
  setCategory: (category: string | null) => void;
  reset: () => void;
}

const useMeteoStore = create<MeteoStore>((set) => ({
  selectedCategory: null,
  setCategory: (category: string | null) => set({ selectedCategory: category }),
  reset: () => set({ selectedCategory: null }),
}));

export default useMeteoStore;
