import { create } from 'zustand';
import Planet from "../components/Experience/World/Planet";

interface PlanetStore {
  isFocus: boolean;
  planetFocused: Planet | null;
  setFocus: (value: boolean) => void;
  setPlanetFocused: (planet: Planet | null) => void;
  reset: () => void;
}

const usePlanetStore = create<PlanetStore>((set) => ({
  isFocus: false,
  planetFocused: null,
  setFocus: (value: boolean) => set({ isFocus: value }),
  setPlanetFocused: (planet: Planet | null) => set({ planetFocused: planet }),
  reset: () => set({ isFocus: false, planetFocused: null }),
}));

export default usePlanetStore;
