import { StateCreator, create } from "zustand";

export interface ISolatSlice {
  monthlySolatPrayerTimes: number[];
}

export const createSolatSlice: StateCreator<ISolatSlice> = create<ISolatSlice>(
  (_set, _get) => ({
    monthlySolatPrayerTimes: [],
  })
);
