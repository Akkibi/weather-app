import { create } from 'zustand';

interface PlanetStore {
  isFocus: boolean;
  planetFocused: string | null;
  setFocus: (value: boolean) => void;
  setPlanetFocused: (planet: string | null) => void;
  reset: () => void;
}

const usePlanetStore = create<PlanetStore>((set) => ({
  isFocus: false,
  planetFocused: null,
  setFocus: (value: boolean) => set({ isFocus: value }),
  setPlanetFocused: (planet: string | null) => set({ planetFocused: planet }),
  reset: () => set({ isFocus: false, planetFocused: null }),
}));

export default usePlanetStore;
